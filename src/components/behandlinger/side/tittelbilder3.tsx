import { FARGE as F, JEKSEL, PULPA, lauv, r2, snofnugg, stjerne } from "@/components/forside/behandlinger/popup/tegning";
import { AKSENT, BLEKK, Ramme, blekk, form, linje, type Stil } from "@/components/artikler/tegninger";
import { Krone } from "./ruter3";
import m from "./side.module.css";

/* The title pictures of the last pages, 320 × 220, in the same pen as
   tittelbilder.tsx. Server-safe. */

const BOKS = "0 0 320 220";
const KRONE_FYLL = "#F4FAFB";
const gnist = (strek: boolean, pts: [number, number, number][]) => (
  <path d={pts.map(([x, y, a]) => stjerne(x, y, a)).join(" ")} {...form(strek, "#F1D58A", { w: 1.6, ink: F.teal })} />
);
const bolge = (x0: number, x1: number, y: number) => {
  let d = `M${x0},${y}`;
  for (let x = x0; x < x1; x += 20) d += ` q5,-4 10,0 q5,4 10,0`;
  return d;
};

/** Toothache, the old way: a face with a cloth tied round it, knotted on top, and the aching molar beside it. */
export function Klut({ strek = true, className, forsink }: Stil) {
  const k = 0.7;
  const klut = { w: 2.2, ink: F.teal, penFill: "#E8F4F6" };
  return (
    <Ramme className={className} forsink={forsink} boks={BOKS}>
      <ellipse cx={112} cy={122} rx={58} ry={64} {...form(strek, F.hvit, { w: 2.2, penFill: F.papir })} />
      <path d="M112,52 Q90,22 80,34 Q80,50 112,54 Z M112,52 Q134,22 144,34 Q144,50 112,54 Z" {...form(strek, "#BFE0E6", klut)} />
      <path
        d="M112,52 C150,52 176,84 176,122 C176,162 148,190 112,190 C76,190 48,162 48,122 C48,84 74,52 112,52 Z M112,68 C86,68 64,92 64,122 C64,152 86,174 112,174 C138,174 160,152 160,122 C160,92 138,68 112,68 Z"
        fillRule="evenodd"
        {...form(strek, "#BFE0E6", klut)}
      />
      <circle cx={112} cy={54} r={7} {...form(strek, "#BFE0E6", klut)} />
      <path d="M58,104 l6,-4 M56,128 l7,0 M60,152 l6,3 M166,104 l-6,-4 M168,128 l-7,0 M164,152 l-6,3" {...linje(strek, F.teal, 1.6, F.teal)} />
      <path d="M86,112 L100,112 M124,112 L138,112 M86,100 l13,4 M138,100 l-13,4" {...linje(strek, BLEKK, 2.4)} />
      <path d="M96,146 q4,-4 8,0 q4,4 8,0 q4,-4 8,0 q4,4 8,0" {...linje(strek, BLEKK, 2.2)} />
      <circle cx={146} cy={136} r={8} fill="#F5C9BF" fillOpacity={0.75} {...blekk(strek)} />
      <path d="M190,150 Q244,140 304,150 L304,214 L190,214 Z" fill={F.ben} fillOpacity={0.55} {...blekk(strek)} />
      <g transform={`translate(246 150) scale(${k})`}>
        <path d={JEKSEL.tann} {...form(strek, F.hvit, { w: 2.4 / k, penFill: F.papir })} />
        <path d={JEKSEL.fure} {...linje(strek, F.fure, 1.8 / k)} />
        <path d={PULPA} {...form(strek, F.smerte, { w: 1.8 / k, ink: AKSENT, penFill: "rgba(217,99,76,0.22)" })} />
      </g>
      <path d="M190,150 Q244,140 304,150" {...linje(strek, F.tannkjottMork, 2.4, F.tannkjottMork)} />
      <path d="M204,62 A46,46 0 0 1 288,62 M192,48 A62,62 0 0 1 300,48" {...linje(strek, AKSENT, 2.4, AKSENT)} />
      <path d="M300,96 l8,6 l-7,5 l8,6" {...linje(strek, AKSENT, 2.4, AKSENT)} />
      {gnist(strek, [[30, 40, 7]])}
    </Ramme>
  );
}

