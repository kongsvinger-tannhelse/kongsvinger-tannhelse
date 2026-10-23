"use client";

import { useRef, type ReactNode } from "react";
import { useInView, type UseInViewOptions } from "framer-motion";
import { SIDETITTEL } from "@/lib/sidetittel";
import { cn } from "@/lib/utils";
import { INGRESS, TITTEL } from "./tekst";

/* The parts of the «Om oss» page: the forest's "in view" switch, and the
   heading and text. (The three bios are the triptych, Triptyk.tsx.) */

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
    <h1 className={cn("font-bold text-[var(--color-glomma-deep)]", className)} style={SIDETITTEL}>
      {TITTEL}
    </h1>
  );
}

export function Ingress({ className }: { className?: string }) {
  return <p className={cn("text-[19px] leading-[1.55] text-[var(--color-tekst)] md:text-[21px]", className)}>{INGRESS}</p>;
}
