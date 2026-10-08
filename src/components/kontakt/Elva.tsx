import { kurve, type Pt } from "@/components/forside/behandlinger/popup/tegning";
import { SKOG, bakke, r2, rng } from "@/components/omoss/skog";
import { Gran, Stein, Tue } from "@/components/omoss/traer";
import s from "./elva.module.css";

/**
 * Glomma, across the page under the heading: the far bank with its spruce,
 * mirrored in the water; slow ripples drifting downstream; and the near
 * bank, with reeds, stones and heather. The same river runs under the bridge
 * at the foot of every page. Drawn `W` × `H`; the wide and the phone drawing
 * are two calls. The trees stand up when an ancestor gets `data-vis="ja"`.
 */

export const VANN = { lys: "#B7CCCB", midt: "#93B0B1", dyp: "#6F9093", glimt: "#E6EFEC" } as const;

/** A reed: a thin stalk bending in the wind, with its brown head, or just a blade. */
function siv(x: number, y: number, h: number, boy: number, hode: boolean) {
  const stilk = `M${r2(x)},${r2(y)} Q${r2(x + boy * 0.3)},${r2(y - h * 0.6)} ${r2(x + boy)},${r2(y - h)}`;
  const kolbe = hode ? { cx: r2(x + boy * 0.86), cy: r2(y - h * 0.86), ry: r2(h * 0.12), rx: r2(Math.max(2, h * 0.035)) } : null;
  return { stilk, kolbe };
}

export function Elva({ W, H, id }: { W: number; H: number; id: string }) {
  const rand = rng(W * 3 + H);
  const k = H / 300;
  const strand = 150 * k; // the far shore's waterline
  const nar = (x: number) => 248 * k - 8 * k * Math.sin(x / 140 + 1) - 4 * k * Math.sin(x / 47);
  const fjernBakke = (x: number) => strand - 26 * k - 14 * k * Math.sin(x / 210 + 2) - 6 * k * Math.sin(x / 63);

  // the far bank's trees, and the same trees upside down in the water
  const traer: { x: number; h: number; w: number; seed: number }[] = [];
  for (let x = -20; x < W + 20; x += (18 + rand() * 26) * k) {
    // mostly middling, now and then a tall one, in loose groups
    const gruppe = 0.75 + 0.45 * Math.sin(x / (W * 0.09) + 1.3) ** 2;
    const h = (30 + rand() * 46 + (rand() < 0.18 ? 34 : 0)) * k * gruppe;
    traer.push({ x: r2(x), h: r2(h), w: r2(h * (0.4 + rand() * 0.1)), seed: Math.floor(rand() * 1e6) });
  }

  // ripples: short light strokes, more and longer near the viewer
  const krusning: string[] = [];
  for (let i = 0; i < Math.round(W / 26); i++) {
    const t = rand();
    const y = strand + 10 * k + t ** 1.4 * (nar(0) - strand - 20 * k);
    const x = rand() * (W + 200) - 100;
    const l = (14 + t * 46) * k * (0.6 + rand() * 0.8);
    krusning.push(`M${r2(x)},${r2(y)} q${r2(l / 2)},${r2(-1.6 * k)} ${r2(l)},0`);
  }

  // the near bank: reeds in clumps, a few stones and tussocks
  const sivene: ReturnType<typeof siv>[] = [];
  const klumper = Math.round(W / 220);
  for (let c = 0; c < klumper; c++) {
    const cx = (W * (c + 0.5)) / klumper + (rand() - 0.5) * 80 * k;
    for (let i = 0; i < 7; i++) {
      const x = cx + (rand() - 0.5) * 50 * k;
      sivene.push(siv(x, nar(x) + 8 * k, (40 + rand() * 46) * k, (rand() - 0.35) * 18 * k, rand() < 0.4));
    }
  }

  const vannflate: Pt[] = [];
  for (let x = -20; x <= W + 20; x += 40) vannflate.push([x, strand]);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" className="absolute inset-0 size-full" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-vann`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={VANN.lys} />
          <stop offset="0.55" stopColor={VANN.midt} />
          <stop offset="1" stopColor={VANN.dyp} />
        </linearGradient>
        <linearGradient id={`${id}-bunn`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0.82" style={{ stopColor: "var(--color-papir)", stopOpacity: 0 }} />
          <stop offset="1" style={{ stopColor: "var(--color-papir)", stopOpacity: 1 }} />
        </linearGradient>
        <clipPath id={`${id}-flate`}>
          <rect x={-20} y={strand} width={W + 40} height={H} />
        </clipPath>
      </defs>

      {/* the far bank */}
      <path d={bakke(-20, W + 20, fjernBakke, strand + 2, 30)} fill={SKOG.fjern[0]} />
      {traer.map((t, i) => (
        <Gran key={i} x={t.x} y={fjernBakke(t.x) + 6 * k} h={t.h} w={t.w} seed={t.seed} tone={SKOG.midt} n={Math.round(t.x / (W / 14))} utenStamme />
      ))}

      {/* the water, with the far bank in it */}
      <path d={`${kurve(vannflate)} L${W + 20},${H + 4} L-20,${H + 4} Z`} fill={`url(#${id}-vann)`} />
      <g clipPath={`url(#${id}-flate)`} opacity={0.32}>
        <g transform={`translate(0 ${r2(strand * 2)}) scale(1 -1)`}>
          <path d={bakke(-20, W + 20, fjernBakke, strand + 2, 30)} fill={SKOG.midt[0]} />
          {traer.map((t, i) => (
            <Gran key={i} x={t.x} y={fjernBakke(t.x) + 6 * k} h={t.h} w={t.w} seed={t.seed} tone={SKOG.naer} utenStamme />
          ))}
        </g>
      </g>
      <path d={`M-20,${r2(strand)} L${W + 20},${r2(strand)}`} stroke={VANN.glimt} strokeWidth={1.5 * k} opacity={0.8} />

      {/* ripples drifting downstream, left to right */}
      <g className={s.strom} stroke={VANN.glimt} strokeWidth={1.6 * k} strokeLinecap="round" fill="none" opacity={0.75}>
        <path d={krusning.join(" ")} />
      </g>

      {/* the near bank */}
      <path d={bakke(-20, W + 20, nar, H + 4, 30)} fill={SKOG.gress[1]} />
      <path d={bakke(-20, W + 20, (x) => nar(x) + 12 * k, H + 4, 30)} fill={SKOG.gress[2]} />
      {sivene.map((sv, i) => (
        <g key={i} className={s.siv} style={{ animationDelay: `${-((i * 0.37) % 6).toFixed(2)}s` }}>
          <path d={sv.stilk} stroke="#6B8A4E" strokeWidth={2 * k} strokeLinecap="round" fill="none" />
          {sv.kolbe && <ellipse cx={sv.kolbe.cx} cy={sv.kolbe.cy} rx={sv.kolbe.rx} ry={sv.kolbe.ry} fill="#7A5338" />}
        </g>
      ))}
      {Array.from({ length: Math.round(W / 300) }, (_, i) => {
        const x = (W * (i + 0.3)) / Math.round(W / 300) + 60 * k;
        return i % 2 ? (
          <Stein key={i} x={x} y={nar(x) + 22 * k} b={(34 + (i % 3) * 10) * k} seed={i + 11} />
        ) : (
          <Tue key={i} x={x} y={nar(x) + 24 * k} b={70 * k} h={20 * k} seed={i + 21} art={i % 4 ? "lyng" : "blabaer"} n={i} />
        );
      })}
      <rect x={-20} y={0} width={W + 40} height={H + 4} fill={`url(#${id}-bunn)`} />
    </svg>
  );
}