/** A swelling: a puffed-up pufferfish, and a molar with a red lump on the gum beside it. */
export function Kulefisk({ strek = true, className, forsink }: Stil) {
  const cx = 108;
  const cy = 106;
  const pigger = Array.from({ length: 14 }, (_, i) => {
    const a = (i / 14) * Math.PI * 2 + 0.2;
    return `M${r2(cx + Math.cos(a) * 54)},${r2(cy + Math.sin(a) * 54)} L${r2(cx + Math.cos(a) * 66)},${r2(cy + Math.sin(a) * 66)}`;
  }).join(" ");
  const gul = { w: 2.4, ink: "#C9A54A", penFill: "#FBEFC8" };
  return (
    <Ramme className={className} forsink={forsink} boks={BOKS}>
      <path d={`${bolge(20, 180, 202)} ${bolge(50, 150, 212)}`} {...linje(strek, F.teal, 2, F.teal)} />
      {/* the fish in one piece: once drawn, it puffs up and goes down again (side.module.css) */}
      <g className={m.puff}>
      <path d={pigger} {...linje(strek, "#C9A54A", 2.2, "#C9A54A")} />
      <path d="M56,106 L26,82 Q34,106 26,130 Z" {...form(strek, "#F8E3A8", gul)} />
      <circle cx={cx} cy={cy} r={56} {...form(strek, "#F8E3A8", gul)} />
      {[
        [84, 76],
        [74, 112],
        [100, 140],
        [124, 130],
        [96, 92],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={3.4} fill="#C9A54A" fillOpacity={0.6} {...blekk(strek)} />
      ))}
      <path d="M102,116 Q90,118 92,130 Q104,128 102,116 Z" {...form(strek, "#F8E3A8", { ...gul, w: 1.8 })} />
      <circle cx={132} cy={90} r={11} {...form(strek, F.hvit, { w: 2.2, penFill: "#FFFFFF" })} />
      <circle cx={135} cy={90} r={4.4} fill={BLEKK} {...blekk(strek)} />
      <circle cx={146} cy={112} r={8} fill="#F5C9BF" fillOpacity={0.75} {...blekk(strek)} />
      <ellipse cx={162} cy={106} rx={4} ry={5} {...form(strek, "#F1A39A", { w: 2, ink: AKSENT, penFill: "#F7C3BC" })} />
      </g>
      {[
        [182, 92, 4],
        [194, 78, 3],
        [204, 66, 2.4],
      ].map(([x, y, r]) => (
        <circle key={x} cx={x} cy={y} r={r} {...form(strek, "#DDEFF2", { w: 1.6, ink: F.teal, penFill: "#EEF7F8" })} />
      ))}
      <Krone strek={strek} x={266} y={168} k={0.6} />
      <path d="M200,168 Q266,156 312,168 L312,212 L200,212 Z" {...form(strek, F.tannkjott, { w: 2, ink: F.tannkjottMork, penFill: "#F3D6D0" })} />
      <path d="M208,170 Q220,136 238,166 Z" {...form(strek, F.sart, { w: 2, ink: AKSENT, penFill: "#F6C9C0" })} />
      <path d="M208,132 l-5,-8 M222,124 l0,-10 M236,130 l5,-8" {...linje(strek, AKSENT, 2.2, AKSENT)} />
    </Ramme>
  );
}

