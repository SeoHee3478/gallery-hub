export function getBaseUrl() {
  // 브라우저 환경
  if (typeof window !== "undefined") {
    return "";
  }

  // 서버 환경
  if (process.env.NODE_ENV === "production") {
    return (
      process.env.NEXT_PUBLIC_SITE_URL || "https://gallery-hub-xi.vercel.app"
    );
  }

  // 개발 환경

  return "http://localhost:3000";
}
