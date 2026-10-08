import { FARGE as F, JEKSEL, PULPA, STUBB, draape, lauv, r2, stjerne } from "@/components/forside/behandlinger/popup/tegning";
import { AKSENT, BLEKK, Ramme, blekk, form, linje, type Stil } from "@/components/artikler/tegninger";
import { Krone } from "./ruter3";
import { Fortann, OverFortann } from "./ruter4";

/* The title pictures of the other thirteen pages, 320 × 220, in the same
   pen as tittelbilder.tsx. Server-safe. */

const BOKS = "0 0 320 220";
const KRONE_FYLL = "#F4FAFB";
const gnist = (strek: boolean, pts: [number, number, number][]) => (
  <path d={pts.map(([x, y, a]) => stjerne(x, y, a)).join(" ")} {...form(strek, "#F1D58A", { w: 1.6, ink: F.teal })} />
);

/** A filling going in: the hole half filled, the small instrument pressing the rest in. */
export function Fylling({ strek = true, className, forsink }: Stil) {
  const k = 0.95;
  return (
    <Ramme className={className} forsink={forsink} boks={BOKS}>
      <path d="M10,128 Q160,116 310,128 L310,220 L10,220 Z" fill={F.ben} fillOpacity={0.55} {...blekk(strek)} />
      <g transform={`translate(140 132) scale(${k})`}>
        <path d={JEKSEL.tann} {...form(strek, F.hvit, { w: 2.4 / k, penFill: F.papir })} />
        <path d={lauv(4, -88, 24, 9, 11, 9)} fill={F.hull} {...blekk(strek)} />
        <path d={lauv(-6, -89, 17, 8, 4, 9)} {...form(strek, F.fylling, { w: 2 / k, ink: F.teal, penFill: F.fylling })} />
      </g>
      <path d="M10,124 Q80,112 140,128 Q200,112 310,124 L310,140 Q200,130 140,144 Q80,130 10,140 Z" {...form(strek, F.tannkjott, { w: 2, ink: F.tannkjottMork, penFill: "#F3D6D0" })} />
      <path d="M300,6 L214,40 Q196,46 170,46" {...linje(strek, F.metallMork, 3.4)} />
      <path d="M300,6 L262,21" {...linje(strek, F.teal, 8, F.teal)} />
      <path d={lauv(164, 47, 6, 4, 2, 7)} {...form(strek, F.fylling, { w: 1.6, ink: F.teal, penFill: F.fylling })} />
      {gnist(strek, [
        [80, 36, 8],
        [214, 74, 5],
      ])}
    </Ramme>
  );
}

const SMIL_X = [44, 85, 133, 187, 235, 276];
const SMIL_K = [0.62, 0.7, 0.86, 0.86, 0.7, 0.62];
const smilGomme = (strek: boolean) => (
  <path d="M20,34 Q160,16 300,34 L300,62 Q160,50 20,62 Z" {...form(strek, F.tannkjott, { w: 2, ink: F.tannkjottMork, penFill: "#F3D6D0" })} />
);

/** Bleaching: a smile going from yellowish to white, and the arrow under it. */
export function Bleking({ strek = true, className, forsink }: Stil) {
  const fyll = ["#F0DCAA", "#F4E5C0", "#F8EED6", "#FFFFFF", "#FFFFFF", "#FFFFFF"];
  return (
    <Ramme className={className} forsink={forsink} boks={BOKS}>
      {SMIL_X.map((x, i) => (
        <OverFortann key={x} strek={strek} x={x} y={58} k={SMIL_K[i]} fyll={fyll[i]} />
      ))}
      {smilGomme(strek)}
      <path d="M96,178 L224,178 M214,170 L224,178 L214,186" {...linje(strek, F.teal, 2.6, F.teal)} />
      {gnist(strek, [
        [296, 112, 8],
        [258, 160, 6],
        [300, 168, 4],
      ])}
    </Ramme>
  );
}