/** A partial denture: your own teeth with two gaps, and the new teeth on their saddles coming down into them, held by a metal bar; a puzzle piece for luck. */
export function Puslespill({ strek = true, className, forsink }: Stil) {
  const k = 0.42;
  const protese = { w: 2, ink: F.tannkjottMork, penFill: "#F7DFDA" };
  return (
    <Ramme className={className} forsink={forsink} boks={BOKS}>
      <path d="M16,186 Q160,174 304,186 L304,214 L16,214 Z" {...form(strek, F.tannkjott, { w: 2, ink: F.tannkjottMork, penFill: "#F3D6D0" })} />
      {[44, 92, 188, 284].map((x) => (
        <Krone key={x} strek={strek} x={x} y={184} k={k} />
      ))}
      {[140, 236].map((x) => (
        <g key={x} transform={`translate(${x} 184) scale(${k})`}>
          <path d={JEKSEL.krone} fill="none" stroke={F.metallMork} strokeWidth={1.6 / k} strokeDasharray={`${4 / k} ${4 / k}`} {...blekk(strek)} />
        </g>
      ))}
      <path d="M140,128 Q188,150 236,128" {...linje(strek, F.metall, 6, F.metallMork)} />
      {[140, 236].map((x) => (
        <g key={x}>
          <path d={`M${x - 26},132 Q${x},124 ${x + 26},132 L${x + 26},142 Q${x},136 ${x - 26},142 Z`} {...form(strek, "#EBB5AB", protese)} />
          <Krone strek={strek} x={x} y={132} k={0.4} ink={F.teal} fyll={KRONE_FYLL} />
          <path d={`M${x - 26},136 Q${x - 38},134 ${x - 40},122 M${x + 26},136 Q${x + 38},134 ${x + 40},122`} {...linje(strek, F.metallMork, 2.8, F.metallMork)} />
          <path d={`M${x},56 L${x},78 M${x - 7},71 L${x},78 L${x + 7},71`} {...linje(strek, F.teal, 2.6, F.teal)} />
        </g>
      ))}
      <path
        d="M30,24 L48,24 A7,7 0 1 1 62,24 L80,24 L80,42 A7,7 0 1 1 80,56 L80,74 L30,74 L30,56 A7,7 0 1 0 30,42 Z"
        {...form(strek, "#F1D58A", { w: 2.2, ink: "#C9A54A", penFill: "#F8E3A8" })}
      />
      {gnist(strek, [
        [292, 52, 8],
        [262, 92, 5],
      ])}
    </Ramme>
  );
}

const GRONN = "#7E9160";
/** A ground-down stump above the gum line (the gum covers the roots). */
const STUBB_KRONE = "M-40,-6 C-42,-28 -36,-50 -26,-58 C-12,-64 12,-64 26,-58 C36,-50 42,-28 40,-6 Z";
const DYP = { w: 2.2, ink: BLEKK, penFill: "#3A4C55" };
const HVIT = { w: 2, ink: BLEKK, penFill: "#FFFFFF" };

/** Sensitive teeth: a shivering molar in a knitted hat and scarf, an ice cream beside it, and snowflakes. */
export function Lue({ strek = true, className, forsink }: Stil) {
  const strikk = { w: 2.2, ink: AKSENT, penFill: "#F8CFC6" };
  const skjerf = { w: 2, ink: F.teal, penFill: "#DDEFF2" };
  return (
    <Ramme className={className} forsink={forsink} boks={BOKS}>
      <path d={[snofnugg(36, 44, 10), snofnugg(222, 34, 8), snofnugg(302, 34, 6), snofnugg(28, 178, 7), snofnugg(304, 196, 6)].join(" ")} {...linje(strek, F.teal, 2, F.teal)} />
      <Krone strek={strek} x={130} y={196} k={1.1} fure={false} />
      <path d="M70,112 Q68,54 130,50 Q192,54 190,112 Z" {...form(strek, "#F2A596", strikk)} />
      <path d="M64,106 Q130,96 196,106 L196,124 Q130,114 64,124 Z" {...form(strek, "#F2A596", { ...strikk, penFill: "#FBE1DD" })} />
      <path d="M78,108 l0,12 M92,106 l0,12 M106,104 l0,12 M120,103 l0,12 M134,103 l0,12 M148,104 l0,12 M162,105 l0,12 M176,107 l0,12" {...linje(strek, AKSENT, 1.4, AKSENT)} />
      <path d={lauv(130, 44, 15, 13, 7, 10)} {...form(strek, F.hvit, { w: 2, ink: F.metallMork, penFill: "#FFFFFF" })} />
      <path d="M104,132 l12,-3 M156,132 l-12,-3 M106,144 q6,-4 12,0 M142,144 q6,-4 12,0" {...linje(strek, BLEKK, 2.4)} />
      <path d="M112,166 l6,-4 l6,4 l6,-4 l6,4 l6,-4 l6,4" {...linje(strek, BLEKK, 2.2)} />
      <circle cx={98} cy={158} r={6} fill="#F5C9BF" fillOpacity={0.75} {...blekk(strek)} />
      <circle cx={162} cy={158} r={6} fill="#F5C9BF" fillOpacity={0.75} {...blekk(strek)} />
      <path d="M66,176 Q130,192 194,176 L194,194 Q130,210 66,194 Z" {...form(strek, "#BFE0E6", skjerf)} />
      <path d="M164,194 L172,216 L188,212 L182,190" {...form(strek, "#BFE0E6", skjerf)} />
      <path d="M90,183 l0,16 M110,186 l0,17 M150,186 l0,17 M170,183 l0,16" {...linje(strek, F.teal, 1.6, F.teal)} />
      <path d="M52,130 l-8,5 l8,5 l-8,5 M208,130 l8,5 l-8,5 l8,5" {...linje(strek, F.teal, 2.2, F.teal)} />
      <path d="M246,126 L266,198 L286,126 Z" {...form(strek, "#E9C48A", { w: 2.2, ink: "#C9A54A", penFill: "#F3DDB4" })} />
      <path d="M252,142 L280,142 M256,158 L276,158 M261,174 L271,174" {...linje(strek, "#C9A54A", 1.4, "#C9A54A")} />
      <circle cx={266} cy={84} r={15} {...form(strek, "#DDEFF2", { w: 2, ink: F.teal, penFill: "#EEF7F8" })} />
      <circle cx={266} cy={112} r={20} {...form(strek, "#F7C3BC", { w: 2.2, ink: AKSENT, penFill: "#FBE1DD" })} />
      <path d="M252,126 q0,8 4,8 q4,0 4,-6" {...form(strek, "#F7C3BC", { w: 1.6, ink: AKSENT, penFill: "#FBE1DD" })} />
    </Ramme>
  );
}

