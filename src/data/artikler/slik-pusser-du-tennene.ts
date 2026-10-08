import type { Artikkel } from "./typer";

/* Brushing: twice a day for two minutes, how, between the teeth, and
   children. The check at the end asks what you find hardest. */

export const slikPusserDu: Artikkel = {
  slug: "slik-pusser-du-tennene",
  tittel: "Slik pusser du tennene",
  kort: "Slik pusser du",
  ingress: "Å pusse tennene er det beste du kan gjøre for munnen din. Det tar bare fire minutter om dagen. Her ser du hvordan du gjør det riktig.",
  lesetid: "3 minutter å lese",
  beskrivelse: "Slik pusser du tennene riktig: hvor lenge, hvordan, hva du gjør mellom tennene, og hvordan du hjelper barna.",
  tegning: "skraa",
  deler: [
    {
      type: "tekst",
      id: "to-ganger",
      tittel: "To ganger, to minutter",
      avsnitt: [
        "Puss tennene om morgenen og om kvelden, i to minutter hver gang.",
        "Kveldspussen er den viktigste. Om natten lager munnen mindre spytt, så da trenger tennene fluoren ekstra godt.",
      ],
      tegning: "klokke",
    },
    { type: "lapp", lapp: { slag: "visste", tekst: "Fluor gjør emaljen sterkere, og kan hjelpe et lite, begynnende hull å bli friskt igjen." } },
    {
      type: "liste",
      id: "slik",
      tittel: "Slik gjør du",
      intro: "Gjør det i denne rekkefølgen, så glemmer du ingen tenner.",
      punkter: [
        { id: "ert", navn: "1. En ert med tannkrem", tekst: "Bruk tannkrem med fluor. En klatt like stor som en ert er nok.", tegning: "tube" },
        { id: "skraa", navn: "2. Børsten på skrå", tekst: "Hold børsten litt på skrå mot tannkjøttet. Puss med små, rolige bevegelser.", tegning: "skraa" },
        { id: "sider", navn: "3. Alle sider", tekst: "Puss utsiden, innsiden og toppen av hver tann. Innsiden blir ofte glemt.", tegning: "allesider" },
        { id: "mykt", navn: "4. Mykt, ikke hardt", tekst: "Du trenger ikke trykke. Mykt og grundig er bedre enn hardt og fort.", tegning: "borste" },
      ],
    },
    { type: "lapp", lapp: { slag: "tips", tekst: "Spytt ut tannkremen etter pussing, men ikke skyll med vann. Da blir fluoren igjen på tennene og beskytter dem lenger." } },
    {
      type: "tekst",
      id: "mellom",
      tittel: "Mellom tennene",
      avsnitt: [
        "Tannbørsten når ikke inn mellom tennene. Der gjemmer det seg mat og bakterier.",
        "Bruk tanntråd eller mellomromsbørster én gang om dagen, gjerne om kvelden.",
      ],
      tegning: "traad",
    },
    { type: "lapp", lapp: { slag: "triks", tekst: "Del munnen i fire deler. Puss hver del i omtrent et halvt minutt, så er du ferdig på to minutter." } },
    {
      type: "tips",
      id: "barn",
      tittel: "Barn og pussing",
      punkter: [
        { tekst: "Bruk tannkrem med fluor fra den første tanna kommer.", tegning: "tube" },
        { tekst: "Hjelp barnet å pusse til det er rundt ti år. Før det klarer de ikke alt selv.", tegning: "haand" },
        { tekst: "Gjør det til en vane: alltid etter frokost, og rett før leggetid.", tegning: "klokke" },
        { tekst: "Etter kveldspussen er det bare vann som gjelder.", tegning: "glass" },
      ],
    },
    { type: "lapp", lapp: { slag: "visste", tekst: "Melketennene er viktige. De holder plass til de voksne tennene som kommer etter." } },
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
        overskrift: "Knytt det til noe du alltid gjør",
        forklaring: "Legg tannbørsten der du ser den. Puss alltid rett etter frokost, og rett før du legger deg.",
      },
      {
        id: "lenge",
        svar: "Å pusse lenge nok",
        tegning: "klokke",
        overskrift: "Ta tiden",
        forklaring: "Bruk klokka på mobilen, eller en sang som varer i omtrent to minutter.",
      },
      {
        id: "traad",
        svar: "Å bruke tanntråd",
        tegning: "traad",
        overskrift: "Prøv mellomromsbørster",
        forklaring: "Mange synes de er lettere enn tanntråd. Spør oss hvilken størrelse som passer deg.",
      },
      {
        id: "barn",
        svar: "Å få barna til å pusse",
        tegning: "hjerte",
        overskrift: "Gjør det sammen",
        forklaring: "Puss dine egne tenner samtidig, og la barnet pusse først. Så tar du en runde etterpå.",
      },
      {
        id: "blor",
        svar: "Tannkjøttet blør når jeg pusser",
        tegning: "plakk",
        overskrift: "Fortsett å pusse",
        forklaring: "Det betyr ofte at tannkjøttet er irritert. Puss forsiktig der det blør, så blir det som regel bedre på en uke eller to.",
        lenke: { tekst: "Les om blødende tannkjøtt", slug: "tannkjottet-blor" },
      },
    ],
  },
  slutt: "Vil du ha en sjekk av tennene og tannkjøttet? Bestill en time, så tar vi en titt.",
};
