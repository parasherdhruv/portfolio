import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Suppress false-positive lockfile warning when project is inside a monorepo-like directory
  outputFileTracingRoot: path.join(__dirname),
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },
};

export default nextConfig;
