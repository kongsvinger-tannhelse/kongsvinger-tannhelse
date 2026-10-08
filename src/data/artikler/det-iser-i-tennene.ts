import { KILDE } from "./kilder";
import { HANDLING, type Artikkel } from "./typer";

/* Sensitive teeth. Every line checked on 8 October 2026 against the
   sources at the bottom; the comments name the source behind each part. */

export const detIser: Artikkel = {
  slug: "det-iser-i-tennene",
  tittel: "Det iser når jeg drikker kaldt",
  kort: "Ising i tennene",
  // SML Tennene: many are bothered by ising when they eat or drink something cold
  ingress: "Et kort stikk når du drikker kaldt eller spiser is? Det heter ising, og mange har det. Her ser du hvorfor det skjer, og hva som hjelper.",
  lesetid: "3 minutter å lese",
  beskrivelse: "Ising i tennene forklart enkelt: hvorfor det iser når du drikker kaldt, hva det kan være, og hva som hjelper.",
  tegning: "kanaler",
  deler: [
    // SML Tannsmerter: cold reaches the nerve through small canals (dentin tubules); ising where enamel is missing or the root is bare
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
    // SML Tannemalje: damage to enamel cannot be repaired by the body
    { type: "lapp", lapp: { slag: "visste", tekst: "Emaljen kan ikke vokse ut igjen når den først er borte. Derfor er det lurt å ta godt vare på den du har." } },
    {
      type: "liste",
      id: "arsaker",
      tittel: "Hva kan det være?",
      intro: "Det er særlig fire ting som kan gi ising.",
      ekstraNavn: "Slik kjennes det:",
      punkter: [
        // SML Tannslitasje (erosion from acid), Tannlegeforeningen (juice and sugar-free drinks contain acid)
        { id: "slitt", navn: "Slitt emalje", tekst: "Sur drikke, som brus og juice, kan løse opp litt av emaljen hver gang.", ekstra: "Det kan ise der emaljen er blitt tynn.", tegning: "slitt" },
        // SML Tennene and Tannsmerter (receding gum bares the dentin), Helsenorge Snus (long tooth necks give ising)
        { id: "tannhals", navn: "Bare tannhalser", tekst: "Når tannkjøttet trekker seg litt tilbake, blir den nederste delen av tanna bar. Der er det ingen emalje.", ekstra: "Det iser nede ved tannkjøttet.", tegning: "tannhals" },
        // Helsenorge Hull i tennene, SML Tannsmerter
        { id: "hull", navn: "Et hull", tekst: "Et hull går gjennom emaljen og inn mot nerven.", ekstra: "Det kan ise eller verke i én tann.", tegning: "hull" },
        // SML Tannslitasje: hard brushing wears the tooth and makes the gum recede
        { id: "hard", navn: "For hard tannpuss", tekst: "En hard børste og mye trykk kan slite på tanna og få tannkjøttet til å trekke seg tilbake.", ekstra: "Ofte iser det nede ved tannkjøttet.", tegning: "borste" },
      ],
    },
    // Helsedirektoratet Råd for voksne: drink acidic drinks through a straw and rinse with water afterwards
    { type: "lapp", lapp: { slag: "triks", tekst: "Drikker du brus eller juice? Drikk med sugerør, og skyll munnen med vann etterpå." } },
    {
      type: "tips",
      id: "tips",
      tittel: "Hva kan jeg gjøre selv?",
      punkter: [
        // Helsedirektoratet (soft brush, light pressure), SML Tannslitasje
        { tekst: "Bruk en myk tannbørste, og puss med lett trykk.", tegning: "borste" },
        // SML Tennene: toothpastes against ising help in many cases
        { tekst: "Prøv en tannkrem for følsomme tenner. Den hjelper mange.", tegning: "tube" },
        // Tannlegeforeningen: water is the best drink; juice and sugar-free drinks contain acid
        { tekst: "Drikk vann når du er tørst. Brus og juice er sure.", tegning: "glass" },
      ],
      // SML Tannsmerter: ising that lasts after the cold may be pulpitis
      obs: "Iser det lenge etter at kulden er borte, eller begynner det å verke? Da bør vi se på det.",
    },
    // Tannlegeforeningen (do not rinse, the fluoride works longer), SML Remineralisering (fluoride strengthens enamel)
    { type: "lapp", lapp: { slag: "tips", tekst: "Spytt ut tannkremen etter pussing, men ikke skyll med vann. Da virker fluoren lenger, og den gjør emaljen sterkere." } },
    // SML Tannsmerter
    {
      type: "tekst",
      id: "komme",
      tittel: "Når bør jeg komme?",
      avsnitt: [
        "Hvis det bare iser litt og går over med en gang, kan du ta det opp neste gang du er hos tannlegen.",
        "Kom heller før hvis det iser lenge etter at kulden er borte, eller hvis det begynner å verke.",
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
        // SML Tennene
        id: "mange",
        svar: "Det iser litt på flere tenner, og går fort over",
        tegning: "slitt",
        overskrift: "Tynn emalje",
        forklaring: "Mange har det slik. Tannkrem for følsomme tenner hjelper ofte. Ta det opp neste gang du er hos tannlegen.",
        handling: HANDLING.bestill,
      },
      {
        // SML Tennene, SML Tannslitasje
        id: "nede",
        svar: "Det iser nede ved tannkjøttet",
        tegning: "tannhals",
        overskrift: "Bare tannhalser",
        forklaring: "Når tannkjøttet trekker seg litt tilbake, blir roten bar. Puss mykt, og prøv tannkrem for følsomme tenner.",
        handling: HANDLING.bestill,
      },
      {
        // Helsenorge Hull i tennene
        id: "en",
        svar: "Det iser eller verker i én tann",
        tegning: "hull",
        overskrift: "Et hull",
        forklaring: "Et hull blir ikke borte av seg selv. Jo før vi fikser det, jo mindre blir det.",
        handling: HANDLING.bestill,
      },
      {
        // SML Tannsmerter
        id: "verker",
        svar: "Det iser lenge etter at kulden er borte",
        tegning: "betennelse",
        overskrift: "En irritert nerve",
        forklaring: "Når isingen henger igjen, kan nerven være betent. Det bør vi se på snart.",
        handling: HANDLING.iDag,
        lenke: { tekst: "Les om tannverk", slug: "vondt-i-tanna" },
      },
    ],
  },
  slutt: "Vil du at vi ser på det? Bestill en time, så finner vi ut av det sammen.",
  kilder: [KILDE.smlTannsmerter, KILDE.smlTennene, KILDE.smlEmalje, KILDE.smlSlitasje, KILDE.smlRemineralisering, KILDE.hnKaries, KILDE.hnSnus, KILDE.hdirVoksne, KILDE.ntfRad],
};
