import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );

  // Supabase Auth 로그아웃 (세션 종료 및 쿠키 삭제)
  const { error } = await supabase.auth.signOut();

  if (error) {
    return NextResponse.json(
      { message: "로그아웃 실패", error: error.message },
      { status: 500 }
    );
  }

  // 기존 커스텀 토큰도 삭제
  const response = NextResponse.json(
    { message: "로그아웃 되었습니다." },
    { status: 200 }
  );

  response.cookies.set({
    name: "token",
    value: "",
    maxAge: 0,
    path: "/",
  });

  return response;
}
