import { BKILDE } from "./kilder";
import type { Behandlingsside } from "./typer";

/* A dental implant. Every line checked on 8 October 2026 against the
   sources at the bottom; the comments name the source behind each part. The
   steps are the university hospital's (UNN), told in general: how it is
   planned, and how long it takes, differs from patient to patient. */

export const tannimplantat: Behandlingsside = {
  slug: "tannimplantat",
  navn: "Tannimplantat",
  // the clinic's own words (klinikk.ts)
  ingress: "Et tannimplantat er en liten skrue i kjevebenet som vokser fast og bærer en ny tann. Her ser du hvordan det går for seg, steg for steg.",
  tittelbilde: "implantat",
  beskrivelse: "Tannimplantat hos tannlegen i Kongsvinger: hva et implantat er, hvem det passer for, hvordan det settes inn steg for steg, og hvordan du tar vare på det.",
  deler: [
    {
      type: "tekst",
      id: "hva",
      tittel: "Hva er et tannimplantat?",
      avsnitt: [
        // SML Tannimplantat (metal screws that replace roots), UNN (titanium, grows into the bone)
        "Et implantat er en liten skrue av titan som erstatter roten til en tann som mangler. Skruen gror fast i beinet.",
        // UNN: fixture, abutment and crown; SML Oral implantologi: a crown fixed to the implant
        "Oppå skruen festes en ny tann, en krone.",
      ],
      tegning: "implantat-deler",
    },
    {
      type: "tekst",
      id: "passer",
      tittel: "Passer et implantat for meg?",
      avsnitt: [
        // SML Oral implantologi (to replace lost teeth), UNN (too little bone and the screw won't hold)
        "Et implantat kan erstatte en tann som mangler, men det må være nok bein i kjeven til at skruen kan feste seg.",
        // UNN: after a tooth is lost, the bone recedes over time
        "Etter at en tann er tapt, trekker beinet seg litt tilbake over tid.",
        // SML Tannskade (a prosthesis, bridge or implant), SML Broprotese (anchored to the teeth beside)
        "Andre måter å erstatte en tann på er en bro, som festes til tennene ved siden av, eller en protese.",
      ],
      tegning: "bein-nok",
    },
    {
      type: "serie",
      id: "slik",
      tittel: "Slik går det for seg",
      ruter: [
        // UNN: the bone is examined first
        { tegning: "rontgen-luke", tekst: "Først undersøker tannlegen beinet i kjeven." },
        // UNN: usually under local anaesthesia
        { tegning: "rolig-luke", tekst: "Inngrepet gjøres som regel i lokalbedøvelse." },
        // UNN: the surgeon drills away a little bone to make room for the screw
        { tegning: "implantat-skrue", tekst: "Tannlegen lager plass i beinet og setter inn skruen." },
        // UNN: the screw needs months to grow into the bone (osseointegrasjon, SML)
        { tegning: "implantat-gror", tekst: "Så må skruen gro fast i beinet. Det tar vanligvis noen måneder." },
        // UNN: an impression, and the shape and colour decided
        { tegning: "implantat-farge", tekst: "Når skruen sitter godt, tar tannlegen avtrykk, og dere finner form og farge på den nye tanna sammen." },
        // SML Oral implantologi: a crown fixed to the implant
        { tegning: "implantat-krone", tekst: "Til slutt festes den nye tanna på skruen." },
      ],
      // UNN: the times vary
      etter: "Hvordan behandlingen legges opp, og hvor lang tid den tar, er forskjellig fra pasient til pasient.",
    },
    // UNN: titanium is readily accepted by the body
    { type: "lapp", lapp: { slag: "visste", tekst: "Titan, som implantatet er laget av, blir lett godtatt av kroppen." } },
    {
      type: "tekst",
      id: "vondt",
      tittel: "Gjør det vondt?",
      avsnitt: [
        // UNN: local anaesthesia
        "Skruen settes inn i lokalbedøvelse.",
        // UNN: swelling and pain can follow
        "Etterpå kan det bli litt hovent og vondt. Hvor mye, er forskjellig fra person til person, og tannlegen forteller deg hva du bør tenke på.",
      ],
      tegning: "plaster-kinn",
    },
    {
      type: "tekst",
      id: "stell",
      tittel: "Hvordan tar jeg vare på et implantat?",
      avsnitt: [
        // UNN: more effort and time every day than ordinary teeth
        "Et implantat må holdes like rent som dine egne tenner, og det kan ta litt mer tid. Tannlegen gir deg råd om hvordan du best gjør det.",
        // UNN: smoking slows healing and raises the risk of bone loss
        "Røyking gjør at det gror dårligere, og øker faren for at beinet rundt skruen forsvinner.",
        // UNN: implants can get the same problem as teeth: periimplantitt
        "Også et implantat kan få betennelse i tannkjøttet rundt seg. Det kalles periimplantitt.",
      ],
      tegning: "implantat-borste",
    },
  ],
  slutt: "Mangler du en tann? Bestill en time, så ser vi på hva som passer for deg.",
  kilder: [
    BKILDE.smlImplantat,
    BKILDE.smlOralImplantologi,
    BKILDE.unnImplantat,
    BKILDE.smlTannskade,
    BKILDE.smlBroprotese,
  ],
};
