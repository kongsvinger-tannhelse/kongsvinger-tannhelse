/* Which treatments have a page of their own, without their texts, so the
   front page and the book can link to them without loading every page's
   words. Keep it in step with BEHANDLINGSSIDER in index.ts (the build
   checks it). A plain module. */

export const MED_SIDE = ["tannsjekk", "tannfylling", "tannbleking", "tannrens", "rotfylling", "visdomstenner", "tannkrone", "tannimplantat"] as const;

export const harSide = (id: string) => (MED_SIDE as readonly string[]).includes(id);

/** Where a treatment's page lives. */
export const sideSti = (slug: string) => `/behandlinger/${slug}`;
