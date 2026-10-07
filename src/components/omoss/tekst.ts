import { klinikk, klinikkbilder } from "@/data/klinikk";

/* The words on the «Om oss» page. Plain and
   short, with the words people search for (tannlege i Kongsvinger,
   tannpleier, tannklinikk, Fjellgata) in ordinary sentences. Nothing here
   that the old site doesn't say: no years, no education, no promises. */

const { adresse } = klinikk;

export const TITTEL = "Velkommen til Kongsvinger Tannhelse";

export const INGRESS = `Vi er en tannklinikk midt i Kongsvinger, i ${adresse.gate}. Hos oss er alle velkomne.`;

export const AVSNITT = [
  "Her jobber tannlegene Per Hafthun og Umer Zia og tannpleier Eba Wasty.",
  "Hos oss møter du et dedikert team som brenner for å skape gode opplevelser og varige resultater. Vi kombinerer moderne teknologi med varme smil, slik at du kan føle deg trygg i stolen.",
  "Vi hjelper deg med alt fra tannsjekk og tannrens til fyllinger, tannbleking, tannimplantat og akutt tannpine.",
] as const;

export const LAGET = { tittel: "Dette er oss", tekst: "Tannlegene og tannpleieren du møter når du kommer til oss." };

export const GALLERI = {
  tittel: "Bli kjent med klinikken",
  tekst: "Venterommet, behandlingsrommene og utstyret vi bruker. Bla med pilene, eller trykk på et av de små bildene.",
};

/** Every photo from the clinic: the eight the site already shows, and the one it didn't. */
export const BILDER = [
  ...klinikkbilder,
  { src: "/images/klinikk/bilde7.webp", tekst: "Radioen på klinikken", bredde: 2400, hoyde: 1920 },
].map((b) => ({ ...b, alt: `${b.tekst}, hos Kongsvinger Tannhelse i ${adresse.gate}` }));

export type Bilde = (typeof BILDER)[number];

export const METADATA = {
  title: "Om oss: tannlegene i Fjellgata 4",
  description: `Kongsvinger Tannhelse er en tannklinikk i ${adresse.gate} i Kongsvinger. Møt tannlegene Per Hafthun og Umer Zia og tannpleier Eba Wasty, og se bilder fra klinikken.`,
};
