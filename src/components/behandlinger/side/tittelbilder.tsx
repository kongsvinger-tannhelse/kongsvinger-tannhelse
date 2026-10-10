import { FARGE as F, JEKSEL, r2, stjerne } from "@/components/forside/behandlinger/popup/tegning";
import { AKSENT, BLEKK, Ramme, blekk, form, linje, type Stil } from "@/components/artikler/tegninger";
import type { Tittelbilde } from "@/data/behandlinger/typer";
import { Ball, Bleking, Fylling, Gebiss, ImplantatTittel, KroneTittel, Rens, Rot, Skjell, Tang, TannkjottTittel, Torr, Ugle } from "./tittelbilder2";
import { Klesklype, Klut, Kulefisk, Lue, Puslespill, Skjaere, Vind } from "./tittelbilder3";

/* The picture beside each treatment page's title: one larger pen scene of
   its own, 320 × 220, that draws itself when the page opens. Server-safe. */

const BOKS = "0 0 320 220";

/** A wavy line of water from x0 to x1. */
const bolge = (x0: number, x1: number, y: number) => {
  let d = `M${x0},${y}`;
  for (let x = x0; x < x1; x += 20) d += ` q5,-4 10,0 q5,4 10,0`;
  return d;
};

/** The check-up: the dentist's chair, tipped back, under its lamp. */
export function Stol({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks={BOKS}>
      <path d="M210,46 L236,50 L110,96 L90,66 Z" fill={F.lys} fillOpacity={0.8} {...blekk(strek)} />
      <path d="M24,204 L296,204" {...linje(strek, F.metallMork, 2)} />
      <rect x={112} y={196} width={92} height={8} rx={4} {...form(strek, F.metall, { w: 2, penFill: "#EEF1F1" })} />
      <path d="M146,196 L150,163 L172,163 L176,196 Z" {...form(strek, F.metall, { w: 2.2, penFill: "#EEF1F1" })} />
      <path
        d="M85,70 L129,138 Q133,141 140,141 L198,141 Q202,141 206,143 L266,174 Q274,180 268,188 Q262,196 254,192 L196,163 L136,163 Q120,163 113,152 L67,82 Q62,72 72,66 Q80,63 85,70 Z"
        {...form(strek, F.smekke, { w: 2.4, ink: BLEKK, penFill: "#DDEFF2" })}
      />
      <rect x={49} y={48} width={30} height={18} rx={9} transform="rotate(56.7 64 57)" {...form(strek, F.smekke, { w: 2.2, penFill: "#DDEFF2" })} />
      <path d="M150,126 L188,126" {...linje(strek, BLEKK, 5)} />
      <path d="M169,128 L169,141" {...linje(strek, BLEKK, 2)} />
      <path d="M302,0 L302,16 Q302,30 288,30 L234,30" {...linje(strek, F.metallMork, 3)} />
      <path d="M206,38 Q214,22 236,26 L240,44 Q222,52 206,38 Z" {...form(strek, F.metall, { w: 2.2, penFill: "#EEF1F1" })} />
      <path d={`${stjerne(46, 28, 7)} ${stjerne(120, 40, 5)}`} {...form(strek, "#F1D58A", { w: 1.6, ink: F.teal })} />
    </Ramme>
  );
}

/** A bridge: the new tooth hung between two crowned teeth, with a steel arch over it like the bridge over the Glomma, lamps lit, and the river below. */
export function BroElv({ strek = true, className, forsink }: Stil) {
  // The arch from crown to crown: a quadratic from (104,78) over (160,-18) to (216,78).
  const bue = (t: number) => [r2(104 + 112 * t), r2(78 - 192 * t * (1 - t))] as const;
  const ts = [1 / 6, 2 / 6, 3 / 6, 4 / 6, 5 / 6];
  const punkt = ts.map(bue);
  const stag = [
    ...punkt.map(([x, y]) => `M${x},${y} L${x},78`),
    `M104,78 L${punkt[0][0]},${punkt[0][1]}`,
    `M${punkt[0][0]},78 L${punkt[1][0]},${punkt[1][1]}`,
    `M${punkt[1][0]},78 L${punkt[2][0]},${punkt[2][1]}`,
    `M${punkt[3][0]},78 L${punkt[2][0]},${punkt[2][1]}`,
    `M${punkt[4][0]},78 L${punkt[3][0]},${punkt[3][1]}`,
    `M216,78 L${punkt[4][0]},${punkt[4][1]}`,
  ].join(" ");
  return (
    <Ramme className={className} forsink={forsink} boks={BOKS}>
      <path d={`${bolge(30, 290, 200)} ${bolge(60, 260, 212)}`} {...linje(strek, F.teal, 2, F.teal)} />
      {[92, 228].map((x) => (
        <g key={x} transform={`translate(${x} 134) scale(0.56)`}>
          <path d={JEKSEL.tann} {...form(strek, F.hvit, { w: 2.4 / 0.56, penFill: F.papir })} />
        </g>
      ))}
      <path d="M12,138 Q60,124 100,132 Q160,146 220,132 Q260,124 308,138 L308,180 Q160,192 12,180 Z" {...form(strek, F.tannkjott, { w: 2, ink: F.tannkjottMork, penFill: "#F3D6D0" })} />
      <path d="M110,108 L210,108" {...linje(strek, F.teal, 8, F.teal)} />
      {[
        [92, 134, 0.56],
        [228, 134, 0.56],
        [160, 138, 0.5],
      ].map(([x, y, k]) => (
        <g key={x} transform={`translate(${x} ${y}) scale(${k})`}>
          <path d={JEKSEL.krone} {...form(strek, "#F4FAFB", { w: 2.4 / k, ink: F.teal, penFill: "#F4FAFB" })} />
          <path d={JEKSEL.fure} {...linje(strek, F.fure, 1.8 / k)} />
        </g>
      ))}
      <path d="M104,78 Q160,-18 216,78 M104,78 L216,78" {...linje(strek, BLEKK, 2.4)} />
      <path d={stag} {...linje(strek, BLEKK, 1.4)} />
      {[punkt[1], punkt[2], punkt[3]].map(([x, y]) => (
        <circle key={x} cx={x} cy={y - 7} r={3.4} {...form(strek, "#F1D58A", { w: 1.4, ink: "#C9A54A", penFill: "#F8E6B4" })} />
      ))}
    </Ramme>
  );
}

