import { FARGE as F, FORTANN, JEKSEL, PULPA, draape, lauv, r2 } from "@/components/forside/behandlinger/popup/tegning";
import { AKSENT, BLEKK, Ramme, blekk, form, linje, type Stil } from "@/components/artikler/tegninger";
import { Gomme } from "./ruter";
import { Fjes, Krone, LupePaa, SnakkeOm, gommeband } from "./ruter3";
import { Fortann, GJEST, Gjest, PlanMed, RoligPaa, RontgenMed } from "./ruter4";

/* Page-specific panels for root fillings, dry mouth, extractions, wisdom
   teeth and injuries. 120 × 120, in the same pen as ruter.tsx. Server-safe. */

/** A molar with its roots, its gum line at `y`. */
function HelTann({ strek = true, x, y, k, ink = BLEKK, fyll = F.papir }: { strek?: boolean; x: number; y: number; k: number; ink?: string; fyll?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`}>
      <path d={JEKSEL.tann} {...form(strek, F.hvit, { w: 2.2 / k, ink, penFill: fyll })} />
    </g>
  );
}

/* ── Root fillings ── */

/** The x-ray before a root filling: a dark spot at the tip of a root. */
export function RontgenRot(p: Stil) {
  const strek = p.strek ?? true;
  return (
    <RontgenMed {...p}>
      <Gjest strek={strek} x={60} y={58} k={0.42} />
      <Gjest strek={strek} x={60} y={58} k={0.42} d={PULPA} />
      <circle cx={47} cy={92} r={6} fill={GJEST} fillOpacity={0.45} {...blekk(strek)} />
      <circle cx={47} cy={92} r={9} {...linje(strek, AKSENT, 1.4, AKSENT)} strokeDasharray="2 3" />
    </RontgenMed>
  );
}

/** Numbing before a root filling: the tooth with its nerve, kept calm. */
export function RoligNerve(p: Stil) {
  const strek = p.strek ?? true;
  return (
    <RoligPaa {...p}>
      <g transform="translate(60 86) scale(0.34)">
        <path d={JEKSEL.tann} {...form(strek, F.hvit, { w: 2.2 / 0.34, penFill: F.papir })} />
        <path d={PULPA} fill={F.teal} fillOpacity={0.35} {...blekk(strek)} />
      </g>
      <Gomme strek={strek} y={88} />
    </RoligPaa>
  );
}

/** Talking about how it will feel: a tooth with its roots in the bubble, a question in the reply. */
export function SnakkeRot(p: Stil) {
  const strek = p.strek ?? true;
  return (
    <SnakkeOm
      {...p}
      om={
        <g transform="translate(50 46) scale(0.22)">
          <path d={JEKSEL.tann} {...form(strek, F.hvit, { w: 2.2 / 0.22, penFill: F.papir })} />
          <path d={PULPA} fill="#F1B9AE" fillOpacity={0.85} {...blekk(strek)} />
        </g>
      }
      svar={<path d="M74,84 q0,-5 5,-5 q5,0 5,5 q0,4 -5,5 l0,3 M79,97 l0,0.5" {...linje(strek, F.teal, 2.2, F.teal)} />}
    />
  );
}

/* ── Dry mouth ── */

/** Saliva guards the teeth: drops in an arc over a tooth. */
export function SpyttSkjold({ strek = true, className, forsink }: Stil) {
  const draaper = [0.1, 0.3, 0.5, 0.7, 0.9].map((t) => {
    const a = Math.PI * (1 + t);
    return [r2(60 + Math.cos(a) * 44), r2(86 + Math.sin(a) * 52)] as const;
  });
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Krone strek={strek} x={60} y={100} k={0.38} />
      <Gomme strek={strek} y={106} />
      {draaper.map(([x, y]) => (
        <path key={`${x}-${y}`} d={draape(x, y, 5)} {...form(strek, "#BFE0E6", { w: 1.6, ink: F.teal, penFill: "#E3F2F5" })} />
      ))}
    </Ramme>
  );
}

/** The years: a cake with many candles. */
export function Kake({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M18,62 L102,62 L102,100 Q102,104 98,104 L22,104 Q18,104 18,100 Z" {...form(strek, "#F5E3D3", { w: 2.2, penFill: "#FBF1E8" })} />
      <path d="M18,72 Q28,80 39,72 Q50,80 60,72 Q70,80 81,72 Q92,80 102,72" {...linje(strek, "#E9A9B6", 2.2, "#D98C9C")} />
      <path d="M10,104 L110,104" {...linje(strek, F.metallMork, 2.4)} />
      {[30, 44, 58, 72, 86].map((x) => (
        <g key={x}>
          <path d={`M${x},62 L${x},42`} {...linje(strek, F.teal, 3, F.teal)} />
          <path d={draape(x, 34, 3.4)} {...form(strek, "#F1D58A", { w: 1.4, ink: F.rav, penFill: "#F8E3A8" })} />
        </g>
      ))}
    </Ramme>
  );
}

/** Radiation to the head and neck: the machine above, its beam aimed at the jaw. */
export function Straaling({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <rect x={14} y={8} width={52} height={22} rx={6} {...form(strek, F.metall, { w: 2.2, penFill: "#EEF1F1" })} />
      <path d="M32,30 L48,30 L44,40 L36,40 Z" {...form(strek, F.metall, { w: 2, penFill: "#E3E8E8" })} />
      <path d="M36,44 L58,72 M40,44 L62,68 M44,44 L66,64" fill="none" stroke="#F1D58A" strokeWidth={2.4} strokeLinecap="round" strokeDasharray="4 4" {...blekk(strek)} />
      <circle cx={82} cy={62} r={22} {...form(strek, F.hvit, { w: 2.2, penFill: F.papir })} />
      <path d="M76,83 L76,90 Q62,92 58,108 M90,83 L90,90 Q104,92 108,108" {...linje(strek, BLEKK, 2.2)} />
      <path d="M62,70 Q70,82 84,82" {...linje(strek, BLEKK, 1.8)} />
      <path d="M76,58 q3,3 6,0" {...linje(strek, BLEKK, 1.8)} />
    </Ramme>
  );
}

/** Medicines: a pill bottle and two pills. */
export function Pilleglass({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <rect x={30} y={16} width={44} height={16} rx={4} {...form(strek, F.teal, { w: 2.2 })} />
      <path d="M32,32 L72,32 L72,100 Q72,106 66,106 L38,106 Q32,106 32,100 Z" {...form(strek, "#F3D9B5", { w: 2.2, ink: BLEKK, penFill: "#FAEBD5" })} />
      <rect x={38} y={52} width={28} height={30} rx={3} {...form(strek, F.hvit, { w: 1.8, penFill: "#FFFFFF" })} />
      <path d="M44,62 L60,62 M44,70 L56,70" {...linje(strek, F.metallMork, 1.8)} />
      <g transform="rotate(-20 94 92)">
        <rect x={82} y={86} width={24} height={12} rx={6} {...form(strek, F.hvit, { w: 1.8, penFill: "#FFFFFF" })} />
        <path d="M94,86 L94,98" {...linje(strek, F.teal, 1.6, F.teal)} />
      </g>
      <circle cx={96} cy={70} r={6} {...form(strek, F.hvit, { w: 1.8, penFill: "#FFFFFF" })} />
    </Ramme>
  );
}

/** Talking with the doctor about the medicines: two pills and arrows between them. */
export function SnakkeMedisin(p: Stil) {
  const strek = p.strek ?? true;
  return (
    <SnakkeOm
      {...p}
      om={
        <>
          <g transform="rotate(-18 32 44)">
            <rect x={22} y={38} width={20} height={10} rx={5} {...form(strek, F.hvit, { w: 1.6, penFill: "#FFFFFF" })} />
            <path d="M32,38 L32,48" {...linje(strek, AKSENT, 1.4, AKSENT)} />
          </g>
          <g transform="rotate(-18 68 40)">
            <rect x={58} y={34} width={20} height={10} rx={5} {...form(strek, F.hvit, { w: 1.6, penFill: "#FFFFFF" })} />
            <path d="M68,34 L68,44" {...linje(strek, F.teal, 1.4, F.teal)} />
          </g>
          <path d="M42,30 Q50,24 58,28 M54,24 L58,28 L53,31 M58,52 Q50,58 42,54 M46,58 L42,54 L47,51" {...linje(strek, F.metallMork, 1.6)} />
        </>
      }
    />
  );
}

/** Advice that fits you: the clipboard with a drop at its top. */
export function RadTorr(p: Stil) {
  const strek = p.strek ?? true;
  return (
    <PlanMed {...p}>
      <path d={draape(60, 40, 8)} {...form(strek, "#BFE0E6", { w: 2, ink: F.teal, penFill: "#E3F2F5" })} />
    </PlanMed>
  );
}

/* ── Extractions ── */

/** Can it be saved? The magnifier over a tooth with a dark spot at a root's tip. */
export function LupeRot(p: Stil) {
  const strek = p.strek ?? true;
  return (
    <LupePaa {...p} x={50} y={82}>
      <path d="M4,52 Q60,42 116,52 L116,116 L4,116 Z" fill={F.ben} fillOpacity={0.6} {...blekk(strek)} />
      <HelTann strek={strek} x={56} y={56} k={0.36} />
      <path d="M4,52 Q60,42 116,52" {...linje(strek, F.tannkjottMork, 2.2, F.tannkjottMork)} />
      <circle cx={45} cy={84} r={5} fill={F.hull} fillOpacity={0.75} {...blekk(strek)} />
    </LupePaa>
  );
}

/** Numbing before an extraction: the broken tooth, kept calm. */
export function RoligTrekk(p: Stil) {
  const strek = p.strek ?? true;
  return (
    <RoligPaa {...p}>
      <Krone strek={strek} x={60} y={102} k={0.36} />
      <path d={lauv(54, 76, 9, 6, 12, 9)} fill={F.hull} {...blekk(strek)} />
      <path d="M68,68 L64,80 L70,86 L66,96" {...linje(strek, BLEKK, 1.6)} />
      <Gomme strek={strek} y={108} />
    </RoligPaa>
  );
}

/** What to think of the first days: the gap in the bubble. */
export function SnakkeLuke(p: Stil) {
  const strek = p.strek ?? true;
  return (
    <SnakkeOm
      {...p}
      om={
        <>
          <Krone strek={strek} x={32} y={52} k={0.14} />
          <Krone strek={strek} x={68} y={52} k={0.14} />
          <path d="M18,53 Q50,46 82,53" {...linje(strek, F.tannkjottMork, 2, F.tannkjottMork)} />
          <path d="M44,48 Q50,40 56,48" {...linje(strek, F.metallMork, 1.6)} />
        </>
      }
    />
  );
}

/** The gap: a tooth can often take its place. A dashed tooth, and a question. */
export function LukeSporsmal({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      {gommeband(strek, 90)}
      <Krone strek={strek} x={20} y={90} k={0.3} />
      <Krone strek={strek} x={100} y={90} k={0.3} />
      <g transform="translate(60 88) scale(0.28)">
        <path d={JEKSEL.krone} fill="none" stroke={F.teal} strokeWidth={2 / 0.28} strokeDasharray={`${4 / 0.28} ${4 / 0.28}`} {...blekk(strek)} />
      </g>
      <path d="M53,30 q0,-9 8,-9 q8,0 8,8 q0,6 -8,8 l0,6 M61,50 l0,0.5" {...linje(strek, F.teal, 2.6, F.teal)} />
    </Ramme>
  );
}

/* ── Wisdom teeth ── */

/** The eighth tooth in each half of the jaws: both arches from above, one over the other, the four at the back in colour. */
export function Atte({ strek = true, className, forsink }: Stil) {
  const bue = (cy: number) =>
    Array.from({ length: 16 }, (_, i) => {
      const a = Math.PI * (1 - i / 15);
      return { x: r2(60 + Math.cos(a) * 44), y: r2(cy + Math.sin(a) * 40), bak: i === 0 || i === 15 };
    });
  const tenner = [...bue(10), ...bue(66)];
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      {tenner.map(({ x, y, bak }) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={bak ? 5.6 : 3.4} {...form(strek, bak ? "#DDEFF2" : F.hvit, { w: bak ? 2 : 1.4, ink: bak ? F.teal : BLEKK, penFill: bak ? "#DDEFF2" : "#FFFFFF" })} />
      ))}
    </Ramme>
  );
}

/** The wide x-ray: the molars standing, and the wisdom tooth lying over at the back. */
export function RontgenVisdom(p: Stil) {
  const strek = p.strek ?? true;
  return (
    <RontgenMed {...p} x={6} y={28} w={108} h={66}>
      <path d="M12,58 Q60,52 108,58" {...linje(strek, GJEST, 1.2, GJEST)} strokeDasharray="3 3" />
      {[24, 46, 68].map((x) => (
        <Gjest key={x} strek={strek} x={x} y={62} k={0.2} />
      ))}
      <Gjest strek={strek} x={94} y={70} k={0.2} rot={38} />
    </RontgenMed>
  );
}

/** Numbing before the wisdom tooth comes out: it lies tipped over, kept calm. */
export function RoligVisdom(p: Stil) {
  const strek = p.strek ?? true;
  return (
    <RoligPaa {...p}>
      <path d="M4,86 Q60,78 116,86 L116,116 L4,116 Z" fill={F.ben} fillOpacity={0.55} {...blekk(strek)} />
      <HelTann strek={strek} x={42} y={88} k={0.28} />
      <g transform="translate(82 94) rotate(36) scale(0.22)">
        <path d={JEKSEL.tann} {...form(strek, F.hvit, { w: 2.2 / 0.22, penFill: F.papir })} />
      </g>
      <path d="M4,86 Q60,78 116,86" {...linje(strek, F.tannkjottMork, 2.2, F.tannkjottMork)} />
    </RoligPaa>
  );
}

/** Sometimes the tooth comes out in pieces: two halves lifted out of the gum. */
export function TrekkDeler({ strek = true, className, forsink }: Stil) {
  const k = 0.34;
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <defs>
        <clipPath id="trekk-deler-v">
          <rect x={-60} y={-120} width={60} height={220} />
        </clipPath>
        <clipPath id="trekk-deler-h">
          <rect x={0} y={-120} width={60} height={220} />
        </clipPath>
      </defs>
      <path d="M8,96 Q34,86 60,94 Q86,86 112,96 L112,116 L8,116 Z" {...form(strek, F.tannkjott, { w: 1.8, ink: F.tannkjottMork, penFill: "#F6DCD7" })} />
      {[
        ["v", -6, -8],
        ["h", 6, 8],
      ].map(([side, dx, rot]) => (
        <g key={side as string} transform={`translate(${60 + (dx as number)} 56) rotate(${rot}) scale(${k})`}>
          <g clipPath={`url(#trekk-deler-${side})`}>
            <path d={JEKSEL.tann} {...form(strek, F.hvit, { w: 2.2 / k, penFill: F.papir })} />
          </g>
          <path d="M0,-100 L0,20" {...linje(strek, BLEKK, 2.2 / k)} />
        </g>
      ))}
      <path d="M104,74 L104,34 M96,42 L104,34 L112,42" {...linje(strek, F.teal, 2.4, F.teal)} />
    </Ramme>
  );
}

