import { FARGE as F, FORTANN, JEKSEL, STUBB, lauv, r2, stjerne } from "@/components/forside/behandlinger/popup/tegning";
import { BLEKK, Ramme, blekk, form, linje, type Stil } from "@/components/artikler/tegninger";
import { Gomme } from "./ruter";
import { Fjes, Krone, SnakkeOm, gommeband } from "./ruter3";
import { FargeMed, Fortann, GJEST, Gjest, OverFortann, RoligPaa, RontgenMed } from "./ruter4";

/* Page-specific panels for crowns, veneers, implants and full dentures.
   120 × 120, in the same pen as ruter.tsx. Server-safe. */

const KRONE_FYLL = "#F4FAFB";

/** An implant in the bone: the screw, its threads, and the gum line over it. */
function Skrue({ strek = true, x = 60, y = 60, k = 1 }: { strek?: boolean; x?: number; y?: number; k?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`}>
      <path d="M-8,0 L8,0 L6,40 Q0,48 -6,40 Z" {...form(strek, F.metall, { w: 2 / k })} />
      <path d="M-8,8 L8,4 M-8,16 L8,12 M-7,24 L7,20 M-6,32 L6,28" {...linje(strek, F.metallMork, 1.4 / k)} />
    </g>
  );
}

/* ── Crowns ── */

/** A crown is a cap: you see the ground-down tooth through it. */
export function KroneKappe({ strek = true, className, forsink }: Stil) {
  const k = 0.42;
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <g transform={`translate(60 74) scale(${k})`}>
        <path d={STUBB.tann} {...form(strek, F.hvit, { w: 2.2 / k, penFill: F.papir })} />
        <path d={JEKSEL.krone} {...form(strek, KRONE_FYLL, { w: 2.2 / k, ink: F.teal, penFill: "rgba(225,239,241,0.55)" })} />
      </g>
      <Gomme strek={strek} y={78} />
    </Ramme>
  );
}

/** Too little left for a filling: a big old filling, and a crack beside it. */
export function LiteIgjen({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Krone strek={strek} x={60} y={98} k={0.44} fure={false} />
      <path d={lauv(62, 62, 18, 9, 6, 9)} {...form(strek, F.fylling, { w: 2, ink: F.teal, penFill: F.fylling })} />
      <path d="M48,72 L44,80 L48,86 L44,94" {...linje(strek, BLEKK, 1.8)} />
      <Gomme strek={strek} y={104} />
    </Ramme>
  );
}

/** Finding the colour for the crown: the shade tabs held by it. */
export function FargeKrone(p: Stil) {
  const strek = p.strek ?? true;
  return (
    <FargeMed {...p}>
      <Krone strek={strek} x={88} y={86} k={0.3} ink={F.teal} fyll={KRONE_FYLL} />
      <Gomme strek={strek} y={92} />
    </FargeMed>
  );
}

/** A scanner instead of a tray: the wand over the tooth, its light on it. */
export function Skanner({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Krone strek={strek} x={44} y={100} k={0.34} />
      <Gomme strek={strek} y={106} />
      <path d="M50,60 L30,56 L36,46 Z" fill="#7FB8E8" fillOpacity={0.35} {...blekk(strek)} />
      <path d="M44,58 L106,14 L114,24 L52,66 Q46,68 44,64 Z" {...form(strek, F.hvit, { w: 2.2, penFill: F.papir })} />
      <path d="M98,24 L104,32" {...linje(strek, F.teal, 3, F.teal)} />
      <path d="M30,40 l-6,-4 M26,52 l-8,0 M32,62 l-6,4" {...linje(strek, "#4A90D0", 1.6, "#4A90D0")} />
    </Ramme>
  );
}

/** Keeping a crown clean: floss between it and the tooth beside. */
export function KroneTraad({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Krone strek={strek} x={34} y={96} k={0.34} ink={F.teal} fyll={KRONE_FYLL} />
      <Krone strek={strek} x={88} y={96} k={0.32} />
      <Gomme strek={strek} y={102} />
      <path d="M46,16 L58,94 L64,94 L78,16" {...linje(strek, BLEKK, 1.6)} />
    </Ramme>
  );
}

/* ── Veneers ── */

/** Two front teeth from the front: the shell coming onto one of them. */
export function FortennerFasett({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M4,8 L116,8 L116,20 Q96,30 80,22 Q60,30 40,22 Q24,30 4,20 Z" {...form(strek, F.tannkjott, { w: 1.8, ink: F.tannkjottMork, penFill: "#F6DCD7" })} />
      <OverFortann strek={strek} x={38} y={24} k={0.66} />
      <OverFortann strek={strek} x={82} y={24} k={0.66} />
      <g transform="translate(88 18) rotate(180) scale(0.7)">
        <path d={FORTANN.krone} {...form(strek, KRONE_FYLL, { w: 2.2 / 0.7, ink: F.teal, penFill: "rgba(225,239,241,0.7)" })} />
      </g>
      <path d="M104,74 l8,4 M104,60 l9,-1 M100,90 l6,7" {...linje(strek, F.teal, 2, F.teal)} />
    </Ramme>
  );
}

/** Other choices than veneers: bleaching, a filling or a crown, all pointing at the front tooth. */
export function ValgFasett({ strek = true, className, forsink }: Stil) {
  const ring = (x: number, y: number) => <circle cx={x} cy={y} r={14} {...form(strek, F.hvit, { w: 2, penFill: "#FFFFFF" })} />;
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M60,74 L24,40 M60,74 L60,36 M60,74 L96,40" fill="none" stroke={F.metallMork} strokeWidth={1.6} strokeDasharray="3 4" strokeLinecap="round" {...blekk(strek)} />
      <Fortann strek={strek} x={60} y={112} k={0.42} />
      <path d="M20,112 Q60,104 100,112" {...linje(strek, F.tannkjottMork, 2.2, F.tannkjottMork)} />
      {ring(22, 28)}
      <path d="M12,28 L28,24 L28,34 L12,32 Q9,30 12,28 Z" {...form(strek, F.hvit, { w: 1.4, penFill: "#FFFFFF" })} />
      <rect x={28} y={25} width={5} height={8} rx={1} {...form(strek, F.teal, { w: 1.2 })} />
      {ring(60, 22)}
      <Fortann strek={strek} x={60} y={32} k={0.14} />
      <path d={lauv(62, 22, 3, 2.4, 4, 7)} fill={F.fylling} stroke={F.teal} strokeWidth={1.2} {...blekk(strek)} />
      {ring(98, 28)}
      <Fortann strek={strek} x={98} y={38} k={0.14} ink={F.teal} fyll={KRONE_FYLL} />
    </Ramme>
  );
}

/** Colour and form talked through: the shade tabs held by a front tooth. */
export function FargeFortann(p: Stil) {
  const strek = p.strek ?? true;
  return (
    <FargeMed {...p}>
      <Fortann strek={strek} x={88} y={96} k={0.46} />
      <path d="M66,98 Q88,92 110,98" {...linje(strek, F.tannkjottMork, 2.2, F.tannkjottMork)} />
    </FargeMed>
  );
}

/** The stone model of the front teeth, with the veneers to come dashed on two of them. */
export function GipsFortenner({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M10,78 Q60,68 110,78 L110,98 Q110,104 104,104 L16,104 Q10,104 10,98 Z" {...form(strek, F.ben, { w: 2.2, penFill: "#F6EFE1" })} />
      {[
        [22, 0.3],
        [44, 0.36],
        [76, 0.36],
        [98, 0.3],
      ].map(([x, k]) => (
        <Fortann key={x} strek={strek} x={x} y={76} k={k} fyll="#F6EFE1" />
      ))}
      {[44, 76].map((x) => (
        <g key={x} transform={`translate(${x} 72) scale(0.4)`}>
          <path d={FORTANN.krone} fill="none" stroke={F.teal} strokeWidth={2 / 0.4} strokeDasharray={`${4 / 0.4} ${4 / 0.4}`} {...blekk(strek)} />
        </g>
      ))}
      <path d="M24,92 L44,92" {...linje(strek, F.benStrek, 1.6)} />
    </Ramme>
  );
}

/* ── Implants ── */

/** The three parts of an implant, pulled apart: the crown, the post, the screw. */
export function ImplantatDeler({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Krone strek={strek} x={60} y={38} k={0.3} ink={F.teal} fyll={KRONE_FYLL} />
      <path d="M53,58 L55,46 L65,46 L67,58 Z" {...form(strek, F.metall, { w: 2 })} />
      <Skrue strek={strek} x={60} y={72} k={0.8} />
      <path d="M60,40 L60,45 M60,59 L60,71" fill="none" stroke={F.metallMork} strokeWidth={1.4} strokeDasharray="2 3" {...blekk(strek)} />
      <path d="M86,24 l8,-6 M88,38 l10,-1" {...linje(strek, F.teal, 2, F.teal)} />
      <path d="M22,92 Q60,84 98,92" {...linje(strek, F.benStrek, 2, F.benStrek)} />
    </Ramme>
  );
}

/** Enough bone for the screw: the jaw cut through, the implant dashed in it, and its height measured. */
export function BeinNok({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M14,40 Q20,30 40,30 Q60,26 80,30 Q100,30 106,40 L106,108 L14,108 Z" {...form(strek, F.ben, { w: 2.2, ink: F.benStrek, penFill: "#F6EFE1" })} />
      <path d="M14,40 Q20,26 40,26 Q60,22 80,26 Q100,26 106,40" {...linje(strek, F.tannkjottMork, 2.4, F.tannkjottMork)} />
      {[
        [30, 60],
        [84, 52],
        [36, 92],
        [78, 96],
        [24, 78],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={2.2} fill={F.benStrek} {...blekk(strek)} />
      ))}
      <path d="M52,34 L68,34 L66,82 Q60,90 54,82 Z" fill="none" stroke={F.metallMork} strokeWidth={2} strokeDasharray="4 4" {...blekk(strek)} />
      <path d="M96,34 L96,102 M91,40 L96,34 L101,40 M91,96 L96,102 L101,96" {...linje(strek, F.teal, 2, F.teal)} />
    </Ramme>
  );
}

/** The x-ray before an implant: the gap, the teeth beside it, and the bone under it. */
export function RontgenLuke(p: Stil) {
  const strek = p.strek ?? true;
  return (
    <RontgenMed {...p} x={10} y={20} w={100} h={80}>
      <Gjest strek={strek} x={30} y={50} k={0.3} />
      <Gjest strek={strek} x={90} y={50} k={0.3} />
      <path d="M18,56 Q60,48 102,56" {...linje(strek, GJEST, 1.4, GJEST)} strokeDasharray="3 3" />
    </RontgenMed>
  );
}

/** Numbing before the screw goes in: the gap, kept calm. */
export function RoligLuke(p: Stil) {
  const strek = p.strek ?? true;
  return (
    <RoligPaa {...p}>
      {gommeband(strek, 98)}
      <Krone strek={strek} x={24} y={98} k={0.28} />
      <Krone strek={strek} x={96} y={98} k={0.28} />
      <path d="M50,92 Q60,82 70,92" {...linje(strek, F.metallMork, 2)} />
    </RoligPaa>
  );
}

/** Form and colour for the new tooth: the screw in the bone, the crown dashed over it, and the shade tabs. */
export function ImplantatFarge({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M4,70 Q46,62 88,70 L88,116 L4,116 Z" fill={F.ben} fillOpacity={0.65} {...blekk(strek)} />
      <path d="M4,70 Q46,62 88,70" {...linje(strek, F.tannkjottMork, 2.2, F.tannkjottMork)} />
      <Skrue strek={strek} x={46} y={68} k={0.9} />
      <g transform="translate(46 64) scale(0.3)">
        <path d={JEKSEL.krone} fill="none" stroke={F.teal} strokeWidth={2 / 0.3} strokeDasharray={`${4 / 0.3} ${4 / 0.3}`} {...blekk(strek)} />
      </g>
      <path d="M86,14 L116,14" {...linje(strek, F.metallMork, 2.4)} />
      {["#FFFDF6", "#F8EED5", "#F0DFB8"].map((f, i) => (
        <path key={f} d={`M${88 + i * 9},17 L${95 + i * 9},17 L${94 + i * 9},50 Q${91.5 + i * 9},54 ${89 + i * 9},50 Z`} {...form(strek, f, { w: 1.4, penFill: f })} />
      ))}
    </Ramme>
  );
}

export const PlasterKinn = (p: Stil) => <Fjes {...p} uttrykk="plaster" />;

/** Cleaning round an implant: a small brush by the new tooth. */
export function ImplantatBorste({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M4,64 Q60,56 116,64 L116,116 L4,116 Z" fill={F.ben} fillOpacity={0.65} {...blekk(strek)} />
      <Skrue strek={strek} x={50} y={64} k={1} />
      <Krone strek={strek} x={50} y={64} k={0.32} ink={F.teal} fyll={KRONE_FYLL} />
      <path d="M4,64 Q60,56 116,64" {...linje(strek, F.tannkjottMork, 2.2, F.tannkjottMork)} />
      <path d="M108,12 L76,54" {...linje(strek, F.teal, 5, F.teal)} />
      <path d="M76,54 L70,64" {...linje(strek, F.metallMork, 2)} />
      <path d="M78,52 l-8,-3 M76,56 l-8,-3 M74,60 l-7,-3 M80,54 l7,4 M78,58 l7,4 M76,62 l6,4" {...linje(strek, F.metallMork, 1.2)} />
    </Ramme>
  );
}

/* ── Full dentures ── */

/** A full denture from above, in pink or in the wax it is tried in first. */
function ProteseOvenfra({ strek = true, className, forsink, voks = false }: Stil & { voks?: boolean }) {
  const tenner = [0.06, 0.18, 0.3, 0.42, 0.58, 0.7, 0.82, 0.94];
  const [fyll, ink, pen] = voks ? ["#F3DFA2", "#C9A54A", "#F8EBC4"] : ["#EBB5AB", F.tannkjottMork, "#F7DFDA"];
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M14,36 Q14,104 60,104 Q106,104 106,36 L90,36 Q90,86 60,86 Q30,86 30,36 Z" {...form(strek, fyll, { w: 2.2, ink, penFill: pen })} />
      {tenner.map((t) => {
        const a = Math.PI * (1 - t);
        const x = r2(60 + Math.cos(a) * 38);
        const y = r2(44 + Math.sin(a) * 50);
        const vri = Math.round((Math.atan2(50 * Math.cos(a), -38 * Math.sin(a)) * 180) / Math.PI);
        return <rect key={t} x={x - 7} y={y - 5.5} width={14} height={11} rx={4} transform={`rotate(${vri} ${x} ${y})`} {...form(strek, F.hvit, { w: 1.8, penFill: F.papir })} />;
      })}
      {voks && <path d="M100,14 q-4,6 0,10 q4,-4 0,-10 Z" {...form(strek, "#F1D58A", { w: 1.4, ink: F.rav, penFill: "#F8E3A8" })} />}
    </Ramme>
  );
}
export const ProteseVoks = (p: Stil) => <ProteseOvenfra {...p} voks />;

/** In the lower jaw a denture can be held by implants: two screws with ball heads, and the denture over them. */
export function ProteseImplantat({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M4,76 Q60,66 116,76 L116,116 L4,116 Z" fill={F.ben} fillOpacity={0.65} {...blekk(strek)} />
      <path d="M4,76 Q60,66 116,76" {...linje(strek, F.tannkjottMork, 2.2, F.tannkjottMork)} />
      {[36, 84].map((x) => (
        <g key={x}>
          <Skrue strek={strek} x={x} y={74} k={0.8} />
          <path d={`M${x - 3},74 L${x - 3},66 M${x + 3},74 L${x + 3},66`} {...linje(strek, F.metallMork, 1.6)} />
          <circle cx={x} cy={63} r={4.4} {...form(strek, F.metall, { w: 1.6 })} />
        </g>
      ))}
      <path d="M10,40 Q60,30 110,40 L110,50 Q60,42 10,50 Z" {...form(strek, "#EBB5AB", { w: 2, ink: F.tannkjottMork, penFill: "#F7DFDA" })} />
      {[20, 34, 48, 62, 76, 90, 102].map((x, i) => (
        <Fortann key={x} strek={strek} x={x} y={39 - (i === 3 ? 1 : 0)} k={0.2} />
      ))}
      <path d="M36,52 L36,58 M33,55 L36,58 L39,55 M84,52 L84,58 M81,55 L84,58 L87,55" {...linje(strek, F.teal, 1.8, F.teal)} />
    </Ramme>
  );
}

/** Talking first, and looking at your mouth: a small denture in the bubble. */
export function SnakkeProtese(p: Stil) {
  const strek = p.strek ?? true;
  return (
    <SnakkeOm
      {...p}
      om={
        <>
          <path d="M24,30 Q50,24 76,30 L76,36 Q50,32 24,36 Z" {...form(strek, "#EBB5AB", { w: 1.6, ink: F.tannkjottMork, penFill: "#F7DFDA" })} />
          {[30, 40, 50, 60, 70].map((x) => (
            <OverFortann key={x} strek={strek} x={x} y={34} k={0.13} />
          ))}
          <path d="M24,54 Q50,60 76,54 L76,48 Q50,52 24,48 Z" {...form(strek, "#EBB5AB", { w: 1.6, ink: F.tannkjottMork, penFill: "#F7DFDA" })} />
          {[30, 40, 50, 60, 70].map((x) => (
            <Fortann key={x} strek={strek} x={x} y={50} k={0.1} />
          ))}
        </>
      }
    />
  );
}

/** The impression of a jaw with no teeth: the smooth gum ridge, and the tray coming down onto it. */
export function AvtrykkTannlos({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M10,92 Q30,76 60,76 Q90,76 110,92 L110,112 L10,112 Z" {...form(strek, F.tannkjott, { w: 2, ink: F.tannkjottMork, penFill: "#F6DCD7" })} />
      <path d="M14,30 L106,30 L100,48 Q60,58 20,48 Z" {...form(strek, "#E9C7D8", { w: 2.2, penFill: "#F6E6EE" })} />
      <path d="M22,44 Q60,52 98,44" {...linje(strek, "#C38FA9", 1.6, "#C38FA9")} />
      <path d="M60,30 L60,12" {...linje(strek, F.metallMork, 4)} />
      <path d="M10,52 L10,66 M5,61 L10,67 L15,61 M110,52 L110,66 M105,61 L110,67 L115,61" {...linje(strek, F.teal, 2, F.teal)} />
    </Ramme>
  );
}

/** Measuring how the jaws meet: two wax rims biting together, and the height between them. */
export function BittMaal({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M8,20 Q48,12 88,20 L88,34 Q48,28 8,34 Z" {...form(strek, "#EBB5AB", { w: 2, ink: F.tannkjottMork, penFill: "#F7DFDA" })} />
      <rect x={14} y={34} width={68} height={24} rx={5} {...form(strek, "#F3DFA2", { w: 2, ink: "#C9A54A", penFill: "#F8EBC4" })} />
      <rect x={14} y={60} width={68} height={24} rx={5} {...form(strek, "#F3DFA2", { w: 2, ink: "#C9A54A", penFill: "#F8EBC4" })} />
      <path d="M8,98 Q48,104 88,98 L88,84 Q48,90 8,84 Z" {...form(strek, "#EBB5AB", { w: 2, ink: F.tannkjottMork, penFill: "#F7DFDA" })} />
      <path d="M104,22 L104,98 M99,28 L104,22 L109,28 M99,92 L104,98 L109,92" {...linje(strek, F.teal, 2, F.teal)} />
      <path d="M100,40 l8,0 M100,50 l8,0 M100,60 l8,0 M100,70 l8,0 M100,80 l8,0" {...linje(strek, F.teal, 1.2, F.teal)} />
    </Ramme>
  );
}

export const ProteseSmil = (p: Stil) => <Fjes {...p} uttrykk="smil" />;

/** Getting used to it takes time: a sprout growing in three pots. */
export function Spire({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      {[
        [22, 8],
        [60, 20],
        [98, 34],
      ].map(([x, h], i) => (
        <g key={x}>
          <path d={`M${x - 12},86 L${x + 12},86 L${x + 9},106 L${x - 9},106 Z`} {...form(strek, "#E7B79A", { w: 2, ink: "#B9805F", penFill: "#F3D6C4" })} />
          <path d={`M${x},86 L${x},${86 - h}`} {...linje(strek, "#7E9160", 2.2, "#7E9160")} />
          <path d={lauv(x - 6, 86 - h * 0.6, 5, 3, 3 + i, 7)} {...form(strek, F.bjork, { w: 1.4, ink: "#7E9160", penFill: "#E6EDD8" })} />
          {i > 0 && <path d={lauv(x + 6, 86 - h * 0.85, 5 + i, 3 + i * 0.5, 5 + i, 7)} {...form(strek, F.bjork, { w: 1.4, ink: "#7E9160", penFill: "#E6EDD8" })} />}
        </g>
      ))}
      <path d={stjerne(100, 20, 5)} {...form(strek, "#F1D58A", { w: 1.4, ink: F.teal })} />
    </Ramme>
  );
}
