import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  if (
    request.nextUrl.pathname.startsWith("/api/logout") ||
    request.nextUrl.pathname === "/login"
  ) {
    return NextResponse.next();
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  // Supabase Auth 세션 확인
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 로그인이 필요한 페이지인데 유저가 없으면 리다이렉트
  if (!user && request.nextUrl.pathname.startsWith("/favorites")) {
    const url = new URL("/login", request.url);
    url.searchParams.set("redirect", "true");
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/favorites/:path*"],
};
