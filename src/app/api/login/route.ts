import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { supabase } from "@/lib/supabase";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { id, pw } = data;

    // id, pw 누락 체크
    if (!id || !pw) {
      return new Response(
        JSON.stringify({ message: "아이디와 비밀번호를 입력해주세요." }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    console.log("receive data:", data, "id/pw", id, pw);

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", id)
      .single();

    if (!user) {
      return new Response(
        JSON.stringify({
          message: "이메일 또는 비밀번호가 일치하지 않습니다.",
        }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const isPasswordValid = await bcrypt.compare(pw, user.password);

    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({
          message: "이메일 또는 비밀번호가 일치하지 않습니다.",
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const token = jwt.sign(
      { email: user.email, id: user.id },
      `${process.env.JWT_SECRET}`,
      {
        expiresIn: "1h",
      }
    );

    const isProduction = process.env.NODE_ENV === "production";

    // 쿠키 설정
    const cookieStore = await cookies();
    cookieStore.set({
      name: "token",
      value: token,
      httpOnly: true, // JavaScript로 접근 불가(XSS 방어)
      secure: isProduction,
      sameSite: "strict", // CSRF 방어
      maxAge: 3600, // 1시간
      path: "/",
    });

    return new Response(
      JSON.stringify({
        message: "로그인 되었습니다.",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Login error:", error);
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
