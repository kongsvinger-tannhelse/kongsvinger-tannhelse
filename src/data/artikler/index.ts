import { detIser } from "./det-iser-i-tennene";
import { hvaDekkerHelfo } from "./hva-dekker-helfo";
import { reddForTannlegen } from "./redd-for-tannlegen";
import { slikPusserDu } from "./slik-pusser-du-tennene";
import { tannkjottetBlor } from "./tannkjottet-blor";
import { vondtITanna } from "./vondt-i-tanna";
import { GRUPPER, type Artikkel, type Del } from "./typer";

/* Every «Råd og tips» article, in the order the list shows them. A plain
   module (see klinikk.ts). A DRAFT: the clinic should read the texts
   before they go live. */

export const ARTIKLER: Artikkel[] = [vondtITanna, detIser, tannkjottetBlor, reddForTannlegen, slikPusserDu, hvaDekkerHelfo];

export const finnArtikkel = (slug: string) => ARTIKLER.find((a) => a.slug === slug);

/** The articles by need, for the list on /rad-og-tips. A group with no articles is left out. */
export const ARTIKLER_GRUPPERT = GRUPPER.map((g) => ({ ...g, artikler: ARTIKLER.filter((a) => a.gruppe === g.id) })).filter((g) => g.artikler.length > 0);

/** The pieces of running text in a section, where a sticky note can be pinned. */
export function tekstbiter(del: Del): string[] {
  switch (del.type) {
    case "tekst":
      return del.avsnitt;
    case "liste":
      return [...(del.intro ? [del.intro] : []), ...del.punkter.flatMap((p) => [p.tekst, ...(p.ekstra ? [p.ekstra] : [])])];
    case "tips":
      return [...del.punkter.map((p) => p.tekst), ...(del.obs ? [del.obs] : [])];
    case "lapp":
      return [];
  }
}

const antall = (tekst: string, bit: string) => tekst.split(bit).length - 1;

/* Every pinned note must find its phrase, exactly once, in the section just
   before it. This runs when the data loads, so a typo or a reworded sentence
   stops `next build` instead of leaving a note with nothing to point at. */
for (const a of ARTIKLER) {
  let forrige: Exclude<Del, { type: "lapp" }> | null = null;
  for (const del of a.deler) {
    if (del.type !== "lapp") {
      forrige = del;
      continue;
    }
    if (!forrige) throw new Error(`Råd og tips «${a.slug}»: en lapp må komme etter en del, ikke først.`);
    const { feste } = del.lapp;
    if (feste === undefined) continue;
    const treff = tekstbiter(forrige).reduce((sum, t) => sum + antall(t, feste), 0);
    if (treff !== 1) {
      throw new Error(
        `Råd og tips «${a.slug}»: lappen «${del.lapp.tekst.slice(0, 40)}…» skal festes til «${feste}», men teksten finnes ${treff} ganger i delen foran («${forrige.id}»). Den må finnes nøyaktig én gang.`,
      );
    }
  }
}

export * from "./typer";
export { GJENNOMGATT, KILDE, type Kilde } from "./kilder";
