"use client";

import { useId, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Buebilde, Navn, Opp } from "./deler";
import { PERSONER, TEKST } from "./ansatte";
import s from "./omoss.module.css";

/**
 * «Om oss». The three at the clinic stand in a row in arches with a paper
 * border, as on Ringebu, and stand up one after another as they come into
 * view. Under them, along the foot of the section, the town as it is seen
 * from across the valley: Kongsvinger festning on its hill (the stone wall
 * and bastion, the brick gable, the rust roofs, the yellow block, the flag
 * lifting in the wind), the autumn trees on the slope and the old town's
 * painted houses below.
 *
 * The landscape is drawn by tools/tegn_landskap.py from a photograph used as
 * a reference, and saved as two pictures: a wide one whose hill and town
 * carry on to both sides, and a narrow one for phones. Both are in the
 * photo's own coordinates (800 × 600), so the flag is drawn here, in the
 * same coordinates, over the picture.
 */

const BILDER = {
  bred: { src: "/images/tegninger/landskap-bred.webp", x: -400, y: 118, b: 1600, h: 482 },
  smal: { src: "/images/tegninger/landskap-smal.webp", x: 80, y: 118, b: 540, h: 482 },
} as const;

/** Norway's flag on the fortress's pole, in the photo's coordinates. */
function Flagg() {
  const id = `flagg-${useId().replace(/:/g, "")}`;
  const duk = "M556,144 C562,147 569,150 574.5,155 L576,168 C570,164 564,162.5 558.6,161.5 Z";
  const kors = "M562,140 C562.6,150 563.2,158 563.6,170 M550,152 C560,154 568,158.5 580,163.5";
  return (
    <g className={s.flagg}>
      <clipPath id={id}>
        <path d={duk} />
      </clipPath>
      <path d={duk} fill="#BA0C2F" />
      <g clipPath={`url(#${id})`}>
        <path d={kors} stroke="#FFFFFF" strokeWidth={4.2} fill="none" />
        <path d={kors} stroke="#00205B" strokeWidth={2.1} fill="none" />
      </g>
    </g>
  );
}

/** One of the two pictures, with the flag over it. */
function Landskap({ bilde, className }: { bilde: (typeof BILDER)[keyof typeof BILDER]; className: string }) {
  return (
    <svg viewBox={`${bilde.x} ${bilde.y} ${bilde.b} ${bilde.h}`} className={className} aria-hidden="true">
      <image href={bilde.src} x={bilde.x} y={bilde.y} width={bilde.b} height={bilde.h} />
      <Flagg />
    </svg>
  );
}

export function OmOss() {
  const redusert = useReducedMotion() ?? false;
  const ref = useRef<HTMLUListElement | null>(null);
  const vist = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <section id="om-oss" aria-labelledby="om-oss-tittel" className="overflow-hidden bg-[var(--color-papir)] pt-[clamp(88px,11vw,152px)]">
      <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-px)]">
        <h2 id="om-oss-tittel" className="font-bold text-[var(--color-glomma-deep)]" style={{ fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 0.95, letterSpacing: "-0.05em" }}>
          Om oss
        </h2>
        <p className="mt-4 max-w-[52ch] text-[17px] leading-[1.6] text-[var(--color-tekst-2)]">{TEKST}</p>

        {/* the three, in a row */}
        <ul ref={ref} className="mx-auto mt-12 grid max-w-[760px] grid-cols-3 gap-3 sm:gap-6 md:mt-16 md:gap-10">
          {PERSONER.map((p, i) => (
            <li key={p.navn} className="flex flex-col items-center text-center">
              <Opp vis={vist} n={i} redusert={redusert} className="relative aspect-[19/28] w-full">
                <Buebilde person={p} sizes="(min-width: 768px) 220px, 30vw" />
              </Opp>
              <div className="mt-3 md:mt-4">
                <Navn person={p} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* the town and the fortress, along the foot of the section */}
      <div className="relative mx-auto mt-6 w-full max-w-[1800px] md:-mt-2">
        <Landskap bilde={BILDER.smal} className="block h-auto w-full md:hidden" />
        <Landskap bilde={BILDER.bred} className="hidden h-auto w-full md:block" />
      </div>
    </section>
  );
}
