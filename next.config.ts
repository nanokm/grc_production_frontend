import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Enable standalone output for Docker production builds
  output: "standalone",
};

export default nextConfig;
