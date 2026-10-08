/* Which treatments have a page of their own, without their texts, so the
   front page and the book can link to them without loading every page's
   words. Keep it in step with BEHANDLINGSSIDER in index.ts (the build
   checks it). A plain module. */

export const MED_SIDE = [
  "tannsjekk",
  "tannfylling",
  "tannbleking",
  "tannrens",
  "tannkjottbehandling",
  "rotfylling",
  "munntorrhet",
  "tanngnissing",
  "ising-i-tenner",
  "trekking-av-tenner",
  "darlig-ande",
  "visdomstenner",
  "tannskade",
  "tannverk",
  "mistet-fylling",
  "hevelse",
  "losnet-tannkrone",
  "tannkrone",
  "tannbro",
  "skallfasetter",
  "tannimplantat",
  "delprotese",
  "helprotese",
] as const;

/** Treatments in the book that share another's page: tannsmerte and tannverk are one thing, and the tannrens page tells what tannstein is. */
export const SAMME_SIDE: Record<string, (typeof MED_SIDE)[number]> = {
  tannsmerte: "tannverk",
  tannstein: "tannrens",
};

export const harSide = (id: string) => (MED_SIDE as readonly string[]).includes(id) || id in SAMME_SIDE;

/** Where a treatment's page lives. */
export const sideSti = (slug: string) => `/behandlinger/${SAMME_SIDE[slug] ?? slug}`;
