import { FARGE as F, FORTANN, JEKSEL, PULPA, STUBB, draape, lauv, r2, snofnugg, stjerne } from "@/components/forside/behandlinger/popup/tegning";
import { AKSENT, BLEKK, Ramme, STEIN, blekk, form, linje, type Stil } from "@/components/artikler/tegninger";
import { Gomme } from "./ruter";
import { Krone, LupePaa, SnakkeOm, gommeband } from "./ruter3";
import { Fortann, GJEST, Gjest, RontgenMed } from "./ruter4";

/* Page-specific panels for sensitive teeth, bad breath, a lost filling and
   a loose crown. 120 × 120, in the same pen as ruter.tsx. Server-safe. */

const KRONE_FYLL = "#F4FAFB";
const SAR = { w: 1.8, ink: AKSENT, penFill: "#F6C9C0" };
const GRONN = "#7E9160";
const SEMENT = "#E9C46A";

/** A snowflake in teal. */
const sno = (strek: boolean, x: number, y: number, a: number, farge: string = F.teal) => <path d={snofnugg(x, y, a)} {...linje(strek, farge, 1.8, farge)} />;
/** A wavy line of smell, from x for `n` waves. */
const lukt = (x: number, y: number, n: number) => `M${x},${y}` + " q4,-5 8,0 q4,5 8,0".repeat(n);
/** A little bacterium with two eyes. */
const bakterie = (strek: boolean, x: number, y: number, r: number, seed: number) => (
  <g key={`${x}-${y}`}>
    <path d={lauv(x, y, r, r * 0.86, seed, 7)} {...form(strek, F.bjork, { w: 1.4, penFill: "#E6EDD8" })} />
    <circle cx={r2(x - r * 0.3)} cy={r2(y - r * 0.1)} r={r2(r * 0.16)} fill={BLEKK} {...blekk(strek)} />
    <circle cx={r2(x + r * 0.3)} cy={r2(y - r * 0.1)} r={r2(r * 0.16)} fill={BLEKK} {...blekk(strek)} />
  </g>
);
/** The top of the stump, where the crown sits, as one line (for the cement round it). */
const STUBB_TOPP = "M-40,-6 C-42,-28 -36,-50 -26,-58 C-12,-64 12,-64 26,-58 C36,-50 42,-28 40,-6";
/** A ground-down molar stump above the gum line at y (the gum band covers the rest). */
function Stubbe({ strek, x, y, k }: { strek: boolean; x: number; y: number; k: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`}>
      <path d={`${STUBB_TOPP} Z`} {...form(strek, F.hvit, { w: 2.2 / k, penFill: F.papir })} />
    </g>
  );
}

/* ── Sensitive teeth ── */

/** Where it ices: the gum drawn back on one side, the root bare, and the cold going in. */
export function BarRot({ strek = true, className, forsink }: Stil) {
  const k = 0.42;
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M4,64 Q34,56 60,62 Q90,62 116,76 L116,116 L4,116 Z" fill={F.ben} fillOpacity={0.55} {...blekk(strek)} />
      <g transform={`translate(54 60) scale(${k})`}>
        <path d={JEKSEL.tann} {...form(strek, F.hvit, { w: 2.2 / k, penFill: F.papir })} />
        <path d={PULPA} fill="#F1B9AE" fillOpacity={0.7} {...blekk(strek)} />
      </g>
      <path d="M65,60 L75,59 Q74.6,68 72.6,77 L63,77 Z" fill={F.dentin} fillOpacity={0.95} {...blekk(strek)} />
      <path d="M72,64 L63,62 M71.5,70 L62,68 M71,75 L62,74" {...linje(strek, F.dentinMork, 1.4, F.dentinMork)} />
      <path d="M4,62 Q20,55 33,60" {...linje(strek, F.tannkjottMork, 2.2, F.tannkjottMork)} />
      <path d="M74,78 Q96,72 116,78" {...linje(strek, F.tannkjottMork, 2.2, F.tannkjottMork)} />
      {sno(strek, 102, 34, 9)}
      <path d="M96,46 L80,62 M80,54 L80,62 L88,62" {...linje(strek, F.teal, 2, F.teal)} />
    </Ramme>
  );
}

/** A hole, and the cold. */
export function IsingHull({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Krone strek={strek} x={54} y={98} k={0.44} />
      <path d={lauv(48, 60, 7, 5, 3, 8)} fill={F.hull} {...blekk(strek)} />
      <Gomme strek={strek} y={104} />
      {sno(strek, 98, 28, 9)}
    </Ramme>
  );
}

/** A crack, and the cold. */
export function IsingSprekk({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Krone strek={strek} x={64} y={98} k={0.44} />
      <path d="M70,54 l-5,10 l6,8 l-5,10 l4,8" {...linje(strek, BLEKK, 2)} />
      <Gomme strek={strek} y={104} />
      {sno(strek, 22, 28, 9)}
    </Ramme>
  );
}

/** A worn filling with a dark gap at its edge, and the cold. */
export function IsingFylling({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Krone strek={strek} x={54} y={98} k={0.44} />
      <path d={lauv(52, 62, 14, 7, 6, 9)} {...form(strek, F.fylling, { w: 1.8, ink: F.teal, penFill: F.fylling })} />
      <path d="M64,57 Q70,62 65,69" {...linje(strek, F.hull, 2.6, F.hull)} />
      <Gomme strek={strek} y={104} />
      {sno(strek, 98, 26, 9)}
    </Ramme>
  );
}

/** Red, sore gum round a front tooth. */
export function IsingTannkjott({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Fortann strek={strek} x={60} y={96} k={0.6} />
      <path d="M4,92 Q30,80 46,90 Q60,96 74,90 Q90,80 116,92 L116,116 L4,116 Z" {...form(strek, F.sart, SAR)} />
      <path d="M22,70 l-7,-5 M98,70 l7,-5" {...linje(strek, AKSENT, 2, AKSENT)} />
    </Ramme>
  );
}

/** An inflamed nerve: the cold long gone (a faint flake), but the tooth still aching. */
export function IsingNerve({ strek = true, className, forsink }: Stil) {
  const k = 0.4;
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M6,74 Q60,66 114,74" {...linje(strek, F.tannkjottMork, 2.2, F.tannkjottMork)} />
      <g transform={`translate(58 74) scale(${k})`}>
        <path d={JEKSEL.tann} {...form(strek, F.hvit, { w: 2.2 / k, penFill: F.papir })} />
        <path d={PULPA} {...form(strek, F.smerte, { w: 1.8 / k, ink: AKSENT, penFill: "rgba(217,99,76,0.3)" })} />
      </g>
      {sno(strek, 18, 24, 8, STEIN)}
      <path d="M86,24 Q100,32 104,48 M92,14 Q110,24 114,44" {...linje(strek, AKSENT, 2.2, AKSENT)} />
    </Ramme>
  );
}

/** Talking about when it ices: an ice cream in the bubble, a cold tooth in the reply. */
export function SnakkeIsing(p: Stil) {
  const strek = p.strek ?? true;
  return (
    <SnakkeOm
      {...p}
      om={
        <>
          <path d="M40,40 L48,60 L56,40 Z" {...form(strek, "#E9C48A", { w: 1.6, ink: "#C9A54A", penFill: "#F3DDB4" })} />
          <circle cx={48} cy={34} r={9} {...form(strek, "#F7C3BC", { w: 1.6, ink: AKSENT, penFill: "#FBE1DD" })} />
          {sno(strek, 70, 36, 6)}
        </>
      }
      svar={
        <>
          <Krone strek={strek} x={70} y={98} k={0.14} fure={false} />
          {sno(strek, 88, 88, 4.5)}
        </>
      }
    />
  );
}

/** Brushing gently: a soft brush at the gum line, and a feather. */
export function MykPuss({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Krone strek={strek} x={42} y={94} k={0.4} />
      {gommeband(strek, 94)}
      <g transform="translate(64 84) rotate(-48)">
        <rect x={0} y={-6} width={22} height={9} rx={3} {...form(strek, F.hvit, { w: 1.8, penFill: "#FFFFFF" })} />
        <path d="M3,3 q-1,5 1,8 M8,3 q-1,5 1,8 M13,3 q-1,5 1,8 M18,3 q-1,5 1,8" {...linje(strek, F.metallMork, 1.3)} />
        <rect x={22} y={-5} width={52} height={7} rx={3.5} {...form(strek, F.teal, { w: 1.8 })} />
      </g>
      <path d="M12,44 Q20,16 46,8 Q36,32 12,44 Z" {...form(strek, F.hvit, { w: 1.8, ink: F.metallMork, penFill: "#FFFFFF" })} />
      <path d="M12,44 Q26,26 40,14 M22,30 l-4,-4 M28,24 l-3,-5 M30,30 l5,0" {...linje(strek, F.metallMork, 1.3)} />
    </Ramme>
  );
}

/** At the clinic: a small cup of paste, and the applicator at the tooth's neck. */
export function EgneMidler({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Krone strek={strek} x={76} y={94} k={0.4} />
      {gommeband(strek, 94)}
      <path d="M10,62 L14,80 Q26,86 38,80 L42,62" {...form(strek, F.hvit, { w: 1.8, penFill: "#FFFFFF" })} />
      <ellipse cx={26} cy={62} rx={16} ry={5} {...form(strek, "#BFE0E6", { w: 1.6, ink: F.teal, penFill: "#DDEFF2" })} />
      <path d="M22,24 L55,84" {...linje(strek, F.metallMork, 2.2)} />
      <circle cx={56} cy={86} r={3.4} {...form(strek, "#BFE0E6", { w: 1.4, ink: F.teal, penFill: "#DDEFF2" })} />
      <path d={stjerne(98, 40, 5)} {...form(strek, "#F1D58A", { w: 1.4, ink: F.teal })} />
    </Ramme>
  );
}

/** A thin layer over the bare neck of a tooth, sealing it. */
export function TyntLag({ strek = true, className, forsink }: Stil) {
  const k = 0.55;
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <g transform={`translate(56 62) scale(${k})`}>
        <path d={FORTANN.tann} {...form(strek, F.hvit, { w: 2.2 / k, penFill: F.papir })} />
      </g>
      <path d="M44.5,60 L67.5,60 L63.7,84 L48.3,84 Z" fill={F.dentin} fillOpacity={0.95} {...blekk(strek)} />
      <path d="M42.5,58 L69.5,58 L65.7,86 L46.3,86 Z" {...form(strek, F.teal, { w: 1.8, ink: F.teal, penFill: "rgba(225,239,241,0.6)" })} />
      <path d="M4,86 Q56,78 116,86 L116,116 L4,116 Z" {...form(strek, F.tannkjott, { w: 1.8, ink: F.tannkjottMork, penFill: "#F6DCD7" })} />
      <path d="M86,40 l6,6 l14,-16" {...linje(strek, F.teal, 3, F.teal)} />
    </Ramme>
  );
}

/** Repaired: the filling in place, and the cold crossed out. */
export function IsingReparert({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Krone strek={strek} x={50} y={98} k={0.44} />
      <path d={lauv(48, 60, 10, 6, 4, 8)} {...form(strek, F.fylling, { w: 1.8, ink: F.teal, penFill: F.fylling })} />
      <Gomme strek={strek} y={104} />
      {sno(strek, 94, 32, 10, STEIN)}
      <path d="M82,20 L106,44" {...linje(strek, F.teal, 2.6, F.teal)} />
    </Ramme>
  );
}

/* ── Bad breath ── */

/** An open mouth, and a smell drifting up out of it. */
export function MunnAnde({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M8,84 Q32,62 56,84 Q32,106 8,84 Z" {...form(strek, "#F3C2B8", { w: 2.2, ink: "#C9675A", penFill: "#F8DCD6" })} />
      <path d="M16,84 Q32,74 48,84 Q32,94 16,84 Z" fill="#8A4A42" fillOpacity={0.8} {...blekk(strek)} />
      <path d={`${lukt(52, 72, 3)} ${lukt(58, 60, 3)} ${lukt(64, 48, 2)}`} {...linje(strek, GRONN, 2, GRONN)} />
      <path d={lauv(96, 30, 16, 11, 5, 9)} {...form(strek, "#E6EDD8", { w: 1.8, ink: GRONN, penFill: "#EEF3E4" })} />
    </Ramme>
  );
}

/** A tongue with a coating at the back, and bacteria in it. */
export function BeleggTunge({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M26,14 L94,14 Q98,68 76,98 Q60,110 44,98 Q22,68 26,14 Z" {...form(strek, "#F1A39A", { w: 2.2, ink: AKSENT, penFill: "#F7C3BC" })} />
      <path d={lauv(60, 34, 26, 14, 9, 11)} {...form(strek, "#EFE7C9", { w: 1.6, ink: "#C9B87A", penFill: "#F5EFD9" })} />
      <path d="M60,52 L60,92" {...linje(strek, AKSENT, 1.6, AKSENT)} />
      {[
        [48, 32],
        [62, 28],
        [72, 38],
      ].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r={2.2} fill={GRONN} {...blekk(strek)} />
      ))}
    </Ramme>
  );
}

/** A bit of food stuck between two teeth. */
export function MatMellom({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Krone strek={strek} x={36} y={96} k={0.38} />
      <Krone strek={strek} x={84} y={96} k={0.38} />
      <Gomme strek={strek} y={102} />
      <path d="M54,74 Q58,52 70,58 Q66,74 54,74 Z" {...form(strek, F.bjork, { w: 1.6, ink: GRONN, penFill: "#E6EDD8" })} />
      <path d="M57,70 Q61,62 66,60" {...linje(strek, GRONN, 1.2, GRONN)} />
      <path d={lukt(46, 34, 3)} {...linje(strek, GRONN, 2, GRONN)} />
    </Ramme>
  );
}

/** A hole and red gum, and the smell over them. */
export function HullAnde({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Krone strek={strek} x={50} y={92} k={0.42} />
      <path d={lauv(56, 56, 7, 5, 6, 8)} fill={F.hull} {...blekk(strek)} />
      <path d="M4,90 Q30,78 50,88 Q74,78 116,90 L116,116 L4,116 Z" {...form(strek, F.sart, SAR)} />
      <path d={`${lukt(74, 30, 2)} ${lukt(80, 18, 2)}`} {...linje(strek, GRONN, 2, GRONN)} />
    </Ramme>
  );
}

/** A dry mouth in the morning: the alarm clock, and an empty drop. */
export function MorgenTorr({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M22,44 Q22,32 34,32 M66,44 Q66,32 54,32" {...linje(strek, BLEKK, 3)} />
      <circle cx={44} cy={66} r={26} {...form(strek, F.hvit, { w: 2.4, penFill: "#FFFFFF" })} />
      <path d="M44,66 L44,50 M44,66 L33,74" {...linje(strek, BLEKK, 2.4)} />
      <path d="M28,92 L22,102 M60,92 L66,102" {...linje(strek, BLEKK, 2.4)} />
      <path d="M14,52 l-6,-4 M12,64 l-8,0" {...linje(strek, F.teal, 1.8, F.teal)} />
      <path d={draape(94, 66, 13)} fill="none" stroke={F.teal} strokeWidth={2} strokeDasharray="4 4" strokeLinecap="round" {...blekk(strek)} />
    </Ramme>
  );
}

/** An onion and a garlic bulb, and a smell over them. */
export function Lok({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M34,104 Q10,96 14,72 Q20,52 36,46 L38,34 L44,34 L44,46 Q62,52 66,72 Q70,96 46,104 Z" {...form(strek, "#D9A9C1", { w: 2, ink: "#B07A98", penFill: "#F0DCE6" })} />
      <path d="M40,48 Q28,70 36,102 M40,48 Q54,70 44,102" {...linje(strek, "#B07A98", 1.3, "#B07A98")} />
      <path d="M41,34 Q38,24 42,16 M41,34 Q46,26 50,22" {...linje(strek, GRONN, 1.8, GRONN)} />
      <path d="M86,106 Q66,102 68,84 Q72,68 88,62 L88,52 Q90,48 92,52 L92,62 Q108,68 112,84 Q114,102 94,106 Z" {...form(strek, F.hvit, { w: 2, penFill: "#FFFFFF" })} />
      <path d="M90,64 Q80,84 84,104 M90,64 Q100,84 96,104" {...linje(strek, F.metallMork, 1.3)} />
      <path d={lukt(56, 22, 3)} {...linje(strek, GRONN, 2, GRONN)} />
    </Ramme>
  );
}

/** Brush and clean between: a toothbrush and a floss pick, crossed. */
export function PussTraad({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <g transform="rotate(-40 60 60)">
        <rect x={14} y={54} width={20} height={9} rx={3} {...form(strek, F.hvit, { w: 1.8, penFill: "#FFFFFF" })} />
        <path d="M17,63 L17,70 M21,63 L21,70 M25,63 L25,70 M29,63 L29,70" {...linje(strek, F.metallMork, 1.3)} />
        <rect x={34} y={55} width={72} height={7} rx={3.5} {...form(strek, F.teal, { w: 1.8 })} />
      </g>
      <g transform="rotate(40 60 60)">
        <path d="M16,50 L16,66 M30,50 L30,66" {...linje(strek, "#B07A98", 2.4, "#B07A98")} />
        <path d="M16,52 L30,52" {...linje(strek, BLEKK, 1.2)} />
        <path d="M16,66 Q23,72 30,66 L30,62 L104,60 L104,64 L30,68" {...form(strek, "#E9C7D8", { w: 1.8, ink: "#B07A98", penFill: "#F6E6EE" })} />
      </g>
    </Ramme>
  );
}

/** A tongue scraper drawn down the tongue. */
export function Tungeskrape({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M30,10 L90,10 Q94,58 76,84 Q60,94 44,84 Q26,58 30,10 Z" {...form(strek, "#F1A39A", { w: 2.2, ink: AKSENT, penFill: "#F7C3BC" })} />
      <path d="M60,16 L60,40" {...linje(strek, AKSENT, 1.4, AKSENT)} />
      {[
        [46, 22],
        [56, 26],
        [70, 20],
        [74, 30],
      ].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r={2.4} fill="#D8C27A" {...blekk(strek)} />
      ))}
      <path d="M34,46 Q60,62 86,46" {...linje(strek, F.teal, 3.4, F.teal)} />
      <path d="M34,46 L20,110 M86,46 L100,110" {...linje(strek, F.teal, 4, F.teal)} />
      <path d="M52,64 l-3,8 M64,66 l2,8" {...linje(strek, F.metallMork, 1.6)} />
    </Ramme>
  );
}

/** Drink enough water: a water bottle, and a drop. */
export function Vannflaske({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M38,60 L82,60 L82,104 Q82,108 78,108 L42,108 Q38,108 38,104 Z" fill="#BFE0E6" fillOpacity={0.6} {...blekk(strek)} />
      <path d="M46,24 L74,24 L74,32 Q86,40 86,54 L86,104 Q86,112 78,112 L42,112 Q34,112 34,104 L34,54 Q34,40 46,32 Z" {...form(strek, F.hvit, { w: 2.2, ink: F.teal, penFill: "rgba(238,247,248,0.4)" })} />
      <rect x={46} y={12} width={28} height={13} rx={3} {...form(strek, F.teal, { w: 2 })} />
      <path d="M42,70 Q60,64 78,70" {...linje(strek, F.teal, 1.6, F.teal)} />
      <path d={draape(104, 44, 6)} {...form(strek, "#BFE0E6", { w: 1.6, ink: F.teal, penFill: "#E3F2F5" })} />
    </Ramme>
  );
}

/** Talking about it: a smell cloud in the bubble, a clean tooth in the reply. */
export function SnakkeAnde(p: Stil) {
  const strek = p.strek ?? true;
  return (
    <SnakkeOm
      {...p}
      om={
        <>
          <path d={lauv(50, 36, 18, 10, 4, 9)} {...form(strek, "#E6EDD8", { w: 1.6, ink: GRONN, penFill: "#EEF3E4" })} />
          <path d={lukt(30, 56, 4)} {...linje(strek, GRONN, 1.6, GRONN)} />
        </>
      }
      svar={
        <>
          <Krone strek={strek} x={72} y={98} k={0.14} fure={false} />
          <path d={stjerne(90, 86, 4)} {...form(strek, "#F1D58A", { w: 1.2, ink: F.teal })} />
        </>
      }
    />
  );
}

/** The dentist looks at the gum line: tartar, and red gum, under the magnifier. */
export function LupeAnde(p: Stil) {
  const strek = p.strek ?? true;
  return (
    <LupePaa {...p} x={48} y={78}>
      <Krone strek={strek} x={46} y={92} k={0.42} />
      <Krone strek={strek} x={104} y={92} k={0.26} />
      <path d="M4,90 Q26,80 46,88 Q70,80 116,90 L116,116 L4,116 Z" {...form(strek, F.sart, SAR)} />
      <path d={lauv(40, 86, 12, 5, 7, 9)} {...form(strek, "#D8C27A", { w: 1.4, ink: "#B9A55C", penFill: "#E9DAA2" })} />
    </LupePaa>
  );
}

/** A cleaning: the polishing cup at work, and the tooth shining. */
export function RensAnde({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Krone strek={strek} x={42} y={96} k={0.42} />
      {gommeband(strek, 96)}
      <path d="M112,18 L80,52" {...linje(strek, F.metallMork, 5)} />
      <path d="M112,18 L100,31" {...linje(strek, F.teal, 8, F.teal)} />
      <path d="M80,52 L74,58 L68,56 L70,50 L76,46 Z" {...form(strek, "#E9C7D8", { w: 1.6, ink: "#B07A98", penFill: "#F6E6EE" })} />
      <path d={`${stjerne(22, 30, 7)} ${stjerne(58, 26, 5)}`} {...form(strek, "#F1D58A", { w: 1.4, ink: F.teal })} />
    </Ramme>
  );
}

/** To the doctor: a stethoscope. */
export function Lege({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M36,18 Q28,20 30,32 L38,62 Q44,80 58,80 Q72,80 78,62 L86,32 Q88,20 80,18" {...linje(strek, F.metallMork, 3)} />
      <circle cx={36} cy={17} r={3.6} {...form(strek, F.metall, { w: 1.6 })} />
      <circle cx={80} cy={17} r={3.6} {...form(strek, F.metall, { w: 1.6 })} />
      <path d="M58,80 Q58,104 82,102 Q96,100 96,86" {...linje(strek, F.teal, 3.4, F.teal)} />
      <circle cx={96} cy={78} r={10} {...form(strek, F.metall, { w: 2.2, penFill: "#EEF1F1" })} />
      <circle cx={96} cy={78} r={5} {...form(strek, F.hvit, { w: 1.4, penFill: "#FFFFFF" })} />
    </Ramme>
  );
}

/* ── A lost filling ── */

/** Why fillings go: decay creeping in at the edge of one, a crack by the other. */
export function FyllingKant({ strek = true, className, forsink }: Stil) {
  const k = 0.44;
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <g transform={`translate(60 72) scale(${k})`}>
        <path d={JEKSEL.tann} {...form(strek, F.hvit, { w: 2.2 / k, penFill: F.papir })} />
        <path d={PULPA} fill="#F1B9AE" fillOpacity={0.7} {...blekk(strek)} />
        <path d={lauv(-2, -84, 26, 10, 11, 9)} {...form(strek, F.fylling, { w: 1.8 / k, ink: F.teal, penFill: F.fylling })} />
        <path d={lauv(26, -78, 8, 6, 5, 8)} fill={F.hull} {...blekk(strek)} />
        <path d="M-28,-80 l-6,14 l6,10" {...linje(strek, BLEKK, 1.8 / k)} />
      </g>
      <Gomme strek={strek} y={76} />
    </Ramme>
  );
}

/** Without the filling the tooth lies open: the empty hole, bacteria on their way in towards the nerve, and the cold. */
export function ApenTann({ strek = true, className, forsink }: Stil) {
  const k = 0.44;
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <g transform={`translate(56 76) scale(${k})`}>
        <path d={JEKSEL.tann} {...form(strek, F.hvit, { w: 2.2 / k, penFill: F.papir })} />
        <path d={PULPA} fill="#F1B9AE" fillOpacity={0.7} {...blekk(strek)} />
        <path d="M-22,-94 Q-24,-70 0,-68 Q24,-70 22,-94" {...form(strek, F.papir, { w: 2 / k, ink: F.hull, penFill: "#EFE6DA" })} />
      </g>
      <Gomme strek={strek} y={80} />
      {bakterie(strek, 52, 42, 5, 3)}
      {bakterie(strek, 64, 30, 4.4, 8)}
      <path d="M58,50 L58,58" fill="none" stroke={AKSENT} strokeWidth={1.8} strokeDasharray="2 3" strokeLinecap="round" {...blekk(strek)} />
      {sno(strek, 100, 26, 8)}
    </Ramme>
  );
}

/** The x-ray: the filling bright, and a dark spot under its edge. */
export function RontgenFylling(p: Stil) {
  const strek = p.strek ?? true;
  return (
    <RontgenMed {...p}>
      <Gjest strek={strek} x={60} y={62} k={0.36} />
      <path d={lauv(58, 31, 11, 5, 4, 8)} fill="#FFFFFF" fillOpacity={0.9} stroke={GJEST} strokeWidth={1.2} {...blekk(strek)} />
      <path d={lauv(70, 38, 4, 3, 7, 7)} fill={GJEST} fillOpacity={0.6} {...blekk(strek)} />
    </RontgenMed>
  );
}

/** The decay at the edge taken out with a small hand instrument. */
export function FjerneKant({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Krone strek={strek} x={46} y={98} k={0.46} />
      <path d="M34,52 Q34,66 46,66 Q60,66 60,52" {...form(strek, F.papir, { w: 1.8, ink: F.hull, penFill: "#EFE6DA" })} />
      <path d={lauv(58, 60, 4.4, 3.4, 5, 7)} fill={F.hull} {...blekk(strek)} />
      <Gomme strek={strek} y={104} />
      <path d="M110,12 L68,58" {...linje(strek, F.metallMork, 2.6)} />
      <path d="M110,12 L96,28" {...linje(strek, F.teal, 7, F.teal)} />
      <circle cx={66} cy={60} r={3} {...form(strek, F.metall, { w: 1.4 })} />
    </Ramme>
  );
}

/** A new filling, or the old one mended: a fresh patch beside the old filling, and the small tool shaping it. */
export function LappFylling({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Krone strek={strek} x={48} y={98} k={0.46} />
      <path d={lauv(40, 62, 12, 6, 6, 9)} {...form(strek, F.fylling, { w: 1.8, ink: F.teal, penFill: F.fylling })} />
      <path d={lauv(58, 61, 7, 5, 2, 8)} {...form(strek, "#FFFFFF", { w: 1.6, ink: F.teal, penFill: "#FFFFFF" })} />
      <Gomme strek={strek} y={104} />
      <path d="M112,14 L64,56" {...linje(strek, F.metallMork, 2.6)} />
      <path d="M112,14 L98,26" {...linje(strek, F.teal, 7, F.teal)} />
      <path d={stjerne(22, 30, 6)} {...form(strek, "#F1D58A", { w: 1.4, ink: F.teal })} />
    </Ramme>
  );
}

/** Too little left: the broken tooth, and two ways on, an inlay or a crown. */
export function InnleggKrone({ strek = true, className, forsink }: Stil) {
  const ring = (x: number, y: number) => <circle cx={x} cy={y} r={17} {...form(strek, F.hvit, { w: 2, penFill: "#FFFFFF" })} />;
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M60,66 L32,40 M60,66 L88,40" fill="none" stroke={F.metallMork} strokeWidth={1.6} strokeDasharray="3 4" strokeLinecap="round" {...blekk(strek)} />
      <Krone strek={strek} x={60} y={108} k={0.36} fure={false} />
      <path d="M44,74 Q46,90 60,90 Q76,90 78,72" {...form(strek, F.papir, { w: 1.8, ink: F.hull, penFill: "#EFE6DA" })} />
      <Gomme strek={strek} y={112} />
      {ring(24, 24)}
      <path d="M14,20 L34,20 L31,32 L17,32 Z" {...form(strek, F.fylling, { w: 1.6, ink: F.teal, penFill: F.fylling })} />
      {ring(96, 24)}
      <Krone strek={strek} x={96} y={34} k={0.17} ink={F.teal} fyll={KRONE_FYLL} />
    </Ramme>
  );
}

/* ── A loose crown ── */

/** How a crown holds: the stump, the cement round it, and the crown over both. */
export function KroneSement({ strek = true, className, forsink }: Stil) {
  const k = 0.44;
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <g transform={`translate(60 76) scale(${k})`}>
        <path d={JEKSEL.krone} {...form(strek, KRONE_FYLL, { w: 2.2 / k, ink: F.teal, penFill: "rgba(225,239,241,0.6)" })} />
        <path d={STUBB_TOPP} fill="none" stroke={SEMENT} strokeWidth={7 / k} strokeLinecap="round" {...blekk(strek)} />
        <path d={STUBB.tann} {...form(strek, F.hvit, { w: 2.2 / k, penFill: F.papir })} />
      </g>
      <Gomme strek={strek} y={78} />
    </Ramme>
  );
}

/** A new hole in the tooth under the crown, at its edge. */
export function HullUnder({ strek = true, className, forsink }: Stil) {
  const k = 0.42;
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <g transform={`translate(60 86) scale(${k})`}>
        <path d={STUBB.tann} {...form(strek, F.hvit, { w: 2.2 / k, penFill: F.papir })} />
        <path d={JEKSEL.krone} {...form(strek, KRONE_FYLL, { w: 2.2 / k, ink: F.teal, penFill: "rgba(225,239,241,0.55)" })} />
        <path d={lauv(38, -12, 12, 9, 4, 8)} fill={F.hull} {...blekk(strek)} />
      </g>
      <Gomme strek={strek} y={88} />
    </Ramme>
  );
}

/** The tooth under the crown cracked, the crown tipping. */
export function SprekkUnder({ strek = true, className, forsink }: Stil) {
  const k = 0.42;
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <g transform={`translate(60 82) scale(${k})`}>
        <path d={STUBB.tann} {...form(strek, F.hvit, { w: 2.2 / k, penFill: F.papir })} />
        <path d="M-4,-60 l8,16 l-6,14 l8,18 l-4,14" {...linje(strek, BLEKK, 2 / k)} />
      </g>
      <g transform={`translate(62 72) rotate(8) scale(${k})`}>
        <path d={JEKSEL.krone} {...form(strek, KRONE_FYLL, { w: 2.2 / k, ink: F.teal, penFill: "rgba(225,239,241,0.55)" })} />
      </g>
      <Gomme strek={strek} y={84} />
      <path d="M96,30 l6,-6 M100,42 l8,-2" {...linje(strek, F.metallMork, 1.8)} />
    </Ramme>
  );
}

/** Sticky food pulling at the crown: a toffee on it, stretching. */
export function Klissete({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Stubbe strek={strek} x={60} y={98} k={0.4} />
      {gommeband(strek, 98)}
      <Krone strek={strek} x={60} y={84} k={0.4} ink={F.teal} fyll={KRONE_FYLL} />
      <path d="M50,40 Q46,34 50,28 M60,40 Q64,34 60,28 M70,40 Q74,34 70,28" {...linje(strek, "#C9803E", 1.6, "#9A6230")} />
      <rect x={42} y={8} width={36} height={22} rx={7} {...form(strek, "#C9803E", { w: 2, ink: "#9A6230", penFill: "#E9B97A" })} />
      <path d="M96,70 L96,48 M90,54 L96,48 L102,54" {...linje(strek, F.teal, 2.2, F.teal)} />
    </Ramme>
  );
}

/** Great forces: a weight pressing down on a crown. */
export function Vekt({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M48,44 Q48,22 60,22 Q72,22 72,44" {...linje(strek, BLEKK, 4)} />
      <path d="M38,44 L82,44 L90,72 L30,72 Z" {...form(strek, F.metall, { w: 2.2, ink: BLEKK, penFill: "#D8DFE0" })} />
      <Krone strek={strek} x={60} y={110} k={0.34} ink={F.teal} fyll={KRONE_FYLL} />
      <path d="M22,92 l-9,0 M24,100 l-8,4 M98,92 l9,0 M96,100 l8,4" {...linje(strek, AKSENT, 2, AKSENT)} />
      <path d="M60,2 L60,16 M55,11 L60,16 L65,11" {...linje(strek, F.teal, 2, F.teal)} />
    </Ramme>
  );
}

/** The cement at the edge worn away: whole on one side, gone on the other, crumbs falling. */
export function SementSlitt({ strek = true, className, forsink }: Stil) {
  const k = 0.46;
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <g transform={`translate(58 80) scale(${k})`}>
        <path d={JEKSEL.krone} {...form(strek, KRONE_FYLL, { w: 2.2 / k, ink: F.teal, penFill: "rgba(225,239,241,0.6)" })} />
        <path d="M-40,-6 C-42,-28 -36,-50 -26,-58 C-12,-64 12,-64 26,-58 C34,-52 38,-40 40,-30" fill="none" stroke={SEMENT} strokeWidth={7 / k} strokeLinecap="round" {...blekk(strek)} />
        <path d="M40,-26 C41,-18 41,-12 40,-6" fill="none" stroke={F.hull} strokeWidth={1.6 / k} strokeDasharray={`${3 / k} ${3 / k}`} {...blekk(strek)} />
        <path d={STUBB.tann} {...form(strek, F.hvit, { w: 2.2 / k, penFill: F.papir })} />
      </g>
      <Gomme strek={strek} y={82} />
      {[
        [84, 90, 2.4],
        [90, 98, 2],
        [82, 102, 1.6],
      ].map(([x, y, r]) => (
        <circle key={x} cx={x} cy={y} r={r} {...form(strek, SEMENT, { w: 1, ink: "#C9A54A", penFill: "#F3DFA2" })} />
      ))}
    </Ramme>
  );
}

/** The dentist looks: the crown off and lying beside, the magnifier over the stump. */
export function LupeKrone(p: Stil) {
  const strek = p.strek ?? true;
  return (
    <LupePaa {...p} x={42} y={72}>
      <Stubbe strek={strek} x={42} y={96} k={0.4} />
      {gommeband(strek, 96)}
      <g transform="rotate(-70 96 80)">
        <Krone strek={strek} x={96} y={92} k={0.26} ink={F.teal} fyll={KRONE_FYLL} />
      </g>
    </LupePaa>
  );
}

/** The x-ray: the crown shows white, the stump's ghost under it, and a dark spot at the edge. */
export function RontgenKrone(p: Stil) {
  const strek = p.strek ?? true;
  const k = 0.38;
  return (
    <RontgenMed {...p}>
      <Gjest strek={strek} x={60} y={70} k={k} d={STUBB.tann} />
      <g transform={`translate(60 70) scale(${k})`}>
        <path d={JEKSEL.krone} fill="#FFFFFF" fillOpacity={0.85} stroke={GJEST} strokeWidth={1.4 / k} {...blekk(strek)} />
      </g>
      <path d={lauv(76, 70, 4, 3, 3, 7)} fill={GJEST} fillOpacity={0.6} {...blekk(strek)} />
    </RontgenMed>
  );
}

/** The tooth seen to first: a filling in the stump, a tick, and the crown waiting above (dashed). */
export function BehandleStump({ strek = true, className, forsink }: Stil) {
  const k = 0.4;
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Stubbe strek={strek} x={54} y={100} k={0.44} />
      {gommeband(strek, 100)}
      <path d={lauv(62, 78, 8, 5, 6, 8)} {...form(strek, F.fylling, { w: 1.6, ink: F.teal, penFill: F.fylling })} />
      <g transform={`translate(54 58) scale(${k})`}>
        <path d={JEKSEL.krone} fill="none" stroke={F.teal} strokeWidth={1.8 / k} strokeDasharray={`${4 / k} ${4 / k}`} {...blekk(strek)} />
      </g>
      <path d="M90,30 l6,6 l14,-16" {...linje(strek, F.teal, 3, F.teal)} />
    </Ramme>
  );
}

/** Sometimes a new crown: the old one cracked, an arrow, the new one shining. */
export function NyKrone({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Krone strek={strek} x={28} y={84} k={0.3} ink={F.teal} fyll={KRONE_FYLL} />
      <path d="M30,56 l-3,8 l4,6 l-3,8" {...linje(strek, BLEKK, 1.8)} />
      <path d="M50,70 L70,70 M64,64 L70,70 L64,76" {...linje(strek, F.metallMork, 2.4)} />
      <Krone strek={strek} x={92} y={84} k={0.3} ink={F.teal} fyll={KRONE_FYLL} />
      <path d={`${stjerne(108, 42, 6)} ${stjerne(80, 40, 4)}`} {...form(strek, "#F1D58A", { w: 1.4, ink: F.teal })} />
      <path d="M8,92 Q60,84 112,92" {...linje(strek, F.metallMork, 2)} />
    </Ramme>
  );
}
