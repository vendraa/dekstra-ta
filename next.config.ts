import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production",
  },

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;