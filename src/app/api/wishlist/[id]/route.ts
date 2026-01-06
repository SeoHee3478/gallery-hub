import { createClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

// 찜 삭제
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
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
    const { id } = await params;

    // 3. 본인 것만 삭제
    const { data, error } = await supabase
      .from("wishlists")
      .delete()
      .eq("item_id", id)
      .eq("user_id", user.id)
      .select();

    console.log("Delete result:", { data, error });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      console.log("No records found to delete");
      return NextResponse.json(
        { error: "삭제할 항목을 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Wishlist DELETE error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
