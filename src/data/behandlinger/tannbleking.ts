import { BKILDE } from "./kilder";
import type { Behandlingsside } from "./typer";

/* Whitening. Every line checked on 8 October 2026 against the sources at the
   bottom; the comments name the source behind each part. How the bleaching
   is done, and for how long, is left to the dentist: it differs from
   patient to patient. */

export const tannbleking: Behandlingsside = {
  slug: "tannbleking",
  navn: "Tannbleking",
  ingress: "Vil du ha hvitere tenner? Bleking hos tannlegen gjør tennene lysere. Her ser du hvordan det går for seg, og hva som er lurt å vite først.",
  tittelbilde: "bleking",
  beskrivelse: "Tannbleking hos tannlegen i Kongsvinger: hvordan bleking virker, hvorfor tennene blir mørkere, hvordan det foregår hos oss og hjemme, og hvem som kan bleke.",
  deler: [
    {
      type: "tekst",
      id: "hva",
      tittel: "Hvordan virker tannbleking?",
      avsnitt: [
        // SML Tannbleking: hydrogen peroxide; free radicals break down the large colour molecules
        "Ved bleking får tennene et middel med hydrogenperoksid. Det bryter ned fargestoffene i tannen, så den blir lysere.",
        // Mattilsynet: it doesn't remove the cause, it hides it
        "Bleking gjør bare overflaten lysere. Det fjerner ikke årsaken til at tennene ble mørke.",
      ],
      tegning: "peroksid",
    },
    {
      type: "tegn",
      id: "tegn",
      tittel: "Hvorfor blir tennene mørkere?",
      punkter: [
        // SML Tennene: enamel can be discoloured by food, drink, tobacco, caries and tartar
        { tekst: "Mat og drikke.", tegning: "glass" },
        { tekst: "Tobakk.", tegning: "ande" },
        { tekst: "Hull og tannstein.", tegning: "tannstein" },
        // SML Tennene: they get yellower with the years
        { tekst: "Alderen. Tennene blir gulere med årene.", tegning: "timeglass" },
      ],
      // SML Tennene (injury, bleeding inside the tooth), SML Tannbleking (a root-filled tooth can be bleached from inside, by a dentist)
      etter: "En tann kan også bli mørk etter en skade eller en rotfylling. Da kan den blekes innenfra hos tannlegen.",
    },
    // Mattilsynet: up to 0.1 % is not enough for a good effect
    { type: "lapp", lapp: { slag: "visste", tekst: "Blekemidler du kan kjøpe selv, har så lite virkestoff at de ikke virker særlig godt." } },
    {
      type: "serie",
      id: "slik",
      tittel: "Slik går det for seg",
      ruter: [
        // Mattilsynet: a dentist must examine the teeth and enamel first
        { tegning: "lupe-emalje", tekst: "Først undersøker tannlegen tennene og emaljen." },
        // Tidende 2026: an alginate impression and a bleaching tray
        { tegning: "avtrykk-smil", tekst: "Tannlegen tar avtrykk av tennene dine." },
        // Tidende 2026; the clinic's text: a tray that fits your teeth
        { tegning: "skinne", tekst: "Ut fra avtrykket lages en tynn skinne som passer akkurat dine tenner." },
        // how, and how long, is the dentist's call
        { tegning: "tube", tekst: "Blekegelen legges i skinnen. Tannlegen forteller deg hvordan og hvor lenge den skal brukes." },
        // SML Tannbleking
        { tegning: "hvit", tekst: "Tennene blir lysere. Hvor mye, er forskjellig fra person til person." },
      ],
    },
    {
      type: "tekst",
      id: "vondt",
      tittel: "Gjør det vondt?",
      avsnitt: [
        // Tidende 2026: ising and irritated gums during the treatment
        "Noen får litt ising i tennene eller sårt tannkjøtt mens de bleker. Hvor mye, og hvor lenge, er forskjellig fra person til person.",
      ],
      tegning: "bleke-sart",
    },
    {
      type: "tekst",
      id: "varer",
      tittel: "Hvor lenge varer det?",
      avsnitt: [
        // Tidende 2026: a gradual return in most cases
        "Det er forskjellig fra person til person. Hos de fleste blir tennene sakte litt mørkere igjen med tiden.",
      ],
      tegning: "hvit-falmer",
    },
    {
      type: "tekst",
      id: "regler",
      tittel: "Hvem kan bleke tennene?",
      avsnitt: [
        // Kosmetikkforskriften and Mattilsynet: strong products only sold to dentists; not under 18
        "Sterke blekemidler får bare selges til tannleger, og bleking skal ikke brukes på personer under 18 år.",
        // Mattilsynet: not at a beauty salon
        "Bleking hører hjemme hos tannlegen, ikke på en skjønnhetssalong.",
      ],
      tegning: "bleke-18",
    },
  ],
  slutt: "Vil du ha hvitere tenner? Bestill en time, så ser vi på tennene dine først.",
  kilder: [BKILDE.smlTannbleking, BKILDE.smlTennene, BKILDE.mtBleking, BKILDE.lovKosmetikk, BKILDE.tidBleking],
};
