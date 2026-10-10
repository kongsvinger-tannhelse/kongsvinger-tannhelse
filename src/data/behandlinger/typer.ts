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
  | "hvit"
  | "bro"
  | "fasett"
  | "fasett-slip"
  | "protese"
  | "bittskinne"
  | "gnissing"
  | "melk"
  | "tyggis"
  | "snakke-helse"
  | "snakke-stress"
  | "lupe-rad"
  | "lupe-gap"
  | "lupe-slitt"
  | "speil"
  | "rontgen-to"
  | "tannkart"
  | "kalender"
  | "bro-lost"
  | "valg"
  | "gips"
  | "bro-traad"
  | "kjeve-sar"
  | "kjeve-ro"
  | "avtrykk-bitt"
  | "fylling-snitt"
  | "rolig-hull"
  | "tann-sover"
  | "kald-varm"
  | "peroksid"
  | "timeglass"
  | "lupe-emalje"
  | "avtrykk-smil"
  | "bleke-sart"
  | "hvit-falmer"
  | "bleke-18"
  | "lupe-plakk"
  | "misfarget"
  | "mellomrom"
  | "autorisert"
  | "to-stadier"
  | "blor"
  | "los-tann"
  | "sonde"
  | "hjem-utstyr"
  | "skrape-under"
  | "for-etter"
  | "gjentak"
  | "tapt-vev"
  | "rontgen-rot"
  | "rolig-nerve"
  | "snakke-rot"
  | "spytt-skjold"
  | "kake"
  | "straaling"
  | "pilleglass"
  | "snakke-medisin"
  | "rad-torr"
  | "lupe-rot"
  | "rolig-trekk"
  | "snakke-luke"
  | "luke-sporsmal"
  | "atte"
  | "rontgen-visdom"
  | "rolig-visdom"
  | "trekk-deler"
  | "snakke-dager"
  | "hoven-kinn"
  | "fortann-knekt"
  | "rontgen-fortann"
  | "fylt-fortann"
  | "krone-fortann"
  | "kontroller"
  | "fortann-endring"
  | "krone-kappe"
  | "lite-igjen"
  | "farge-krone"
  | "skanner"
  | "krone-traad"
  | "fortenner-fasett"
  | "valg-fasett"
  | "farge-fortann"
  | "gips-fortenner"
  | "implantat-deler"
  | "bein-nok"
  | "rontgen-luke"
  | "rolig-luke"
  | "implantat-farge"
  | "plaster-kinn"
  | "implantat-borste"
  | "protese-voks"
  | "protese-implantat"
  | "snakke-protese"
  | "avtrykk-tannlos"
  | "bitt-maal"
  | "protese-smil"
  | "spire"
  | "verk-to-steder"
  | "snakke-verk"
  | "lupe-verk"
  | "rontgen-verk"
  | "plan-verk"
  | "verk-fylling"
  | "verk-rot"
  | "verk-trekk"
  | "verk-tannkjott"
  | "telefon-morgen"
  | "byll-snitt"
  | "kul-tannkjott"
  | "bite-vondt"
  | "vond-smak"
  | "kinn-vondt"
  | "feber"
  | "blaalys"
  | "rontgen-byll"
  | "byll-letter"
  | "antibiotika"
  | "byll-valg"
  | "delprotese"
  | "veiviser"
  | "snakke-del"
  | "avtrykk-del"
  | "opplegg"
  | "tegning-del"
  | "voks-speil"
  | "inn-ut"
  | "lupe-klammer"
  | "bar-rot"
  | "ising-hull"
  | "ising-sprekk"
  | "ising-fylling"
  | "ising-tannkjott"
  | "ising-nerve"
  | "snakke-ising"
  | "myk-puss"
  | "egne-midler"
  | "tynt-lag"
  | "ising-reparert"
  | "munn-ande"
  | "belegg-tunge"
  | "mat-mellom"
  | "hull-ande"
  | "sove-apen"
  | "lok"
  | "puss-traad"
  | "tungeskrape"
  | "vannflaske"
  | "snakke-ande"
  | "lupe-ande"
  | "rens-ande"
  | "lege"
  | "fylling-kant"
  | "apen-tann"
  | "rontgen-fylling"
  | "fjerne-kant"
  | "lapp-fylling"
  | "innlegg-krone"
  | "krone-sement"
  | "hull-under"
  | "sprekk-under"
  | "klissete"
  | "vekt"
  | "sement-slitt"
  | "lupe-krone"
  | "rontgen-krone"
  | "behandle-stump"
  | "ny-krone";

/** The larger pen scene beside a page's title. */
export type Tittelbilde = "stol" | "bro-elv" | "natt" | "fylling" | "bleking" | "rens" | "tannkjott" | "rot" | "torr" | "tang" | "ugle" | "ball" | "krone" | "skjell" | "implantat" | "gebiss" | "klut" | "kulefisk" | "puslespill" | "lue" | "klesklype" | "skjaere" | "vind";

/** The page's own ink: one muted colour for its comic frames, the washes behind its drawings and its notes. */
export type Blekk = "natt" | "tegl" | "salvie";

/** The shape the comic strip takes: squares in rows, or round frames on a string. */
export type Stripe = "ruter" | "perler";

/** What only this page has, across the whole sheet: the top of the sheet is night. */
export type Signatur = "natt";

/** One panel of the comic strip, with a line under it. `mellom`: a step not everyone needs, in a dashed frame. */
export type Rute = { tegning: BTegning; tekst: string; mellom?: boolean };

export type Del =
  /** A part of the note with a sketch in the margin. A title ending in «?» is also a question for search engines. `lenke`: a «Råd og tips» article that says more. `varsel`: the danger signs, a card in red pen with the numbers to call as links. */
  | { type: "tekst"; id: string; tittel: string; avsnitt: string[]; tegning: BTegning; lenke?: { tekst: string; slug: string }; varsel?: boolean }
  /** Things you may notice, each with a small sketch. */
  | { type: "tegn"; id: string; tittel: string; intro?: string; punkter: { tekst: string; tegning: BTegning }[]; etter?: string }
  /** The treatment itself, as a comic strip. */
  | { type: "serie"; id: string; tittel: string; ruter: Rute[]; etter?: string }
  | { type: "lapp"; lapp: Lapp };

export type Behandlingsside = {
  /** The same id as the treatment in the /behandlinger book (grupper.ts). */
  slug: string;
  navn: string;
  ingress: string;
  /**
   * One line under the intro that ties the page to the clinic: what we do
   * when you come to us with this, and nothing we can't stand behind (no
   * promises, no claims to do every case ourselves). Every page has one but
   * the akutt pages, which open with the call card instead.
   */
  hosOss?: string;
  /** The pen scene beside the title. */
  tittelbilde: Tittelbilde;
  /** The page's own ink. Without one, the notes are yellow and the frames slate. */
  blekk?: Blekk;
  /** The shape of the comic strip; squares in rows if not given. */
  stripe?: Stripe;
  signatur?: Signatur;
  /** For search engines. */
  beskrivelse: string;
  deler: Del[];
  /** The last words of the note, above the button. */
  slutt: string;
  kilder: Kilde[];
};
