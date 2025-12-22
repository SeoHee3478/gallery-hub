import { createClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { id, pw } = await request.json();

    // id, pw 누락 체크
    if (!id || !pw) {
      return NextResponse.json(
        { message: "아이디와 비밀번호를 입력해주세요." },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // Supabase Auth로 로그인 (비밀번호 자동 검증)
    const { data, error } = await supabase.auth.signInWithPassword({
      email: id, // 프론트에서 id로 보내는 게 email
      password: pw,
    });

    if (error) {
      console.error("Login error:", error);
      return NextResponse.json(
        { message: "이메일 또는 비밀번호가 일치하지 않습니다." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        message: "로그인 되었습니다.",
        user: {
          id: data.user.id,
          email: data.user.email,
          name: data.user.user_metadata?.name,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
