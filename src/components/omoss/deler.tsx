"use client";

import Image from "next/image";
import { useRef, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import { useInView, useReducedMotion, type UseInViewOptions } from "framer-motion";
import { Opp } from "@/components/forside/omoss/deler";
import { PERSONER, type Person } from "@/components/forside/omoss/ansatte";
import { cn } from "@/lib/utils";
import { BIOER, INGRESS, TITTEL } from "./tekst";
import l from "./laget.module.css";

/* The parts of the «Om oss» page: the forest's "in view" switch, the
   heading and text, and the three as old photographs. */

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

/** How much each photograph lies askew, in turn. */
const VRI = [-2, 1.6, -1.1] as const;

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
 * One of the three, as an old photograph: the square photo in a white paper
 * border with a scalloped edge, their name, role and a few words written in
 * the wider border under it. It stands up when it comes into view.
 */
function Fotografi({ person, n, redusert }: { person: Person; n: number; redusert: boolean }) {
  const ref = useRef<HTMLLIElement | null>(null);
  const vist = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const tur = useSyncExternalStore(lytt, smalNa, bred) ? 0 : n;
  const bio = BIOER[person.navn];
  return (
    <li ref={ref} className={l.plass}>
      <Opp vis={vist} n={tur} redusert={redusert} className="h-full">
        <div className={l.skygge} style={{ "--vri": `${VRI[n % VRI.length]}deg` } as CSSProperties}>
          <figure className={l.trykk}>
            <div className={l.bilde}>
              <Image
                src={person.bilde}
                alt={`${person.navn}, ${person.rolle.toLowerCase()}`}
                fill
                // the photo is drawn about 86% of the print's width, zoomed so the three heads match
                sizes={`(min-width: 768px) ${Math.ceil(270 * person.zoom)}px, ${Math.ceil(70 * person.zoom)}vw`}
                className="object-cover"
                style={{ objectPosition: person.fokus, transform: `scale(${person.zoom})`, transformOrigin: person.fokus }}
              />
            </div>
            <figcaption className={l.tekst}>
              <span className="block text-[19px] font-bold leading-tight tracking-[-0.02em] text-[var(--color-glomma-deep)] md:text-[18px] lg:text-[20px]">{person.navn}</span>
              <span className="mt-0.5 block text-[15px] leading-tight text-[var(--color-tekst-2)]">{person.rolle}</span>
              {bio && <span className="mt-3 block text-[15.5px] leading-[1.5] text-[var(--color-tekst)] md:text-[14.5px] lg:text-[15.5px]">{bio}</span>}
            </figcaption>
          </figure>
        </div>
      </Opp>
    </li>
  );
}

/** The three, as old photographs, standing up one after another. */
export function Laget({ className }: { className?: string }) {
  const redusert = useReducedMotion() ?? false;
  return (
    <ul className={cn("grid max-w-[380px] gap-10 md:max-w-[960px] md:grid-cols-3 md:gap-7 lg:gap-12", className)}>
      {PERSONER.map((p, i) => (
        <Fotografi key={p.navn} person={p} n={i} redusert={redusert} />
      ))}
    </ul>
  );
}
