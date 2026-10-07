"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Person } from "./ansatte";

/* The pieces the «Om oss» drawing is built from: boxes in drawing units, the
   way HTML is laid over the drawing, the portraits and their names. */

/** A box in drawing units. */
export type Boks = { x: number; y: number; b: number; h: number };
/** A drawing's size in its own units. */
export type Tegning = { b: number; h: number };

/**
 * Places an HTML piece over the drawings: by the narrow drawing on phones,
 * by the wide one from md up. Both drawings fill the same box, so a
 * percentage of the box is a point in the drawing.
 */
export function plass(smal: Boks, smalT: Tegning, bred: Boks, bredT: Tegning): CSSProperties {
  const p = (n: number, av: number) => `${((n / av) * 100).toFixed(3)}%`;
  return {
    ["--ls" as string]: p(smal.x, smalT.b),
    ["--ts" as string]: p(smal.y, smalT.h),
    ["--ws" as string]: p(smal.b, smalT.b),
    ["--hs" as string]: p(smal.h, smalT.h),
    ["--l" as string]: p(bred.x, bredT.b),
    ["--t" as string]: p(bred.y, bredT.h),
    ["--w" as string]: p(bred.b, bredT.b),
    ["--h" as string]: p(bred.h, bredT.h),
  } as CSSProperties;
}

export const PLASS =
  "absolute left-[var(--ls)] top-[var(--ts)] w-[var(--ws)] h-[var(--hs)] md:left-[var(--l)] md:top-[var(--t)] md:w-[var(--w)] md:h-[var(--h)]";

/** The drawing's box: as tall as the narrow drawing on phones, the wide one from md up. */
export function Lerret({ smal, bred, children }: { smal: Tegning; bred: Tegning; children: ReactNode }) {
  return (
    <div
      className="relative mx-auto aspect-[var(--as)] w-full max-w-[1800px] md:aspect-[var(--ab)]"
      style={{ ["--as" as string]: `${smal.b} / ${smal.h}`, ["--ab" as string]: `${bred.b} / ${bred.h}` } as CSSProperties}
    >
      {children}
    </div>
  );
}

/** The photo, cropped to the face and zoomed so the three heads match. */
function Foto({ person, sizes }: { person: Person; sizes: string }) {
  return (
    <Image
      src={person.bilde}
      alt={`${person.navn}, ${person.rolle.toLowerCase()}`}
      fill
      sizes={sizes}
      className="object-cover"
      style={{ objectPosition: person.fokus, transform: `scale(${person.zoom})`, transformOrigin: person.fokus }}
    />
  );
}

/** Stands up from flat like a page in a pop-up book: the hero's spring. */
export function Opp({ vis, n, redusert, className, style, children }: { vis: boolean; n: number; redusert: boolean; className?: string; style?: CSSProperties; children: ReactNode }) {
  return (
    <motion.div
      className={className}
      style={{ ...style, transformOrigin: "50% 100%", transformPerspective: 900 }}
      initial={{ rotateX: 88, opacity: 0 }}
      animate={vis ? { rotateX: 0, opacity: 1 } : { rotateX: 88, opacity: 0 }}
      transition={
        redusert
          ? { duration: 0 }
          : { rotateX: { type: "spring", stiffness: 85, damping: 13, delay: 0.15 + n * 0.18 }, opacity: { duration: 0.25, delay: 0.15 + n * 0.18 } }
      }
    >
      {children}
    </motion.div>
  );
}

/** A portrait under a round head, in a thin paper border, as Ringebu's arches. */
export function Buebilde({ person, sizes }: { person: Person; sizes: string }) {
  return (
    <span className="absolute inset-0 block rounded-t-full bg-[#FBF8F1] p-[4%] shadow-[0_22px_40px_-22px_rgba(10,25,32,0.65)]">
      <span className="relative block h-full w-full overflow-hidden rounded-t-full">
        <Foto person={person} sizes={sizes} />
      </span>
    </span>
  );
}

/** Name and role, for under a portrait. */
export function Navn({ person }: { person: Person }) {
  return (
    <>
      <p className="text-[12.5px] font-semibold leading-tight tracking-[-0.01em] text-[var(--color-glomma-deep)] md:text-[15px]">{person.navn}</p>
      <p className={cn("mt-0.5 text-[11px] leading-tight text-[var(--color-tekst-2)] md:text-[12px]")}>{person.rolle}</p>
    </>
  );
}
