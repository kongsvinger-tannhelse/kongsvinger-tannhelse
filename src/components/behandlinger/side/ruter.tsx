import { FARGE as F, JEKSEL, PULPA, STUBB, lauv, stjerne } from "@/components/forside/behandlinger/popup/tegning";
import { AKSENT, BLEKK, Ramme, blekk, form, linje, type Stil } from "@/components/artikler/tegninger";

/* Small pen drawings for the treatment pages' comic panels and margins,
   120 × 120, in the articles' pen: ink lines that draw themselves, colour
   that fades in after. Server-safe. */

/** A molar at panel size: its crown top near y 28, its roots near y 106. */
function Liten({ strek = true, rotter = true, y = 72, k = 0.42, ink = BLEKK, fyll = F.papir }: { strek?: boolean; rotter?: boolean; y?: number; k?: number; ink?: string; fyll?: string }) {
  return (
    <g transform={`translate(60 ${y}) scale(${k})`}>
      <path d={rotter ? JEKSEL.tann : JEKSEL.krone} {...form(strek, F.hvit, { w: 2.4 / k, ink, penFill: fyll })} />
      <path d={JEKSEL.fure} {...linje(strek, F.fure, 1.8 / k)} />
    </g>
  );
}

/** The gum along the bottom of a panel. */
export function Gomme({ strek = true, y = 92 }: { strek?: boolean; y?: number }) {
  return <path d={`M8,${y} Q34,${y - 10} 60,${y - 2} Q86,${y - 10} 112,${y}`} {...linje(strek, F.tannkjottMork, 2.2, F.tannkjottMork)} />;
}

/* ── A check-up ── */

/** Looking closely: a magnifier over a tooth. */
export function Lupe({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Liten strek={strek} rotter={false} y={88} />
      <Gomme strek={strek} y={98} />
      <circle cx={70} cy={40} r={20} {...form(strek, "#E1EFF1", { w: 2.4, penFill: "#EEF7F8" })} />
      <path d="M84,54 L104,76" {...linje(strek, BLEKK, 5)} />
      <path d="M62,32 q6,-5 13,-2" {...linje(strek, F.hvit, 2, F.teal)} />
    </Ramme>
  );
}

/** A note with ticks: what we found, and the plan. */
export function Plan({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <rect x={28} y={16} width={64} height={88} rx={6} {...form(strek, F.hvit, { w: 2.2, penFill: F.papir })} />
      <rect x={46} y={10} width={28} height={12} rx={4} {...form(strek, F.teal, { w: 2 })} />
      {[40, 60, 80].map((y, i) => (
        <g key={y}>
          <path d={`M38,${y} l4,4 l8,-9`} {...linje(strek, F.teal, 2.4, F.teal)} />
          <path d={`M56,${y} L${i === 1 ? 74 : 82},${y}`} {...linje(strek, F.metallMork, 2)} />
        </g>
      ))}
    </Ramme>
  );
}

/* ── Cleaning ── */

/** A small puff of bad breath. */
export function Ande({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M30,96 q10,-12 0,-24 q-10,-12 0,-24 M52,102 q10,-12 0,-24 q-10,-12 0,-24 M74,96 q10,-12 0,-24 q-10,-12 0,-24" {...linje(strek, F.bjork, 2.6, "#7E9160")} />
      <path d={lauv(84, 30, 16, 11, 4, 8)} {...form(strek, "#E6EDD8", { w: 2, ink: "#7E9160", penFill: "#F0F4E8" })} />
    </Ramme>
  );
}

/** A fine hand instrument lifting tartar off the tooth. */
export function Skrape({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Liten strek={strek} rotter={false} y={90} />
      <Gomme strek={strek} y={100} />
      <path d={lauv(66, 92, 9, 4, 3, 7)} fill="#D8C27A" {...blekk(strek)} />
      <path d="M108,30 L96,62 Q92,76 82,88 L74,92" {...linje(strek, F.metallMork, 3)} />
      <path d="M104,8 L116,12 L110,40 L98,36 Z" {...form(strek, F.teal, { w: 2 })} />
      <path d="M54,82 l-7,-4 M58,74 l-3,-8" {...linje(strek, F.rav, 2, F.rav)} />
    </Ramme>
  );
}

