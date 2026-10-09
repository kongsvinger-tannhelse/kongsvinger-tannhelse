import type { ReactNode } from "react";
import { SKOG, bakke, kongle, rng, sopp } from "./skog";
import { Bregne, Gran, Stein, Tue } from "./traer";
import s from "./skog.module.css";

/* «Skogbunnen»: the forest seen low down, where you would sit on a stone:
   moss, heather, blueberries and lingonberries, ferns, a stone, cones, a
   mushroom, and young spruce. */

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

/**
 * A strip of forest floor, `W` × `H`, its ground line a little uneven. What
 * grows on it is sown by `seed`, and kept off the middle third when `fri`
 * (so a row of portraits can stand there).
 */
export function Bunn({ W, H, seed, fri = false }: { W: number; H: number; seed: number; fri?: boolean }) {
  const rand = rng(seed);
  const grunn = (x: number) => H * 0.62 - 6 * Math.sin(x / 90 + seed) - 4 * Math.sin(x / 31 + seed * 2);
  const ting: ReactNode[] = [];
  const n = Math.round(W / 85);
  for (let i = 0; i < n; i++) {
    const x = (W * (i + 0.5)) / n + (rand() - 0.5) * 40;
    if (fri && x > W * 0.3 && x < W * 0.7) continue;
    const y = grunn(x) + 6;
    const valg = rand();
    const tur = i % 7;
    if (valg < 0.28) ting.push(<Tue key={i} x={x} y={y} b={60 + rand() * 50} h={20 + rand() * 12} seed={seed + i} art={rand() < 0.5 ? "blabaer" : "lyng"} n={tur} />);
    else if (valg < 0.45) ting.push(<Tue key={i} x={x} y={y} b={50 + rand() * 40} h={14 + rand() * 8} seed={seed + i} art="mose" n={tur} />);
    else if (valg < 0.6) ting.push(<Bregne key={i} x={x} y={y} l={50 + rand() * 40} retning={rand() < 0.5 ? 1 : -1} seed={seed + i} n={tur} />);
    else if (valg < 0.7) ting.push(<Tue key={i} x={x} y={y} b={44 + rand() * 30} h={14} seed={seed + i} art="tyttebaer" n={tur} />);
    else if (valg < 0.8) ting.push(<Stein key={i} x={x} y={y + 4} b={34 + rand() * 30} seed={seed + i} />);
    else if (valg < 0.88) ting.push(<Sopp key={i} x={x} y={y} st={14 + rand() * 8} n={tur} />);
    else if (valg < 0.95) ting.push(<Gran key={i} x={x} y={y} h={60 + rand() * 30} w={32 + rand() * 10} seed={seed + i} tone={SKOG.naer} n={tur} />);
    else ting.push(<Kongle key={i} x={x} y={y - 4} st={8} v={(rand() - 0.5) * 0.8} />);
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" className="absolute inset-0 size-full" aria-hidden="true">
      <defs>
        <linearGradient id={`bunn-${seed}-${W}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset={H * 0.72 / H} style={{ stopColor: "var(--color-papir)", stopOpacity: 0 }} />
          <stop offset="1" style={{ stopColor: "var(--color-papir)", stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <path d={bakke(-20, W + 20, grunn, H + 4, 30)} fill={SKOG.mose[1]} opacity={0.55} />
      <path d={bakke(-20, W + 20, (x) => grunn(x) + 10, H + 4, 30)} fill={SKOG.gress[1]} />
      {ting}
      <rect x={-20} y={0} width={W + 40} height={H + 4} fill={`url(#bunn-${seed}-${W})`} />
    </svg>
  );
}

/**
 * A small grove on the same forest floor as the strips, for beside the
 * welcome: spruces of different heights cut from paper in two tones, the
 * ones further back paler, and at their feet moss, heather, berries, ferns,
 * a stone, a mushroom and a cone. No frame and no sky: the ground thins out
 * at both ends and fades into the paper below. Drawn 560 × 420.
 */
export function Lund({ className }: { className?: string }) {
  const W = 560;
  const H = 420;
  const grunn = (x: number) => 336 - 8 * Math.sin(x / 80 + 1.3) - 4 * Math.sin(x / 27);
  // [x, height, width] of each spruce, back row first
  const bak = [
    [176, 250, 104],
    [318, 300, 120],
    [452, 262, 110],
  ] as const;
  const fram = [
    [104, 160, 76],
    [248, 214, 98],
    [390, 182, 88],
    [482, 136, 68],
  ] as const;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} aria-hidden="true">
      <defs>
        <linearGradient id="lund-ender" x1="0" y1="0" x2={W} y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.18" stopColor="#fff" />
          <stop offset="0.84" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="lund-maske" maskUnits="userSpaceOnUse" x={0} y={0} width={W} height={H}>
          <rect width={W} height={H} fill="url(#lund-ender)" />
        </mask>
        <linearGradient id="lund-bunn" x1="0" y1="0" x2="0" y2="1">
          <stop offset={0.84} style={{ stopColor: "var(--color-papir)", stopOpacity: 0 }} />
          <stop offset="1" style={{ stopColor: "var(--color-papir)", stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* the floor, thinning out at both ends; the trees stand in its moss, their feet in the grass */}
      <path d={bakke(0, W, grunn, H + 4, 28)} fill={SKOG.mose[1]} opacity={0.55} mask="url(#lund-maske)" />
      {bak.map(([x, h, w], i) => (
        <Gran key={x} x={x} y={grunn(x) + 12} h={h} w={w} seed={510 + i} tone={SKOG.midt} n={i} />
      ))}
      {fram.map(([x, h, w], i) => (
        <Gran key={x} x={x} y={grunn(x) + 14} h={h} w={w} seed={530 + i} tone={SKOG.naer} n={i + 3} skygge vind={i % 2 === 1} />
      ))}
      <path d={bakke(0, W, (x) => grunn(x) + 10, H + 4, 28)} fill={SKOG.gress[1]} mask="url(#lund-maske)" />
      <Tue x={112} y={grunn(112) + 24} b={58} h={16} seed={541} art="mose" n={7} />
      <Bregne x={150} y={grunn(150) + 24} l={70} retning={-1} seed={542} n={8} />
      <Tue x={196} y={grunn(196) + 26} b={84} h={26} seed={543} art="blabaer" n={8} />
      <Sopp x={290} y={grunn(290) + 30} st={18} n={9} />
      <Stein x={334} y={grunn(334) + 34} b={58} seed={544} />
      <Tue x={420} y={grunn(420) + 28} b={92} h={24} seed={545} art="lyng" n={9} />
      <Kongle x={372} y={grunn(372) + 40} st={8} v={0.3} />
      <Tue x={462} y={grunn(462) + 32} b={60} h={14} seed={546} art="tyttebaer" n={10} />
      <Bregne x={500} y={grunn(500) + 26} l={56} retning={1} seed={547} n={10} />
      <rect x={-20} y={0} width={W + 40} height={H + 4} fill="url(#lund-bunn)" />
    </svg>
  );
}
