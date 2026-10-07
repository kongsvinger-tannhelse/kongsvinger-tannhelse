"use client";

import { motion } from "framer-motion";
import { Ark, Flate, Fri, Los, UtenSkygge, css, loop, naadd, useFase, type PopupProps } from "../popup/Popup";
import { Ben, Jeksel, Klokke, Krone, Smekke, Stjerner, Stubb, Tannkjott, Trykk, tannkjottLinje } from "../popup/deler";
import { FARGE as F, FORTANN, JEKSEL, PULPA, kurve, lauv, r2, type Pt } from "../popup/tegning";

/* Akutt tannbehandling: what cannot wait, printed in a warm tint. The
   clock that turns up in some of them is the old site's own advice: get in
   touch as soon as you can. */

const EN_LINJE = tannkjottLinje([200], 372, 22, 82);

/** The clock's minute hand, going round about its centre. */
function Viser({ cx, cy, r, spiller }: { cx: number; cy: number; r: number; spiller: boolean }) {
  return (
    <g className={loop.viser} data-on={spiller} style={css({ "--nav": `${cx}px ${cy}px` })}>
      <path d={`M${cx},${cy} L${cx},${r2(cy - r * 0.72)}`} stroke={F.dyp} strokeWidth={3} strokeLinecap="round" />
    </g>
  );
}

/* ───────────── Tannsmerte: the ache ─────────────
   One big tooth held up like a specimen, its nerve showing through, red and
   beating. Jagged shards of ache flash out round it. Then the shards fold
   down flat, the nerve cools to the clinic's teal, and a few stars come out. */

const VERK_STEG = [["verk", 4600], ["rolig", 1]] as const;

/** A jagged shard of ache, pointing out from the tooth along angle `a`. */
function skar(cx: number, cy: number, a: number, inn: number, ut: number) {
  const rad = (a * Math.PI) / 180;
  const ux = Math.cos(rad);
  const uy = Math.sin(rad);
  const nx = -uy;
  const ny = ux;
  const pt = (t: number, side: number) => `${r2(cx + ux * t + nx * side)},${r2(cy + uy * t + ny * side)}`;
  const l = ut - inn;
  return `M${pt(inn, 0)} L${pt(inn + l * 0.38, 9)} L${pt(inn + l * 0.42, 2)} L${pt(inn + l * 0.7, 10)} L${pt(inn + l * 0.66, 2)} L${pt(ut, 0)} L${pt(inn + l * 0.6, -6)} L${pt(inn + l * 0.64, -1)} L${pt(inn + l * 0.32, -8)} L${pt(inn + l * 0.36, -1)} Z`;
}

const SKAR = [
  [-150, 104, 160],
  [-112, 112, 172],
  [-68, 112, 172],
  [-30, 104, 160],
  [168, 96, 150],
  [12, 96, 150],
] as const;

export function Tannsmerte({ oppe, spiller, redusert }: PopupProps) {
  const fase = useFase(spiller && oppe, VERK_STEG);
  const rolig = fase === "rolig" || (redusert && fase !== "av");
  const p = { oppe, redusert, av: 3 };
  const verker = spiller && oppe && !redusert && !rolig;
  return (
    <>
      <Flate>
        <circle cx={200} cy={262} r={176} fill="#FBEEE8" />
        <circle cx={200} cy={262} r={126} fill="#F8E4DB" />
        <circle cx={200} cy={262} r={76} fill="#F5DACE" />
        <ellipse cx={200} cy={448} rx={92} ry={10} fill={F.dyp} opacity={0.08} />
      </Flate>
      {/* the shards stand behind the tooth, and fold down when the ache goes */}
      <Ark
        n={0}
        {...p}
        oppe={oppe && !rolig}
        over={
          <Los spiller={verker}>
            {SKAR.map(([a, inn, ut], i) => (
              <g key={i} className={loop.verk} data-on={verker} style={css({ "--forsink": `${(i % 3) * 0.16}s`, "--fra": "50% 50%" })}>
                <path d={skar(200, 262, a, inn, ut)} fill={i % 2 ? F.rav : F.smerte} />
              </g>
            ))}
          </Los>
        }
      />
      <Ark n={1} {...p}>
        <g transform="translate(200 318) scale(1.42)">
          <path d={JEKSEL.tann} fill={F.hvit} />
          <path d={JEKSEL.skygge} fill={F.skyggeside} />
          <UtenSkygge>
            <motion.path
              d={PULPA}
              className={loop.glod}
              data-on={verker}
              initial={false}
              animate={{ fill: rolig ? F.teal : F.smerte, opacity: rolig ? 0.55 : 1 }}
              transition={{ duration: redusert ? 0 : 1.4 }}
            />
            <path d={JEKSEL.fure} fill="none" stroke={F.fure} strokeWidth={2.4} strokeLinecap="round" />
          </UtenSkygge>
        </g>
      </Ark>
      {/* when the ache has gone */}
      <Ark n={2} {...p} oppe={oppe && rolig} skygge={false}>
        <Stjerner pts={[[96, 150, 10], [306, 132, 13], [320, 300, 9], [84, 320, 8]]} spiller={spiller && rolig && !redusert} />
      </Ark>
    </>
  );
}

