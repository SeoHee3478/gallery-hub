import { createClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { itemId: string } }
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

    // 2. 찜 여부 확인
    const { data, error } = await supabase
      .from("wishlists")
      .select("id")
      .eq("user_id", user.id)
      .eq("item_id", params.itemId)
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
