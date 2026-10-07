"use client";

import { motion } from "framer-motion";
import { useId } from "react";
import { Ark, Flate, Fri, Los, Senk, UtenSkygge, css, loop, naadd, useFase, type PopupProps } from "../popup/Popup";
import { Ben, Bor, Fil, Fortann, Jeksel, Polerer, Skrape, Smekke, Stjerner, Tang, Tannborste, Tannkjott, Trykk, tannkjottLinje } from "../popup/deler";
import { FARGE as F, JEKSEL, PULPA, kurve, lauv, draape, snofnugg, stjerne, type Pt } from "../popup/tegning";

/* Ordinære behandlinger: the everyday work, one paper pop-up each. Every
   scene stands on the clinic's teal print; most tell a short story once
   each time they stand, and end with a few winking stars. */

const RAD = [112, 200, 288] as const;
const RAD_LINJE = tannkjottLinje(RAD, 382);
const EN_LINJE = tannkjottLinje([200], 372, 22, 82);

/* ───────────── Tannsjekk: under the lamp ─────────────
   Three molars under the dental lamp. The mirror sweeps in from the left,
   showing the far side of a tooth in its glass; from the right the probe
   taps along the grooves, and where it touches, a small star winks. */

export function Tannsjekk({ oppe, spiller, redusert }: PopupProps) {
  const glass = `glass-${useId().replace(/:/g, "")}`;
  const p = { oppe, redusert, av: 4 };
  const spill = spiller && oppe && !redusert;
  return (
    <>
      <Trykk gruppe="ordinaer" />
      <Ark
        n={0}
        {...p}
        over={
          <Los klasse={loop.lys} spiller={spill} skygge={false}>
            <path d="M232,122 L300,112 L352,350 L96,350 Z" fill={F.lys} />
          </Los>
        }
      >
        <path d="M430,-14 C392,24 340,42 302,66" fill="none" stroke={F.glomma} strokeWidth={9} strokeLinecap="round" />
        <circle cx={302} cy={66} r={8} fill={F.dyp} />
        <g transform="rotate(-10 266 98)">
          <rect x={212} y={78} width={108} height={40} rx={20} fill={F.blek} />
          <path d="M212,98 a20,20 0 0,1 20,-20 h68 a20,20 0 0,1 20,20 Z" fill={F.glomma} />
          <ellipse cx={266} cy={114} rx={42} ry={6} fill="#FFF7E0" />
        </g>
      </Ark>
      <Ark n={1} {...p}>
        {RAD.map((x) => (
          <Jeksel key={x} x={x} y={382} s={0.82} />
        ))}
        <Tannkjott linje={RAD_LINJE} />
      </Ark>
      {/* the mirror, sweeping from the foot of its rod */}
      <Ark
        n={2}
        {...p}
        over={
          <Los klasse={loop.sveip} spiller={spill} style={css({ "--fot": "5% 104%" })}>
            <path d="M118,302 L20,500" stroke={F.glomma} strokeWidth={9} strokeLinecap="round" />
            <path d="M112,314 L102,334" stroke={F.dyp} strokeWidth={13} strokeLinecap="round" />
            <circle cx={136} cy={268} r={42} fill={F.metall} />
            <circle cx={136} cy={268} r={36} fill="#EAF2F4" />
            <UtenSkygge>
              <clipPath id={glass}>
                <circle cx={136} cy={268} r={36} />
              </clipPath>
              <g clipPath={`url(#${glass})`}>
                <path d="M96,296 Q136,282 176,296 L176,320 L96,320 Z" fill={F.tannkjott} />
                <g transform="translate(136 296) scale(0.36)">
                  <path d={JEKSEL.krone} fill={F.hvit} />
                  <path d={JEKSEL.fure} fill="none" stroke={F.fure} strokeWidth={5} strokeLinecap="round" />
                </g>
              </g>
              <path d="M112,252 Q118,238 134,234" fill="none" stroke={F.hvit} strokeWidth={4} strokeLinecap="round" opacity={0.9} />
            </UtenSkygge>
          </Los>
        }
      />
      {/* the probe, tapping along the grooves */}
      <Ark
        n={3}
        {...p}
        over={
          <Los klasse={loop.bank} spiller={spill} style={css({ "--fot": "107% 98%" })}>
            <path d="M432,470 L300,332" stroke={F.glomma} strokeWidth={9} strokeLinecap="round" />
            <path d="M318,350 L306,338" stroke={F.dyp} strokeWidth={12} strokeLinecap="round" />
            <path d="M300,332 L248,294 Q228,280 214,292 Q206,300 206,308" fill="none" stroke={F.metallMork} strokeWidth={3.4} strokeLinecap="round" />
            <UtenSkygge>
              <g className={loop.blink} data-on={spill} style={css({ "--tid": "2.8s", "--forsink": "0.2s" })}>
                <path d={stjerne(214, 300, 11)} fill="#FFF3C4" />
              </g>
            </UtenSkygge>
          </Los>
        }
      />
      <Ark n={4} {...p}>
        <Smekke />
      </Ark>
    </>
  );
}

/* ───────────── Tannfylling: drilled clean and filled ─────────────
   A molar with a dark spot of decay in its groove. The drill comes in
   humming and the spot is cleaned out to a pale hollow, then the filling
   presses in, the colour of the tooth. */

