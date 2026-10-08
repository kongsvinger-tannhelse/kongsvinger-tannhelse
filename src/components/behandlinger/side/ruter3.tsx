import type { ReactNode } from "react";
import { FARGE as F, JEKSEL, STUBB, lauv } from "@/components/forside/behandlinger/popup/tegning";
import { AKSENT, BLEKK, Ramme, blekk, form, linje, type Stil } from "@/components/artikler/tegninger";
import { Gomme } from "./ruter";

/* Each page's own versions of the pictures that every page has: the talk,
   the close look, the bill, the x-ray, the plan, and the rest of a page's
   own steps. 120 × 120, in the same pen as ruter.tsx, so the formula stays
   the same while no two pages show the same picture. Server-safe. */

/** A molar crown (no roots), its biting edge up, its foot at `y`. */
function Krone({ strek = true, x, y, k, ink = BLEKK, fyll = F.papir, fure = true }: { strek?: boolean; x: number; y: number; k: number; ink?: string; fyll?: string; fure?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`}>
      <path d={JEKSEL.krone} {...form(strek, F.hvit, { w: 2.2 / k, ink, penFill: fyll })} />
      {fure && <path d={JEKSEL.fure} {...linje(strek, F.fure, 1.6 / k)} />}
    </g>
  );
}

/** The same crown upside down, its biting edge at `y`: an upper tooth. */
function OverKrone({ strek = true, x, y, k, ink = BLEKK, fyll = F.papir }: { strek?: boolean; x: number; y: number; k: number; ink?: string; fyll?: string }) {
  return (
    <g transform={`translate(${x} ${y - 104 * k}) rotate(180) scale(${k})`}>
      <path d={JEKSEL.krone} {...form(strek, F.hvit, { w: 2.2 / k, ink, penFill: fyll })} />
    </g>
  );
}

/** The gum as a soft band along the bottom. */
const gommeband = (strek: boolean, y = 86) => (
  <path d={`M4,${y} Q60,${y - 8} 116,${y} L116,116 L4,116 Z`} {...form(strek, F.tannkjott, { w: 1.8, ink: F.tannkjottMork, penFill: "#F6DCD7" })} />
);

/* ── Small things that go inside other pictures ── */

const HJERTE = "M60,96 C30,76 16,60 16,44 C16,32 26,24 37,24 C47,24 55,30 60,38 C65,30 73,24 83,24 C94,24 104,32 104,44 C104,60 90,76 60,96 Z";

/** A heart, `s` times its full size, centred on (x, y). */
const hjerte = (strek: boolean, x: number, y: number, s: number) => (
  <g transform={`translate(${x - 60 * s} ${y - 60 * s}) scale(${s})`}>
    <path d={HJERTE} {...form(strek, "#F5C9BF", { w: 2.2 / s, ink: AKSENT, penFill: "#FBE6E0" })} />
  </g>
);

/** The moon, with its centre near (x, y). */
const mane = (strek: boolean, x: number, y: number, s = 1) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-2,-10 a11,11 0 1 0 8,19 a8,8 0 1 1 -8,-19 Z" {...form(strek, "#F1D58A", { w: 1.6 / s })} />
  </g>
);

/* ── Talking ── */

/** Two speech bubbles, the first with what you talk about inside it, the reply with `svar`. */
function SnakkeOm({ strek = true, className, forsink, om, svar }: Stil & { om: ReactNode; svar?: ReactNode }) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M22,16 L78,16 Q88,16 88,26 L88,56 Q88,66 78,66 L40,66 L26,78 L28,66 L22,66 Q12,66 12,56 L12,26 Q12,16 22,16 Z" {...form(strek, F.hvit, { w: 2.2, penFill: F.papir })} />
      {om}
      <path d="M58,74 L98,74 Q108,74 108,84 L108,94 Q108,104 98,104 L94,104 L96,114 L84,104 L58,104 Q48,104 48,94 L48,84 Q48,74 58,74 Z" {...form(strek, "#E1EFF1", { w: 2.2, ink: F.teal, penFill: "#EEF7F8" })} />
      {svar}
    </Ramme>
  );
}

/** Talking about your health: a heart in the bubble. */
export const SnakkeHelse = (p: Stil) => <SnakkeOm {...p} om={hjerte(p.strek ?? true, 50, 42, 0.3)} />;

/** Talking about what lies behind it: a storm cloud in the bubble, a pill in the reply. */
export function SnakkeStress(p: Stil) {
  const strek = p.strek ?? true;
  return (
    <SnakkeOm
      {...p}
      om={
        <>
          <path d={lauv(48, 36, 17, 10, 7)} {...form(strek, F.blek, { w: 2, ink: F.metallMork, penFill: "#EEF0EC" })} />
          <path d="M50,44 l-6,9 l7,0 l-5,9" {...linje(strek, AKSENT, 2.2, AKSENT)} />
        </>
      }
      svar={
        <g transform="rotate(-14 78 89)">
          <rect x={68} y={84} width={20} height={10} rx={5} {...form(strek, F.hvit, { w: 1.8, ink: F.teal, penFill: "#FFFFFF" })} />
          <path d="M78,84 L78,94" {...linje(strek, F.teal, 1.6, F.teal)} />
        </g>
      }
    />
  );
}

/* ── Looking closely ── */

/** A magnifier held over `children`: the lens clear enough to see through. */
function LupePaa({ strek = true, className, forsink, children, x = 60, y = 62 }: Stil & { children: ReactNode; x?: number; y?: number }) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      {children}
      <circle cx={x} cy={y} r={20} {...form(strek, "#E1EFF1", { w: 2.4, penFill: "rgba(225,239,241,0.5)" })} />
      <path d={`M${x + 14},${y - 14} L${x + 36},${y - 36}`} {...linje(strek, BLEKK, 5)} />
      <path d={`M${x - 10},${y - 9} q5,-5 12,-4`} {...linje(strek, F.hvit, 2, F.teal)} />
    </Ramme>
  );
}

/** The whole mouth looked over: a magnifier over a row of teeth. */
export function LupeRad(p: Stil) {
  const strek = p.strek ?? true;
  return (
    <LupePaa {...p} x={58} y={66}>
      <Krone strek={strek} x={26} y={98} k={0.26} />
      <Krone strek={strek} x={60} y={96} k={0.28} />
      <Krone strek={strek} x={94} y={98} k={0.26} />
      <Gomme strek={strek} y={102} />
    </LupePaa>
  );
}

/** The gap looked at, before a bridge is planned. */
export function LupeGap(p: Stil) {
  const strek = p.strek ?? true;
  return (
    <LupePaa {...p} x={60} y={62}>
      {gommeband(strek, 88)}
      <Krone strek={strek} x={22} y={88} k={0.3} />
      <Krone strek={strek} x={98} y={88} k={0.3} />
      <path d="M50,80 Q60,68 70,80" {...linje(strek, F.metallMork, 2)} />
    </LupePaa>
  );
}

/** A worn tooth, its cusps ground flat, under the magnifier. */
const SLITT = "M-50,-6 C-54,-40 -52,-66 -46,-80 Q-44,-84 -38,-84 L38,-84 Q44,-84 46,-80 C52,-66 54,-40 50,-6 Z";
export function LupeSlitt(p: Stil) {
  const strek = p.strek ?? true;
  return (
    <LupePaa {...p} x={64} y={54}>
      <g transform="translate(56 98) scale(0.44)">
        <path d={SLITT} {...form(strek, F.hvit, { w: 2.4 / 0.44, penFill: F.papir })} />
        <path d="M-30,-76 l14,0 M2,-76 l10,0 M24,-76 l8,0" {...linje(strek, F.metallMork, 1.8 / 0.44)} />
      </g>
      <Gomme strek={strek} y={102} />
    </LupePaa>
  );
}

/** The dentist's little mirror, showing the back of a tooth. */
export function Speil({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Krone strek={strek} x={40} y={92} k={0.36} />
      <Gomme strek={strek} y={98} />
      <path d="M90,62 L104,92" {...linje(strek, F.metallMork, 2.4)} />
      <path d="M104,92 L114,114" {...linje(strek, F.metallMork, 6)} />
      <circle cx={84} cy={48} r={17} {...form(strek, "#E1EFF1", { w: 2.4, ink: F.metallMork, penFill: "#EEF7F8" })} />
      <g opacity={0.7}>
        <Krone strek={strek} x={84} y={58} k={0.16} ink={F.teal} fyll="#EEF7F8" fure={false} />
      </g>
      <path d="M74,38 q4,-4 9,-4" {...linje(strek, F.hvit, 1.8, F.teal)} />
    </Ramme>
  );
}

/* ── X-rays, the chart and the calendar ── */

/** Two small x-rays side by side, each with the teeth of both jaws meeting. */
export function RontgenTo({ strek = true, className, forsink }: Stil) {
  const gjest = "#7F9AA2";
  const film = (x: number) => (
    <g key={x}>
      <rect x={x} y={26} width={46} height={66} rx={8} {...form(strek, "#2B3D45", { w: 2.2, penFill: "#E6ECEC" })} />
      {[x + 13, x + 33].map((cx) => (
        <g key={cx}>
          <OverKrone strek={strek} x={cx} y={58} k={0.17} ink={gjest} fyll="none" />
          <Krone strek={strek} x={cx} y={58 + 104 * 0.17} k={0.17} ink={gjest} fyll="none" fure={false} />
        </g>
      ))}
    </g>
  );
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      {film(10)}
      {film(64)}
      <circle cx={98} cy={34} r={2.6} fill={F.teal} {...blekk(strek)} />
    </Ramme>
  );
}

/** The plan: a clipboard with the mouth seen from above, one tooth marked and one ticked. */
export function Tannkart({ strek = true, className, forsink }: Stil) {
  const tenner = [0.06, 0.19, 0.32, 0.45, 0.55, 0.68, 0.81, 0.94].map((t) => {
    const a = Math.PI * (1 - t);
    const x = Math.round((60 + Math.cos(a) * 21) * 10) / 10;
    const y = Math.round((42 + Math.sin(a) * 34) * 10) / 10;
    const vri = Math.round((Math.atan2(34 * Math.cos(a), -21 * Math.sin(a)) * 180) / Math.PI);
    return { x, y, vri };
  });
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <rect x={26} y={16} width={68} height={90} rx={6} {...form(strek, F.hvit, { w: 2.2, penFill: F.papir })} />
      <rect x={46} y={10} width={28} height={12} rx={4} {...form(strek, F.teal, { w: 2 })} />
      {tenner.map(({ x, y, vri }) => (
        <rect key={`${x}-${y}`} x={x - 4.5} y={y - 4} width={9} height={8} rx={2.5} transform={`rotate(${vri} ${x} ${y})`} {...form(strek, F.hvit, { w: 1.5, penFill: "#FFFFFF" })} />
      ))}
      <circle cx={tenner[2].x} cy={tenner[2].y} r={1.8} fill={F.hull} {...blekk(strek)} />
      <circle cx={tenner[6].x} cy={tenner[6].y} r={8} {...linje(strek, F.teal, 1.8, F.teal)} />
      <path d="M38,94 L82,94" {...linje(strek, F.metallMork, 2)} />
    </Ramme>
  );
}

/** A calendar page with one day ringed and a small tooth in it: the next check-up. */
export function Kalender({ strek = true, className, forsink }: Stil) {
  const dager = [56, 72, 88].flatMap((y) => [34, 52, 70, 88].map((x) => [x, y] as const)).filter(([x, y]) => !(x === 70 && y === 72));
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <rect x={18} y={24} width={84} height={78} rx={7} {...form(strek, F.hvit, { w: 2.2, penFill: F.papir })} />
      <path d="M18,40 L102,40" {...linje(strek, BLEKK, 2)} />
      <path d="M40,16 L40,30 M80,16 L80,30" {...linje(strek, BLEKK, 3)} />
      {dager.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={2.2} fill={F.metallMork} {...blekk(strek)} />
      ))}
      <circle cx={70} cy={72} r={9} {...linje(strek, F.teal, 2.2, F.teal)} />
      <Krone strek={strek} x={70} y={77} k={0.09} fure={false} />
    </Ramme>
  );
}

/* ── The bill ── */

/** The bill, with a round stamp of this page's treatment in its corner. */
function RegningMed({ strek = true, className, forsink, stempel }: Stil & { stempel: ReactNode }) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M26,14 L86,14 L86,100 L80,106 L74,100 L68,106 L62,100 L56,106 L50,100 L44,106 L38,100 L32,106 L26,100 Z" {...form(strek, F.hvit, { w: 2.2, penFill: F.papir })} />
      <path d="M36,32 L64,32 M36,44 L70,44 M36,56 L72,56 M36,68 L62,68" {...linje(strek, F.metallMork, 2)} />
      <ellipse cx={64} cy={86} rx={15} ry={9} {...linje(strek, F.teal, 2.4, F.teal)} />
      <path d="M54,86 L74,86" {...linje(strek, BLEKK, 2.4)} />
      <g transform="rotate(-12 92 28)">
        <circle cx={92} cy={28} r={15} {...form(strek, "#EEF7F8", { w: 2, ink: F.teal, penFill: "#EEF7F8" })} />
        <circle cx={92} cy={28} r={11.5} fill="none" stroke={F.teal} strokeWidth={1} strokeDasharray="2 2.4" opacity={0.7} {...blekk(strek)} />
        {stempel}
      </g>
    </Ramme>
  );
}

export const RegningSjekk = (p: Stil) => <RegningMed {...p} stempel={<Krone strek={p.strek ?? true} x={92} y={34} k={0.12} ink={F.teal} fure={false} />} />;
export const RegningNatt = (p: Stil) => <RegningMed {...p} stempel={mane(p.strek ?? true, 92, 28, 0.75)} />;
export function RegningBro(p: Stil) {
  const strek = p.strek ?? true;
  return (
    <RegningMed
      {...p}
      stempel={
        <>
          <path d="M84,30 L100,30" {...linje(strek, F.teal, 2.4, F.teal)} />
          {[83, 92, 101].map((x) => (
            <Krone key={x} strek={strek} x={x} y={34} k={0.075} ink={F.teal} fure={false} />
          ))}
        </>
      }
    />
  );
}

/* ── A bridge ── */

/** How a bridge holds: the bridge lifted above the two ground-down teeth it rests on. */
export function BroLost({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      {[24, 96].map((x) => (
        <g key={x} transform={`translate(${x} 92) scale(0.27)`}>
          <path d={STUBB.tann} {...form(strek, F.hvit, { w: 2.2 / 0.27, penFill: F.papir })} />
        </g>
      ))}
      {gommeband(strek, 92)}
      <path d="M26,34 L94,34" {...linje(strek, F.teal, 5, F.teal)} />
      <Krone strek={strek} x={24} y={48} k={0.25} ink={F.teal} fyll="#F4FAFB" />
      <Krone strek={strek} x={60} y={48} k={0.25} ink={F.teal} fyll="#F4FAFB" />
      <Krone strek={strek} x={96} y={48} k={0.25} ink={F.teal} fyll="#F4FAFB" />
      <path d="M24,54 L24,68 M19,63 L24,69 L29,63 M96,54 L96,68 M91,63 L96,69 L101,63" {...linje(strek, F.metallMork, 2)} />
    </Ramme>
  );
}

/** The choices for a missing tooth: a bridge, an implant or a denture, all pointing at the gap. */
export function Valg({ strek = true, className, forsink }: Stil) {
  const ring = (x: number, y: number) => <circle cx={x} cy={y} r={14} {...form(strek, F.hvit, { w: 2, penFill: "#FFFFFF" })} />;
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M60,82 L26,40 M60,82 L60,36 M60,82 L94,40" fill="none" stroke={F.metallMork} strokeWidth={1.6} strokeDasharray="3 4" strokeLinecap="round" {...blekk(strek)} />
      {gommeband(strek, 94)}
      <Krone strek={strek} x={22} y={94} k={0.28} />
      <Krone strek={strek} x={98} y={94} k={0.28} />
      <path d="M50,86 Q60,74 70,86" {...linje(strek, F.metallMork, 2)} />
      {ring(22, 28)}
      <path d="M13,27 L31,27" {...linje(strek, F.teal, 2.2, F.teal)} />
      {[14, 22, 30].map((x) => (
        <Krone key={x} strek={strek} x={x} y={32} k={0.075} ink={F.teal} fure={false} />
      ))}
      {ring(60, 22)}
      <Krone strek={strek} x={60} y={20} k={0.1} ink={F.teal} fure={false} />
      <path d="M56,21 L64,21 L62,32 L58,32 Z M55,24 L65,25 M56,28 L64,29" {...linje(strek, F.metallMork, 1.4)} />
      {ring(98, 28)}
      <path d="M89,22 Q89,36 98,36 Q107,36 107,22" {...linje(strek, F.tannkjottMork, 4, F.tannkjottMork)} />
    </Ramme>
  );
}

/** The plaster model the bridge is made on: the teeth cast in stone, the gap, and the bridge to come, dashed. */
export function Gips({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M12,82 Q60,72 108,82 L108,100 Q108,106 102,106 L18,106 Q12,106 12,100 Z" {...form(strek, F.ben, { w: 2.2, penFill: "#F6EFE1" })} />
      {[24, 42, 78, 96].map((x) => (
        <Krone key={x} strek={strek} x={x} y={80} k={0.17} fyll="#F6EFE1" />
      ))}
      <g transform="translate(60 80) scale(0.17)">
        <path d={JEKSEL.krone} fill="none" stroke={F.teal} strokeWidth={2 / 0.17} strokeDasharray={`${4 / 0.17} ${4 / 0.17}`} {...blekk(strek)} />
      </g>
      <path d="M26,94 L44,94" {...linje(strek, F.benStrek, 1.6)} />
    </Ramme>
  );
}

/** Keeping clean under a bridge: floss threaded under the new tooth. */
export function BroTraad({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      {gommeband(strek, 84)}
      <path d="M4,40 C22,46 38,78 50,78 L70,78 C82,78 98,46 116,40" {...linje(strek, BLEKK, 1.8)} />
      <path d="M30,64 L90,64" {...linje(strek, F.teal, 6, F.teal)} />
      <Krone strek={strek} x={24} y={84} k={0.27} ink={F.teal} fyll="#F4FAFB" />
      <Krone strek={strek} x={60} y={74} k={0.24} ink={F.teal} fyll="#F4FAFB" />
      <Krone strek={strek} x={96} y={84} k={0.27} ink={F.teal} fyll="#F4FAFB" />
      <ellipse cx={10} cy={36} rx={7} ry={4} transform="rotate(-20 10 36)" {...linje(strek, F.teal, 1.8, F.teal)} />
    </Ramme>
  );
}

/* ── The jaw ── */

/** A face, the jaw sore or at rest. */
function Fjes({ strek = true, className, forsink, ro }: Stil & { ro: boolean }) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M26,50 q-7,7 0,14 M94,50 q7,7 0,14" {...linje(strek, BLEKK, 2.2)} />
      <circle cx={60} cy={58} r={34} {...form(strek, F.hvit, { w: 2.4, penFill: F.papir })} />
      <path d="M27,52 Q26,24 60,23 Q94,24 93,52 Q86,36 60,35 Q38,35 27,52 Z" {...form(strek, F.metall, { w: 2, penFill: "#E3E8E8" })} />
      {ro ? (
        <>
          <path d="M42,58 q5,5 10,0 M68,58 q5,5 10,0" {...linje(strek, BLEKK, 2.2)} />
          <path d="M50,74 q10,7 20,0" {...linje(strek, BLEKK, 2.2)} />
          <path d="M31,70 a6,6 0 1 1 6,6 M34,73 L37,76 L34,79 M89,70 a6,6 0 1 0 -6,6 M86,73 L83,76 L86,79" {...linje(strek, F.teal, 1.8, F.teal)} />
        </>
      ) : (
        <>
          <path d="M42,58 L52,58 M68,58 L78,58 M42,50 l10,2 M78,50 l-10,2" {...linje(strek, BLEKK, 2.2)} />
          <path d="M48,76 q3,-3 6,0 q3,3 6,0 q3,-3 6,0 q3,3 6,0" {...linje(strek, BLEKK, 2)} />
          <circle cx={30} cy={70} r={4} {...form(strek, "#F5C9BF", { w: 1.6, ink: AKSENT, penFill: "#FBE6E0" })} />
          <circle cx={90} cy={70} r={4} {...form(strek, "#F5C9BF", { w: 1.6, ink: AKSENT, penFill: "#FBE6E0" })} />
          <path d="M16,70 l-7,-2 M17,78 l-6,4 M104,70 l7,-2 M103,78 l6,4" {...linje(strek, AKSENT, 2, AKSENT)} />
        </>
      )}
    </Ramme>
  );
}

export const KjeveSar = (p: Stil) => <Fjes {...p} ro={false} />;
export const KjeveRo = (p: Stil) => <Fjes {...p} ro />;

/** An impression tray with the marks of the teeth pressed into it. */
export function AvtrykkBitt({ strek = true, className, forsink }: Stil) {
  const merker = [0.2, 0.5, 0.8].flatMap((t) => {
    const x = Math.round(((1 - t) ** 2 * 29 + 2 * (1 - t) * t * 29 + t * t * 60) * 10) / 10;
    const y = Math.round(((1 - t) ** 2 * 42 + 2 * (1 - t) * t * 84 + t * t * 84) * 10) / 10;
    return [[x, y], [120 - x, y]];
  });
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M22,36 Q22,92 60,92 Q98,92 98,36 L84,36 Q84,76 60,76 Q36,76 36,36 Z" {...form(strek, "#E9C7D8", { w: 2.2, penFill: "#F6E6EE" })} />
      {merker.map(([x, y]) => (
        <ellipse key={`${x}-${y}`} cx={x} cy={y} rx={4} ry={3} {...form(strek, "#D9A9C1", { w: 1.4, ink: "#C38FA9", penFill: "#EDD3DF" })} />
      ))}
      <path d="M60,92 L60,110" {...linje(strek, F.metallMork, 4)} />
    </Ramme>
  );
}
