import type { CSSProperties } from "react";
import type { Blekk } from "@/data/behandlinger/typer";

/* Each treatment page's own ink: one muted colour, set as CSS variables on
   the page, for the comic frames, the watercolour washes behind the pen
   drawings and the sticky notes. Text stays dark.
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
    lapp: "#DCEBD3",
    lappBlekk: "#355C40",
    lappTekst: "#1E3524",
    lappSkygge: "rgba(53,92,64,0.42)",
  },
  // ochre: a calendar on the kitchen wall, for the check-up
  oker: {
    ramme: "#94661B",
    skygge: "rgba(148,102,27,0.16)",
    rute: "#FFFDF7",
    vask: "#F7EBD0",
    lapp: "#F3DDB0",
    lappBlekk: "#6E4A0E",
    lappTekst: "#3A2706",
    lappSkygge: "rgba(110,74,14,0.42)",
  },
  // cobalt: the blue light that sets a filling
  kobolt: {
    ramme: "#2F5A9E",
    skygge: "rgba(47,90,158,0.16)",
    rute: "#FBFCFF",
    vask: "#E2EAF8",
    lapp: "#DCE6F8",
    lappBlekk: "#264C88",
    lappTekst: "#142848",
    lappSkygge: "rgba(38,76,136,0.42)",
  },
  // heather: soft violet, for whitening
  lyng: {
    ramme: "#7A5690",
    skygge: "rgba(122,86,144,0.16)",
    rute: "#FEFCFF",
    vask: "#EFE6F4",
    lapp: "#EADFF2",
    lappBlekk: "#5E3F73",
    lappTekst: "#2F1E3B",
    lappSkygge: "rgba(94,63,115,0.42)",
  },
  // mint: fresh and clean, for the cleaning
  mynte: {
    ramme: "#2E8571",
    skygge: "rgba(46,133,113,0.16)",
    rute: "#FBFEFD",
    vask: "#E2F5F1",
    lapp: "#D2F2EA",
    lappBlekk: "#246858",
    lappTekst: "#12352D",
    lappSkygge: "rgba(36,104,88,0.42)",
  },
  // slate: calm, for the root filling
  skifer: {
    ramme: "#4E5F73",
    skygge: "rgba(78,95,115,0.16)",
    rute: "#FBFCFE",
    vask: "#E6EBF1",
    lapp: "#D8E1EB",
    lappBlekk: "#3D4A5A",
    lappTekst: "#1F262E",
    lappSkygge: "rgba(61,74,90,0.42)",
  },
  // moss: the wise owl's forest
  mose: {
    ramme: "#677532",
    skygge: "rgba(103,117,50,0.16)",
    rute: "#FDFEFB",
    vask: "#F1F5E2",
    lapp: "#EBF2D2",
    lappBlekk: "#505B27",
    lappTekst: "#292F14",
    lappSkygge: "rgba(80,91,39,0.42)",
  },
  // ruby: a crown's jewel
  rubin: {
    ramme: "#943A50",
    skygge: "rgba(148,58,80,0.16)",
    rute: "#FEFBFC",
    vask: "#F5E2E7",
    lapp: "#F2D2D9",
    lappBlekk: "#732D3E",
    lappTekst: "#3B1720",
    lappSkygge: "rgba(115,45,62,0.42)",
  },
  // river blue: the Glomma under the bridge
  fjord: {
    ramme: "#2D6987",
    skygge: "rgba(45,105,135,0.16)",
    rute: "#FBFDFE",
    vask: "#E2EFF5",
    lapp: "#D2E7F2",
    lappBlekk: "#235269",
    lappTekst: "#122A36",
    lappSkygge: "rgba(35,82,105,0.42)",
  },
  // plum: for the full denture
  plomme: {
    ramme: "#8A4A6B",
    skygge: "rgba(138,74,107,0.16)",
    rute: "#FEFBFC",
    vask: "#F4E3EC",
    lapp: "#F0D3E2",
    lappBlekk: "#6C3A53",
    lappTekst: "#371E2B",
    lappSkygge: "rgba(108,58,83,0.42)",
  },
  // lavender: the pieces of a partial denture
  lavendel: {
    ramme: "#5F5FA0",
    skygge: "rgba(95,95,160,0.16)",
    rute: "#FBFBFE",
    vask: "#E3E3F4",
    lapp: "#D3D3F0",
    lappBlekk: "#4A4A7D",
    lappTekst: "#262640",
    lappSkygge: "rgba(74,74,125,0.42)",
  },
  // sand: shells on the shore, for veneers
  sand: {
    ramme: "#85704C",
    skygge: "rgba(133,112,76,0.16)",
    rute: "#FEFDFB",
    vask: "#F2EEE5",
    lapp: "#EDE5D7",
    lappBlekk: "#68573B",
    lappTekst: "#352D1E",
    lappSkygge: "rgba(104,87,59,0.42)",
  },
  // granite: calm grey, for taking out a tooth
  granitt: {
    ramme: "#5C6466",
    skygge: "rgba(92,100,102,0.16)",
    rute: "#FBFDFE",
    vask: "#EAEDEE",
    lapp: "#DEE4E5",
    lappBlekk: "#484E50",
    lappTekst: "#252829",
    lappSkygge: "rgba(72,78,80,0.42)",
  },
  // petrol: water, for a dry mouth
  petrol: {
    ramme: "#1F6E78",
    skygge: "rgba(31,110,120,0.16)",
    rute: "#FBFDFE",
    vask: "#E3F3F4",
    lapp: "#D3EDF0",
    lappBlekk: "#18565E",
    lappTekst: "#0C2C30",
    lappSkygge: "rgba(24,86,94,0.42)",
  },
  // rose: healthy gums
  rosen: {
    ramme: "#A65468",
    skygge: "rgba(166,84,104,0.16)",
    rute: "#FEFBFB",
    vask: "#F8E5E3",
    lapp: "#F6D5D3",
    lappBlekk: "#814251",
    lappTekst: "#42222A",
    lappSkygge: "rgba(129,66,81,0.42)",
  },
  // ice blue: for teeth that ache in the cold
  is: {
    ramme: "#3F7FA8",
    skygge: "rgba(63,127,168,0.16)",
    rute: "#FBFDFE",
    vask: "#E2EEF5",
    lapp: "#D2E5F2",
    lappBlekk: "#316383",
    lappTekst: "#193343",
    lappSkygge: "rgba(49,99,131,0.42)",
  },
  // forest: fresh air, for bad breath
  skog: {
    ramme: "#3E6B4A",
    skygge: "rgba(62,107,74,0.16)",
    rute: "#FBFEFC",
    vask: "#E5F3E9",
    lapp: "#D6EDDC",
    lappBlekk: "#30533A",
    lappTekst: "#192B1E",
    lappSkygge: "rgba(48,83,58,0.42)",
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
    "--b-lapp": f.lapp,
    "--b-lapp-blekk": f.lappBlekk,
    "--b-lapp-tekst": f.lappTekst,
    "--b-lapp-skygge": f.lappSkygge,
  } as CSSProperties;
}
