"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Flate, UtenSkygge, css, loop } from "./Popup";
import { FARGE as F, FORTANN, JEKSEL, STUBB, TONE, kurve, lauv, rng, stjerne, type Gruppe, type Pt } from "./tegning";

/* The pieces the scenes are cut from: teeth, gum, bone, the bib, the
   printed backdrop and the instruments. Teeth take a page position and a
   scale; anything drawn as `children` lands in the tooth's own units. */

type Tann = { x: number; y: number; s: number; farge?: string; children?: ReactNode };

/** A molar standing in its gum. `rot` shows the roots too. */
export function Jeksel({ x, y, s, rot = true, farge = F.hvit, children }: Tann & { rot?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <motion.path d={rot ? JEKSEL.tann : JEKSEL.krone} initial={false} animate={{ fill: farge }} transition={{ duration: 1.6 }} />
      <path d={rot ? JEKSEL.skygge : JEKSEL.kroneSkygge} fill={F.skyggeside} opacity={0.85} />
      <UtenSkygge>
        <path d={JEKSEL.fure} fill="none" stroke={F.fure} strokeWidth={3} strokeLinecap="round" />
      </UtenSkygge>
      {children}
    </g>
  );
}

/** A front tooth standing in its gum. */
export function Fortann({ x, y, s, rot = false, farge = F.hvit, children }: Tann & { rot?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <motion.path d={rot ? FORTANN.tann : FORTANN.krone} initial={false} animate={{ fill: farge }} transition={{ duration: 1.6 }} />
      <path d={rot ? FORTANN.skygge : FORTANN.kroneSkygge} fill={F.skyggeside} opacity={0.85} />
      <UtenSkygge>
        <path d={FORTANN.glans} fill="none" stroke={F.hvit} strokeWidth={3} strokeLinecap="round" opacity={0.9} />
      </UtenSkygge>
      {children}
    </g>
  );
}

/** A molar ground down to a stump, ready for a crown. */
export function Stubb({ x, y, s, children }: Omit<Tann, "farge">) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d={STUBB.tann} fill={F.dentin} />
      <path d={STUBB.skygge} fill={F.dentinMork} opacity={0.8} />
      {children}
    </g>
  );
}

/** The crown that goes on a stump: the molar's crown, hollow underneath. */
export function Krone({ farge = F.hvit }: { farge?: string }) {
  return (
    <>
      <path d={JEKSEL.krone} fill={farge} />
      <path d={JEKSEL.kroneSkygge} fill={F.skyggeside} />
      <UtenSkygge>
        <path d={JEKSEL.fure} fill="none" stroke={F.fure} strokeWidth={3} strokeLinecap="round" />
      </UtenSkygge>
    </>
  );
}

/**
 * The gum line along a row of teeth: low over each tooth, rising in a
 * point between them, and level at the edges of the page.
 */
export function tannkjottLinje(xs: readonly number[], y: number, papille = 20, bredde = 44): Pt[] {
  const pts: Pt[] = [[-20, y - papille / 2]];
  xs.forEach((x, i) => {
    pts.push(i === 0 ? [x - bredde, y - papille] : [(xs[i - 1] + x) / 2, y - papille]);
    pts.push([x, y + 2]);
  });
  pts.push([xs[xs.length - 1] + bredde, y - papille], [420, y - papille / 2]);
  return pts;
}

/** A band of gum along a line, down to `bunn`, with a darker line where it meets the bone. */
export function Tannkjott({ linje, bunn = 490, farge = F.tannkjott, strek = F.tannkjottMork, tid = 1.6 }: { linje: readonly Pt[]; bunn?: number; farge?: string; strek?: string; tid?: number }) {
  return (
    <>
      <motion.path d={`${kurve(linje)} L420,${bunn} L-20,${bunn} Z`} initial={false} animate={{ fill: farge }} transition={{ duration: tid }} />
      <UtenSkygge>
        <motion.path
          d={kurve(linje.map(([x, y]) => [x, y + 14] as Pt))}
          fill="none"
          strokeWidth={2}
          initial={false}
          animate={{ stroke: strek }}
          transition={{ duration: tid }}
          opacity={0.55}
        />
      </UtenSkygge>
    </>
  );
}

/** Bone, cut through: a band with its spongy specks. */
export function Ben({ linje, bunn = 490, frø = 17 }: { linje: readonly Pt[]; bunn?: number; frø?: number }) {
  const rand = rng(frø);
  const topp = Math.min(...linje.map(([, y]) => y));
  const prikker = Array.from({ length: 26 }, (_, i) => lauv(10 + rand() * 380, topp + 22 + rand() * (bunn - topp - 40), 4 + rand() * 6, 3 + rand() * 4, 300 + i, 7));
  return (
    <>
      <path d={`${kurve(linje)} L420,${bunn} L-20,${bunn} Z`} fill={F.ben} />
      <UtenSkygge>
        <path d={prikker.join(" ")} fill={F.benMork} />
        <path d={kurve(linje)} fill="none" stroke={F.benStrek} strokeWidth={4} />
      </UtenSkygge>
    </>
  );
}

