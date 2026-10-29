import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  async redirects() {
    return [
      {
        source: "/itpo",
        destination: "https://itpo.vercel.app/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

