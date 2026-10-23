import { ansatte, klinikk, klinikkbilder } from "@/data/klinikk";

/* The words on the «Om oss» page. Plain and
   short, with the words people search for (tannlege i Kongsvinger,
   tannpleier, tannklinikk, Fjellgata) in ordinary sentences. The welcome
   comes from the old site; the three bios come from Per, Umair and Eba
   themselves (their own texts, 2026-10-23), cut down to the person: no
   story of who bought or sold the practice and no names of others. */

const { adresse } = klinikk;

export const TITTEL = "Velkommen til Kongsvinger Tannhelse";

export const INGRESS = `Vi er en tannklinikk midt i Kongsvinger, i ${adresse.gate}. Hos oss er alle velkomne.`;

/** The three's heading, for screen readers only: the page just shows them. */
export const LAGET = { tittel: "Dette er oss" };

export type Navn = (typeof ansatte)[number]["navn"];

export type Bio = {
  navn: Navn;
  /** For the seal. */
  initialer: string;
  rolle: string;
  avsnitt: string[];
  /** Their own words, when we have them. */
  sitat?: string;
  /** The line at the foot of the panel. */
  skole: string;
};

/**
 * The three bios, in the order of the swipe row on a phone: Umair first. (The
 * triptych on a wide screen places them by name, see Triptyk.tsx.) Every fact comes
 * from the person's own text; nothing is added. Per's quote is his own
 * sentence, so he should see it before the page goes live.
 */
export const BIOER: Bio[] = [
  {
    navn: "Umair Zia",
    initialer: "UZ",
    rolle: "Tannlege",
    avsnitt: [
      "Umair ble ferdig utdannet tannlege ved Universitetet i Oslo i 2012.",
      "Han har jobbet på flere arbeidsplasser. Den erfaringen gir ham et godt faglig grunnlag og trygghet i møte med pasienter i alle aldre og med ulike behov. Han tilbyr både vanlig tannbehandling og implantatbehandling.",
    ],
    skole: "Universitetet i Oslo, 2012",
  },
  {
    navn: "Per Hafthun",
    initialer: "PH",
    rolle: "Tannlege",
    avsnitt: [
      "Per ble ferdig utdannet tannlege i 1976. Han begynte i militæret, som tannlege på Andøya flystasjon, og jobbet deretter noen år i det offentlige.",
      "Til sammen har han rundt 50 år ved tannlegestolen.",
    ],
    sitat: "Jeg har vært dedikert oppgaven og likt de utfordringene jeg har møtt på vegen.",
    skole: "Ferdig utdannet 1976",
  },
  {
    navn: "Eba Wasty",
    initialer: "EW",
    rolle: "Tannpleier",
    avsnitt: [
      "Eba er utdannet tannpleier fra Universitetet i Innlandet og ble ferdig i 2019. Hun er opptatt av god munnhelse, og jobber med forebygging, behandling og veiledning tilpasset den enkelte.",
      "For Eba er det viktig at du føler deg trygg og godt ivaretatt når du kommer til behandling. Hun tilpasser behandlingen til dine behov.",
    ],
    skole: "Universitetet i Innlandet, 2019",
  },
];

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