/** The clinic's blue paper bib, along the foot of the page. */
export function Smekke() {
  const pts: Pt[] = [];
  for (let x = -20, i = 0; x <= 420; x += 20, i++) pts.push([x, 446 + (i % 2 ? 7 : -3)]);
  return (
    <>
      <path d={`${kurve(pts)} L420,490 L-20,490 Z`} fill={F.smekke} />
      <UtenSkygge>
        <path d="M-20,462 C100,458 300,466 420,460 M-20,474 C120,470 280,478 420,472" fill="none" stroke={F.smekkeStrek} strokeWidth={1.5} opacity={0.7} />
      </UtenSkygge>
    </>
  );
}

/** What is printed flat on the page, in the group's tint: all that shows while the stage turns. */
export function Trykk({ gruppe, children }: { gruppe: Gruppe; children?: ReactNode }) {
  const t = TONE[gruppe];
  return (
    <Flate>
      <circle cx={200} cy={250} r={152} fill={t.flate} />
      <circle cx={200} cy={250} r={174} fill="none" stroke={t.ring} strokeWidth={2} strokeDasharray="1 8" strokeLinecap="round" opacity={t.ringStyrke} />
      {children}
    </Flate>
  );
}

/** A few paper stars that wink while `spiller`: the scene has come right. */
export function Stjerner({ pts, spiller, farge = F.teal }: { pts: readonly (readonly [number, number, number])[]; spiller: boolean; farge?: string }) {
  return (
    <UtenSkygge>
      {pts.map(([x, y, a], i) => (
        <g key={i} className={loop.blink} data-on={spiller} style={css({ "--tid": "3.2s", "--forsink": `${i * 0.5}s` })}>
          <path d={stjerne(x, y, a)} fill={farge} />
        </g>
      ))}
    </UtenSkygge>
  );
}

/* ── The instruments ──
   Each is drawn with its working tip at (0, 0) and its handle running up to
   the right; place it with `x`, `y` and a turn `v` in degrees. */

type Plass = { x: number; y: number; v?: number; children?: ReactNode };

const plass = ({ x, y, v = 0 }: Plass) => `translate(${x} ${y}) rotate(${v})`;

/** The handle all the hand instruments share: slate, with a dark grip by the working end. */
function Skaft({ fra, lengde = 260 }: { fra: number; lengde?: number }) {
  return (
    <>
      <path d={`M${fra},${-fra} L${fra + lengde},${-fra - lengde}`} stroke={F.glomma} strokeWidth={9} strokeLinecap="round" />
      <path d={`M${fra + 6},${-fra - 6} L${fra + 18},${-fra - 18}`} stroke={F.dyp} strokeWidth={12} strokeLinecap="round" />
    </>
  );
}

/** The probe: a fine bent point. */
export function Sonde(p: Plass) {
  return (
    <g transform={plass(p)}>
      <path d="M0,0 Q-2,-14 12,-22 L40,-40" fill="none" stroke={F.metallMork} strokeWidth={3.4} strokeLinecap="round" />
      <Skaft fra={40} />
      {p.children}
    </g>
  );
}

/** The scaler: a sickle hook for scraping. */
export function Skrape(p: Plass) {
  return (
    <g transform={plass(p)}>
      <path d="M0,0 Q-8,-6 -6,-16 Q-2,-26 14,-26 L40,-40" fill="none" stroke={F.metallMork} strokeWidth={3.6} strokeLinecap="round" />
      <Skaft fra={40} />
      {p.children}
    </g>
  );
}

/** The fine file that cleans a root canal: a tiny coloured handle and a thin shaft, pointing down. */
export function Fil(p: Plass) {
  return (
    <g transform={plass(p)}>
      <path d="M0,0 L0,-120" stroke={F.metallMork} strokeWidth={2} strokeLinecap="round" />
      <path d="M-2,-20 L2,-26 M-2,-34 L2,-40 M-2,-48 L2,-54 M-2,-62 L2,-68" stroke={F.metall} strokeWidth={1.2} />
      <rect x={-9} y={-150} width={18} height={32} rx={5} fill={F.teal} />
      <path d="M-9,-140 h18 M-9,-130 h18" stroke="#1F8796" strokeWidth={1.5} />
      {p.children}
    </g>
  );
}

