import type { ReactNode } from "react";
import { FARGE as F, FORTANN, JEKSEL, PULPA, draape, lauv, snofnugg, stjerne } from "@/components/forside/behandlinger/popup/tegning";
import { AKSENT, BLEKK, Ramme, blekk, form, linje, type Stil } from "@/components/artikler/tegninger";
import { Gomme } from "./ruter";
import { Krone, LupePaa, gommeband } from "./ruter3";

/* Page-specific panels for fillings, bleaching, cleaning and gum disease,
   and the small kit the later pages share: the calm frame for numbing, the
   x-ray film, front teeth, shade tabs and the clipboard. 120 × 120, in the
   same pen as ruter.tsx. Server-safe. */

/** The faint lines on an x-ray. */
export const GJEST = "#7F9AA2";

/** A front tooth, its biting edge up, its foot at `y`. */
export function Fortann({ strek = true, x, y, k, ink = BLEKK, fyll = F.papir, d = FORTANN.krone }: { strek?: boolean; x: number; y: number; k: number; ink?: string; fyll?: string; d?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`}>
      <path d={d} {...form(strek, F.hvit, { w: 2.2 / k, ink, penFill: fyll })} />
    </g>
  );
}

/** An upper front tooth hanging from the gum at `y`, its biting edge down. */
export function OverFortann({ strek = true, x, y, k, ink = BLEKK, fyll = F.papir }: { strek?: boolean; x: number; y: number; k: number; ink?: string; fyll?: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(180) scale(${k})`}>
      <path d={FORTANN.krone} {...form(strek, F.hvit, { w: 2.2 / k, ink, penFill: fyll })} />
    </g>
  );
}

