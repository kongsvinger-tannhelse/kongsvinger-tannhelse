import type { CSSProperties } from "react";
import { FARGE as F, JEKSEL, PULPA, draape, lauv } from "@/components/forside/behandlinger/popup/tegning";
import { AKSENT, BLEKK, Jeksel, Ramme, STEIN, TEGNINGER, blekk, form, linje, type Stil } from "@/components/artikler/tegninger";
import type { TegningId } from "@/data/artikler/typer";
import type { BTegning } from "@/data/behandlinger/typer";
import s from "@/components/artikler/artikler.module.css";
import m from "./side.module.css";
import { Ande, Avtrykk, Bor, Farge, Flekk, Fylt, Hvit, Implantat, Kompress, KroneSatt, Lampe, Lupe, Mangler, Plan, Provisorium, Skinne, Skrape, Sting, Stubb, Trekk, Underlag, Visdom } from "./ruter";
import { Bittskinne, Bro, Fasett, Gnissing, Melk, Protese, Tyggis } from "./ruter2";
import { AvtrykkBitt, BroLost, BroTraad, Gips, Kalender, KjeveRo, KjeveSar, LupeGap, LupeRad, LupeSlitt, RontgenTo, SnakkeHelse, SnakkeStress, Speil, Tannkart, Valg } from "./ruter3";
import { Autorisert, AvtrykkSmil, Bleke18, BlekeSart, Blor, ForEtter, FyllingSnitt, Gjentak, HjemUtstyr, HvitFalmer, KaldVarm, LosTann, LupeEmalje, LupePlakk, Mellomrom, Misfarget, Peroksid, RoligHull, SkrapeUnder, Sonde, TannSover, TaptVev, Timeglass, ToStadier } from "./ruter4";
import { Atte, FortannEndring, FortannKnekt, FyltFortann, HovenKinn, Kake, Kontroller, KroneFortann, LukeSporsmal, LupeRot, Pilleglass, RadTorr, RoligNerve, RoligTrekk, RoligVisdom, RontgenFortann, RontgenRot, RontgenVisdom, SnakkeDager, SnakkeLuke, SnakkeMedisin, SnakkeRot, SpyttSkjold, Straaling, TrekkDeler } from "./ruter5";
import { AvtrykkTannlos, BeinNok, BittMaal, FargeFortann, FargeKrone, FortennerFasett, GipsFortenner, ImplantatBorste, ImplantatDeler, ImplantatFarge, KroneKappe, KroneTraad, LiteIgjen, PlasterKinn, ProteseImplantat, ProteseSmil, ProteseVoks, RoligLuke, RontgenLuke, Skanner, SnakkeProtese, Spire, ValgFasett } from "./ruter6";
import { Antibiotika, AvtrykkDel, BiteVondt, Blaalys, ByllLetter, ByllSnitt, ByllValg, DelproteseOvenfra, Feber, InnUt, KinnVondt, KulTannkjott, LupeKlammer, LupeVerk, Opplegg, PlanVerk, RontgenByll, RontgenVerk, SnakkeDel, SnakkeVerk, TegningDel, TelefonMorgen, Veiviser, VerkFylling, VerkRot, VerkTannkjott, VerkToSteder, VerkTrekk, VoksSpeil, VondSmak } from "./ruter7";
import { ApenTann, BarRot, BehandleStump, BeleggTunge, EgneMidler, FjerneKant, FyllingKant, HullAnde, HullUnder, InnleggKrone, IsingFylling, IsingHull, IsingNerve, IsingReparert, IsingSprekk, IsingTannkjott, Klissete, KroneSement, LappFylling, Lege, Lok, LupeAnde, LupeKrone, MatMellom, MorgenTorr, MunnAnde, MykPuss, NyKrone, PussTraad, RensAnde, RontgenFylling, RontgenKrone, SementSlitt, SnakkeAnde, SnakkeIsing, SprekkUnder, Tungeskrape, TyntLag, Vannflaske, Vekt } from "./ruter8";

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
        <path d="M-96,-2 Q-60,-16 -46,-14 Q0,8 46,-14 Q60,-16 96,-2 L96,104 L-96,104 Z" fill={F.ben} fillOpacity={0.55} {...blekk(strek)} />
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
  "snakke-helse": (p) => <SnakkeHelse {...p} />,
  "snakke-stress": (p) => <SnakkeStress {...p} />,
  "lupe-rad": (p) => <LupeRad {...p} />,
  "lupe-gap": (p) => <LupeGap {...p} />,
  "lupe-slitt": (p) => <LupeSlitt {...p} />,
  "speil": (p) => <Speil {...p} />,
  "rontgen-to": (p) => <RontgenTo {...p} />,
  "tannkart": (p) => <Tannkart {...p} />,
  "kalender": (p) => <Kalender {...p} />,
  "bro-lost": (p) => <BroLost {...p} />,
  "valg": (p) => <Valg {...p} />,
  "gips": (p) => <Gips {...p} />,
  "bro-traad": (p) => <BroTraad {...p} />,
  "kjeve-sar": (p) => <KjeveSar {...p} />,
  "kjeve-ro": (p) => <KjeveRo {...p} />,
  "avtrykk-bitt": (p) => <AvtrykkBitt {...p} />,
  "fylling-snitt": (p) => <FyllingSnitt {...p} />,
  "rolig-hull": (p) => <RoligHull {...p} />,
  "tann-sover": (p) => <TannSover {...p} />,
  "kald-varm": (p) => <KaldVarm {...p} />,
  "peroksid": (p) => <Peroksid {...p} />,
  "timeglass": (p) => <Timeglass {...p} />,
  "lupe-emalje": (p) => <LupeEmalje {...p} />,
  "avtrykk-smil": (p) => <AvtrykkSmil {...p} />,
  "bleke-sart": (p) => <BlekeSart {...p} />,
  "hvit-falmer": (p) => <HvitFalmer {...p} />,
  "bleke-18": (p) => <Bleke18 {...p} />,
  "lupe-plakk": (p) => <LupePlakk {...p} />,
  "misfarget": (p) => <Misfarget {...p} />,
  "mellomrom": (p) => <Mellomrom {...p} />,
  "autorisert": (p) => <Autorisert {...p} />,
  "to-stadier": (p) => <ToStadier {...p} />,
  "blor": (p) => <Blor {...p} />,
  "los-tann": (p) => <LosTann {...p} />,
  "sonde": (p) => <Sonde {...p} />,
  "hjem-utstyr": (p) => <HjemUtstyr {...p} />,
  "skrape-under": (p) => <SkrapeUnder {...p} />,
  "for-etter": (p) => <ForEtter {...p} />,
  "gjentak": (p) => <Gjentak {...p} />,
  "tapt-vev": (p) => <TaptVev {...p} />,
  "rontgen-rot": (p) => <RontgenRot {...p} />,
  "rolig-nerve": (p) => <RoligNerve {...p} />,
  "snakke-rot": (p) => <SnakkeRot {...p} />,
  "spytt-skjold": (p) => <SpyttSkjold {...p} />,
  "kake": (p) => <Kake {...p} />,
  "straaling": (p) => <Straaling {...p} />,
  "pilleglass": (p) => <Pilleglass {...p} />,
  "snakke-medisin": (p) => <SnakkeMedisin {...p} />,
  "rad-torr": (p) => <RadTorr {...p} />,
  "lupe-rot": (p) => <LupeRot {...p} />,
  "rolig-trekk": (p) => <RoligTrekk {...p} />,
  "snakke-luke": (p) => <SnakkeLuke {...p} />,
  "luke-sporsmal": (p) => <LukeSporsmal {...p} />,
  "atte": (p) => <Atte {...p} />,
  "rontgen-visdom": (p) => <RontgenVisdom {...p} />,
  "rolig-visdom": (p) => <RoligVisdom {...p} />,
  "trekk-deler": (p) => <TrekkDeler {...p} />,
  "snakke-dager": (p) => <SnakkeDager {...p} />,
  "hoven-kinn": (p) => <HovenKinn {...p} />,
  "fortann-knekt": (p) => <FortannKnekt {...p} />,
  "rontgen-fortann": (p) => <RontgenFortann {...p} />,
  "fylt-fortann": (p) => <FyltFortann {...p} />,
  "krone-fortann": (p) => <KroneFortann {...p} />,
  "kontroller": (p) => <Kontroller {...p} />,
  "fortann-endring": (p) => <FortannEndring {...p} />,
  "krone-kappe": (p) => <KroneKappe {...p} />,
  "lite-igjen": (p) => <LiteIgjen {...p} />,
  "farge-krone": (p) => <FargeKrone {...p} />,
  "skanner": (p) => <Skanner {...p} />,
  "krone-traad": (p) => <KroneTraad {...p} />,
  "fortenner-fasett": (p) => <FortennerFasett {...p} />,
  "valg-fasett": (p) => <ValgFasett {...p} />,
  "farge-fortann": (p) => <FargeFortann {...p} />,
  "gips-fortenner": (p) => <GipsFortenner {...p} />,
  "implantat-deler": (p) => <ImplantatDeler {...p} />,
  "bein-nok": (p) => <BeinNok {...p} />,
  "rontgen-luke": (p) => <RontgenLuke {...p} />,
  "rolig-luke": (p) => <RoligLuke {...p} />,
  "implantat-farge": (p) => <ImplantatFarge {...p} />,
  "plaster-kinn": (p) => <PlasterKinn {...p} />,
  "implantat-borste": (p) => <ImplantatBorste {...p} />,
  "protese-voks": (p) => <ProteseVoks {...p} />,
  "protese-implantat": (p) => <ProteseImplantat {...p} />,
  "snakke-protese": (p) => <SnakkeProtese {...p} />,
  "avtrykk-tannlos": (p) => <AvtrykkTannlos {...p} />,
  "bitt-maal": (p) => <BittMaal {...p} />,
  "protese-smil": (p) => <ProteseSmil {...p} />,
  "spire": (p) => <Spire {...p} />,
  "verk-to-steder": (p) => <VerkToSteder {...p} />,
  "snakke-verk": (p) => <SnakkeVerk {...p} />,
  "lupe-verk": (p) => <LupeVerk {...p} />,
  "rontgen-verk": (p) => <RontgenVerk {...p} />,
  "plan-verk": (p) => <PlanVerk {...p} />,
  "verk-fylling": (p) => <VerkFylling {...p} />,
  "verk-rot": (p) => <VerkRot {...p} />,
  "verk-trekk": (p) => <VerkTrekk {...p} />,
  "verk-tannkjott": (p) => <VerkTannkjott {...p} />,
  "telefon-morgen": (p) => <TelefonMorgen {...p} />,
  "byll-snitt": (p) => <ByllSnitt {...p} />,
  "kul-tannkjott": (p) => <KulTannkjott {...p} />,
  "bite-vondt": (p) => <BiteVondt {...p} />,
  "vond-smak": (p) => <VondSmak {...p} />,
  "kinn-vondt": (p) => <KinnVondt {...p} />,
  "feber": (p) => <Feber {...p} />,
  "blaalys": (p) => <Blaalys {...p} />,
  "rontgen-byll": (p) => <RontgenByll {...p} />,
  "byll-letter": (p) => <ByllLetter {...p} />,
  "antibiotika": (p) => <Antibiotika {...p} />,
  "byll-valg": (p) => <ByllValg {...p} />,
  "delprotese": (p) => <DelproteseOvenfra {...p} />,
  "veiviser": (p) => <Veiviser {...p} />,
  "snakke-del": (p) => <SnakkeDel {...p} />,
  "avtrykk-del": (p) => <AvtrykkDel {...p} />,
  "opplegg": (p) => <Opplegg {...p} />,
  "tegning-del": (p) => <TegningDel {...p} />,
  "voks-speil": (p) => <VoksSpeil {...p} />,
  "inn-ut": (p) => <InnUt {...p} />,
  "lupe-klammer": (p) => <LupeKlammer {...p} />,
  "bar-rot": (p) => <BarRot {...p} />,
  "ising-hull": (p) => <IsingHull {...p} />,
  "ising-sprekk": (p) => <IsingSprekk {...p} />,
  "ising-fylling": (p) => <IsingFylling {...p} />,
  "ising-tannkjott": (p) => <IsingTannkjott {...p} />,
  "ising-nerve": (p) => <IsingNerve {...p} />,
  "snakke-ising": (p) => <SnakkeIsing {...p} />,
  "myk-puss": (p) => <MykPuss {...p} />,
  "egne-midler": (p) => <EgneMidler {...p} />,
  "tynt-lag": (p) => <TyntLag {...p} />,
  "ising-reparert": (p) => <IsingReparert {...p} />,
  "munn-ande": (p) => <MunnAnde {...p} />,
  "belegg-tunge": (p) => <BeleggTunge {...p} />,
  "mat-mellom": (p) => <MatMellom {...p} />,
  "hull-ande": (p) => <HullAnde {...p} />,
  "sove-apen": (p) => <MorgenTorr {...p} />,
  "lok": (p) => <Lok {...p} />,
  "puss-traad": (p) => <PussTraad {...p} />,
  "tungeskrape": (p) => <Tungeskrape {...p} />,
  "vannflaske": (p) => <Vannflaske {...p} />,
  "snakke-ande": (p) => <SnakkeAnde {...p} />,
  "lupe-ande": (p) => <LupeAnde {...p} />,
  "rens-ande": (p) => <RensAnde {...p} />,
  "lege": (p) => <Lege {...p} />,
  "fylling-kant": (p) => <FyllingKant {...p} />,
  "apen-tann": (p) => <ApenTann {...p} />,
  "rontgen-fylling": (p) => <RontgenFylling {...p} />,
  "fjerne-kant": (p) => <FjerneKant {...p} />,
  "lapp-fylling": (p) => <LappFylling {...p} />,
  "innlegg-krone": (p) => <InnleggKrone {...p} />,
  "krone-sement": (p) => <KroneSement {...p} />,
  "hull-under": (p) => <HullUnder {...p} />,
  "sprekk-under": (p) => <SprekkUnder {...p} />,
  "klissete": (p) => <Klissete {...p} />,
  "vekt": (p) => <Vekt {...p} />,
  "sement-slitt": (p) => <SementSlitt {...p} />,
  "lupe-krone": (p) => <LupeKrone {...p} />,
  "rontgen-krone": (p) => <RontgenKrone {...p} />,
  "behandle-stump": (p) => <BehandleStump {...p} />,
  "ny-krone": (p) => <NyKrone {...p} />,
};
