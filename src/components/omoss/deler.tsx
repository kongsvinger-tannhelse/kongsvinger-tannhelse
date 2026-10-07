"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { useInView, useReducedMotion, type UseInViewOptions } from "framer-motion";
import { Buebilde, Navn, Opp } from "@/components/forside/omoss/deler";
import { PERSONER } from "@/components/forside/omoss/ansatte";
import { cn } from "@/lib/utils";
import { AVSNITT, INGRESS, TITTEL } from "./tekst";

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

export function Smuler() {
  return (
    <nav aria-label="Brødsmuler" className="text-[13px] text-[var(--color-tekst-svak)]">
      <ol className="flex items-center gap-2">
        <li>
          <Link href="/" className="underline-offset-4 hover:text-[var(--color-tekst)] hover:underline">
            Forside
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="text-[var(--color-tekst-2)]">
          Om oss
        </li>
      </ol>
    </nav>
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

/** The three in a row, in their arches, standing up one after another. */
export function Laget({ className, stor = false }: { className?: string; stor?: boolean }) {
  const redusert = useReducedMotion() ?? false;
  const ref = useRef<HTMLUListElement | null>(null);
  const vist = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  return (
    <ul ref={ref} className={cn("grid grid-cols-3 gap-3 sm:gap-6 md:gap-10", stor ? "max-w-[820px]" : "max-w-[760px]", className)}>
      {PERSONER.map((p, i) => (
        <li key={p.navn} className="flex flex-col items-center text-center">
          <Opp vis={vist} n={i} redusert={redusert} className="relative aspect-[19/28] w-full">
            <Buebilde person={p} sizes="(min-width: 768px) 240px, 30vw" />
          </Opp>
          <div className="mt-3 md:mt-4">
            <Navn person={p} />
          </div>
        </li>
      ))}
    </ul>
  );
}
