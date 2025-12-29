import { createClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

// 찜 목록 조회
export async function GET() {
  try {
    const supabase = await createClient();

    // 1. 로그인 확인
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. 찜 목록 가져오기
    const { data: wishlist, error } = await supabase
      .from("wishlists")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 각 item의 상세 정보 병렬로 가져오기
    const wishlistWithDetails = await Promise.all(
      wishlist.map(async (item) => {
        try {
          const response = await fetch(
            `${
              process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
            }/api/exhibitions/${item.item_id}`,
            { next: { revalidate: 3600 } }
          );

          if (!response.ok) throw new Error("Failed to fetch");

          const details = await response.json();

          return {
            ...item,
            details,
          };
        } catch (error) {
          // 에러 발생 시 기본값 반환
          console.error(error);
          return {
            ...item,
            details: {
              title: "정보를 불러올 수 없습니다",
              thumbnail: "/placeholder-image.jpg",
              place: "-",
              startDate: "-",
              endDate: "-",
            },
          };
        }
      })
    );

    return NextResponse.json(wishlistWithDetails);
  } catch (error) {
    console.error("Wishlist GET error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// 찜 추가
export async function POST(request: Request) {
  try {
    console.log("POST /api/wishlist - Start");

    const supabase = await createClient();

    console.log("Supabase client created:", !!supabase);
    console.log("Supabase auth available:", !!supabase?.auth);
    const { item_id, item_type } = await request.json();
    console.log("Request body:", { item_id, item_type });

    // 1. 로그인 확인
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    console.log("User:", user?.id);
    console.log("Auth error:", authError);

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. 찜 추가
    console.log("Attempting to insert wishlist for user:", user.id);
    const { data, error } = await supabase
      .from("wishlists")
      .insert([
        {
          user_id: user.id,
          item_id,
          item_type: item_type || null,
        },
      ])
      .select()
      .single();

    console.log("Insert result:", { data, error });
    console.log("Error details:", error?.message, error?.code, error?.details);

    if (error) {
      // 중복 찜 시도
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "Already in wishlist" },
          { status: 409 }
        );
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Wishlist POST error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