/** A tooth drawn as an x-ray ghost: lines only. */
export function Gjest({ strek = true, x, y, k, d = JEKSEL.tann, rot = 0 }: { strek?: boolean; x: number; y: number; k: number; d?: string; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${k})`}>
      <path d={d} {...linje(strek, GJEST, 1.6 / k, GJEST)} />
    </g>
  );
}

/** Numbing, kept calm: soft rings and two small stars over this page's own tooth. */
export function RoligPaa({ strek = true, className, forsink, children }: Stil & { children: ReactNode }) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M24,52 A38,38 0 0 1 96,52 M14,58 A48,48 0 0 1 106,58" {...linje(strek, F.teal, 2, F.teal)} opacity={0.8} />
      {children}
      <path d={`${stjerne(20, 22, 6)} ${stjerne(100, 18, 5)}`} {...form(strek, "#F1D58A", { w: 1.6, ink: F.teal })} />
    </Ramme>
  );
}

/** An x-ray film with what this page is about on it. */
export function RontgenMed({ strek = true, className, forsink, children, x = 22, y = 14, w = 76, h = 92 }: Stil & { children: ReactNode; x?: number; y?: number; w?: number; h?: number }) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <rect x={x} y={y} width={w} height={h} rx={10} {...form(strek, "#2B3D45", { w: 2.2, penFill: "#E6ECEC" })} />
      {children}
      <circle cx={x + w - 10} cy={y + 10} r={3} fill={F.teal} {...blekk(strek)} />
    </Ramme>
  );
}

const NYANSER = ["#FFFDF6", "#F8EED5", "#F0DFB8"];
/** Three shade tabs on the left, and what they are matched to on the right. */
export function FargeMed({ strek = true, className, forsink, children }: Stil & { children: ReactNode }) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M8,26 L60,26" {...linje(strek, F.metallMork, 3)} />
      {NYANSER.map((f, i) => (
        <path key={f} d={`M${12 + i * 16},30 L${24 + i * 16},30 L${23 + i * 16},80 Q${18 + i * 16},86 ${13 + i * 16},80 Z`} {...form(strek, f, { w: 1.8, penFill: f })} />
      ))}
      {children}
    </Ramme>
  );
}

/** A clipboard with ticks, and a small mark of this page at its top. */
export function PlanMed({ strek = true, className, forsink, children }: Stil & { children: ReactNode }) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <rect x={28} y={16} width={64} height={88} rx={6} {...form(strek, F.hvit, { w: 2.2, penFill: F.papir })} />
      <rect x={46} y={10} width={28} height={12} rx={4} {...form(strek, F.teal, { w: 2 })} />
      {children}
      {[64, 80].map((y) => (
        <g key={y}>
          <path d={`M38,${y} l4,4 l8,-9`} {...linje(strek, F.teal, 2.4, F.teal)} />
          <path d={`M56,${y} L82,${y}`} {...linje(strek, F.metallMork, 2)} />
        </g>
      ))}
      <path d="M38,94 L70,94" {...linje(strek, F.metallMork, 2)} />
    </Ramme>
  );
}

/* ── Fillings ── */

/** A molar cut through: the nerve inside, the filling on top. */
export function FyllingSnitt({ strek = true, className, forsink }: Stil) {
  const k = 0.42;
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <g transform={`translate(60 72) scale(${k})`}>
        <path d={JEKSEL.tann} {...form(strek, F.hvit, { w: 2.4 / k, penFill: F.papir })} />
        <path d={PULPA} fill="#F1B9AE" fillOpacity={0.85} {...blekk(strek)} />
        <path d={lauv(0, -86, 22, 10, 11, 9)} {...form(strek, F.fylling, { w: 2 / k, ink: F.teal, penFill: F.fylling })} />
      </g>
      <Gomme strek={strek} y={76} />
    </Ramme>
  );
}

/** Numbing before a filling: the tooth with its hole, kept calm. */
export function RoligHull(p: Stil) {
  const strek = p.strek ?? true;
  return (
    <RoligPaa {...p}>
      <Krone strek={strek} x={60} y={102} k={0.36} />
      <path d={lauv(62, 70, 7, 4, 5, 8)} fill={F.hull} {...blekk(strek)} />
      <Gomme strek={strek} y={108} />
    </RoligPaa>
  );
}

/** A tooth asleep: numbed before the work begins. */
export function TannSover({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Krone strek={strek} x={56} y={102} k={0.44} fure={false} />
      <path d="M43,78 q4,4 8,0 M61,78 q4,4 8,0" {...linje(strek, BLEKK, 2.2)} />
      <path d="M52,88 q4,2 8,0" {...linje(strek, BLEKK, 1.8)} />
      <path d="M84,44 l9,0 l-9,9 l9,0 M98,26 l7,0 l-7,7 l7,0" {...linje(strek, F.teal, 2.2, F.teal)} />
      <Gomme strek={strek} y={108} />
    </Ramme>
  );
}

/** Afterwards a deep filling can feel the cold and the heat: an ice cube and a hot cup either side. */
export function KaldVarm({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Krone strek={strek} x={60} y={100} k={0.32} />
      <path d={lauv(60, 74, 7, 4, 3, 8)} fill={F.fylling} stroke={F.teal} strokeWidth={1.6} {...blekk(strek)} />
      <Gomme strek={strek} y={106} />
      <rect x={10} y={26} width={22} height={22} rx={5} transform="rotate(-12 21 37)" {...form(strek, "#DDF0F5", { w: 2, ink: F.teal, penFill: "#EAF6F9" })} />
      <path d={snofnugg(21, 37, 5)} {...linje(strek, F.kulde, 1.4, F.teal)} />
      <path d="M82,34 L104,34 L101,54 Q100,58 96,58 L90,58 Q86,58 85,54 Z" {...form(strek, F.hvit, { w: 2, penFill: "#FFFFFF" })} />
      <path d="M104,38 q7,0 6,7 q-1,5 -7,5" {...linje(strek, BLEKK, 2)} />
      <path d="M88,26 q-3,-5 0,-10 M95,26 q-3,-5 0,-10" {...linje(strek, AKSENT, 1.8, AKSENT)} />
      <path d="M40,58 l-6,-4 M80,58 l6,-4" {...linje(strek, F.smerte, 1.8, AKSENT)} />
    </Ramme>
  );
}

/* ── Bleaching ── */

/** How bleaching works: small bubbles lift the stain out of the tooth. */
export function Peroksid({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Fortann strek={strek} x={50} y={106} k={0.7} fyll="#FBF6E6" />
      <path d="M8,108 Q50,98 92,108" {...linje(strek, F.tannkjottMork, 2.2, F.tannkjottMork)} />
      {[
        [38, 66, 3],
        [46, 80, 2.4],
        [56, 58, 2.6],
      ].map(([x, y, r]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill="#C9A97A" {...blekk(strek)} />
      ))}
      {[
        [80, 50, 4],
        [92, 34, 5],
        [102, 18, 3.4],
        [78, 26, 3],
      ].map(([x, y, r]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={r} {...form(strek, "#E1EFF1", { w: 1.6, ink: F.teal, penFill: "#F2F9FA" })} />
      ))}
    </Ramme>
  );
}

/** An hourglass: the years. */
export function Timeglass({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M38,14 L82,14 M38,106 L82,106" {...linje(strek, BLEKK, 4)} />
      <path d="M42,16 Q42,44 60,60 Q42,76 42,104 L78,104 Q78,76 60,60 Q78,44 78,16 Z" {...form(strek, "#EEF7F8", { w: 2.2, penFill: "#F6FAFA" })} />
      <path d="M50,40 L70,40 Q66,52 60,58 Q54,52 50,40 Z" fill="#F1D58A" {...blekk(strek)} />
      <path d="M46,104 Q50,86 60,82 Q70,86 74,104 Z" fill="#F1D58A" {...blekk(strek)} />
      <path d="M60,62 L60,80" {...linje(strek, "#D9B65A", 1.4, "#D9B65A")} />
    </Ramme>
  );
}

/** The magnifier over a front tooth: the enamel looked at first. */
export function LupeEmalje(p: Stil) {
  const strek = p.strek ?? true;
  return (
    <LupePaa {...p} x={56} y={62}>
      <Fortann strek={strek} x={56} y={106} k={0.62} fyll="#FBF6E6" />
      <g transform="translate(56 106) scale(0.62)">
        <path d="M-15,-10 C-19,-30 -23,-54 -22,-74 C-22,-84 -20,-88 -12,-89 L12,-89 C20,-88 22,-84 22,-74 C23,-54 19,-30 15,-10" {...linje(strek, F.fure, 1.6 / 0.62, F.teal)} strokeDasharray="4 5" />
      </g>
      <path d="M8,108 Q56,98 104,108" {...linje(strek, F.tannkjottMork, 2.2, F.tannkjottMork)} />
    </LupePaa>
  );
}

/** The impression of the front teeth: the tray comes up from below. */
export function AvtrykkSmil({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M4,10 L116,10 L116,22 Q104,30 92,24 Q80,30 68,24 Q56,30 44,24 Q32,30 20,24 Q12,28 4,22 Z" {...form(strek, F.tannkjott, { w: 1.8, ink: F.tannkjottMork, penFill: "#F6DCD7" })} />
      {[20, 44, 68, 92].map((x, i) => (
        <OverFortann key={x} strek={strek} x={x + 4} y={24} k={i === 1 || i === 2 ? 0.42 : 0.36} />
      ))}
      <path d="M12,76 L108,76 L102,94 Q60,104 18,94 Z" {...form(strek, "#E9C7D8", { w: 2.2, penFill: "#F6E6EE" })} />
      <path d="M20,82 Q60,90 100,82" {...linje(strek, "#C38FA9", 1.6, "#C38FA9")} />
      <path d="M60,99 L60,114" {...linje(strek, F.metallMork, 4)} />
      <path d="M10,66 L10,52 M5,57 L10,51 L15,57 M110,66 L110,52 M105,57 L110,51 L115,57" {...linje(strek, F.teal, 2, F.teal)} />
    </Ramme>
  );
}

/** Some feel the cold, or a sore gum, while they bleach. */
export function BlekeSart({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Fortann strek={strek} x={50} y={102} k={0.62} />
      <path d="M8,104 Q30,94 50,100 Q70,94 92,104" {...linje(strek, F.sart, 3, AKSENT)} />
      <path d="M30,96 l-5,-5 M70,96 l5,-5" {...linje(strek, F.smerte, 1.6, AKSENT)} />
      <path d={snofnugg(94, 36, 12)} {...linje(strek, F.kulde, 2.4, F.teal)} />
      <path d={snofnugg(104, 64, 6)} {...linje(strek, F.kulde, 1.8, F.teal)} />
    </Ramme>
  );
}

/** How long it lasts: three teeth, from white back to a little darker, slowly. */
export function HvitFalmer({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      {[
        [22, "#FFFFFF"],
        [60, "#FAF2DD"],
        [98, "#F3E3BD"],
      ].map(([x, f]) => (
        <Fortann key={x} strek={strek} x={x as number} y={78} k={0.4} fyll={f as string} />
      ))}
      <path d={`${stjerne(30, 26, 5)}`} {...form(strek, "#F1D58A", { w: 1.4, ink: F.teal })} />
      <path d="M14,94 L104,94 M98,89 L104,94 L98,99" fill="none" stroke={F.metallMork} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 5" {...blekk(strek)} />
    </Ramme>
  );
}

/** Strong bleach is for dentists only, and not for anyone under 18: the tube with a lock and an 18. */
export function Bleke18({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M12,62 L70,54 L70,88 L12,80 Q6,71 12,62 Z" {...form(strek, F.hvit, { w: 2.2, penFill: F.papir })} />
      <path d="M26,62 L26,80 M36,61 L36,82" {...linje(strek, F.teal, 2.4, F.teal)} />
      <rect x={70} y={60} width={14} height={22} rx={3} {...form(strek, F.teal, { w: 2.2 })} />
      <circle cx={88} cy={30} r={17} {...form(strek, "#FBE6E0", { w: 2.4, ink: AKSENT, penFill: "#FBE6E0" })} />
      <text x={88} y={36} textAnchor="middle" fontSize={17} fontWeight={700} fill={AKSENT} {...blekk(strek)}>
        18
      </text>
      <path d="M50,100 L50,94 a6,6 0 0 1 12,0 L62,100" {...linje(strek, BLEKK, 2)} />
      <rect x={46} y={100} width={20} height={14} rx={3} {...form(strek, "#F1D58A", { w: 2 })} />
    </Ramme>
  );
}

/* ── Cleaning ── */

/** Plaque, close up: the bacteria at the gum line under the magnifier. */
export function LupePlakk(p: Stil) {
  const strek = p.strek ?? true;
  return (
    <LupePaa {...p} x={56} y={92}>
      <Krone strek={strek} x={50} y={104} k={0.42} />
      <Gomme strek={strek} y={110} />
      {[
        [40, 96, 4, 2.4],
        [50, 99, 3.4, 2],
        [60, 96, 4.2, 2.4],
        [68, 92, 3, 2],
        [46, 90, 2.6, 1.8],
      ].map(([x, y, rx, ry]) => (
        <ellipse key={`${x}-${y}`} cx={x} cy={y} rx={rx} ry={ry} {...form(strek, "#D9D08A", { w: 1.2, ink: "#A39A4E", penFill: "#E8E2A6" })} />
      ))}
    </LupePaa>
  );
}

/** A front tooth stained and rough. */
export function Misfarget({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Fortann strek={strek} x={60} y={104} k={0.66} fyll="#F7EED6" />
      <path d={lauv(48, 86, 8, 5, 4, 8)} fill="#C9A97A" fillOpacity={0.8} {...blekk(strek)} />
      <path d={lauv(70, 92, 7, 4, 9, 8)} fill="#B8935E" fillOpacity={0.8} {...blekk(strek)} />
      <path d="M44,60 l4,-3 M54,54 l3,4 M66,58 l4,-2 M72,70 l-3,3" {...linje(strek, F.metallMork, 1.6)} />
      <path d="M10,106 Q60,96 110,106" {...linje(strek, F.tannkjottMork, 2.2, F.tannkjottMork)} />
    </Ramme>
  );
}

/** A small brush cleaning between two teeth. */
export function Mellomrom({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Krone strek={strek} x={32} y={98} k={0.32} />
      <Krone strek={strek} x={88} y={98} k={0.32} />
      <Gomme strek={strek} y={104} />
      <path d="M108,16 L66,64" {...linje(strek, F.teal, 5, F.teal)} />
      <path d="M66,64 L62,72" {...linje(strek, F.metallMork, 2)} />
      <ellipse cx={60} cy={80} rx={5} ry={11} transform="rotate(20 60 80)" {...form(strek, "#EEF1F1", { w: 1.6, ink: F.metallMork, penFill: "#F4F6F6" })} />
      <path d="M56,74 l8,2 M55,79 l9,2 M55,84 l8,2" {...linje(strek, F.metallMork, 1.2)} />
    </Ramme>
  );
}

/** Who may remove tartar: a card with a person, a tooth and a tick. */
export function Autorisert({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <rect x={12} y={28} width={96} height={64} rx={9} {...form(strek, "#E1EFF1", { w: 2.2, penFill: "#EEF7F8" })} />
      <circle cx={36} cy={52} r={9} {...form(strek, F.hvit, { w: 2, penFill: F.papir })} />
      <path d="M22,80 Q22,66 36,66 Q50,66 50,80" {...form(strek, F.hvit, { w: 2, penFill: F.papir })} />
      <path d="M60,48 L94,48 M60,60 L86,60" {...linje(strek, F.metallMork, 2.2)} />
      <circle cx={88} cy={76} r={10} {...form(strek, F.teal, { w: 2, ink: F.teal })} />
      <path d="M83,76 L87,80 L94,72" {...linje(strek, F.hvit, 2.4, F.teal)} />
      <Krone strek={strek} x={64} y={82} k={0.1} ink={F.teal} fure={false} />
    </Ramme>
  );
}

/* ── Gum disease ── */

/** Two stages side by side: red, swollen gum round a tooth that stands firm, and gum and bone that have drawn back. */
export function ToStadier({ strek = true, className, forsink }: Stil) {
  const k = 0.3;
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M4,80 L57,80 L57,118 L4,118 Z" fill={F.ben} fillOpacity={0.7} {...blekk(strek)} />
      <path d="M63,96 L116,96 L116,118 L63,118 Z" fill={F.ben} fillOpacity={0.7} {...blekk(strek)} />
      {[30, 90].map((x) => (
        <g key={x} transform={`translate(${x} 70) scale(${k})`}>
          <path d={JEKSEL.tann} {...form(strek, F.hvit, { w: 2.2 / k, penFill: F.papir })} />
        </g>
      ))}
      <path d="M4,70 Q10,58 18,66 L42,66 Q50,58 57,70 L57,82 L4,82 Z" {...form(strek, "#F2B3A8", { w: 2.2, ink: AKSENT, penFill: "#F6C9C0" })} />
      <path d="M63,86 Q72,82 78,86 L102,86 Q108,82 116,86 L116,96 L63,96 Z" {...form(strek, F.tannkjott, { w: 2, ink: F.tannkjottMork, penFill: "#F6DCD7" })} />
      <path d="M64,70 L116,70" fill="none" stroke={F.metallMork} strokeWidth={1.4} strokeDasharray="3 4" {...blekk(strek)} />
      <path d="M60,8 L60,114" fill="none" stroke={F.fure} strokeWidth={1.4} strokeDasharray="2 5" {...blekk(strek)} />
    </Ramme>
  );
}

/** Bleeding when you floss: the floss between two teeth, and a red drop. */
export function Blor({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Krone strek={strek} x={32} y={90} k={0.32} />
      <Krone strek={strek} x={88} y={90} k={0.32} />
      <path d="M8,94 Q34,82 60,92 Q86,82 112,94" {...linje(strek, F.sart, 2.6, AKSENT)} />
      <path d="M44,14 L58,90 L62,90 L76,14" {...linje(strek, F.teal, 1.8, F.teal)} />
      <path d={draape(60, 104, 5)} {...form(strek, F.smerte, { w: 1.6, ink: AKSENT, penFill: "#F2B3A8" })} />
    </Ramme>
  );
}

/** A tooth that has moved and come loose, between two that stand still. */
export function LosTann({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Krone strek={strek} x={20} y={92} k={0.28} />
      <Krone strek={strek} x={100} y={92} k={0.28} />
      <g transform="rotate(12 60 94)">
        <Krone strek={strek} x={60} y={92} k={0.3} />
      </g>
      {gommeband(strek, 94)}
      <path d="M40,54 q-6,8 0,16 M34,50 q-8,12 0,24 M84,54 q6,8 0,16 M90,50 q8,12 0,24" {...linje(strek, F.teal, 1.8, F.teal)} />
    </Ramme>
  );
}

/** Measuring the pocket: a thin probe with marks, down along the tooth under the gum. */
export function Sonde({ strek = true, className, forsink }: Stil) {
  const k = 0.36;
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <g transform={`translate(50 66) scale(${k})`}>
        <path d={JEKSEL.tann} {...form(strek, F.hvit, { w: 2.2 / k, penFill: F.papir })} />
      </g>
      <path d="M4,66 Q30,58 50,64 Q72,58 116,66 L116,116 L4,116 Z" {...form(strek, F.tannkjott, { w: 1.8, ink: F.tannkjottMork, penFill: "rgba(246,220,215,0.8)" })} />
      <path d="M96,8 L74,40 L70,80" {...linje(strek, F.metallMork, 2.4)} />
      <path d="M70.6,72 l5,0.6 M71.2,64 l5,0.6 M71.8,56 l5,0.6" {...linje(strek, BLEKK, 1.6)} />
      <rect x={90} y={5} width={12} height={10} rx={2} transform="rotate(35 96 10)" {...form(strek, F.teal, { w: 1.6 })} />
    </Ramme>
  );
}

/** What you use at home: a cup with a toothbrush, floss and a small brush for between the teeth. */
export function HjemUtstyr({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M40,22 L46,64 M58,14 L58,64" {...linje(strek, F.teal, 4, F.teal)} />
      <rect x={52} y={6} width={12} height={10} rx={3} {...form(strek, F.hvit, { w: 1.6, penFill: "#FFFFFF" })} />
      <path d="M70,30 L66,64" {...linje(strek, F.metallMork, 3)} />
      <path d="M71,22 l-4,0 M71,26 l-4,0 M72,30 l-4,0" {...linje(strek, F.metallMork, 1.4)} />
      <path d="M30,60 L86,60 L80,104 Q79,108 74,108 L42,108 Q37,108 36,104 Z" {...form(strek, "#E1EFF1", { w: 2.2, penFill: "#EEF7F8" })} />
      <rect x={88} y={80} width={22} height={24} rx={6} {...form(strek, F.hvit, { w: 2, penFill: "#FFFFFF" })} />
      <path d="M99,80 Q104,68 112,70" {...linje(strek, BLEKK, 1.4)} />
    </Ramme>
  );
}

/** Scaling under the gum: the tartar on the root, and the fine instrument reaching it. */
export function SkrapeUnder({ strek = true, className, forsink }: Stil) {
  const k = 0.36;
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <g transform={`translate(54 62) scale(${k})`}>
        <path d={JEKSEL.tann} {...form(strek, F.hvit, { w: 2.2 / k, penFill: F.papir })} />
      </g>
      <path d={lauv(70, 72, 4, 6, 3, 7)} fill="#B9A55C" {...blekk(strek)} />
      <path d={lauv(36, 76, 3.4, 5, 8, 7)} fill="#B9A55C" {...blekk(strek)} />
      <path d="M4,62 Q30,54 54,60 Q78,54 116,62 L116,116 L4,116 Z" {...form(strek, F.tannkjott, { w: 1.8, ink: F.tannkjottMork, penFill: "rgba(246,220,215,0.72)" })} />
      <path d="M108,10 L84,44 Q78,56 76,70 L72,76" {...linje(strek, F.metallMork, 2.6)} />
      <rect x={100} y={5} width={12} height={12} rx={2} transform="rotate(35 106 11)" {...form(strek, F.teal, { w: 1.6 })} />
    </Ramme>
  );
}

/** Before and after: red gum, then calm pink gum and a tick. */
export function ForEtter({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Krone strek={strek} x={28} y={68} k={0.26} />
      <path d="M6,70 Q28,60 50,70 L50,84 L6,84 Z" {...form(strek, "#F2B3A8", { w: 2, ink: AKSENT, penFill: "#F6C9C0" })} />
      <Krone strek={strek} x={92} y={68} k={0.26} />
      <path d="M70,70 Q92,64 114,70 L114,84 L70,84 Z" {...form(strek, F.tannkjott, { w: 2, ink: F.tannkjottMork, penFill: "#F6DCD7" })} />
      <path d="M52,52 L66,52 M61,47 L67,52 L61,57" {...linje(strek, F.metallMork, 2)} />
      <circle cx={92} cy={102} r={9} {...form(strek, F.teal, { w: 2, ink: F.teal })} />
      <path d="M87,102 L91,106 L98,98" {...linje(strek, F.hvit, 2.4, F.teal)} />
    </Ramme>
  );
}

/** Regular check-ups and cleaning: arrows going round and round a tooth. */
export function Gjentak({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Krone strek={strek} x={60} y={80} k={0.3} />
      <path d="M8,84 Q34,74 60,82 Q86,74 112,84" {...linje(strek, F.tannkjottMork, 2.2, F.tannkjottMork)} />
      <path d="M22,44 A40,40 0 0 1 98,44 M92,36 L98,45 L106,38 M98,90 A40,40 0 0 1 22,90 M28,98 L22,89 L14,96" {...linje(strek, F.teal, 2.4, F.teal)} />
    </Ramme>
  );
}

/** What is lost seldom comes back: the bone line now, and where it was, dashed. */
export function TaptVev({ strek = true, className, forsink }: Stil) {
  const k = 0.42;
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M4,86 Q30,82 44,92 Q60,98 76,92 Q90,82 116,86 L116,118 L4,118 Z" fill={F.ben} fillOpacity={0.7} {...blekk(strek)} />
      <g transform={`translate(60 58) scale(${k})`}>
        <path d={JEKSEL.tann} {...form(strek, F.hvit, { w: 2.2 / k, penFill: F.papir })} />
        <path d={JEKSEL.fure} {...linje(strek, F.fure, 1.6 / k)} />
      </g>
      <path d="M4,70 Q30,64 40,70 M80,70 Q90,64 116,70" {...linje(strek, F.tannkjottMork, 2.2, F.tannkjottMork)} />
      <path d="M8,72 Q60,64 112,72" fill="none" stroke={F.metallMork} strokeWidth={1.6} strokeDasharray="4 4" {...blekk(strek)} />
    </Ramme>
  );
}