/** What to think of the first days: a few days in the bubble. */
export function SnakkeDager(p: Stil) {
  const strek = p.strek ?? true;
  return (
    <SnakkeOm
      {...p}
      om={
        <>
          <rect x={30} y={26} width={36} height={30} rx={4} {...form(strek, F.hvit, { w: 1.6, penFill: "#FFFFFF" })} />
          <path d="M30,34 L66,34" {...linje(strek, BLEKK, 1.4)} />
          {[38, 48, 58].map((x) => (
            <circle key={x} cx={x} cy={45} r={3.4} {...linje(strek, F.teal, 1.6, F.teal)} />
          ))}
        </>
      }
    />
  );
}

export const HovenKinn = (p: Stil) => <Fjes {...p} uttrykk="hoven" />;

/* ── Injuries ── */

/** A front tooth with its corner knocked off. */
const KNEKT = "M-21,-4 C-25,-26 -30,-52 -29,-76 C-29,-88 -26,-95 -16,-96 L4,-96 L9,-86 L17,-82 L22,-74 L28,-70 C29,-52 25,-26 21,-4 Z";
const BITEN = "M4,-96 L16,-96 C26,-95 29,-88 29,-76 L28,-70 L22,-74 L17,-82 L9,-86 Z";

/** The corner of a front tooth knocked off, and the bit beside it. */
export function FortannKnekt({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Fortann strek={strek} x={50} y={106} k={0.7} d={KNEKT} />
      <g transform="translate(56 88) rotate(24) scale(0.7)">
        <path d={BITEN} {...form(strek, F.hvit, { w: 2.2 / 0.7, penFill: F.papir })} />
      </g>
      <path d="M86,14 l4,-6 M96,22 l7,-3 M98,34 l8,1" {...linje(strek, F.smerte, 2, AKSENT)} />
      <path d="M8,108 Q50,98 92,108" {...linje(strek, F.tannkjottMork, 2.2, F.tannkjottMork)} />
    </Ramme>
  );
}

