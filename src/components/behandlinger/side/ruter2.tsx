import { FARGE as F, FORTANN, JEKSEL } from "@/components/forside/behandlinger/popup/tegning";
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
      <path d="M4,84 Q60,74 116,84 L116,116 L4,116 Z" fill={F.tannkjott} opacity={0.45} {...blekk(strek)} />
      <path d="M30,60 L90,60" {...linje(strek, F.teal, 5, F.teal)} />
      <Krone strek={strek} x={26} y={86} k={0.28} ink={F.teal} fyll="#F4FAFB" />
      <Krone strek={strek} x={60} y={82} k={0.26} ink={F.teal} fyll="#F4FAFB" />
      <Krone strek={strek} x={94} y={86} k={0.28} ink={F.teal} fyll="#F4FAFB" />
    </Ramme>
  );
}

/** A front tooth, with a thin shell on its front. `skall`: the veneer on; else the thin layer to come off, dashed. */
export function Fasett({ skall = true, strek = true, className, forsink }: Stil & { skall?: boolean }) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M8,82 Q34,72 60,80 Q86,72 112,82" {...linje(strek, F.tannkjottMork, 2.2, F.tannkjottMork)} />
      <g transform="translate(60 92) scale(0.66)">
        <path d={FORTANN.krone} {...form(strek, F.hvit, { w: 3.6, penFill: F.papir })} />
        {skall ? (
          <path d="M-24,-8 C-28,-28 -32,-54 -31,-78 C-31,-90 -28,-98 -17,-99 L17,-99 C28,-98 31,-90 31,-78 C32,-54 28,-28 24,-8" {...form(strek, "#F4FAFB", { w: 3.6, ink: F.teal, penFill: "#EEF7F8" })} />
        ) : (
          <path d="M-18,-10 C-22,-30 -26,-54 -25,-76 C-25,-86 -22,-91 -14,-92 L14,-92 C22,-91 25,-86 25,-76 C26,-54 22,-30 18,-10" fill="none" stroke={F.metallMork} strokeWidth={3} strokeDasharray="7 7" {...blekk(strek)} />
        )}
      </g>
      {skall && <path d="M92,24 l7,-7 M98,38 l10,-2 M86,14 l2,-9" {...linje(strek, F.teal, 2.2, F.teal)} />}
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
        return <circle key={t} cx={x} cy={y} r={6} {...form(strek, F.hvit, { w: 1.8, penFill: F.papir })} />;
      })}
    </Ramme>
  );
}

/** A night guard: a clear splint over the teeth, for the night. */
export function Bittskinne({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      {mane(strek)}
      <path d="M16,40 Q16,104 60,104 Q104,104 104,40" fill="none" stroke="#BFE0E6" strokeWidth={18} strokeLinecap="round" opacity={0.55} {...blekk(strek)} />
      <path d="M6,40 Q6,114 60,114 Q114,114 114,40 M26,40 Q26,94 60,94 Q94,94 94,40" {...linje(strek, F.teal, 2, F.teal)} />
    </Ramme>
  );
}

/** Teeth pressed and ground together in the night. */
export function Gnissing({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      {mane(strek)}
      <g transform="translate(56 54) rotate(180) scale(0.3)">
        <path d={JEKSEL.krone} {...form(strek, F.hvit, { w: 8, penFill: F.papir })} />
      </g>
      <Krone strek={strek} x={56} y={96} k={0.3} />
      <path d="M26,64 l6,-4 l6,4 l6,-4 l6,4 l6,-4 l6,4 l6,-4 l6,4 l6,-4 l6,4" {...linje(strek, F.smerte, 2, F.smerte)} />
    </Ramme>
  );
}

/** A knocked-out tooth kept moist in a glass of milk. */
export function Melk({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M38,44 L82,44 L78,100 Q77,106 71,106 L49,106 Q43,106 42,100 Z" fill="#FFFFFF" opacity={0.95} {...blekk(strek)} />
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
      <path d="M36,86 q6,8 12,0 M58,90 q6,8 12,0" {...linje(strek, F.teal, 2.2, F.teal)} />
    </Ramme>
  );
}
