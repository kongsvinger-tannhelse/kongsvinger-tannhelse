import { FARGE as F, JEKSEL, PULPA, lauv, r2, stjerne } from "@/components/forside/behandlinger/popup/tegning";
import { AKSENT, BLEKK, Ramme, STEIN, blekk, form, linje, type Stil } from "@/components/artikler/tegninger";
import { Gomme } from "./ruter";
import { Krone, LupePaa, OverKrone, SnakkeOm, gommeband } from "./ruter3";
import { Fortann, GJEST, Gjest, PlanMed, RontgenMed } from "./ruter4";

/* Page-specific panels for toothache, a swelling by a tooth and a partial
   denture. 120 × 120, in the same pen as ruter.tsx. Server-safe. */

const KRONE_FYLL = "#F4FAFB";
/** The hole the dentist opens in the top of a molar, in the molar's own units. */
const TILGANG = "M-12,-93 C-6,-97 6,-97 12,-93 L8,-60 L-8,-60 Z";
const SAR = { w: 1.8, ink: AKSENT, penFill: "#F6C9C0" };
const PROTESE = { w: 1.8, ink: F.tannkjottMork, penFill: "#F7DFDA" };

/** A whole molar with its roots, centred on x, its gum line at y. */
export function HelJeksel({ strek, x, y, k, rot = 0 }: { strek: boolean; x: number; y: number; k: number; rot?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${k})`}>
      <path d={JEKSEL.tann} {...form(strek, F.hvit, { w: 2.2 / k, penFill: F.papir })} />
      <path d={JEKSEL.fure} {...linje(strek, F.fure, 1.6 / k)} />
    </g>
  );
}

/* ── Toothache ── */

/** Where it hurts: the nerve inside the tooth, tinted, and the sore gum beside it. */
export function VerkToSteder({ strek = true, className, forsink }: Stil) {
  const k = 0.4;
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M4,72 Q34,64 60,70 Q86,64 116,72 L116,116 L4,116 Z" fill={F.ben} fillOpacity={0.55} {...blekk(strek)} />
      <path d="M4,72 Q34,64 60,70 Q86,64 116,72" {...linje(strek, F.tannkjottMork, 2.2, F.tannkjottMork)} />
      <g transform={`translate(54 72) scale(${k})`}>
        <path d={JEKSEL.tann} {...form(strek, F.hvit, { w: 2.2 / k, penFill: F.papir })} />
        <path d={PULPA} {...form(strek, F.smerte, { w: 1.8 / k, ink: AKSENT, penFill: "rgba(217,99,76,0.22)" })} />
      </g>
      <path d="M78,70 Q92,54 108,64 Q114,68 116,70 L116,74 Q96,70 78,72 Z" {...form(strek, F.sart, SAR)} />
      <path d="M24,32 l-9,-4 M22,44 l-11,0 M27,21 l-6,-7" {...linje(strek, AKSENT, 2, AKSENT)} />
      <path d="M98,48 l3,-9 M108,54 l7,-6" {...linje(strek, AKSENT, 2, AKSENT)} />
    </Ramme>
  );
}

/** Talking about the pain: a sore tooth in the bubble, a clock in the reply (when does it hurt?). */
export function SnakkeVerk(p: Stil) {
  const strek = p.strek ?? true;
  return (
    <SnakkeOm
      {...p}
      om={
        <>
          <Krone strek={strek} x={42} y={58} k={0.28} />
          <path d="M64,26 l6,4 l-5,4 l6,4 l-5,4" {...linje(strek, AKSENT, 2, AKSENT)} />
        </>
      }
      svar={
        <>
          <circle cx={78} cy={89} r={9} {...form(strek, F.hvit, { w: 1.8, ink: F.teal, penFill: "#FFFFFF" })} />
          <path d="M78,89 L78,83 M78,89 L83,91" {...linje(strek, F.teal, 1.6, F.teal)} />
        </>
      }
    />
  );
}

/** The dentist looks closely where the tooth meets the gum: a small hole, and the gum beside it. */
export function LupeVerk(p: Stil) {
  const strek = p.strek ?? true;
  return (
    <LupePaa {...p} x={54} y={64}>
      {gommeband(strek, 88)}
      <Krone strek={strek} x={54} y={90} k={0.4} />
      <path d={lauv(48, 60, 5, 3.6, 3, 8)} fill={F.hull} {...blekk(strek)} />
      <Krone strek={strek} x={104} y={90} k={0.26} />
      <path d="M22,40 l-7,-4 M20,52 l-9,0" {...linje(strek, AKSENT, 1.8, AKSENT)} />
    </LupePaa>
  );
}

/** The x-ray: the molar's ghost, its nerve, and a dark hole reaching down towards it. */
export function RontgenVerk(p: Stil) {
  const strek = p.strek ?? true;
  return (
    <RontgenMed {...p}>
      <Gjest strek={strek} x={60} y={60} k={0.36} />
      <Gjest strek={strek} x={60} y={60} k={0.36} d={PULPA} />
      <path d={lauv(68, 30, 6, 4.4, 5, 8)} fill={GJEST} fillOpacity={0.55} {...blekk(strek)} />
    </RontgenMed>
  );
}

/** What was found, and what can be done: the clipboard with a sore tooth at its top. */
export function PlanVerk(p: Stil) {
  const strek = p.strek ?? true;
  return (
    <PlanMed {...p}>
      <Krone strek={strek} x={56} y={52} k={0.24} />
      <path d="M74,28 l5,3 l-4,3 l5,3" {...linje(strek, AKSENT, 1.8, AKSENT)} />
    </PlanMed>
  );
}

/** A hole, and the same tooth with a filling. */
export function VerkFylling({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M6,90 Q60,82 114,90" {...linje(strek, F.tannkjottMork, 2.2, F.tannkjottMork)} />
      <Krone strek={strek} x={28} y={88} k={0.3} />
      <path d={lauv(26, 64, 6, 4, 7, 8)} fill={F.hull} {...blekk(strek)} />
      <path d="M50,68 L70,68 M64,62 L70,68 L64,74" {...linje(strek, F.teal, 2.4, F.teal)} />
      <Krone strek={strek} x={92} y={88} k={0.3} />
      <path d={lauv(90, 64, 7, 4.4, 4, 8)} {...form(strek, F.fylling, { w: 1.6, ink: F.teal, penFill: F.fylling })} />
      <path d={stjerne(108, 40, 6)} {...form(strek, "#F1D58A", { w: 1.4, ink: F.teal })} />
    </Ramme>
  );
}

/** A root filling: the canals filled, a lid on top, and a tick. */
export function VerkRot({ strek = true, className, forsink }: Stil) {
  const k = 0.44;
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M6,66 Q60,58 114,66" {...linje(strek, F.tannkjottMork, 2.2, F.tannkjottMork)} />
      <g transform={`translate(52 66) scale(${k})`}>
        <path d={JEKSEL.tann} {...form(strek, F.hvit, { w: 2.2 / k, penFill: F.papir })} />
        <path d={PULPA} {...form(strek, F.rav, { w: 1.6 / k, ink: "#C9803E", penFill: "#F5D3AC" })} />
        <path d={TILGANG} {...form(strek, F.fylling, { w: 1.6 / k, ink: F.teal, penFill: F.fylling })} />
      </g>
      <path d="M88,28 l6,6 l14,-16" {...linje(strek, F.teal, 3, F.teal)} />
    </Ramme>
  );
}

/** Sometimes it has to come out: the tooth lifted up, its place in the gum dashed. */
export function VerkTrekk({ strek = true, className, forsink }: Stil) {
  const k = 0.26;
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      {gommeband(strek, 94)}
      <Krone strek={strek} x={20} y={94} k={0.28} />
      <Krone strek={strek} x={100} y={94} k={0.28} />
      <g transform={`translate(60 94) scale(${k})`}>
        <path d={JEKSEL.krone} fill="none" stroke={F.metallMork} strokeWidth={1.6 / k} strokeDasharray={`${4 / k} ${4 / k}`} {...blekk(strek)} />
      </g>
      <HelJeksel strek={strek} x={58} y={46} k={0.22} rot={-10} />
      <path d="M88,52 L88,26 M82,32 L88,26 L94,32" {...linje(strek, F.teal, 2.4, F.teal)} />
    </Ramme>
  );
}

/** When it is the gum: red, swollen gum round the tooth, and the sore marks beside it. */
export function VerkTannkjott({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Krone strek={strek} x={60} y={92} k={0.44} />
      <path d="M4,86 Q16,72 30,84 Q38,90 46,88 Q60,94 74,88 Q82,90 90,84 Q104,72 116,86 L116,116 L4,116 Z" {...form(strek, F.sart, SAR)} />
      <path d="M18,62 l-6,-7 M10,74 l-8,-2 M102,62 l6,-7 M110,74 l8,-2" {...linje(strek, AKSENT, 2, AKSENT)} />
    </Ramme>
  );
}

/** Early in the day: the phone ringing, and the sun just up. */
export function TelefonMorgen({ strek = true, className, forsink }: Stil) {
  const straaler = [200, 230, 270, 310, 340]
    .map((v) => {
      const a = (v * Math.PI) / 180;
      return `M${r2(32 + Math.cos(a) * 24)},${r2(92 + Math.sin(a) * 24)} L${r2(32 + Math.cos(a) * 31)},${r2(92 + Math.sin(a) * 31)}`;
    })
    .join(" ");
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M14,92 A18,18 0 0 1 50,92 Z" {...form(strek, "#F8E3A8", { w: 2, ink: "#C9A54A", penFill: "#FBEFC8" })} />
      <path d={straaler} {...linje(strek, "#E9C46A", 2, "#C9A54A")} />
      <path d="M6,92 L58,92" {...linje(strek, F.metallMork, 2)} />
      <rect x={62} y={32} width={34} height={64} rx={7} {...form(strek, F.hvit, { w: 2.2, penFill: F.papir })} />
      <rect x={67} y={40} width={24} height={42} rx={3} {...form(strek, "#E1EFF1", { w: 1.6, ink: F.teal, penFill: "#EEF7F8" })} />
      <Krone strek={strek} x={79} y={68} k={0.14} fure={false} />
      <path d="M74,89 L84,89" {...linje(strek, F.metallMork, 2)} />
      <path d="M102,40 q6,6 0,12 M108,34 q10,12 0,24" {...linje(strek, F.teal, 2, F.teal)} />
    </Ramme>
  );
}

/* ── A swelling by a tooth ── */

/** A tooth abscess, cut through: the nerve gone grey, the infection at the root's tip, and a lump on the gum. */
export function ByllSnitt({ strek = true, className, forsink }: Stil) {
  const k = 0.38;
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M4,58 Q32,50 56,56 Q82,50 116,58 L116,116 L4,116 Z" fill={F.ben} fillOpacity={0.55} {...blekk(strek)} />
      <path d="M4,58 Q32,50 56,56 Q82,50 116,58" {...linje(strek, F.tannkjottMork, 2.2, F.tannkjottMork)} />
      <g transform={`translate(50 58) scale(${k})`}>
        <path d={JEKSEL.tann} {...form(strek, F.hvit, { w: 2.2 / k, penFill: F.papir })} />
        <path d={PULPA} {...form(strek, STEIN, { w: 1.6 / k, ink: STEIN, penFill: "rgba(138,139,132,0.22)" })} />
      </g>
      <path d={lauv(62, 92, 10, 8, 5, 9)} {...form(strek, F.sart, SAR)} />
      <circle cx={62} cy={92} r={16} fill="none" stroke={AKSENT} strokeWidth={1.4} strokeDasharray="3 4" {...blekk(strek)} />
      <path d="M76,57 Q90,38 106,55 Z" {...form(strek, F.sart, SAR)} />
    </Ramme>
  );
}

/** A lump on the gum beside a tooth. */
export function KulTannkjott({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Krone strek={strek} x={46} y={80} k={0.4} />
      {gommeband(strek, 80)}
      <circle cx={88} cy={84} r={11} {...form(strek, F.sart, SAR)} />
      <path d="M102,66 l6,-6 M106,80 l9,0" {...linje(strek, AKSENT, 2, AKSENT)} />
    </Ramme>
  );
}

/** It hurts to bite: an upper and a lower molar meeting, and sore marks either side. */
export function BiteVondt({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M4,4 L116,4 L116,22 Q60,30 4,22 Z" {...form(strek, F.tannkjott, { w: 1.8, ink: F.tannkjottMork, penFill: "#F6DCD7" })} />
      <OverKrone strek={strek} x={60} y={58} k={0.36} />
      <Krone strek={strek} x={60} y={100} k={0.36} />
      <Gomme strek={strek} y={104} />
      <path d="M26,58 l-9,-4 M24,66 l-11,1 M94,58 l9,-4 M96,66 l11,1" {...linje(strek, AKSENT, 2, AKSENT)} />
    </Ramme>
  );
}

/** A bad taste: a tongue out, and wavy lines over it. */
export function VondSmak({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M18,56 Q60,28 102,56 Q60,88 18,56 Z" {...form(strek, "#F3C2B8", { w: 2.2, ink: "#C9675A", penFill: "#F8DCD6" })} />
      <path d="M30,56 Q60,42 90,56 Q60,72 30,56 Z" fill="#8A4A42" fillOpacity={0.8} {...blekk(strek)} />
      <path d="M44,60 Q44,98 60,98 Q76,98 76,60 Z" {...form(strek, "#F1A39A", { w: 2, ink: AKSENT, penFill: "#F7C3BC" })} />
      <path d="M60,68 L60,86" {...linje(strek, AKSENT, 1.6, AKSENT)} />
      <path d="M30,22 q6,-6 12,0 q6,6 12,0 M66,14 q6,-6 12,0 q6,6 12,0" {...linje(strek, "#7E9160", 2, "#7E9160")} />
    </Ramme>
  );
}

/** A swollen cheek, and a hand held to it. */
export function KinnVondt({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M58,24 C39,24 24,40 24,58 C24,78 40,92 58,92 C70,92 88,96 96,82 C102,70 94,54 88,48 C82,32 72,24 58,24 Z" {...form(strek, F.hvit, { w: 2.4, penFill: F.papir })} />
      <path d="M25,52 Q24,24 58,23 Q90,24 89,50 Q82,36 58,35 Q36,35 25,52 Z" {...form(strek, F.metall, { w: 2, penFill: "#E3E8E8" })} />
      <path d="M38,58 q5,-3 10,0 M62,58 q5,-3 10,0" {...linje(strek, BLEKK, 2.2)} />
      <path d="M38,50 l10,-3 M72,50 l-10,-3" {...linje(strek, BLEKK, 2)} />
      <path d="M44,78 q4,-3 8,0 q4,3 8,0" {...linje(strek, BLEKK, 2)} />
      <circle cx={82} cy={74} r={8} fill="#F5C9BF" fillOpacity={0.7} {...blekk(strek)} />
      <rect x={92} y={58} width={20} height={34} rx={9} transform="rotate(-12 102 75)" {...form(strek, "#F3DCC4", { w: 2, ink: "#B9805F", penFill: "#F8EADB" })} />
      <path d="M96,66 l14,-3 M97,74 l14,-3 M98,82 l13,-3" transform="rotate(-12 102 75)" {...linje(strek, "#C9A27E", 1.2, "#B9805F")} />
      <path d="M100,40 l4,-7 M110,48 l7,-4" {...linje(strek, AKSENT, 2, AKSENT)} />
    </Ramme>
  );
}

/** Fever: a thermometer, high, and the heat off it. */
export function Feber({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <rect x={52} y={12} width={16} height={74} rx={8} {...form(strek, F.hvit, { w: 2.2, penFill: "#FFFFFF" })} />
      <rect x={57} y={30} width={6} height={58} rx={3} fill={AKSENT} fillOpacity={0.85} {...blekk(strek)} />
      <circle cx={60} cy={94} r={13} {...form(strek, F.smerte, { w: 2.2, ink: AKSENT, penFill: "#F2A596" })} />
      <path d="M72,24 l6,0 M72,34 l4,0 M72,44 l6,0 M72,54 l4,0 M72,64 l6,0" {...linje(strek, F.metallMork, 1.6)} />
      <path d="M32,34 q-5,7 0,14 q5,7 0,14 M20,42 q-4,6 0,12 q4,6 0,12 M94,40 q-4,6 0,12 q4,6 0,12" {...linje(strek, AKSENT, 1.8, AKSENT)} />
    </Ramme>
  );
}

/** Help at once: a blue light, shining. */
export function Blaalys({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M60,8 L60,24 M24,22 L35,33 M96,22 L85,33 M10,58 L25,58 M110,58 L95,58" {...linje(strek, "#7FB8E8", 2.4, "#4A90D0")} />
      <path d="M40,84 L40,60 Q40,38 60,38 Q80,38 80,60 L80,84 Z" {...form(strek, "#7FB8E8", { w: 2.2, ink: "#4A90D0", penFill: "#DCEBF8" })} />
      <path d="M48,60 Q48,48 58,46" {...linje(strek, F.hvit, 2.4, "#4A90D0")} />
      <rect x={30} y={84} width={60} height={14} rx={4} {...form(strek, F.metall, { w: 2.2, penFill: "#EEF1F1" })} />
      <path d="M22,106 L98,106" {...linje(strek, F.metallMork, 2)} />
    </Ramme>
  );
}

/** The wide x-ray: two molars, and a dark patch at the tip of one root, ringed. */
export function RontgenByll(p: Stil) {
  const strek = p.strek ?? true;
  return (
    <RontgenMed {...p} x={10} y={20} w={100} h={80}>
      <Gjest strek={strek} x={36} y={52} k={0.3} />
      <Gjest strek={strek} x={84} y={52} k={0.3} />
      <path d={lauv(92, 76, 7, 6, 8, 9)} fill={GJEST} fillOpacity={0.5} {...blekk(strek)} />
      <circle cx={92} cy={76} r={12} fill="none" stroke={AKSENT} strokeWidth={1.8} strokeDasharray="3 3" {...blekk(strek)} />
    </RontgenMed>
  );
}

/** The pressure let out: the lump on the gum smaller than it was (dashed), and a sigh of relief. */
export function ByllLetter({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Krone strek={strek} x={34} y={76} k={0.36} />
      {gommeband(strek, 76)}
      <path d="M62,74 Q84,30 106,74" fill="none" stroke={AKSENT} strokeWidth={1.6} strokeDasharray="4 4" {...blekk(strek)} />
      <path d="M68,74 Q84,52 100,74 Z" {...form(strek, F.sart, SAR)} />
      <path d="M84,40 L84,50 M80,46 L84,50 L88,46" {...linje(strek, F.teal, 1.8, F.teal)} />
      <path d="M58,22 q6,-5 12,0 M64,12 q5,-4 10,0" {...linje(strek, F.teal, 2, F.teal)} />
    </Ramme>
  );
}

/** Antibiotics: a blister pack, one capsule pressed out beside it. */
export function Antibiotika({ strek = true, className, forsink }: Stil) {
  const kapsel = (x: number, y: number, vri = 0) => (
    <g key={`${x}-${y}`} transform={`rotate(${vri} ${x} ${y})`}>
      <rect x={x - 6} y={y - 10} width={12} height={20} rx={6} {...form(strek, F.hvit, { w: 1.6, penFill: "#FFFFFF" })} />
      <path d={`M${x - 6},${y} L${x + 6},${y} L${x + 6},${y + 4} Q${x + 6},${y + 10} ${x},${y + 10} Q${x - 6},${y + 10} ${x - 6},${y + 4} Z`} fill={F.teal} fillOpacity={0.55} {...blekk(strek)} />
    </g>
  );
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <rect x={18} y={18} width={74} height={66} rx={8} {...form(strek, F.metall, { w: 2.2, penFill: "#EEF1F1" })} />
      {[
        [36, 38],
        [55, 38],
        [74, 38],
        [36, 64],
        [55, 64],
      ].map(([x, y]) => kapsel(x, y))}
      <rect x={67} y={53} width={14} height={22} rx={7} fill="none" stroke={F.metallMork} strokeWidth={1.4} strokeDasharray="3 3" {...blekk(strek)} />
      {kapsel(100, 98, 30)}
    </Ramme>
  );
}

/** Then the cause: a tooth with an abscess, and two ways on, a root filling or taking it out. */
export function ByllValg({ strek = true, className, forsink }: Stil) {
  const ring = (x: number, y: number) => <circle cx={x} cy={y} r={17} {...form(strek, F.hvit, { w: 2, penFill: "#FFFFFF" })} />;
  const liten = 0.14;
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M60,54 L32,36 M60,54 L88,36" fill="none" stroke={F.metallMork} strokeWidth={1.6} strokeDasharray="3 4" strokeLinecap="round" {...blekk(strek)} />
      <path d="M14,80 Q60,72 106,80" {...linje(strek, F.tannkjottMork, 2.2, F.tannkjottMork)} />
      <HelJeksel strek={strek} x={60} y={80} k={0.28} />
      <path d={lauv(68, 102, 6, 5, 4, 8)} {...form(strek, F.sart, { ...SAR, w: 1.6 })} />
      {ring(24, 24)}
      <g transform={`translate(24 28) scale(${liten})`}>
        <path d={JEKSEL.tann} {...form(strek, F.hvit, { w: 1.6 / liten, penFill: F.papir })} />
        <path d={PULPA} {...form(strek, F.rav, { w: 1.2 / liten, ink: "#C9803E", penFill: "#F5D3AC" })} />
      </g>
      {ring(96, 24)}
      <g transform={`translate(91 30) scale(${liten})`}>
        <path d={JEKSEL.tann} {...form(strek, F.hvit, { w: 1.6 / liten, penFill: F.papir })} />
      </g>
      <path d="M104,32 L104,16 M100,20 L104,16 L108,20" {...linje(strek, F.teal, 1.8, F.teal)} />
    </Ramme>
  );
}

/* ── A partial denture ── */

/** Where a tooth sits on an arch seen from above, and which way it faces. */
function iBuen(t: number, cx = 60, cy = 40, rx = 40, ry = 54) {
  const a = Math.PI * (1 - t);
  const x = r2(cx + Math.cos(a) * rx);
  const y = r2(cy + Math.sin(a) * ry);
  const vri = Math.round((Math.atan2(ry * Math.cos(a), -rx * Math.sin(a)) * 180) / Math.PI);
  return { x, y, vri };
}
const tannIBuen = (strek: boolean, t: number, ny: boolean) => {
  const { x, y, vri } = iBuen(t);
  return <rect key={t} x={x - 7} y={y - 5.5} width={14} height={11} rx={4} transform={`rotate(${vri} ${x} ${y})`} {...form(strek, F.hvit, { w: 1.8, ink: ny ? F.teal : BLEKK, penFill: ny ? KRONE_FYLL : F.papir })} />;
};

/** A partial denture from above: your own teeth at the front, the new ones on pink saddles at the back, a metal bar between, and clasps round two teeth. */
export function DelproteseOvenfra({ strek = true, className, forsink }: Stil) {
  const egne = [0.3, 0.42, 0.58, 0.7];
  const nye = [0.06, 0.18, 0.82, 0.94];
  const sadel = (t0: number, t1: number) => {
    const a = iBuen(t0);
    const b = iBuen(t1);
    const mx = r2((a.x + b.x) / 2);
    const my = r2((a.y + b.y) / 2);
    const vri = Math.round((Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI);
    return <rect key={t0} x={mx - 21} y={my - 10} width={42} height={20} rx={10} transform={`rotate(${vri} ${mx} ${my})`} {...form(strek, "#EBB5AB", PROTESE)} />;
  };
  const klammer = [0.3, 0.7].map((t) => {
    const { x, y, vri } = iBuen(t);
    return <path key={t} d="M-10,1 Q-11,-10 0,-10.5 Q11,-10 10,1" transform={`translate(${x} ${y}) rotate(${vri})`} {...linje(strek, F.metallMork, 2.4, F.metallMork)} />;
  });
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M30,56 Q60,104 90,56" {...linje(strek, F.metall, 6, F.metallMork)} />
      {sadel(0.04, 0.2)}
      {sadel(0.8, 0.96)}
      {egne.map((t) => tannIBuen(strek, t, false))}
      {nye.map((t) => tannIBuen(strek, t, true))}
      {klammer}
    </Ramme>
  );
}

/** A signpost with three arms: a bridge, an implant, or a partial denture. */
export function Veiviser({ strek = true, className, forsink }: Stil) {
  const tre = { w: 2, ink: "#B9805F", penFill: "#F3D6C4" };
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M18,110 Q60,102 102,110" {...linje(strek, "#7E9160", 2.2, "#7E9160")} />
      <rect x={56} y={14} width={8} height={94} rx={2} {...form(strek, "#E7B79A", tre)} />
      <path d="M54,18 L20,18 L10,28 L20,38 L54,38 Z" {...form(strek, "#E7B79A", tre)} />
      <path d="M66,42 L100,42 L110,52 L100,62 L66,62 Z" {...form(strek, "#E7B79A", tre)} />
      <path d="M54,66 L20,66 L10,76 L20,86 L54,86 Z" {...form(strek, "#E7B79A", tre)} />
      <path d="M24,30 L46,30" {...linje(strek, F.teal, 2.4, F.teal)} />
      {[25, 35, 45].map((x) => (
        <Krone key={x} strek={strek} x={x} y={34} k={0.07} ink={F.teal} fyll={KRONE_FYLL} fure={false} />
      ))}
      <Krone strek={strek} x={86} y={50} k={0.07} ink={F.teal} fyll={KRONE_FYLL} fure={false} />
      <path d="M83,50 L89,50 L88,58 L84,58 Z" {...form(strek, F.metall, { w: 1.2 })} />
      <path d="M24,80 Q34,76 44,80 L44,83 Q34,80 24,83 Z" {...form(strek, "#EBB5AB", { ...PROTESE, w: 1.2 })} />
      <Krone strek={strek} x={34} y={79} k={0.07} ink={F.teal} fyll={KRONE_FYLL} fure={false} />
      <path d="M44,80 Q49,79 48,73" {...linje(strek, F.metallMork, 1.6, F.metallMork)} />
    </Ramme>
  );
}

/** Talking first: a row of teeth with a gap in the bubble, and in the reply a new tooth on a pink saddle. */
export function SnakkeDel(p: Stil) {
  const strek = p.strek ?? true;
  return (
    <SnakkeOm
      {...p}
      om={
        <>
          <path d="M20,50 Q50,46 80,50 L80,56 Q50,52 20,56 Z" {...form(strek, F.tannkjott, { w: 1.6, ink: F.tannkjottMork, penFill: "#F6DCD7" })} />
          {[27, 42, 72].map((x) => (
            <Krone key={x} strek={strek} x={x} y={50} k={0.13} fure={false} />
          ))}
          <g transform="translate(57 50) scale(0.13)">
            <path d={JEKSEL.krone} fill="none" stroke={F.metallMork} strokeWidth={1.4 / 0.13} strokeDasharray={`${3 / 0.13} ${3 / 0.13}`} {...blekk(strek)} />
          </g>
        </>
      }
      svar={
        <>
          <path d="M66,96 Q78,92 90,96 L90,100 Q78,97 66,100 Z" {...form(strek, "#EBB5AB", { ...PROTESE, w: 1.4 })} />
          <Krone strek={strek} x={78} y={95} k={0.11} ink={F.teal} fyll={KRONE_FYLL} fure={false} />
          <path d="M90,97 Q96,96 95,88" {...linje(strek, F.metallMork, 1.8, F.metallMork)} />
        </>
      }
    />
  );
}

/** Impressions of both jaws: two trays, one behind the other, with the marks of the teeth in them and smooth where teeth are missing. */
export function AvtrykkDel({ strek = true, className, forsink }: Stil) {
  const k = 0.8;
  const skje = (x: number, y: number, merker: number[]) => (
    <g transform={`translate(${x} ${y}) scale(${k}) translate(-60 -64)`}>
      <path d="M60,92 L60,106" {...linje(strek, F.metallMork, 3.4 / k)} />
      <path d="M22,36 Q22,92 60,92 Q98,92 98,36 L84,36 Q84,76 60,76 Q36,76 36,36 Z" {...form(strek, "#E9C7D8", { w: 2.2 / k, penFill: "#F6E6EE" })} />
      {merker.map((u) => {
        const v = u <= 0.5 ? u * 2 : (1 - u) * 2;
        const mx = Math.round(((1 - v) ** 2 * 29 + 2 * (1 - v) * v * 29 + v * v * 60) * 10) / 10;
        const my = Math.round(((1 - v) ** 2 * 42 + 2 * (1 - v) * v * 84 + v * v * 84) * 10) / 10;
        return <ellipse key={u} cx={u <= 0.5 ? mx : 120 - mx} cy={my} rx={4} ry={3} {...form(strek, "#D9A9C1", { w: 1.4 / k, ink: "#C38FA9", penFill: "#EDD3DF" })} />;
      })}
    </g>
  );
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      {skje(70, 50, [0.15, 0.35, 0.65, 0.85])}
      {skje(52, 70, [0.12, 0.3, 0.45, 0.9])}
    </Ramme>
  );
}

/** A small rest ground into a tooth, and the denture's metal arm resting in it. */
export function Opplegg({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      {gommeband(strek, 94)}
      <Krone strek={strek} x={38} y={94} k={0.4} fure={false} />
      <path d="M52,54 Q57,59 62,56" {...linje(strek, BLEKK, 1.8)} />
      <path d="M66,94 Q66,80 80,78 L114,78 L114,94 Z" {...form(strek, "#EBB5AB", PROTESE)} />
      <Krone strek={strek} x={92} y={80} k={0.3} ink={F.teal} fyll={KRONE_FYLL} />
      <path d="M54,56 L68,56 Q74,58 76,66" {...linje(strek, F.metall, 3.2, F.metallMork)} />
      <path d="M58,22 L58,44 M52,38 L58,44 L64,38" {...linje(strek, F.teal, 2, F.teal)} />
    </Ramme>
  );
}

/** The design drawn on the plaster model: the saddle and the clasp in teal pencil, and the pencil. */
export function TegningDel({ strek = true, className, forsink }: Stil) {
  const k = 0.18;
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M8,82 Q60,72 112,82 L112,102 Q112,108 106,108 L14,108 Q8,108 8,102 Z" {...form(strek, F.ben, { w: 2.2, penFill: "#F6EFE1" })} />
      {[22, 42, 98].map((x) => (
        <Krone key={x} strek={strek} x={x} y={80} k={k} fyll="#F6EFE1" />
      ))}
      <path d="M54,82 Q54,74 62,73 L84,73 Q90,74 90,82" fill="none" stroke={F.teal} strokeWidth={1.8} strokeDasharray="4 3" strokeLinecap="round" {...blekk(strek)} />
      <path d="M48,66 Q42,62 36,66" fill="none" stroke={F.teal} strokeWidth={1.8} strokeDasharray="3 3" strokeLinecap="round" {...blekk(strek)} />
      <g transform="rotate(38 88 40)">
        <rect x={84} y={8} width={9} height={44} rx={2} {...form(strek, "#F1D58A", { w: 1.8, ink: "#C9A54A", penFill: "#F8E3A8" })} />
        <path d="M84,52 L88.5,62 L93,52 Z" {...form(strek, "#F6EFE1", { w: 1.6, penFill: "#F6EFE1" })} />
        <path d="M87,58 L88.5,62 L90,58 Z" fill={F.teal} {...blekk(strek)} />
      </g>
    </Ramme>
  );
}

/** The teeth tried in wax, seen in a hand mirror. */
export function VoksSpeil({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M72,74 L100,108" {...linje(strek, "#B9805F", 7, "#B9805F")} />
      <circle cx={52} cy={50} r={32} {...form(strek, "#E7B79A", { w: 2.2, ink: "#B9805F", penFill: "#F3D6C4" })} />
      <circle cx={52} cy={50} r={26} {...form(strek, "#E1EFF1", { w: 1.8, ink: F.teal, penFill: "#EEF7F8" })} />
      {[34, 46, 58, 70].map((x, i) => (
        <Fortann key={x} strek={strek} x={x} y={56} k={i === 1 || i === 2 ? 0.17 : 0.15} ink={F.teal} fyll={KRONE_FYLL} />
      ))}
      <path d="M28,56 Q52,50 76,56 L76,64 Q52,60 28,64 Z" {...form(strek, "#F3DFA2", { w: 1.8, ink: "#C9A54A", penFill: "#F8EBC4" })} />
      <path d="M34,32 q6,-6 14,-6" {...linje(strek, F.hvit, 2, F.teal)} />
    </Ramme>
  );
}

/** Taking it out and putting it in: the denture over the gap, and arrows up and down. */
export function InnUt({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      {gommeband(strek, 98)}
      <Krone strek={strek} x={18} y={98} k={0.28} />
      <Krone strek={strek} x={102} y={98} k={0.28} />
      <path d="M40,66 Q60,60 80,66 L80,76 Q60,72 40,76 Z" {...form(strek, "#EBB5AB", PROTESE)} />
      <Krone strek={strek} x={51} y={66} k={0.2} ink={F.teal} fyll={KRONE_FYLL} />
      <Krone strek={strek} x={70} y={66} k={0.2} ink={F.teal} fyll={KRONE_FYLL} />
      <path d="M40,70 Q32,68 32,60 M80,70 Q88,68 88,60" {...linje(strek, F.metallMork, 2.4, F.metallMork)} />
      <path d="M60,8 L60,36 M54,14 L60,8 L66,14 M54,30 L60,36 L66,30" {...linje(strek, F.teal, 2.2, F.teal)} />
    </Ramme>
  );
}

/** Why check-ups matter: the magnifier over a tooth with a clasp round it, and plaque at the gum. */
export function LupeKlammer(p: Stil) {
  const strek = p.strek ?? true;
  return (
    <LupePaa {...p} x={40} y={82}>
      {gommeband(strek, 94)}
      <Krone strek={strek} x={40} y={94} k={0.36} fure={false} />
      <path d="M76,94 Q76,78 88,76 L116,76 L116,94 Z" {...form(strek, "#EBB5AB", PROTESE)} />
      <Krone strek={strek} x={98} y={78} k={0.24} ink={F.teal} fyll={KRONE_FYLL} />
      <path d="M22,72 Q40,82 58,72 Q70,70 78,78" {...linje(strek, F.metall, 3, F.metallMork)} />
      {[
        [30, 90],
        [38, 92],
        [47, 91],
        [55, 89],
      ].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r={2.4} fill="#D8C27A" {...blekk(strek)} />
      ))}
    </LupePaa>
  );
}