/** The x-ray of two front teeth, with a crack through one of them. */
export function RontgenFortann(p: Stil) {
  const strek = p.strek ?? true;
  return (
    <RontgenMed {...p}>
      <Gjest strek={strek} x={46} y={58} k={0.42} d={FORTANN.tann} />
      <Gjest strek={strek} x={74} y={58} k={0.42} d={FORTANN.tann} />
      <path d="M66,40 L72,48 L68,54 L76,62" {...linje(strek, AKSENT, 1.8, AKSENT)} />
    </RontgenMed>
  );
}

/** A small bit lost, built up again with a filling. */
export function FyltFortann({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Fortann strek={strek} x={56} y={106} k={0.7} d={KNEKT} />
      <g transform="translate(56 106) scale(0.7)">
        <path d={BITEN} {...form(strek, F.fylling, { w: 2 / 0.7, ink: F.teal, penFill: F.fylling })} />
      </g>
      <path d="M90,22 l6,-7 M96,36 l9,-2 M80,14 l2,-9" {...linje(strek, F.teal, 2.2, F.teal)} />
      <path d="M8,108 Q56,98 104,108" {...linje(strek, F.tannkjottMork, 2.2, F.tannkjottMork)} />
    </Ramme>
  );
}

/** Much lost: a crown over what is left of the front tooth. */
const FORTANN_STUBB = "M-17,-4 C-20,-22 -22,-42 -18,-56 C-15,-62 -8,-64 0,-64 C8,-64 15,-62 18,-56 C22,-42 20,-22 17,-4 Z";
export function KroneFortann({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Fortann strek={strek} x={60} y={106} k={0.7} d={FORTANN_STUBB} />
      <g transform="translate(60 106) scale(0.74)">
        <path d={FORTANN.krone} {...form(strek, "#F4FAFB", { w: 2.2 / 0.74, ink: F.teal, penFill: "rgba(244,250,251,0.82)" })} />
      </g>
      <path d="M8,108 Q60,98 112,108" {...linje(strek, F.tannkjottMork, 2.2, F.tannkjottMork)} />
    </Ramme>
  );
}

