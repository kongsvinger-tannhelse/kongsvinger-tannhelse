import { ansatte, klinikk, klinikkbilder } from "@/data/klinikk";

/* The words on the «Om oss» page. Plain and
   short, with the words people search for (tannlege i Kongsvinger,
   tannpleier, tannklinikk, Fjellgata) in ordinary sentences. Nothing here
   that the old site doesn't say: no years, no education, no promises. */

const { adresse } = klinikk;

export const TITTEL = "Velkommen til Kongsvinger Tannhelse";

export const INGRESS = `Vi er en tannklinikk midt i Kongsvinger, i ${adresse.gate}. Hos oss er alle velkomne.`;

/** The three's heading, for screen readers only: the page just shows them. */
export const LAGET = { tittel: "Dette er oss" };

type Navn = (typeof ansatte)[number]["navn"];

/**
 * A few words about each of the three, on the card under their photo.
 *
 * PLACEHOLDERS. The old site says nothing about them but their names, so
 * these must come from the clinic, written or approved by each person,
 * before the page goes live. Never write them for them. `null` = name and
 * role only.
 */
export const BIOER: Record<Navn, string | null> = {
  "Per Hafthun": "[Kort om Per, fra klinikken: to eller tre setninger, skrevet eller godkjent av Per selv.]",
  "Umair Zia": "[Kort om Umair, fra klinikken: to eller tre setninger, skrevet eller godkjent av Umair selv.]",
  "Eba Wasty": "[Kort om Eba, fra klinikken: to eller tre setninger, skrevet eller godkjent av Eba selv.]",
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
  description: `Kongsvinger Tannhelse er en tannklinikk i ${adresse.gate} i Kongsvinger. Møt tannlegene Per Hafthun og Umair Zia og tannpleier Eba Wasty, og se bilder fra klinikken.`,
};
