import { KILDE } from "./kilder";
import type { Artikkel } from "./typer";

/* Who pays at the dentist. Every line checked on 8 October 2026 against the
   sources at the bottom; the comments name the source behind each part.
   Young adults lost Helfo's support on 1 July 2026, and the frikort sum
   changes every year: check again in January. «Direkte oppgjør» is the
   clinic's own word (2026-10-08). */

export const hvaDekkerHelfo: Artikkel = {
  slug: "hva-dekker-helfo",
  tittel: "Hva dekker Helfo hos tannlegen?",
  kort: "Hva dekker Helfo",
  // Helsenorge Tannlegeregning: as a rule adults pay themselves; folketrygden covers part in some cases
  ingress: "De fleste voksne betaler tannlegen selv. Men barn og unge får hjelp, og har du visse sykdommer, betaler Helfo en del. Her ser du hvem som betaler hva.",
  lesetid: "3 minutter å lese",
  beskrivelse: "Hva dekker Helfo hos tannlegen? Hvem som betaler tannbehandlingen for barn, unge voksne fra 19 til 28 år og voksne, når Helfo gir stønad, refusjon og frikort.",
  tegning: "regning",
  deler: [
    {
      type: "tekst",
      id: "hvem",
      tittel: "Hvem betaler?",
      avsnitt: [
        "Det kommer an på hvor gammel du er, og om du har en sykdom som gir rett på hjelp.",
        // Tannhelsetjenesteloven § 1-3 and Helsenorge: «det året de fyller»
        "Alderen regnes etter året du fyller, ikke etter bursdagen din.",
      ],
      tegning: "regning",
    },
    {
      type: "liste",
      id: "alder",
      tittel: "Det kommer an på alderen",
      ekstraNavn: "Du betaler:",
      punkter: [
        // Helsenorge Tannlegeregning: 0–18 all treatment except orthodontics is free; tannhelsetjenesteloven § 1-3 a
        { id: "barn", navn: "0 til 18 år", tekst: "Barn og ungdom går til Den offentlige tannhelsetjenesten. Der er alt gratis, bortsett fra tannregulering.", ekstra: "Ingenting.", tegning: "roligtann" },
        // Helsenorge Tannlegeregning (25 / 75 percent in the public service), vederlagsforskriften § 3, tannhelsetjenesteloven § 1-3 d
        { id: "unge", navn: "19 til 28 år", tekst: "Unge voksne går også til Den offentlige tannhelsetjenesten. Der betaler det offentlige 75 prosent.", ekstra: "25 prosent av prisen.", tegning: "steg" },
        // Helfo Tilstander: as a rule people over 28 pay all treatment themselves; 15 conditions give support
        { id: "voksne", navn: "29 år og eldre", tekst: "Voksne går som regel til en privat tannlege, som oss. Har du en av 15 sykdommer eller tilstander, betaler Helfo en del.", ekstra: "Vanligvis hele regningen.", tegning: "regning" },
      ],
    },
    // Helfo Unge voksne: from 1 July 2026 no Helfo support for 19–28, the counties are responsible
    { type: "lapp", lapp: { slag: "visste", tekst: "Fra 1. juli 2026 får unge mellom 19 og 28 år ikke lenger hjelp fra Helfo hos private tannleger. Rabatten får de i Den offentlige tannhelsetjenesten." } },
    {
      type: "liste",
      id: "helfo",
      tittel: "Når betaler Helfo for voksne?",
      // Helfo Tilstander: 15 conditions; Helsenorge Tannlegeregning: the dentist decides whether you fall under one
      intro: "Helfo gir stønad ved 15 sykdommer og tilstander. Her er fire av dem. Det er tannlegen som finner ut om du har rett.",
      punkter: [
        // Helfo point 6; NHI Tannkjøttbetennelse (periodontitt: inflammation deeper down, loss of supporting tissue and bone)
        { id: "periodontitt", navn: "Alvorlig tannkjøttsykdom", tekst: "Periodontitt er betennelse som går så dypt at vevet og beinet som holder tennene på plass, blir borte.", tegning: "tannkjott" },
        // Helfo point 10: hyposalivasjon
        { id: "munntorr", navn: "For lite spytt", tekst: "Lager munnen for lite spytt over lang tid, kan Helfo hjelpe.", tegning: "glass" },
        // Helfo point 13: tooth damage in an accident that is not an occupational injury
        { id: "ulykke", navn: "Tannskade etter en ulykke", tekst: "For eksempel når en tann knekker etter et fall.", tegning: "sprekk" },
        // Helfo point 9: pathological loss of tooth substance by attrition / erosion
        { id: "slitt", navn: "Veldig slitte tenner", tekst: "Når tennene er unormalt mye slitt, av syre eller av at tennene gnis mot hverandre.", tegning: "slitt" },
      ],
    },
    {
      type: "tekst",
      id: "oppgjor",
      tittel: "Du søker ikke selv",
      avsnitt: [
        // Helsenorge Tannlegeregning: with direkte oppgjør the support is paid to the dentist, you don't pay that part
        "Vi har direkte oppgjør med Helfo. Har du rett på stønad, sender vi kravet til Helfo for deg, og du betaler bare din del.",
        // Helsenorge Tannlegeregning: fixed rates, the dentist may charge more
        "Helfo betaler et fast beløp for hver behandling. Tannlegen kan ta mer enn det, og forskjellen betaler du selv.",
      ],
      tegning: "snakke",
    },
    // Prisopplysningsforskriften § 18
    { type: "lapp", lapp: { slag: "visste", tekst: "Koster behandlingen mer enn 5 000 kroner, skal du få et skriftlig pristilbud før den starter. Betaler Helfo noe, står det der også." } },
    {
      type: "tekst",
      id: "frikort",
      tittel: "Teller det på frikortet?",
      avsnitt: [
        // Helsenorge Tannlegeregning and Frikort: only support points 5 and 6 count; the dentist reports it
        "Bare for to av de 15: sykdommer og misdannelser i munn og kjeve, og periodontitt. Da teller egenandelen med på frikortet, og tannlegen melder den inn for deg.",
        // Helsenorge Frikort: you pay the difference even with a frikort
        "Forskjellen mellom prisen og det Helfo betaler, må du betale selv, også når du har frikort.",
      ],
      tegning: "frikort",
    },
    // Helsenorge Frikort: 3278 kroner in 2026
    { type: "lapp", lapp: { slag: "visste", tekst: "I 2026 får du frikort når du har betalt 3 278 kroner i egenandeler." } },
    {
      type: "tekst",
      id: "hjelp",
      tittel: "Trenger du mer hjelp?",
      avsnitt: [
        // Helsenorge Tannlegeregning: apply to Nav if you can't afford it
        "Har du dårlig råd, kan du søke Nav om støtte til tannbehandling.",
        // Tannhelsetjenesteloven § 1-3 c
        "Den offentlige tannhelsetjenesten gir også tannbehandling til noen andre, for eksempel eldre og syke som bor på institusjon eller får hjemmesykepleie.",
      ],
      tegning: "hjerte",
    },
  ],
  sjekk: {
    tittel: "Hvor gammel er du?",
    intro: "Trykk på det som passer deg, så ser du hvem som betaler.",
    hjelp: "Trykk på det som passer.",
    merke: "Slik er det for deg",
    forbehold: "Dette er bare et hint. Det er tannlegen som vurderer om du har rett på stønad.",
    valg: [
      {
        // Helsenorge Tannlegeregning
        id: "barn",
        svar: "18 år eller yngre",
        tegning: "roligtann",
        overskrift: "Det er gratis",
        forklaring: "Du får tannbehandling gratis i Den offentlige tannhelsetjenesten, bortsett fra tannregulering.",
      },
      {
        // Helsenorge Tannlegeregning, Helfo Unge voksne (exceptions: some orthodontics, too short residence)
        id: "unge",
        svar: "Mellom 19 og 28 år",
        tegning: "steg",
        overskrift: "Du betaler 25 prosent",
        forklaring: "Det gjelder i Den offentlige tannhelsetjenesten. Hos en privat tannlege gir Helfo ikke stønad til deg, med noen få unntak.",
      },
      {
        // Helfo Tilstander, Helsenorge Tannlegeregning
        id: "voksen",
        svar: "29 år eller eldre",
        tegning: "regning",
        overskrift: "Du betaler vanligvis selv",
        forklaring: "Har du en av de 15 tilstandene, betaler Helfo en del. Vi har direkte oppgjør med Helfo, så da betaler du bare din del.",
        handling: { tittel: "Vil du komme til oss?", tekst: "Bestill en time.", knapp: "bestill" },
      },
      {
        // Helsenorge Tannlegeregning: the dentist decides
        id: "sykdom",
        svar: "Jeg har en sykdom i munnen",
        tegning: "tannkjott",
        overskrift: "Kanskje betaler Helfo en del",
        forklaring: "Tannlegen undersøker deg og finner ut om du har en av de 15 tilstandene. Har du det, sender vi kravet til Helfo.",
        handling: { tittel: "Vil du komme til oss?", tekst: "Bestill en time.", knapp: "bestill" },
      },
    ],
  },
  slutt: "Lurer du på om Helfo dekker noe hos deg? Det finner tannlegen ut når du kommer.",
  kilder: [
    KILDE.hnTannlegeregning,
    KILDE.helfoTilstander,
    KILDE.helfoUngeVoksne,
    KILDE.hnFrikort,
    KILDE.lovTannhelse,
    KILDE.lovVederlag,
    KILDE.lovPristilbud,
    KILDE.nhiTannkjott,
  ],
};
