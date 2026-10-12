import { klinikk } from "@/data/klinikk";

/**
 * What a link to the site shows when shared (Facebook, Messenger, Slack, X):
 * the front page's drawing of the view over Glomma, with the clinic's name
 * on the sky. 1200 × 630, made from the hero's two layers.
 *
 * Every page that sets its own openGraph spreads OPENGRAPH first: Next.js
 * replaces a parent's openGraph whole rather than merging it, so a page
 * without it would lose the picture, the site name and the language.
 */
export const DELINGSBILDE = {
  url: "/images/deling.jpg",
  width: 1200,
  height: 630,
  alt: `${klinikk.navn}, ${klinikk.undertittel} i ${klinikk.adresse.gate}, over en tegning av utsikten fra Kongsvinger festning mot Glomma.`,
};

export const OPENGRAPH = {
  type: "website" as const,
  locale: "nb_NO",
  siteName: klinikk.navn,
  images: [DELINGSBILDE],
};
