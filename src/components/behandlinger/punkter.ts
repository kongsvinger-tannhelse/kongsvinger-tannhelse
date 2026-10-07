import { GRUPPER } from "@/components/forside/behandlinger/grupper";

/* The 25 treatments as /behandlinger shows them: in the groups' order,
   numbered, each with its group. A plain module. */

export const PUNKTER = GRUPPER.flatMap((g) => g.liste.map((b) => ({ ...b, gruppe: g.id, gruppeTittel: g.tittel }))).map((b, i) => ({ ...b, nr: i + 1 }));

export type Punkt = (typeof PUNKTER)[number];

/** Each group's colour, dark enough for white text on it (WCAG AA). */
export const PINFARGE = {
  ordinaer: "#1D7380",
  akutt: "#B4472F",
  estetisk: "#5A6E3A",
} as const;
