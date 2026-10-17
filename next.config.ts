import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // cacheComponents: true,
  // partialPrefetching: true,
  reactCompiler: true,
  output: "export",
  images: {
    unoptimized: true, // required for static export with next/image
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
        ],
      },
    ];
  },
};

export default nextConfig;