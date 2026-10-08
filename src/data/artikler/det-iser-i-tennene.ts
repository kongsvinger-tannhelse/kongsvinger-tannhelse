import { HANDLING, type Artikkel } from "./typer";

/* Sensitive teeth: why cold stings, what causes it, and what helps. */

export const detIser: Artikkel = {
  slug: "det-iser-i-tennene",
  tittel: "Det iser når jeg drikker kaldt",
  kort: "Ising i tennene",
  ingress: "Et kort stikk når du drikker kaldt eller spiser is? Det heter ising, og det er veldig vanlig. Her ser du hvorfor det skjer, og hva som hjelper.",
  lesetid: "3 minutter å lese",
  beskrivelse: "Ising i tennene forklart enkelt: hvorfor det iser når du drikker kaldt, hva det kan være, og hva som hjelper.",
  tegning: "kanaler",
  deler: [
    {
      type: "tekst",
      id: "hvorfor",
      tittel: "Hvorfor iser det?",
      avsnitt: [
        "Inne i tanna går det mange bitte små kanaler inn mot nerven. Vanligvis er de dekket av emalje eller tannkjøtt.",
        "Hvis kanalene blir åpne, kommer kulden rett inn til nerven. Da iser det.",
      ],
      tegning: "kanaler",
    },
    { type: "lapp", lapp: { slag: "visste", tekst: "Emaljen kan ikke vokse ut igjen når den først er borte. Derfor er det lurt å ta godt vare på den du har." } },
    {
      type: "liste",
      id: "arsaker",
      tittel: "Hva kan det være?",
      intro: "Det er særlig fire ting som kan gi ising.",
      ekstraNavn: "Slik kjennes det:",
      punkter: [
        { id: "slitt", navn: "Slitt emalje", tekst: "Sur drikke som brus, juice og sportsdrikk løser opp litt av emaljen hver gang.", ekstra: "Det iser på flere tenner, av kaldt og av surt.", tegning: "slitt" },
        { id: "tannhals", navn: "Bare tannhalser", tekst: "Når tannkjøttet trekker seg litt tilbake, blir den nederste delen av tanna bar. Den har ingen emalje.", ekstra: "Det iser helt nede ved tannkjøttet.", tegning: "tannhals" },
        { id: "hull", navn: "Et hull", tekst: "Et hull går gjennom emaljen og inn mot nerven.", ekstra: "Det iser på én tann, ofte av søtt også.", tegning: "hull" },
        { id: "sprekk", navn: "En sprekk eller en gammel fylling", tekst: "Kulden kan smette inn gjennom en sprekk, eller langs kanten av en fylling.", ekstra: "Det iser på én tann, og kanskje når du biter.", tegning: "sprekk" },
      ],
    },
    { type: "lapp", lapp: { slag: "triks", tekst: "Drikker du brus eller juice? Drikk den til maten, gjerne med sugerør. Da treffer syren tennene mindre." } },
    {
      type: "tips",
      id: "tips",
      tittel: "Hva kan jeg gjøre selv?",
      punkter: [
        { tekst: "Bruk en myk tannbørste, og puss rolig. Ikke skrubb.", tegning: "borste" },
        { tekst: "Prøv en tannkrem for følsomme tenner. Det tar ofte et par uker før den virker.", tegning: "tube" },
        { tekst: "Smør litt av den samme tannkremen på tanna som iser før du legger deg, og ikke skyll.", tegning: "tube" },
        { tekst: "Drikk vann når du er tørst. Brus, juice og sportsdrikk er sure.", tegning: "glass" },
      ],
      obs: "Iser det lenge etter at kulden er borte, eller begynner det å verke? Da bør vi se på det.",
    },
    { type: "lapp", lapp: { slag: "tips", tekst: "Spytt ut tannkremen etter pussing, men ikke skyll med vann. Da blir fluoren igjen på tennene og gjør emaljen sterkere." } },
    {
      type: "tekst",
      id: "komme",
      tittel: "Når bør jeg komme?",
      avsnitt: [
        "Hvis det bare iser litt og går fort over, kan det vente til neste tannsjekk.",
        "Kom heller før hvis det iser på én bestemt tann, hvis det varer lenge, eller hvis det begynner å verke.",
      ],
      tegning: "hull",
    },
  ],
  sjekk: {
    tittel: "Hvordan kjennes det hos deg?",
    intro: "Nå som du har lest, kan du trykke på det som ligner mest. Da får du et lite hint om hva det kan være.",
    hjelp: "Trykk på det som passer best.",
    merke: "Det kan være",
    valg: [
      {
        id: "mange",
        svar: "Det iser litt på mange tenner, og går fort over",
        tegning: "slitt",
        overskrift: "Slitt emalje",
        forklaring: "Det er vanlig og sjelden farlig. Tannkrem for følsomme tenner hjelper ofte. Vi kan se på det neste gang du er her.",
        handling: HANDLING.bestill,
      },
      {
        id: "nede",
        svar: "Det iser helt nede ved tannkjøttet",
        tegning: "tannhals",
        overskrift: "Bare tannhalser",
        forklaring: "Når tannkjøttet trekker seg litt tilbake, blir roten bar. Puss mykt, og bruk tannkrem for følsomme tenner.",
        handling: HANDLING.bestill,
      },
      {
        id: "en",
        svar: "Det iser på én tann, også av søtt",
        tegning: "hull",
        overskrift: "Et hull",
        forklaring: "Et hull blir ikke borte av seg selv. Jo før vi fikser det, jo mindre blir det.",
        handling: HANDLING.bestill,
      },
      {
        id: "verker",
        svar: "Det iser lenge etterpå, eller det verker",
        tegning: "betennelse",
        overskrift: "En irritert nerve",
        forklaring: "Når ising blir til verk, er nerven ofte påvirket. Det bør vi se på snart.",
        handling: HANDLING.iDag,
        lenke: { tekst: "Les om tannverk", slug: "vondt-i-tanna" },
      },
    ],
  },
  slutt: "Vil du at vi ser på det? Bestill en time, så finner vi ut av det sammen.",
};
