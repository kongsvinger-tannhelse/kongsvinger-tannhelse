import { klinikk } from "@/data/klinikk";

/*
 * The drawn map's data. A plain module (see klinikk.ts).
 *
 * The drawing is public/images/tegninger/kart.svg, made by tools/tegn_kart.py
 * from OpenStreetMap. It is in units of 2 metres with the clinic, Fjellgata 4,
 * at (0, 0) and north up; every position here is in those units, printed by
 * the same script.
 */

/** Where the drawing lies, in map units. */
export const TEGNING = { src: "/images/tegninger/kart.svg", x: -280, y: -500, b: 800, h: 780 } as const;

/** A part of the map to show: its top-left corner and size, in map units. */
export type Utsnitt = { x: number; y: number; b: number; h: number };

/** The clinic's own house, which the page colours in. */
export const KLINIKKHUS =
  "M-4.4,-2.8 7.1,13.4 8.9,12.1 10.4,12.9 18.6,-4 9,-8.7 9.3,-9.3 8.5,-9.7 7.2,-11.4 6.7,-11 2,-17.6 4.1,-19.1 1.8,-22.4 -0.3,-20.9 -3.6,-25.5 -7.4,-22.9 -7.7,-23.4 -14.1,-18.9 -3.3,-3.6Z";

/** The names on the map. `stor` are the landmarks; the rest are quiet. */
export const NAVN = [
  { tekst: "Glomma", x: 150, y: 146, slag: "vann" },
  { tekst: "Kongsvinger festning", x: 381, y: -392, slag: "stor" },
  { tekst: "Kongsvinger stasjon", x: 157, y: 248, slag: "stor" },
  { tekst: "Midtbyen", x: 70, y: -112, slag: "strok" },
  { tekst: "Øvrebyen", x: 229, y: -262, slag: "strok" },
] as const;

/** Fjellgata, from the bridge end up the hill, for its name to run along. */
export const FJELLGATA = "M-93.8,-129.5 L-18.6,-19.9";

/** Where the map links to: 1881's map of Fjellgata 4 (Google's pin is off, see klinikk.ts). */
export const KARTLENKE = klinikk.kart;

/** The map is drawn from OpenStreetMap (ODbL), which asks for this credit. */
export const KART_KREDITT = { tekst: "Kartdata © OpenStreetMap-bidragsytere", href: "https://www.openstreetmap.org/copyright" } as const;
