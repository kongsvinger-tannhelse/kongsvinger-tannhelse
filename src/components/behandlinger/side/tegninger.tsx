import type { CSSProperties } from "react";
import { FARGE as F, JEKSEL, PULPA, draape, lauv } from "@/components/forside/behandlinger/popup/tegning";
import { AKSENT, BLEKK, Jeksel, Ramme, STEIN, TEGNINGER, blekk, form, linje, type Stil } from "@/components/artikler/tegninger";
import type { TegningId } from "@/data/artikler/typer";
import type { BTegning } from "@/data/behandlinger/typer";
import s from "@/components/artikler/artikler.module.css";
import m from "./side.module.css";
import { Ande, Avtrykk, Bor, Farge, Flekk, Fylt, Hvit, Implantat, Kompress, KroneSatt, Lampe, Lupe, Mangler, Plan, Provisorium, Skinne, Skrape, Sting, Stubb, Trekk, Underlag, Visdom } from "./ruter";
import { Bittskinne, Bro, Fasett, Gnissing, Melk, Protese, Tyggis } from "./ruter2";

/* The treatment pages' own drawings, in the articles' pen: a molar cut
   open to show the nerve, in every stage of the treatment, and the small
   things around it (the x-ray, the rubber sheet). Server-safe. */

export type Tilstand = "frisk" | "syk" | "renses" | "medisin" | "fylt" | "krone";

/** The hole the dentist opens in the top of the tooth, to reach the canals. */
const TILGANG = "M-12,-93 C-6,-97 6,-97 12,-93 L8,-60 L-8,-60 Z";
/** A crown, a little bigger than the tooth's own, set over it. */
const KRONE = "M-55,-4 C-59,-40 -55,-84 -41,-101 C-32,-112 -19,-110 -12,-97 C-6,-105 6,-105 12,-97 C19,-110 32,-112 41,-101 C55,-84 59,-40 55,-4 Q0,6 -55,-4 Z";

const lag = (pa: boolean): { className: string; style: CSSProperties } => ({ className: m.lag, style: { opacity: pa ? 1 : 0 } });

/**
 * A molar cut open, in the jaw, in one stage of a root filling: healthy,
 * with a sick nerve, cleaned, with medicine and a temporary lid, filled, or
 * with a crown. Every stage is drawn, and only the one asked for shows, so
 * a change of `tilstand` fades from one to the next.
 */
export function RotTann({ tilstand, strek = true, className, forsink, tittel }: Stil & { tilstand: Tilstand; tittel?: string }) {
  const er = (...t: Tilstand[]) => t.includes(tilstand);
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 240 300" tittel={tittel}>
      <g transform="translate(120 188)">
        {/* the jaw round the roots, and the gum along it */}
        <path d="M-96,-2 Q-60,-16 -46,-14 Q0,8 46,-14 Q60,-16 96,-2 L96,104 L-96,104 Z" fill={F.ben} opacity={0.55} {...blekk(strek)} />
        <path d="M-96,-2 Q-60,-16 -46,-14 Q0,8 46,-14 Q60,-16 96,-2" {...linje(strek, F.tannkjottMork, 2.2, F.tannkjottMork)} />

        <Jeksel strek={strek} />

        {/* healthy: a soft pink nerve */}
        <path d={PULPA} fill="#F1B9AE" opacity={0.85} {...lag(er("frisk"))} />

        {/* sick: the nerve red, throbbing, and a bump at the root's tip */}
        <g {...lag(er("syk"))}>
          <path d={PULPA} fill={F.smerte} opacity={0.85} />
          <path d="M-66,-112 A76,76 0 0 1 66,-112 M-82,-126 A96,96 0 0 1 82,-126" fill="none" stroke={AKSENT} strokeWidth={2.6} strokeLinecap="round" opacity={0.8} />
          <path d={lauv(-29, 84, 13, 11, 6, 9)} fill={F.sart} stroke={AKSENT} strokeWidth={1.8} opacity={0.9} />
        </g>

        {/* cleaned: the nerve gone, the hole open, a fine file in a canal, drops of rinse */}
        <g {...lag(er("renses"))}>
          <path d={PULPA} fill={F.papir} stroke={STEIN} strokeWidth={1.6} strokeDasharray="4 4" />
          <path d={TILGANG} fill={F.papir} stroke={BLEKK} strokeWidth={1.8} />
          <path d="M-14,-150 L-22,52" stroke={F.metallMork} strokeWidth={2.4} strokeLinecap="round" />
          <rect x={-22} y={-172} width={16} height={24} rx={4} fill={F.teal} stroke={BLEKK} strokeWidth={1.6} transform="rotate(-2 -14 -160)" />
          <path d={`${draape(30, -128, 7)} ${draape(46, -110, 5)} ${draape(18, -112, 4)}`} fill={F.kulde} stroke={F.teal} strokeWidth={1.4} />
        </g>

        {/* between visits: medicine inside, a grey lid on top */}
        <g {...lag(er("medisin"))}>
          <path d={PULPA} fill="#FFFFFF" stroke={F.metallMork} strokeWidth={1.6} />
          <path d={TILGANG} fill={F.metall} stroke={BLEKK} strokeWidth={1.8} />
          <path d="M-3,-30 l6,0 M0,-33 l0,6 M-12,30 l5,0 M-9.5,27.5 l0,5 M10,32 l5,0 M12.5,29.5 l0,5" stroke={F.teal} strokeWidth={1.6} strokeLinecap="round" />
        </g>

        {/* filled: the canals sealed, a filling on top */}
        <g {...lag(er("fylt", "krone"))}>
          <path d={PULPA} fill={F.rav} opacity={0.9} stroke="#C9803E" strokeWidth={1.4} />
          <path d={TILGANG} fill={F.fylling} stroke={F.teal} strokeWidth={1.8} />
        </g>

        {/* a crown over it all */}
        <g {...lag(er("krone"))}>
          <path d={KRONE} fill="#F4FAFB" fillOpacity={0.94} stroke={F.teal} strokeWidth={2.4} strokeLinejoin="round" />
          <path d={JEKSEL.fure} transform="translate(0 -6)" fill="none" stroke={F.fure} strokeWidth={1.8} strokeLinecap="round" />
          <path d="M60,-92 l9,-9 M66,-78 l12,-3 M58,-108 l3,-12" stroke={F.teal} strokeWidth={2.2} strokeLinecap="round" />
        </g>
      </g>
    </Ramme>
  );
}

