import type { Artikkel } from "./typer";

/* Dental fear: that it is normal, what we do to make it easier, and small
   things that help. The check at the end asks what you dread most. */

export const reddForTannlegen: Artikkel = {
  slug: "redd-for-tannlegen",
  tittel: "Redd for tannlegen?",
  kort: "Redd for tannlegen",
  ingress: "Mange gruer seg til å gå til tannlegen. Du er ikke alene, og du trenger ikke å skamme deg. Her kan du lese hvordan vi gjør det litt lettere.",
  lesetid: "3 minutter å lese",
  beskrivelse: "Redd for tannlegen? Les hvordan vi gjør besøket tryggere, og små ting du selv kan gjøre for å grue deg mindre.",
  tegning: "haand",
  deler: [
    {
      type: "tekst",
      id: "vanlig",
      tittel: "Det er helt vanlig",
      avsnitt: [
        "Noen er redde fordi noe gjorde vondt en gang. Andre liker ikke lyden, lukten, eller å ligge stille i stolen.",
        "Mange har ikke vært hos tannlegen på lenge, og gruer seg til hva vi skal si. Vi kjefter aldri. Vi er bare glade for at du kom.",
      ],
      tegning: "snakke",
    },
    { type: "lapp", lapp: { slag: "visste", tekst: "Å grue seg er kroppens måte å passe på deg. Det blir ofte mindre for hver gang du har vært her og det gikk fint." } },
    {
      type: "liste",
      id: "lettere",
      tittel: "Slik gjør vi det lettere",
      intro: "Dette kan du alltid be om hos oss.",
      punkter: [
        { id: "prat", navn: "Vi prater først", tekst: "Fortell oss hva du er redd for før vi begynner. Vi forklarer hva vi skal gjøre, og hvorfor.", tegning: "snakke" },
        { id: "pause", navn: "Du bestemmer tempoet", tekst: "Løft hånden når du vil ha en pause. Da stopper vi med en gang.", tegning: "haand" },
        { id: "bedovelse", navn: "Vi bedøver godt", tekst: "Vi venter til bedøvelsen virker før vi begynner, og spør deg underveis.", tegning: "roligtann" },
        { id: "steg", navn: "Små steg", tekst: "Er det lenge siden, kan første time være bare en prat og en titt. Resten tar vi en annen dag.", tegning: "steg" },
      ],
    },
    { type: "lapp", lapp: { slag: "triks", tekst: "Pust rolig: inn gjennom nesen mens du teller til fire, og ut gjennom munnen mens du teller til seks. Det roer kroppen." } },
    {
      type: "tips",
      id: "tips",
      tittel: "Små ting som hjelper",
      punkter: [
        { tekst: "Ta med hodetelefoner, og hør på musikk eller en lydbok.", tegning: "hodetelefoner" },
        { tekst: "Bestill time tidlig på dagen. Da rekker du ikke å gå og grue deg så lenge.", tegning: "klokke" },
        { tekst: "Si fra når du ringer at du er nervøs. Da setter vi av litt ekstra tid.", tegning: "snakke" },
        { tekst: "Ta med noen du er trygg på.", tegning: "hjerte" },
      ],
    },
    { type: "lapp", lapp: { slag: "tips", tekst: "Det kan hjelpe å holde noe i hendene, for eksempel en liten ball eller jakken din." } },
    {
      type: "tekst",
      id: "lenge",
      tittel: "Hva om det er lenge siden?",
      avsnitt: [
        "Mange har ikke vært hos tannlegen på mange år. Det er ikke for sent.",
        "Vi tar det steg for steg, og lager en plan sammen med deg. Ingenting skjer uten at du sier ja.",
      ],
      tegning: "steg",
    },
  ],
  sjekk: {
    tittel: "Hva gruer du deg mest til?",
    intro: "Trykk på det som passer best, så ser du hva vi gjør for at det skal bli lettere.",
    hjelp: "Trykk på det som passer best.",
    merke: "Slik hjelper vi",
    forbehold: "Du kan alltid si fra underveis. Vi stopper når du vil.",
    valg: [
      {
        id: "vondt",
        svar: "At det skal gjøre vondt",
        tegning: "roligtann",
        overskrift: "Vi bedøver godt",
        forklaring: "Vi venter til bedøvelsen virker før vi begynner, og spør deg underveis. Kjenner du noe, sier du fra.",
        handling: { tittel: "Klar for å prøve?", tekst: "Bestill en time, og si at du gruer deg.", knapp: "bestill" },
      },
      {
        id: "lyd",
        svar: "Lyden og lukten",
        tegning: "hodetelefoner",
        overskrift: "Ta med musikk",
        forklaring: "Hodetelefoner med musikk du liker hjelper mange. Vi sier også fra før vi bruker noe som lager lyd.",
        handling: { tittel: "Klar for å prøve?", tekst: "Bestill en time, og ta med hodetelefonene.", knapp: "bestill" },
      },
      {
        id: "kontroll",
        svar: "Å ikke ha kontroll",
        tegning: "haand",
        overskrift: "Du bestemmer",
        forklaring: "Løft hånden, så stopper vi. Vi forklarer hvert steg, så du vet hva som skjer.",
        handling: { tittel: "Klar for å prøve?", tekst: "Bestill en time. Du bestemmer tempoet.", knapp: "bestill" },
      },
      {
        id: "si",
        svar: "Hva tannlegen skal si",
        tegning: "hjerte",
        overskrift: "Vi kjefter aldri",
        forklaring: "Vi er her for å hjelpe, ikke for å dømme. Mange har vært borte lenge. Det viktigste er at du kom.",
        handling: { tittel: "Klar for å prøve?", tekst: "Bestill en time, så tar vi det derfra.", knapp: "bestill" },
      },
      {
        id: "vet-ikke",
        svar: "Jeg vet ikke helt, jeg bare gruer meg",
        tegning: "snakke",
        overskrift: "Start med en prat",
        forklaring: "Ring oss og fortell det. Da kan vi gjøre første time rolig, med bare en prat og en titt.",
        handling: { tittel: "Ring oss gjerne", tekst: "Fortell at du gruer deg, så tar vi det rolig.", knapp: "ring" },
      },
    ],
  },
  slutt: "Vil du prøve? Bestill en time, og si fra at du gruer deg. Da tar vi det rolig.",
};
