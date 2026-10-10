import { BKILDE } from "./kilder";
import type { Behandlingsside } from "./typer";

/* A partial denture. Every line checked on 8 October 2026 against the
   sources at the bottom; the comments name the source behind each part.
   No timings for check-ups or for getting used to it: that differs from
   patient to patient. */

export const delprotese: Behandlingsside = {
  slug: "delprotese",
  navn: "Delprotese",
  // the clinic's own words (klinikk.ts)
  ingress: "En delprotese er en avtakbar protese som festes til tennene du har igjen, og erstatter de tennene som mangler. Her ser du hvordan den lages, og hva som er viktig når du har den.",
  hosOss: "Hos oss på Kongsvinger Tannhelse ser vi på tennene du har igjen, og hva som passer for deg.",
  tittelbilde: "puslespill",
  beskrivelse: "Delprotese hos tannlegen i Kongsvinger: hva en delprotese er, når den kan passe, hvordan den lages steg for steg, og hvorfor kontroller er viktig.",
  deler: [
    {
      type: "tekst",
      id: "hva",
      tittel: "Hva er en delprotese?",
      avsnitt: [
        // SML Tannprotese (replaces lost teeth; removable), UiO clinic handbook (the patient practises taking it out and putting it in)
        "En delprotese erstatter tenner som mangler, når du har noen egne tenner igjen. Du tar den ut og setter den inn selv.",
        // SML Plateprotese (the teeth sit on a plate of metal or plastic), UiO clinic handbook and Tidende (clasps hold it)
        "De nye tennene sitter på en plate av metall eller plast. Små metallbøyler, som kalles klammer, holder den fast i noen av dine egne tenner.",
      ],
      tegning: "delprotese",
    },
    {
      type: "tekst",
      id: "passer",
      tittel: "Når kan en delprotese passe?",
      avsnitt: [
        // Tidende: a good treatment, for example where the missing teeth make a tooth-borne bridge impossible
        "En delprotese kan være et godt valg, for eksempel når tennene som mangler sitter slik at en bro ikke kan festes.",
        // SML Tannprotese (bridges), SML Tannimplantat
        "Andre valg kan være en bro eller implantater. Hva som passer, er forskjellig fra person til person, og vi går gjennom valgene med deg.",
      ],
      tegning: "veiviser",
    },
    {
      type: "serie",
      id: "slik",
      tittel: "Slik lages en delprotese",
      ruter: [
        // UiO clinic handbook: the remaining teeth free of decay and gum disease first; Tidende: the gums treated first
        { tegning: "snakke-del", tekst: "Først snakker vi sammen og ser på tennene dine. Hull og tannkjøttsykdom behandles før protesen lages." },
        // UiO clinic handbook: impressions of both jaws
        { tegning: "avtrykk-del", tekst: "Vi tar avtrykk av begge kjevene." },
        // UiO clinic handbook and Tidende: small rests ground into some teeth, for the denture to rest on
        { tegning: "opplegg", tekst: "Noen ganger slipes det en liten forsenkning i en tann, så protesen får noe å hvile på.", mellom: true },
        // UiO clinic handbook: the design drawn on the model, the denture made at a dental laboratory
        { tegning: "tegning-del", tekst: "Vi tegner hvordan protesen skal bli, og en tanntekniker lager den." },
        // UiO clinic handbook: the teeth tried in wax, form and colour checked
        { tegning: "voks-speil", tekst: "Tennene prøves først i voks, så du kan se form og farge." },
        // UiO clinic handbook: handing over; the patient practises taking it out and putting it in
        { tegning: "inn-ut", tekst: "Til slutt får du protesen, og øver på å ta den ut og sette den inn." },
      ],
      // UiO clinic handbook: a check-up afterwards, adjusted if needed
      etter: "Etterpå kommer du til en kontroll, så protesen kan justeres hvis det trengs.",
    },
    // UiO clinic handbook: the patient's oral hygiene is the most important factor for the denture; instruction in mouth and denture hygiene
    { type: "lapp", lapp: { slag: "tips", tekst: "God munnhygiene er det aller viktigste for at en delprotese skal fungere godt over tid. Vi viser deg hvordan du holder tennene og protesen rene." } },
    {
      type: "tekst",
      id: "kontroll",
      tittel: "Hvorfor er kontroller viktig?",
      avsnitt: [
        // Tidende: more plaque; gum disease, decay and bone loss are possible risks
        "Plakk fester seg lettere rundt en delprotese. Det kan gi hull og tannkjøttsykdom i tennene rundt den.",
        // Tidende: often without symptoms, so regular follow-up matters
        "Ofte merker du ikke det selv. Derfor er det viktig å gå jevnlig til kontroll.",
      ],
      tegning: "lupe-klammer",
    },
  ],
  slutt: "Mangler du noen tenner? Bestill en time, så ser vi på valgene sammen.",
  kilder: [BKILDE.smlTannprotese, BKILDE.smlPlateprotese, BKILDE.smlImplantat, BKILDE.uioDelprotese, BKILDE.tidDelprotese],
};