/** A cleaning: three lower front teeth, tartar at the gum on two, the scaler at work, the third clean and shining. */
export function Rens({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks={BOKS}>
      {[96, 160, 224].map((x) => (
        <Fortann key={x} strek={strek} x={x} y={156} k={0.8} />
      ))}
      <path d="M20,150 Q58,138 96,152 Q128,140 160,152 Q192,140 224,152 Q262,138 300,150 L300,220 L20,220 Z" {...form(strek, F.tannkjott, { w: 2, ink: F.tannkjottMork, penFill: "#F3D6D0" })} />
      <path d={lauv(94, 146, 16, 7, 3, 9)} {...form(strek, "#D8C27A", { w: 1.6, ink: "#B9A55C", penFill: "#E9DAA2" })} />
      <path d={lauv(152, 147, 10, 6, 8, 9)} {...form(strek, "#D8C27A", { w: 1.6, ink: "#B9A55C", penFill: "#E9DAA2" })} />
      <path d="M22,10 L118,96 Q132,110 160,128 L168,138" {...linje(strek, F.metallMork, 3.4)} />
      <path d="M22,10 L56,40" {...linje(strek, F.teal, 9, F.teal)} />
      <path d="M244,98 l10,-8 M250,114 l12,-2" {...linje(strek, F.teal, 2.2, F.teal)} />
      {gnist(strek, [
        [270, 74, 8],
        [292, 110, 5],
      ])}
    </Ramme>
  );
}

/** Gum disease: red, swollen gum on the left, calm pink gum on the right, and the toothbrush at the gum line. */
export function TannkjottTittel({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks={BOKS}>
      {[90, 160, 230].map((x) => (
        <Krone key={x} strek={strek} x={x} y={152} k={0.7} />
      ))}
      <path d="M20,148 Q40,128 62,146 Q90,124 118,146 Q140,128 160,148 L160,220 L20,220 Z" {...form(strek, "#F2B3A8", { w: 2.2, ink: AKSENT, penFill: "#F6C9C0" })} />
      <path d="M160,148 Q196,138 230,148 Q266,138 300,148 L300,220 L160,220 Z" {...form(strek, F.tannkjott, { w: 2.2, ink: F.tannkjottMork, penFill: "#F3D6D0" })} />
      <g transform="translate(176 132) rotate(-36)">
        <rect x={0} y={-10} width={46} height={14} rx={5} {...form(strek, F.hvit, { w: 2, penFill: "#FFFFFF" })} />
        <path d="M5,4 L5,16 M12,4 L12,16 M19,4 L19,16 M26,4 L26,16 M33,4 L33,16 M40,4 L40,16" {...linje(strek, F.metallMork, 1.6)} />
        <rect x={46} y={-7} width={120} height={9} rx={4.5} {...form(strek, F.teal, { w: 2 })} />
      </g>
      {gnist(strek, [[274, 70, 7]])}
    </Ramme>
  );
}

/** A root filling: the molar cut open in the jaw, its canals filled, and three fine files beside it. */
export function Rot({ strek = true, className, forsink }: Stil) {
  const k = 0.98;
  const filer = ["#F1D58A", "#E58C7A", "#7FB8E8"];
  return (
    <Ramme className={className} forsink={forsink} boks={BOKS}>
      <path d="M10,120 Q160,108 310,120 L310,220 L10,220 Z" fill={F.ben} fillOpacity={0.55} {...blekk(strek)} />
      <g transform={`translate(124 124) scale(${k})`}>
        <path d={JEKSEL.tann} {...form(strek, F.hvit, { w: 2.4 / k, penFill: F.papir })} />
        <path d={PULPA} {...form(strek, F.rav, { w: 1.6 / k, ink: "#C9803E", penFill: "#F5D3AC" })} />
        <path d="M-12,-93 C-6,-97 6,-97 12,-93 L8,-60 L-8,-60 Z" {...form(strek, F.fylling, { w: 1.8 / k, ink: F.teal, penFill: F.fylling })} />
      </g>
      <path d="M10,116 Q70,104 124,120 Q180,104 310,116" {...linje(strek, F.tannkjottMork, 2.4, F.tannkjottMork)} />
      {filer.map((f, i) => {
        const x = 214 + i * 30;
        const y = 22 + i * 8;
        return (
          <g key={f}>
            <rect x={x} y={y} width={16} height={24} rx={4} {...form(strek, f, { w: 2 })} />
            <path d={`M${x + 8},${y + 24} L${x + 2},${y + 120}`} {...linje(strek, F.metallMork, 1.8)} />
            <path d={`M${x + 7},${y + 40} l-4,3 M${x + 6},${y + 56} l-4,3 M${x + 5},${y + 72} l-4,3 M${x + 4},${y + 88} l-4,3`} {...linje(strek, F.metallMork, 1.2)} />
          </g>
        );
      })}
      {gnist(strek, [[40, 40, 7]])}
    </Ramme>
  );
}