/** Check-ups for a while afterwards: three visits along a line, the first ticked. */
export function Kontroller({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M14,64 Q40,44 60,64 Q80,84 106,64" fill="none" stroke={F.metallMork} strokeWidth={2} strokeLinecap="round" strokeDasharray="4 5" {...blekk(strek)} />
      {[
        [18, 62],
        [60, 64],
        [102, 66],
      ].map(([x, y], i) => (
        <g key={x}>
          <circle cx={x} cy={y} r={13} {...form(strek, i === 0 ? "#DDEFF2" : F.hvit, { w: 2, ink: i === 0 ? F.teal : BLEKK, penFill: i === 0 ? "#DDEFF2" : "#FFFFFF" })} />
          <Fortann strek={strek} x={x} y={y + 9} k={0.17} ink={i === 0 ? F.teal : BLEKK} />
        </g>
      ))}
      <path d="M12,92 L16,96 L24,88" {...linje(strek, F.teal, 2.4, F.teal)} />
    </Ramme>
  );
}

/** What to watch for: the tooth turning grey, coming loose, or a swelling by it. */
export function FortannEndring({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Fortann strek={strek} x={60} y={96} k={0.62} fyll="#D9DBD3" />
      <path d="M30,52 q-6,10 0,20 M24,48 q-8,14 0,28 M90,52 q6,10 0,20 M96,48 q8,14 0,28" {...linje(strek, F.teal, 1.8, F.teal)} />
      <path d="M8,98 Q34,88 50,96 Q60,100 70,96 Q86,88 112,98" {...linje(strek, F.tannkjottMork, 2.2, F.tannkjottMork)} />
      <path d={lauv(76, 104, 8, 5, 6, 8)} {...form(strek, "#F5C9BF", { w: 1.6, ink: AKSENT, penFill: "#FBE6E0" })} />
    </Ramme>
  );
}
