import { BKILDE } from "./kilder";
import type { Behandlingsside } from "./typer";

/* Wisdom teeth. Every line checked on 8 October 2026 against the sources at
   the bottom; the comments name the source behind each part. Where the
   hospitals give different advice for the first days, this page follows St.
   Olavs hospital throughout. «Vi fjerner visdomstenner selv» is the clinic's
   own word (2026-10-08). */

export const visdomstenner: Behandlingsside = {
  slug: "visdomstenner",
  navn: "Visdomstenner",
  ingress: "Visdomstennene er de bakerste tennene i munnen, og ofte er det for lite plass til dem. Her ser du når de bør fjernes, og hvordan det går for seg.",
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
      tegning: "visdom",
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
        { tegning: "rontgen", tekst: "Først tar vi et røntgenbilde, så vi ser hvordan tanna ligger." },
        // St. Olavs: ordinary dental anaesthesia; you feel pressure, not pain
        { tegning: "roligtann", tekst: "Du får vanlig tannlegebedøvelse. Du kjenner trykk, men ikke smerte." },
        // St. Olavs: the gum is folded aside, a little bone is removed, the tooth divided if needed
        { tegning: "trekk", tekst: "Tannkjøttet brettes til side, og tanna tas ut, noen ganger i flere biter." },
        // St. Olavs: usually a couple of stitches
        { tegning: "sting", tekst: "Ofte syr vi et par sting.", mellom: true },
        // St. Olavs: if it bleeds, bite on gauze for 30 minutes
        { tegning: "kompress", tekst: "Blør det, biter du på en kompress i en halvtime." },
      ],
      // the clinic's own word (2026-10-08)
      etter: "Hos oss fjerner vi visdomstennene selv.",
    },
    {
      type: "tekst",
      id: "vondt",
      tittel: "Gjør det vondt?",
      avsnitt: [
        // St. Olavs (local anaesthesia), NHI Innkilt visdomstann (almost always pain and swelling after)
        "Mens tanna tas ut, er den bedøvet. Etterpå blir det nesten alltid litt vondt og hovent.",
        // Helse Bergen: swelling peaks after 2–3 days and is usually gone after about a week
        "Hevelsen er som regel størst etter to til tre dager, og går vanligvis over etter omtrent en uke.",
      ],
      tegning: "hevelse",
    },
    {
      type: "tekst",
      id: "etterpa",
      tittel: "Hva gjør jeg de første dagene?",
      avsnitt: [
        // St. Olavs
        "Ikke spis, drikk eller skyll munnen de første to til tre timene.",
        // St. Olavs: an ice pack on the skin; painkillers as the leaflet says
        "Legg gjerne en ispose mot kinnet, og ta smertestillende slik det står i pakningsvedlegget.",
        // St. Olavs: soft food, not too wide open, no smoking the first days, brush but avoid the wound
        "Spis myk mat, ikke gap for mye, og ikke røyk de første dagene. Puss tennene som vanlig, men la såret være i fred.",
        // St. Olavs: the wound heals in one to two weeks; great pain towards the ear, get in touch
        "Såret gror vanligvis på én til to uker. Får du sterke smerter som stråler opp mot øret, ring oss.",
      ],
      tegning: "tablett",
    },
    // NHI Innkilt visdomstann: healing is usually better, and the risk lower, in younger people
    { type: "lapp", lapp: { slag: "visste", tekst: "Hos unge gror det som regel bedre etter at en visdomstann er fjernet, og faren for plager er mindre." } },
    {
      type: "pris",
      id: "pris",
      sporsmal: "Hva koster det å fjerne en visdomstann?",
      tekst: "Ring oss, så får du vite hva det vil koste.",
      // Helfo Tilstander: adults pay as a rule; no. 5 sykdommer og anomalier i munn og kjeve
      helfo: "Som hovedregel betaler voksne selv. Ved noen sykdommer i munn og kjeve kan Helfo dekke en del. Det er tannlegen som vurderer om du har rett.",
      tegning: "regning",
    },
  ],
  slutt: "Plager visdomstanna deg? Bestill en time, så ser vi på den.",
  kilder: [BKILDE.smlVisdom, BKILDE.nhiVisdom, BKILDE.nhiPerikoronitt, BKILDE.stoVisdom, BKILDE.hbVisdom, BKILDE.helfoTilstander],
};