const FYLL_STEG = [["vent", 500], ["bor", 1900], ["rent", 600], ["fyll", 900], ["ferdig", 1]] as const;
const HULL = "M-16,-62 C-14,-76 16,-76 20,-62 C22,-48 10,-40 2,-42 C-10,-44 -18,-50 -16,-62 Z";

export function Tannfylling({ oppe, spiller, redusert }: PopupProps) {
  const fase = useFase(spiller && oppe, FYLL_STEG);
  const nådd = (m: (typeof FYLL_STEG)[number][0]) => naadd(FYLL_STEG, fase, m, redusert);
  const borer = fase === "bor" && !redusert;
  const rent = nådd("rent");
  const fylt = nådd("fyll");
  const p = { oppe, redusert, av: 3 };
  return (
    <>
      <Trykk gruppe="ordinaer" />
      <Ark n={0} {...p}>
        <Jeksel x={200} y={372} s={1.35}>
          <UtenSkygge>
            <motion.path
              d={HULL}
              initial={false}
              animate={{ fill: rent ? "#F4E8D6" : F.hull, stroke: rent ? F.dentinMork : "rgba(0,0,0,0)" }}
              strokeWidth={1.5}
              transition={{ duration: redusert ? 0 : 0.5 }}
            />
            <motion.g initial={false} animate={{ opacity: fylt ? 1 : 0, scale: fylt ? 1 : 1.35 }} style={{ originX: "50%", originY: "50%" }} transition={redusert ? { duration: 0 } : { type: "spring", stiffness: 160, damping: 14 }}>
              <path d={HULL} fill={F.fylling} stroke={F.teal} strokeWidth={1.4} strokeOpacity={0.55} />
            </motion.g>
          </UtenSkygge>
        </Jeksel>
        <Tannkjott linje={EN_LINJE} />
      </Ark>
      {/* the drill, in for the cleaning, out again */}
      <Ark
        n={1}
        {...p}
        over={
          <Fri>
            <motion.g initial={false} animate={{ x: fase === "bor" && !redusert ? 0 : 300, y: fase === "bor" && !redusert ? 0 : -260 }} transition={{ type: "spring", stiffness: 60, damping: 14 }}>
              <Bor
                x={204}
                y={262}
                v={-8}
                hode={
                  <g className={loop.dirr} data-on={borer}>
                    <path d="M8,-30 L8,0" stroke={F.metallMork} strokeWidth={3} strokeLinecap="round" />
                    <circle cx={8} cy={0} r={3.6} fill={F.metallMork} />
                  </g>
                }
              />
            </motion.g>
          </Fri>
        }
      />
      <Ark n={2} {...p}>
        <Smekke />
        <Stjerner pts={[[112, 210, 10], [296, 196, 12], [318, 330, 8]]} spiller={spiller && fase === "ferdig" && !redusert} />
      </Ark>
    </>
  );
}

/* ───────────── Tannbleking: the tray ─────────────
   Four front teeth, a little yellow. A clear bleaching tray is lowered over
   them on strings; while it sits there the teeth turn white, then it is
   lifted off again. */

const BLEK_STEG = [["vent", 500], ["skinne", 1500], ["bleik", 2200], ["loft", 1300], ["hvit", 1]] as const;
const FORAN = [122, 174, 226, 278] as const;
const FORAN_LINJE = tannkjottLinje(FORAN, 374, 16, 30);

export function Tannbleking({ oppe, spiller, redusert }: PopupProps) {
  const fase = useFase(spiller && oppe, BLEK_STEG);
  const nådd = (m: (typeof BLEK_STEG)[number][0]) => naadd(BLEK_STEG, fase, m, redusert);
  const hvit = nådd("bleik");
  const nede = !redusert && (fase === "skinne" || fase === "bleik");
  const p = { oppe, redusert, av: 3 };
  return (
    <>
      <Trykk gruppe="ordinaer" />
      <Ark n={0} {...p}>
        {FORAN.map((x) => (
          <Fortann key={x} x={x} y={374} s={0.86} farge={hvit ? F.hvit : "#EFDDB0"} />
        ))}
        <Tannkjott linje={FORAN_LINJE} />
      </Ark>
      <Ark
        n={1}
        {...p}
        over={
          <Fri skygge={false}>
            <Senk nede={nede} redusert={redusert} snorer={{ d: "M108,276 L80,-260 M292,276 L320,-260", synlige: fase === "skinne" || fase === "loft" }} fjaer={{ stiffness: 50, damping: 11 }}>
              <path d="M92,372 C88,330 90,300 100,286 Q106,276 120,276 L280,276 Q294,276 300,286 C310,300 312,330 308,372 Z" fill="rgba(234,246,248,0.55)" stroke={F.teal} strokeWidth={2.2} />
              <path d="M108,300 Q112,290 124,288" fill="none" stroke={F.hvit} strokeWidth={4} strokeLinecap="round" />
            </Senk>
          </Fri>
        }
      />
      <Ark n={2} {...p}>
        <Smekke />
        {/* the syringe of gel, lying on the bib */}
        <g transform="rotate(-14 300 438)">
          <rect x={246} y={430} width={92} height={18} rx={9} fill={F.hvit} />
          <rect x={246} y={430} width={34} height={18} rx={9} fill={F.teal} />
          <path d="M338,439 L356,439" stroke={F.metallMork} strokeWidth={4} strokeLinecap="round" />
        </g>
        <Stjerner pts={[[96, 220, 10], [306, 214, 12], [200, 196, 8]]} spiller={spiller && fase === "hvit" && !redusert} />
      </Ark>
    </>
  );
}

