import { klinikk } from "@/data/klinikk";

/* The toothache article, the same words in all three drafts. Written so a
   ten-year-old can read it: short sentences, everyday words, one idea at a
   time. A plain module, so server and client read the same values.
   A DRAFT: a dentist at the clinic must read and approve it before it goes live. */

const { telefon, apningstider } = klinikk;

export const ARTIKKEL = {
  tittel: "Det gjør vondt i tanna",
  ingress: "Vondt i en tann er ekkelt. Men det er nesten alltid noe vi kan fikse. Her ser du hva det kan bety, og hva du kan gjøre allerede i dag.",
  forfatter: "Per Hafthun",
  rolle: "Tannlege",
  lesetid: "3 minutter å lese",
} as const;

/** Why it hurts at all. */
export const NERVEN = {
  sporsmal: "Hvorfor gjør det vondt?",
  tekst: [
    "Inne i hver tann bor det en liten nerve. Den kjenner kulde, varme og trykk.",
    "Når noe er galt med tanna, sier nerven ifra. Det er det du kjenner som vondt.",
  ],
} as const;

export type Arsak = { id: "hull" | "sprekk" | "tannkjott" | "betennelse"; navn: string; tekst: string; kjennes: string };

/** What it can be. */
export const ARSAKER: { sporsmal: string; intro: string; liste: Arsak[] } = {
  sporsmal: "Hva kan det være?",
  intro: "Det er særlig fire ting som gir vondt i en tann.",
  liste: [
    {
      id: "hull",
      navn: "Et hull",
      tekst: "Bakterier i munnen lager syre av sukker. Syren kan spise et lite hull i tanna.",
      kjennes: "Ofte iser det når du spiser noe søtt eller kaldt.",
    },
    {
      id: "sprekk",
      navn: "En sprekk",
      tekst: "Tanna kan få en liten sprekk, for eksempel hvis du biter på noe hardt.",
      kjennes: "Ofte et stikk når du biter, og så slipper det.",
    },
    {
      id: "tannkjott",
      navn: "Sårt tannkjøtt",
      tekst: "Tannkjøttet rundt tanna kan bli rødt og irritert. Noen ganger sitter det mat fast der.",
      kjennes: "Ømt og sårt, og det kan blø litt når du pusser.",
    },
    {
      id: "betennelse",
      navn: "En syk nerve",
      tekst: "Hvis et hull får vokse lenge, kan nerven inne i tanna bli betent.",
      kjennes: "Det banker og verker, gjerne om natten, og går ikke over.",
    },
  ],
};

export type Tips = { id: "pusse" | "skylle" | "tygge" | "pute" | "tablett"; tekst: string };

/** What you can do today. */
export const TIPS: { sporsmal: string; liste: Tips[]; advarsel: string } = {
  sporsmal: "Hva kan jeg gjøre i dag?",
  liste: [
    { id: "pusse", tekst: "Puss tennene forsiktig, også der det gjør vondt. Bruk tanntråd hvis det sitter mat fast." },
    { id: "skylle", tekst: "Skyll munnen med lunkent vann." },
    { id: "tygge", tekst: "Tygg på den andre siden. Hold deg unna det som er veldig kaldt, varmt eller søtt." },
    { id: "pute", tekst: "Om natten kan det hjelpe å ligge med hodet litt høyt." },
    { id: "tablett", tekst: "Smertestillende fra apoteket kan hjelpe en stund. Følg det som står på pakken." },
  ],
  advarsel: "Ikke legg en tablett på tannkjøttet ved tanna. Den kan lage et sår.",
};

/** Pain that stops is not the same as a healthy tooth. */
export const BORTE = {
  sporsmal: "Det sluttet å gjøre vondt. Er alt bra nå?",
  tekst: [
    "Ikke alltid. Hvis nerven er veldig syk, kan den slutte å kjenne noe. Da blir det stille, men problemet er der fortsatt.",
    "Derfor bør en tann som har verket, alltid sjekkes. Da kan vi fikse den mens det er enkelt.",
  ],
} as const;

export type Lys = { farge: "gronn" | "gul" | "rod"; tittel: string; nar: string[]; gjor: string };

