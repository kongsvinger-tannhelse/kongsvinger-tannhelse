import type { MED_SIDE } from "@/data/behandlinger/sider";

/* Which treatment pages each «Råd og tips» article is about, so the two link
   to each other: the article lists the pages under «Les også», and each page
   lists the article under its own «Les også» (unless a part of the page
   already links to it). Links only, with the target's own name as the text,
   so nothing new is said about either. A plain module (see klinikk.ts).

   An article with no matching treatment page is left out. */

type Slug = (typeof MED_SIDE)[number];

export const ARTIKKEL_SIDER: Record<string, readonly Slug[]> = {
  "vondt-i-tanna": ["tannverk", "hevelse"],
  "det-iser-i-tennene": ["ising-i-tenner"],
  "tannkjottet-blor": ["tannkjottbehandling"],
  "slik-pusser-du-tennene": ["tannrens"],
};

/** The articles about a treatment page, in the order the list shows them. */
export const artiklerOm = (slug: string) => Object.keys(ARTIKKEL_SIDER).filter((a) => ARTIKKEL_SIDER[a].includes(slug as Slug));
