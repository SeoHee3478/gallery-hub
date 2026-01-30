// src/app/api/auth/callback/route.ts
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const cookieStore = await cookies();
    const response = NextResponse.redirect(
      new URL("/exhibitions", request.url),
    );

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
      },
    );

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(
        new URL("/login?error=인증에 실패했습니다", request.url),
      );
    }

    const email = data.user?.email;
    if (email) {
      return NextResponse.redirect(
        new URL(
          `/exhibitions?email=${encodeURIComponent(email)}&verified=true`,
          request.url,
        ),
      );
    }

    return response;
  }

  return NextResponse.redirect(new URL("/login", request.url));
}
