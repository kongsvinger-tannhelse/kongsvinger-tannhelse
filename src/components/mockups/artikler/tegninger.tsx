import type { CSSProperties, ReactNode } from "react";
import { FARGE as F, JEKSEL, PULPA, lauv, r2 } from "@/components/forside/behandlinger/popup/tegning";
import s from "./artikler.module.css";

/* The article's drawings, from the treatments' own drawing kit. Each one is
   drawn two ways: in coloured paper («farge», for B and C), or as a pen
   sketch in one ink with one warm accent («strek», for A's margins), whose
   lines draw themselves when the sheet is seen. Server-safe: no hooks. */

type Stil = { strek?: boolean; className?: string; forsink?: number };

const BLEKK: string = F.dyp;
const AKSENT: string = F.smerte;
/** The fortress stone, for what has gone quiet. */
const STEIN = "#8A8B84";

/** Props for a shape: a filled paper piece, or an inked outline. */
function form(strek: boolean | undefined, fill: string, { w = 2.4, ink = BLEKK, penFill = "none" }: { w?: number; ink?: string; penFill?: string } = {}) {
  return strek
    ? { fill: penFill, stroke: ink, strokeWidth: w, strokeLinejoin: "round" as const, strokeLinecap: "round" as const, pathLength: 1, className: s.strek }
    : { fill };
}

/** Props for a line that is a line in both styles. */
function linje(strek: boolean | undefined, farge: string, w: number, pen = BLEKK) {
  return {
    fill: "none",
    stroke: strek ? pen : farge,
    strokeWidth: w,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...(strek ? { pathLength: 1, className: s.strek } : {}),
  };
}

/** A coloured piece that only fades in once the pen has drawn round it. */
const blekk = (strek?: boolean) => (strek ? { className: s.blekk } : {});

function Ramme({ children, className, forsink = 0, boks = "0 0 240 240", tittel }: { children: ReactNode; className?: string; forsink?: number; boks?: string; tittel?: string }) {
  return (
    <svg viewBox={boks} className={className} style={{ "--forsink": `${forsink}s` } as CSSProperties} role={tittel ? "img" : undefined} aria-hidden={tittel ? undefined : true} aria-label={tittel}>
      {children}
    </svg>
  );
}

/* ── A molar, in its own units (gum line y = 0), and the gum round it ── */

const TANNKJOTT = "M-88,12 Q-70,-6 -50,-12 Q0,10 50,-12 Q70,-6 88,12 L88,28 Q88,66 0,66 Q-88,66 -88,28 Z";

function Jeksel({ strek, pulpa, rotter = true }: { strek?: boolean; pulpa?: { fyll: string; pen: string; opacity?: number }; rotter?: boolean }) {
  return (
    <>
      <path d={rotter ? JEKSEL.tann : JEKSEL.krone} {...form(strek, F.hvit, { penFill: F.papir })} />
      {!strek && <path d={rotter ? JEKSEL.skygge : JEKSEL.kroneSkygge} fill={F.skyggeside} />}
      <path d={JEKSEL.fure} {...linje(strek, F.fure, strek ? 1.8 : 3)} />
      {pulpa && (
        <path
          d={PULPA}
          fill={pulpa.fyll}
          fillOpacity={strek ? 0.16 : (pulpa.opacity ?? 1)}
          stroke={strek ? pulpa.pen : "none"}
          strokeWidth={strek ? 2 : 0}
          {...(strek ? { pathLength: 1, className: s.strek } : {})}
        />
      )}
    </>
  );
}

function Tannkjott({ strek, sar = false }: { strek?: boolean; sar?: boolean }) {
  return (
    <>
      <path d={TANNKJOTT} {...form(strek, sar ? F.sart : F.tannkjott, { penFill: F.papir, ink: sar && strek ? AKSENT : BLEKK })} />
      {!strek && <path d="M-88,28 Q-88,66 0,66 Q-88,58 -88,28 Z" fill={sar ? "#C9675A" : F.tannkjottMork} opacity={0.5} />}
    </>
  );
}

