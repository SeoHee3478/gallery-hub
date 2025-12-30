export function getBaseUrl() {
  // 브라우저 환경
  if (typeof window !== "undefined") {
    return ""; // 상대 경로 사용
  }

  // 서버 환경
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`; // Vercel 자동 제공
  }

  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  // 로컬 개발 환경
  return "http://localhost:3000";
}
