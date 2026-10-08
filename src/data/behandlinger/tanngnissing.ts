import { BKILDE } from "./kilder";
import type { Behandlingsside } from "./typer";

/* Grinding and clenching. Every line checked on 8 October 2026 against the
   sources at the bottom; the comments name the source behind each part.
   SML and NHI differ on how sure the cause is, so the page says «kan».
   Helfo: no support point for grinding itself, only for severe wear. */

export const tanngnissing: Behandlingsside = {
  slug: "tanngnissing",
  navn: "Tanngnissing",
  // the clinic's own words (klinikk.ts)
  ingress: "Tanngnissing er at du biter hardt sammen eller gnisser tennene uten å merke det, oftest mens du sover. Her ser du hva det kan komme av, og hva som kan hjelpe.",
  lesetid: "2 minutter å lese",
  beskrivelse: "Tanngnissing hos tannlegen i Kongsvinger: hva tanngnissing er, tegn du kan merke, hva det kan komme av, og hva som kan hjelpe, som bittskinne.",
  deler: [
    {
      type: "tekst",
      id: "hva",
      tittel: "Hva er tanngnissing?",
      avsnitt: [
        // SML Bruksisme: excessive grinding, gnashing or pressing; often unconscious, in sleep
        "Tanngnissing er at du gnisser, skjærer eller presser tennene hardt mot hverandre. De fleste gjør det uten å merke det, ofte mens de sover.",
        // NHI Tanngnissing: the extent varies
        "Hvor mye, er forskjellig fra person til person.",
      ],
      tegning: "gnissing",
    },
    {
      type: "tegn",
      id: "tegn",
      tittel: "Kjenner du noe av dette?",
      punkter: [
        // NHI Tanngnissing: worn edges, sensitive teeth, sore jaw
        { tekst: "Kantene på tennene er slitt.", tegning: "slitt" },
        { tekst: "Tennene er følsomme.", tegning: "kanaler" },
        { tekst: "Kjeven er sår eller stiv.", tegning: "gnissing" },
      ],
      // NHI Tanngnissing: it can be silent; often the dentist finds the damage at a check-up
      etter: "Noen merker ingenting. Ofte er det tannlegen som ser slitasjen på en tannsjekk.",
    },
    // NHI Tanngnissing: between one in ten and one in five; many children; SML: in children it often lessens with growth
    { type: "lapp", lapp: { slag: "visste", tekst: "Mellom én av ti og én av fem gnisser tenner. Mange barn gjør det også, og hos dem blir det ofte mindre med alderen." } },
    {
      type: "serie",
      id: "slik",
      tittel: "Hva kan hjelpe?",
      ruter: [
        // NHI Tanngnissing: the dentist may observe over several visits
        { tegning: "lupe", tekst: "Tannlegen ser på tennene og kjeven, gjerne over flere besøk." },
        // NHI Tanngnissing: possible causes such as stress or medicines
        { tegning: "snakke", tekst: "Dere snakker om hva som kan ligge bak, for eksempel stress eller medisiner." },
        // SML Bittskinne: fitted to the person who wears it
        { tegning: "avtrykk", tekst: "Trengs det, tar tannlegen avtrykk, og en bittskinne lages etter dem.", mellom: true },
        // SML Bittskinne: used especially at night
        { tegning: "bittskinne", tekst: "Skinnen brukes mest om natten." },
        // SML Bruksisme: exercises to relax the jaw muscles, and less stress
        { tegning: "roligtann", tekst: "Øvelser for å slappe av i kjeven, og mindre stress, kan også hjelpe." },
      ],
      // NHI Tanngnissing: treatment depends on the cause
      etter: "Hva som hjelper, kommer an på hva som ligger bak.",
    },
    // NHI Tanngnissing: ready-made guards don't all fit as well
    { type: "lapp", lapp: { slag: "tips", tekst: "Det finnes skinner du kan kjøpe selv, men de passer ikke alltid like godt." } },
    {
      type: "pris",
      id: "pris",
      sporsmal: "Hva koster en bittskinne?",
      tekst: "Ring oss, så får du vite hva det vil koste.",
      // Helsedirektoratet rundskriv: no point for grinding itself; point 9 only for severe wear
      helfo: "Som hovedregel betaler voksne selv. Er tennene alvorlig slitt, kan Helfo i noen tilfeller dekke en del av behandlingen. Tannlegen vurderer om du har rett.",
      tegning: "regning",
    },
  ],
  slutt: "Tror du at du gnisser tenner? Bestill en time, så ser vi på tennene dine.",
  kilder: [BKILDE.smlBruksisme, BKILDE.smlBittskinne, BKILDE.nhiTanngnissing, BKILDE.smlSlitasje, BKILDE.hdirRundskriv, BKILDE.hnTannlegeregning],
};
