import type { MetadataRoute } from "next";
import { klinikk } from "@/data/klinikk";

/** /robots.txt: everything may be crawled, and here is the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${klinikk.url}/sitemap.xml`,
  };
}
