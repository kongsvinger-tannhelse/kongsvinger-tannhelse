import { BKILDE } from "./kilder";
import type { Behandlingsside } from "./typer";

/* Toothache: the page for both «Tannsmerte» and «Tannverk» in the book (see
   sider.ts). Every line checked on 8 October 2026 against the sources at
   the bottom; the comments name the source behind each part. Only the
   dentist's side: what you can do yourself today is in the «Råd og tips»
   article, linked from the first part. */

export const tannverk: Behandlingsside = {
  slug: "tannverk",
  navn: "Tannverk",
  // the clinic's own words (klinikk.ts, Tannsmerte)
  ingress: "Har du vedvarende vondt i en tann, er det på tide å gå til tannlegen. Her ser du hva det kan komme av, og hvordan tannlegen finner årsaken.",
  tittelbilde: "klut",
  beskrivelse: "Tannverk og tannsmerter hos tannlegen i Kongsvinger: hva det kan komme av, hvordan tannlegen finner årsaken, hva behandlingen kan bli, og når det haster.",
  deler: [
    {
      type: "tekst",
      id: "hva",
      tittel: "Hva kan det komme av?",
      avsnitt: [
        // SML Tannsmerter: from the pulp, or from the tooth's attachment
        "Tannverk kommer som regel fra nerven inne i tannen, eller fra tannkjøttet og festet rundt den.",
        // NHI Førstehjelp ved tannpine (decay the most common cause), SML Tannsmerter (a crack, inflamed gum), the clinic's text (råte, sprekk, infeksjon)
        "Det vanligste er et hull i tannen. Det kan også være en sprekk, en infeksjon eller betent tannkjøtt.",
      ],
      tegning: "verk-to-steder",
      lenke: { tekst: "Les hva det kan være, og hva du kan gjøre i dag", slug: "vondt-i-tanna" },
    },
    {
      type: "serie",
      id: "slik",
      tittel: "Slik finner tannlegen årsaken",
      ruter: [
        // SML Tannrotbetennelse: the diagnosis rests on the history, an examination and an x-ray
        { tegning: "snakke-verk", tekst: "Først snakker vi sammen om hvordan det kjennes, og når det gjør vondt." },
        // SML Tannrotbetennelse (examination)
        { tegning: "lupe-verk", tekst: "Tannlegen ser på tannen og tannkjøttet rundt." },
        // NHI Pulpitt: the dentist as a rule takes x-rays; SML Tannrotbetennelse
        { tegning: "rontgen-verk", tekst: "Tannlegen tar som regel et røntgenbilde." },
        // SML Tannsmerter: the treatment depends on the cause
        { tegning: "plan-verk", tekst: "Så går tannlegen gjennom hva som er funnet, og hva som kan gjøres." },
      ],
    },
    // SML Tannrotbetennelse: the pressure can push the tooth out a little, so it stands higher than its neighbours
    { type: "lapp", lapp: { slag: "visste", tekst: "Er det betennelse ved roten, kan trykket skyve tannen litt ut. Da kan den kjennes litt høyere enn tennene ved siden av." } },
    {
      type: "tegn",
      id: "behandling",
      tittel: "Hva kan behandlingen bli?",
      intro: "Det kommer an på hva som er galt.",
      punkter: [
        // NHI Pulpitt: the decay removed and the tooth repaired with a filling
        { tekst: "Et hull kan repareres med en fylling.", tegning: "verk-fylling" },
        // SML Tannsmerter, SML Pulpitt, NHI Pulpitt: an inflamed or dead nerve is treated with a root filling
        { tekst: "Er nerven betent eller død, kan tannen trenge en rotfylling.", tegning: "verk-rot" },
        // NHI Pulpitt, SML Tannbyll: or the tooth is taken out
        { tekst: "Noen ganger må tannen trekkes.", tegning: "verk-trekk" },
        // SML Tannsmerter: pain from the gum; the treatment depends on the cause
        { tekst: "Kommer smerten fra tannkjøttet, er det tannkjøttet som må behandles.", tegning: "verk-tannkjott" },
      ],
    },
    {
      type: "tekst",
      id: "haster",
      tittel: "Når haster det?",
      avsnitt: [
        // SML Pulpitt (very painful, must be treated by a dentist at once), SML Tannsmerter (seldom goes away by itself)
        "Sterk, verkende tannpine går sjelden over av seg selv. Da bør du til tannlegen med en gang.",
        // NHI Førstehjelp ved tannpine: swelling, pain when biting, a bad taste and redness can be signs of an infection
        "Hevelse, vond smak i munnen eller at det gjør vondt å bite, kan være tegn på en infeksjon.",
        // the clinic's text (akutt)
        "Ring oss så tidlig på dagen som mulig.",
      ],
      tegning: "telefon-morgen",
    },
    // SML Tannsmerter (when the nerve dies the pain lessens, but the tooth can turn tender), SML Tannrotbetennelse
    { type: "lapp", lapp: { slag: "tips", tekst: "Har det sluttet å gjøre vondt før timen din? Kom likevel. Når nerven dør, kan smerten bli mindre, selv om betennelsen er der." } },
  ],
  slutt: "Har du vondt i en tann? Ring oss, så ser vi på den.",
  kilder: [BKILDE.smlTannsmerter, BKILDE.smlPulpitt, BKILDE.smlTannrotbetennelse, BKILDE.smlTannbyll, BKILDE.nhiPulpitt, BKILDE.nhiTannpine],
};
