"use client";

import { motion } from "framer-motion";
import { useId } from "react";
import { Ark, Fri, Senk, UtenSkygge, naadd, useFase, type PopupProps } from "../popup/Popup";
import { Ben, Fortann, Jeksel, Krone, Smekke, Stjerner, Stubb, Tannkjott, Trykk, tannkjottLinje } from "../popup/deler";
import { FARGE as F, FORTANN, implantat, kurve, lauv, type Pt } from "../popup/tegning";

/* Estetisk tannbehandling: what is made and fitted, printed in birch
   green. Most of these are lowered onto the page on strings, like the
   pieces of a model, and settle into place. */

const LEGG_STEG = [["vent", 600], ["senk", 2400], ["hvile", 1]] as const;

/** The usual story: wait, lower the piece on its strings, rest. */
function useLegg(spiller: boolean, oppe: boolean, redusert: boolean) {
  const fase = useFase(spiller && oppe, LEGG_STEG);
  return {
    fase,
    nede: naadd(LEGG_STEG, fase, "senk", redusert),
    snorer: fase === "senk",
    hvile: spiller && fase === "hvile" && !redusert,
  };
}

/* ───────────── Tannkrone: the cap ─────────────
   Between two healthy molars stands one ground down to a stump. A crown is
   lowered over it on strings and settles. */

const KRONE_RAD = [78, 200, 322] as const;

export function Tannkrone({ oppe, spiller, redusert }: PopupProps) {
  const { nede, snorer, hvile } = useLegg(spiller, oppe, redusert);
  const p = { oppe, redusert, av: 3 };
  return (
    <>
      <Trykk gruppe="estetisk" />
      <Ark n={0} {...p}>
        <Jeksel x={78} y={372} s={0.92} rot={false} />
        <Stubb x={200} y={372} s={0.92} />
        <Jeksel x={322} y={372} s={0.92} rot={false} />
        <Tannkjott linje={tannkjottLinje(KRONE_RAD, 372, 20, 50)} />
      </Ark>
      <Ark
        n={1}
        {...p}
        over={
          <Fri>
            <Senk nede={nede} redusert={redusert} snorer={{ d: "M172,284 L156,-200 M228,284 L244,-200", synlige: snorer }}>
              <g transform="translate(200 372) scale(0.92)">
                <Krone />
              </g>
            </Senk>
          </Fri>
        }
      />
      <Ark n={2} {...p}>
        <Smekke />
        <Stjerner pts={[[110, 200, 10], [292, 186, 12], [200, 160, 8]]} spiller={hvile} farge="#7E9363" />
      </Ark>
    </>
  );
}

/* ───────────── Tannbro: across the gap ─────────────
   A tooth is missing; the teeth on either side are ground down. A bridge of
   three joined crowns is lowered onto the two, and the middle one fills
   the gap. */

const BRO_RAD = [40, 120, 200, 280, 360] as const;
const BRO_LINJE: Pt[] = tannkjottLinje(BRO_RAD, 372, 18, 40).map(([x, y]) => (x === 200 ? [x, 360] : [x, y]) as Pt);

export function Tannbro({ oppe, spiller, redusert }: PopupProps) {
  const { nede, snorer, hvile } = useLegg(spiller, oppe, redusert);
  const p = { oppe, redusert, av: 3 };
  return (
    <>
      <Trykk gruppe="estetisk" />
      <Ark n={0} {...p}>
        <Jeksel x={40} y={372} s={0.74} rot={false} />
        <Stubb x={120} y={372} s={0.74} />
        <Stubb x={280} y={372} s={0.74} />
        <Jeksel x={360} y={372} s={0.74} rot={false} />
        <Tannkjott linje={BRO_LINJE} />
      </Ark>
      <Ark
        n={1}
        {...p}
        over={
          <Fri>
            <Senk nede={nede} redusert={redusert} snorer={{ d: "M100,302 L84,-200 M140,302 L130,-200 M260,302 L270,-200 M300,302 L316,-200", synlige: snorer }}>
              <path d="M120,318 L280,318 L280,350 L120,350 Z" fill={F.skyggeside} />
              {[120, 200, 280].map((x) => (
                <g key={x} transform={`translate(${x} ${x === 200 ? 364 : 372}) scale(0.74)`}>
                  <Krone />
                </g>
              ))}
            </Senk>
          </Fri>
        }
      />
      <Ark n={2} {...p}>
        <Smekke />
        <Stjerner pts={[[96, 206, 10], [304, 196, 12], [200, 170, 8]]} spiller={hvile} farge="#7E9363" />
      </Ark>
    </>
  );
}

