import type { Kilde } from "@/data/artikler/kilder";
import type { Lapp, TegningId } from "@/data/artikler/typer";

/* The shape of a treatment's own page (/behandlinger/[slug]): a note from
   the clinic, like the «Råd og tips» notes, with the treatment told as a
   comic strip of pen drawings. Plain data: strings and ids only. Drawings
   are named by id and looked up in components/behandlinger/side/tegninger.tsx. */

/** A drawing on a treatment page: one of the articles', or one of the treatments' own. */
export type BTegning =
  | TegningId
  | "rot-frisk"
  | "rot-syk"
  | "rot-renses"
  | "rot-medisin"
  | "rot-fylt"
  | "rot-krone"
  | "rontgen"
  | "rontgen-hake"
  | "gummiduk"
  | "lupe"
  | "plan"
  | "ande"
  | "skrape"
  | "flekk"
  | "bor"
  | "underlag"
  | "fylt"
  | "lampe"
  | "visdom"
  | "trekk"
  | "sting"
  | "kompress"
  | "implantat-skrue"
  | "implantat-gror"
  | "implantat-krone"
  | "mangler"
  | "avtrykk"
  | "stubb"
  | "krone-satt"
  | "provisorium"
  | "farge"
  | "skinne"
  | "hvit";

/** One panel of the comic strip, with a line under it. `mellom`: a step not everyone needs, in a dashed frame. */
export type Rute = { tegning: BTegning; tekst: string; mellom?: boolean };

export type Del =
  /** A part of the note with a sketch in the margin. A title ending in «?» is also a question for search engines. */
  | { type: "tekst"; id: string; tittel: string; avsnitt: string[]; tegning: BTegning }
  /** Things you may notice, each with a small sketch. */
  | { type: "tegn"; id: string; tittel: string; intro?: string; punkter: { tekst: string; tegning: BTegning }[]; etter?: string }
  /** The treatment itself, as a comic strip. */
  | { type: "serie"; id: string; tittel: string; ruter: Rute[]; etter?: string }
  /** What it costs: ring for the price, and what Helfo may cover. `sporsmal` is the question for search engines. */
  | { type: "pris"; id: string; sporsmal: string; tekst: string; helfo: string; tegning: BTegning }
  | { type: "lapp"; lapp: Lapp };

export type Behandlingsside = {
  /** The same id as the treatment in the /behandlinger book (grupper.ts). */
  slug: string;
  navn: string;
  ingress: string;
  lesetid: string;
  /** For search engines. */
  beskrivelse: string;
  deler: Del[];
  /** The last words of the note, above the button. */
  slutt: string;
  kilder: Kilde[];
};

export const PRIS_TITTEL = "Hva koster det?";
