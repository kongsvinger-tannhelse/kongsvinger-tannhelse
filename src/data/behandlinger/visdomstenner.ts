import { BKILDE } from "./kilder";
import type { Behandlingsside } from "./typer";

/* Wisdom teeth. Every line checked on 8 October 2026 against the sources at
   the bottom; the comments name the source behind each part. No advice for
   the first days and no word on who removes which tooth: that differs from
   patient to patient, so the page points to the dentist. */

export const visdomstenner: Behandlingsside = {
  slug: "visdomstenner",
  navn: "Visdomstenner",
  ingress: "Visdomstennene er de bakerste tennene i munnen, og ofte er det for lite plass til dem. Her ser du når de bør fjernes, og hvordan det går for seg.",
  tittelbilde: "ugle",
  lesetid: "3 minutter å lese",
  beskrivelse: "Visdomstenner hos tannlegen i Kongsvinger: når visdomstanna blir et problem, hvordan den fjernes steg for steg, og hva du gjør de første dagene etterpå.",
  deler: [
    {
      type: "tekst",
      id: "hva",
      tittel: "Hva er visdomstenner?",
      avsnitt: [
        // SML Visdomstennene: the rearmost (eighth) tooth in each half of the jaw
        "Visdomstennene er de bakerste tennene, den åttende tanna i hver halvdel av kjeven. Vanligvis er det fire.",
        // SML Visdomstennene: they come through at 18 to 30
        "De kommer som regel fram når du er mellom 18 og 30 år.",
      ],
      tegning: "atte",
    },
    // SML Visdomstennene: they come at an age when one expects some sense, if not exactly «wisdom»
    { type: "lapp", lapp: { slag: "visste", tekst: "Visdomstennene har fått navnet fordi de kommer i en alder da vi ventes å ha fått litt fornuft." } },
    {
      type: "tegn",
      id: "tegn",
      tittel: "Når blir visdomstanna et problem?",
      // NHI Innkilt visdomstann: too little room in the jaw, or an abnormal position
      intro: "Ofte er det for lite plass i kjeven, eller tanna ligger skjevt.",
      punkter: [
        // NHI Perikoronitt: inflammation of the gum round the crown of a partly erupted tooth
        { tekst: "Tannkjøttet over tanna blir betent, hovent og vondt.", tegning: "tannkjott" },
        // SML Visdomstennene: crowded and hard to clean, so caries comes easily
        { tekst: "Tanna står trangt og er vanskelig å holde ren, så den lett får hull.", tegning: "hull" },
        // St. Olavs: it can damage the tooth in front
        { tekst: "Den presser mot tanna foran og kan skade den.", tegning: "visdom" },
      ],
      // NHI Innkilt visdomstann; Helse Bergen: no reason to remove healthy wisdom teeth
      etter: "Er visdomstanna frisk og gir deg ingen plager, er det ingen grunn til å fjerne den.",
    },
    {
      type: "serie",
      id: "slik",
      tittel: "Slik fjernes en visdomstann",
      ruter: [
        // NHI Innkilt visdomstann, St. Olavs: an x-ray first
        { tegning: "rontgen-visdom", tekst: "Ofte tas det først et røntgenbilde, så tannlegen ser hvordan tanna ligger." },
        // St. Olavs: ordinary dental anaesthesia
        { tegning: "rolig-visdom", tekst: "Tanna blir bedøvet før den tas ut." },
        // St. Olavs: the gum is folded aside, a little bone is removed, the tooth divided if needed
        { tegning: "trekk-deler", tekst: "Tannkjøttet brettes til side, og tanna tas ut, noen ganger i flere biter." },
        // St. Olavs: usually a couple of stitches
        { tegning: "sting", tekst: "Ofte syr vi et par sting.", mellom: true },
        // St. Olavs: the patient gets advice for afterwards
        { tegning: "snakke-dager", tekst: "Til slutt forteller tannlegen deg hva du bør tenke på de første dagene." },
      ],
      // St. Olavs: ordinary wisdom teeth are removed by the patient's own dentist; others are referred
      etter: "Vanlige visdomstenner fjernes hos tannlegen. Ligger tanna vanskelig til, kan det være aktuelt å bli henvist til en spesialist.",
    },
    {
      type: "tekst",
      id: "vondt",
      tittel: "Gjør det vondt?",
      avsnitt: [
        // St. Olavs (local anaesthesia), NHI Innkilt visdomstann (pain and swelling after are usual)
        "Mens tanna tas ut, er den bedøvet. Etterpå er det vanlig å bli litt øm og hoven en stund.",
        "Hvor mye, og hvor lenge, er forskjellig fra person til person.",
      ],
      tegning: "hoven-kinn",
    },
    {
      type: "tekst",
      id: "etterpa",
      tittel: "Hva skjer etterpå?",
      avsnitt: [
        // St. Olavs: advice for the first days (food, brushing, smoking)
        "Tannlegen gir deg råd om hva du bør tenke på de første dagene, for eksempel om mat, tannpuss og røyking. Rådene kan være litt forskjellige fra person til person.",
        "Lurer du på noe, eller blir det verre i stedet for bedre, ring oss.",
      ],
      tegning: "kompress",
    },
    // NHI Innkilt visdomstann: healing is usually better, and the risk lower, in younger people
    { type: "lapp", lapp: { slag: "visste", tekst: "Hos unge gror det som regel bedre etter at en visdomstann er fjernet, og faren for plager er mindre." } },
  ],
  slutt: "Plager visdomstanna deg? Bestill en time, så ser vi på den.",
  kilder: [BKILDE.smlVisdom, BKILDE.nhiVisdom, BKILDE.nhiPerikoronitt, BKILDE.stoVisdom, BKILDE.hbVisdom],
};
