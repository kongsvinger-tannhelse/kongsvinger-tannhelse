import { behandlinger } from "@/data/klinikk";

/* The treatments as the section shows them: the three groups in the
   column's order, each treatment with an id for its scene. The text is the
   old site's, unchanged. A plain module (see klinikk.ts). */

/** "Ising i tenner" → "ising-i-tenner", "Dårlig ånde" → "darlig-ande". */
export const tilId = (navn: string) =>
  navn
    .toLowerCase()
    .replace(/æ/g, "ae")
    .replace(/ø/g, "o")
    .replace(/å/g, "a")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const KORT = { ordinaer: "Ordinær", akutt: "Akutt", estetisk: "Estetisk" } as const;

export const GRUPPER = (["ordinaer", "akutt", "estetisk"] as const).map((id) => ({
  id,
  kort: KORT[id],
  tittel: behandlinger[id].tittel,
  liste: behandlinger[id].liste.map((b) => ({ ...b, id: tilId(b.navn) })),
}));

export type Gruppe = (typeof GRUPPER)[number];

/** Every treatment in order, for stepping through them all. */
export const ALLE = GRUPPER.flatMap((g, gi) => g.liste.map((_, i) => ({ g: gi, i })));

/** The front page shows one treatment from each group; the rest are on /behandlinger. */
const UTVALG = ["tannsjekk", "tannsmerte", "tannimplantat"];

export const UTVALGTE = GRUPPER.map((g) => ({ ...g, liste: g.liste.filter((t) => UTVALG.includes(t.id)) }));

export const UTVALGTE_REKKE = UTVALGTE.map((_, gi) => ({ g: gi, i: 0 }));

/** The front page's three, flat: each treatment with the group it belongs to. */
export const TRE = UTVALGTE.map((g) => ({ ...g.liste[0], gruppe: g }));
