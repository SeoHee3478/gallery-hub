export function getBaseUrl() {
  // 브라우저 환경
  if (typeof window !== "undefined") {
    return "";
  }

  // 서버 환경 - 환경변수만 사용
  return process.env.NEXT_PUBLIC_SITE_URL || "";
}
