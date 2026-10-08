import { klinikk } from "@/data/klinikk";

/* The words on the Kontakt page that aren't the form. A plain module (see klinikk.ts). */

const { adresse } = klinikk;

export const INTRO = `Vi står klare til å hjelpe deg med alt fra rutinemessige undersøkelser til akutte behov. Ring oss, send en e-post eller skriv til oss her. Du finner oss i ${adresse.gate}, midt i Kongsvinger.`;

/** What to do with toothache. «Time samme dag» is the clinic's own promise (2026-10-08). */
export const AKUTT = {
  tittel: "Akutt tannpine?",
  tekst: "Ring oss så tidlig på dagen som mulig. Vi gjør vårt beste for å gi deg time samme dag.",
} as const;

/** Google Maps with the way to the clinic from where you are. */
export const VEIBESKRIVELSE = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${adresse.gate}, ${adresse.postnummer} ${adresse.sted}`)}`;
