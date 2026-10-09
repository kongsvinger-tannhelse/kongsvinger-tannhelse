import { BKILDE } from "./kilder";
import type { Behandlingsside } from "./typer";

/* Bad breath. Every line checked on 8 October 2026 against the sources at
   the bottom; the comments name the source behind each part. NHI.no only
   paraphrased. */

export const darligAnde: Behandlingsside = {
  slug: "darlig-ande",
  navn: "Dårlig ånde",
  // the clinic's own words (klinikk.ts)
  ingress: "Dårlig ånde er svært vanlig, og som regel kan du gjøre mye med det selv. Her ser du hvor den kommer fra, og hva tannlegen kan hjelpe med.",
  tittelbilde: "klesklype",
  beskrivelse: "Dårlig ånde hos tannlegen i Kongsvinger: hvor den kommer fra, hva den kan komme av, hva du kan gjøre selv, og hva tannlegen kan hjelpe med.",
  deler: [
    {
      type: "tekst",
      id: "hvor",
      tittel: "Hvor kommer dårlig ånde fra?",
      avsnitt: [
        // SML Dårlig ånde: in about 90 per cent of cases the cause is in the mouth
        "I omtrent ni av ti tilfeller kommer dårlig ånde fra munnen.",
        // SML Dårlig ånde (bacteria break down proteins and release sulphur compounds), NHI Dårlig ånde (dead cells and food)
        "Bakterier på tennene og på tunga bryter ned rester av mat og celler. Da lages det gasser som lukter vondt.",
      ],
      tegning: "munn-ande",
    },
    // NHI Dårlig ånde: between a quarter and a third have bad breath, many only for periods
    { type: "lapp", lapp: { slag: "visste", tekst: "Mellom en firedel og en tredel av oss har dårlig ånde, men for mange gjelder det bare i perioder." } },
    {
      type: "tegn",
      id: "arsaker",
      tittel: "Hva kan det komme av?",
      punkter: [
        // NHI Dårlig ånde (tongue coating), SML Dårlig ånde (bacteria on the tongue)
        { tekst: "Belegg bakerst på tunga.", tegning: "belegg-tunge" },
        // NHI Dårlig ånde: poor cleaning between the teeth
        { tekst: "Matrester og plakk mellom tennene.", tegning: "mat-mellom" },
        // SML Dårlig ånde, NHI Dårlig ånde: decay and gum disease
        { tekst: "Hull i tennene eller betent tannkjøtt.", tegning: "hull-ande" },
        // NHI Dårlig ånde (dry mouth in sleep gives morning breath), SML Dårlig ånde (dry mouth)
        { tekst: "En tørr munn, for eksempel om morgenen.", tegning: "sove-apen" },
        // NHI Dårlig ånde: onion, garlic and spices
        { tekst: "Mat som løk og hvitløk.", tegning: "lok" },
      ],
      // SML Dårlig ånde (nose, throat, lungs, stomach and other illness), NHI Dårlig ånde (see a doctor)
      etter: "Noen ganger kommer lukten fra nesen, halsen eller andre steder i kroppen. Da kan det være lurt å gå til legen.",
    },
    {
      type: "tegn",
      id: "selv",
      tittel: "Hva kan jeg gjøre selv?",
      punkter: [
        // SML Dårlig ånde (clean the teeth), NHI Dårlig ånde (brush, floss, small brushes)
        { tekst: "Puss tennene, og rens mellom dem hver dag.", tegning: "puss-traad" },
        // SML Dårlig ånde (clean the tongue), NHI Dårlig ånde (far back)
        { tekst: "Rens tunga, særlig langt bak.", tegning: "tungeskrape" },
        // SML Dårlig ånde, NHI Dårlig ånde: drink enough water
        { tekst: "Drikk nok vann.", tegning: "vannflaske" },
      ],
    },
    // NHI Dårlig ånde: a tongue scraper rather than the toothbrush
    { type: "lapp", lapp: { slag: "tips", tekst: "En tungeskrape tar ofte belegget på tunga bedre enn tannbørsten." } },
    {
      type: "serie",
      id: "hjelpe",
      tittel: "Slik kan tannlegen hjelpe",
      ruter: [
        // SML Dårlig ånde: the dentist deals with the mouth's part
        { tegning: "snakke-ande", tekst: "Først snakker vi sammen, og tannlegen ser på tennene, tannkjøttet og tunga." },
        // SML Dårlig ånde (decay, gum disease), SML Tannstein (tartar can give bad breath)
        { tegning: "lupe-ande", tekst: "Tannlegen ser etter hull, tannstein og betent tannkjøtt." },
        // SML Tannstein: tartar is removed by a dentist or dental hygienist
        { tegning: "rens-ande", tekst: "Tannstein kan fjernes med en tannrens." },
        // NHI Dårlig ånde: see a doctor if it may come from the tonsils, the sinuses or elsewhere
        { tegning: "lege", tekst: "Kommer lukten ikke fra munnen, kan det være lurt å gå til legen.", mellom: true },
      ],
    },
  ],
  slutt: "Lurer du på hvor det kommer fra? Bestill en time, så ser vi på det sammen.",
  kilder: [BKILDE.smlDarligAnde, BKILDE.nhiDarligAnde, BKILDE.smlTannstein],
};
