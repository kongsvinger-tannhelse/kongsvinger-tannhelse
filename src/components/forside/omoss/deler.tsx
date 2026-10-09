"use client";

import Image from "next/image";
import { m } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Person } from "./ansatte";

/* The pieces of the «Om oss» section: the portraits and their names. */

/** A portrait column's width: in px from md up, in vw below. */
export type Kolonne = { px: number; vw: number };

/** How much wider than its column the photo is drawn: a 3:4 photo covering a 19:28 arch, inside its 4% border, spills over the sides by about 5%. */
const SPILL = 1.05;

/**
 * The photo, cropped to the face and zoomed so the three heads match. It
 * asks for as many pixels as it is drawn with, spill and zoom included, so
 * a zoomed face is not a small picture stretched.
 */
function Foto({ person, kolonne }: { person: Person; kolonne: Kolonne }) {
  const k = SPILL * person.zoom;
  const sizes = `(min-width: 768px) ${Math.ceil(kolonne.px * k)}px, ${Math.ceil(kolonne.vw * k)}vw`;
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
    <m.div
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
    </m.div>
  );
}

/** A portrait under a round head, in a thin paper border, as Ringebu's arches. */
export function Buebilde({ person, kolonne }: { person: Person; kolonne: Kolonne }) {
  return (
    <span className="absolute inset-0 block rounded-t-full bg-[#FFFDF8] p-[4%] shadow-[0_22px_40px_-22px_rgba(10,25,32,0.65)]">
      <span className="relative block h-full w-full overflow-hidden rounded-t-full">
        <Foto person={person} kolonne={kolonne} />
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
