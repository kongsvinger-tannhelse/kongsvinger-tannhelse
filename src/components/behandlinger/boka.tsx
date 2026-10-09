import type { CSSProperties } from "react";
import { Vis } from "@/components/artikler/deler";
import { BLEKK, STEIN } from "@/components/artikler/tegninger";
import s from "@/components/artikler/artikler.module.css";
import { PINFARGE } from "./punkter";
import { cn } from "@/lib/utils";

/*
 * «Behandlingsboka»: the book of treatments, closed, lying on the table in
 * the top's empty corner. A pen drawing in the «Råd og tips» kit: its lines
 * draw themselves once it is seen, then the ink fills in. On the cover is
 * Kongsvinger festning from above, the star of its bastions, traced from
 * OpenStreetMap (the same outline as the drawn map on /kontakt), and the
 * ribbon's tail hangs out at the bottom, like the bookmark in the book below.
 *
 * Drawn in a parallel view, so every face is a plain affine map: the cover
 * (320 × 250), the pages' edge in front (320 × 22) and the table it lies on.
 * Server-safe: no hooks, plain numbers worked out once.
 */

type P = readonly [number, number];

const r1 = (n: number) => Math.round(n * 10) / 10;
const pt = ([x, y]: P) => `${r1(x)},${r1(y)}`;

/** The cover's back left corner, its two sides, and the book's thickness below it. */
const A: P = [100, 80];
const U: P = [320, -30];
const V: P = [12, 250];
const T: P = [14, 22];
const BRED = 320;
const HOY = 250;
const TYKK = 22;

/** The affine map from a face's own units to the drawing's. */
const flate =
  (o: P, x: P, y: P) =>
  ([a, b]: P): P => [o[0] + a * x[0] + b * y[0], o[1] + a * x[1] + b * y[1]];
const enhet = (v: P, n: number): P => [v[0] / n, v[1] / n];
const matrise = (o: P, x: P, y: P) => `matrix(${[x[0], x[1], y[0], y[1], o[0], o[1]].map((n) => r1(n * 1000) / 1000).join(" ")})`;

const D: P = [A[0] + V[0], A[1] + V[1]];
/** The cover, in units across from the spine and down from the back edge. */
const OMSLAG = matrise(A, enhet(U, BRED), enhet(V, HOY));
/** The pages' edge facing us, in units across and down. */
const forkant = flate(D, enhet(U, BRED), enhet(T, TYKK));
/** The table, in units across and forward from the book's front edge. */
const bord = flate([D[0] + T[0], D[1] + T[1]], enhet(U, BRED), enhet(V, HOY));
/** The pages' edge on the right, in units down from the back and in from the cover. */
const hogrekant = flate([A[0] + U[0], A[1] + U[1]], enhet(V, HOY), enhet(T, TYKK));

const sti = (punkter: P[]) => punkter.map((p, i) => `${i ? "L" : "M"}${pt(p)}`).join(" ");

/* ── The fortress, from OpenStreetMap: the fort's way, in the map's units (2 m), north up ── */

const FESTNING: P[] = [
  [339.1, -447.5], [348, -453.7], [344.4, -467.5], [361.2, -465.9], [366.2, -478], [381.4, -462.5], [395.5, -469.6], [398.8, -459.6], [411.3, -458.6],
  [410.5, -449.9], [406.9, -448.3], [407.3, -433], [414.8, -429.5], [423, -412.3], [420.1, -406.7], [394.2, -419.5], [371, -407.7], [365.5, -430.6], [353.4, -437.6],
];
/** Where on the cover, and how big. */
const FORT_MIDT: P = [166, 150];
const FORT_SKALA = 1.62;
const FORT_SENTER: P = [381, -442.4];
const fort = FESTNING.map(([x, y]): P => [FORT_MIDT[0] + (x - FORT_SENTER[0]) * FORT_SKALA, FORT_MIDT[1] + (y - FORT_SENTER[1]) * FORT_SKALA]);

const innenfor = ([x, y]: P, poly: P[]) => {
  let inn = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inn = !inn;
  }
  return inn;
};

