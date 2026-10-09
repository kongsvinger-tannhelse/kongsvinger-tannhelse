"use client";

import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";
import { Vis } from "@/components/artikler/deler";
import pen from "@/components/artikler/artikler.module.css";
import { Frimerke } from "@/components/forside/kontakt/deler";
import { klinikk } from "@/data/klinikk";
import { Kartkreditt } from "./Detaljer";
import { Karttegning } from "./Kart";
import { NAVN, RUTE } from "./kartdata";
import { VEIBESKRIVELSE, VEIEN } from "./tekst";

/**
 * The drawn map as a picture postcard: white border, a stamp, a printed
 * caption, lying a little askew. Once it is seen, a pen draws the way from
 * the station to the clinic along the real streets (kartdata.ts, RUTE) and
 * rings the house in Fjellgata, the way someone marks a card for a visitor.
 * The line and ring use the articles' pen kit (artikler.module.css), so they
 * are simply there with reduced motion.
 */

/** What the card shows, in map units: the station at the bottom, the clinic near the top. */
const UTSNITT = { x: -110, y: -95, b: 350, h: 375 };
const PAPIR = "#F6F3EB";
const BLEKK = "var(--color-glomma-deep)";

/** A pen ring round the clinic's house, a little more than once round (made with a few lines of Python, not data). */
const RING =
  "M-15.2,-26.2 C-14.1,-26.9 -11,-29.4 -8.7,-30.4 C-6.4,-31.4 -3.9,-31.9 -1.4,-32.1 C1.1,-32.3 3.7,-32.1 6.2,-31.5 C8.7,-30.9 11.2,-30 13.6,-28.6 C15.9,-27.3 18.3,-25.5 20.3,-23.4 C22.3,-21.2 24.1,-18.6 25.5,-15.8 C26.8,-13.1 27.8,-9.8 28.2,-6.7 C28.6,-3.6 28.5,-0.3 28,2.7 C27.4,5.7 26.2,8.6 24.7,11.1 C23.2,13.5 21.2,15.6 19.1,17.3 C17,18.9 14.5,20.1 12.1,20.9 C9.6,21.7 7,22.1 4.4,22 C1.9,22 -0.8,21.6 -3.3,20.8 C-5.9,20 -8.5,18.8 -10.8,17.2 C-13.2,15.5 -15.5,13.5 -17.4,11.1 C-19.3,8.7 -21,5.7 -22.2,2.8 C-23.3,-0.2 -24.1,-3.7 -24.2,-6.8 C-24.4,-10 -23.9,-13.5 -23.1,-16.4 C-22.2,-19.3 -20.7,-22.2 -19,-24.5 C-17.3,-26.8 -15.1,-28.8 -12.8,-30.2 C-10.5,-31.7 -7.9,-32.7 -5.3,-33.3 C-2.8,-33.9 1.3,-33.7 2.6,-33.8";

/** The station's name, moved down under Glommengata so the pen line doesn't run through it. */
const NAVN_HER = NAVN.map((n) => (n.tekst === "Kongsvinger stasjon" ? { ...n, x: 160, y: 271 } : n));

/** When each stroke goes down, in seconds: the dot at the station, the way, the ring, the words. */
const tid = (forsink: number, varighet?: number) => ({ "--forsink": `${forsink}s`, ...(varighet && { transitionDuration: `${varighet}s` }) }) as CSSProperties;

export function Postkort({ className }: { className?: string }) {
  const { b, h } = UTSNITT;
  return (
    <div className={className}>
      <Vis as="figure" className="relative rotate-[1.4deg] bg-white p-2.5 shadow-[0_26px_44px_-26px_rgba(10,25,32,0.6),0_1px_2px_rgba(10,25,32,0.06)] sm:p-3">
        <div className="relative overflow-hidden" style={{ aspectRatio: `${b} / ${h}`, background: PAPIR }}>
          <Karttegning utsnitt={UTSNITT} skrift={12} papir={PAPIR} navn={NAVN_HER} fjellgata="46%">
            <g fill="none" strokeLinecap="round" strokeLinejoin="round">
              {/* a little paper either side of the line, so it reads over the streets' edges */}
              <path d={RUTE.sti} stroke={PAPIR} strokeOpacity={0.9} strokeWidth={5.6} pathLength={1} className={pen.strek} style={tid(0.5, 2.4)} />
              <path d={RUTE.sti} stroke={BLEKK} strokeWidth={2.5} pathLength={1} className={pen.strek} style={tid(0.5, 2.4)} />
              <path d={RING} stroke={BLEKK} strokeWidth={2.2} pathLength={1} className={pen.strek} style={tid(2.8, 0.9)} />
            </g>
            <circle cx={RUTE.start.x} cy={RUTE.start.y} r={3.6} fill={BLEKK} className={pen.blekk} style={tid(-0.6)} />
            <text
              x={34}
              y={-10}
              fontSize={14}
              fontStyle="italic"
              fontWeight={600}
              fill={BLEKK}
              stroke={PAPIR}
              strokeWidth={3}
              paintOrder="stroke"
              className={pen.blekk}
              style={tid(3)}
            >
              Her er vi
            </text>
          </Karttegning>
          <span className="absolute right-2.5 top-2.5 origin-top-right rotate-[4deg] max-xl:scale-[0.8] sm:right-3 sm:top-3">
            <Frimerke />
          </span>
        </div>
        <figcaption className="px-1 pb-0.5 pt-2.5 text-center text-[13.5px] text-[var(--color-tekst-2)] sm:pt-3">{VEIEN.bildetekst}</figcaption>
      </Vis>

      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 px-1">
        <a
          href={VEIBESKRIVELSE}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[15px] font-semibold text-[var(--color-glomma)] underline decoration-[rgba(34,64,77,0.35)] underline-offset-4 transition-colors hover:text-[var(--color-glomma-deep)] hover:decoration-current"
        >
          Veibeskrivelse til {klinikk.adresse.gate} <ArrowUpRight className="size-4" aria-hidden="true" />
          <span className="sr-only">(åpnes i Google Maps)</span>
        </a>
        <Kartkreditt />
      </div>
    </div>
  );
}