/** How soon to get in touch: green can wait, yellow today, red now. */
export const TRAFIKKLYS: { sporsmal: string; intro: string; lys: Lys[]; etterStengetid: string } = {
  sporsmal: "Hvor fort må jeg ringe?",
  intro: "Se hvilken farge som passer best.",
  lys: [
    {
      farge: "gronn",
      tittel: "Kan vente litt",
      nar: ["Det iser litt når du drikker kaldt, og går fort over.", "Det er lenge siden du var hos tannlegen."],
      gjor: "Bestill en vanlig time.",
    },
    {
      farge: "gul",
      tittel: "Ring oss i dag",
      nar: ["Det verker, og det går ikke over.", "Det gjør vondt når du biter.", "Det gjør vondt om natten, eller har vart i mer enn to dager."],
      gjor: `Ring ${telefon.visning}. Vi prøver å finne en time så fort vi kan.`,
    },
    {
      farge: "rod",
      tittel: "Ring nå",
      nar: ["Kinnet eller ansiktet er hovent.", "Du har feber.", "Det er vanskelig å svelge, puste eller åpne munnen."],
      gjor: `Ring ${telefon.visning} med en gang.`,
    },
  ],
  etterStengetid: `Vi har åpent ${apningstider.dager.toLowerCase()} ${apningstider.fra}–${apningstider.til}. Er det rødt og vi har stengt, ring legevakten på 116 117.`,
};

/** The same, without the traffic light's colours. */
export const STENGT = `Vi har åpent ${apningstider.dager.toLowerCase()} ${apningstider.fra}–${apningstider.til}. Har vi stengt, ring legevakten på 116 117.`;

export const LYSFARGE = {
  gronn: { prikk: "#3FA36B", flate: "#E4F1E8", tekst: "#1F5A3A" },
  gul: { prikk: "#E2A93B", flate: "#FBF0D9", tekst: "#6B4A10" },
  rod: { prikk: "#D9634C", flate: "#F8E4DB", tekst: "#7A2B1E" },
} as const;

export const METADATA = {
  title: "Det gjør vondt i tanna: hva betyr det, og hva gjør jeg?",
  description: "Tannverk forklart enkelt: hva det kan være, hva du kan gjøre i dag, og når du må ringe tannlegen.",
};

/* ── For D «Sjekk selv»: tap what it feels like, get a hint ── */

export type Valg = {
  id: string;
  kjennes: string;
  /** Which drawing to show. */
  tegning: Arsak["id"] | "hevelse";
  kanVaere: string;
  forklaring: string;
  lys: Lys["farge"];
};

export const SJEKK: { sporsmal: string; hjelp: string; valg: Valg[]; forbehold: string } = {
  sporsmal: "Hvordan kjennes det?",
  hjelp: "Trykk på det som passer best.",
  valg: [
    {
      id: "iser",
      kjennes: "Det iser litt når jeg drikker kaldt eller spiser søtt",
      tegning: "hull",
      kanVaere: "Et lite hull, eller tynn emalje",
      forklaring: "Når det iser kort og går fort over, er det sjelden farlig. Men et hull blir ikke borte av seg selv, så vi bør se på det.",
      lys: "gronn",
    },
    {
      id: "biter",
      kjennes: "Det stikker når jeg biter",
      tegning: "sprekk",
      kanVaere: "En sprekk i tanna",
      forklaring: "En liten sprekk kan bli større når du tygger. Jo før vi ser på den, jo lettere er den å fikse.",
      lys: "gul",
    },
    {
      id: "tannkjott",
      kjennes: "Tannkjøttet er sårt, eller blør når jeg pusser",
      tegning: "tannkjott",
      kanVaere: "Sårt tannkjøtt",
      forklaring: "Ofte hjelper det å pusse godt og bruke tanntråd hver dag i en uke eller to. Går det ikke over, vil vi gjerne se på det.",
      lys: "gronn",
    },
    {
      id: "banker",
      kjennes: "Det banker og verker, også om natten",
      tegning: "betennelse",
      kanVaere: "En syk nerve",
      forklaring: "Når det banker og ikke går over, kan nerven inne i tanna være betent. Det går ikke over av seg selv, men vi kan hjelpe.",
      lys: "gul",
    },
    {
      id: "hovent",
      kjennes: "Kinnet er hovent, eller jeg har feber",
      tegning: "hevelse",
      kanVaere: "En betennelse som sprer seg",
      forklaring: "Hevelse og feber betyr at kroppen kjemper mot en betennelse. Da skal du ikke vente.",
      lys: "rod",
    },
  ],
  forbehold: "Dette er bare et hint. Det er tannlegen som finner ut hva det er.",
};

