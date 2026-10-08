import { detIser } from "./det-iser-i-tennene";
import { reddForTannlegen } from "./redd-for-tannlegen";
import { slikPusserDu } from "./slik-pusser-du-tennene";
import { tannkjottetBlor } from "./tannkjottet-blor";
import { vondtITanna } from "./vondt-i-tanna";
import type { Artikkel } from "./typer";

/* Every «Råd og tips» article, in the order the list shows them. A plain
   module (see klinikk.ts). A DRAFT: the clinic should read the texts
   before they go live. */

export const ARTIKLER: Artikkel[] = [vondtITanna, detIser, tannkjottetBlor, reddForTannlegen, slikPusserDu];

export const finnArtikkel = (slug: string) => ARTIKLER.find((a) => a.slug === slug);

export * from "./typer";
export { GJENNOMGATT, KILDE, type Kilde } from "./kilder";
