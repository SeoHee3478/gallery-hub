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
  async redirects() {
    return [
      {
        source: "/",
        destination: "/exhibitions",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