/** A dry mouth: a tooth on cracked dry ground under the sun, a cactus beside it, and one drop on its way. */
export function Torr({ strek = true, className, forsink }: Stil) {
  const straaler = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2;
    return `M${r2(60 + Math.cos(a) * 30)},${r2(52 + Math.sin(a) * 30)} L${r2(60 + Math.cos(a) * 40)},${r2(52 + Math.sin(a) * 40)}`;
  }).join(" ");
  return (
    <Ramme className={className} forsink={forsink} boks={BOKS}>
      <circle cx={60} cy={52} r={22} {...form(strek, "#F8E3A8", { w: 2.2, ink: "#C9A54A", penFill: "#FBEFC8" })} />
      <path d={straaler} {...linje(strek, "#E9C46A", 2.2, "#C9A54A")} />
      <path d="M10,170 Q160,156 310,170 L310,220 L10,220 Z" {...form(strek, "#EAD9B5", { w: 2, ink: "#C9AE7E", penFill: "#F3E8D2" })} />
      <path d="M40,180 l14,10 l-6,12 M120,176 l-8,14 l12,10 M214,178 l10,12 l-4,14 M282,182 l-10,10" {...linje(strek, "#C9AE7E", 1.8, "#C9AE7E")} />
      <Krone strek={strek} x={160} y={168} k={0.86} />
      <path d="M262,170 L262,104 Q262,92 273,92 Q284,92 284,104 L284,170 Z" {...form(strek, F.bjork, { w: 2.2, ink: "#7E9160", penFill: "#E6EDD8" })} />
      <path d="M262,136 L250,136 Q242,136 242,128 L242,114 Q242,108 248,108 Q254,108 254,114 L254,126 L262,126 M284,124 L296,124 Q302,124 302,116 L302,106 Q302,100 296,100 Q290,100 290,106 L290,114 L284,114" {...form(strek, F.bjork, { w: 2.2, ink: "#7E9160", penFill: "#E6EDD8" })} />
      <path d="M268,104 l-3,-2 M278,120 l3,-2 M268,144 l-3,-2 M278,156 l3,-2" {...linje(strek, "#7E9160", 1.4, "#7E9160")} />
      <path d={draape(118, 96, 7)} {...form(strek, "#BFE0E6", { w: 1.8, ink: F.teal, penFill: "#E3F2F5" })} />
      <path d="M118,52 L118,70 M118,76 L118,80" fill="none" stroke={F.teal} strokeWidth={1.8} strokeLinecap="round" strokeDasharray="4 5" {...blekk(strek)} />
    </Ramme>
  );
}

/** An extraction: the forceps lifting a tooth up out of the gum, between its two neighbours. */
export function Tang({ strek = true, className, forsink }: Stil) {
  const k = 0.62;
  return (
    <Ramme className={className} forsink={forsink} boks={BOKS}>
      <Krone strek={strek} x={66} y={162} k={0.6} />
      <Krone strek={strek} x={254} y={162} k={0.6} />
      <g transform={`translate(160 112) scale(${k})`}>
        <path d={JEKSEL.tann} {...form(strek, F.hvit, { w: 2.4 / k, penFill: F.papir })} />
        <path d={JEKSEL.fure} {...linje(strek, F.fure, 1.8 / k)} />
      </g>
      <path d="M10,160 Q160,146 310,160 L310,220 L10,220 Z" {...form(strek, F.tannkjott, { w: 2, ink: F.tannkjottMork, penFill: "#F3D6D0" })} />
      <path d="M140,160 Q160,172 180,160" {...linje(strek, F.tannkjottMork, 2.2, F.tannkjottMork)} />
      <path d="M128,96 Q118,66 146,40 L178,26 L292,4" {...linje(strek, F.metallMork, 4)} />
      <path d="M192,96 Q202,66 184,42 L186,28 L306,22" {...linje(strek, F.metallMork, 4)} />
      <circle cx={182} cy={28} r={6} {...form(strek, F.metall, { w: 2 })} />
      <path d="M90,108 L90,62 M80,72 L90,62 L100,72" {...linje(strek, F.teal, 2.6, F.teal)} />
    </Ramme>
  );
}

