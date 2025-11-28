import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "www.culture.go.kr",
        pathname: "/upload/**",
      },
      {
        protocol: "http",
        hostname: "www.kopis.or.kr",
        pathname: "/upload/**",
      },
    ],
  },
};

export default nextConfig;
