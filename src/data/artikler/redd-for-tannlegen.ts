import { KILDE } from "./kilder";
import type { Artikkel } from "./typer";

/* Dental fear. Every line checked on 8 October 2026 against the sources at
   the bottom; the comments name the source behind each part. What helps is
   taken from Helsedirektoratet's guideline (preparation, predictability,
   control, mastery); it promises nothing the clinic has not said it offers. */

export const reddForTannlegen: Artikkel = {
  slug: "redd-for-tannlegen",
  tittel: "Redd for tannlegen?",
  kort: "Redd for tannlegen",
  ingress: "Mange gruer seg til å gå til tannlegen. Du er ikke alene, og du trenger ikke å skamme deg. Her kan du lese hva som gjør det lettere.",
  lesetid: "3 minutter å lese",
  beskrivelse: "Redd for tannlegen? Les hva som hjelper mot tannlegeskrekk, hva du selv kan gjøre, og hvor du får hjelp hvis angsten er sterk.",
  tegning: "haand",
  deler: [
    {
      type: "tekst",
      id: "vanlig",
      tittel: "Det er helt vanlig",
      avsnitt: [
        "Noen gruer seg litt. Andre gruer seg så mye at de nesten ikke klarer å gå. Begge deler er vanlig.",
        "Mange har ikke vært hos tannlegen på lenge, og gruer seg til å komme tilbake. Det er bra at du tenker på det nå.",
      ],
      tegning: "snakke",
    },
    // SML Tannlegeskrekk: may affect 5 to 10 percent of the adult population
    { type: "lapp", lapp: { slag: "visste", tekst: "Mellom 5 og 10 av 100 voksne har så sterk tannlegeskrekk at det er vanskelig å gå til tannlegen." } },
    {
      type: "liste",
      id: "hjelper",
      tittel: "Dette hjelper",
      intro: "Dette er det helsemyndighetene sier hjelper mot angst for tannbehandling.",
      punkter: [
        // Helsedirektoratet: preparation, verbal explanation, tell-show-do, predictability
        { id: "vite", navn: "Å vite hva som skal skje", tekst: "Det blir lettere når du får vite hva som skal skje før det skjer. Be gjerne tannlegen forklare.", tegning: "snakke" },
        // Helsedirektoratet: control
        { id: "kontroll", navn: "Å ha kontroll", tekst: "Det hjelper å vite at du kan si stopp. Avtal et tegn, for eksempel at du løfter hånden når du trenger en pause.", tegning: "haand" },
        // Helsedirektoratet (gradual habituation and mastery), TOO (exposure therapy)
        { id: "steg", navn: "Litt og litt", tekst: "Angsten blir ofte mindre når du øver litt og litt, og kjenner at det går fint.", tegning: "steg" },
        // Helsedirektoratet TOO, tooinfo.no (in the public dental service in every county; you can get in touch yourself)
        { id: "too", navn: "Hjelp ved sterk angst", tekst: "Har du så sterk angst at du ikke klarer å gå til tannlegen, finnes det et eget tilbud i den offentlige tannhelsetjenesten. Det heter TOO, og du kan ta kontakt selv.", tegning: "roligtann" },
      ],
    },
    // Helsenorge Mestring av langvarige smerter: breathe deep down into the stomach
    { type: "lapp", lapp: { slag: "triks", tekst: "Pust rolig, helt ned i magen. Kjenn at brystet utvider seg, og la kroppen finne en god rytme." } },
    {
      type: "tips",
      id: "tips",
      tittel: "Små ting som hjelper",
      punkter: [
        // Helsedirektoratet: preparation and explanation
        { tekst: "Si fra at du er nervøs når du bestiller time. Da kan tannlegen forklare mer underveis.", tegning: "snakke" },
        // Helsedirektoratet: predictability
        { tekst: "Snakk med tannlegen om hva som skal gjøres denne gangen, så du vet hva som kommer.", tegning: "steg" },
      ],
    },
    // Helsedirektoratet: focus on mastery
    { type: "lapp", lapp: { slag: "visste", tekst: "Hver gang det går fint hos tannlegen, blir det ofte litt lettere neste gang. Det kalles mestring." } },
    {
      type: "tekst",
      id: "lenge",
      tittel: "Hva om det er lenge siden?",
      avsnitt: [
        "Det er aldri for sent å komme tilbake. Tannlegen undersøker først og forteller hva som bør gjøres.",
        // Pasient- og brukerrettighetsloven § 4-1: health care can only be given with the patient's consent
        "Du bestemmer selv. Etter loven kan tannlegen bare behandle deg når du har sagt ja.",
      ],
      tegning: "steg",
    },
  ],
  sjekk: {
    tittel: "Hva gruer du deg mest til?",
    intro: "Trykk på det som passer best, så ser du hva som kan gjøre det lettere.",
    hjelp: "Trykk på det som passer best.",
    merke: "Dette kan hjelpe",
    forbehold: "Har du veldig sterk angst, kan TOO-tilbudet i den offentlige tannhelsetjenesten hjelpe. Les mer på tooinfo.no.",
    valg: [
      {
        // Helsedirektoratet: explanation and predictability
        id: "vondt",
        svar: "At det skal gjøre vondt",
        tegning: "roligtann",
        overskrift: "Snakk om det først",
        forklaring: "Fortell tannlegen at du er redd for at det skal gjøre vondt. Da kan dere snakke om bedøvelse og hva som skal skje, før dere begynner.",
        handling: { tittel: "Klar for å prøve?", tekst: "Bestill en time, og si at du gruer deg.", knapp: "bestill" },
      },
      {
        // Helsedirektoratet: preparation and predictability
        id: "lyd",
        svar: "Lyden og lukten",
        tegning: "snakke",
        overskrift: "Be om å få vite det først",
        forklaring: "Be tannlegen si fra før det kommer lyder eller lukter, så du vet hva som skjer. Det er lettere når du er forberedt.",
        handling: { tittel: "Klar for å prøve?", tekst: "Bestill en time, og si hva du gruer deg til.", knapp: "bestill" },
      },
      {
        // Helsedirektoratet: control and predictability
        id: "kontroll",
        svar: "Å ikke ha kontroll",
        tegning: "haand",
        overskrift: "Avtal et tegn",
        forklaring: "Avtal at du kan løfte hånden når du trenger en pause. Når du vet hva som skjer, og at du kan si stopp, føles det tryggere.",
        handling: { tittel: "Klar for å prøve?", tekst: "Bestill en time, og si hva du trenger.", knapp: "bestill" },
      },
      {
        // Pasient- og brukerrettighetsloven § 4-1
        id: "lenge",
        svar: "Det er lenge siden sist",
        tegning: "steg",
        overskrift: "Det er aldri for sent",
        forklaring: "Mange har vært borte fra tannlegen lenge. Det viktigste er at du kommer nå. Tannlegen undersøker først, og du bestemmer hva som skal gjøres.",
        handling: { tittel: "Klar for å prøve?", tekst: "Bestill en time, så tar vi det derfra.", knapp: "bestill" },
      },
      {
        id: "vet-ikke",
        svar: "Jeg vet ikke helt, jeg bare gruer meg",
        tegning: "snakke",
        overskrift: "Si det høyt",
        forklaring: "Det er helt greit. Ofte hjelper det å fortelle noen at du gruer deg. Ring oss og si det.",
        handling: { tittel: "Ring oss gjerne", tekst: "Fortell at du gruer deg.", knapp: "ring" },
      },
    ],
  },
  slutt: "Vil du prøve? Bestill en time, og si fra at du gruer deg.",
  kilder: [KILDE.hdirAngst, KILDE.hdirToo, KILDE.tooinfo, KILDE.smlTannlegeskrekk, KILDE.hnPust, KILDE.lovSamtykke],
};
