import { klinikk } from "@/data/klinikk";
import type { Kilde } from "./kilder";

/* The shape of a «Råd og tips» article. Plain data: strings and ids only,
   so the same objects can be read by server components and handed to the
   client-side check at the bottom. Drawings are named by id and looked up
   in components/artikler/tegninger.tsx. */

export type TegningId =
  | "nerve"
  | "hull"
  | "sprekk"
  | "tannkjott"
  | "betennelse"
  | "stille"
  | "hevelse"
  | "borste"
  | "glass"
  | "tablett"
  | "kanaler"
  | "slitt"
  | "tannhals"
  | "plakk"
  | "tannstein"
  | "skraa"
  | "traad"
  | "tube"
  | "klokke"
  | "allesider"
  | "snakke"
  | "haand"
  | "roligtann"
  | "steg"
  | "hjerte";

/** A yellow sticky note between two sections. */
export type Lapp = { slag: "visste" | "triks" | "tips"; tekst: string };

export type Del =
  /** A question, a few short paragraphs, and a pen sketch in the margin. */
  | { type: "tekst"; id: string; tittel: string; avsnitt: string[]; tegning?: TegningId }
  /** A question and a few items side by side, each with its own small sketch. */
  | {
      type: "liste";
      id: string;
      tittel: string;
      intro?: string;
      punkter: { id: string; navn: string; tekst: string; ekstra?: string; tegning: TegningId }[];
      /** The label in front of each item's `ekstra`, e.g. «Slik kjennes det:». */
      ekstraNavn?: string;
    }
  /** Things to do, one per line with a small sketch, and an optional warning. */
  | { type: "tips"; id: string; tittel: string; punkter: { tekst: string; tegning: TegningId }[]; obs?: string }
  | { type: "lapp"; lapp: Lapp };

/** What the reader should do next: words, and a button to book or to ring. */
export type Handling = { tittel: string; tekst: string; knapp?: "bestill" | "ring"; stengt?: boolean };

export type Valg = {
  id: string;
  /** What the reader taps, in their own words. */
  svar: string;
  tegning: TegningId;
  overskrift: string;
  forklaring: string;
  handling?: Handling;
  /** Another article that says more. */
  lenke?: { tekst: string; slug: string };
};

/** The check at the bottom: tap what fits, get a hint. */
export type Sjekk = { tittel: string; intro: string; hjelp: string; merke: string; valg: Valg[]; forbehold?: string };

export type Artikkel = {
  slug: string;
  tittel: string;
  /** A few words for the crumbs. */
  kort: string;
  ingress: string;
  lesetid: string;
  /** For search engines and the list of articles. */
  beskrivelse: string;
  /** The sketch on the article's card in the list. */
  tegning: TegningId;
  deler: Del[];
  sjekk: Sjekk;
  /** The last words of the note, above the button. */
  slutt: string;
  /** What the words rest on, listed at the bottom of the note. */
  kilder: Kilde[];
};

const { telefon, apningstider } = klinikk;

/** The usual next steps, so every article says them the same way. */
export const HANDLING = {
  bestill: { tittel: "Kan vente litt", tekst: "Bestill en vanlig time.", knapp: "bestill" },
  iDag: { tittel: "Ring oss i dag", tekst: `Ring ${telefon.visning}. Vi prøver å finne en time så fort vi kan.`, knapp: "ring" },
  naa: { tittel: "Ring nå", tekst: `Ring ${telefon.visning} med en gang.`, knapp: "ring", stengt: true },
} as const satisfies Record<string, Handling>;

export const STENGT = `Vi har åpent ${apningstider.dager.toLowerCase()} ${apningstider.fra}–${apningstider.til}. Har vi stengt, ring legevakten på 116 117.`;

/** The section itself: where it lives and what it is called. */
export const RAD_OG_TIPS = {
  sti: "/rad-og-tips",
  navn: "Råd og tips",
  ingress: "Korte, enkle tekster om vanlige ting i munnen: når det gjør vondt, når det iser eller blør, og hvordan du tar vare på tennene. Skrevet så alle kan forstå dem.",
} as const;

export const FORBEHOLD = "Dette er bare et hint. Det er tannlegen som finner ut hva det er.";