/* ───────────── Tannrens: polished clean ─────────────
   Three molars with soft yellow plaque along the gum. The polisher works
   along the row, tooth by tooth, and the plaque is gone where it has been. */

const RENS_STEG = [["vent", 400], ["t1", 1100], ["t2", 1100], ["t3", 1100], ["ut", 600], ["ren", 1]] as const;
const PLAKK = [lauv(-26, -26, 16, 10, 3, 8), lauv(4, -18, 18, 9, 5, 8), lauv(30, -30, 12, 9, 7, 8)].join(" ");

export function Tannrens({ oppe, spiller, redusert }: PopupProps) {
  const fase = useFase(spiller && oppe, RENS_STEG);
  const nådd = (m: (typeof RENS_STEG)[number][0]) => naadd(RENS_STEG, fase, m, redusert);
  const ved = { t1: 0, t2: 1, t3: 2 } as Record<string, number>;
  const her = fase in ved && !redusert ? ved[fase] : -1;
  const ren = [nådd("t2"), nådd("t3"), nådd("ut")];
  const p = { oppe, redusert, av: 3 };
  return (
    <>
      <Trykk gruppe="ordinaer" />
      <Ark n={0} {...p}>
        {RAD.map((x, i) => (
          <Jeksel key={x} x={x} y={382} s={0.82}>
            <UtenSkygge>
              <motion.path d={PLAKK} fill="#E3D07E" initial={false} animate={{ opacity: ren[i] ? 0 : 0.9 }} transition={{ duration: redusert ? 0 : 0.6 }} />
            </UtenSkygge>
          </Jeksel>
        ))}
        <Tannkjott linje={RAD_LINJE} />
      </Ark>
      <Ark
        n={1}
        {...p}
        over={
          <Fri>
            <motion.g initial={false} animate={{ x: her >= 0 ? RAD[her] - 200 : 260, y: her >= 0 ? 0 : -200 }} transition={{ type: "spring", stiffness: 70, damping: 15 }}>
              <g className={loop.puss} data-on={her >= 0} style={css({ "--slag": "6px" })}>
                <Polerer x={208} y={350} v={-20} />
              </g>
            </motion.g>
          </Fri>
        }
      />
      <Ark n={2} {...p}>
        <Smekke />
        <Stjerner pts={[[96, 226, 10], [300, 206, 12], [210, 180, 8]]} spiller={spiller && fase === "ren" && !redusert} />
      </Ark>
    </>
  );
}

/* ───────────── Tannkjøttbehandling: the gum calms ─────────────
   The gum along three molars is red and puffy. A toothbrush works along
   the gum line, and the gum settles, back to a calm pink. */

const KJOTT_STEG = [["vent", 400], ["sart", 1400], ["puss", 2800], ["frisk", 1]] as const;
const HOVEN = tannkjottLinje(RAD, 376, 26, 44);

export function Tannkjottbehandling({ oppe, spiller, redusert }: PopupProps) {
  const fase = useFase(spiller && oppe, KJOTT_STEG);
  const frisk = naadd(KJOTT_STEG, fase, "puss", redusert);
  const pusser = fase === "puss" && !redusert;
  const p = { oppe, redusert, av: 3 };
  return (
    <>
      <Trykk gruppe="ordinaer" />
      <Ark n={0} {...p}>
        {RAD.map((x) => (
          <Jeksel key={x} x={x} y={382} s={0.82} />
        ))}
        <Tannkjott linje={RAD_LINJE} farge={frisk ? F.tannkjott : F.sart} strek={frisk ? F.tannkjottMork : "#B85A4D"} tid={redusert ? 0 : 2.6} />
        {/* the swelling: a puffier edge over the gum, which goes down */}
        <UtenSkygge>
          <motion.path
            d={`${kurve(HOVEN)} L420,${HOVEN[HOVEN.length - 1][1] + 16} ${kurve([...HOVEN].reverse().map(([x, y]) => [x, y + 16] as Pt)).replace("M", "L")} Z`}
            fill={F.sart}
            initial={false}
            animate={{ opacity: frisk ? 0 : 0.9 }}
            transition={{ duration: redusert ? 0 : 2.4 }}
          />
          <motion.path d={kurve(HOVEN)} fill="none" stroke="#C0574A" strokeWidth={2.5} initial={false} animate={{ opacity: frisk ? 0 : 0.8 }} transition={{ duration: redusert ? 0 : 2.4 }} />
        </UtenSkygge>
      </Ark>
      <Ark
        n={1}
        {...p}
        over={
          <Fri>
            <motion.g initial={false} animate={{ x: pusser ? 0 : 260, y: pusser ? 0 : -160 }} transition={{ type: "spring", stiffness: 60, damping: 14 }}>
              <g className={loop.puss} data-on={pusser} style={css({ "--slag": "34px" })}>
                <Tannborste x={196} y={350} v={8} />
              </g>
            </motion.g>
          </Fri>
        }
      />
      <Ark n={2} {...p}>
        <Smekke />
        <Stjerner pts={[[100, 226, 10], [300, 212, 12], [206, 186, 8]]} spiller={spiller && fase === "frisk" && !redusert} />
      </Ark>
    </>
  );
}

/* ───────────── Tannstein: scraped off ─────────────
   A hard crust of tartar sits along the neck of a molar. The scaler hooks
   under each piece in turn, and it breaks off and falls to the bib. */

