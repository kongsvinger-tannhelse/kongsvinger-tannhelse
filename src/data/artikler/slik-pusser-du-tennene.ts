import { KILDE } from "./kilder";
import type { Artikkel } from "./typer";

/* Brushing. Every line checked on 8 October 2026 against the sources at
   the bottom; the comments name the source behind each part. */

export const slikPusserDu: Artikkel = {
  slug: "slik-pusser-du-tennene",
  tittel: "Slik pusser du tennene",
  gruppe: "hverdag",
  linje: "Hvor ofte, hvordan, hva du gjør mellom tennene, og hvordan du hjelper barna.",
  kort: "Slik pusser du",
  ingress: "Å pusse tennene er noe av det viktigste du kan gjøre for munnen din. Her ser du hvordan du gjør det riktig, og hvordan du hjelper barna.",
  beskrivelse: "Slik pusser du tennene riktig: hvor ofte, hvordan, hva du gjør mellom tennene, og hvordan du hjelper barna.",
  tegning: "skraa",
  deler: [
    {
      type: "tekst",
      id: "to-ganger",
      tittel: "To ganger om dagen",
      avsnitt: [
        // Helsenorge: twice a day with fluoride toothpaste, about two minutes
        "Puss tennene om morgenen og om kvelden, i omtrent to minutter hver gang. Bruk tannkrem med fluor.",
        // NHI Tannhelse hos barn (the brushing just before bed matters most), NHI (less saliva at night), SML (saliva neutralises acid)
        "Pussen rett før du legger deg er ekstra viktig. Om natten lager munnen mindre spytt, og spyttet er med på å beskytte tennene.",
      ],
      tegning: "klokke",
    },
    // Helsenorge: about two minutes. (Was after «Mellom tennene»; moved here, beside «to minutter», which it is about.)
    { type: "lapp", lapp: { slag: "triks", tekst: "Ta tiden med klokka på mobilen. To minutter er lenger enn mange tror.", feste: "omtrent to minutter hver gang" } },
    {
      type: "liste",
      id: "slik",
      tittel: "Slik gjør du",
      intro: "Fire ting å huske hver gang.",
      punkter: [
        // Helsenorge: at least 1450 ppm fluoride for older children and adults; a pea-sized amount for children from 3
        { id: "fluor", navn: "1. Tannkrem med fluor", tekst: "Voksne og større barn bør bruke tannkrem med 1450 ppm fluor. Det står på tuben.", tegning: "tube" },
        // Helsedirektoratet: soft or extra soft brush, light pressure
        { id: "myk", navn: "2. Myk børste, lett trykk", tekst: "Bruk en myk tannbørste. Du trenger ikke trykke hardt for å få tennene rene.", tegning: "borste" },
        // NHI Tannhelse hos barn (the edge between gum and tooth), SML Gingivitt
        { id: "kanten", navn: "3. Langs tannkjøttet", tekst: "Pass godt på kanten der tann og tannkjøtt møtes. Der samler bakteriene seg.", tegning: "skraa" },
        // Tannlegeforeningen, Helsedirektoratet: do not rinse after brushing
        { id: "skyll", navn: "4. Spytt, ikke skyll", tekst: "Spytt ut tannkremen, men ikke skyll med vann. Da virker fluoren lenger.", tegning: "glass" },
      ],
    },
    // SML Remineralisering: fluoride helps an early, beginning hole remineralise.
    // (Was after «To ganger om dagen»; moved one section down, beside the fluoride item, so the two-minute note can sit by «to minutter».)
    { type: "lapp", lapp: { slag: "visste", tekst: "Fluor gjør emaljen sterkere, og kan hjelpe et lite, begynnende hull å bli friskt igjen.", feste: "tannkrem med 1450 ppm fluor" } },
    // NHI Tannhelse hos barn: sugary food or drink after the evening brushing is especially discouraged.
    // Not pinned: it says the same as the last tip under «Barn og pussing», so it stays between the sections.
    { type: "lapp", lapp: { slag: "tips", tekst: "Ikke spis eller drikk noe søtt etter kveldspussen. Vann er fint." } },
    {
      type: "tekst",
      id: "mellom",
      tittel: "Mellom tennene",
      avsnitt: [
        // Helsenorge (some need floss for the plaque between the teeth), Tannlegeforeningen (toothpicks, floss, interdental brushes)
        "Tannbørsten når ikke helt inn mellom tennene. Der kan det sitte bakteriebelegg.",
        // Helsedirektoratet: chosen by individual need
        "Mange trenger å rengjøre mellom tennene med tanntråd, tannstikker eller mellomromsbørster. Spør tannlegen eller tannpleieren hva som passer for deg.",
      ],
      tegning: "traad",
    },
    {
      type: "tips",
      id: "barn",
      tittel: "Barn og pussing",
      punkter: [
        // Helsenorge Tannstell hos barn
        { tekst: "Puss barnets tenner med fluortannkrem morgen og kveld, fra den første tanna kommer.", tegning: "tube" },
        { tekst: "Under tre år holder det med en knapt synlig mengde tannkrem. Fra tre år: en klatt like stor som en ert.", tegning: "tube" },
        { tekst: "Hjelp barnet å pusse til det er rundt ti år.", tegning: "haand" },
        // Helsenorge (water as the everyday drink), NHI (nothing sweet after the evening brushing)
        { tekst: "Etter kveldspussen: ikke noe søtt. Vann er det beste å drikke.", tegning: "glass" },
      ],
    },
    // NHI Tannhelse hos barn: teeth let the child chew and form words, and affect how the jaws grow
    { type: "lapp", lapp: { slag: "visste", tekst: "Melketennene er viktige. Barnet trenger dem for å tygge og snakke, og de påvirker hvordan kjevene vokser.", feste: "fra den første tanna kommer" } },
  ],
  sjekk: {
    tittel: "Hva synes du er vanskeligst?",
    intro: "Trykk på det som passer best, så får du et lite triks.",
    hjelp: "Trykk på det som passer best.",
    merke: "Prøv dette",
    forbehold: "Lurer du på noe mer? Spør oss neste gang du er her.",
    valg: [
      {
        id: "huske",
        svar: "Å huske å pusse to ganger",
        tegning: "klokke",
        overskrift: "Gjør det til en vane",
        forklaring: "Legg tannbørsten der du ser den. Puss alltid på samme tid, om morgenen og rett før du legger deg.",
      },
      {
        id: "lenge",
        svar: "Å pusse lenge nok",
        tegning: "klokke",
        overskrift: "Ta tiden",
        forklaring: "Bruk klokka på mobilen, eller en sang som varer i omtrent to minutter.",
      },
      {
        // Tannlegeforeningen, Helsedirektoratet
        id: "traad",
        svar: "Å rengjøre mellom tennene",
        tegning: "traad",
        overskrift: "Finn det som passer deg",
        forklaring: "Det finnes flere måter: tanntråd, tannstikker og mellomromsbørster. Spør tannlegen eller tannpleieren hva som passer mellom dine tenner.",
      },
      {
        // Helsenorge: parents help until about ten
        id: "barn",
        svar: "Å få barna til å pusse",
        tegning: "hjerte",
        overskrift: "Gjør det sammen",
        forklaring: "Puss dine egne tenner samtidig. La barnet pusse først, og ta en runde etterpå. Barn trenger hjelp til de er rundt ti år.",
      },
      {
        // SML Gingivitt
        id: "blor",
        svar: "Tannkjøttet blør når jeg pusser",
        tegning: "plakk",
        overskrift: "Fortsett å pusse",
        forklaring: "Det betyr ofte at tannkjøttet er betent. Puss forsiktig der det blør. Når bakteriene blir borte, går betennelsen over.",
        lenke: { tekst: "Les om blødende tannkjøtt", slug: "tannkjottet-blor" },
      },
    ],
  },
  slutt: "Vil du ha en sjekk av tennene og tannkjøttet? Bestill en time, så tar vi en titt.",
  kilder: [KILDE.hnKaries, KILDE.hnBarn, KILDE.hdirVoksne, KILDE.ntfRad, KILDE.nhiBarn, KILDE.nhiFrokost, KILDE.smlRemineralisering, KILDE.smlGingivitt],
};