/* ───────────── Skallfasetter: the shells ─────────────
   Four front teeth with stains. A thin white shell is pressed onto each in
   turn; when the last is on, the seams fade and the row is even. */

const SKALL_STEG = [["vent", 600], ["f1", 450], ["f2", 450], ["f3", 450], ["f4", 700], ["ferdig", 1]] as const;
const FORAN = [122, 174, 226, 278] as const;
const FLEKK = [lauv(-8, -60, 12, 9, 51, 7), lauv(10, -34, 9, 7, 53, 7), lauv(-12, -24, 7, 6, 57, 6)];

export function Skallfasetter({ oppe, spiller, redusert }: PopupProps) {
  const fase = useFase(spiller && oppe, SKALL_STEG);
  const nådd = (m: (typeof SKALL_STEG)[number][0]) => naadd(SKALL_STEG, fase, m, redusert);
  const på = [nådd("f1"), nådd("f2"), nådd("f3"), nådd("f4")];
  const ferdig = nådd("ferdig");
  const p = { oppe, redusert, av: 3 };
  return (
    <>
      <Trykk gruppe="estetisk" />
      <Ark n={0} {...p}>
        {FORAN.map((x, i) => (
          <Fortann key={x} x={x} y={374} s={0.86} farge="#F6EEDC">
            <UtenSkygge>
              <path d={FLEKK[i % 3]} fill="#E2CC9C" opacity={0.75} />
            </UtenSkygge>
          </Fortann>
        ))}
        <Tannkjott linje={tannkjottLinje(FORAN, 374, 16, 30)} />
      </Ark>
      <Ark
        n={1}
        {...p}
        over={
          <Fri>
            {FORAN.map((x, i) => (
              <motion.g
                key={x}
                initial={false}
                animate={på[i] ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 1.3, y: -36 }}
                style={{ originX: "50%", originY: "50%" }}
                transition={redusert ? { duration: 0 } : { type: "spring", stiffness: 120, damping: 14 }}
              >
                <g transform={`translate(${x} 374) scale(0.88 0.87)`}>
                  <path d={FORTANN.krone} fill={F.hvit} />
                  <path d={FORTANN.kroneSkygge} fill={F.skyggeside} opacity={0.7} />
                  <UtenSkygge>
                    <path d={FORTANN.glans} fill="none" stroke="#EEF3F4" strokeWidth={3} strokeLinecap="round" />
                    <motion.path d={FORTANN.krone} fill="none" stroke={F.teal} strokeWidth={1.4} initial={false} animate={{ opacity: ferdig ? 0 : 0.55 }} transition={{ duration: redusert ? 0 : 0.8 }} />
                  </UtenSkygge>
                </g>
              </motion.g>
            ))}
          </Fri>
        }
      />
      <Ark n={2} {...p}>
        <Smekke />
        <Stjerner pts={[[96, 214, 10], [306, 204, 12], [200, 180, 8]]} spiller={spiller && fase === "ferdig" && !redusert} farge="#7E9363" />
      </Ark>
    </>
  );
}

/* ───────────── Tannimplantat: the screw and the crown ─────────────
   The jaw cut open: bone below, gum on top, a tooth on either side with
   its roots in the bone, and a gap between them. An implant is lowered on
   strings and screws itself down into the bone; then the crown is lowered
   onto it and settles. */

const IMPL_STEG = [["vent", 500], ["inn", 1500], ["skru", 1900], ["krone", 2400], ["hvile", 1]] as const;
const BEN_TOPP: Pt[] = [[-20, 336], [80, 330], [200, 338], [320, 330], [420, 336]];
const GUMMI: Pt[] = [[-20, 318], [30, 308], [78, 320], [128, 300], [200, 314], [272, 300], [322, 320], [370, 308], [420, 318]];

/** A band of gum over bone, cut through. */
function Gummi({ linje }: { linje: readonly Pt[] }) {
  return (
    <>
      <path d={`${kurve(linje)} L420,352 C300,356 100,348 -20,352 Z`} fill={F.tannkjott} />
      <UtenSkygge>
        <path d={kurve(linje.map(([x, y]) => [x, y + 12] as Pt))} fill="none" stroke={F.tannkjottMork} strokeWidth={2} opacity={0.5} />
      </UtenSkygge>
    </>
  );
}