const STEIN_STEG = [["vent", 500], ["s1", 950], ["s2", 950], ["s3", 950], ["ut", 600], ["ren", 1]] as const;
const SKORPE: readonly (readonly [number, number, number])[] = [
  [158, 350, 1],
  [200, 356, 2],
  [243, 350, 3],
];

export function Tannstein({ oppe, spiller, redusert }: PopupProps) {
  const fase = useFase(spiller && oppe, STEIN_STEG);
  const nådd = (m: (typeof STEIN_STEG)[number][0]) => naadd(STEIN_STEG, fase, m, redusert);
  const løs = [nådd("s2"), nådd("s3"), nådd("ut")];
  const ved = { s1: 0, s2: 1, s3: 2 } as Record<string, number>;
  const her = fase in ved && !redusert ? ved[fase] : -1;
  const p = { oppe, redusert, av: 3 };
  return (
    <>
      <Trykk gruppe="ordinaer" />
      <Ark n={0} {...p}>
        <Jeksel x={200} y={372} s={1.35} />
        <Tannkjott linje={EN_LINJE} />
      </Ark>
      <Ark
        n={1}
        {...p}
        over={
          <>
            <Fri>
              {SKORPE.map(([x, y, frø], i) => (
                <motion.g
                  key={i}
                  initial={false}
                  animate={løs[i] ? { y: redusert ? 0 : 92 + i * 4, x: (i - 1) * 18, rotate: 40 + i * 30, opacity: redusert ? 0 : 1 } : { y: 0, x: 0, rotate: 0, opacity: 1 }}
                  transition={redusert ? { duration: 0 } : { y: { type: "spring", stiffness: 90, damping: 12 }, rotate: { duration: 0.7 }, x: { duration: 0.7 } }}
                >
                  <path d={lauv(x, y, 17, 10, frø * 11, 7)} fill="#D8C995" />
                  <UtenSkygge>
                    <path d={lauv(x - 4, y - 2, 5, 3, frø * 7, 5)} fill="#C2B178" />
                  </UtenSkygge>
                </motion.g>
              ))}
            </Fri>
            <Fri>
              <motion.g
                initial={false}
                animate={her >= 0 ? { x: SKORPE[her][0] - 200, y: SKORPE[her][1] - 350 } : { x: 260, y: -220 }}
                transition={{ type: "spring", stiffness: 80, damping: 15 }}
              >
                <Skrape x={210} y={356} v={-14} />
              </motion.g>
            </Fri>
          </>
        }
      />
      <Ark n={2} {...p}>
        <Smekke />
        <Stjerner pts={[[110, 214, 10], [298, 200, 12], [318, 312, 8]]} spiller={spiller && fase === "ren" && !redusert} />
      </Ark>
    </>
  );
}

/* ───────────── Rotfylling: the canals ─────────────
   A molar held up as a specimen, its nerve red and beating. The nerve is
   cleaned out with a fine file, leaving the empty canals; they fill from
   the root tips up, and a filling seals the top. */

const ROT_STEG = [["vent", 400], ["betent", 1800], ["rens", 2000], ["fyll", 1800], ["forsegl", 1]] as const;
const LOKK = "M-22,-88 Q-10,-78 0,-86 Q10,-78 22,-88 L20,-66 Q0,-58 -20,-66 Z";

export function Rotfylling({ oppe, spiller, redusert }: PopupProps) {
  const fase = useFase(spiller && oppe, ROT_STEG);
  const nådd = (m: (typeof ROT_STEG)[number][0]) => naadd(ROT_STEG, fase, m, redusert);
  const id = useId().replace(/:/g, "");
  const tom = nådd("rens");
  const fylt = nådd("fyll");
  const lukket = nådd("forsegl");
  const betent = fase === "betent" && !redusert;
  const filer = fase === "rens" && !redusert;
  const p = { oppe, redusert, av: 3 };
  return (
    <>
      <Trykk gruppe="ordinaer">
        <ellipse cx={200} cy={448} rx={92} ry={10} fill={F.dyp} opacity={0.08} />
      </Trykk>
      <Ark n={0} {...p}>
        <Jeksel x={200} y={318} s={1.42}>
          <UtenSkygge>
            <motion.path
              d={PULPA}
              className={loop.glod}
              data-on={betent}
              initial={false}
              animate={{ fill: tom ? "#F7EEE2" : F.smerte, stroke: tom ? F.dentinMork : "rgba(0,0,0,0)" }}
              strokeWidth={1.2}
              transition={{ duration: redusert ? 0 : 0.8 }}
            />
            <clipPath id={`kanal-${id}`}>
              <path d={PULPA} />
            </clipPath>
            <g clipPath={`url(#kanal-${id})`}>
              <motion.rect x={-40} width={80} height={200} fill="#E59A7A" initial={false} animate={{ y: fylt ? -80 : 80 }} transition={{ duration: redusert ? 0 : 1.6, ease: [0.4, 0, 0.2, 1] }} />
            </g>
            <motion.path d={LOKK} fill={F.fylling} stroke={F.teal} strokeWidth={1.2} strokeOpacity={0.6} initial={false} animate={{ opacity: lukket ? 1 : 0 }} transition={{ duration: redusert ? 0 : 0.4 }} />
          </UtenSkygge>
        </Jeksel>
      </Ark>
      <Ark
        n={1}
        {...p}
        over={
          <Fri>
            <motion.g initial={false} animate={{ y: filer ? 0 : -360 }} transition={{ type: "spring", stiffness: 70, damping: 14 }}>
              <motion.g initial={false} animate={filer ? { y: [0, 34, 0] } : { y: 0 }} transition={filer ? { duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: 0.6 } : { duration: 0 }}>
                <Fil x={188} y={286} v={4} />
              </motion.g>
            </motion.g>
          </Fri>
        }
      />
      <Ark n={2} {...p} skygge={false}>
        <Stjerner pts={[[96, 170, 10], [306, 150, 13], [320, 318, 9], [84, 320, 8]]} spiller={spiller && fase === "forsegl" && !redusert} />
      </Ark>
    </>
  );
}