/** Wisdom teeth: the molars in the jaw, the wisdom tooth lying over at the back under the gum, and a wise owl on top of it. */
export function Ugle({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks={BOKS}>
      <path d="M10,150 Q160,140 310,150 L310,220 L10,220 Z" fill={F.ben} fillOpacity={0.6} {...blekk(strek)} />
      {[
        [56, 152],
        [128, 150],
      ].map(([x, y]) => (
        <g key={x} transform={`translate(${x} ${y}) scale(0.6)`}>
          <path d={JEKSEL.tann} {...form(strek, F.hvit, { w: 2.4 / 0.6, penFill: F.papir })} />
          <path d={JEKSEL.fure} {...linje(strek, F.fure, 1.8 / 0.6)} />
        </g>
      ))}
      <g transform="translate(200 164) rotate(32) scale(0.56)">
        <path d={JEKSEL.tann} {...form(strek, F.hvit, { w: 2.4 / 0.56, penFill: F.papir })} />
      </g>
      <path d="M10,148 Q80,136 160,146 Q230,130 310,148 L310,176 Q160,166 10,176 Z" {...form(strek, F.tannkjott, { w: 2, ink: F.tannkjottMork, penFill: "rgba(243,214,208,0.82)" })} />
      <g transform="translate(276 142) scale(1.22) translate(-276 -142)">
        <ellipse cx={276} cy={100} rx={28} ry={34} {...form(strek, "#E3CBA3", { w: 2.2, penFill: "#F1E3CB" })} />
        <ellipse cx={276} cy={112} rx={16} ry={18} {...form(strek, "#F6EEDF", { w: 1.6, ink: "#C9AE7E", penFill: "#FBF6EC" })} />
        <path d="M268,104 l4,4 l4,-4 M276,112 l4,4 l4,-4 M268,120 l4,4 l4,-4" {...linje(strek, "#C9AE7E", 1.4, "#C9AE7E")} />
        <path d="M254,74 L256,58 L266,70 M298,74 L296,58 L286,70" {...form(strek, "#E3CBA3", { w: 2, penFill: "#F1E3CB" })} />
        <circle cx={266} cy={86} r={9} {...form(strek, F.hvit, { w: 2, penFill: "#FFFFFF" })} />
        <circle cx={286} cy={86} r={9} {...form(strek, F.hvit, { w: 2, penFill: "#FFFFFF" })} />
        <circle cx={267} cy={87} r={3.6} fill={BLEKK} {...blekk(strek)} />
        <circle cx={285} cy={87} r={3.6} fill={BLEKK} {...blekk(strek)} />
        <path d="M272,94 L280,94 L276,102 Z" {...form(strek, F.rav, { w: 1.6, ink: "#C9803E" })} />
        <path d="M250,96 Q244,116 256,128 M302,96 Q308,116 296,128" {...linje(strek, BLEKK, 2)} />
        <path d="M266,134 l-3,7 M270,134 l0,8 M282,134 l0,8 M286,134 l3,7" {...linje(strek, F.rav, 2, "#C9803E")} />
      </g>
    </Ramme>
  );
}