/* ── Fillings ── */

/** A tooth with a white and a brown spot: the start of a hole. */
export function Flekk({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Liten strek={strek} rotter={false} y={88} />
      <Gomme strek={strek} y={98} />
      <path d={lauv(48, 58, 7, 5, 9, 8)} fill="#FFFFFF" stroke={F.metallMork} strokeWidth={1.4} {...blekk(strek)} />
      <path d={lauv(70, 66, 6, 4, 5, 8)} fill="#B08A63" {...blekk(strek)} />
    </Ramme>
  );
}

/** The drill above the hole. */
export function Bor({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Liten strek={strek} rotter={false} y={94} />
      <Gomme strek={strek} y={104} />
      <path d={lauv(58, 58, 8, 5, 7, 8)} fill={F.hull} {...blekk(strek)} />
      <path d="M58,48 L58,30" {...linje(strek, F.metallMork, 3)} />
      <rect x={50} y={8} width={16} height={22} rx={5} {...form(strek, F.teal, { w: 2 })} />
      <path d="M40,40 q-6,-6 -2,-14 M78,40 q6,-6 2,-14" {...linje(strek, F.teal, 2, F.teal)} />
    </Ramme>
  );
}

/** A deep hole with a thin protective layer over the nerve, before the filling. */
export function Underlag({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Liten strek={strek} />
      <g transform="translate(60 72) scale(0.42)">
        <path d={PULPA} fill="#F1B9AE" fillOpacity={0.8} {...blekk(strek)} />
        <path d="M-22,-96 C-12,-102 12,-102 22,-96 L16,-52 L-16,-52 Z" fill={F.papir} stroke={BLEKK} strokeWidth={4} {...blekk(strek)} />
        <path d="M-16,-52 L16,-52" stroke={F.teal} strokeWidth={9} strokeLinecap="round" {...blekk(strek)} />
      </g>
    </Ramme>
  );
}

/** The tooth-coloured filling in place. */
export function Fylt({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Liten strek={strek} rotter={false} y={92} />
      <Gomme strek={strek} y={102} />
      <path d={lauv(58, 60, 11, 7, 7, 9)} fill={F.fylling} stroke={F.teal} strokeWidth={2} {...blekk(strek)} />
      <path d="M86,36 l6,-7 M92,48 l9,-2 M76,28 l2,-9" {...linje(strek, F.teal, 2.2, F.teal)} />
    </Ramme>
  );
}

/** The curing light: a blue cone over the filling, hardening it. */
export function Lampe({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Liten strek={strek} rotter={false} y={98} />
      <Gomme strek={strek} y={108} />
      <path d="M58,42 L40,68 L80,68 Z" fill="#7FB8E8" fillOpacity={0.4} {...blekk(strek)} />
      <path d="M58,42 L40,68 M62,42 L80,68" {...linje(strek, "#4A90D0", 1.6, "#4A90D0")} />
      <path d="M104,12 L66,32 Q58,36 58,42 L66,44 Q70,38 108,20 Z" {...form(strek, F.hvit, { w: 2.2, penFill: F.papir })} />
    </Ramme>
  );
}

/* ── Wisdom teeth ── */

/** A wisdom tooth, tipped over against the tooth in front of it. */
export function Visdom({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M4,72 Q60,60 116,72 L116,116 L4,116 Z" fill={F.ben} fillOpacity={0.6} {...blekk(strek)} />
      <g transform="translate(-14 0)">
        <Liten strek={strek} y={78} k={0.32} />
      </g>
      <g transform="translate(78 92) rotate(36) scale(0.3)">
        <path d={JEKSEL.tann} {...form(strek, F.hvit, { w: 7.5, ink: AKSENT, penFill: "#FBEDE8" })} />
      </g>
      <path d="M66,40 l-4,-8 M76,42 l4,-8" {...linje(strek, F.smerte, 2.2, AKSENT)} />
    </Ramme>
  );
}

