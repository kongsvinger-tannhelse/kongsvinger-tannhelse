import type { CSSProperties, ReactNode } from "react";
import { FARGE as F, JEKSEL, PULPA, draape, lauv, r2, snofnugg, stjerne } from "@/components/forside/behandlinger/popup/tegning";
import type { TegningId } from "@/data/artikler/typer";
import s from "./artikler.module.css";

/* The articles' drawings, from the treatments' own drawing kit. Each one
   can be drawn in coloured paper, or as a pen sketch in one ink with one
   warm accent («strek»), whose lines draw themselves when the sheet is
   seen. The notes use the pen. Server-safe: no hooks, so the check on the
   client can use the same ones. */

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

/* ── Sensitive teeth ── */

/** The tiny canals through the dentin, out from the nerve, and the cold coming in. */
export function Kanaler({ strek, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} tittel="En tann med små kanaler fra overflaten inn mot nerven, og kulde utenfor">
      {!strek && <circle cx={120} cy={124} r={104} fill="#E1EFF1" opacity={0.7} />}
      <g transform="translate(112 146)">
        <Jeksel strek={strek} pulpa={{ fyll: "#E79A8D", pen: AKSENT }} />
        <path
          d="M-30,-60 L-42,-68 M-28,-44 L-44,-48 M-26,-28 L-43,-28 M30,-60 L42,-68 M28,-44 L44,-48 M26,-28 L43,-28 M-10,-72 L-14,-90 M10,-72 L14,-90"
          {...linje(strek, F.smerte, 1.8, AKSENT)}
          strokeDasharray={strek ? undefined : "3 3"}
        />
      </g>
      <path d={snofnugg(196, 52, 18)} {...linje(strek, F.kulde, 3, F.teal)} />
      <path d={snofnugg(178, 96, 10)} {...linje(strek, F.kulde, 2.4, F.teal)} />
    </Ramme>
  );
}

/** Enamel worn flat by acid, and drops of something sour above. */
export function Slitt({ strek, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} tittel="En tann med slitt, flat emalje, og dråper av sur drikke">
      {!strek && <circle cx={120} cy={120} r={104} fill="#E1EFF1" opacity={0.7} />}
      <g transform="translate(120 152)">
        <path d="M-50,-6 C-54,-40 -52,-62 -46,-74 Q0,-80 46,-74 C52,-62 54,-40 50,-6 Z" {...form(strek, F.hvit, { penFill: F.papir })} />
        <path d="M-40,-70 Q0,-76 40,-70" {...linje(strek, F.fure, 1.8)} />
        <Tannkjott strek={strek} />
        {[
          [-30, -104, 7],
          [0, -120, 6],
          [28, -100, 7],
        ].map(([x, y, a]) => (
          <path key={x} d={draape(x, y, a)} {...form(strek, F.rav, { w: 1.8, ink: F.rav })} />
        ))}
      </g>
    </Ramme>
  );
}

/** Gum gone back, so the root's neck shows bare above it. */
export function Tannhals({ strek, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} tittel="En tann der tannkjøttet har trukket seg tilbake, så tannhalsen er bar">
      {!strek && <circle cx={120} cy={120} r={104} fill="#E1EFF1" opacity={0.7} />}
      <g transform="translate(120 140)">
        <Jeksel strek={strek} />
        <path d="M-50,-6 L50,-6 C49.6,2 49.2,8 48.6,16 L-48.6,16 C-49.2,8 -49.6,2 -50,-6 Z" fill={F.dentin} fillOpacity={strek ? 0.7 : 1} {...blekk(strek)} />
        <g transform="translate(0 22)">
          <Tannkjott strek={strek} />
        </g>
      </g>
      <path d={snofnugg(196, 120, 14)} {...linje(strek, F.kulde, 2.6, F.teal)} />
    </Ramme>
  );
}

/* ── Gums ── */