/** The drill: a handpiece with a fine bur at its head. `hode` holds the bur, to let it hum. */
export function Bor({ hode, ...p }: Plass & { hode?: ReactNode }) {
  return (
    <g transform={`${plass(p)} translate(-8 0)`}>
      {hode ?? <Bur />}
      <path d="M-10,-30 Q-12,-40 0,-44 L18,-44 Q28,-42 26,-30 Z" fill={F.metall} />
      <path d="M14,-42 L170,-200 L188,-182 L26,-30 Z" fill={F.metall} />
      <path d="M26,-30 L188,-182 L180,-190 L18,-38 Z" fill={F.metallMork} opacity={0.55} />
      <path d="M70,-96 L86,-80 M84,-110 L100,-94" stroke={F.glomma} strokeWidth={5} />
      <path d="M170,-200 L230,-260 L248,-242 L188,-182 Z" fill={F.glomma} />
      {p.children}
    </g>
  );
}

/** The bur in the drill's head. */
export function Bur() {
  return (
    <>
      <path d="M8,-30 L8,0" stroke={F.metallMork} strokeWidth={3} strokeLinecap="round" />
      <circle cx={8} cy={0} r={3.6} fill={F.metallMork} />
    </>
  );
}

/** The polisher: the same handpiece with a soft rubber cup. */
export function Polerer(p: Plass) {
  return (
    <Bor
      {...p}
      hode={
        <>
          <path d="M8,-30 L8,-16" stroke={F.metallMork} strokeWidth={3} />
          <path d="M-4,-16 L20,-16 L16,0 L0,0 Z" fill={F.teal} />
          <path d="M1,-5 L15,-5" stroke="#1F8796" strokeWidth={1.5} />
        </>
      }
    />
  );
}

/** A toothbrush, its bristles down at (0, 0). */
export function Tannborste(p: Plass) {
  return (
    <g transform={plass(p)}>
      <path d="M-34,-14 L34,-14 L34,0 L-34,0 Z" fill={F.hvit} />
      <UtenSkygge>
        <path d="M-30,-2 V-13 M-22,-2 V-13 M-14,-2 V-13 M-6,-2 V-13 M2,-2 V-13 M10,-2 V-13 M18,-2 V-13 M26,-2 V-13" stroke="#CFE3E7" strokeWidth={3} />
      </UtenSkygge>
      <path d="M-38,-14 Q-40,-24 -30,-24 L30,-24 Q40,-24 44,-28 L190,-120 Q198,-126 202,-118 Q206,-110 198,-104 L50,-14 Q44,-10 38,-14 Z" fill={F.teal} />
      <path d="M120,-72 L184,-112" stroke="#7FCBD6" strokeWidth={4} strokeLinecap="round" />
      {p.children}
    </g>
  );
}

/** The forceps' two beaks, open `w` apart at the tip, handles up. */
export function Tang({ w = 100, ...p }: Plass & { w?: number }) {
  const h = w / 2;
  return (
    <g transform={plass(p)}>
      <path d={`M${-h - 6},6 C${-h - 10},-30 ${-h + 12},-70 -8,-110 L-14,-260 L-2,-260 L4,-110 C${-h + 26},-74 ${-h + 6},-30 ${-h + 4},6 Z`} fill={F.metall} />
      <path d={`M${h + 6},6 C${h + 10},-30 ${h - 12},-70 8,-110 L14,-260 L2,-260 L-4,-110 C${h - 26},-74 ${h - 6},-30 ${h - 4},6 Z`} fill={F.metallMork} />
      <circle cx={0} cy={-112} r={7} fill={F.glomma} />
      {p.children}
    </g>
  );
}

/** A clock face whose minute hand goes round while `spiller`: as soon as you can. */
export function Klokke({ cx, cy, r, viser }: { cx: number; cy: number; r: number; viser: ReactNode }) {
  return (
    <>
      <circle cx={cx} cy={cy} r={r + 6} fill={F.glomma} />
      <circle cx={cx} cy={cy} r={r} fill={F.hvit} />
      <UtenSkygge>
        {Array.from({ length: 12 }, (_, k) => (
          <path key={k} d={`M${cx},${cy - r + 4} L${cx},${cy - r + (k % 3 ? 9 : 14)}`} stroke={F.dyp} strokeWidth={k % 3 ? 1.6 : 3} transform={`rotate(${k * 30} ${cx} ${cy})`} />
        ))}
        <path d={`M${cx},${cy} L${cx + r * 0.38},${cy - r * 0.22}`} stroke={F.dyp} strokeWidth={4} strokeLinecap="round" />
        {viser}
        <circle cx={cx} cy={cy} r={4} fill={F.smerte} />
      </UtenSkygge>
    </>
  );
}