/** Short strokes out from the walls, as a map draws the slopes. */
const SKRAVUR = fort
  .map((p, i) => {
    const q = fort[(i + 1) % fort.length];
    const lengde = Math.hypot(q[0] - p[0], q[1] - p[1]);
    const [tx, ty] = [(q[0] - p[0]) / lengde, (q[1] - p[1]) / lengde];
    const midt: P = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
    // the side of the wall that is outside
    const ut = innenfor([midt[0] + ty, midt[1] - tx], fort) ? -1 : 1;
    const [nx, ny] = [ty * ut, -tx * ut];
    const deler: string[] = [];
    for (let d = 2.6; d < lengde - 2; d += 4.2) {
      const [x, y] = [p[0] + tx * d, p[1] + ty * d];
      deler.push(`M${pt([x + nx * 1.6, y + ny * 1.6])} L${pt([x + nx * 6.2, y + ny * 6.2])}`);
    }
    return deler.join(" ");
  })
  .join(" ");

/* ── The ribbon's tail: out between the pages, over the edge and onto the table ── */

const BAAND = PINFARGE.ordinaer;
const baand = [
  `M${pt(forkant([111.5, 8]))} L${pt(forkant([111.5, TYKK]))}`,
  `C${pt(bord([110, 24]))} ${pt(bord([130, 52.5]))} ${pt(bord([178, 52.5]))}`,
  `L${pt(bord([188, 52.6]))} L${pt(bord([179, 46]))} L${pt(bord([188, 39.4]))} L${pt(bord([178, 39.5]))}`,
  `C${pt(bord([138, 39.5]))} ${pt(bord([123.5, 18]))} ${pt(bord([124.5, 0]))}`,
  `L${pt(forkant([124.5, 8]))} Z`,
].join(" ");

/* ── The pages' edges: the boards, and the leaves between them ── */

/** A board's edge, across the front and up the right side to the back. */
const kant = (y: number) => sti([forkant([0, y]), forkant([BRED, y]), hogrekant([0, y])]);
const PERM = [kant(3.4), kant(18.6)];
/** The leaves between the boards: lines of uneven length, in front and on the right. */
const BLAD = [
  [7.6, 6, 3, 6],
  [10.2, 2, 10, 3],
  [12.8, 9, 5, 9],
  [15.4, 4, 14, 4],
].flatMap(([y, fra, bak, foran]) => [sti([forkant([fra, y]), forkant([BRED - 1.5, y])]), sti([hogrekant([HOY - foran, y]), hogrekant([bak, y])])]);

/* ── Its shadow on the table, hatched, in front and to the right, thinning out at the ends ── */

const SKYGGEFLATE = `${sti([bord([18, 0]), bord([BRED, 0]), bord([BRED, -HOY + 14]), bord([BRED + 15, -HOY + 40]), bord([BRED + 15, 13]), bord([40, 13])])} Z`;
const SKYGGE = (() => {
  // lines at 45° on the drawing, close together, through the whole corner
  const [x0, y0] = bord([0, 0]);
  const [x1] = bord([BRED + 20, 0]);
  const deler: string[] = [];
  for (let x = x0 - 40; x < x1 + 20; x += 4.6) deler.push(`M${pt([x, y0 + 24])} L${pt([x + 300, y0 - 276])}`);
  return deler.join(" ");
})();

/** The cover's edge, the spine side bowed a little, the other corners just rounded. */
const OMSLAGSKANT = `M0,0 H${BRED - 4} Q${BRED},0 ${BRED},4 V${HOY - 4} Q${BRED},${HOY} ${BRED - 4},${HOY} H0 Q-6,${HOY / 2} 0,0 Z`;
/** Both edges of the pages, as one piece of paper. */
const KANTFLATE = `M${pt(forkant([0, 0]))} L${pt(forkant([BRED, 0]))} L${pt(hogrekant([0, 0]))} L${pt(hogrekant([0, TYKK]))} L${pt(forkant([BRED, TYKK]))} L${pt(forkant([0, TYKK]))} Q${pt(forkant([-7, TYKK / 2]))} ${pt(forkant([0, 0]))} Z`;
/** The paper comes in with the first lines (the ink's fade waits 0.9 s, so this starts it at 0.3 s), not before them. */
const PAPIR = -0.6;

