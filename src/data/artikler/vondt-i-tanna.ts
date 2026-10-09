import { KILDE } from "./kilder";
import { HANDLING, type Artikkel } from "./typer";

/* Toothache. Every line checked on 8 October 2026 against the sources at
   the bottom; the comments name the source behind each part. */

export const vondtITanna: Artikkel = {
  slug: "vondt-i-tanna",
  tittel: "Det gjør vondt i tanna",
  gruppe: "galt",
  linje: "Hva det kan være, hva du kan gjøre i dag, og når du bør komme til tannlegen.",
  kort: "Tannverk",
  ingress: "Vondt i en tann er ekkelt. Men det er nesten alltid noe vi kan fikse. Her ser du hva det kan bety, og hva du kan gjøre allerede i dag.",
  beskrivelse: "Tannverk forklart enkelt: hva det kan være, hva du kan gjøre i dag, og når du bør komme til tannlegen.",
  tegning: "betennelse",
  deler: [
    // SML Tennene and Tannsmerter: the nerve in the pulp registers cold, heat and pressure
    {
      type: "tekst",
      id: "nerven",
      tittel: "Hvorfor gjør det vondt?",
      avsnitt: [
        "Inne i hver tann bor det en liten nerve. Den kjenner kulde, varme og trykk.",
        "Når noe er galt med tanna, sier nerven ifra. Det er det du kjenner som vondt.",
      ],
      tegning: "nerve",
    },
    // SML Tennene (three layers), SML Tannemalje (the body's hardest substance)
    { type: "lapp", lapp: { slag: "visste", tekst: "En tann har tre lag. Ytterst er emaljen, det hardeste stoffet i hele kroppen. Under den er dentin, og innerst bor nerven.", feste: "Inne i hver tann bor det en liten nerve" } },
    {
      type: "liste",
      id: "arsaker",
      tittel: "Hva kan det være?",
      intro: "Det er særlig fire ting som gir vondt i en tann.",
      ekstraNavn: "Slik kjennes det:",
      punkter: [
        // Helsenorge Hull i tennene: bacteria turn sugar into acid; big holes give ising or toothache
        { id: "hull", navn: "Et hull", tekst: "Bakterier i munnen lager syre av sukker. Syren kan løse opp tanna, så det blir et hull.", ekstra: "Når hullet blir stort, kan det ise eller verke.", tegning: "hull" },
        // SML Tannsmerter: a crack can give sudden pain when chewing
        { id: "sprekk", navn: "En sprekk", tekst: "Tanna kan få en liten sprekk.", ekstra: "Det kan gjøre plutselig vondt når du tygger.", tegning: "sprekk" },
        // NHI Tannkjøttbetennelse, SML Gingivitt: red, swollen gums that bleed
        { id: "tannkjott", navn: "Sårt tannkjøtt", tekst: "Tannkjøttet rundt tanna kan bli rødt og betent. Noen ganger sitter det mat fast der.", ekstra: "Rødt og hovent, og det kan blø når du pusser.", tegning: "tannkjott" },
        // NHI Pulpitt and Tannbyll: decay reaches the nerve; boring, throbbing pain; SML: rarely goes away
        { id: "betennelse", navn: "En syk nerve", tekst: "Hvis et hull får vokse lenge, kan nerven inne i tanna bli betent.", ekstra: "Det banker og verker, og går sjelden over av seg selv.", tegning: "betennelse" },
      ],
    },
    // NHI Førstehjelp ved tannpine: decay is the main cause of toothache in most children and adults.
    // (Was the last note; moved here, beside the causes it tells you the commonest of.)
    { type: "lapp", lapp: { slag: "visste", tekst: "Hull i tennene er den vanligste grunnen til tannverk, både hos barn og voksne.", feste: "fire ting som gir vondt i en tann" } },
    // NHI Førstehjelp ved tannpine: use floss to remove food between the teeth
    { type: "lapp", lapp: { slag: "triks", tekst: "Prøv tanntråd først. Mat som sitter fast mellom tennene kan gjøre vondt, og tanntråd kan få den ut.", feste: "Noen ganger sitter det mat fast der" } },
    {
      type: "tips",
      id: "tips",
      tittel: "Hva kan jeg gjøre i dag?",
      punkter: [
        // NHI Førstehjelp ved tannpine
        { tekst: "Bruk tanntråd for å få ut mat som sitter fast mellom tennene.", tegning: "traad" },
        { tekst: "Noen får det bedre av å suge på en isbit der det gjør vondt.", tegning: "glass" },
        // NHI Førstehjelp ved tannpine (paracetamol), Helsenorge Reseptfrie smertestillende
        { tekst: "Smertestillende fra apoteket, for eksempel paracetamol, kan hjelpe en stund. Følg det som står på pakken.", tegning: "tablett" },
      ],
      // Helsenorge Reseptfrie smertestillende: not more than 5 days for pain without talking to a doctor (toothache named)
      obs: "Ikke bruk smertestillende mot tannverk i mer enn fem dager uten å snakke med tannlege eller lege.",
    },
    // Tannlegeforeningen Gode råd: do not rinse after brushing, the fluoride works longer.
    // Not pinned: it explains nothing in this article (it is brushing advice), so it stays between the sections.
    { type: "lapp", lapp: { slag: "tips", tekst: "Spytt ut tannkremen etter pussing, men ikke skyll med vann. Da virker fluoren lenger." } },
    // SML Tannsmerter (as the nerve dies, the tooth turns tender to bite on), NHI Tannbyll (a dead pulp can give an abscess)
    {
      type: "tekst",
      id: "stille",
      tittel: "Det sluttet å gjøre vondt. Er alt bra nå?",
      avsnitt: [
        "Ikke alltid. Hvis nerven blir veldig syk, kan den dø. Da kan smerten forandre seg eller bli borte en stund, men betennelsen er der fortsatt.",
        "Tanna kan bli øm når du biter, og det kan komme en byll. Derfor bør en tann som har verket, alltid sjekkes.",
      ],
      tegning: "stille",
    },
  ],
  sjekk: {
    tittel: "Hvordan kjennes det hos deg?",
    intro: "Nå som du har lest, kan du trykke på det som ligner mest. Da får du et lite hint om hva det kan være.",
    hjelp: "Trykk på det som passer best.",
    merke: "Det kan være",
    valg: [
      {
        // SML Tannsmerter: ising that stops with the cold is not pulpitis; Helsenorge: a hole should be fixed before it grows
        id: "iser",
        svar: "Det iser litt når jeg drikker kaldt",
        tegning: "hull",
        overskrift: "Et lite hull, eller tynn emalje",
        forklaring: "Når isingen går over med en gang kulden er borte, er nerven som regel ikke syk. Men et hull blir ikke borte av seg selv, så vi bør se på det.",
        handling: HANDLING.bestill,
        lenke: { tekst: "Les om ising", slug: "det-iser-i-tennene" },
      },
      {
        // SML Tannsmerter
        id: "biter",
        svar: "Det stikker når jeg biter",
        tegning: "sprekk",
        overskrift: "En sprekk i tanna",
        forklaring: "En sprekk kan gi plutselig smerte når du tygger. Det bør en tannlege se på.",
        handling: HANDLING.iDag,
      },
      {
        // SML Gingivitt: removing the plaque makes the inflammation go away
        id: "tannkjott",
        svar: "Tannkjøttet er sårt, eller blør når jeg pusser",
        tegning: "tannkjott",
        overskrift: "Sårt tannkjøtt",
        forklaring: "Det hjelper ofte å pusse godt langs tannkjøttet og rengjøre mellom tennene hver dag. Går det ikke over, vil vi gjerne se på det.",
        handling: HANDLING.bestill,
        lenke: { tekst: "Les om blødende tannkjøtt", slug: "tannkjottet-blor" },
      },
      {
        // NHI Pulpitt, SML Tannsmerter
        id: "banker",
        svar: "Det banker og verker",
        tegning: "betennelse",
        overskrift: "En syk nerve",
        forklaring: "Når det banker og ikke går over, kan nerven inne i tanna være betent. Det går sjelden over av seg selv, men vi kan hjelpe.",
        handling: HANDLING.iDag,
      },
      {
        // NHI Tannbyll: fever, trouble swallowing or breathing are signs of a serious infection; Helsenorge Legevakt: 113 in an emergency
        id: "hovent",
        svar: "Kinnet er hovent, eller jeg har feber",
        tegning: "hevelse",
        overskrift: "En betennelse som sprer seg",
        forklaring: "Hevelse og feber kan bety at en betennelse sprer seg. Da skal du ikke vente. Er det vanskelig å svelge eller puste, ring 113.",
        handling: HANDLING.naa,
      },
    ],
  },
  slutt: "Vil du at vi ser på tanna? Bestill en time, så tar vi en titt.",
  kilder: [KILDE.nhiTannpine, KILDE.nhiPulpitt, KILDE.nhiTannbyll, KILDE.hnKaries, KILDE.hnSmertestillende, KILDE.hnLegevakt, KILDE.smlTannsmerter, KILDE.smlTennene, KILDE.smlEmalje, KILDE.smlGingivitt, KILDE.ntfRad],
};
