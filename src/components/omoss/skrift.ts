import { Cormorant_Garamond } from "next/font/google";

/** The type on the old photographs: a classic serif, as printed on the mount of a studio portrait. Only the «Om oss» page loads it. */
export const kortskrift = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  display: "swap",
  // not preloaded: Next.js otherwise preloads it on every page, the front page too,
  // where it costs 76 KB before the first paint and shows nowhere
  preload: false,
});