/* ───────────── Munntørrhet: a drink of water ─────────────
   The gum is pale and dry, with fine cracks. A glass tips, drops fall, and
   the gum turns moist and pink again, with a wet shine. */

const TORR_STEG = [["vent", 400], ["torr", 1500], ["drypp", 2600], ["fukt", 1]] as const;
const SPREKKER = "M70,402 l8,8 l-3,9 M150,396 l-6,10 l5,8 M236,404 l7,7 l-2,10 M318,398 l-5,9 l6,9";

export function Munntorrhet({ oppe, spiller, redusert }: PopupProps) {
  const fase = useFase(spiller && oppe, TORR_STEG);
  const fukt = naadd(TORR_STEG, fase, "fukt", redusert);
  const drypper = fase === "drypp" && !redusert;
  const p = { oppe, redusert, av: 3 };
  return (
    <>
      <Trykk gruppe="ordinaer" />
      <Ark n={0} {...p}>
        {RAD.map((x) => (
          <Jeksel key={x} x={x} y={382} s={0.82} />
        ))}
        <Tannkjott linje={RAD_LINJE} farge={fukt ? F.tannkjott : "#E9CBC0"} strek={fukt ? F.tannkjottMork : "#D3AFA3"} tid={redusert ? 0 : 1.2} />
        <UtenSkygge>
          <motion.path d={SPREKKER} fill="none" stroke="#C99A8E" strokeWidth={1.6} strokeLinecap="round" initial={false} animate={{ opacity: fukt ? 0 : 1 }} transition={{ duration: redusert ? 0 : 1 }} />
          <motion.path
            d="M60,384 Q84,376 100,380 M186,382 Q204,376 222,380 M280,384 Q298,378 318,382"
            fill="none"
            stroke={F.hvit}
            strokeWidth={3}
            strokeLinecap="round"
            initial={false}
            animate={{ opacity: fukt ? 0.85 : 0 }}
            transition={{ duration: redusert ? 0 : 1 }}
          />
        </UtenSkygge>
      </Ark>
      {/* the glass, tipping over the teeth */}
      <Ark
        n={1}
        {...p}
        over={
          <>
            <Fri>
              <motion.g initial={false} animate={{ rotate: drypper ? -32 : 0 }} style={{ originX: "50%", originY: "100%" }} transition={{ type: "spring", stiffness: 50, damping: 12 }}>
                <path d="M262,128 L338,128 L330,236 Q329,244 320,244 L280,244 Q271,244 270,236 Z" fill="rgba(234,246,248,0.9)" stroke={F.metallMork} strokeWidth={2} />
                <path d="M266,170 L334,170 L330,236 Q329,244 320,244 L280,244 Q271,244 270,236 Z" fill={F.kulde} opacity={0.7} />
                <path d="M276,140 L280,228" stroke={F.hvit} strokeWidth={5} strokeLinecap="round" opacity={0.9} />
              </motion.g>
            </Fri>
            <Flate>
              {[
                [244, 214, "0s"],
                [230, 220, "0.5s"],
                [256, 226, "1s"],
              ].map(([x, y, d], i) => (
                <g key={i} className={loop.drypp} data-on={drypper} style={css({ "--forsink": d as string, "--fall": "120px" })}>
                  <path d={draape(x as number, y as number, 6)} fill={F.kulde} />
                </g>
              ))}
            </Flate>
          </>
        }
      />
      <Ark n={2} {...p}>
        <Smekke />
        <Stjerner pts={[[96, 220, 10], [168, 186, 8], [80, 300, 7]]} spiller={spiller && fase === "fukt" && !redusert} />
      </Ark>
    </>
  );
}

/* ───────────── Tanngnissing: the night splint ─────────────
   Night, with a moon in the print. The lower teeth grind against the
   upper; the jaw opens, a clear bite splint slides in over the lower
   teeth, the jaw closes on it, and the grinding stops. */

const GNIS_STEG = [["vent", 400], ["gnis", 2600], ["apne", 600], ["skinne", 900], ["lukk", 700], ["hvile", 1]] as const;
const PAR = [146, 254] as const;
const OVRE_LINJE: Pt[] = tannkjottLinje(PAR, 168, 20, 50).map(([x, y]) => [x, 336 - y] as Pt);
const NEDRE_LINJE = tannkjottLinje(PAR, 360, 20, 50);