/* ── Why it hurts: the nerve inside ── */

export function Nerve({ strek, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} tittel="En jeksel, sett fra innsiden, med nerven i midten">
      {!strek && <circle cx={120} cy={124} r={104} fill="#F8E4DB" opacity={0.55} />}
      <g transform="translate(120 146)">
        <Jeksel strek={strek} pulpa={{ fyll: "#E79A8D", pen: AKSENT }} />
        {/* a little arrow pointing at the nerve */}
        <path d="M78,-92 Q66,-70 30,-58" {...linje(strek, F.glomma, 2.2)} />
        <path d="M36,-66 L29,-58 L39,-55" {...linje(strek, F.glomma, 2.2)} />
      </g>
    </Ramme>
  );
}

/* ── The four causes ── */

/** A little bacterium, round with two eyes. */
function Bakterie({ x, y, r, seed, strek }: { x: number; y: number; r: number; seed: number; strek?: boolean }) {
  return (
    <g>
      <path d={lauv(x, y, r, r * 0.86, seed, 7)} {...form(strek, F.bjork, { w: 1.8, penFill: F.papir })} />
      <circle cx={r2(x - r * 0.3)} cy={r2(y - r * 0.12)} r={r2(r * 0.14)} fill={BLEKK} {...blekk(strek)} />
      <circle cx={r2(x + r * 0.3)} cy={r2(y - r * 0.12)} r={r2(r * 0.14)} fill={BLEKK} {...blekk(strek)} />
    </g>
  );
}

export function Hull({ strek, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} tittel="En tann med et hull på toppen">
      {!strek && <circle cx={120} cy={120} r={104} fill="#E1EFF1" opacity={0.7} />}
      <g transform="translate(120 150)">
        <Jeksel strek={strek} rotter={false} />
        <Tannkjott strek={strek} />
        <path d={lauv(-20, -78, 14, 11, 7, 8)} fill={F.hull} {...blekk(strek)} />
        <path d={lauv(-22, -80, 7, 5, 3, 7)} fill="#4A3127" {...blekk(strek)} />
      </g>
      <Bakterie x={62} y={46} r={11} seed={11} strek={strek} />
      <Bakterie x={86} y={26} r={8} seed={5} strek={strek} />
      <Bakterie x={180} y={52} r={9} seed={9} strek={strek} />
    </Ramme>
  );
}

export function Sprekk({ strek, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} tittel="En tann med en liten sprekk">
      {!strek && <circle cx={120} cy={120} r={104} fill="#E1EFF1" opacity={0.7} />}
      <g transform="translate(120 150)">
        <Jeksel strek={strek} rotter={false} />
        <Tannkjott strek={strek} />
        <path d="M8,-97 L1,-82 L10,-68 L3,-52 L9,-36 L5,-24" {...linje(strek, F.hull, 3, AKSENT)} />
        {/* the sting */}
        <path d="M8,-112 L8,-130 M-8,-108 L-18,-124 M24,-108 L34,-124" {...linje(strek, F.smerte, 3.2, AKSENT)} />
      </g>
    </Ramme>
  );
}

export function SartTannkjott({ strek, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} tittel="En tann med rødt og sårt tannkjøtt">
      {!strek && <circle cx={120} cy={120} r={104} fill="#F8E4DB" opacity={0.6} />}
      <g transform="translate(120 150)">
        <Jeksel strek={strek} rotter={false} />
        <Tannkjott strek={strek} sar />
        {/* a crumb stuck at the edge */}
        <path d={lauv(54, -10, 9, 7, 13, 7)} fill={F.rav} {...(strek ? { stroke: BLEKK, strokeWidth: 1.6, fillOpacity: 0.5, pathLength: 1, className: s.strek } : {})} />
        {/* sore, warm lines */}
        <path d="M-74,-26 q6,-8 0,-16 q-6,-8 0,-16 M-60,-34 q6,-8 0,-16 q-6,-8 0,-16 M72,-30 q6,-8 0,-16 q-6,-8 0,-16" {...linje(strek, F.smerte, 2.6, AKSENT)} />
      </g>
    </Ramme>
  );
}

