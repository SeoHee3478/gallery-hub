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

    console.log("회원가입 요청:", { name, email });

    // TODO: DB에 사용자 저장
    // - 이메일 중복 확인
    // - 비밀번호 해싱 (bcrypt)
    // - DB에 저장

    // Mock: 임시로 성공 응답
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