/* ───────────── Tannskade: the chipped front tooth ─────────────
   A big front tooth. A crack runs in from its edge, the corner breaks off
   and falls to the bib, and a clock stands up beside it. */

const SKADE_STEG = [["vent", 600], ["sprekk", 900], ["brekk", 1500], ["klokke", 1]] as const;
const BRUTT = "M-27,-4 C-29,-34 -31,-64 -29,-86 Q-28,-95 -19,-96 L6,-96 L10,-86 L15,-78 L13,-70 L22,-60 L30,-56 C30,-40 29,-24 27,-4 Z";
const FLIS = "M6,-96 L19,-96 Q28,-95 29,-86 C30.5,-72 30.4,-62 30,-56 L22,-60 L13,-70 L15,-78 L10,-86 Z";
const SPREKK = "M6,-96 L10,-86 L15,-78 L13,-70 L22,-60 L30,-56";

export function Tannskade({ oppe, spiller, redusert }: PopupProps) {
  const fase = useFase(spiller && oppe, SKADE_STEG);
  const nådd = (m: (typeof SKADE_STEG)[number][0]) => naadd(SKADE_STEG, fase, m, redusert);
  const sprukket = nådd("sprekk");
  const brutt = nådd("brekk");
  const klokke = nådd("klokke");
  const p = { oppe, redusert, av: 3 };
  return (
    <>
      <Trykk gruppe="akutt" />
      <Ark
        n={0}
        {...p}
        over={
          <Fri>
            {/* the corner, falling to the bib */}
            <motion.g
              initial={false}
              animate={brutt ? { x: 88, y: 168, rotate: 118 } : { x: 0, y: 0, rotate: 0 }}
              transition={redusert ? { duration: 0 } : { y: { type: "spring", stiffness: 70, damping: 11 }, x: { duration: 0.9, ease: "easeOut" }, rotate: { duration: 0.9, ease: "easeOut" } }}
            >
              <g transform="translate(200 384) scale(1.55)">
                <path d={FLIS} fill={F.hvit} />
                <path d="M19,-96 Q28,-95 29,-86 C30.5,-72 30.4,-62 30,-56 L22,-60 C22,-72 21,-84 19,-96 Z" fill={F.skyggeside} opacity={0.85} />
              </g>
            </motion.g>
          </Fri>
        }
      >
        <g transform="translate(200 384) scale(1.55)">
          <path d={BRUTT} fill={F.hvit} />
          <path d="M30,-56 C30,-40 29,-24 27,-4 L20,-4 C21,-24 21,-40 22,-58 Z" fill={F.skyggeside} opacity={0.85} />
          <UtenSkygge>
            <path d={FORTANN.glans} fill="none" stroke={F.hvit} strokeWidth={3} strokeLinecap="round" />
            <path d="M-18,-86 Q-16,-60 -18,-30" fill="none" stroke="#EDF1F2" strokeWidth={3} strokeLinecap="round" />
            <motion.path d={SPREKK} fill="none" stroke={F.dyp} strokeWidth={1.4} strokeLinejoin="round" initial={false} animate={{ pathLength: sprukket ? 1 : 0, opacity: sprukket && !brutt ? 0.7 : 0 }} transition={{ duration: redusert ? 0 : 0.7 }} />
            <motion.path d="M13,-70 L8,-58 L10,-46" fill="none" stroke={F.dyp} strokeWidth={1} initial={false} animate={{ pathLength: sprukket ? 1 : 0, opacity: sprukket ? 0.45 : 0 }} transition={{ duration: redusert ? 0 : 0.7, delay: redusert ? 0 : 0.4 }} />
          </UtenSkygge>
        </g>
        <Tannkjott linje={tannkjottLinje([200], 384, 18, 60)} />
      </Ark>
      <Ark n={1} {...p}>
        <Smekke />
      </Ark>
      <Ark n={2} {...p} oppe={oppe && klokke}>
        <Klokke cx={318} cy={142} r={34} viser={<Viser cx={318} cy={142} r={34} spiller={spiller && klokke && !redusert} />} />
      </Ark>
    </>
  );
}

/* ───────────── Tannverk: the throb ─────────────
   A molar with a dark hole in its crown and sore gum, and rings of
   throbbing that spread out from it, again and again. */

