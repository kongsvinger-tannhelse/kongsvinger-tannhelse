import type { CSSProperties } from "react";
import type { Blekk } from "@/data/behandlinger/typer";

/* Each treatment page's own ink: one muted colour, set as CSS variables on
   the page, for the comic frames, the watercolour washes behind the pen
   drawings, the film's dark band and the sticky notes. Text stays dark.
   A page without an ink keeps the slate frames and yellow notes: the
   fallbacks in side.module.css and GulLapp. A plain module. */

type Farger = {
  /** Frame lines and the dotted string between round frames. */
  ramme: string;
  /** The offset shadow under a frame. */
  skygge: string;
  /** Inside a frame. */
  rute: string;
  /** The watercolour wash behind a drawing. */
  vask: string;
  /** The film's dark band. */
  mork: string;
  lapp: string;
  /** The note's label (4.5:1 or more on the note). */
  lappBlekk: string;
  lappTekst: string;
  lappSkygge: string;
};

const FARGER: Record<Blekk, Farger> = {
  // night blue: grinding in your sleep
  natt: {
    ramme: "#36437E",
    skygge: "rgba(54,67,126,0.16)",
    rute: "#FBFBFE",
    vask: "#E6E9F7",
    mork: "#1F2850",
    lapp: "#DFE5F8",
    lappBlekk: "#2E3A75",
    lappTekst: "#1C2350",
    lappSkygge: "rgba(46,58,117,0.42)",
  },
  // brick: what shouldn't wait
  tegl: {
    ramme: "#A8432C",
    skygge: "rgba(168,67,44,0.16)",
    rute: "#FFFCF9",
    vask: "#FAE6DD",
    mork: "#2B211E",
    lapp: "#F9DCCF",
    lappBlekk: "#8A3218",
    lappTekst: "#4A1A0D",
    lappSkygge: "rgba(138,50,24,0.42)",
  },
  // sage
  salvie: {
    ramme: "#4E7A5C",
    skygge: "rgba(78,122,92,0.16)",
    rute: "#FCFDFB",
    vask: "#E3EEE0",
    mork: "#1F3326",
    lapp: "#DCEBD3",
    lappBlekk: "#355C40",
    lappTekst: "#1E3524",
    lappSkygge: "rgba(53,92,64,0.42)",
  },
};

/** The CSS variables for a page's ink, or nothing for the default look. */
export function blekkStil(blekk: Blekk | undefined): CSSProperties | undefined {
  if (!blekk) return undefined;
  const f = FARGER[blekk];
  return {
    "--b-ramme": f.ramme,
    "--b-skygge": f.skygge,
    "--b-rute": f.rute,
    "--b-vask": f.vask,
    "--b-mork": f.mork,
    "--b-lapp": f.lapp,
    "--b-lapp-blekk": f.lappBlekk,
    "--b-lapp-tekst": f.lappTekst,
    "--b-lapp-skygge": f.lappSkygge,
  } as CSSProperties;
}
