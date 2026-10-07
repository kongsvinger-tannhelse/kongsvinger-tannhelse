import { ansatte } from "@/data/klinikk";

/* The three at the clinic as the «Om oss» section shows them, and the old
   site's own words. A plain module (see klinikk.ts). */

/** The old site's «Om oss – Velg oss fordi», unchanged. */
export const TEKST =
  "Hos oss møter du et dedikert team som brenner for å skape gode opplevelser og varige resultater. Vi kombinerer moderne teknologi med varme smil, slik at du kan føle deg trygg i stolen.";

/** Where each face is in its photo, and how far to zoom so the three heads are the same size (the photos are framed differently). */
const UTSNITT: Record<string, { fokus: string; zoom: number }> = {
  "Per Hafthun": { fokus: "50% 30%", zoom: 1 },
  "Umer Zia": { fokus: "50% 28%", zoom: 1.08 },
  "Eba Wasty": { fokus: "51% 22%", zoom: 1.75 },
};

export const PERSONER = ansatte.map((a) => ({ ...a, ...(UTSNITT[a.navn] ?? { fokus: "50% 30%", zoom: 1 }) }));
export type Person = (typeof PERSONER)[number];