export function Tannimplantat({ oppe, spiller, redusert }: PopupProps) {
  const fase = useFase(spiller && oppe, IMPL_STEG);
  const ferdig = redusert && fase !== "av";
  const skrueY = ferdig || fase === "skru" || fase === "krone" || fase === "hvile" ? 0 : fase === "inn" ? -22 : -520;
  const kroneY = ferdig || fase === "krone" || fase === "hvile" ? 0 : -520;
  const trader = !redusert && (fase === "inn" || fase === "krone");
  const sk = implantat(92);
  const id = useId().replace(/:/g, "");
  const p = { oppe, redusert, av: 3 };

  return (
    <>
      <Trykk gruppe="estetisk" />
      <Ark n={0} {...p}>
        <Ben linje={BEN_TOPP} />
      </Ark>
      <Ark
        n={1}
        {...p}
        over={
          <Fri skygge={false}>
            <motion.g
              initial={false}
              animate={{ y: skrueY }}
              transition={redusert ? { duration: 0 } : fase === "inn" ? { type: "spring", stiffness: 40, damping: 11 } : { duration: 1.6, ease: [0.4, 0, 0.2, 1] }}
            >
              <g transform="translate(200 340)">
                <motion.path d="M-14,-26 L-34,-560 M14,-26 L34,-560" stroke={F.dyp} strokeWidth={1.2} initial={false} animate={{ opacity: trader && fase === "inn" ? 0.7 : 0 }} transition={{ duration: 0.4 }} />
                <path d={sk.distanse} fill={F.metall} />
                <path d={sk.skrue} fill={F.metall} />
                <path d="M6,0 L18,0 L11,84 Q6,92 2,86 Z" fill={F.metallMork} opacity={0.5} />
                <clipPath id={`skr-${id}`}>
                  <path d={sk.skrue} />
                </clipPath>
                <g clipPath={`url(#skr-${id})`}>
                  <motion.path
                    d={sk.gjenger}
                    stroke={F.metallMork}
                    strokeWidth={2.4}
                    initial={false}
                    animate={fase === "skru" && !redusert ? { y: [0, 8] } : { y: 0 }}
                    transition={fase === "skru" ? { duration: 0.36, repeat: 4, ease: "linear" } : { duration: 0 }}
                  />
                </g>
              </g>
            </motion.g>
          </Fri>
        }
      >
        <Jeksel x={78} y={322} s={0.92} />
        <Jeksel x={322} y={322} s={0.92} />
      </Ark>
      <Ark
        n={2}
        {...p}
        over={
          <Fri skygge={false}>
            <motion.g
              initial={false}
              animate={{ y: kroneY }}
              transition={redusert ? { duration: 0 } : fase === "krone" ? { type: "spring", stiffness: 42, damping: 8, mass: 1.1 } : { duration: 0.6 }}
            >
              <g transform="translate(200 321) scale(0.92)">
                <motion.path d="M-30,-98 L-46,-640 M30,-98 L46,-640" stroke={F.dyp} strokeWidth={1.2} initial={false} animate={{ opacity: trader && fase === "krone" ? 0.7 : 0 }} transition={{ duration: 0.5 }} />
                <Krone />
              </g>
            </motion.g>
          </Fri>
        }
      >
        <Gummi linje={GUMMI} />
      </Ark>
      <Ark n={3} {...p}>
        <Smekke />
      </Ark>
    </>
  );
}

/* ───────────── Delprotese: the partial plate ─────────────
   Two teeth are missing between two that stand. A pink plate carrying two
   teeth is lowered into the gap, and its metal clasps take hold of the
   teeth on either side. */

const DEL_LINJE: Pt[] = [[-20, 362], [16, 352], [60, 374], [104, 352], [150, 364], [200, 366], [250, 364], [296, 352], [340, 374], [384, 352], [420, 362]];

