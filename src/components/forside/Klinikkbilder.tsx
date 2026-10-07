"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Images } from "lucide-react";
import { klinikk, klinikkbilder } from "@/data/klinikk";
import { Galleri } from "@/components/forside/Galleri";
import { useHeroKlar } from "@/components/forside/useHeroKlar";
import s from "./klinikkbilder.module.css";

const VIS = 5200; // ms each room is shown

/**
 * «Speilet», square. The treatment room at Fjellgata 4 has a mirror with a
 * ring of warm light round it; here it hangs in the sky over Glomma as a
 * square pane. When the camera has stopped, the pane stands up like a page
 * in a pop-up book and its light draws itself round. Then the clinic's rooms
 * come and go in the glass, each drifting slowly closer, while a brighter
 * line runs round the light like a clock hand, measuring out each room's
 * time. A hand over it holds the picture; a click opens the gallery.
 *
 * (The round original and the other versions are on the git branch
 * mockups/klinikkbilder.)
 */
export function Klinikkbilder() {
  const klar = useHeroKlar(3700);
  const redusert = useReducedMotion() ?? false;
  const [nr, setNr] = useState(0);
  const [pause, setPause] = useState(false);
  const [apen, setApen] = useState<number | null>(null);
  const går = klar && !pause && apen === null;

  useEffect(() => {
    if (!går) return;
    const t = window.setInterval(() => setNr((n) => (n + 1) % klinikkbilder.length), VIS);
    return () => window.clearInterval(t);
  }, [går]);

  return (
    <>
      <motion.figure
        className={s.rute}
        data-klar={klar}
        style={{ transformOrigin: "50% 100%", transformPerspective: 1000 }}
        initial={{ rotateX: 88, opacity: 0 }}
        animate={klar ? { rotateX: 0, opacity: 1 } : { rotateX: 88, opacity: 0 }}
        transition={redusert ? { duration: 0 } : { rotateX: { type: "spring", stiffness: 85, damping: 13 }, opacity: { duration: 0.25 } }}
        onPointerEnter={(e) => e.pointerType === "mouse" && setPause(true)}
        onPointerLeave={() => setPause(false)}
      >
        <div className={s.ramme}>
          <button type="button" className={s.glass} onClick={() => setApen(nr)} aria-label={`Vis bildene fra klinikken. Nå: ${klinikkbilder[nr].tekst}`}>
            {klinikkbilder.map((b, i) => (
              <Image key={b.src} src={b.src} alt="" fill sizes="(min-width: 768px) 420px, 58vw" className={s.rom} data-vis={klar && i === nr} loading={i < 2 ? "eager" : "lazy"} />
            ))}
            <span className={s.innerskygge} aria-hidden="true" />
          </button>

          {/* the light round the pane, and a brighter line that measures out each room's time */}
          <svg className={s.ring} viewBox="0 0 100 100" aria-hidden="true">
            <path className={s.lys} d={LYS} pathLength={1} />
            {går && <path key={nr} className={s.tid} d={LYS} pathLength={1} style={{ animationDuration: `${VIS}ms` }} />}
          </svg>
        </div>

        <figcaption className={s.tekst}>
          <span key={nr} className={s.bytt}>
            {klinikkbilder[nr].tekst}
          </span>
          <span className="text-white/75">Fra klinikken i {klinikk.adresse.gate}</span>
          <button
            type="button"
            onClick={() => setApen(0)}
            className="mt-2 inline-flex items-center gap-1.5 self-center rounded-full bg-white/15 px-3 py-1.5 text-[13px] font-medium backdrop-blur-md transition-colors hover:bg-white/25"
          >
            <Images className="size-3.5" aria-hidden="true" />
            Se alle {klinikkbilder.length}
          </button>
        </figcaption>
      </motion.figure>
      <Galleri indeks={apen} onLukk={() => setApen(null)} onBytt={setApen} />
    </>
  );
}

/** The ring of light: a rounded square, starting at the top middle and running clockwise, like a clock. */
const LYS = "M50,1 H94 A5,5 0 0 1 99,6 V94 A5,5 0 0 1 94,99 H6 A5,5 0 0 1 1,94 V6 A5,5 0 0 1 6,1 Z";
