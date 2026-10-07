"use client";

import Image from "next/image";
import { useId } from "react";
import { klinikk } from "@/data/klinikk";
import { cn } from "@/lib/utils";
import s from "./kontakt.module.css";

/* The postcard's stamp and postmark. */

const { adresse, apningstider: tid } = klinikk;

/** A postage stamp with perforated edges and the clinic's tooth. */
export function Frimerke() {
  return (
    <span
      // the perforation: dots in the card's own colour on a grid centred on the edges; the picture covers the inner ones
      className="relative block h-[92px] w-[77px] bg-white p-[7px] shadow-[0_1px_3px_rgba(10,25,32,0.12)]"
      style={{ backgroundImage: "radial-gradient(circle, #FBF8F1 2.6px, transparent 3px)", backgroundSize: "9.5px 9.5px", backgroundPosition: "-4.75px -4.75px" }}
      aria-hidden="true"
    >
      <span className="relative flex h-full w-full flex-col items-center justify-end overflow-hidden bg-[#5B9BA8] pb-1">
        <Image src="/images/merke.png" alt="" fill sizes="80px" className="scale-[1.1] object-cover object-[50%_35%]" />
        <span className="relative text-[7px] font-semibold uppercase tracking-[0.16em] text-white/90">Kongsvinger</span>
      </span>
    </span>
  );
}

/** The postmark: the clinic round the rim, the opening hours in the middle. Pressed on once `vis` turns true. */
export function Poststempel({ vis }: { vis: boolean }) {
  const id = `rand-${useId().replace(/:/g, "")}`;
  const blekk = "rgba(34,64,77,0.62)";
  return (
    <span
      className={cn("absolute -left-[92px] top-[42px] block size-[104px]", vis ? s.stempel : "opacity-0")}
      style={{ animationDelay: "0.9s" }}
      aria-hidden="true"
    >
      <svg viewBox="-60 -60 120 120" className="h-full w-full overflow-visible">
        <path id={id} d="M-41,0 a41,41 0 1,1 82,0 a41,41 0 1,1 -82,0" fill="none" />
        <circle r={52} fill="none" stroke={blekk} strokeWidth={2} />
        <circle r={32} fill="none" stroke={blekk} strokeWidth={1.4} />
        <text fontSize={10.5} fontWeight={600} letterSpacing={2.2} fill={blekk}>
          <textPath href={`#${id}`} startOffset="0">
            {`${klinikk.navn.toUpperCase()} · ${adresse.gate.toUpperCase()} ·`}
          </textPath>
        </text>
        <text y={-4} textAnchor="middle" fontSize={11} fontWeight={700} letterSpacing={1} fill={blekk}>
          MAN–FRE
        </text>
        <text y={12} textAnchor="middle" fontSize={11.5} fontWeight={700} fill={blekk}>
          {tid.fra}–{tid.til}
        </text>
        {/* the wavy cancellation lines, running on over the stamp */}
        {[-12, -2, 8].map((dy) => (
          <path key={dy} d={`M54,${dy} c14,-7 26,7 40,0 s20,6 30,0`} fill="none" stroke={blekk} strokeWidth={1.6} />
        ))}
      </svg>
    </span>
  );
}