/** A furry film of bacteria along the gum line. */
export function Plakk({ strek, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} tittel="En tann med plakk, et lag bakterier, langs tannkjøttet">
      {!strek && <circle cx={120} cy={120} r={104} fill="#ECF1E2" opacity={0.8} />}
      <g transform="translate(120 150)">
        <Jeksel strek={strek} rotter={false} />
        <Tannkjott strek={strek} sar />
        <path d="M-48,-16 q6,-7 12,0 t12,0 t12,0 t12,0 t12,0 t12,0 t12,0 t12,0" {...linje(strek, "#9DB27A", strek ? 3 : 5, "#7E9A5A")} />
      </g>
      <Bakterie x={64} y={70} r={10} seed={21} strek={strek} />
      <Bakterie x={178} y={62} r={8} seed={8} strek={strek} />
    </Ramme>
  );
}

/** Hard yellowish crusts of tartar where tooth meets gum. */
export function Tannstein({ strek, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} tittel="En tann med hard, gulaktig tannstein nede ved tannkjøttet">
      {!strek && <circle cx={120} cy={120} r={104} fill="#FBF0D9" opacity={0.85} />}
      <g transform="translate(120 150)">
        <Jeksel strek={strek} rotter={false} />
        <Tannkjott strek={strek} />
        {[
          [-34, -14, 11, 7, 3],
          [-12, -10, 9, 6, 5],
          [12, -11, 10, 6, 7],
          [34, -15, 9, 7, 9],
        ].map(([x, y, rx, ry, seed]) => (
          <path key={x} d={lauv(x, y, rx, ry, seed, 7)} {...form(strek, "#E3C27A", { w: 1.8, ink: "#B8913E", penFill: "#F3DFAE" })} />
        ))}
      </g>
    </Ramme>
  );
}

/* ── Brushing ── */

/** A toothbrush held at a slant against the gum line. */
export function Skraa({ strek, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} tittel="En tannbørste holdt på skrå mot tannkjøttet">
      {!strek && <circle cx={120} cy={120} r={104} fill="#E1EFF1" opacity={0.7} />}
      <g transform="translate(96 150)">
        <Jeksel strek={strek} rotter={false} />
        <Tannkjott strek={strek} />
        {/* the brush from below right, its bristles pointing up at the tooth where it meets the gum */}
        <g transform="translate(70 0) rotate(-40)">
          <rect x={16} y={-5} width={72} height={10} rx={5} {...form(strek, F.teal, { w: 2.2 })} />
          <rect x={-10} y={-8} width={28} height={16} rx={5} {...form(strek, F.hvit, { w: 2.2, penFill: F.papir })} />
          <path d="M-6,-8 L-6,-22 M0,-8 L0,-23 M6,-8 L6,-23 M12,-8 L12,-22" {...linje(strek, F.metallMork, 2.4)} />
        </g>
      </g>
    </Ramme>
  );
}

/** Floss going down between two teeth. */
export function Traad({ strek, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} tittel="Tanntråd mellom to tenner">
      {!strek && <circle cx={120} cy={120} r={104} fill="#E1EFF1" opacity={0.7} />}
      <g transform="translate(120 156)">
        <g transform="translate(-41 0) scale(0.62)">
          <Jeksel strek={strek} rotter={false} />
        </g>
        <g transform="translate(41 0) scale(0.62)">
          <Jeksel strek={strek} rotter={false} />
        </g>
        <Tannkjott strek={strek} />
        {/* the floss, pulled tight from both sides down into the gap */}
        <path d="M-96,-128 L-11,-128 L0,-20 L11,-128 L96,-128" {...linje(strek, F.teal, 2.6, F.teal)} />
      </g>
    </Ramme>
  );
}

/** A tube of toothpaste, a pea of paste beside it. */
export function Tube({ strek, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M16,56 L78,48 L78,82 L16,74 Q10,65 16,56 Z" {...form(strek, F.hvit, { w: 2.2, penFill: F.papir })} {...(strek ? {} : { stroke: F.metallMork, strokeWidth: 1.6 })} />
      <path d="M30,56 L30,74 M40,55 L40,76" {...linje(strek, F.teal, 2.4, F.teal)} />
      <rect x={78} y={54} width={16} height={22} rx={3} {...form(strek, F.teal, { w: 2.2 })} />
      <circle cx={104} cy={40} r={7} {...form(strek, F.kulde, { w: 2, ink: F.teal })} />
    </Ramme>
  );
}

