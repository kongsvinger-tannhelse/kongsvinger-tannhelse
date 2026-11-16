import type { MetadataRoute } from "next";
import { klinikk } from "@/data/klinikk";
import { ARTIKLER, GJENNOMGATT, RAD_OG_TIPS } from "@/data/artikler";
import { BEHANDLINGSSIDER, BGJENNOMGATT, sideSti } from "@/data/behandlinger";

/**
 * /sitemap.xml: the site's pages, at the clinic's own domain (the canonical
 * address in layout.tsx). No build date as lastModified: it would not say
 * when a page's content last changed, and Google ignores dates it can't
 * trust. The treatment pages and articles carry the date their texts were
 * last checked against their sources, the same date their structured data
 * gives; move it when the texts change.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: klinikk.url, changeFrequency: "monthly", priority: 1 },
    { url: `${klinikk.url}/behandlinger`, changeFrequency: "monthly", priority: 0.8 },
    ...BEHANDLINGSSIDER.map((b) => ({ url: `${klinikk.url}${sideSti(b.slug)}`, lastModified: BGJENNOMGATT, changeFrequency: "yearly" as const, priority: 0.7 })),
    { url: `${klinikk.url}/om-oss`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${klinikk.url}/kontakt`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${klinikk.url}${RAD_OG_TIPS.sti}`, changeFrequency: "monthly", priority: 0.7 },
    ...ARTIKLER.map((a) => ({ url: `${klinikk.url}${RAD_OG_TIPS.sti}/${a.slug}`, lastModified: GJENNOMGATT, changeFrequency: "yearly" as const, priority: 0.6 })),
    { url: `${klinikk.url}/personvern`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${klinikk.url}/vilkar`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