export function Delprotese({ oppe, spiller, redusert }: PopupProps) {
  const { nede, snorer, hvile } = useLegg(spiller, oppe, redusert);
  const p = { oppe, redusert, av: 3 };
  return (
    <>
      <Trykk gruppe="estetisk" />
      <Ark n={0} {...p}>
        <Jeksel x={60} y={372} s={0.8} rot={false} />
        <Jeksel x={340} y={372} s={0.8} rot={false} />
        <Tannkjott linje={DEL_LINJE} />
      </Ark>
      <Ark
        n={1}
        {...p}
        over={
          <Fri>
            <Senk nede={nede} redusert={redusert} snorer={{ d: "M128,300 L108,-200 M272,300 L292,-200", synlige: snorer }}>
              <path d="M106,388 C104,366 112,352 128,350 L272,350 Q290,352 294,366 L294,388 Q200,398 106,388 Z" fill="#E59C93" />
              {[150, 250].map((x) => (
                <g key={x} transform={`translate(${x} 362) scale(0.8)`}>
                  <Krone />
                </g>
              ))}
              <UtenSkygge>
                <path d="M110,380 Q200,390 290,380" fill="none" stroke="#CF8278" strokeWidth={2} opacity={0.7} />
              </UtenSkygge>
              <path d="M108,360 C98,346 86,336 74,334 C66,333 58,336 54,344 M292,360 C302,346 314,336 326,334 C334,333 342,336 346,344" fill="none" stroke={F.metallMork} strokeWidth={4} strokeLinecap="round" />
            </Senk>
          </Fri>
        }
      />
      <Ark n={2} {...p}>
        <Smekke />
        <Stjerner pts={[[96, 200, 10], [304, 190, 12], [200, 170, 8]]} spiller={hvile} farge="#7E9363" />
      </Ark>
    </>
  );
}

/* ───────────── Helprotese: the full set ─────────────
   A toothless ridge of gum over the bone. A full denture, a row of teeth on
   a pink base, is lowered onto it, and settles with a small squeeze. */

const HEL_STEG = [["vent", 600], ["senk", 2400], ["sug", 900], ["hvile", 1]] as const;
const HEL_TENNER = [100, 140, 180, 220, 260, 300] as const;
const RYGG: Pt[] = [[-20, 380], [60, 364], [200, 356], [340, 364], [420, 380]];
const BASE_TOPP: Pt[] = [
  [62, 362],
  ...HEL_TENNER.flatMap((x, i) => [[x - 20, i === 0 ? 350 : 340], [x, 354]] as Pt[]),
  [320, 350],
  [338, 362],
];

export function Helprotese({ oppe, spiller, redusert }: PopupProps) {
  const fase = useFase(spiller && oppe, HEL_STEG);
  const nede = naadd(HEL_STEG, fase, "senk", redusert);
  const suger = fase === "sug" && !redusert;
  const p = { oppe, redusert, av: 3 };
  return (
    <>
      <Trykk gruppe="estetisk" />
      <Ark n={0} {...p}>
        <Ben linje={[[-20, 396], [100, 390], [200, 388], [300, 390], [420, 396]]} />
        <path d={`${kurve(RYGG)} L420,404 C300,408 100,400 -20,404 Z`} fill={F.tannkjott} />
        <UtenSkygge>
          <path d={kurve(RYGG.map(([x, y]) => [x, y + 12] as Pt))} fill="none" stroke={F.tannkjottMork} strokeWidth={2} opacity={0.5} />
        </UtenSkygge>
      </Ark>
      <Ark
        n={1}
        {...p}
        over={
          <Fri>
            <Senk nede={nede} redusert={redusert} snorer={{ d: "M80,350 L60,-200 M160,288 L150,-200 M240,288 L250,-200 M320,350 L340,-200", synlige: fase === "senk" }}>
              <motion.g initial={false} animate={{ scaleY: suger ? [1, 0.95, 1.02, 1] : 1 }} style={{ originX: "50%", originY: "100%" }} transition={{ duration: 0.8, ease: "easeInOut" }}>
                {HEL_TENNER.map((x, i) => (
                  <Fortann key={x} x={x} y={356} s={i === 0 || i === 5 ? 0.66 : 0.74} />
                ))}
                <path d={`${kurve(BASE_TOPP)} C346,376 346,390 336,396 Q200,406 64,396 C54,390 54,376 62,362 Z`} fill="#E59C93" />
                <UtenSkygge>
                  <path d={kurve(BASE_TOPP)} fill="none" stroke="#CF8278" strokeWidth={1.6} opacity={0.6} />
                </UtenSkygge>
              </motion.g>
            </Senk>
          </Fri>
        }
      />
      <Ark n={2} {...p}>
        <Smekke />
        <Stjerner pts={[[90, 220, 10], [310, 210, 12], [200, 188, 8]]} spiller={spiller && fase === "hvile" && !redusert} farge="#7E9363" />
      </Ark>
    </>
  );
}
