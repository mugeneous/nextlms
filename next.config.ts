import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-337062e00c0f4c9abd71886cf71370cf.r2.dev",
        pathname: "/**",
        port: "",
        search: "",
      },
    ],
  },
};

export default nextConfig;
