"use client";

import { useRef, type CSSProperties, type Ref } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { klinikk } from "@/data/klinikk";
import { Scene } from "@/components/forside/behandlinger/leporello/deler";
import { TONE } from "@/components/forside/behandlinger/popup/tegning";
import { PINFARGE, type Punkt } from "./punkter";
import { cn } from "@/lib/utils";
import o from "./oppslag.module.css";

/* The small parts of /behandlinger: the short words, the ribbon bookmark,
   and a window on a treatment's paper scene. */

/** Each treatment in a few words, for a list row or a card's subtitle. */
export const KORT: Record<string, string> = {
  tannsjekk: "Finner problemer mens de er små",
  tannfylling: "Reparerer et hull i tanna",
  tannbleking: "Hvitere tenner med en skinne hjemme",
  tannrens: "Fjerner plakk og tannstein",
  tannkjottbehandling: "For rødt, hovent eller blødende tannkjøtt",
  tannstein: "Hardt belegg som må fjernes hos oss",
  rotfylling: "Redder tanna når nerven er syk",
  munntorrhet: "Når munnen lager for lite spytt",
  tanngnissing: "Biter eller gnisser tennene om natten",
  "ising-i-tenner": "Når det isner i tennene",
  "trekking-av-tenner": "Når en tann ikke kan reddes",
  "darlig-ande": "Vanlig, og ofte lett å gjøre noe med",
  visdomstenner: "Når visdomstanna gir betennelse",
  tannsmerte: "Vedvarende vondt i en tann",
  tannskade: "Løs, slått ut eller knekt tann",
  tannverk: "Verk som ikke går over",
  "mistet-fylling": "Fyllingen har falt ut",
  hevelse: "Hevelse rundt en tann eller i ansiktet",
  "losnet-tannkrone": "Kronen har løsnet eller falt av",
  tannkrone: "En hette som styrker en svak tann",
  tannbro: "Fast erstatning for tenner som mangler",
  skallfasetter: "Tynne skall for et jevnere smil",
  tannimplantat: "En ny tann på en skrue i kjeven",
  delprotese: "Avtakbar, erstatter noen tenner",
  helprotese: "Avtakbart tannsett for hele kjeven",
};

export const GRUPPENAVN = { ordinaer: "Ordinær", akutt: "Akutt", estetisk: "Estetisk" } as const;

/**
 * The ribbon bookmark: a band of satin in the group's colour, hanging over
 * the page from its top edge, with the group's name on it and a forked
 * tail. It is one ribbon for the whole book, so when the group changes its
 * colour changes slowly, as the page turns under it. For the eye only: the
 * page says the group to screen readers itself.
 */
export function Bokmerke({ gruppe, className, ref }: { gruppe: Punkt["gruppe"]; className?: string; ref?: Ref<HTMLSpanElement> }) {
  return (
    <span ref={ref} aria-hidden="true" className={cn(o.bokmerke, className)} style={{ "--farge": PINFARGE[gruppe] } as CSSProperties}>
      <span className={o.baand}>{GRUPPENAVN[gruppe]}</span>
    </span>
  );
}

/**
 * A treatment's paper scene in a window of any shape, on its group's tint.
 * It is only drawn once the window is near the screen, and stands up when
 * `opp` turns true (by default: once it has been seen).
 */
export function Vindu({ p, className, opp, rund = false }: { p: Punkt; className?: string; opp?: boolean; rund?: boolean }) {
  const redusert = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement | null>(null);
  const naer = useInView(ref, { once: true, margin: "200px 0px 200px 0px" });
  const sett = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const synlig = useInView(ref);
  const staar = opp ?? sett;
  return (
    <div ref={ref} aria-hidden="true" className={cn("relative overflow-hidden", rund ? "rounded-full" : "rounded-[20px]", className)} style={{ background: TONE[p.gruppe].flate }}>
      {naer && <Scene id={p.id} oppe={staar} spiller={staar && synlig} redusert={redusert} />}
    </div>
  );
}

// the phone's bottom bar now lives in components/Ringelinje.tsx, so pages without the book don't load this module
export { Bunnlinje } from "@/components/Ringelinje";
