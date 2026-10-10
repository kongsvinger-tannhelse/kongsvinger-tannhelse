import { BKILDE } from "./kilder";
import type { Behandlingsside } from "./typer";

/* A crown. Every line checked on 8 October 2026 against the sources at the
   bottom; the comments name the source behind each part. Nothing about
   anaesthesia, being sore afterwards, or how long a crown lasts: no source
   of the kind we use says it plainly. */

export const tannkrone: Behandlingsside = {
  slug: "tannkrone",
  navn: "Tannkrone",
  // the clinic's own words (klinikk.ts)
  ingress: "En tannkrone er en hette formet som en tann, som settes over en svekket tann. Den gir tannen styrke og form igjen.",
  hosOss: "Hos oss på Kongsvinger Tannhelse ser vi på om tannen trenger en krone, og forklarer valgene.",
  tittelbilde: "krone",
  blekk: "rubin",
  stripe: "kroner",
  beskrivelse: "Tannkrone hos tannlegen i Kongsvinger: hva en krone er, når du trenger en, hvordan den lages steg for steg, og hvordan du tar vare på den.",
  deler: [
    {
      type: "tekst",
      id: "hva",
      tittel: "Hva er en tannkrone?",
      avsnitt: [
        // Helsenorge: when too little is left to hold a filling, a crown, a cap set over the tooth
        "Når det er for lite igjen av tannen til å feste en fylling, kan den repareres med en krone. Kronen er en kappe som settes utenpå tannen.",
        // Helsenorge: most often metal, porcelain or both
        "Kronen lages oftest av metall, porselen, eller begge deler.",
      ],
      tegning: "krone-kappe",
    },
    {
      type: "tekst",
      id: "nar",
      tittel: "Når trenger jeg en krone?",
      avsnitt: [
        // Gjør kloke valg (Tannlegeforeningen): a crown only when a filling can't give good form, function and look; save tooth substance
        "En krone lages bare når en vanlig fylling ikke kan gi tannen god form, funksjon og et fint utseende. Det gjelder å spare så mye av tannen som mulig.",
        // SML Rotfylling: after a root filling, a filling or a crown
        "Etter en rotfylling får tannen enten en fylling eller en krone. Ofte holder det med en fylling.",
      ],
      tegning: "lite-igjen",
    },
    {
      type: "serie",
      id: "slik",
      tittel: "Slik går det for seg",
      ruter: [
        // UiO clinic handbook: take the shade before treatment starts
        { tegning: "farge-krone", tekst: "Først finner vi fargen, så den nye tanna passer med de andre." },
        // Helsenorge: the tooth must be ground to the right shape first
        { tegning: "stubb", tekst: "Tannen slipes til riktig form, så kronen får plass." },
        // SML Tannprotese (made after exact impressions), UiO (scanning)
        { tegning: "skanner", tekst: "Det tas avtrykk, eller tennene skannes, og kronen lages etter dem." },
        // UiO clinic handbook: a temporary crown, cemented with temporary cement
        { tegning: "provisorium", tekst: "Mens kronen lages, får du en midlertidig krone.", mellom: true },
        // SML Tannprotese: fixed for good with special cements
        { tegning: "krone-satt", tekst: "Til slutt limes kronen fast med en spesiell sement." },
      ],
    },
    // UiO: many crowns are designed from a scan and milled or printed by a machine
    { type: "lapp", lapp: { slag: "visste", tekst: "Mange kroner lages i dag av en maskin som freser eller printer dem ut, etter en skanning av tennene." } },
    {
      type: "tekst",
      id: "etterpa",
      tittel: "Hvordan tar jeg vare på en krone?",
      avsnitt: [
        // UiO clinic handbook: brushes, toothpicks, floss and interdental brushes adapted to the new crown
        "Rundt en krone må du holde like rent som rundt dine egne tenner, med tannbørste, tanntråd eller mellomromsbørster.",
      ],
      tegning: "krone-traad",
    },
    // SML Tannkrone: the crown is also the part of your own tooth that shows in the mouth
    { type: "lapp", lapp: { slag: "visste", tekst: "Krone er også navnet på den delen av din egen tann som synes i munnen, den som er dekket av emalje." } },
  ],
  slutt: "Er en av tennene dine svak eller ødelagt? Bestill en time, så ser vi på hva som passer best.",
  kilder: [BKILDE.hnHull, BKILDE.kvKrone, BKILDE.smlRotfylling, BKILDE.smlTannprotese, BKILDE.uioKrone, BKILDE.uioCad, BKILDE.smlTannkrone],
};
