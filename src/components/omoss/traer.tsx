import type { CSSProperties } from "react";
import { SKOG, bjork, bregne, furu, gran, prikker, stein, tue, type Tone } from "./skog";
import s from "./skog.module.css";

/* The forest's pieces as SVG, drawn from the kit in skog.ts. No hooks, so
   they draw the same on the server and in the browser. Each tree stands up
   from its foot when its forest gets `data-vis="ja"` (see skog.module.css);
   `n` sets its turn. */

type Felles = { x: number; y: number; h: number; w: number; seed: number; n?: number; vind?: boolean; skygge?: boolean; utenStamme?: boolean };

/** A paper tree's shadow: the same cut, dark, a little down and right. Cheaper than an SVG filter. */
const SKYGGE = { fill: "#14251C", opacity: 0.2 } as const;
const forskyv = (w: number) => `translate(${Math.max(1.5, w * 0.025).toFixed(1)} ${Math.max(2, w * 0.04).toFixed(1)})`;

const tur = (n = 0): CSSProperties => ({ ["--n" as string]: n });

export function Gran({ x, y, h, w, seed, tone, n, vind, skygge, utenStamme }: Felles & { tone: Tone }) {
  const g = gran(x, y, h, w, seed);
  return (
    <g className={vind ? `${s.tre} ${s.vind}` : s.tre} style={tur(n)}>
      {skygge && <path d={`${g.skygge} ${g.lys}`} transform={forskyv(w)} {...SKYGGE} />}
      {!utenStamme && <path d={g.stamme} fill={SKOG.stamme} />}
      <path d={g.skygge} fill={tone[0]} />
      <path d={g.lys} fill={tone[1]} />
    </g>
  );
}

export function Furu({ x, y, h, w, seed, tone, n, vind, skygge }: Felles & { tone: Tone }) {
  const f = furu(x, y, h, w, seed);
  return (
    <g className={vind ? `${s.tre} ${s.vind}` : s.tre} style={tur(n)}>
      {skygge && <path d={f.skyer.map((k) => k.skygge).join(" ")} transform={forskyv(w * 2)} {...SKYGGE} />}
      <path d={f.stamme} fill={SKOG.furustamme} />
      <path d={f.greiner} stroke={SKOG.furustamme} strokeWidth={Math.max(1.2, w * 0.022)} strokeLinecap="round" fill="none" />
      {f.skyer.map((k, i) => (
        <g key={i}>
          <path d={k.skygge} fill={tone[0]} />
          <path d={k.lys} fill={tone[1]} />
        </g>
      ))}
    </g>
  );
}

export function Bjork({ x, y, h, w, seed, n, vind, skygge }: Felles) {
  const b = bjork(x, y, h, w, seed);
  return (
    <g className={vind ? `${s.tre} ${s.vind}` : s.tre} style={tur(n)}>
      {skygge && <path d={b.krone.map((k) => k.skygge).join(" ")} transform={forskyv(w * 2)} {...SKYGGE} />}
      <path d={b.stamme} fill={SKOG.bjorkestamme} />
      <path d={b.merker} stroke={SKOG.bjorkemerke} strokeWidth={Math.max(1, w * 0.018)} strokeLinecap="round" />
      {b.krone.map((k, i) => (
        <g key={i}>
          <path d={k.skygge} fill={SKOG.bjorkelauv[0]} />
          <path d={k.lys} fill={SKOG.bjorkelauv[1]} />
        </g>
      ))}
    </g>
  );
}

/** A tree of either kind, as `rekke()` hands them out. */
export function Tre({ art, tone, ...t }: Felles & { art: "gran" | "furu"; tone: Tone }) {
  return art === "furu" ? <Furu {...t} tone={tone} /> : <Gran {...t} tone={tone} />;
}

export function Tue({ x, y, b, h, seed, art, n }: { x: number; y: number; b: number; h: number; seed: number; art: "lyng" | "blabaer" | "tyttebaer" | "mose"; n?: number }) {
  const farge = art === "mose" ? SKOG.mose[0] : art === "lyng" ? SKOG.lyng : "#56744C";
  const prikk = art === "lyng" ? SKOG.lyngblomst : art === "blabaer" ? SKOG.blabaer : SKOG.tyttebaer;
  return (
    <g className={s.tue} style={tur(n)}>
      <path d={tue(x, y, b, h, seed)} fill={farge} />
      <path d={tue(x + b * 0.08, y - h * 0.12, b * 0.6, h * 0.62, seed + 1)} fill={art === "mose" ? SKOG.mose[1] : "#6E8C5E"} />
      {art !== "mose" &&
        prikker(x, y, b, h, Math.round(b / (art === "lyng" ? 6 : 10)), seed + 2).map(([px, py], i) => (
          <circle key={i} cx={px} cy={py} r={art === "lyng" ? 1.6 : 2.4} fill={prikk} />
        ))}
    </g>
  );
}

export function Bregne({ x, y, l, retning, seed, n }: { x: number; y: number; l: number; retning: 1 | -1; seed: number; n?: number }) {
  const b = bregne(x, y, l, retning, seed);
  return (
    <g className={`${s.tue} ${s.vind}`} style={tur(n)}>
      <path d={b.blad} fill="#6F9258" />
      <path d={b.spine} stroke="#56744C" strokeWidth={1.4} fill="none" strokeLinecap="round" />
    </g>
  );
}

export function Stein({ x, y, b, seed }: { x: number; y: number; b: number; seed: number }) {
  const st = stein(x, y, b, seed);
  return (
    <g>
      <path d={st.stein} fill={SKOG.stein[0]} />
      <path d={st.lys} fill={SKOG.stein[1]} />
    </g>
  );
}