export function Tanngnissing({ oppe, spiller, redusert }: PopupProps) {
  const fase = useFase(spiller && oppe, GNIS_STEG);
  const nådd = (m: (typeof GNIS_STEG)[number][0]) => naadd(GNIS_STEG, fase, m, redusert);
  const gnisser = fase === "gnis" && !redusert;
  const apen = !redusert && (fase === "apne" || fase === "skinne");
  const skinne = nådd("skinne");
  const ro = nådd("hvile");
  const p = { oppe, redusert, av: 4 };
  return (
    <>
      <Trykk gruppe="ordinaer">
        <path d="M70,42 A28,28 0 1 0 100,78 A22,22 0 1 1 70,42 Z" fill={F.dyp} opacity={0.2} />
        <path d={`${stjerne(318, 52, 6)} ${stjerne(352, 92, 4)} ${stjerne(140, 40, 4)}`} fill={F.dyp} opacity={0.18} />
      </Trykk>
      {/* the upper jaw, hanging from the top of the page */}
      <Ark n={0} {...p}>
        {PAR.map((x) => (
          <g key={x} transform={`rotate(180 ${x} 168)`}>
            <Jeksel x={x} y={168} s={0.9} rot={false} />
          </g>
        ))}
        <path d={`${kurve(OVRE_LINJE)} L420,128 C300,124 100,132 -20,128 Z`} fill={F.tannkjott} />
        <UtenSkygge>
          <path d={kurve(OVRE_LINJE.map(([x, y]) => [x, y - 14] as Pt))} fill="none" stroke={F.tannkjottMork} strokeWidth={2} opacity={0.55} />
        </UtenSkygge>
      </Ark>
      {/* the lower jaw, grinding */}
      <Ark
        n={1}
        {...p}
        over={
          <Fri>
            <motion.g initial={false} animate={{ y: apen ? 34 : skinne ? 12 : 0 }} transition={{ type: "spring", stiffness: 90, damping: 14 }}>
              <g className={loop.gnis} data-on={gnisser}>
                {PAR.map((x) => (
                  <Jeksel key={x} x={x} y={360} s={0.9} rot={false} />
                ))}
                <Tannkjott linje={NEDRE_LINJE} />
              </g>
              {/* the splint, sliding in over the lower teeth */}
              <motion.g initial={false} animate={{ x: skinne ? 0 : -420 }} transition={redusert ? { duration: 0 } : { type: "spring", stiffness: 55, damping: 13 }}>
                <path d="M86,290 Q86,260 112,258 L288,258 Q314,260 314,290 L314,322 Q260,316 200,318 Q140,316 86,322 Z" fill="rgba(45,164,180,0.28)" stroke={F.teal} strokeWidth={2.2} />
                <UtenSkygge>
                  <path d="M104,274 Q110,266 128,266" fill="none" stroke={F.hvit} strokeWidth={4} strokeLinecap="round" />
                </UtenSkygge>
              </motion.g>
            </motion.g>
          </Fri>
        }
      />
      {/* sparks where the teeth grind */}
      <Ark n={2} {...p} skygge={false}>
        {[
          [118, 266, "0s"],
          [200, 262, "0.3s"],
          [282, 266, "0.6s"],
        ].map(([x, y, d], i) => (
          <g key={i} className={loop.blink} data-on={gnisser} style={css({ "--tid": "0.9s", "--forsink": d as string })}>
            <path d={`M${(x as number) - 8},${y} l5,-6 l3,6 l5,-6 l3,6`} fill="none" stroke={F.smerte} strokeWidth={2.4} strokeLinejoin="round" />
          </g>
        ))}
      </Ark>
      <Ark n={3} {...p}>
        <Smekke />
        <Stjerner pts={[[330, 220, 9], [72, 300, 8], [330, 330, 7]]} spiller={spiller && ro && !redusert} />
      </Ark>
    </>
  );
}

/* ───────────── Ising i tenner: the cold ─────────────
   The gum has drawn back from a molar and a strip of root shows, a darker
   yellow. An ice cube hangs above in falling snow, and cold flashes out of
   the bare root. */

const ISNING_LINJE = tannkjottLinje([200], 400, 16, 82);
const KALDE = [
  "M146,384 l-14,-6 l6,-8 l-16,-6",
  "M140,404 l-18,2 l4,-9 l-18,0",
  "M254,384 l14,-6 l-6,-8 l16,-6",
  "M260,404 l18,2 l-4,-9 l18,0",
];

export function IsingITenner({ oppe, spiller, redusert }: PopupProps) {
  const spill = spiller && oppe && !redusert;
  const p = { oppe, redusert, av: 3 };
  return (
    <>
      <Trykk gruppe="ordinaer" />
      <Ark n={0} {...p}>
        <Jeksel x={200} y={372} s={1.3}>
          <path d={JEKSEL.rotter} fill={F.dentin} />
          <path d="M38,-6 L50,-6 C48,14 44,40 36,70 L28,36 C34,16 38,4 38,-6 Z" fill={F.dentinMork} opacity={0.7} />
        </Jeksel>
        <Tannkjott linje={ISNING_LINJE} />
      </Ark>
      <Ark
        n={1}
        {...p}
        over={
          <Flate>
            {KALDE.map((d, i) => (
              <g key={i} className={loop.isne} data-on={spill} style={css({ "--forsink": `${(i % 2) * 0.35 + (i > 1 ? 1.1 : 0)}s` })}>
                <path d={d} fill="none" stroke={F.kulde} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
              </g>
            ))}
          </Flate>
        }
      />
      {/* the ice cube, and the snow drifting off it */}
      <Ark
        n={2}
        {...p}
        over={
          <>
            <Los klasse={loop.drive} spiller={spill}>
              <g transform="rotate(-12 116 150)">
                <rect x={78} y={112} width={76} height={76} rx={14} fill="#DDF0F5" />
                <path d="M78,150 L78,126 Q78,112 92,112 L140,112 Q154,112 154,126 L154,136 Z" fill={F.hvit} opacity={0.7} />
                <path d="M138,124 L144,166" stroke={F.kulde} strokeWidth={3} strokeLinecap="round" />
              </g>
            </Los>
            <Flate>
              {[
                [92, 210, "0s", "6s"],
                [140, 196, "1.4s", "5s"],
                [300, 150, "0.6s", "6.5s"],
                [330, 200, "2.4s", "5.5s"],
                [262, 120, "3.2s", "6s"],
              ].map(([x, y, d, t], i) => (
                <g key={i} className={loop.sno} data-on={spill} style={css({ "--forsink": d as string, "--tid": t as string, "--drift": `${i % 2 ? -14 : 14}px` })}>
                  <path d={snofnugg(x as number, y as number, 7)} stroke={F.kulde} strokeWidth={2} strokeLinecap="round" />
                </g>
              ))}
            </Flate>
          </>
        }
      />
    </>
  );
}

