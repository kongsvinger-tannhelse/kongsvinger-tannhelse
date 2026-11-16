import { MED_SIDE } from "./sider";

/* «Les også» under each treatment page: three other treatment pages that go
   with it, so no page is linked from the overview alone. Links only, with the
   target page's own name as the text: no sentence here says that one thing
   leads to another. A plain module (see klinikk.ts).

   Keys and targets are typed as the pages' slugs, so a slug that is not a
   page, or a page left out, is a type error. The checks below cover the rest
   and run when the page is built. */

type Slug = (typeof MED_SIDE)[number];

export const BESLEKTET: Record<Slug, readonly [Slug, Slug, Slug]> = {
  tannsjekk: ["tannrens", "tannfylling", "tannkjottbehandling"],
  tannrens: ["tannsjekk", "tannkjottbehandling", "tannbleking"],
  tannkjottbehandling: ["tannrens", "darlig-ande", "munntorrhet"],
  "darlig-ande": ["tannrens", "munntorrhet", "tannkjottbehandling"],
  munntorrhet: ["darlig-ande", "tannfylling", "tannsjekk"],
  tannfylling: ["rotfylling", "mistet-fylling", "tannverk"],
  "mistet-fylling": ["tannfylling", "losnet-tannkrone", "tannkrone"],
  tannverk: ["tannfylling", "rotfylling", "ising-i-tenner"],
  rotfylling: ["tannverk", "tannkrone", "hevelse"],
  hevelse: ["tannverk", "rotfylling", "visdomstenner"],
  "ising-i-tenner": ["tannfylling", "tannkjottbehandling", "tanngnissing"],
  tanngnissing: ["ising-i-tenner", "tannskade", "tannkrone"],
  tannskade: ["tannkrone", "tannfylling", "tanngnissing"],
  tannkrone: ["losnet-tannkrone", "tannbro", "skallfasetter"],
  "losnet-tannkrone": ["tannkrone", "mistet-fylling", "tannfylling"],
  "trekking-av-tenner": ["tannimplantat", "tannbro", "visdomstenner"],
  visdomstenner: ["trekking-av-tenner", "hevelse", "tannverk"],
  tannbro: ["tannkrone", "tannimplantat", "delprotese"],
  tannimplantat: ["tannbro", "delprotese", "helprotese"],
  delprotese: ["helprotese", "tannbro", "tannimplantat"],
  helprotese: ["delprotese", "tannimplantat", "trekking-av-tenner"],
  skallfasetter: ["tannbleking", "tannkrone", "tannskade"],
  tannbleking: ["skallfasetter", "tannrens", "tannsjekk"],
};

// Each page links to others, never to itself or twice to the same one, and
// every page is linked to from at least two others (besides the overview).
const innkommende = new Map<string, number>(MED_SIDE.map((slug) => [slug, 0]));
for (const slug of MED_SIDE) {
  const mal = BESLEKTET[slug];
  if (mal.includes(slug)) throw new Error(`data/behandlinger/beslektet: ${slug} links to itself`);
  if (new Set(mal).size !== mal.length) throw new Error(`data/behandlinger/beslektet: ${slug} links to the same page twice`);
  for (const m of mal) innkommende.set(m, (innkommende.get(m) ?? 0) + 1);
}
for (const [slug, antall] of innkommende) {
  if (antall < 2) throw new Error(`data/behandlinger/beslektet: ${slug} has only ${antall} link(s) pointing to it, needs 2`);
}
