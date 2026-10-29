import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

