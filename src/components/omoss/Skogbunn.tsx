import type { ReactNode } from "react";
import { SKOG, bakke, kongle, rekke, rng, sopp } from "./skog";
import { Bjork, Bregne, Gran, Stein, Tre, Tue } from "./traer";
import s from "./skog.module.css";

/* «Skogbunnen»: the forest around Kongsvinger, seen from its floor: spruce,
   pine and birch, and at their feet moss, heather, blueberries and
   lingonberries, ferns, stones, cones and mushrooms. */

function Kongle({ x, y, st, v }: { x: number; y: number; st: number; v: number }) {
  const k = kongle(x, y, st, v);
  return (
    <g>
      <path d={k.kropp} fill="#8A5A36" />
      <path d={k.skjell} stroke="#5E3B22" strokeWidth={1} fill="none" />
    </g>
  );
}

function Sopp({ x, y, st, n = 0 }: { x: number; y: number; st: number; n?: number }) {
  const sp = sopp(x, y, st);
  return (
    <g className={s.tue} style={{ ["--n" as string]: n }}>
      <path d={sp.fot} fill="#EDE3CF" />
      <path d={sp.hatt} fill="#7B4E2E" />
      <path d={sp.lys} fill="#9A6740" />
    </g>
  );
}

const f = (v: number) => Math.round(v * 10) / 10;

/**
 * The forest under the three: a far ridge of small pale spruce, a row of
 * spruce and pine in the middle distance, and in front tall spruce, pines
 * and birches on moss and heather, two dark spruces at the edges, and a
 * clearing in the middle where a path comes up out of the paper. Drawn
 * `W` × `H` (wide, or narrower and lower for a phone; every size is drawn
 * for 380 high and scaled). The complete forest is drawn on the server
 * and visible immediately; the paper comes back over its foot.
 */