/** A stopwatch: brush for two minutes. */
export function Klokke({ strek, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M60,66 L60,30 A36,36 0 0 1 91.18,48 Z" fill={F.teal} fillOpacity={0.22} {...blekk(strek)} />
      <circle cx={60} cy={66} r={36} {...form(strek, "none", { w: 2.4 })} {...(strek ? {} : { stroke: BLEKK, strokeWidth: 2.4 })} />
      <rect x={53} y={20} width={14} height={8} rx={2} {...form(strek, F.teal, { w: 2 })} />
      <path d="M60,66 L60,40 M60,66 L76,74" {...linje(strek, BLEKK, 2.6)} />
      <path d="M60,32 L60,36 M94,66 L90,66 M60,100 L60,96 M26,66 L30,66" {...linje(strek, BLEKK, 2)} />
    </Ramme>
  );
}

/** One tooth and three arrows: outside, inside, and the top. */
export function AlleSider({ strek, className, forsink }: Stil) {
  const pil = (x1: number, y1: number, x2: number, y2: number) => {
    const a = Math.atan2(y2 - y1, x2 - x1);
    const s1 = [r2(x2 - Math.cos(a - 0.5) * 10), r2(y2 - Math.sin(a - 0.5) * 10)];
    const s2 = [r2(x2 - Math.cos(a + 0.5) * 10), r2(y2 - Math.sin(a + 0.5) * 10)];
    return `M${x1},${y1} L${x2},${y2} M${s1[0]},${s1[1]} L${x2},${y2} L${s2[0]},${s2[1]}`;
  };
  return (
    <Ramme className={className} forsink={forsink} tittel="En tann med piler mot utsiden, innsiden og toppen">
      {!strek && <circle cx={120} cy={120} r={104} fill="#E1EFF1" opacity={0.7} />}
      <g transform="translate(120 160)">
        <Jeksel strek={strek} rotter={false} />
        <Tannkjott strek={strek} />
      </g>
      <path d={`${pil(28, 104, 58, 112)} ${pil(212, 104, 182, 112)} ${pil(120, 12, 120, 40)}`} {...linje(strek, F.teal, 3, F.teal)} />
    </Ramme>
  );
}

/* ── Fear ── */

/** Two speech bubbles: talking first. */
export function Snakke({ strek, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M22,20 L74,20 Q84,20 84,30 L84,54 Q84,64 74,64 L40,64 L26,76 L28,64 L22,64 Q12,64 12,54 L12,30 Q12,20 22,20 Z" {...form(strek, F.hvit, { w: 2.2, penFill: F.papir })} {...(strek ? {} : { stroke: F.metallMork, strokeWidth: 1.6 })} />
      <circle cx={34} cy={42} r={3.4} fill={BLEKK} {...blekk(strek)} />
      <circle cx={48} cy={42} r={3.4} fill={BLEKK} {...blekk(strek)} />
      <circle cx={62} cy={42} r={3.4} fill={BLEKK} {...blekk(strek)} />
      <path d="M58,72 L98,72 Q108,72 108,82 L108,92 Q108,102 98,102 L94,102 L96,112 L84,102 L58,102 Q48,102 48,92 L48,82 Q48,72 58,72 Z" {...form(strek, "#E1EFF1", { w: 2.2, ink: F.teal, penFill: "#EEF7F8" })} />
    </Ramme>
  );
}

/** A raised hand: you can always ask for a pause. */
export function Haand({ strek, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path
        d="M40,100 C30,92 24,80 20,70 C17,62 26,58 31,64 L38,74 L38,30 C38,23 48,23 48,30 L48,58 L50,22 C50,15 60,15 60,22 L60,58 L62,26 C62,19 72,19 72,26 L72,60 L74,34 C74,27 84,27 84,34 L84,72 C84,90 74,102 60,104 C52,105 45,104 40,100 Z"
        {...form(strek, "#F5D9C8", { w: 2.2, penFill: F.papir })}
        {...(strek ? {} : { stroke: "#D9A98F", strokeWidth: 1.6 })}
      />
      <path d="M94,22 q7,5 7,14 M102,12 q11,8 11,24" {...linje(strek, F.teal, 2.4, F.teal)} />
    </Ramme>
  );
}

