"use client";

import { Vis } from "@/components/artikler/deler";
import { AKSENT, BLEKK, Ramme, blekk, form, linje, type Stil } from "@/components/artikler/tegninger";
import { FARGE as F, stjerne } from "@/components/forside/behandlinger/popup/tegning";

/* What the clinic stands for, in three lines under the three of them, each
   with a small pen sketch that draws itself when it is seen: the mirror of
   the trade, the receipt Helfo settles, and the patient at heart. The
   drawings come from the Råd og tips kit (120 × 120, one ink, one accent). */

/** A dental mirror, catching the light, with a tooth in its glass. */
function Speil({ strek, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <circle cx={74} cy={44} r={16} fill={F.kulde} fillOpacity={0.45} {...blekk(strek)} />
      <circle cx={74} cy={44} r={22} {...form(strek, F.hvit, { w: 2.4 })} />
      <path d="M66,41 Q66,35 70,35 Q74,37 78,35 Q82,35 82,41 Q82,47 79.5,53 Q77.5,55 76.5,50 Q74,46 71.5,50 Q70.5,55 68.5,53 Q66,47 66,41 Z" {...form(strek, F.hvit, { w: 1.8, penFill: F.hvit })} />
      <g transform="rotate(40 59 60)">
        <rect x={55} y={60} width={8} height={50} rx={4} {...form(strek, F.metallMork, { w: 2.2 })} />
      </g>
      <path d={stjerne(102, 18, 8)} fill={F.teal} {...blekk(strek)} />
    </Ramme>
  );
}

/** A receipt, settled: its lines, and a tick in a circle. */
function Kvittering({ strek, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M32,14 L84,14 L84,102 L78,97 L72,102 L66,97 L60,102 L54,97 L48,102 L42,97 L36,102 L32,98 Z" {...form(strek, F.hvit, { w: 2.2, penFill: F.papir })} />
      <path d="M42,32 L74,32 M42,44 L68,44 M42,56 L72,56" {...linje(strek, F.metallMork, 2.2)} />
      <circle cx={72} cy={80} r={14} fill={F.teal} fillOpacity={0.25} {...blekk(strek)} />
      <circle cx={72} cy={80} r={14} {...form(strek, "none", { w: 2.2, ink: F.teal })} />
      <path d="M65,80 L70,85 L79,74" {...linje(strek, F.teal, 3, F.teal)} />
    </Ramme>
  );
}

/** A heart, with a little warmth round it. */
function Hjerte({ strek, className, forsink }: Stil) {
  const hjerte = "M60,100 C28,80 16,62 20,45 C24,28 46,22 60,40 C74,22 96,28 100,45 C104,62 92,80 60,100 Z";
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d={hjerte} fill={AKSENT} fillOpacity={0.22} {...blekk(strek)} />
      <path d={hjerte} {...form(strek, AKSENT, { w: 2.4 })} />
      <path d="M18,22 L24,28 M60,8 L60,16 M102,22 L96,28" {...linje(strek, BLEKK, 2.2, AKSENT)} />
    </Ramme>
  );
}

const PUNKTER = [
  { tittel: "Erfarne tannleger", Tegning: Speil },
  { tittel: "Direkte oppgjør med Helfo", Tegning: Kvittering },
  { tittel: "Alltid pasienten i fokus", Tegning: Hjerte },
];

export function Punkter({ className }: { className?: string }) {
  return (
    <ul className={className}>
      {PUNKTER.map(({ tittel, Tegning }, i) => (
        <Vis as="li" key={tittel} className="flex flex-col items-center text-center">
          <Tegning strek className="w-16 sm:w-20 md:w-24" forsink={i * 0.2} />
          <p className="mt-3 text-[15px] font-bold leading-[1.25] tracking-[-0.01em] text-[var(--color-glomma-deep)] sm:text-[17px] md:text-[19px]">{tittel}</p>
        </Vis>
      ))}
    </ul>
  );
}
