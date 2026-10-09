import { ansatte, klinikk } from "@/data/klinikk";
import { RUTE } from "./kartdata";

/* The words on the Kontakt page that aren't the form. A plain module (see klinikk.ts). */

const { adresse } = klinikk;

/** What to do with toothache. «Time samme dag» is the clinic's own promise (2026-10-08). */
export const AKUTT = {
  tittel: "Akutt tannpine?",
  tekst: "Ring oss så tidlig på dagen som mulig. Vi gjør vårt beste for å gi deg time samme dag.",
} as const;

/** Under the postcard: the way the pen line takes, in words, for those who would rather read it. */
export const VEIEN = {
  tittel: `${adresse.gate}, midt i ${adresse.sted}`,
  tekst: `Kommer du med tog, er det rundt ${Math.round(RUTE.meter / 100) * 100} meter fra stasjonen: langs Glommengata, over Glomma og opp Storgata til Rådhusplassen, der Fjellgata begynner.`,
  bildetekst: `Fra ${adresse.sted} stasjon til ${adresse.gate}`,
} as const;

/** «Per, Umer og Eba»: the first names of everyone at the clinic, from klinikk.ts. */
const fornavn = ansatte.map((a) => a.navn.split(" ")[0]);
const alle = `${fornavn.slice(0, -1).join(", ")} og ${fornavn[fornavn.length - 1]}`;

/** The clinic's answer on the page once a letter has gone through: no promise beyond «så snart vi kan». */
export const SVAR = {
  tekst: "Vi har fått brevet ditt og svarer deg så snart vi kan.",
  haster: "Haster det, ring oss på",
  fra: alle,
} as const;

/** Google Maps with the way to the clinic from where you are. */
export const VEIBESKRIVELSE = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${adresse.gate}, ${adresse.postnummer} ${adresse.sted}`)}`;