/**
 * Grinding at night: a sleeping face on the pillow, the teeth pressed together, the moon outside.
 * `paaMork`: on a night sky. The moon and stars are lit and what stands in the dark is drawn in light
 * ink; what is drawn on the white pillow keeps its dark pen.
 */
export function Natt({ strek = true, className, forsink, paaMork = false }: Stil & { paaMork?: boolean }) {
  const lyst = paaMork ? { ink: "#F6E3A6", penFill: "#F1D58A" } : {};
  return (
    <Ramme className={className} forsink={forsink} boks={BOKS}>
      <path d="M58,26 a18,18 0 1 0 13,31 a13,13 0 1 1 -13,-31 Z" {...form(strek, "#F1D58A", { w: 2, ...lyst })} />
      <path d={`${stjerne(108, 22, 6)} ${stjerne(252, 30, 7)} ${stjerne(284, 70, 5)}`} {...form(strek, "#F1D58A", { w: 1.6, ink: F.teal, ...lyst })} />
      <path d="M40,128 Q36,108 60,106 L260,106 Q284,108 280,128 L280,176 Q284,196 260,196 L60,196 Q36,196 40,176 Z" {...form(strek, F.hvit, { w: 2.2, penFill: "#FFFFFF", ...(paaMork && { ink: "#F4ECD8" }) })} />
      <circle cx={160} cy={118} r={48} {...form(strek, F.hvit, { w: 2.4, penFill: F.papir })} />
      <path d="M113,108 Q112,70 160,69 Q208,70 207,108 Q196,86 160,84 Q128,85 113,108 Z" {...form(strek, F.metall, { w: 2, penFill: "#E3E8E8" })} />
      <path d="M134,114 q8,6 16,0 M170,114 q8,6 16,0" {...linje(strek, BLEKK, 2.4)} />
      <path d="M134,102 l14,4 M186,102 l-14,4" {...linje(strek, BLEKK, 2.2)} />
      <rect x={144} y={130} width={32} height={13} rx={5} {...form(strek, F.hvit, { w: 2.2, penFill: "#FFFFFF" })} />
      <path d="M145,136.5 l4,-3 l4,3 l4,-3 l4,3 l4,-3 l4,3 l4,-3 l3,2.5" {...linje(strek, AKSENT, 1.8, AKSENT)} />
      <path d="M104,124 l-9,5 l9,5 l-9,5 M216,124 l9,5 l-9,5 l9,5" {...linje(strek, AKSENT, 2.4, AKSENT)} />
      {/* the duvet; on the night sky its foot is rounded, so it isn't cut off square against the dark */}
      <path
        d={paaMork ? "M14,170 Q90,154 160,166 Q230,154 306,170 L306,200 Q306,214 292,214 L28,214 Q14,214 14,200 Z" : "M14,170 Q90,154 160,166 Q230,154 306,170 L306,220 L14,220 Z"}
        {...form(strek, "#DDEFF2", { w: 2.2, ink: F.teal, penFill: "#E8F4F6" })}
      />
      <path d="M216,62 l11,0 l-11,11 l11,0 M236,42 l8,0 l-8,8 l8,0" {...linje(strek, F.teal, 2.2, paaMork ? "#BFE3E8" : F.teal)} />
    </Ramme>
  );
}

/** Every title picture by its id. */
export const TITTELBILDER: Record<Tittelbilde, (p: Stil) => React.JSX.Element> = {
  stol: (p) => <Stol {...p} />,
  "bro-elv": (p) => <BroElv {...p} />,
  natt: (p) => <Natt {...p} />,
  fylling: (p) => <Fylling {...p} />,
  bleking: (p) => <Bleking {...p} />,
  rens: (p) => <Rens {...p} />,
  tannkjott: (p) => <TannkjottTittel {...p} />,
  rot: (p) => <Rot {...p} />,
  torr: (p) => <Torr {...p} />,
  tang: (p) => <Tang {...p} />,
  ugle: (p) => <Ugle {...p} />,
  ball: (p) => <Ball {...p} />,
  krone: (p) => <KroneTittel {...p} />,
  skjell: (p) => <Skjell {...p} />,
  implantat: (p) => <ImplantatTittel {...p} />,
  gebiss: (p) => <Gebiss {...p} />,
  klut: (p) => <Klut {...p} />,
  kulefisk: (p) => <Kulefisk {...p} />,
  puslespill: (p) => <Puslespill {...p} />,
  lue: (p) => <Lue {...p} />,
  klesklype: (p) => <Klesklype {...p} />,
  skjaere: (p) => <Skjaere {...p} />,
  vind: (p) => <Vind {...p} />,
};
