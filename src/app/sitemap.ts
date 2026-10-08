import type { MetadataRoute } from "next";
import { klinikk } from "@/data/klinikk";
import { ARTIKLER, RAD_OG_TIPS } from "@/data/artikler";

/**
 * /sitemap.xml: the site's pages, at the clinic's own domain (the canonical
 * address in layout.tsx). No lastModified: a build date would not say when
 * a page's content last changed, and Google ignores dates it can't trust.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: klinikk.url, changeFrequency: "monthly", priority: 1 },
    { url: `${klinikk.url}/behandlinger`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${klinikk.url}${RAD_OG_TIPS.sti}`, changeFrequency: "monthly", priority: 0.7 },
    ...ARTIKLER.map((a) => ({ url: `${klinikk.url}${RAD_OG_TIPS.sti}/${a.slug}`, changeFrequency: "yearly" as const, priority: 0.6 })),
  ];
}
