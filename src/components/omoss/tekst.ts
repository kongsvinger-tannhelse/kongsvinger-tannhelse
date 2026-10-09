import { ansatte, klinikk, klinikkbilder } from "@/data/klinikk";

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

type Navn = (typeof ansatte)[number]["navn"];

/**
 * The yellow note on each portrait: one line in that person's own words.
 *
 * PLACEHOLDERS. These must be replaced with a line each person has written
 * or approved themselves before the page goes live. Never write a line for
 * them. `null` = no note: the note is simply not drawn.
 */
export const LAPPER: Record<Navn, { linje: string | null }> = {
  "Per Hafthun": { linje: "[Per skriver en linje her]" },
  "Umer Zia": { linje: "[Umer skriver en linje her]" },
  "Eba Wasty": { linje: "[Eba skriver en linje her]" },
};

export const GALLERI = {
  tittel: "Bli kjent med klinikken",
  tekst: "Bildene følger et besøk hos oss, fra venterommet til behandlingsstolen.",
};

/**
 * The photos on this page, in the order of a visit: the waiting room, a
 * detail from it, the treatment room, and the chair. (There is no photo of
 * the door.) The close-ups of instruments and equipment are left out: they
 * can frighten someone who is anxious about the dentist.
 */
const BESOK = ["bilde9", "bilde1", "bilde3", "bilde8", "bilde6"];

export const BILDER = BESOK.map((navn) => klinikkbilder.find((b) => b.src.endsWith(`/${navn}.webp`))!).map((b) => ({
  ...b,
  alt: `${b.tekst}, hos Kongsvinger Tannhelse i ${adresse.gate}`,
}));

export type Bilde = (typeof BILDER)[number];

export const METADATA = {
  title: "Om oss: tannlegene i Fjellgata 4",
  description: `Kongsvinger Tannhelse er en tannklinikk i ${adresse.gate} i Kongsvinger. Møt tannlegene Per Hafthun og Umer Zia og tannpleier Eba Wasty, og se bilder fra klinikken.`,
};