/** A tooth at rest: soft rings round it and two small stars. */
export function RoligTann({ strek, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} tittel="En rolig tann med myke ringer rundt">
      {!strek && <circle cx={120} cy={124} r={104} fill="#E1EFF1" opacity={0.7} />}
      <path d="M50,96 A76,76 0 0 1 190,96 M34,104 A94,94 0 0 1 206,104" {...linje(strek, F.teal, 2.4, F.teal)} opacity={strek ? 0.8 : 0.6} />
      <g transform="translate(120 150)">
        <Jeksel strek={strek} pulpa={{ fyll: F.teal, pen: F.teal, opacity: 0.4 }} />
      </g>
      <path d={`${stjerne(52, 54, 9)} ${stjerne(194, 46, 7)}`} {...form(strek, "#F1D58A", { w: 1.8, ink: F.teal })} />
    </Ramme>
  );
}

/** Steps up to a small flag: one at a time. */
export function Steg({ strek, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M12,102 L12,84 L38,84 L38,64 L64,64 L64,44 L90,44 L90,102 Z" {...form(strek, F.blek, { w: 2.2, penFill: F.papir })} {...(strek ? {} : { stroke: F.metallMork, strokeWidth: 1.6 })} />
      <path d="M82,44 L82,14" {...linje(strek, BLEKK, 2.2)} />
      <path d="M82,14 L104,21 L82,28 Z" {...form(strek, F.teal, { w: 2, ink: F.teal })} />
    </Ramme>
  );
}

/** A heart: someone you feel safe with, and a kind word. */
export function Hjerte({ strek, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path
        d="M60,96 C30,76 16,60 16,44 C16,32 26,24 37,24 C47,24 55,30 60,38 C65,30 73,24 83,24 C94,24 104,32 104,44 C104,60 90,76 60,96 Z"
        {...form(strek, "#F5C9BF", { w: 2.4, ink: AKSENT, penFill: "#FBE6E0" })}
      />
    </Ramme>
  );
}

/* ── Who pays ── */

/** A bill from the dentist: a torn-off slip with lines, and the sum circled. */
export function Regning({ strek, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path
        d="M30,14 L90,14 L90,100 L84,106 L78,100 L72,106 L66,100 L60,106 L54,100 L48,106 L42,100 L36,106 L30,100 Z"
        {...form(strek, F.hvit, { w: 2.2, penFill: F.papir })}
        {...(strek ? {} : { stroke: F.metallMork, strokeWidth: 1.6 })}
      />
      <path d="M40,30 L80,30 M40,42 L72,42 M40,54 L76,54 M40,66 L66,66" {...linje(strek, F.metallMork, 2)} />
      <ellipse cx={68} cy={84} rx={15} ry={9} {...linje(strek, F.teal, 2.4, F.teal)} />
      <path d="M58,84 L78,84" {...linje(strek, BLEKK, 2.4)} />
    </Ramme>
  );
}

/** A card with a tick: the frikort, once you have paid enough. */
export function Frikort({ strek, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <rect x={14} y={30} width={92} height={60} rx={9} {...form(strek, "#E1EFF1", { w: 2.2, ink: BLEKK, penFill: "#EEF7F8" })} />
      <path d="M26,46 L62,46 M26,58 L52,58" {...linje(strek, F.metallMork, 2.2)} />
      <circle cx={84} cy={66} r={13} {...form(strek, F.teal, { w: 2.2, ink: F.teal })} />
      <path d="M78,66 L83,71 L91,61" {...linje(strek, F.hvit, 2.6, F.teal)} />
    </Ramme>
  );
}

/** Every drawing by its id in the article data. */
export const TEGNINGER: Record<TegningId, (p: Stil) => React.JSX.Element> = {
  nerve: Nerve,
  hull: Hull,
  sprekk: Sprekk,
  tannkjott: SartTannkjott,
  betennelse: SykNerve,
  stille: Stille,
  hevelse: Hevelse,
  borste: Borste,
  glass: Glass,
  tablett: Tablett,
  kanaler: Kanaler,
  slitt: Slitt,
  tannhals: Tannhals,
  plakk: Plakk,
  tannstein: Tannstein,
  skraa: Skraa,
  traad: Traad,
  tube: Tube,
  klokke: Klokke,
  allesider: AlleSider,
  snakke: Snakke,
  haand: Haand,
  roligtann: RoligTann,
  steg: Steg,
  hjerte: Hjerte,
  regning: Regning,
  frikort: Frikort,
};
