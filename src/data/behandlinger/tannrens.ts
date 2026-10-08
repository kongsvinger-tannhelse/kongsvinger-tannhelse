import { BKILDE } from "./kilder";
import type { Behandlingsside } from "./typer";

/* Cleaning: plaque and tartar, and taking it off. Every line checked on 8
   October 2026 against the sources at the bottom; the comments name the
   source behind each part. Nothing about whether it hurts, polishing or
   fluoride after: no source says. */

export const tannrens: Behandlingsside = {
  slug: "tannrens",
  navn: "Tannrens",
  // the clinic's own words (klinikk.ts)
  ingress: "En tannrens fjerner plakk og tannstein som har bygget seg opp over tid. Her ser du hvorfor det er viktig, og hvordan det foregår.",
  lesetid: "2 minutter å lese",
  beskrivelse: "Tannrens hos tannlegen i Kongsvinger: hva plakk og tannstein er, hva det kan gjøre med tennene og tannkjøttet, og hvordan tannsteinen fjernes.",
  deler: [
    {
      type: "tekst",
      id: "hva",
      tittel: "Hva er tannstein?",
      avsnitt: [
        // Lille norske leksikon Plakk: a coating of bacteria that sticks to the teeth
        "Plakk er et belegg av bakterier som fester seg på tennene.",
        // SML Tannstein: plaque that mineralises; should be removed by a dentist or hygienist; the clinic's text
        "Blir plakket liggende, herder det og blir til tannstein. Den sitter så godt fast at du ikke får den bort selv. Den må fjernes av en tannlege eller tannpleier.",
      ],
      tegning: "tannstein",
    },
    {
      type: "tegn",
      id: "tegn",
      tittel: "Hva kan tannstein gjøre?",
      punkter: [
        // SML Tannstein: discoloured teeth, a rough surface
        { tekst: "Tennene kan bli misfarget og ru.", tegning: "plakk" },
        // SML Tannstein: in the longer run, bad breath
        { tekst: "Du kan få dårlig ånde.", tegning: "ande" },
        // SML Tannstein and Periodontitt: bleeding gums; red or swollen gum that bleeds when you brush
        { tekst: "Tannkjøttet kan bli rødt og hovent, og blø når du pusser.", tegning: "tannkjott" },
      ],
      // SML Tannstein: removing it prevents or treats gingivitt and periodontitt
      etter: "Derfor er det viktig å fjerne tannsteinen. Det forebygger tannkjøttsykdommer som gingivitt og periodontitt.",
    },
    // SML Tannstein: can start after a day, seldom visible before one to two weeks
    { type: "lapp", lapp: { slag: "visste", tekst: "Plakk kan begynne å herde til tannstein allerede etter ett døgn, men du ser det sjelden før det har gått en uke eller to." } },
    {
      type: "serie",
      id: "slik",
      tittel: "Fra plakk til ren tann",
      ruter: [
        // Lille norske leksikon Plakk
        { tegning: "plakk", tekst: "Bakteriene legger seg som et belegg langs tannkjøttet." },
        // SML Tannstein
        { tegning: "tannstein", tekst: "Etter en stund herder belegget og blir til tannstein." },
        // SML Periodontitt: curettes and/or an ultrasonic instrument remove it mechanically
        { tegning: "skrape", tekst: "Tannlegen eller tannpleieren fjerner tannsteinen med små håndinstrumenter, eller med et instrument som bruker ultralyd." },
        // SML Tannstein: the most important thing is good, regular cleaning yourself, with brush and floss or interdental brushes
        { tegning: "traad", tekst: "Hjemme pusser du godt, og renser mellom tennene med tanntråd eller mellomromsbørster." },
      ],
    },
    // SML Tannstein: most behind the lower front teeth and on the upper molars, by the large salivary glands
    { type: "lapp", lapp: { slag: "visste", tekst: "Tannstein samler seg mest bak de nederste fortennene og på jekslene i overkjeven. Der kommer spyttet fra de store spyttkjertlene." } },
    {
      type: "tekst",
      id: "hvem",
      tittel: "Hvem fjerner tannsteinen?",
      avsnitt: [
        // SML Tannstein; SML Tannpleier: a protected title, authorised under helsepersonelloven
        "Tannstein bør fjernes av en tannlege eller en tannpleier. Tannpleier er en beskyttet tittel for helsepersonell med egen autorisasjon.",
      ],
      tegning: "snakke",
    },
  ],
  slutt: "Er det lenge siden forrige tannrens? Bestill en time, så tar vi den.",
  kilder: [BKILDE.lnlPlakk, BKILDE.smlTannstein, BKILDE.smlPeriodontitt, BKILDE.smlTannpleier],
};
