import { FARGE as F, JEKSEL } from "@/components/forside/behandlinger/popup/tegning";
import { BLEKK, Ramme, blekk, form, linje, type Stil } from "@/components/artikler/tegninger";

/* More small pen drawings for the treatment pages, 120 × 120, in the same
   pen as ruter.tsx: a bridge, a veneer, a full denture, a night guard, a
   tooth kept in milk, sugar-free gum, and teeth grinding at night. */

/** A molar crown (no roots) at panel size. */
function Krone({ strek = true, x = 60, y = 80, k = 0.3, ink = BLEKK, fyll = F.papir }: { strek?: boolean; x?: number; y?: number; k?: number; ink?: string; fyll?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`}>
      <path d={JEKSEL.krone} {...form(strek, F.hvit, { w: 2.4 / k, ink, penFill: fyll })} />
      <path d={JEKSEL.fure} {...linje(strek, F.fure, 1.8 / k)} />
    </g>
  );
}

/** The moon: at night. */
const mane = (strek?: boolean) => <path d="M98,10 a11,11 0 1 0 8,19 a8,8 0 1 1 -8,-19 Z" {...form(strek, "#F1D58A", { w: 1.6 })} />;

/** A bridge: a new tooth hung between crowns on the two teeth beside the gap. */
export function Bro({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M4,84 Q60,74 116,84 L116,116 L4,116 Z" fill={F.tannkjott} fillOpacity={0.45} {...blekk(strek)} />
      <path d="M30,72 L90,72" {...linje(strek, F.teal, 6, F.teal)} />
      <Krone strek={strek} x={26} y={86} k={0.28} ink={F.teal} fyll="#F4FAFB" />
      <Krone strek={strek} x={60} y={82} k={0.26} ink={F.teal} fyll="#F4FAFB" />
      <Krone strek={strek} x={94} y={86} k={0.28} ink={F.teal} fyll="#F4FAFB" />
    </Ramme>
  );
}

/** A front tooth seen from the side (its front to the left). `skall`: the thin
    veneer on its front; else the thin layer to come off, dashed. */
const FORTANN_SIDE = "M46,86 C42,62 44,36 54,14 C56,12 59,12 60,15 C64,32 72,52 78,64 C82,72 80,80 76,86 C74,100 66,110 60,114 C54,110 48,100 46,86 Z";

export function Fasett({ skall = true, strek = true, className, forsink }: Stil & { skall?: boolean }) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d={FORTANN_SIDE} {...form(strek, F.hvit, { w: 2.4, penFill: F.papir })} />
      <path d="M4,86 Q60,78 116,86 L116,116 L4,116 Z" fill={F.tannkjott} fillOpacity={0.45} {...blekk(strek)} />
      {skall ? (
        <path d="M45,88 C39,62 41,34 52,10 C54,7 59,7 61,11 L59,15 C49,36 47,62 51,86 Z" {...form(strek, "#F4FAFB", { w: 2.4, ink: F.teal, penFill: "#E3F2F5" })} />
      ) : (
        <path d="M51,83 C48,62 49,38 58,19" fill="none" stroke={F.metallMork} strokeWidth={2.2} strokeLinecap="round" strokeDasharray="5 5" {...blekk(strek)} />
      )}
      {skall && <path d="M84,26 l8,-6 M88,40 l10,-1 M78,16 l3,-9" {...linje(strek, F.teal, 2.2, F.teal)} />}
    </Ramme>
  );
}

/** A full denture: a gum-coloured arch with a row of teeth along it. */
export function Protese({ strek = true, className, forsink }: Stil) {
  const tenner = [0.06, 0.18, 0.3, 0.42, 0.58, 0.7, 0.82, 0.94];
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M14,36 Q14,104 60,104 Q106,104 106,36 L90,36 Q90,86 60,86 Q30,86 30,36 Z" {...form(strek, "#EBB5AB", { w: 2.2, ink: F.tannkjottMork, penFill: "#F7DFDA" })} />
      {tenner.map((t) => {
        const a = Math.PI * (1 - t);
        const x = Math.round((60 + Math.cos(a) * 38) * 10) / 10;
        const y = Math.round((44 + Math.sin(a) * 50) * 10) / 10;
        const vri = Math.round((Math.atan2(50 * Math.cos(a), -38 * Math.sin(a)) * 180) / Math.PI);
        return <rect key={t} x={x - 7} y={y - 5.5} width={14} height={11} rx={4} transform={`rotate(${vri} ${x} ${y})`} {...form(strek, F.hvit, { w: 1.8, penFill: F.papir })} />;
      })}
    </Ramme>
  );
}

/** A night guard: a clear splint over the teeth, for the night. */
export function Bittskinne({ strek = true, className, forsink }: Stil) {
  // Where the teeth sit, along the middle of the band.
  const tenner = [0.2, 0.5, 0.8].flatMap((t) => {
    const x = Math.round(((1 - t) ** 2 * 19 + 2 * (1 - t) * t * 19 + t * t * 60) * 10) / 10;
    const y = Math.round(((1 - t) ** 2 * 46 + 2 * (1 - t) * t * 102 + t * t * 102) * 10) / 10;
    return [[x, y], [120 - x, y]];
  });
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      {mane(strek)}
      <path d="M8,46 Q8,112 60,112 Q112,112 112,46 L90,46 Q90,92 60,92 Q30,92 30,46 Z" {...form(strek, "#DDEFF2", { w: 2.2, ink: F.teal, penFill: "#E8F4F6" })} />
      {tenner.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={4.5} {...form(strek, F.hvit, { w: 1.4, ink: F.metallMork, penFill: "#FFFFFF" })} />
      ))}
    </Ramme>
  );
}

/** Teeth pressed and ground together in the night. */
export function Gnissing({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      {mane(strek)}
      <g transform="translate(58 29) rotate(180) scale(0.34)">
        <path d={JEKSEL.krone} {...form(strek, F.hvit, { w: 2.4 / 0.34, penFill: F.papir })} />
        <path d={JEKSEL.fure} {...linje(strek, F.fure, 1.8 / 0.34)} />
      </g>
      <Krone strek={strek} x={58} y={100} k={0.34} />
      <path d="M14,54 l8,4 l-8,4 l8,4 l-8,4 M102,54 l-8,4 l8,4 l-8,4 l8,4" {...linje(strek, F.smerte, 2.2, F.smerte)} />
    </Ramme>
  );
}

/** A knocked-out tooth kept moist in a glass of milk. */
export function Melk({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M32,18 L88,18 L82,44 L38,44 Z" fill="#E4EFF2" fillOpacity={0.7} {...blekk(strek)} />
      <path d="M38,44 L82,44 L78,100 Q77,106 71,106 L49,106 Q43,106 42,100 Z" fill="#FFFFFF" fillOpacity={0.95} {...blekk(strek)} />
      <path d="M32,18 L88,18 L78,100 Q77,106 71,106 L49,106 Q43,106 42,100 Z" {...form(strek, "none", { w: 2.2 })} />
      <path d="M38,44 L82,44" {...linje(strek, F.metallMork, 1.6)} />
      <g transform="translate(60 80) rotate(-18) scale(0.22)">
        <path d={JEKSEL.tann} {...form(strek, F.hvit, { w: 9, penFill: F.papir })} />
      </g>
    </Ramme>
  );
}

/** Sugar-free gum or lozenges, to get the saliva going. */
export function Tyggis({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <rect x={16} y={52} width={48} height={22} rx={10} {...form(strek, "#DCEFD2", { w: 2.2, penFill: "#EEF7E9" })} />
      <rect x={56} y={34} width={48} height={22} rx={10} transform="rotate(14 80 45)" {...form(strek, "#DCEFD2", { w: 2.2, penFill: "#EEF7E9" })} />
      {[[40, 82], [62, 90]].map(([x, y]) => (
        <path key={x} d={`M${x},${y} C${x - 4},${y + 6} ${x - 6},${y + 9} ${x - 6},${y + 12} A6,6 0 0 0 ${x + 6},${y + 12} C${x + 6},${y + 9} ${x + 4},${y + 6} ${x},${y} Z`} {...form(strek, "#BFE0E6", { w: 2, ink: F.teal, penFill: "#E3F2F5" })} />
      ))}
    </Ramme>
  );
}
