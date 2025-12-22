import { createClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ itemId: string }> }
) {
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

    // 2. params를 await로 받아오기
    const { itemId } = await params;

    // 3. 본인 것만 삭제
    const { data, error } = await supabase
      .from("wishlists")
      .select("id")
      .eq("user_id", user.id)
      .eq("item_id", itemId)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 = 결과 없음 (정상)
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      isWishlisted: !!data,
      wishlistId: data?.id || null,
    });
  } catch (error) {
    console.error("Wishlist check error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
