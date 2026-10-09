"use client";

import { useRef, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import { useInView, useReducedMotion, type UseInViewOptions } from "framer-motion";
import { Buebilde, Opp } from "@/components/forside/omoss/deler";
import { PERSONER, type Person } from "@/components/forside/omoss/ansatte";
import { cn } from "@/lib/utils";
import { AVSNITT, INGRESS, LAPPER, TITTEL } from "./tekst";
import l from "./laget.module.css";

/* The parts of the «Om oss» page: the forest's "in view" switch, the
   heading and text, and the three in their arches. */

/** A forest that stands up the first time it is seen. Server and first render say "nei", so it hydrates. */
export function Skog({ className, children, margin = "0px 0px -12% 0px" }: { className?: string; children: ReactNode; margin?: UseInViewOptions["margin"] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const vist = useInView(ref, { once: true, margin });
  return (
    <div ref={ref} data-vis={vist ? "ja" : "nei"} className={className}>
      {children}
    </div>
  );
}

export function Tittel({ className }: { className?: string }) {
  return (
    <h1 className={cn("font-bold text-[var(--color-glomma-deep)]", className)} style={{ fontSize: "clamp(40px, 5.6vw, 76px)", lineHeight: 0.98, letterSpacing: "-0.05em" }}>
      {TITTEL}
    </h1>
  );
}

export function Ingress({ className }: { className?: string }) {
  return <p className={cn("text-[19px] leading-[1.55] text-[var(--color-tekst)] md:text-[21px]", className)}>{INGRESS}</p>;
}

export function Avsnitt({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-4 text-[17px] leading-[1.7] text-[var(--color-tekst-2)]", className)}>
      {AVSNITT.map((a) => (
        <p key={a}>{a}</p>
      ))}
    </div>
  );
}

/** How much each yellow note leans, in turn. */
const VRI = [-2.2, 1.7, -1.3] as const;

/* Phones show the three one under another, so each stands up as it is
   reached, without waiting its turn. Only the timing depends on it, never
   what is drawn, so the server's guess (wide) can't break hydration. */
const SMAL = "(max-width: 767px)";
function lytt(cb: () => void) {
  const mq = window.matchMedia(SMAL);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const smalNa = () => window.matchMedia(SMAL).matches;
const bred = () => false;

/**
 * One of the three: the portrait in its open arch, which stands up when it
 * comes into view; the yellow note with their own line, stuck on once it
 * has stood; their name and role. No note when there is no line.
 */
function Personen({ person, n, redusert }: { person: Person; n: number; redusert: boolean }) {
  const ref = useRef<HTMLLIElement | null>(null);
  const vist = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const tur = useSyncExternalStore(lytt, smalNa, bred) ? 0 : n;
  const { linje } = LAPPER[person.navn];
  const stil = { "--vri": `${VRI[n % VRI.length]}deg`, "--forsink": `${0.55 + tur * 0.18}s` } as CSSProperties;
  return (
    <li ref={ref} data-vis={vist ? "ja" : "nei"}>
      <figure className={cn(l.person, n % 2 === 1 && l.speil, !linje && l.utenLapp)}>
        <Opp vis={vist} n={tur} redusert={redusert} className={cn(l.bilde, "relative aspect-[19/28] w-full self-center")}>
          <Buebilde person={person} kolonne={{ px: 280, vw: 46 }} />
        </Opp>
        {linje && (
          <blockquote className={l.lapp} style={stil}>
            <p>«{linje}»</p>
          </blockquote>
        )}
        <figcaption className={cn(l.navn, "md:mt-5")}>
          <span className="block text-[19px] font-bold leading-tight tracking-[-0.02em] text-[var(--color-glomma-deep)] md:text-[21px]">{person.navn}</span>
          <span className="mt-1 block text-[15px] leading-tight text-[var(--color-tekst-2)] md:text-[16px]">{person.rolle}</span>
        </figcaption>
      </figure>
    </li>
  );
}

/** The three, each in their arch with a note from them, standing up one after another. */
export function Laget({ className }: { className?: string }) {
  const redusert = useReducedMotion() ?? false;
  return (
    <ul className={cn("grid max-w-[460px] gap-11 md:max-w-[900px] md:grid-cols-3 md:gap-8 lg:gap-12", className)}>
      {PERSONER.map((p, i) => (
        <Personen key={p.navn} person={p} n={i} redusert={redusert} />
      ))}
    </ul>
  );
}