/** An injury: a football on its way, and a front tooth with its corner knocked off. */
export function Ball({ strek = true, className, forsink }: Stil) {
  const femkant = Array.from({ length: 5 }, (_, i) => {
    const a = -Math.PI / 2 + (i / 5) * Math.PI * 2;
    return [r2(84 + Math.cos(a) * 13), r2(140 + Math.sin(a) * 13), r2(84 + Math.cos(a) * 40), r2(140 + Math.sin(a) * 40)] as const;
  });
  return (
    <Ramme className={className} forsink={forsink} boks={BOKS}>
      <OverFortann strek={strek} x={184} y={48} k={0.72} />
      <g transform="translate(236 48) rotate(180) scale(0.8)">
        <path d="M-21,-4 C-25,-26 -30,-52 -29,-76 C-29,-88 -26,-95 -16,-96 L4,-96 L9,-86 L17,-82 L22,-74 L28,-70 C29,-52 25,-26 21,-4 Z" {...form(strek, F.hvit, { w: 2.2 / 0.8, penFill: F.papir })} />
      </g>
      <OverFortann strek={strek} x={288} y={48} k={0.72} />
      <path d="M150,22 Q230,10 316,22 L316,52 Q230,44 150,52 Z" {...form(strek, F.tannkjott, { w: 2, ink: F.tannkjottMork, penFill: "#F3D6D0" })} />
      <g transform="translate(183 76) rotate(150) scale(0.8)">
        <path d="M4,-96 L16,-96 C26,-95 29,-88 29,-76 L28,-70 L22,-74 L17,-82 L9,-86 Z" {...form(strek, F.hvit, { w: 2.2 / 0.8, penFill: F.papir })} />
      </g>
      <path d="M198,126 l-8,6 M212,132 l-2,10 M182,122 l-10,0" {...linje(strek, F.smerte, 2.2, AKSENT)} />
      <circle cx={84} cy={140} r={40} {...form(strek, F.hvit, { w: 2.4, penFill: "#FFFFFF" })} />
      <path d={`M${femkant.map(([x, y]) => `${x},${y}`).join(" L")} Z`} fill={BLEKK} {...blekk(strek)} />
      <path d={femkant.map(([x, y, x2, y2]) => `M${x},${y} L${x2},${y2}`).join(" ")} {...linje(strek, BLEKK, 2)} />
      <path d="M10,112 L32,116 M4,140 L28,140 M10,168 L32,164" {...linje(strek, F.metallMork, 2.2)} />
    </Ramme>
  );
}

/** A crown: the new crown coming down onto the ground-down tooth, and a small king's crown for luck. */
export function KroneTittel({ strek = true, className, forsink }: Stil) {
  const k = 0.85;
  return (
    <Ramme className={className} forsink={forsink} boks={BOKS}>
      <g transform={`translate(150 174) scale(${k})`}>
        <path d={STUBB.tann} {...form(strek, F.hvit, { w: 2.4 / k, penFill: F.papir })} />
      </g>
      <path d="M30,172 Q90,160 150,174 Q210,160 290,172 L290,220 L30,220 Z" {...form(strek, F.tannkjott, { w: 2, ink: F.tannkjottMork, penFill: "#F3D6D0" })} />
      <g transform={`translate(150 98) scale(${k})`}>
        <path d={JEKSEL.krone} {...form(strek, KRONE_FYLL, { w: 2.4 / k, ink: F.teal, penFill: KRONE_FYLL })} />
        <path d={JEKSEL.fure} {...linje(strek, F.fure, 1.8 / k)} />
      </g>
      <path d="M96,80 L96,116 M88,108 L96,116 L104,108 M204,80 L204,116 M196,108 L204,116 L212,108" {...linje(strek, F.teal, 2.4, F.teal)} />
      <path d="M244,64 L238,30 L254,46 L266,24 L278,46 L294,30 L288,64 Z" {...form(strek, "#F1D58A", { w: 2.2, ink: "#C9A54A", penFill: "#F8E3A8" })} />
      <path d="M244,56 L288,56" {...linje(strek, "#C9A54A", 1.6, "#C9A54A")} />
      {[
        [238, 30],
        [266, 24],
        [294, 30],
      ].map(([x, y]) => (
        <circle key={x} cx={x} cy={y} r={3.4} {...form(strek, AKSENT, { w: 1.4, ink: AKSENT, penFill: "#F5C9BF" })} />
      ))}
      {gnist(strek, [
        [306, 84, 5],
        [226, 90, 4],
      ])}
    </Ramme>
  );
}

