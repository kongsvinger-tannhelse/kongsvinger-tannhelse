import { BKILDE } from "./kilder";
import type { Behandlingsside } from "./typer";

/* Dry mouth. Every line checked on 8 October 2026 against the sources at the
   bottom; the comments name the source behind each part. The self-help is
   kept general («kan hjelpe»), and the page sends the reader to the dentist
   and the doctor for advice that fits them. */

export const munntorrhet: Behandlingsside = {
  slug: "munntorrhet",
  navn: "Munntørrhet",
  // the clinic's own words (klinikk.ts)
  ingress: "Munntørrhet betyr at du lager for lite spytt. Det kan gi ubehag, dårlig ånde og flere hull i tennene. Her ser du hva det kan komme av, og hva som kan hjelpe.",
  hosOss: "Hos oss på Kongsvinger Tannhelse ser vi på hva den tørre munnen gjør med tennene dine, og hva som kan hjelpe.",
  tittelbilde: "torr",
  beskrivelse: "Munntørrhet hos tannlegen i Kongsvinger: hva munntørrhet er, hva det kan komme av, hva det gjør med tennene, og hva som kan hjelpe.",
  deler: [
    {
      type: "tekst",
      id: "hva",
      tittel: "Hva er munntørrhet?",
      avsnitt: [
        // SML Munntørrhet: too little saliva from the salivary glands
        "Munntørrhet betyr at spyttkjertlene lager for lite spytt.",
        // Helsenorge (saliva neutralises the acid), SML Munntørrhet (caries in the roots is a real problem)
        "Spyttet beskytter tennene. Lager du lite spytt, får du lettere hull, særlig i tannrøttene.",
      ],
      tegning: "spytt-skjold",
    },
    {
      type: "tegn",
      id: "tegn",
      tittel: "Hva kan det komme av?",
      punkter: [
        // NHI Munntørrhet: medicines are the most common cause; many can give it
        { tekst: "Medisiner. Mange vanlige medisiner kan gi munntørrhet.", tegning: "pilleglass" },
        // NHI Munntørrhet: the glands make less saliva as we age
        { tekst: "Alderen. Spyttkjertlene lager mindre spytt når vi blir eldre.", tegning: "kake" },
        // SML Munntørrhet: Sjögren's syndrome, diabetes
        { tekst: "Sykdommer, for eksempel Sjögrens syndrom eller diabetes.", tegning: "hjerte" },
        // SML Munntørrhet: radiotherapy for cancer in the mouth and throat
        { tekst: "Strålebehandling mot munn og hals.", tegning: "straaling" },
      ],
      // SML Munntørrhet: fear and anxiety dry the mouth
      etter: "Også nervøsitet kan gjøre munnen tørr en stund.",
    },
    // NHI Munntørrhet: normally 0.5–1.5 litres a day
    { type: "lapp", lapp: { slag: "visste", tekst: "Vanligvis lager kroppen mellom en halv og halvannen liter spytt i døgnet." } },
    {
      type: "serie",
      id: "slik",
      tittel: "Dette kan hjelpe",
      ruter: [
        // NHI Munntørrhet: drink water often
        { tegning: "glass", tekst: "Mange har nytte av å drikke vann ofte." },
        // NHI Munntørrhet: sugar-free lozenges or chewing gum stimulate saliva
        { tegning: "tyggis", tekst: "Sukkerfri tyggegummi eller pastiller kan få i gang spyttet." },
        // SML Munntørrhet: good oral hygiene with fluoride is important
        { tegning: "tube", tekst: "God munnhygiene med fluor er ekstra viktig." },
        // NHI Munntørrhet: the doctor considers whether the medicines can be changed
        { tegning: "snakke-medisin", tekst: "Bruker du medisiner, kan legen vurdere om de kan endres.", mellom: true },
        // NHI Munntørrhet: see the dentist for individual guidance
        { tegning: "rad-torr", tekst: "Vi gir deg råd som passer for deg." },
      ],
      // SML Munntørrhet: the dryness itself can't be treated, only eased
      etter: "Munntørrhet kan ikke alltid fjernes, men plagene kan ofte bli mindre.",
    },
    // NHI Munntørrhet: artificial saliva helps some, but water often does as well
    { type: "lapp", lapp: { slag: "tips", tekst: "Kunstig spytt fra apoteket hjelper noen, men vann virker ofte like godt." } },
  ],
  slutt: "Er munnen ofte tørr? Bestill en time, så ser vi på tennene dine og hva som kan hjelpe.",
  kilder: [BKILDE.smlMunntorrhet, BKILDE.nhiMunntorrhet, BKILDE.hnHull],
};