export function SykNerve({ strek, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} tittel="En tann med en betent nerve som banker, om natten">
      {!strek && <circle cx={120} cy={124} r={104} fill="#F8E4DB" opacity={0.7} />}
      {/* the moon */}
      <path d="M196,30 a20,20 0 1 0 14,34 a16,16 0 1 1 -14,-34 Z" {...form(strek, "#F1D58A", { w: 2 })} />
      <g transform="translate(116 150)">
        {/* the throb, rings out from the nerve */}
        <path d="M-58,-92 A72,72 0 0 1 58,-92 M-76,-104 A94,94 0 0 1 76,-104" {...linje(strek, F.smerte, 3, AKSENT)} opacity={strek ? 1 : 0.7} />
        <Jeksel strek={strek} pulpa={{ fyll: F.smerte, pen: AKSENT }} />
      </g>
    </Ramme>
  );
}

/** A tooth gone quiet: the nerve grey, three small dots of silence. */
export function Stille({ strek, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} tittel="En tann der nerven har blitt stille">
      {!strek && <circle cx={120} cy={124} r={104} fill={F.blek} opacity={0.8} />}
      <g transform="translate(120 146)">
        <Jeksel strek={strek} pulpa={{ fyll: "#B8B2A7", pen: STEIN }} />
      </g>
      {[176, 192, 208].map((x, i) => (
        <circle key={x} cx={x} cy={56 - i * 6} r={4.5} fill={STEIN} {...blekk(strek)} />
      ))}
    </Ramme>
  );
}

export const ARSAK_TEGNING = { hull: Hull, sprekk: Sprekk, tannkjott: SartTannkjott, betennelse: SykNerve } as const;

/* ── Small drawings for the tips, 120 × 120 ── */

export function Borste({ strek, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <g transform="rotate(-32 60 64)">
        <rect x={10} y={60} width={72} height={12} rx={6} {...form(strek, F.teal, { w: 2.2 })} />
        <rect x={80} y={58} width={28} height={16} rx={6} {...form(strek, F.hvit, { w: 2.2, penFill: F.papir })} />
        <path d="M85,58 L85,44 M91,58 L91,43 M97,58 L97,43 M103,58 L103,44" {...linje(strek, F.metallMork, 2.6)} />
        <path d={lauv(94, 38, 13, 6, 4, 8)} {...(strek ? { fill: "none", stroke: F.teal, strokeWidth: 2, pathLength: 1, className: s.strek } : { fill: F.kulde })} />
      </g>
    </Ramme>
  );
}

export function Glass({ strek, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M38,52 Q49,47 60,52 T82,52 L77,98 Q76,104 70,104 L50,104 Q44,104 43,98 Z" fill={F.kulde} opacity={strek ? 0.35 : 0.65} {...blekk(strek)} />
      <path d="M34,22 L86,22 L77,98 Q76,104 70,104 L50,104 Q44,104 43,98 Z" {...form(strek, "none", { w: 2.2 })} {...(strek ? {} : { stroke: F.metallMork, strokeWidth: 2.2 })} />
      <circle cx={56} cy={80} r={3} fill={F.hvit} {...blekk(strek)} />
      <circle cx={66} cy={70} r={2} fill={F.hvit} {...blekk(strek)} />
    </Ramme>
  );
}

