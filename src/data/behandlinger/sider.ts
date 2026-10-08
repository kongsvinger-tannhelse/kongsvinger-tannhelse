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
  "trekking-av-tenner",
  "visdomstenner",
  "tannskade",
  "tannkrone",
  "tannbro",
  "skallfasetter",
  "tannimplantat",
  "helprotese",
] as const;

export const harSide = (id: string) => (MED_SIDE as readonly string[]).includes(id);

/** Where a treatment's page lives. */
export const sideSti = (slug: string) => `/behandlinger/${slug}`;