/** Bad breath: a nose with a clothespin on it, the smell drifting towards it, and a sprig of mint. */
export function Klesklype({ strek = true, className, forsink }: Stil) {
  const tre = { w: 2, ink: "#B9805F", penFill: "#F3D6C4" };
  const blad = { w: 1.6, ink: GRONN, penFill: "#E6EDD8" };
  const bolgeLinje = (x: number, y: number, n: number) => `M${x},${y}` + " q6,-6 12,0 q6,6 12,0".repeat(n);
  return (
    <Ramme className={className} forsink={forsink} boks={BOKS}>
      <path d="M278,184 L276,216 M306,172 L310,216" {...linje(strek, BLEKK, 2.4)} />
      <path
        d="M298,14 C276,8 258,26 256,54 C255,66 252,76 248,84 Q234,104 222,116 Q214,126 226,132 Q240,138 252,132 Q250,146 254,154 Q246,160 250,168 Q258,184 280,186 C302,188 314,160 314,112 C314,56 314,24 298,14 Z"
        {...form(strek, F.hvit, { w: 2.4, penFill: F.papir })}
      />
      <path d="M298,14 C276,8 258,26 256,54 Q282,34 314,46 L314,34 C312,24 306,18 298,14 Z" {...form(strek, F.metall, { w: 2, penFill: "#E3E8E8" })} />
      <path d="M294,96 q12,-4 12,10 q0,14 -12,12" {...linje(strek, BLEKK, 2.2)} />
      <path d="M262,64 q7,5 14,0 M262,54 l14,-3" {...linje(strek, BLEKK, 2.2)} />
      <path d="M250,153 l9,1" {...linje(strek, BLEKK, 2)} />
      <g transform="translate(236 102) rotate(-35)">
        <rect x={-52} y={-10} width={54} height={8} rx={2} {...form(strek, "#E7B79A", tre)} />
        <rect x={-52} y={2} width={54} height={8} rx={2} {...form(strek, "#E7B79A", tre)} />
        <circle cx={-26} cy={0} r={5} {...form(strek, F.metall, { w: 1.6 })} />
      </g>
      <path d={lauv(132, 64, 26, 16, 5, 10)} {...form(strek, "#E6EDD8", { w: 2, ink: GRONN, penFill: "#EEF3E4" })} />
      <path d={`${bolgeLinje(70, 100, 5)} ${bolgeLinje(58, 124, 5)} ${bolgeLinje(80, 148, 4)}`} {...linje(strek, GRONN, 2.2, GRONN)} />
      <path d="M40,206 Q44,176 54,152" {...linje(strek, GRONN, 2.2, GRONN)} />
      <path d={`${lauv(34, 176, 10, 6, 3, 8)} ${lauv(62, 166, 10, 6, 6, 8)} ${lauv(46, 148, 9, 6, 9, 8)}`} {...form(strek, F.bjork, blad)} />
      {gnist(strek, [[28, 40, 7]])}
    </Ramme>
  );
}

