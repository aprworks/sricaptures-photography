import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // 75 = default grid/gallery quality, 90 = lightbox / full-bleed hero
    qualities: [75, 90],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      // Add your CDN host here if you ever host originals outside /public.
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