/** A jaw from above, the sore side marked, an arrow to the other side. */
export function Tygge({ strek, className, forsink }: Stil) {
  const tenner = Array.from({ length: 8 }, (_, i) => {
    const a = Math.PI * (0.95 - (i / 7) * 0.9);
    return { x: r2(60 + Math.cos(a) * 40), y: r2(78 - Math.sin(a) * 44), sar: i < 3 };
  });
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      {tenner.map((t, i) => (
        <circle key={i} cx={t.x} cy={t.y} r={8} {...form(strek, t.sar ? "#F5C9BF" : F.hvit, { w: 2, ink: t.sar ? AKSENT : BLEKK, penFill: F.papir })} {...(strek ? {} : { stroke: t.sar ? F.smerte : F.metallMork, strokeWidth: 1.6 })} />
      ))}
      <path d="M34,96 Q60,112 86,96" {...linje(strek, F.glomma, 2.4)} />
      <path d="M78,92 L87,96 L80,103" {...linje(strek, F.glomma, 2.4)} />
    </Ramme>
  );
}

export function Pute({ strek, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M12,58 Q24,64 36,56 Q62,50 88,44 Q96,36 106,40 Q100,54 104,70 Q108,84 98,88 Q90,82 80,88 Q54,94 28,100 Q20,108 12,102 Q18,90 14,78 Q8,66 12,58 Z" {...form(strek, F.hvit, { w: 2.2, penFill: F.papir })} {...(strek ? {} : { stroke: F.metallMork, strokeWidth: 1.6 })} />
      <path d="M34,82 Q58,74 86,68" {...linje(strek, F.blek, 2)} />
      <path d="M82,14 a12,12 0 1 0 10,20 a9,9 0 1 1 -10,-20 Z" {...form(strek, "#F1D58A", { w: 2 })} />
    </Ramme>
  );
}

export function Tablett({ strek, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <circle cx={46} cy={66} r={20} {...form(strek, F.hvit, { w: 2.2, penFill: F.papir })} {...(strek ? {} : { stroke: F.metallMork, strokeWidth: 1.6 })} />
      <path d="M32,66 L60,66" {...linje(strek, F.metallMork, 2)} />
      <circle cx={80} cy={50} r={15} {...form(strek, F.hvit, { w: 2.2, penFill: F.papir })} {...(strek ? {} : { stroke: F.metallMork, strokeWidth: 1.6 })} />
      <path d="M70,50 L90,50" {...linje(strek, F.metallMork, 2)} />
    </Ramme>
  );
}

export const TIPS_TEGNING = { pusse: Borste, skylle: Glass, tygge: Tygge, pute: Pute, tablett: Tablett } as const;

/** A swelling: a red bump on the gum under the tooth, and a thermometer for the fever. */
export function Hevelse({ strek, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} tittel="En tann med en hevelse i tannkjøttet, og et termometer">
      {!strek && <circle cx={120} cy={120} r={104} fill="#F8E4DB" opacity={0.75} />}
      <g transform="translate(108 146)">
        <Jeksel strek={strek} rotter={false} />
        <Tannkjott strek={strek} sar />
        <path d={lauv(-6, 30, 26, 20, 17, 9)} {...form(strek, "#C9675A", { w: 2.2, ink: AKSENT, penFill: "#F5C9BF" })} />
        <path d="M-16,22 Q-8,16 2,20" {...linje(strek, "#E8988C", 3, AKSENT)} />
      </g>
      {/* the thermometer */}
      <g transform="translate(196 50) rotate(18)">
        <rect x={-7} y={-6} width={14} height={62} rx={7} {...form(strek, F.hvit, { w: 2, penFill: F.papir })} {...(strek ? {} : { stroke: F.metallMork, strokeWidth: 1.6 })} />
        <rect x={-2.5} y={14} width={5} height={44} rx={2.5} fill={F.smerte} {...blekk(strek)} />
        <circle cx={0} cy={62} r={11} {...form(strek, F.smerte, { w: 2, ink: AKSENT })} />
      </g>
    </Ramme>
  );
}

export const TEGNING = { ...ARSAK_TEGNING, hevelse: Hevelse } as const;