const HULL = "M-18,-86 C-16,-98 18,-98 22,-86 C26,-70 12,-58 2,-60 C-12,-62 -20,-72 -18,-86 Z";

export function Tannverk({ oppe, spiller, redusert }: PopupProps) {
  const spill = spiller && oppe && !redusert;
  const p = { oppe, redusert, av: 3 };
  return (
    <>
      <Trykk gruppe="akutt" />
      <Ark
        n={0}
        {...p}
        over={
          <Flate>
            {[0, 0.8, 1.6].map((d, i) => (
              <g key={d} className={loop.ring} data-on={spill} style={css({ "--forsink": `${d}s` })}>
                <circle cx={200} cy={292} r={104} fill="none" stroke={i % 2 ? F.rav : F.smerte} strokeWidth={4} />
              </g>
            ))}
          </Flate>
        }
      />
      <Ark n={1} {...p}>
        <Jeksel x={200} y={372} s={1.35}>
          <UtenSkygge>
            <path d={HULL} fill={F.hull} />
            <path d="M-6,-80 C-2,-86 8,-84 10,-78" fill="none" stroke="#4D3328" strokeWidth={3} strokeLinecap="round" />
          </UtenSkygge>
        </Jeksel>
        <Tannkjott linje={EN_LINJE} farge="#E59A8E" strek="#C86F62" />
      </Ark>
      <Ark n={2} {...p}>
        <Smekke />
      </Ark>
    </>
  );
}

/* ───────────── Mistet fylling: it fell out ─────────────
   A molar with a filling in its groove. The filling works loose, pops out
   and lands on the bib, leaving the hole; a clock stands up. */

const MISTET_STEG = [["vent", 600], ["los", 1100], ["ut", 1400], ["tom", 1]] as const;
const FYLLING = "M-24,-90 Q-10,-78 0,-88 Q10,-78 24,-90 L22,-64 Q0,-54 -22,-64 Z";

export function MistetFylling({ oppe, spiller, redusert }: PopupProps) {
  const fase = useFase(spiller && oppe, MISTET_STEG);
  const ute = naadd(MISTET_STEG, fase, "ut", redusert);
  const tom = naadd(MISTET_STEG, fase, "tom", redusert);
  const vakler = fase === "los" && !redusert;
  const p = { oppe, redusert, av: 3 };
  return (
    <>
      <Trykk gruppe="akutt" />
      <Ark
        n={0}
        {...p}
        over={
          <Fri>
            <motion.g
              initial={false}
              animate={ute ? { x: 104, y: 168, rotate: 200 } : { x: 0, y: 0, rotate: vakler ? [0, -7, 6, -5, 4, 0] : 0 }}
              transition={
                redusert
                  ? { duration: 0 }
                  : ute
                    ? { y: { duration: 1.1, times: [0, 1], ease: [0.4, -0.9, 0.7, 1] }, x: { duration: 1.1, ease: "easeOut" }, rotate: { duration: 1.1, ease: "easeOut" } }
                    : { rotate: { duration: 1, ease: "easeInOut" } }
              }
            >
              <g transform="translate(200 372) scale(1.35)">
                <path d={FYLLING} fill={F.fylling} stroke={F.teal} strokeWidth={1.4} strokeOpacity={0.6} />
              </g>
            </motion.g>
          </Fri>
        }
      >
        <Jeksel x={200} y={372} s={1.35}>
          <UtenSkygge>
            <path d={FYLLING} fill="#8A6A58" />
            <path d="M-16,-80 Q0,-70 16,-80 L15,-68 Q0,-62 -15,-68 Z" fill={F.hull} />
          </UtenSkygge>
        </Jeksel>
        <Tannkjott linje={EN_LINJE} />
      </Ark>
      <Ark n={1} {...p}>
        <Smekke />
      </Ark>
      <Ark n={2} {...p} oppe={oppe && tom}>
        <Klokke cx={86} cy={142} r={32} viser={<Viser cx={86} cy={142} r={32} spiller={spiller && tom && !redusert} />} />
      </Ark>
    </>
  );
}

/* ───────────── Hevelse: the swelling ─────────────
   The jaw cut open. At the tip of a molar's root a sore pocket swells and
   eases, and the gum above it bulges with it. Beside the bib, a capsule:
   sometimes antibiotics are needed. */

const HEVELSE_STEG = [["vent", 400], ["hoven", 1900], ["pille", 1]] as const;
const BEN_TOPP: Pt[] = [[-20, 336], [80, 330], [200, 338], [320, 330], [420, 336]];
const GUMMI: Pt[] = [[-20, 318], [60, 310], [130, 302], [200, 318], [270, 302], [340, 310], [420, 318]];

