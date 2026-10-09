"use client";

import Image from "next/image";
import { useRef, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import { useInView, useReducedMotion, type UseInViewOptions } from "framer-motion";
import { Opp } from "@/components/forside/omoss/deler";
import { PERSONER, type Person } from "@/components/forside/omoss/ansatte";
import pen from "@/components/artikler/artikler.module.css";
import { cn } from "@/lib/utils";
import { kortskrift } from "./skrift";
import { BIOER, INGRESS, TITTEL } from "./tekst";
import l from "./laget.module.css";

/* The parts of the «Om oss» page: the forest's "in view" switch, the
   heading and text, and the three as old studio portraits. */

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

/** How much each portrait stands askew, in turn. */
const VRI = [-2.2, 1.5, -1.2] as const;

/* Below lg the three stand one under another, so each stands up as it is
   reached, without waiting its turn. Only the timing depends on it, never
   what is drawn, so the server's guess (wide) can't break hydration. */
const SMAL = "(max-width: 1023px)";
function lytt(cb: () => void) {
  const mq = window.matchMedia(SMAL);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const smalNa = () => window.matchMedia(SMAL).matches;
const bred = () => false;

/** A pen flourish between the role and the bio, drawn when the card has stood up. */
function Snirkel({ forsink }: { forsink: number }) {
  return (
    <svg viewBox="0 0 120 16" className={l.snirkel} aria-hidden="true">
      <path
        d="M6,10 C24,10 38,4 52,7 C58,8.5 59,13 55,12.6 C51,12.2 54,5.4 63,5.6 C78,6 92,11 114,9"
        fill="none"
        stroke="#8A6E45"
        strokeWidth={1.4}
        strokeLinecap="round"
        pathLength={1}
        className={pen.strek}
        style={{ "--forsink": `${forsink}s` } as CSSProperties}
      />
    </svg>
  );
}

/**
 * One of the three, as an old studio portrait: the square photo mounted on
 * thick cream card with a fine line pressed in round it, and under it on the
 * card their name and role in a classic serif, a pen flourish, and a few
 * words about them. It stands up when it comes into view.
 */
function Portrett({ person, n, redusert }: { person: Person; n: number; redusert: boolean }) {
  const ref = useRef<HTMLLIElement | null>(null);
  const vist = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const tur = useSyncExternalStore(lytt, smalNa, bred) ? 0 : n;
  const bio = BIOER[person.navn];
  return (
    <li ref={ref} data-vis={vist ? "ja" : "nei"} className={l.plass}>
      <Opp vis={vist} n={tur} redusert={redusert}>
        <figure className={cn(l.kort, kortskrift.className)} style={{ "--vri": `${VRI[n % VRI.length]}deg` } as CSSProperties}>
          <div className={l.bilde}>
            <div className={l.foto}>
              <Image
                src={person.bilde}
                alt={`${person.navn}, ${person.rolle.toLowerCase()}`}
                fill
                // the photo is about 82% of the card's width, zoomed so the three heads match
                sizes={`(min-width: 1024px) ${Math.ceil(310 * person.zoom)}px, (min-width: 500px) ${Math.ceil(350 * person.zoom)}px, ${Math.ceil(74 * person.zoom)}vw`}
                className="object-cover"
                style={{ objectPosition: person.fokus, transform: `scale(${person.zoom})`, transformOrigin: person.fokus }}
              />
            </div>
          </div>
          <figcaption className={l.tekst}>
            <span className={l.navn}>{person.navn}</span>
            <span className={l.rolle}>{person.rolle}</span>
            {bio && (
              <>
                <Snirkel forsink={0.9 + tur * 0.18} />
                <span className={l.bio}>{bio}</span>
              </>
            )}
          </figcaption>
        </figure>
      </Opp>
    </li>
  );
}

/** The three, as old studio portraits, standing up one after another. */
export function Laget({ className }: { className?: string }) {
  const redusert = useReducedMotion() ?? false;
  return (
    <ul className={cn("grid max-w-[560px] gap-12 lg:max-w-[1180px] lg:grid-cols-3 lg:items-start lg:gap-10 xl:gap-12", className)}>
      {PERSONER.map((p, i) => (
        <Portrett key={p.navn} person={p} n={i} redusert={redusert} />
      ))}
    </ul>
  );
}
