"use client";

import { useId, useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { FARGE as F, gran, hus, kurve, rng, sky, type Pt } from "./tegning";
import { Buebilde, Lerret, Navn, Opp, PLASS, plass, type Boks, type Tegning } from "./deler";
import { PERSONER, TEKST } from "./ansatte";
import s from "./omoss.module.css";

/**
 * «Høyden». Kongsvinger festning as the town sees it: high on its green
 * hill, the stone wall with its bastion, the brick gable, the long rust
 * roofs, the yellow block under its pyramid roof, and the flag lifting in
 * the wind, with spruce on the slopes and the old town's houses at the
 * foot. The three at the clinic stand on the slope below in arches with a
 * paper border, as on Ringebu, and stand up one after another as the hill
 * comes into view.
 *
 * The fortress is a drawn file (public/images/tegninger/festning.svg, made
 * by tools/tegn_festning.py) in the coordinates of its reference photo,
 * 800 × 600, cropped to x 40–640, y 135–315. The flag is drawn here, in the
 * same coordinates, so it can wave.
 */

type Festningsplass = { x: number; y: number; k: number };
type Oppsett = Tegning & { festning: Festningsplass; hoyde: Pt[]; eng: number; buer: Boks[]; navn: Boks[]; hus: [number, number, number][] };

/** The fortress file's own box, in its reference photo's coordinates. */
const UTSNITT = { x: 40, y: 135, b: 600, h: 180 } as const;

const BRED: Oppsett = {
  b: 1600,
  h: 680,
  // the buildings' middle (x 400 in the photo) over the hilltop, the wall's foot (y 275) on it
  festning: { x: 800 - (400 - UTSNITT.x) * 1.6, y: 300 - (275 - UTSNITT.y) * 1.6, k: 1.6 },
  hoyde: [[-20, 560], [80, 480], [190, 330], [260, 302], [600, 294], [800, 290], [1000, 294], [1170, 302], [1270, 360], [1420, 480], [1620, 560]],
  eng: 590,
  buer: [420, 800, 1180].map((cx) => ({ x: cx - 95, y: 306, b: 190, h: 280 })),
  navn: [420, 800, 1180].map((cx) => ({ x: cx - 115, y: 600, b: 230, h: 50 })),
  hus: [[60, 560, 0], [150, 572, 1], [250, 558, 2], [1290, 560, 1], [1390, 572, 0], [1490, 556, 2]],
};

const SMAL: Oppsett = {
  b: 800,
  h: 740,
  festning: { x: 400 - (400 - UTSNITT.x) * 1.15, y: 248 - (275 - UTSNITT.y) * 1.15, k: 1.15 },
  hoyde: [[-20, 330], [20, 262], [400, 246], [780, 262], [820, 330]],
  eng: 600,
  buer: [145, 400, 655].map((cx) => ({ x: cx - 100, y: 290, b: 200, h: 300 })),
  navn: [145, 400, 655].map((cx) => ({ x: cx - 115, y: 612, b: 230, h: 76 })),
  hus: [],
};

const HUSFARGER = [
  { vegg: "#B5573E", tak: "#4E3B36" },
  { vegg: "#D9A441", tak: "#5A4639" },
  { vegg: "#ECE8DE", tak: "#4A4643" },
];

/** Norway's flag on the fortress's pole, in the reference photo's coordinates. */
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

function Bakken({ o, className }: { o: Oppsett; className?: string }) {
  const { b: W, h: H } = o;
  const id = useId().replace(/:/g, "");
  const rand = rng(13);
  const midt = W / 2;
  const hoydeY = (x: number) => {
    const p = o.hoyde;
    const j = Math.max(0, p.findIndex(([px]) => px > x) - 1);
    const [x0, y0] = p[j];
    const [x1, y1] = p[j + 1] ?? p[j];
    return y0 + ((y1 - y0) * (x - x0)) / Math.max(1, x1 - x0);
  };
  // spruce down both slopes, below the fortress
  const trær: string[] = [];
  for (let i = 0; i < 26; i++) {
    const side = i % 2 ? 1 : -1;
    const x = midt + side * (W * 0.36 + rand() * W * 0.16);
    const y = hoydeY(x) + 30 + rand() * 40;
    trær.push(gran(x, y, 40 + rand() * 40, undefined, i + 1));
  }
  const f = o.festning;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`himmel-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F3F4F1" />
          <stop offset="1" stopColor="#E0EAEE" />
        </linearGradient>
      </defs>
      <rect width={W} height={o.eng} fill={`url(#himmel-${id})`} />
      <g className={s.sky} style={{ ["--tid" as string]: "50s", ["--vei" as string]: "70px" }}>
        <path d={sky(W * 0.06, H * 0.14, W * 0.13, W * 0.03)} fill={F.hvit} opacity={0.9} />
      </g>
      <g className={s.sky} style={{ ["--tid" as string]: "64s", ["--vei" as string]: "-60px" }}>
        <path d={sky(W * 0.76, H * 0.09, W * 0.15, W * 0.035)} fill={F.hvit} opacity={0.9} />
      </g>
      {/* the hill */}
      <path d={`${kurve(o.hoyde)} L${W + 20},${H} L-20,${H} Z`} fill={F.gronnLys} />
      <path d={`${kurve(o.hoyde.map(([x, y]) => [x, y + 26] as Pt))} L${W + 20},${H} L-20,${H} Z`} fill={F.bjork} opacity={0.45} />
      <path d={trær.join(" ")} fill={F.gran} />
      {/* the fortress, drawn from a photo of it, and its flag */}
      <g transform={`translate(${f.x} ${f.y}) scale(${f.k}) translate(${-UTSNITT.x} ${-UTSNITT.y})`}>
        <image href="/images/tegninger/festning.svg" x={UTSNITT.x} y={UTSNITT.y} width={UTSNITT.b} height={UTSNITT.h} />
        <Flagg />
      </g>
      {/* the old town at the foot of the hill */}
      {o.hus.map(([x, y, c], i) => {
        const h = hus(x, y, 70, 46, 30);
        return (
          <g key={i}>
            <path d={h.vegg} fill={HUSFARGER[c].vegg} />
            <path d={h.tak} fill={HUSFARGER[c].tak} />
            <rect x={x + 26} y={y - 30} width={16} height={18} fill="#F4F1E8" />
          </g>
        );
      })}
      {/* the meadow in front */}
      <path d={`M-20,${o.eng} C${W * 0.3},${o.eng - 14} ${W * 0.7},${o.eng + 10} ${W + 20},${o.eng - 6} L${W + 20},${H} L-20,${H} Z`} fill={F.bjork} />
    </svg>
  );
}

export function OmOss() {
  const redusert = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement | null>(null);
  const vist = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });

  return (
    <section id="om-oss" aria-labelledby="om-oss-tittel" className="bg-[var(--color-papir)] pt-[clamp(88px,11vw,152px)]">
      <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-px)]">
        <h2 id="om-oss-tittel" className="font-bold text-[var(--color-glomma-deep)]" style={{ fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 0.95, letterSpacing: "-0.05em" }}>
          Om oss
        </h2>
        <p className="mt-4 max-w-[52ch] text-[17px] leading-[1.6] text-[var(--color-tekst-2)]">{TEKST}</p>
      </div>
      <div ref={ref} className="mt-6 md:mt-8">
        <Lerret smal={SMAL} bred={BRED}>
          <Bakken o={SMAL} className="absolute inset-0 h-full w-full md:hidden" />
          <Bakken o={BRED} className="absolute inset-0 hidden h-full w-full md:block" />
          <ul className="contents">
            {PERSONER.map((p, i) => (
              <li key={p.navn} className="contents">
                <Opp vis={vist} n={i} redusert={redusert} className={PLASS} style={plass(SMAL.buer[i], SMAL, BRED.buer[i], BRED)}>
                  <Buebilde person={p} sizes="(min-width: 768px) 220px, 28vw" />
                </Opp>
                <div className={`${PLASS} flex flex-col items-center justify-center text-center`} style={plass(SMAL.navn[i], SMAL, BRED.navn[i], BRED)}>
                  <Navn person={p} />
                </div>
              </li>
            ))}
          </ul>
        </Lerret>
      </div>
    </section>
  );
}
