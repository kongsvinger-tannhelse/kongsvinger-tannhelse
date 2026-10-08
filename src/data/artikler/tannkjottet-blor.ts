import { HANDLING, type Artikkel } from "./typer";

/* Bleeding gums: plaque, why you should keep brushing, and what helps. */

export const tannkjottetBlor: Artikkel = {
  slug: "tannkjottet-blor",
  tittel: "Tannkjøttet blør når jeg pusser",
  kort: "Blødende tannkjøtt",
  ingress: "Litt blod i vasken når du pusser, er veldig vanlig. Det betyr at tannkjøttet er irritert. Det gode er at du ofte kan fikse det selv.",
  lesetid: "3 minutter å lese",
  beskrivelse: "Blødende tannkjøtt forklart enkelt: hvorfor tannkjøttet blør når du pusser, hva du kan gjøre selv, og når du bør komme.",
  tegning: "plakk",
  deler: [
    {
      type: "tekst",
      id: "hvorfor",
      tittel: "Hvorfor blør det?",
      avsnitt: [
        "Langs kanten av tannkjøttet samler det seg et tynt, klissete lag med bakterier. Det heter plakk.",
        "Bakteriene irriterer tannkjøttet. Det blir rødt, hovent og blør lett. Det kalles tannkjøttbetennelse.",
      ],
      tegning: "plakk",
    },
    { type: "lapp", lapp: { slag: "visste", tekst: "Friskt tannkjøtt er lyserosa og fast. Irritert tannkjøtt er rødere, litt hovent, og blør når du pusser." } },
    {
      type: "tekst",
      id: "pusse",
      tittel: "Skal jeg slutte å pusse der det blør?",
      avsnitt: [
        "Nei! Det er lett å tro, men da blir det bare verre. Bakteriene får være i fred, og tannkjøttet blør mer.",
        "Puss heller forsiktig og grundig akkurat der det blør. Etter en uke eller to blir det ofte mye bedre.",
      ],
      tegning: "skraa",
    },
    { type: "lapp", lapp: { slag: "triks", tekst: "Se i speilet etter at du har pusset. Legg merke til hvor det blør. Det er der du skal pusse litt ekstra neste gang." } },
    {
      type: "liste",
      id: "arsaker",
      tittel: "Hva kan det være?",
      intro: "Som oftest er det plakk. Men det finnes flere grunner.",
      ekstraNavn: "Slik ser det ut:",
      punkter: [
        { id: "plakk", navn: "Plakk", tekst: "Bakterier som ikke blir pusset bort, irriterer tannkjøttet.", ekstra: "Rødt og litt hovent, og det blør når du pusser.", tegning: "plakk" },
        { id: "tannstein", navn: "Tannstein", tekst: "Plakk som får sitte lenge, blir hardt. Det heter tannstein, og kan ikke pusses bort.", ekstra: "Hardt, gulaktig belegg nede ved tannkjøttet.", tegning: "tannstein" },
        { id: "hard", navn: "For hard pussing", tekst: "En hard børste eller mye press kan skrubbe tannkjøttet.", ekstra: "Det blør, men tannkjøttet er ikke rødt.", tegning: "borste" },
      ],
    },
    {
      type: "tips",
      id: "tips",
      tittel: "Slik får du friskt tannkjøtt",
      punkter: [
        { tekst: "Hold børsten litt på skrå mot tannkjøttet, og puss med små, rolige bevegelser.", tegning: "skraa" },
        { tekst: "Bruk tanntråd eller små mellomromsbørster hver dag. Inn mellom tennene når ikke tannbørsten.", tegning: "traad" },
        { tekst: "Bruk en myk tannbørste, og bytt den når børstene begynner å spre seg.", tegning: "borste" },
        { tekst: "Puss to ganger hver dag, i to minutter.", tegning: "klokke" },
      ],
      obs: "Blør det fortsatt etter to uker med god pussing? Da vil vi gjerne se på det.",
    },
    { type: "lapp", lapp: { slag: "tips", tekst: "Mellomromsbørster finnes i mange størrelser. Spør oss, så finner vi den som passer mellom dine tenner." } },
    {
      type: "tekst",
      id: "viktig",
      tittel: "Hvorfor er det viktig?",
      avsnitt: [
        "Hvis tannkjøttbetennelse får vare lenge, kan den gå dypere og skade det som holder tennene fast. Det kalles periodontitt.",
        "Det kommer sakte og gjør sjelden vondt. Derfor er det lurt å fikse det mens det er enkelt.",
      ],
      tegning: "tannhals",
    },
  ],
  sjekk: {
    tittel: "Hvordan er det hos deg?",
    intro: "Nå som du har lest, kan du trykke på det som ligner mest. Da får du et lite hint om hva det kan være.",
    hjelp: "Trykk på det som passer best.",
    merke: "Det kan være",
    valg: [
      {
        id: "litt",
        svar: "Det blør litt når jeg pusser",
        tegning: "plakk",
        overskrift: "Tannkjøttbetennelse",
        forklaring: "Puss godt langs kanten og bruk tanntråd hver dag i to uker. Ofte er det borte da.",
        handling: { tittel: "Prøv dette først", tekst: "Blir det ikke bedre på to uker, bestill en time.", knapp: "bestill" },
      },
      {
        id: "belegg",
        svar: "Jeg ser hardt, gult belegg nede ved tannkjøttet",
        tegning: "tannstein",
        overskrift: "Tannstein",
        forklaring: "Tannstein må fjernes hos oss. Det går fort, og tannkjøttet blir friskere etterpå.",
        handling: HANDLING.bestill,
      },
      {
        id: "lenge",
        svar: "Det blør selv om jeg pusser forsiktig, og har gjort det lenge",
        tegning: "tannkjott",
        overskrift: "Tannkjøttet trenger hjelp",
        forklaring: "Når det har vart lenge, bør vi se om betennelsen har gått dypere.",
        handling: HANDLING.bestill,
      },
      {
        id: "lose",
        svar: "Tennene føles løse, eller tannkjøttet har trukket seg tilbake",
        tegning: "tannhals",
        overskrift: "Periodontitt kan være i gang",
        forklaring: "Det bør vi se på snart. Jo før vi begynner, jo mer kan vi redde.",
        handling: HANDLING.iDag,
      },
    ],
  },
  slutt: "Vil du at vi ser på tannkjøttet? Bestill en time, så tar vi en titt.",
};
