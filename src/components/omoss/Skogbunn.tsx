import type { ReactNode } from "react";
import { lauv } from "@/components/forside/behandlinger/popup/tegning";
import { SKOG, bakke, kongle, rng, sopp, stamme } from "./skog";
import { Bregne, Gran, Stein, Tue } from "./traer";
import s from "./skog.module.css";

/* «Skogbunnen»: the forest seen low down, where you would sit on a stone.
   The trunks rise out of the picture; on the floor, moss, heather,
   blueberries and lingonberries, ferns, a stone, cones and a mushroom. */

function Stamme({ x, bunn, topp, w, art, seed, n = 0 }: { x: number; bunn: number; topp: number; w: number; art: "gran" | "furu" | "bjork"; seed: number; n?: number }) {
  const st = stamme(x, bunn, topp, w, art, seed);
  const farge = art === "gran" ? ["#5B5047", "#6F6358"] : art === "furu" ? [SKOG.furustamme, SKOG.furustammeLys] : [SKOG.bjorkestamme, "#FFFFFF"];
  const strek = art === "gran" ? "#4A4038" : art === "furu" ? "#6E4329" : SKOG.bjorkemerke;
  return (
    <g className={s.tre} style={{ ["--n" as string]: n }}>
      {st.kvister && <path d={st.kvister} stroke="#5B5047" strokeWidth={Math.max(1, w * 0.035)} fill="none" strokeLinecap="round" />}
      <path d={st.form} fill={farge[0]} />
      <path d={st.lys} fill={farge[1]} opacity={art === "bjork" ? 0.7 : 1} />
      <path d={st.merker} stroke={strek} strokeWidth={art === "bjork" ? Math.max(2.4, w * 0.13) : 1.2} fill="none" strokeLinecap="round" opacity={art === "bjork" ? 0.9 : 0.55} />
    </g>
  );
}

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
 * The view into the forest for the arched window at the top: three trunks
 * going up out of it (a spruce, a pine, a birch), young spruce, light from
 * the upper right, and the floor at the foot. Drawn 480 × 600.
 */
export function Skogsbilde() {
  const grunn = (x: number) => 520 - 18 * Math.sin(x / 70 + 1) - 10 * Math.sin(x / 23);
  return (
    <svg viewBox="0 0 480 600" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 size-full" aria-hidden="true">
      <defs>
        <linearGradient id="c-luft" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E7EDE2" />
          <stop offset="0.55" stopColor="#F4F0DE" />
          <stop offset="1" stopColor="#F7F0DA" />
        </linearGradient>
        <linearGradient id="c-straale" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFF8E2" stopOpacity="0.9" />
          <stop offset="1" stopColor="#FFF8E2" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="480" height="600" fill="url(#c-luft)" />

      {/* the forest behind, pale */}
      {[30, 90, 150, 230, 300, 360, 430].map((x, i) => (
        <Gran key={x} x={x} y={grunn(x) - 30} h={260 + (i % 3) * 50} w={120} seed={300 + i} tone={SKOG.fjern} n={i} utenStamme />
      ))}
      {[60, 200, 340, 420].map((x, i) => (
        <Gran key={x} x={x} y={grunn(x) - 8} h={200 + (i % 2) * 60} w={110} seed={400 + i} tone={SKOG.midt} n={i + 2} skygge />
      ))}

      <path d="M480,0 L380,0 L150,600 L480,600 Z" fill="url(#c-straale)" className={s.strale} />

      {/* the trunks */}
      <Stamme x={92} bunn={grunn(92) + 14} topp={-10} w={46} art="gran" seed={7} n={5} />
      <Stamme x={282} bunn={grunn(282) + 16} topp={-10} w={40} art="furu" seed={8} n={6} />
      <Stamme x={404} bunn={grunn(404) + 12} topp={-10} w={26} art="bjork" seed={9} n={7} />

      {/* the pine's crown, coming in at the top */}
      <g className={s.tre} style={{ ["--n" as string]: 8 }}>
        {[
          [250, 22, 70, 26], [318, 8, 80, 28], [372, 40, 60, 22], [206, -4, 64, 24], [290, 54, 56, 20], [430, 6, 70, 26],
        ].map(([cx, cy, rx, ry], i) => (
          <g key={i}>
            <path d={lauv(cx, cy, rx, ry, 700 + i, 12)} fill={SKOG.naer[0]} />
            <path d={lauv(cx + rx * 0.14, cy - ry * 0.26, rx * 0.68, ry * 0.55, 720 + i, 9)} fill={SKOG.naer[1]} />
          </g>
        ))}
      </g>

      {/* the floor */}
      <path d={bakke(-20, 500, grunn, 610, 30)} fill={SKOG.mose[1]} />
      <path d={bakke(-20, 500, (x) => grunn(x) + 22, 610, 30)} fill={SKOG.gress[1]} />
      <Gran x={186} y={grunn(186) + 18} h={120} w={64} seed={51} tone={SKOG.naer} n={8} skygge />
      <Tue x={150} y={grunn(150) + 36} b={110} h={32} seed={61} art="blabaer" n={9} />
      <Tue x={340} y={grunn(340) + 40} b={120} h={30} seed={62} art="lyng" n={9} />
      <Bregne x={44} y={grunn(44) + 40} l={96} retning={1} seed={63} n={10} />
      <Bregne x={456} y={grunn(456) + 40} l={84} retning={-1} seed={64} n={10} />
      <Stein x={250} y={grunn(250) + 52} b={70} seed={65} />
      <Sopp x={212} y={grunn(212) + 50} st={20} n={11} />
      <Kongle x={300} y={grunn(300) + 58} st={9} v={0.3} />
      <Tue x={420} y={grunn(420) + 60} b={70} h={18} seed={66} art="tyttebaer" n={11} />
    </svg>
  );
}