export function Skogen({ W, H, seed = 11 }: { W: number; H: number; seed?: number }) {
  const k = H / 380;
  const midt = W / 2;
  const id = `skogen-${W}`;
  const grunn = (x: number) => H * 0.8 - 7 * k * Math.sin(x / 110 + seed) - 4 * k * Math.sin(x / 37 + seed * 2);
  const as = (x: number) => H * 0.5 - 18 * k * Math.sin(x / 240 + 1.2) - 8 * k * Math.sin(x / 83);
  const bak = (x: number) => grunn(x) - 30 * k;
  // half the clearing's width
  const lysning = W > 1000 ? W * 0.07 : W * 0.11;
  // the order they stand up in: from the middle out, by distance
  const tur = (x: number, lag: number) => Math.round(lag * 2 + (Math.abs(x - midt) / W) * 12);

  const fjern = rekke({ fra: -20, til: W + 20, steg: 24 * k, bunn: as, hoyde: [56 * k, 96 * k], bredde: 0.5, seed: seed + 1 });
  const midtre = rekke({
    fra: -30,
    til: W + 30,
    steg: 46 * k,
    bunn: bak,
    hoyde: [100 * k, 165 * k],
    bredde: 0.48,
    seed: seed + 2,
    furu: 0.12,
    kant: 0.45,
    midt,
    apen: [midt - lysning * 0.6, midt + lysning * 0.6],
  });
  // the near trees, never so tall they leave the picture
  const naer = rekke({
    fra: 30 * k,
    til: W - 30 * k,
    steg: 96 * k,
    bunn: grunn,
    hoyde: [175 * k, 235 * k],
    bredde: 0.5,
    seed: seed + 3,
    furu: 0.3,
    kant: 0.3,
    midt,
    apen: [midt - lysning * 1.7, midt + lysning * 1.7],
  }).map((t) => ({ ...t, h: Math.min(t.h, grunn(t.x) - 14 * k) }));
  const bjorker = (W > 1000 ? [0.19, 0.33, 0.68, 0.84] : [0.2, 0.8]).map((p) => W * p);
  const kanter = [26 * k, W - 26 * k];

  // the floor in front, sown along the width and kept off the path
  const rand = rng(seed + 4);
  const gulv: { y: number; node: ReactNode }[] = [];
  for (let i = 0, x = 10; x < W - 10; i++, x += 58 * k * (0.7 + rand() * 0.6)) {
    if (Math.abs(x - midt) < 64 * k) continue;
    const y = grunn(x) + (12 + rand() * 30) * k;
    const n = tur(x, 3);
    const valg = rand();
    let node: ReactNode;
    if (valg < 0.26) node = <Tue key={i} x={x} y={y} b={(64 + rand() * 50) * k} h={(20 + rand() * 12) * k} seed={seed + i} art={rand() < 0.5 ? "blabaer" : "lyng"} n={n} />;
    else if (valg < 0.4) node = <Tue key={i} x={x} y={y} b={(50 + rand() * 40) * k} h={(14 + rand() * 8) * k} seed={seed + i} art="mose" n={n} />;
    else if (valg < 0.58) node = <Bregne key={i} x={x} y={y} l={(56 + rand() * 40) * k} retning={x < midt ? 1 : -1} seed={seed + i} n={n} />;
    else if (valg < 0.68) node = <Tue key={i} x={x} y={y} b={(44 + rand() * 30) * k} h={14 * k} seed={seed + i} art="tyttebaer" n={n} />;
    else if (valg < 0.8) node = <Stein key={i} x={x} y={y + 4 * k} b={(30 + rand() * 34) * k} seed={seed + i} />;
    else if (valg < 0.9) node = <Sopp key={i} x={x} y={y} st={(13 + rand() * 8) * k} n={n} />;
    else node = <Kongle key={i} x={x} y={y - 3 * k} st={8 * k} v={(rand() - 0.5) * 0.8} />;
    gulv.push({ y, node });
  }
  gulv.sort((a, b) => a.y - b.y);

  // the path: from the clearing down out of the picture, wider as it comes nearer
  const g0 = grunn(midt) + 4 * k;
  const sti = `M${f(midt - 9 * k)},${f(g0)} C${f(midt - 16 * k)},${f(g0 + 26 * k)} ${f(midt - 58 * k)},${f(H - 26 * k)} ${f(midt - 112 * k)},${f(H + 4)} L${f(midt + 124 * k)},${f(H + 4)} C${f(midt + 70 * k)},${f(H - 26 * k)} ${f(midt + 18 * k)},${f(g0 + 26 * k)} ${f(midt + 9 * k)},${f(g0)} Z`;
  const stiLys = `M${f(midt - 2 * k)},${f(g0 + 6 * k)} C${f(midt - 6 * k)},${f(g0 + 30 * k)} ${f(midt - 24 * k)},${f(H - 24 * k)} ${f(midt - 50 * k)},${f(H + 4)} L${f(midt + 40 * k)},${f(H + 4)} C${f(midt + 22 * k)},${f(H - 24 * k)} ${f(midt + 8 * k)},${f(g0 + 30 * k)} ${f(midt + 3 * k)},${f(g0 + 6 * k)} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" className="absolute inset-0 size-full" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-fot`} x1="0" y1="0" x2="0" y2="1">
          <stop offset={0.86} style={{ stopColor: "var(--color-papir)", stopOpacity: 0 }} />
          <stop offset="1" style={{ stopColor: "var(--color-papir)", stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* far off: a ridge, its spruce small and pale */}
      <path d={bakke(-20, W + 20, (x) => as(x) + 6 * k, H + 4, 40)} fill={SKOG.fjern[1]} />
      {fjern.map((t) => (
        <Tre key={`f${t.x}`} {...t} tone={SKOG.fjern} n={tur(t.x, 0)} />
      ))}

      {/* the middle distance */}
      <path d={bakke(-20, W + 20, (x) => bak(x) + 4 * k, H + 4, 34)} fill={SKOG.gress[0]} />
      {midtre.map((t) => (
        <Tre key={`m${t.x}`} {...t} tone={SKOG.midt} n={tur(t.x, 1)} />
      ))}

      {/* near: they stand in the moss, their feet hidden in the grass */}
      <path d={bakke(-20, W + 20, grunn, H + 4, 28)} fill={SKOG.mose[1]} opacity={0.55} />
      {naer.map((t, i) => (
        <Tre key={`n${t.x}`} {...t} tone={SKOG.naer} n={tur(t.x, 2)} skygge vind={i % 3 === 1} />
      ))}
      {bjorker.map((x, i) => (
        <Bjork key={`b${x}`} x={x} y={grunn(x) + 10 * k} h={(190 + (i % 2) * 24) * k} w={86 * k} seed={seed * 9 + i} n={tur(x, 2)} skygge vind />
      ))}
      {kanter.map((x, i) => (
        <Gran key={`k${x}`} x={x} y={grunn(x) + 14 * k} h={Math.min(292 * k, grunn(x) - 8 * k)} w={150 * k} seed={seed * 7 + i} tone={SKOG.naermest} n={tur(x, 2)} skygge />
      ))}
      <path d={bakke(-20, W + 20, (x) => grunn(x) + 10 * k, H + 4, 28)} fill={SKOG.gress[1]} />

      <path d={sti} fill={SKOG.sti[0]} />
      <path d={stiLys} fill={SKOG.sti[1]} />
      {gulv.map((g) => g.node)}

      <rect x={-20} y={0} width={W + 40} height={H + 4} fill={`url(#${id}-fot)`} />
    </svg>
  );
}
