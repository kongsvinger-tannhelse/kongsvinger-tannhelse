import { BKILDE } from "./kilder";
import type { Behandlingsside } from "./typer";

/* A bridge. Every line checked on 8 October 2026 against the sources at the
   bottom; the comments name the source behind each part. General: no source
   says when a bridge is better than an implant or a partial denture, so the
   page only names the choices and points to the dentist. */

export const tannbro: Behandlingsside = {
  slug: "tannbro",
  navn: "Tannbro",
  // the clinic's own words (klinikk.ts)
  ingress: "En tannbro erstatter én eller flere tenner som mangler. Den festes til tennene ved siden av og sitter fast hele tiden. Her ser du hvordan den lages.",
  hosOss: "Hos oss på Kongsvinger Tannhelse ser vi på luka og tennene rundt, og hva som passer for deg.",
  tittelbilde: "bro-elv",
  beskrivelse: "Tannbro hos tannlegen i Kongsvinger: hva en bro er, hvilke andre måter det finnes å erstatte en tann på, og hvordan en bro lages steg for steg.",
  deler: [
    {
      type: "tekst",
      id: "hva",
      tittel: "Hva er en tannbro?",
      avsnitt: [
        // SML Broprotese: artificial teeth anchored to the remaining teeth (pilartennene)
        "En tannbro erstatter én eller flere tenner som mangler. De nye tennene festes til tennene ved siden av, som kalles pilartenner.",
        // SML Broprotese: cemented, a fixed replacement
        "Broen sementeres fast, så den sitter fast hele tiden.",
        // SML Tannprotese: porcelain, metal or combinations
        "Den lages oftest av porselen, metall, eller begge deler.",
      ],
      tegning: "bro-lost",
    },
    {
      type: "tekst",
      id: "valg",
      tittel: "Hvilke valg finnes?",
      avsnitt: [
        // SML Tannprotese (fixed or removable), Tannimplantat, Plateprotese; Broprotese (an implant as a pillar)
        "En tann som mangler, kan erstattes på flere måter: med en bro, et tannimplantat eller en avtakbar protese. Et implantat kan også brukes som pilar for en bro.",
        "Hva som passer, er forskjellig fra person til person. Vi går gjennom valgene sammen med deg.",
      ],
      tegning: "valg",
    },
    {
      type: "serie",
      id: "slik",
      tittel: "Slik lages en bro",
      ruter: [
        { tegning: "lupe-gap", tekst: "Først ser vi på tennene og planlegger broen sammen med deg." },
        // UiO clinic handbook: the pillar teeth are prepared
        { tegning: "stubb", tekst: "Tennene ved siden av slipes til, så broen får plass." },
        // SML Tannprotese: made outside the mouth from exact impressions
        { tegning: "gips", tekst: "Vi tar avtrykk, og broen lages etter dem." },
        // UiO clinic handbook: a temporary is often made
        { tegning: "provisorium", tekst: "I mellomtiden får du ofte en midlertidig bro.", mellom: true },
        // UiO clinic handbook: form and colour tried
        { tegning: "farge", tekst: "Form og farge prøves, så broen passer med de andre tennene." },
        // SML Broprotese: cemented to the pillars
        { tegning: "bro", tekst: "Til slutt sementeres broen fast." },
      ],
    },
    // SML Tannprotese: fixed (bridge, crown) or removable
    { type: "lapp", lapp: { slag: "visste", tekst: "Bro og krone kalles faste proteser. De sitter fast, og tas ikke ut slik en løs protese gjør." } },
    {
      type: "tekst",
      id: "stell",
      tittel: "Hvordan tar jeg vare på en bro?",
      avsnitt: [
        // UiO clinic handbook: the patient is shown brushes, floss and interdental brushes
        "Under og rundt en bro må du holde like rent som rundt dine egne tenner. Vi gir deg råd om hvordan du best gjør det.",
      ],
      tegning: "bro-traad",
    },
  ],
  slutt: "Mangler du en tann? Bestill en time, så ser vi på hva som passer for deg.",
  kilder: [BKILDE.smlBroprotese, BKILDE.smlTannprotese, BKILDE.smlImplantat, BKILDE.smlPlateprotese, BKILDE.uioBro],
};
