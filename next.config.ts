import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

/* The old site's addresses (crawl/SITE-BRIEF.md), sent on for good so links
   and search results that still point at them land on the new pages. */
const gamleSider = [
  { source: "/index.html", destination: "/" },
  { source: "/tjenester.html", destination: "/behandlinger" },
  { source: "/omoss.html", destination: "/om-oss" },
  { source: "/kontakt.html", destination: "/kontakt" },
  // where the old contact form posted
  { source: "/send_mail.php", destination: "/kontakt" },
];

/* Its photos, which image search may still show: the same pictures, now WebP. */
const gamleBilder = [
  ...[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => [`bilde${n}.jpg`, `bilde${n}.webp`]),
  ["hafthun.JPG", "hafthun.webp"],
  ["zia.JPG", "zia.webp"],
  ["eba.JPG", "eba.webp"],
  ["logo.png", "logo.png"],
].map(([gammel, ny]) => ({ source: `/${gammel}`, destination: `/images/klinikk/${ny}` }));

const nextConfig: NextConfig = {
  images: {
    // next/image qualities used across the site (Next 16 requires them listed).
    qualities: [75],
    // The defaults plus 1600, 2560 and 3200. Phones get the hero's two layers
    // at 1600 (Utsikt.tsx); wider screens choose from the rest.
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920, 2048, 2560, 3200, 3840],
    // AVIF first: smaller than WebP at the same look; browsers without it get WebP.
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [...gamleSider, ...gamleBilder].map((r) => ({ ...r, permanent: true }));
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
};

export default nextConfig;
