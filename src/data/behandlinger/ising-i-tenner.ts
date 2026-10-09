import { BKILDE } from "./kilder";
import type { Behandlingsside } from "./typer";

/* Sensitive teeth: the dentist's side. Every line checked on 8 October 2026
   against the sources at the bottom; the comments name the source behind
   each part. What you can do yourself is in the «Råd og tips» article,
   linked from the first part. */

export const isingITenner: Behandlingsside = {
  slug: "ising-i-tenner",
  navn: "Ising i tenner",
  // the clinic's own words (klinikk.ts)
  ingress: "Isner det i tennene når du drikker noe kaldt? Her ser du hvorfor det skjer, hva tannlegen ser etter, og hva som kan hjelpe.",
  tittelbilde: "lue",
  beskrivelse: "Ising i tennene hos tannlegen i Kongsvinger: hvorfor det iser, hva tannlegen ser etter, og hva som kan gjøres hos tannlegen.",
  deler: [
    {
      type: "tekst",
      id: "hvorfor",
      tittel: "Hvorfor iser det?",
      avsnitt: [
        // SML Tannsmerter: cold reaches the nerve through small canals from the surface to the inside of the tooth
        "Inne i tannen går det bitte små kanaler inn mot nerven. Når de ligger åpne, kan kulden nå helt inn.",
        // SML Tannsmerter: most common where the enamel is missing or the root is bare after the gum has drawn back; the clinic's text
        "Det skjer oftest der emaljen er slitt, eller der tannkjøttet har trukket seg tilbake, så roten er bar.",
      ],
      tegning: "bar-rot",
      lenke: { tekst: "Les hva du kan gjøre selv", slug: "det-iser-i-tennene" },
    },
    {
      type: "tegn",
      id: "ser-etter",
      tittel: "Hva ser tannlegen etter?",
      // Tidende 2012: before calling it sensitive teeth, decay, cracks, gingivitis, pulpitis and leaking fillings are ruled out
      intro: "Det kan ise av flere grunner. Derfor ser tannlegen først etter andre ting enn følsomme tenner:",
      punkter: [
        // Tidende 2012; SML Tannsmerter (a hole)
        { tekst: "Et hull i tannen.", tegning: "ising-hull" },
        // Tidende 2012 (infraksjoner)
        { tekst: "En sprekk i tannen.", tegning: "ising-sprekk" },
        // Tidende 2012 (defekte fyllinger), the clinic's text (en slitt fylling)
        { tekst: "En fylling som er slitt eller lekker.", tegning: "ising-fylling" },
        // Tidende 2012 (gingivitt), the clinic's text (tannkjøttsykdom)
        { tekst: "Betent tannkjøtt.", tegning: "ising-tannkjott" },
        // SML Tannsmerter: ising that lasts after the cold is gone can mean an inflamed nerve
        { tekst: "En betent nerve, særlig hvis det iser lenge etter at kulden er borte.", tegning: "ising-nerve" },
      ],
    },
    // Tidende 2012: bleaching gives ising for a shorter or longer while
    { type: "lapp", lapp: { slag: "visste", tekst: "Tannbleking kan også gi ising en stund." } },
    {
      type: "serie",
      id: "hjelpe",
      tittel: "Slik kan tannlegen hjelpe",
      ruter: [
        // Tidende 2012: register which teeth are sensitive
        { tegning: "snakke-ising", tekst: "Først snakker vi sammen om når og hvor det iser." },
        // Tidende 2012: brushing instruction, a softer brush and less force so the gum does not draw back
        { tegning: "myk-puss", tekst: "Tannlegen kan vise deg hvordan du pusser mykt, så tannkjøttet ikke trekker seg mer tilbake." },
        // Tidende 2012: special pastes and preparations for use at the clinic
        { tegning: "egne-midler", tekst: "Tannlegen kan bruke egne midler mot ising på de følsomme tennene." },
        // Tidende 2012: bonding can be used if needed
        { tegning: "tynt-lag", tekst: "Noen ganger dekkes et bart område med et tynt lag som tetter det.", mellom: true },
        // Tidende 2012 (rule out decay and leaking fillings), Helsenorge (a filling stops the hole from growing)
        { tegning: "ising-reparert", tekst: "Er det et hull eller en lekk fylling, må det repareres." },
      ],
    },
    // Tidende 2012 (anti-ising toothpaste works but must be used over time), SML Tennene (it helps in many cases)
    { type: "lapp", lapp: { slag: "tips", tekst: "Tannkrem mot ising hjelper mange, men den må brukes jevnlig før den virker." } },
  ],
  slutt: "Iser det i tennene? Bestill en time, så ser vi på det sammen.",
  kilder: [BKILDE.smlTannsmerter, BKILDE.smlTennene, BKILDE.tidIsing, BKILDE.hnHull],
};
