import type { NextConfig } from "next";

// where the Express API lives. Used on the server only, so it is not a NEXT_PUBLIC_ variable.
const BACKEND_ORIGIN = process.env.BACKEND_ORIGIN ?? "http://localhost:5000";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // `output: "export"` was removed: proxy.ts and the API rewrite below need a running
  // Next.js server (next start / Vercel / Docker), a static export cannot run them.
  images: {
    unoptimized: true,
  },

  // Browser -> /api/v1/* on the SAME origin as the site -> Express.
  // This keeps the httpOnly auth cookies first-party, which is what lets proxy.ts read them
  // and avoids third-party cookie blocking in production.
  // Set NEXT_PUBLIC_API_BASE_URL=/api/v1 to use it. A full backend URL still works in dev.
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: `${BACKEND_ORIGIN}/api/v1/:path*`,
      },
    ];
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