/* ───────────── Trekking av tenner: lifted out ─────────────
   Three molars; the middle one is dark with decay. The forceps come down,
   take hold, rock it gently, and lift it out by the roots, leaving the gap. */

const TREKK_STEG = [["vent", 500], ["grep", 1200], ["vrikk", 1100], ["loft", 1500], ["tom", 1]] as const;

export function TrekkingAvTenner({ oppe, spiller, redusert }: PopupProps) {
  const fase = useFase(spiller && oppe, TREKK_STEG);
  const ute = naadd(TREKK_STEG, fase, "loft", redusert);
  const tang = !redusert && (fase === "grep" || fase === "vrikk" || fase === "loft");
  const vrikk = fase === "vrikk" && !redusert;
  const løft = { y: ute ? -560 : 0, rotate: vrikk ? [0, -4, 3, -3, 0] : 0 };
  const fart = vrikk ? { rotate: { duration: 1, ease: "easeInOut" as const } } : { y: { duration: redusert ? 0 : 1.4, ease: [0.5, 0, 0.3, 1] as const } };
  const p = { oppe, redusert, av: 3 };
  return (
    <>
      <Trykk gruppe="ordinaer" />
      <Ark
        n={0}
        {...p}
        over={
          <Fri>
            <motion.g initial={false} animate={løft} style={{ originX: "50%", originY: "100%" }} transition={fart}>
              <Jeksel x={200} y={382} s={0.82} farge="#F2EDE3">
                <UtenSkygge>
                  <path d="M-8,-84 C-4,-94 20,-92 22,-80 C24,-66 8,-60 0,-64 C-10,-68 -12,-76 -8,-84 Z" fill={F.hull} />
                  <path d="M-30,-60 C-22,-50 -24,-36 -34,-30" fill="none" stroke="#B9A98F" strokeWidth={3} strokeLinecap="round" />
                </UtenSkygge>
              </Jeksel>
            </motion.g>
          </Fri>
        }
      >
        <Jeksel x={112} y={382} s={0.82} />
        <Jeksel x={288} y={382} s={0.82} />
      </Ark>
      <Ark n={1} {...p}>
        <Tannkjott linje={RAD_LINJE} />
      </Ark>
      <Ark
        n={2}
        {...p}
        over={
          <Fri>
            <motion.g initial={false} animate={{ y: tang ? (ute ? -560 : 0) : -560, opacity: tang ? 1 : 0 }} transition={ute ? { y: { duration: 1.4, ease: [0.5, 0, 0.3, 1] } } : { type: "spring", stiffness: 60, damping: 13 }}>
              <motion.g initial={false} animate={{ rotate: vrikk ? [0, -4, 3, -3, 0] : 0 }} style={{ originX: "50%", originY: "100%" }} transition={{ duration: 1, ease: "easeInOut" }}>
                <Tang x={200} y={350} w={90} />
              </motion.g>
            </motion.g>
          </Fri>
        }
      >
        <Smekke />
        <Stjerner pts={[[112, 222, 10], [288, 206, 12], [200, 250, 8]]} spiller={spiller && fase === "tom" && !redusert} />
      </Ark>
    </>
  );
}

/* ───────────── Dårlig ånde: brushed fresh ─────────────
   A grey-green cloud hangs over four front teeth. The toothbrush goes to
   work, the cloud thins away, and a fresh teal breeze curls past. */

const ANDE_STEG = [["vent", 400], ["ande", 1700], ["puss", 2600], ["frisk", 1]] as const;

