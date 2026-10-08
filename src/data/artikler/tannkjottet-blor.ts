import { KILDE } from "./kilder";
import { HANDLING, type Artikkel } from "./typer";

/* Bleeding gums. Every line checked on 8 October 2026 against the sources
   at the bottom; the comments name the source behind each part. */

export const tannkjottetBlor: Artikkel = {
  slug: "tannkjottet-blor",
  tittel: "Tannkjøttet blør når jeg pusser",
  kort: "Blødende tannkjøtt",
  // NHI and SML: bleeding gums are an early sign of gingivitis, which is reversible with good cleaning
  ingress: "Litt blod i vasken når du pusser, er et tegn på at tannkjøttet er betent. Det gode er at det ofte går over når du pusser godt.",
  lesetid: "3 minutter å lese",
  beskrivelse: "Blødende tannkjøtt forklart enkelt: hvorfor tannkjøttet blør når du pusser, hva du kan gjøre selv, og når du bør komme.",
  tegning: "plakk",
  deler: [
    // SML Gingivitt: the cause is bacterial plaque on the tooth next to the gum; red, swollen gums that bleed
    {
      type: "tekst",
      id: "hvorfor",
      tittel: "Hvorfor blør det?",
      avsnitt: [
        "Langs kanten av tannkjøttet samler det seg et tynt lag med bakterier. Det heter plakk, eller bakteriebelegg.",
        "Bakteriene gjør tannkjøttet betent. Det blir rødt, hovent og blør lett. Det kalles tannkjøttbetennelse.",
      ],
      tegning: "plakk",
    },
    // SML Gingivitt: gingivitis is fully reversible when the plaque is removed
    { type: "lapp", lapp: { slag: "visste", tekst: "Tannkjøttbetennelse kan gå helt over. Når bakteriebelegget blir fjernet, forsvinner betennelsen." } },
    // SML Gingivitt and NHI: good oral hygiene is the treatment
    {
      type: "tekst",
      id: "pusse",
      tittel: "Skal jeg slutte å pusse der det blør?",
      avsnitt: [
        "Nei! Det er lett å tro, men da får bakteriene være i fred, og betennelsen blir værende.",
        "Puss heller forsiktig og grundig akkurat der det blør. Det er god pussing som får betennelsen til å gå over.",
      ],
      tegning: "skraa",
    },
    // NHI Tannhelse hos barn: the edge between gum and tooth matters most; SML Gingivitt: the plaque sits next to the gum
    { type: "lapp", lapp: { slag: "triks", tekst: "Pass ekstra godt på kanten der tann og tannkjøtt møtes. Det er der bakteriene samler seg." } },
    {
      type: "liste",
      id: "arsaker",
      tittel: "Hva kan det være?",
      intro: "Som oftest er det bakteriebelegg. Men det finnes flere grunner.",
      ekstraNavn: "Slik ser det ut:",
      punkter: [
        // SML Gingivitt
        { id: "plakk", navn: "Bakteriebelegg", tekst: "Bakterier som ikke blir pusset bort, gjør tannkjøttet betent.", ekstra: "Rødt og hovent, og det blør når du pusser.", tegning: "plakk" },
        // SML Tannstein: mineralised plaque, white or yellow, cannot be brushed away; removed by a dentist or hygienist
        { id: "tannstein", navn: "Tannstein", tekst: "Bakteriebelegg som får sitte lenge, blir hardt. Det heter tannstein, og kan ikke pusses bort.", ekstra: "Hardt, hvitt eller gulaktig belegg nede ved tannkjøttet.", tegning: "tannstein" },
        // SML Tannslitasje: hard brushing makes the gum recede
        { id: "hard", navn: "For hard pussing", tekst: "En hard børste eller mye trykk kan skade tannkjøttet.", ekstra: "Over tid kan tannkjøttet trekke seg tilbake.", tegning: "borste" },
      ],
    },
    {
      type: "tips",
      id: "tips",
      tittel: "Slik får du friskere tannkjøtt",
      punkter: [
        // Helsedirektoratet (light pressure), NHI (the edge between gum and tooth)
        { tekst: "Puss med lett trykk, og pass godt på kanten mot tannkjøttet.", tegning: "skraa" },
        // Tannlegeforeningen: toothpicks, floss or interdental brushes between the teeth
        { tekst: "Rengjør mellom tennene med tanntråd, tannstikker eller mellomromsbørster. Dit når ikke tannbørsten.", tegning: "traad" },
        // Helsedirektoratet, Tannlegeforeningen: a soft toothbrush
        { tekst: "Bruk en myk tannbørste.", tegning: "borste" },
        // Helsenorge: brush twice a day with fluoride toothpaste
        { tekst: "Puss to ganger hver dag med tannkrem med fluor.", tegning: "klokke" },
      ],
      obs: "Blør det fortsatt selv om du pusser godt hver dag? Da vil vi gjerne se på det.",
    },
    // Helsedirektoratet: interdental cleaning chosen by individual need
    { type: "lapp", lapp: { slag: "tips", tekst: "Spør tannlegen eller tannpleieren hva som passer best mellom dine tenner: tanntråd, tannstikker eller mellomromsbørster." } },
    // NHI Tannkjøttbetennelse: periodontitis goes deeper, loses bone and support, can loosen teeth; few symptoms early on
    {
      type: "tekst",
      id: "viktig",
      tittel: "Hvorfor er det viktig?",
      avsnitt: [
        "Hvis tannkjøttbetennelse får vare lenge, kan den gå dypere og skade det som holder tennene fast. Det kalles periodontitt, og tennene kan bli løse.",
        "Det gir lite plager i starten. Derfor er det lurt å fikse det mens det er enkelt.",
      ],
      tegning: "tannhals",
    },
    // NHI Tannkjøttbetennelse: risk factors
    { type: "lapp", lapp: { slag: "visste", tekst: "Røyking, munntørrhet og diabetes gjør det lettere å få tannkjøttbetennelse." } },
  ],
  sjekk: {
    tittel: "Hvordan er det hos deg?",
    intro: "Nå som du har lest, kan du trykke på det som ligner mest. Da får du et lite hint om hva det kan være.",
    hjelp: "Trykk på det som passer best.",
    merke: "Det kan være",
    valg: [
      {
        // SML Gingivitt
        id: "litt",
        svar: "Det blør litt når jeg pusser",
        tegning: "plakk",
        overskrift: "Tannkjøttbetennelse",
        forklaring: "Puss godt langs kanten av tannkjøttet, og rengjør mellom tennene hver dag. Ofte går betennelsen over da.",
        handling: { tittel: "Prøv dette først", tekst: "Blir det ikke bedre, bestill en time.", knapp: "bestill" },
      },
      {
        // SML Tannstein
        id: "belegg",
        svar: "Jeg ser hardt, gulaktig belegg nede ved tannkjøttet",
        tegning: "tannstein",
        overskrift: "Tannstein",
        forklaring: "Tannstein kan ikke pusses bort. Den må fjernes hos tannlegen eller tannpleieren.",
        handling: HANDLING.bestill,
      },
      {
        // NHI Tannkjøttbetennelse
        id: "lenge",
        svar: "Det blør selv om jeg pusser godt, og har gjort det lenge",
        tegning: "tannkjott",
        overskrift: "Tannkjøttet trenger hjelp",
        forklaring: "Når det har vart lenge, bør tannlegen se om betennelsen har gått dypere.",
        handling: HANDLING.bestill,
      },
      {
        // NHI Tannkjøttbetennelse: severe periodontitis can loosen the teeth
        id: "lose",
        svar: "Tennene føles løse",
        tegning: "tannhals",
        overskrift: "Periodontitt kan være i gang",
        forklaring: "Det bør vi se på snart. Jo før vi begynner, jo mer kan vi redde.",
        handling: HANDLING.iDag,
      },
    ],
  },
  slutt: "Vil du at vi ser på tannkjøttet? Bestill en time, så tar vi en titt.",
  kilder: [KILDE.smlGingivitt, KILDE.nhiTannkjott, KILDE.smlTannstein, KILDE.smlSlitasje, KILDE.nhiBarn, KILDE.hdirVoksne, KILDE.ntfRad, KILDE.hnKaries],
};
