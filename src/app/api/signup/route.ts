import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, password } = data;

    // 필수 필드 누락 체크
    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({
          message: "모든 필드를 입력해주세요.",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ message: "올바른 이메일 형식이 아닙니다." }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // 비밀번호 길이 검증
    if (password.length < 8) {
      return new Response(
        JSON.stringify({ message: "비밀번호는 최소 8자 이상이어야 합니다." }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // 1. 이메일 중복 확인
    const { data: existingUser, error: checkError } = await supabase
      .from("users")
      .select("email")
      .eq("email", email)
      .single();
    if (existingUser) {
      return new Response(
        JSON.stringify({ message: "이미 가입된 이메일입니다." }),
        {
          status: 409,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // 2. 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. DB에 저장
    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert([
        {
          name,
          email,
          password: hashedPassword,
        },
      ])
      .select()
      .single();

    if (insertError) {
      console.error("DB Insert error:", insertError);

      return new Response(
        JSON.stringify({ message: "회원가입 중 오류가 발생했습니다." }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    console.log("회원가입 성공:", { name, email });

    return new Response(
      JSON.stringify({
        message: "회원가입이 완료되었습니다.",
        user: { name, email },
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return new Response(
      JSON.stringify({ message: "서버 오류가 발생했습니다." }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