/** The tooth lifted out of the gum. */
export function Trekk({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M8,94 Q34,84 60,92 Q86,84 112,94 L112,116 L8,116 Z" fill={F.tannkjott} fillOpacity={0.5} {...blekk(strek)} />
      <Gomme strek={strek} y={94} />
      <Liten strek={strek} y={50} k={0.34} />
      <path d="M100,74 L100,34 M92,42 L100,34 L108,42" {...linje(strek, F.teal, 2.4, F.teal)} />
    </Ramme>
  );
}

/** A couple of stitches in the gum. */
export function Sting({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M8,62 Q34,50 60,58 Q86,50 112,62 L112,106 L8,106 Z" {...form(strek, F.tannkjott, { w: 2.2, ink: F.tannkjottMork, penFill: "#FBE7E3" })} />
      <path d="M28,72 Q60,80 92,72" {...linje(strek, F.tannkjottMork, 2)} />
      {[40, 60, 80].map((x) => (
        <path key={x} d={`M${x - 6},64 L${x + 6},82 M${x + 6},64 L${x - 6},82`} {...linje(strek, BLEKK, 2.2)} />
      ))}
    </Ramme>
  );
}

/** A folded piece of gauze to bite on. */
export function Kompress({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M20,46 L84,30 L102,72 L38,90 Z" {...form(strek, F.hvit, { w: 2.2, penFill: F.papir })} />
      <path d="M32,54 L90,40 M38,66 L94,52 M44,78 L98,64 M40,42 L56,84 M60,36 L74,80 M78,32 L92,76" {...linje(strek, F.metall, 1.2, F.metallMork)} />
    </Ramme>
  );
}

/* ── Implants ── */

/** The implant: a screw in the jaw bone, growing in, and at last a crown on it. */
export function Implantat({ trinn, strek = true, className, forsink }: Stil & { trinn: "skrue" | "gror" | "krone" }) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M4,58 Q60,48 116,58 L116,118 L4,118 Z" fill={F.ben} fillOpacity={0.65} {...blekk(strek)} />
      <path d="M4,58 Q60,48 116,58" {...linje(strek, F.tannkjottMork, 2.2, F.tannkjottMork)} />
      <path d="M52,56 L68,56 L66,100 Q60,108 54,100 Z" {...form(strek, F.metall, { w: 2.2 })} />
      <path d="M52,66 L68,62 M52,76 L68,72 M53,86 L67,82 M54,96 L66,92" {...linje(strek, F.metallMork, 1.6)} />
      {trinn === "gror" && (
        <g {...blekk(strek)}>
          {[
            [44, 72],
            [76, 80],
            [46, 92],
            [74, 98],
            [42, 82],
            [78, 68],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={2.4} fill={F.benStrek} />
          ))}
          <path d="M92,14 a12,12 0 1 0 8,20 a9,9 0 1 1 -8,-20 Z" fill="#F1D58A" stroke={BLEKK} strokeWidth={1.6} />
        </g>
      )}
      {trinn === "krone" && <Liten strek={strek} rotter={false} y={54} k={0.4} ink={F.teal} fyll="#F4FAFB" />}
    </Ramme>
  );
}

/** A gap where a tooth is missing, between two others. */
export function Mangler({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M4,80 Q60,70 116,80 L116,116 L4,116 Z" fill={F.tannkjott} fillOpacity={0.45} {...blekk(strek)} />
      <g transform="translate(-38 0)">
        <Liten strek={strek} rotter={false} y={82} k={0.3} />
      </g>
      <g transform="translate(38 0)">
        <Liten strek={strek} rotter={false} y={82} k={0.3} />
      </g>
      <path d="M48,70 Q60,52 72,70" {...linje(strek, F.metallMork, 2)} />
      <path d="M56,42 q4,-8 8,0" {...linje(strek, F.teal, 2, F.teal)} />
    </Ramme>
  );
}