/** A lost filling: a magpie eyeing the shiny filling on the ground, and the molar with its empty hole. */
export function Skjaere({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks={BOKS}>
      <path d="M10,178 Q160,168 310,178 L310,214 L10,214 Z" {...form(strek, F.tannkjott, { w: 2, ink: F.tannkjottMork, penFill: "#F3D6D0" })} />
      <path d="M86,136 L26,166 L32,176 L92,148 Z" {...form(strek, "#3A4C55", DYP)} />
      <path d="M40,164 L84,142" {...linje(strek, F.teal, 1.6, F.teal)} />
      <ellipse cx={112} cy={130} rx={34} ry={21} transform="rotate(-12 112 130)" {...form(strek, "#3A4C55", DYP)} />
      <path d="M96,142 Q114,154 138,140 Q132,128 116,131 Q100,134 96,142 Z" {...form(strek, F.hvit, HVIT)} />
      <path d="M98,122 Q112,114 126,124 Q112,130 98,122 Z" {...form(strek, F.hvit, HVIT)} />
      <circle cx={148} cy={104} r={15} {...form(strek, "#3A4C55", DYP)} />
      <path d="M161,99 L180,106 L161,111 Z" {...form(strek, "#3A4C55", DYP)} />
      <circle cx={152} cy={100} r={3.4} fill="#FFFFFF" {...blekk(strek)} />
      <path d="M108,150 L104,178 M120,150 L122,178 M98,178 L110,178 M116,178 L128,178" {...linje(strek, BLEKK, 2)} />
      <path d={lauv(198, 172, 10, 6, 4, 9)} {...form(strek, F.fylling, { w: 1.8, ink: F.teal, penFill: F.fylling })} />
      <Krone strek={strek} x={260} y={178} k={0.62} />
      <path d="M242,118 Q242,140 260,140 Q278,140 278,118" {...form(strek, F.papir, { w: 2, ink: F.hull, penFill: "#EFE6DA" })} />
      {gnist(strek, [
        [194, 152, 6],
        [214, 158, 4],
        [292, 64, 7],
      ])}
    </Ramme>
  );
}

/** A loose crown: the crown lifting off the stump like a hat in the wind, with birch leaves blowing past. */
export function Vind({ strek = true, className, forsink }: Stil) {
  const k = 0.7;
  const blad = (x: number, y: number, vri: number) => (
    <path key={`${x}-${y}`} d="M0,-9 Q7,-2 0,9 Q-7,-2 0,-9 Z M0,-7 L0,8" transform={`translate(${x} ${y}) rotate(${vri})`} {...form(strek, F.bjork, { w: 1.6, ink: GRONN, penFill: "#E6EDD8" })} />
  );
  return (
    <Ramme className={className} forsink={forsink} boks={BOKS}>
      <path d="M14,70 Q60,58 96,72 Q118,82 108,96 Q98,104 90,94 M24,110 Q70,100 128,110 M40,44 Q80,36 120,46" {...linje(strek, F.teal, 2.2, F.teal)} />
      <Krone strek={strek} x={66} y={184} k={0.55} />
      <Krone strek={strek} x={254} y={184} k={0.55} />
      <g transform={`translate(160 188) scale(${k})`}>
        <path d={STUBB_KRONE} {...form(strek, F.hvit, { w: 2.4 / k, penFill: F.papir })} />
      </g>
      <path d="M14,184 Q160,172 306,184 L306,214 L14,214 Z" {...form(strek, F.tannkjott, { w: 2, ink: F.tannkjottMork, penFill: "#F3D6D0" })} />
      <g transform="rotate(16 176 96)">
        <Krone strek={strek} x={176} y={120} k={0.6} ink={F.teal} fyll={KRONE_FYLL} />
      </g>
      <path d="M148,134 l-6,6 M168,136 l0,8 M188,132 l6,6" {...linje(strek, F.metallMork, 2)} />
      {[
        [232, 52, 30],
        [274, 88, -20],
        [134, 26, 60],
        [300, 40, 10],
      ].map(([x, y, v]) => blad(x, y, v))}
    </Ramme>
  );
}