export function Hevelse({ oppe, spiller, redusert }: PopupProps) {
  const fase = useFase(spiller && oppe, HEVELSE_STEG);
  const pille = naadd(HEVELSE_STEG, fase, "pille", redusert);
  const spill = spiller && oppe && !redusert;
  const p = { oppe, redusert, av: 3 };
  return (
    <>
      <Trykk gruppe="akutt" />
      <Ark
        n={0}
        {...p}
        over={
          <Los klasse={loop.puste} spiller={spill} style={css({ "--fra": "50% 50%" })}>
            <path d={lauv(236, 404, 30, 24, 23, 9)} fill="#E58A73" />
            <UtenSkygge>
              <path d={lauv(228, 398, 13, 9, 29, 7)} fill="#F2AE9C" />
            </UtenSkygge>
          </Los>
        }
      >
        <Ben linje={BEN_TOPP} />
        <Jeksel x={200} y={322} s={0.98} />
      </Ark>
      <Ark
        n={1}
        {...p}
        over={
          <Los klasse={loop.puste} spiller={spill} skygge={false} style={css({ "--fra": "50% 100%" })}>
            <path d="M206,320 C224,304 242,294 258,294 C274,294 292,304 310,320 Z" fill={F.sart} opacity={0.85} />
          </Los>
        }
      >
        <path d={`${kurve(GUMMI)} L420,352 C300,356 100,348 -20,352 Z`} fill={F.tannkjott} />
        <UtenSkygge>
          <path d={kurve(GUMMI.map(([x, y]) => [x, y + 12] as Pt))} fill="none" stroke={F.tannkjottMork} strokeWidth={2} opacity={0.5} />
        </UtenSkygge>
      </Ark>
      <Ark n={2} {...p} oppe={oppe && pille}>
        <g transform="rotate(-18 312 428)">
          <rect x={280} y={416} width={64} height={24} rx={12} fill={F.hvit} />
          <path d="M292,416 L312,416 L312,440 L292,440 A12,12 0 0 1 292,416 Z" fill={F.teal} />
          <path d="M290,422 Q296,419 304,420" fill="none" stroke={F.hvit} strokeWidth={2.5} strokeLinecap="round" opacity={0.7} />
        </g>
      </Ark>
    </>
  );
}

/* ───────────── Løsnet tannkrone: the loose crown ─────────────
   A crown rocks on the stump it was cemented to, crumbs of old cement
   trickling out under it; then it lifts and hangs there on its strings. */

const LOS_STEG = [["vent", 500], ["vakle", 2600], ["loft", 1]] as const;

export function LosnetTannkrone({ oppe, spiller, redusert }: PopupProps) {
  const fase = useFase(spiller && oppe, LOS_STEG);
  const løftet = naadd(LOS_STEG, fase, "loft", redusert);
  const vakler = fase === "vakle" && !redusert;
  const p = { oppe, redusert, av: 3 };
  return (
    <>
      <Trykk gruppe="akutt" />
      <Ark n={0} {...p}>
        <Stubb x={200} y={380} s={1.3} />
        <Tannkjott linje={tannkjottLinje([200], 380, 22, 82)} />
      </Ark>
      <Ark
        n={1}
        {...p}
        over={
          <>
            <Fri>
              <motion.g initial={false} animate={{ y: løftet ? -58 : 0 }} transition={redusert ? { duration: 0 } : { type: "spring", stiffness: 40, damping: 10 }}>
                <g className={loop.svev} data-on={løftet && spiller && !redusert}>
                  <UtenSkygge>
                    <motion.path d="M168,252 L150,-220 M232,252 L250,-220" stroke={F.dyp} strokeWidth={1.2} initial={false} animate={{ opacity: løftet && !redusert ? 0.7 : 0 }} transition={{ duration: 0.5 }} />
                  </UtenSkygge>
                  <motion.g
                    initial={false}
                    animate={{ rotate: vakler ? [0, -5, 4, -4, 3, 0] : 0 }}
                    style={{ originX: "15%", originY: "100%" }}
                    transition={vakler ? { duration: 1.3, repeat: 1, ease: "easeInOut" } : { duration: 0.3 }}
                  >
                    <g transform="translate(200 380) scale(1.3)">
                      <Krone />
                    </g>
                  </motion.g>
                </g>
              </motion.g>
            </Fri>
            <Flate>
              {[
                [150, 372, "0s"],
                [246, 370, "0.7s"],
                [196, 376, "1.2s"],
              ].map(([x, y, d], i) => (
                <g key={i} className={loop.drypp} data-on={vakler} style={css({ "--forsink": d as string, "--fall": "34px" })}>
                  <circle cx={x as number} cy={y as number} r={3} fill={F.metallMork} />
                </g>
              ))}
            </Flate>
          </>
        }
      />
      <Ark n={2} {...p}>
        <Smekke />
      </Ark>
    </>
  );
}
