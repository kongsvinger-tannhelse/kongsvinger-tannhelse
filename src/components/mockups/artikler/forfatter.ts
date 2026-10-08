import { PERSONER } from "@/components/forside/omoss/ansatte";
import { ARTIKKEL } from "./tekst";

/* Who wrote the article. A plain module: a constant from a "use client"
   module reaches server components as a reference, and renders empty. */
export const FORFATTER = PERSONER.find((p) => p.navn === ARTIKKEL.forfatter) ?? PERSONER[0];