/** Veneers: a smile with thin new shells on the four front teeth, and a seashell beside it. */
export function Skjell({ strek = true, className, forsink }: Stil) {
  const ribber = Array.from({ length: 7 }, (_, i) => {
    const a = Math.PI + ((i + 1) / 8) * Math.PI;
    return `M60,198 L${r2(60 + Math.cos(a) * 40)},${r2(198 + Math.sin(a) * 40)}`;
  }).join(" ");
  return (
    <Ramme className={className} forsink={forsink} boks={BOKS}>
      {SMIL_X.map((x, i) => {
        const skall = i > 0 && i < 5;
        return <OverFortann key={x} strek={strek} x={x} y={58} k={SMIL_K[i]} ink={skall ? F.teal : BLEKK} fyll={skall ? KRONE_FYLL : F.papir} />;
      })}
      {smilGomme(strek)}
      <path d="M60,198 L16,192 A44,44 0 0 1 104,192 Z" {...form(strek, "#F6D9C8", { w: 2.2, ink: "#C98C6E", penFill: "#FBEAE0" })} />
      <path d={ribber} {...linje(strek, "#C98C6E", 1.4, "#C98C6E")} />
      <path d="M50,198 L46,208 L74,208 L70,198" {...form(strek, "#F6D9C8", { w: 2, ink: "#C98C6E", penFill: "#FBEAE0" })} />
      {gnist(strek, [
        [292, 126, 8],
        [250, 170, 6],
        [180, 176, 4],
      ])}
    </Ramme>
  );
}

/** An implant among the teeth: the jaw cut through, a natural tooth either side, and the new tooth on its screw in the middle. */
export function ImplantatTittel({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks={BOKS}>
      <path d="M10,120 Q160,110 310,120 L310,220 L10,220 Z" fill={F.ben} fillOpacity={0.6} {...blekk(strek)} />
      {[
        [40, 170],
        [110, 200],
        [214, 196],
        [282, 168],
        [128, 150],
        [198, 146],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={3} fill={F.benStrek} {...blekk(strek)} />
      ))}
      {[70, 250].map((x) => (
        <g key={x} transform={`translate(${x} 122) scale(0.62)`}>
          <path d={JEKSEL.tann} {...form(strek, F.hvit, { w: 2.4 / 0.62, penFill: F.papir })} />
          <path d={JEKSEL.fure} {...linje(strek, F.fure, 1.8 / 0.62)} />
        </g>
      ))}
      <g transform="translate(160 124) scale(1.8)">
        <path d="M-8,0 L8,0 L6,40 Q0,48 -6,40 Z" {...form(strek, F.metall, { w: 2.2 / 1.8 })} />
        <path d="M-8,8 L8,4 M-8,16 L8,12 M-7,24 L7,20 M-6,32 L6,28" {...linje(strek, F.metallMork, 1.4 / 1.8)} />
      </g>
      <path d="M150,124 L152,108 L168,108 L170,124 Z" {...form(strek, F.metall, { w: 2 })} />
      <g transform="translate(160 112) scale(0.62)">
        <path d={JEKSEL.krone} {...form(strek, KRONE_FYLL, { w: 2.4 / 0.62, ink: F.teal, penFill: KRONE_FYLL })} />
        <path d={JEKSEL.fure} {...linje(strek, F.fure, 1.8 / 0.62)} />
      </g>
      <path d="M10,116 Q70,104 120,118 Q160,124 200,118 Q250,104 310,116" {...linje(strek, F.tannkjottMork, 2.4, F.tannkjottMork)} />
      {gnist(strek, [
        [204, 36, 7],
        [118, 40, 5],
      ])}
    </Ramme>
  );
}

/** A full denture from the front, upper and lower, a little apart, shining. */
export function Gebiss({ strek = true, className, forsink }: Stil) {
  const over = [72, 102, 132, 160, 188, 218, 248];
  const ok = [86, 112, 138, 160, 182, 208, 234];
  return (
    <Ramme className={className} forsink={forsink} boks={BOKS}>
      {over.map((x, i) => (
        <OverFortann key={x} strek={strek} x={x} y={66} k={i === 2 || i === 4 ? 0.5 : i === 3 ? 0.46 : 0.42} />
      ))}
      <path d="M40,40 Q160,14 280,40 L280,72 Q160,58 40,72 Z" {...form(strek, "#EBB5AB", { w: 2.2, ink: F.tannkjottMork, penFill: "#F7DFDA" })} />
      {ok.map((x) => (
        <Fortann key={x} strek={strek} x={x} y={162} k={0.4} />
      ))}
      <path d="M56,192 Q160,214 264,192 L264,158 Q160,172 56,158 Z" {...form(strek, "#EBB5AB", { w: 2.2, ink: F.tannkjottMork, penFill: "#F7DFDA" })} />
      {gnist(strek, [
        [292, 96, 8],
        [30, 128, 6],
        [276, 186, 5],
      ])}
    </Ramme>
  );
}