/** An impression tray, full of soft material. */
export function Avtrykk({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M22,36 Q22,92 60,92 Q98,92 98,36 L84,36 Q84,76 60,76 Q36,76 36,36 Z" {...form(strek, "#E9C7D8", { w: 2.2, penFill: "#F6E6EE" })} />
      <path d="M30,40 Q30,84 60,84 Q90,84 90,40" {...linje(strek, "#C38FA9", 1.6, "#C38FA9")} />
      <path d="M60,92 L60,110" {...linje(strek, F.metallMork, 4)} />
    </Ramme>
  );
}

/* ── Crowns ── */

/** The tooth ground down to a small stump, ready for its crown. */
export function Stubb({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <g transform="translate(60 72) scale(0.42)">
        <path d={STUBB.tann} {...form(strek, F.hvit, { w: 5.6, penFill: F.papir })} />
        <path d={JEKSEL.krone} fill="none" stroke={F.metallMork} strokeWidth={3} strokeDasharray="8 8" {...blekk(strek)} />
      </g>
    </Ramme>
  );
}

/** The new crown set over the stump, for good. */
export function KroneSatt({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <g transform="translate(60 72) scale(0.42)">
        <path d={STUBB.tann} {...form(strek, F.hvit, { w: 5.6, penFill: F.papir })} />
        <path d={JEKSEL.krone} {...form(strek, "#F4FAFB", { w: 5.6, ink: F.teal, penFill: "#F4FAFB" })} />
        <path d={JEKSEL.fure} {...linje(strek, F.fure, 4)} />
      </g>
      <path d="M90,30 l7,-7 M96,44 l10,-2 M84,20 l2,-9" {...linje(strek, F.teal, 2.2, F.teal)} />
    </Ramme>
  );
}

/** A grey temporary crown on the stump, while the real one is made. */
export function Provisorium({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <g transform="translate(60 72) scale(0.42)">
        <path d={STUBB.tann} {...form(strek, F.hvit, { w: 5.6, penFill: F.papir })} />
        <path d={JEKSEL.krone} {...form(strek, F.metall, { w: 5.6, ink: F.metallMork, penFill: "#EEF1F1" })} />
      </g>
    </Ramme>
  );
}

/** A row of shade tabs, to find the colour of the new tooth. */
export function Farge({ strek = true, className, forsink }: Stil) {
  const nyanser = ["#FFFDF6", "#FBF3DE", "#F5E8C8", "#EEDDB4"];
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M14,30 L106,30" {...linje(strek, F.metallMork, 3)} />
      {nyanser.map((f, i) => (
        <path key={f} d={`M${20 + i * 22},34 L${36 + i * 22},34 L${34 + i * 22},90 Q${28 + i * 22},98 ${22 + i * 22},90 Z`} {...form(strek, f, { w: 2, penFill: f })} />
      ))}
    </Ramme>
  );
}

/* ── Bleaching ── */

/** The thin, clear bleaching tray made to fit your teeth. */
export function Skinne({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M18,30 Q18,96 60,96 Q102,96 102,30" fill="none" stroke="#9FD3DD" strokeWidth={16} strokeLinecap="round" fillOpacity={0.5} {...blekk(strek)} />
      <path d="M10,30 Q10,104 60,104 Q110,104 110,30 M26,30 Q26,88 60,88 Q94,88 94,30" {...linje(strek, F.teal, 2, F.teal)} />
      {[0.15, 0.32, 0.5, 0.68, 0.85].map((t) => {
        const a = Math.PI * (1 - t);
        const x = Math.round((60 + Math.cos(a) * 42) * 10) / 10;
        const y = Math.round((40 + Math.sin(a) * 56) * 10) / 10;
        return <circle key={t} cx={x} cy={y} r={2.2} fill={F.hvit} stroke={F.metallMork} strokeWidth={1} {...blekk(strek)} />;
      })}
    </Ramme>
  );
}

/** Whiter: a bright tooth with small stars. */
export function Hvit({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <Liten strek={strek} rotter={false} y={92} />
      <Gomme strek={strek} y={102} />
      <path d={`${stjerne(28, 34, 8)} ${stjerne(94, 28, 6)} ${stjerne(88, 58, 4.5)}`} {...form(strek, "#F1D58A", { w: 1.6, ink: F.teal })} />
    </Ramme>
  );
}