/** An x-ray: a dark little film with the tooth's ghost on it, and a tick when it looks good. */
export function Rontgen({ strek = true, className, forsink, hake = false }: Stil & { hake?: boolean }) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <rect x={22} y={14} width={76} height={92} rx={10} {...form(strek, "#2B3D45", { w: 2.2, penFill: "#E6ECEC" })} />
      <g transform="translate(60 66) scale(0.42)">
        <path d={JEKSEL.tann} fill="none" stroke={strek ? "#7F9AA2" : "#DCE6E8"} strokeWidth={4} {...(strek ? { pathLength: 1, className: s.strek } : {})} />
        <path d={PULPA} fill="none" stroke={strek ? "#7F9AA2" : "#DCE6E8"} strokeWidth={3} {...(strek ? { pathLength: 1, className: s.strek } : {})} />
      </g>
      <circle cx={88} cy={24} r={3} fill={F.teal} {...blekk(strek)} />
      {hake && <path d="M70,92 L80,102 L104,74" {...linje(strek, F.teal, 4, F.teal)} />}
    </Ramme>
  );
}

/** The thin rubber sheet stretched round the tooth, so it stays clean and dry. */
export function Gummiduk({ strek = true, className, forsink }: Stil) {
  return (
    <Ramme className={className} forsink={forsink} boks="0 0 120 120">
      <path d="M18,22 Q60,30 102,22 Q96,60 102,98 Q60,90 18,98 Q24,60 18,22 Z" {...form(strek, "#BFE0E6", { w: 2.2, ink: F.teal, penFill: "#E6F3F5" })} />
      <path d="M14,16 L14,104 M106,16 L106,104 M14,16 Q60,6 106,16" {...linje(strek, F.metallMork, 2)} />
      <g transform="translate(60 74) scale(0.36)">
        <path d={JEKSEL.krone} {...form(strek, F.hvit, { w: 5, penFill: F.papir })} />
        <path d={JEKSEL.fure} {...linje(strek, F.fure, 4)} />
      </g>
    </Ramme>
  );
}

/** Every drawing on the treatment pages by its id, always in pen. */
export const BTEGNINGER: Record<BTegning, (p: Stil) => React.JSX.Element> = {
  ...(Object.fromEntries(Object.entries(TEGNINGER).map(([id, T]) => [id, (p: Stil) => <T strek {...p} />])) as Record<TegningId, (p: Stil) => React.JSX.Element>),
  "rot-frisk": (p) => <RotTann tilstand="frisk" {...p} />,
  "rot-syk": (p) => <RotTann tilstand="syk" {...p} />,
  "rot-renses": (p) => <RotTann tilstand="renses" {...p} />,
  "rot-medisin": (p) => <RotTann tilstand="medisin" {...p} />,
  "rot-fylt": (p) => <RotTann tilstand="fylt" {...p} />,
  "rot-krone": (p) => <RotTann tilstand="krone" {...p} />,
  rontgen: (p) => <Rontgen {...p} />,
  "rontgen-hake": (p) => <Rontgen hake {...p} />,
  gummiduk: (p) => <Gummiduk {...p} />,
  lupe: (p) => <Lupe {...p} />,
  plan: (p) => <Plan {...p} />,
  ande: (p) => <Ande {...p} />,
  skrape: (p) => <Skrape {...p} />,
  flekk: (p) => <Flekk {...p} />,
  bor: (p) => <Bor {...p} />,
  underlag: (p) => <Underlag {...p} />,
  fylt: (p) => <Fylt {...p} />,
  lampe: (p) => <Lampe {...p} />,
  visdom: (p) => <Visdom {...p} />,
  trekk: (p) => <Trekk {...p} />,
  sting: (p) => <Sting {...p} />,
  kompress: (p) => <Kompress {...p} />,
  "implantat-skrue": (p) => <Implantat trinn="skrue" {...p} />,
  "implantat-gror": (p) => <Implantat trinn="gror" {...p} />,
  "implantat-krone": (p) => <Implantat trinn="krone" {...p} />,
  mangler: (p) => <Mangler {...p} />,
  avtrykk: (p) => <Avtrykk {...p} />,
  stubb: (p) => <Stubb {...p} />,
  "krone-satt": (p) => <KroneSatt {...p} />,
  provisorium: (p) => <Provisorium {...p} />,
  farge: (p) => <Farge {...p} />,
  skinne: (p) => <Skinne {...p} />,
  hvit: (p) => <Hvit {...p} />,
  bro: (p) => <Bro {...p} />,
  fasett: (p) => <Fasett {...p} />,
  "fasett-slip": (p) => <Fasett skall={false} {...p} />,
  protese: (p) => <Protese {...p} />,
  bittskinne: (p) => <Bittskinne {...p} />,
  gnissing: (p) => <Gnissing {...p} />,
  melk: (p) => <Melk {...p} />,
  tyggis: (p) => <Tyggis {...p} />,
};