/* ── For F «Visste du?»: the short version, facts and a quiz ── */

export const KORT = {
  tittel: "Det viktigste, på 10 sekunder",
  punkter: [
    "Vondt i tanna betyr at nerven inne i tanna sier ifra.",
    "Verker det, og det går ikke over? Ring oss i dag.",
    "Er kinnet hovent, eller har du feber? Ring med en gang.",
  ],
} as const;

export const FAKTA = [
  { id: "hard", tekst: "Det ytterste laget på tanna heter emalje. Det er det hardeste stoffet i hele kroppen, hardere enn bein." },
  { id: "syre", tekst: "Når du har spist noe søtt, lager bakteriene i munnen syre i omtrent en halvtime etterpå. Derfor er det bedre å spise søtt sjelden enn litt hele tiden." },
] as const;

export const QUIZ: { tittel: string; intro: string; sporsmal: { id: string; pastand: string; sant: boolean; svar: string }[] } = {
  tittel: "Sant eller usant?",
  intro: "Test deg selv. Trykk på det du tror.",
  sporsmal: [
    { id: "borte", pastand: "Hvis det slutter å gjøre vondt, er tanna frisk igjen.", sant: false, svar: "Nerven kan ha sluttet å kjenne noe. Problemet kan fortsatt være der." },
    { id: "tablett", pastand: "Det er lurt å legge en smertetablett rett på tannkjøttet.", sant: false, svar: "Tabletten kan lage et sår. Svelg den, og følg det som står på pakken." },
    { id: "pusse", pastand: "Du bør pusse forsiktig, også der det gjør vondt.", sant: true, svar: "Ja! Rene tenner og rent tannkjøtt blir fortere bedre." },
    { id: "hovent", pastand: "Hovent kinn og feber betyr at du bør ringe med en gang.", sant: true, svar: "Riktig. Da er det en betennelse som må behandles fort." },
  ],
};

/* ── For G, H and I: small lessons between the sections ── */

export type Smatt = { id: string; slag: "visste" | "triks" | "tips"; tekst: string };

export const SMATT_NAVN = { visste: "Visste du?", triks: "Lite triks", tips: "Pers tips" } as const;

export const SMATT: Record<string, Smatt> = {
  lag: { id: "lag", slag: "visste", tekst: "En tann har tre lag. Ytterst er emaljen, det hardeste stoffet i hele kroppen. Under den er dentin, og innerst bor nerven." },
  notat: { id: "notat", slag: "triks", tekst: "Skriv ned når det gjør vondt: når du drikker kaldt, når du biter, eller om natten. Da finner vi fortere ut hva det er." },
  syre: { id: "syre", slag: "visste", tekst: "Etter noe søtt lager bakteriene syre i omtrent en halvtime. Derfor er det bedre å spise søtt sjelden enn litt hele tiden." },
  traad: { id: "traad", slag: "tips", tekst: "Mat som sitter fast mellom tennene kan gjøre like vondt som et hull. Prøv tanntråd før du blir bekymret." },
  spytt: { id: "spytt", slag: "tips", tekst: "Spytt ut tannkremen etter pussing, men ikke skyll med vann. Da blir fluoren igjen på tennene og beskytter dem lenger." },
  myk: { id: "myk", slag: "triks", tekst: "Bruk en myk tannbørste. En hard børste kan slite på tannkjøttet og gjøre tennene ømme." },
};

/** For I's diagrams: the labels and what they say. */
export const LAG = [
  { navn: "Emalje", tekst: "Det harde skallet ytterst." },
  { navn: "Dentin", tekst: "Litt mykere, under emaljen." },
  { navn: "Nerven", tekst: "Innerst. Den kjenner alt." },
] as const;
