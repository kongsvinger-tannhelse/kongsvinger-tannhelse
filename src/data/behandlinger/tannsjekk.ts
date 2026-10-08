import { BKILDE } from "./kilder";
import type { Behandlingsside } from "./typer";

/* The check-up. Every line checked on 8 October 2026 against the sources at
   the bottom; the comments name the source behind each part. «Finner
   problemer tidlig, mens de er små og enkle å behandle» is the clinic's own
   text (klinikk.ts). Nothing about whether it hurts: no source says. */

export const tannsjekk: Behandlingsside = {
  slug: "tannsjekk",
  navn: "Tannsjekk",
  // the clinic's own words
  ingress: "En tannsjekk er den enkleste måten å holde munnen frisk på. Vi finner problemer tidlig, mens de er små og enkle å behandle.",
  lesetid: "2 minutter å lese",
  beskrivelse: "Tannsjekk hos tannlegen i Kongsvinger: hva som skjer på en tannsjekk, hvor ofte du bør komme, røntgen, og hva det koster.",
  deler: [
    {
      type: "tekst",
      id: "hva",
      tittel: "Hva er en tannsjekk?",
      avsnitt: [
        // Helsedirektoratet, voksne: history, clinical examination of teeth, mouth and jaws, x-rays
        "På en tannsjekk går tannlegen gjennom helsen din, undersøker tennene, munnen og kjeven, og ser på røntgenbildene.",
        // Helsedirektoratet: diagnosis and a plan for follow-up; the clinic's text (hull, tannkjøttsykdom, slitasje)
        "Målet er å finne hull, tannkjøttsykdom og slitasje tidlig, og lage en plan for hva som bør gjøres.",
      ],
      tegning: "lupe",
    },
    {
      type: "serie",
      id: "slik",
      tittel: "Slik går det for seg",
      ruter: [
        // Helsedirektoratet: updating the history (anamnese)
        { tegning: "snakke", tekst: "Først snakker vi om helsen din, og om noe har endret seg siden sist." },
        // Helsedirektoratet: clinical examination of teeth, mouth and jaws
        { tegning: "lupe", tekst: "Tannlegen undersøker tennene, tannkjøttet, munnen og kjeven." },
        // SML Tannrøntgen: at ordinary check-ups two bitewing images are taken
        { tegning: "rontgen", tekst: "Trengs det, tas det røntgenbilder. Ved en vanlig kontroll er det ofte to små bilder.", mellom: true },
        // Helsedirektoratet: diagnosis and a plan for follow-up
        { tegning: "plan", tekst: "Til slutt får du vite hva vi fant, og en plan for veien videre." },
      ],
    },
    // SML Tannrøntgen: two ordinary dental images ≈ 6 hours of natural background radiation
    { type: "lapp", lapp: { slag: "visste", tekst: "To vanlige tannrøntgenbilder gir omtrent like mye stråling som seks timer med den naturlige strålingen rundt oss." } },
    {
      type: "tekst",
      id: "hvor-ofte",
      tittel: "Hvor ofte bør jeg gå til tannsjekk?",
      avsnitt: [
        // Helsedirektoratet: between 12 and 24 months for adults, set after an individual risk assessment
        "Det er forskjellig fra person til person. For voksne går det ofte ett til to år mellom hver gang.",
        "Tannlegen vurderer hvor ofte du bør komme, ut fra tennene og tannkjøttet ditt.",
      ],
      tegning: "klokke",
    },
    // the clinic's own words (klinikk.ts); Tannlegeforeningen, Gode råd: visit the dentist regularly
    { type: "lapp", lapp: { slag: "tips", tekst: "Går du jevnlig til tannlegen, holder tennene seg friske lenger." } },
    {
      type: "pris",
      id: "pris",
      sporsmal: "Hva koster en tannsjekk?",
      tekst: "Ring oss, så får du vite hva en tannsjekk koster.",
      // Helfo Tilstander: adults pay as a rule; support only for 15 conditions
      helfo: "En vanlig tannsjekk betaler voksne selv. Helfo dekker bare undersøkelse og behandling ved noen sykdommer og tilstander.",
      tegning: "regning",
    },
  ],
  slutt: "Er det lenge siden sist? Bestill en tannsjekk, så ser vi på tennene dine.",
  kilder: [BKILDE.hdirVoksne, BKILDE.smlTannrontgen, BKILDE.ntfRad, BKILDE.helfoTilstander],
};
