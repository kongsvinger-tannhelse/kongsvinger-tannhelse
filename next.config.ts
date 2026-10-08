import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  images: {
    // next/image qualities used across the site (Next 16 requires them listed).
    qualities: [75],
    // The defaults plus 2560 and 3200: the hero's panorama is about 1600 CSS px
    // wide on a phone, so phones needed ~2800 px and got 3840.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3200, 3840],
    // AVIF first: smaller than WebP at the same look; browsers without it get WebP.
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // Put the CSS in the HTML instead of two render-blocking stylesheet requests
    // (~18 KiB, Tailwind keeps it small). Helps first visits on slow phones; the
    // cost is that the CSS is not cached separately between pages.
    inlineCss: true,
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