/** The book, drawn. `className` sizes it. */
export function Behandlingsboka({ className }: { className?: string }) {
  const tid = (t: number) => ({ "--forsink": `${t}s` }) as CSSProperties;
  const pen = { fill: "none", stroke: BLEKK, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, pathLength: 1, className: s.strek };

  return (
    <svg viewBox="76 30 400 380" className={className} aria-hidden="true">
      <defs>
        <clipPath id="boka-skygge">
          <path d={SKYGGEFLATE} />
        </clipPath>
      </defs>
      {/* the shadow under it */}
      <g clipPath="url(#boka-skygge)">
        <path d={SKYGGE} {...pen} stroke={STEIN} strokeWidth={1} style={tid(1.7)} />
      </g>

      {/* the pages' edges, in front and on the right */}
      <path d={KANTFLATE} fill="#F3EDDE" className={s.blekk} style={tid(PAPIR)} />
      <g style={tid(0.5)}>
        {BLAD.map((d) => (
          <path key={d} d={d} {...pen} stroke={STEIN} strokeWidth={0.9} />
        ))}
      </g>
      <g style={tid(0.35)}>
        {PERM.map((d) => (
          <path key={d} d={d} {...pen} strokeWidth={1.4} />
        ))}
      </g>
      <path
        d={`M${pt(hogrekant([0, 0]))} L${pt(hogrekant([0, TYKK]))} L${pt(forkant([BRED, TYKK]))} L${pt(forkant([0, TYKK]))} Q${pt(forkant([-7, TYKK / 2]))} ${pt(forkant([0, 0]))} M${pt(forkant([BRED, 0]))} L${pt(forkant([BRED, TYKK]))}`}
        {...pen}
        strokeWidth={2.4}
        style={tid(0.2)}
      />

      {/* the ribbon's tail */}
      <path d={baand} fill="#FFFDF8" className={s.blekk} style={tid(1.5)} />
      <path d={baand} fill={BAAND} fillOpacity={0.88} className={s.blekk} style={tid(1.5)} />
      <path d={baand} {...pen} strokeWidth={1.8} style={tid(1.5)} />

      {/* the cover */}
      <g transform={OMSLAG}>
        <path d={OMSLAGSKANT} fill="#FFFDF8" className={s.blekk} style={tid(PAPIR)} />
        <path d={OMSLAGSKANT} {...pen} strokeWidth={2.4} style={tid(0)} />
        {/* the hinge by the spine, and the frame pressed into the cloth */}
        <g style={tid(0.7)}>
          <path d={`M17,2 Q14,${HOY / 2} 17,${HOY - 2}`} {...pen} strokeWidth={1.5} />
          <rect x={32} y={18} width={270} height={214} rx={3} {...pen} strokeWidth={1.3} stroke={STEIN} />
        </g>

        {/* the title, lettered in ink */}
        <text x={167} y={66} textAnchor="middle" fontSize={25} fontWeight={700} letterSpacing={-0.7} fill={BLEKK} className={s.blekk} style={tid(1.1)}>
          Behandlingsboka
        </text>
        <path d="M147,82 H187" {...pen} strokeWidth={1.4} style={tid(1)} />

        {/* Kongsvinger festning, seen from above */}
        <path d={`${sti(fort)} Z`} fill="#EAE3D0" className={s.blekk} style={tid(1.2)} />
        <path d={SKRAVUR} {...pen} stroke={STEIN} strokeWidth={1.1} style={tid(1.3)} />
        <path d={`${sti(fort)} Z`} {...pen} strokeWidth={1.9} style={tid(1)} />
      </g>
    </svg>
  );
}

/** The drawing in the top's empty corner, drawn when it is seen. Wide screens only. */
export function Boktegning({ className }: { className?: string }) {
  return (
    <Vis className={cn("pointer-events-none select-none", className)}>
      <Behandlingsboka className="h-auto w-full" />
    </Vis>
  );
}