export function DarligAnde({ oppe, spiller, redusert }: PopupProps) {
  const fase = useFase(spiller && oppe, ANDE_STEG);
  const pusser = fase === "puss" && !redusert;
  const borte = naadd(ANDE_STEG, fase, "puss", redusert);
  const frisk = naadd(ANDE_STEG, fase, "frisk", redusert);
  const spill = spiller && oppe && !redusert;
  const p = { oppe, redusert, av: 4 };
  const sky = [lauv(170, 190, 52, 34, 41, 9), lauv(230, 176, 46, 34, 43, 9), lauv(212, 214, 54, 28, 45, 9)].join(" ");
  return (
    <>
      <Trykk gruppe="ordinaer" />
      <Ark n={0} {...p}>
        {FORAN.map((x) => (
          <Fortann key={x} x={x} y={374} s={0.86} />
        ))}
        <Tannkjott linje={FORAN_LINJE} />
      </Ark>
      {/* the cloud, drifting until the brush has done its work */}
      <Ark
        n={1}
        {...p}
        over={
          <motion.div className="absolute inset-0" initial={false} animate={{ opacity: borte ? 0 : 1, scale: borte ? 0.7 : 1 }} transition={{ duration: redusert ? 0 : 2.2 }}>
            <Los klasse={loop.drive} spiller={spill && !borte}>
              <path d={sky} fill="#D6DAC6" />
              <UtenSkygge>
                <path d="M160,170 q8,-10 0,-20 q-8,-10 0,-20 M204,156 q8,-10 0,-20 q-8,-10 0,-20 M248,166 q8,-10 0,-20 q-8,-10 0,-20" fill="none" stroke="#AEB591" strokeWidth={3} strokeLinecap="round" />
              </UtenSkygge>
            </Los>
          </motion.div>
        }
      />
      <Ark
        n={2}
        {...p}
        over={
          <Fri>
            <motion.g initial={false} animate={{ x: pusser ? 0 : 260, y: pusser ? 0 : -160 }} transition={{ type: "spring", stiffness: 60, damping: 14 }}>
              <g className={loop.puss} data-on={pusser} style={css({ "--slag": "40px" })}>
                <Tannborste x={196} y={326} v={4} />
              </g>
            </motion.g>
          </Fri>
        }
      />
      <Ark n={3} {...p} skygge={false}>
        <UtenSkygge>
          <motion.path
            d="M86,214 C126,186 170,232 214,204 C246,184 280,196 296,214 M120,250 C160,232 200,262 250,242"
            fill="none"
            stroke={F.teal}
            strokeWidth={3}
            strokeLinecap="round"
            initial={false}
            animate={{ pathLength: frisk ? 1 : 0, opacity: frisk ? 0.8 : 0 }}
            transition={{ duration: redusert ? 0 : 1.4, ease: [0.4, 0, 0.2, 1] }}
          />
        </UtenSkygge>
        <Stjerner pts={[[310, 186, 11], [96, 176, 9]]} spiller={spiller && fase === "frisk" && !redusert} />
      </Ark>
    </>
  );
}

/* ───────────── Visdomstenner: the stuck one ─────────────
   The jaw cut open: two molars standing in the bone, and at the back the
   wisdom tooth lying crooked under the gum, pressed against its neighbour
   and sore. Strings lift it out, and the jaw is left calm. */

const VISDOM_STEG = [["vent", 500], ["klemt", 2200], ["loft", 1800], ["tom", 1]] as const;
const BEN_TOPP: Pt[] = [[-20, 336], [80, 330], [200, 338], [320, 330], [420, 336]];
const GUMMI: Pt[] = [[-20, 318], [30, 308], [86, 320], [140, 302], [196, 320], [250, 306], [320, 316], [420, 318]];

export function Visdomstenner({ oppe, spiller, redusert }: PopupProps) {
  const fase = useFase(spiller && oppe, VISDOM_STEG);
  const ute = naadd(VISDOM_STEG, fase, "loft", redusert);
  const sar = fase === "klemt" && !redusert;
  const p = { oppe, redusert, av: 3 };
  return (
    <>
      <Trykk gruppe="ordinaer" />
      <Ark
        n={0}
        {...p}
        over={
          <Fri>
            <motion.g initial={false} animate={{ y: ute ? -520 : 0, rotate: ute ? 38 : 0 }} style={{ originX: "50%", originY: "50%" }} transition={redusert ? { duration: 0 } : { duration: 1.7, ease: [0.5, 0, 0.3, 1] }}>
              <UtenSkygge>
                <motion.path d="M290,374 L270,-120 M314,366 L330,-120" stroke={F.dyp} strokeWidth={1.2} initial={false} animate={{ opacity: fase === "loft" ? 0.7 : 0 }} transition={{ duration: 0.4 }} />
              </UtenSkygge>
              <g transform="rotate(-40 300 392)">
                <Jeksel x={300} y={392} s={0.78} />
              </g>
              <UtenSkygge>
                {[0, 0.8].map((d) => (
                  <g key={d} className={loop.ring} data-on={sar} style={css({ "--forsink": `${d}s` })}>
                    <circle cx={276} cy={362} r={44} fill="none" stroke={F.smerte} strokeWidth={3} />
                  </g>
                ))}
              </UtenSkygge>
            </motion.g>
          </Fri>
        }
      >
        <Ben linje={BEN_TOPP} />
        <Jeksel x={86} y={322} s={0.92} />
        <Jeksel x={196} y={322} s={0.92} />
      </Ark>
      <Ark n={1} {...p}>
        <path d={`${kurve(GUMMI)} L420,352 C300,356 100,348 -20,352 Z`} fill={F.tannkjott} />
        <UtenSkygge>
          <path d={kurve(GUMMI.map(([x, y]) => [x, y + 12] as Pt))} fill="none" stroke={F.tannkjottMork} strokeWidth={2} opacity={0.5} />
        </UtenSkygge>
      </Ark>
      <Ark n={2} {...p} skygge={false}>
        <Stjerner pts={[[300, 196, 12], [96, 170, 9], [340, 270, 8]]} spiller={spiller && fase === "tom" && !redusert} />
      </Ark>
    </>
  );
}

