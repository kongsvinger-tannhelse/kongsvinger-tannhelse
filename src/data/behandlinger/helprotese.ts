import { BKILDE } from "./kilder";
import type { Behandlingsside } from "./typer";

/* A full denture. Every line checked on 8 October 2026 against the sources at
   the bottom; the comments name the source behind each part. No timings for
   getting used to it: that differs from patient to patient. */

export const helprotese: Behandlingsside = {
  slug: "helprotese",
  navn: "Helprotese",
  // the clinic's own words (klinikk.ts)
  ingress: "En helprotese er et avtakbart tannsett når alle tennene i en kjeve er borte. Her ser du hvordan den lages, og hvordan det er å begynne å bruke den.",
  lesetid: "2 minutter å lese",
  beskrivelse: "Helprotese hos tannlegen i Kongsvinger: hva en helprotese er, hvordan den lages steg for steg, og hvordan det er å venne seg til den.",
  deler: [
    {
      type: "tekst",
      id: "hva",
      tittel: "Hva er en helprotese?",
      avsnitt: [
        // SML Gebiss: a full denture when all natural teeth in a jaw are missing
        "En helprotese, eller et gebiss, er et avtakbart tannsett når alle tennene i en kjeve mangler.",
        // SML Gebiss: gum-coloured acrylic with teeth; held by tongue, muscles and vacuum; some need adhesive
        "Den lages av et tannkjøttfarget materiale med kunstige tenner på. Den holdes på plass av tunga, musklene og et lite vakuum, og noen bruker i tillegg et spesiallim.",
      ],
      tegning: "protese",
    },
    {
      type: "tekst",
      id: "valg",
      tittel: "Hvilke valg finnes?",
      avsnitt: [
        // Helsedirektoratet, stønadspunkt 15: two implants and an overdenture fixed to them
        "I underkjeven kan en protese også festes til implantater, så den sitter bedre.",
        "Hva som passer, er forskjellig fra person til person. Tannlegen går gjennom valgene med deg.",
      ],
      tegning: "implantat-skrue",
    },
    {
      type: "serie",
      id: "slik",
      tittel: "Slik lages en helprotese",
      ruter: [
        // UiO clinic handbook: first consultation
        { tegning: "snakke", tekst: "Først snakker vi sammen og ser på munnen din." },
        // UiO clinic handbook: a first and a second impression
        { tegning: "avtrykk", tekst: "Tannlegen tar avtrykk av kjevene, ofte flere ganger, så protesen passer best mulig." },
        // UiO clinic handbook: recording how the jaws meet
        { tegning: "plan", tekst: "Vi måler hvordan kjevene møtes når du biter." },
        // UiO clinic handbook: the teeth tried in wax
        { tegning: "protese", tekst: "Tennene prøves først i voks, så du kan se hvordan de blir.", mellom: true },
        // UiO clinic handbook: handing over
        { tegning: "hvit", tekst: "Til slutt får du protesen, og vi ser hvordan den sitter." },
      ],
    },
    {
      type: "tekst",
      id: "venne",
      tittel: "Hvordan er det å bruke en protese?",
      avsnitt: [
        // UiO clinic handbook: needs getting used to, as the muscles of the mouth must learn
        "Det tar tid å venne seg til en ny protese, fordi musklene i munnen må lære seg å bruke den.",
        "Hvor lang tid det tar, er forskjellig fra person til person. Tannlegen gir deg råd underveis.",
      ],
      tegning: "klokke",
    },
    // SML Gebiss: better dental health means dentures are less common in Norway today
    { type: "lapp", lapp: { slag: "visste", tekst: "Fordi tannhelsen er blitt bedre, er det færre i Norge som bruker gebiss i dag enn før." } },
    {
      type: "pris",
      id: "pris",
      sporsmal: "Hva koster en helprotese?",
      tekst: "Ring oss, så får du vite hva en protese vil koste.",
      // Helsedirektoratet stønadspunkt 15; Helfo Tilstander
      helfo: "Som hovedregel betaler voksne selv. Har du ingen egne tenner i underkjeven og ikke kan bruke en løs protese, kan Helfo dekke to implantater og en protese som festes til dem. Tannlegen vurderer om du har rett.",
      tegning: "regning",
    },
  ],
  slutt: "Lurer du på om en protese passer for deg? Bestill en time, så snakker vi om det.",
  kilder: [BKILDE.smlGebiss, BKILDE.smlTannprotese, BKILDE.uioHelprotese, BKILDE.hdirPunkt15, BKILDE.hnTannlegeregning, BKILDE.helfoTilstander],
};
