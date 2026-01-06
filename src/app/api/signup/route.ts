import { createClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // 유효성 검사
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "모든 필드를 입력해주세요." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "올바른 이메일 형식이 아닙니다." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: "비밀번호는 최소 8자 이상이어야 합니다." },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    // 1. Supabase Auth로 회원가입 (비밀번호 자동 해싱)
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name, // user_metadata에 이름 저장
        },
      },
    });

    if (signUpError) {
      console.error("Signup error:", signUpError);

      // 이메일 중복 에러 처리
      if (signUpError.message.includes("already registered")) {
        return NextResponse.json(
          { message: "이미 가입된 이메일입니다." },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { message: signUpError.message },
        { status: 400 }
      );
    }

    if (!authData.user) {
      return NextResponse.json(
        { message: "회원가입에 실패했습니다." },
        { status: 400 }
      );
    }

    // 2. public.users에 프로필 생성 (auth.users의 id 사용!)
    const { error: profileError } = await supabase.from("users").insert([
      {
        id: authData.user.id, // Auth가 만든 UUID 사용
        name,
        email,
        // password는 저장 안 함, auth.users에만 있음
      },
    ]);

    if (profileError) {
      console.error("Profile creation error:", profileError);
      // Auth는 이미 생성됐으니 에러 로그만
    }

    console.log("회원가입 성공:", { name, email });

    return NextResponse.json(
      {
        message: "회원가입이 완료되었습니다.",
        user: { name, email },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
