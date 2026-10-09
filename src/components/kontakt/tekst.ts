import { ansatte } from "@/data/klinikk";

/* The words on the Kontakt page that aren't the form. A plain module (see klinikk.ts). */

/** The old site's own words under the heading, without where to find us. */
export const INTRO = "Vi står klare til å hjelpe deg med alt fra rutinemessige undersøkelser til akutte behov. Ring oss, send en e-post eller skriv til oss her.";

/** What to do with toothache. «Time samme dag» is the clinic's own promise (2026-10-08). */
export const AKUTT = {
  tittel: "Akutt tannpine?",
  tekst: "Ring oss så tidlig på dagen som mulig. Vi gjør vårt beste for å gi deg time samme dag.",
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
