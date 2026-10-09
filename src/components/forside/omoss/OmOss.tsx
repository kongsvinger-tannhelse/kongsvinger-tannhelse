"use client";

import { useId, useRef, type CSSProperties } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Buebilde, Navn, Opp } from "./deler";
import { PERSONER, TEKST } from "./ansatte";
import { Punkter } from "./punkter";
import s from "./omoss.module.css";

/**
 * «Om oss». The three at the clinic stand in a row in arches with a paper
 * border, as on Ringebu, and stand up one after another as they come into
 * view. Under them, what the clinic stands for, in three short lines. Then, along the foot of the section, the town as it is seen
 * from across the valley: Kongsvinger festning on its hill (the stone wall
 * and bastion, the brick gable, the rust roofs, the yellow block, the flag
 * lifting in the wind), the summer trees on the slope and the old town's
 * painted houses below, under an afternoon sky: the page's pale teal deepens
 * into blue towards the hill, with the sun high on the right.
 *
 * The landscape is drawn by tools/tegn_landskap.py from a photograph used as
 * a reference, and saved as two pictures: a wide one whose hill and town
 * carry on to both sides, and a narrow one for phones. A <picture> picks one,
 * so a screen only downloads its own. Both are in the photo's own
 * coordinates (800 × 600), so the flag is drawn here, in the same
 * coordinates, over the picture.
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

/** The flag over one of the two crops, in that crop's box. */
function Flaggstang({ bilde, className }: { bilde: (typeof BILDER)[keyof typeof BILDER]; className: string }) {
  return (
    <svg viewBox={`${bilde.x} ${bilde.y} ${bilde.b} ${bilde.h}`} className={className}>
      <Flagg />
    </svg>
  );
}

/**
 * The landscape: the narrow crop on phones, the wide one from md up. The box
 * takes each crop's own shape, so the flag's drawing sits exactly on the
 * picture. (A <picture>, not next/image: next/image can't switch crops.)
 */
function Landskap() {
  const { bred, smal } = BILDER;
  return (
    <div aria-hidden="true" className="relative aspect-[540/482] w-full md:aspect-[1600/482]">
      <picture>
        <source media="(min-width: 768px)" srcSet={bred.src} />
        <img src={smal.src} alt="" loading="lazy" decoding="async" className="absolute inset-0 size-full" />
      </picture>
      <Flaggstang bilde={smal} className="absolute inset-0 size-full md:hidden" />
      <Flaggstang bilde={bred} className="absolute inset-0 hidden size-full md:block" />
    </div>
  );
}

export function OmOss() {
  const redusert = useReducedMotion() ?? false;
  const ref = useRef<HTMLUListElement | null>(null);
  const vist = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <section id="om-oss" aria-labelledby="om-oss-tittel" className="relative isolate overflow-hidden bg-[var(--color-papir)] pt-[clamp(32px,3.5vw,48px)]">
      <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-px)]">
        <h2 id="om-oss-tittel" className="sr-only">
          Om oss
        </h2>
        <p className="seksjonsinngang">{TEKST}</p>

        {/* the three, in a row */}
        <ul ref={ref} className="mx-auto mt-10 grid max-w-[760px] grid-cols-3 gap-3 sm:gap-6 md:mt-12 md:gap-10">
          {PERSONER.map((p, i) => (
            <li key={p.navn} className="flex flex-col items-center text-center">
              <Opp vis={vist} n={i} redusert={redusert} className="relative aspect-[19/28] w-full">
                <Buebilde person={p} kolonne={{ px: 230, vw: 30 }} />
              </Opp>
              <div className="mt-3 md:mt-4">
                <Navn person={p} />
              </div>
            </li>
          ))}
        </ul>

        {/* what the clinic stands for */}
        <Punkter className="mx-auto mt-10 grid max-w-[960px] gap-8 sm:grid-cols-3 sm:gap-8 md:mt-14 md:gap-12" />
      </div>

      {/* the town and the fortress, along the foot of the section, with open sky
          above them; the sky starts up behind the three lines (under the words)
          and runs down behind the hill to about half the picture's height,
          where the hill is lowest at the sides */}
      <div className="relative mx-auto mt-[var(--luft)] w-full" style={{ "--luft": "clamp(72px, 9vw, 160px)" } as CSSProperties}>
        <div aria-hidden="true" className={`${s.himmel} pointer-events-none absolute inset-x-0 -top-[clamp(220px,24vw,420px)] bottom-1/2 -z-10`} />
        <span aria-hidden="true" className={s.sol} />
        <Landskap />
        {/* the foot of the trees goes into shadow, into the dark band below */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-[9%] bg-linear-to-b from-transparent to-[var(--color-glomma-deep)]" />
      </div>
    </section>
  );
}
