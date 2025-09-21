import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* inne opcje, jeśli są */
  images: {
    domains: ["res.cloudinary.com"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
