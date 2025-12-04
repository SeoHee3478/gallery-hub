import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

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
    // password 검증 로직 추후에 db로 변경
    if (pw === "1234") {
      const token = jwt.sign(
        { email: "test@user.com" },
        `${process.env.JWT_SECRET}`,
        {
          expiresIn: "1h",
        }
      );
      console.log(token);
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
        JSON.stringify({ message: "로그인 되었습니다.", token: token }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      return new Response(
        JSON.stringify({ message: "잘못된 비밀번호입니다." }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
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
