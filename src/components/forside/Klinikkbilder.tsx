"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { klinikkbilder } from "@/data/klinikk";
import { useHeroKlar } from "@/components/forside/useHeroKlar";
import s from "./klinikkbilder.module.css";

const VIS = 6000; // ms each room is shown

/** The rooms that take turns in the pane, in this order: the calm ones, no instruments. */
const ruta = ["bilde9", "bilde1", "bilde3"].map((navn) => klinikkbilder.find((b) => b.src.endsWith(`/${navn}.webp`))!);

/**
 * «Speilet», square. The treatment room at Fjellgata 4 has a mirror with a
 * ring of warm light round it; here it hangs in the sky over Glomma as a
 * square pane. As the camera settles, the pane stands up like a page in a
 * pop-up book and its light draws itself round. Then the clinic's rooms
 * take turns in the glass, slowly, once round, and it comes to rest on the
 * waiting room. The button in the corner stops it (and starts it again); a
 * hand over it holds the picture too. With reduced motion it stays on the
 * first room.
 *
 * (The round original and the other versions are on the git branch
 * mockups/klinikkbilder.)
 */
export function Klinikkbilder() {
  const klar = useHeroKlar(900);
  // the rooms are fetched once the view is in, 0.9 s before the pane stands
  // up; not with the top of the page, where they would only slow the words
  const hent = useHeroKlar(0);
  const redusert = useReducedMotion() ?? false;
  const [nr, setNr] = useState(0);
  const [vist, setVist] = useState(1); // how many rooms have had their turn
  const [stoppet, setStoppet] = useState(false);
  const [hand, setHand] = useState(false);
  const ferdig = vist > ruta.length;
  const går = klar && !redusert && !stoppet && !hand && !ferdig;

  useEffect(() => {
    if (!går) return;
    const t = window.setTimeout(() => {
      setNr((n) => (n + 1) % ruta.length);
      setVist((v) => v + 1);
    }, VIS);
    return () => window.clearTimeout(t);
  }, [går, vist]);

  const spill = () => {
    if (ferdig) {
      setVist(1);
      setNr((n) => (n + 1) % ruta.length);
      setStoppet(false);
    } else setStoppet((v) => !v);
  };
  const viserPause = !stoppet && !ferdig; // a hand over the pane only holds it for a moment

  return (
    <m.figure
      className={s.rute}
      data-klar={klar}
      style={{ transformOrigin: "50% 100%", transformPerspective: 1000 }}
      initial={{ rotateX: 88, opacity: 0 }}
      animate={klar ? { rotateX: 0, opacity: 1 } : { rotateX: 88, opacity: 0 }}
      transition={redusert ? { duration: 0 } : { rotateX: { type: "spring", stiffness: 85, damping: 13 }, opacity: { duration: 0.25 } }}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHand(true)}
      onPointerLeave={() => setHand(false)}
    >
      <div className={s.ramme}>
        <div className={s.glass}>
          {hent &&
            ruta.map((b, i) => (
              <Image key={b.src} src={b.src} alt="" fill sizes="(min-width: 768px) 420px, 58vw" className={s.rom} data-vis={klar && i === nr} loading={i < 2 ? "eager" : "lazy"} />
            ))}
          <span className={s.innerskygge} aria-hidden="true" />
        </div>

        {/* the light round the pane */}
        <svg className={s.ring} viewBox="0 0 100 100" aria-hidden="true">
          <path className={s.lys} d={LYS} pathLength={1} />
        </svg>

        {/* always rendered (the server can't know about reduced motion, and the
            first render must match it); the CSS hides it when nothing moves */}
        <button
          type="button"
          className={s.knapp}
          onClick={spill}
          aria-label={viserPause ? "Stopp bildene" : "Vis bildene"}
          tabIndex={klar ? 0 : -1}
        >
          {viserPause ? <Pause className="size-3.5" aria-hidden="true" /> : <Play className="size-3.5 translate-x-px" aria-hidden="true" />}
        </button>
      </div>
    </m.figure>
  );
}

/** The ring of light: a rounded square, starting at the top middle and running clockwise,
    a little past where it began, so the join doesn't show as a gap. */
const LYS = "M50,1 H94 A5,5 0 0 1 99,6 V94 A5,5 0 0 1 94,99 H6 A5,5 0 0 1 1,94 V6 A5,5 0 0 1 6,1 H52";
