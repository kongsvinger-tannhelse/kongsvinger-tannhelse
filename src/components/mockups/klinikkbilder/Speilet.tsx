"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Images } from "lucide-react";
import { klinikk, klinikkbilder } from "@/data/klinikk";
import { Galleri } from "@/components/forside/Galleri";
import { useHeroKlar } from "@/components/forside/useHeroKlar";
import s from "./speilet.module.css";

const VIS = 5200; // ms each room is shown

/**
 * A — «Speilet». The treatment room at Fjellgata 4 has a big round mirror with
 * a ring of warm light around it. That mirror hangs here in the sky over
 * Glomma: its light draws itself round once the camera has stopped, and in
 * the glass the clinic's rooms come and go, each drifting slowly closer.
 * Outside the view, inside the clinic.
 */
export function Speilet() {
  const klar = useHeroKlar(3900);
  const [nr, setNr] = useState(0);
  const [pause, setPause] = useState(false);
  const [apen, setApen] = useState<number | null>(null);

  useEffect(() => {
    if (!klar || pause || apen !== null) return;
    const t = window.setInterval(() => setNr((n) => (n + 1) % klinikkbilder.length), VIS);
    return () => window.clearInterval(t);
  }, [klar, pause, apen]);

  return (
    <>
      <figure className={`${s.speil} vent`} onPointerEnter={() => setPause(true)} onPointerLeave={() => setPause(false)}>
        <button type="button" className={s.glass} onClick={() => setApen(nr)} aria-label={`Vis bildene fra klinikken. Nå: ${klinikkbilder[nr].tekst}`}>
          {klinikkbilder.map((b, i) => (
            <Image
              key={b.src}
              src={b.src}
              alt=""
              fill
              sizes="(min-width: 768px) 440px, 160px"
              className={s.rom}
              data-vis={klar && i === nr}
              loading="eager"
            />
          ))}
          <span className={s.innerskygge} aria-hidden="true" />
        </button>

        {/* the ring of light, and a fine arc that measures out each room's time */}
        <svg className={s.ring} viewBox="0 0 100 100" aria-hidden="true">
          <circle className={`${s.lys} vent`} cx="50" cy="50" r="49" pathLength={1} />
          {klar && !pause && apen === null && (
            <circle key={nr} className={s.tid} cx="50" cy="50" r="49" pathLength={1} style={{ animationDuration: `${VIS}ms` }} />
          )}
        </svg>

        <figcaption className={`${s.tekst} vent`}>
          <span key={nr} className={s.bytt}>
            {klinikkbilder[nr].tekst}
          </span>
          <span className="text-white/70">Fra klinikken i {klinikk.adresse.gate}</span>
          <button
            type="button"
            onClick={() => setApen(0)}
            className="mt-2 inline-flex items-center gap-1.5 self-center rounded-full bg-white/15 px-3 py-1.5 text-[13px] font-medium backdrop-blur-md transition-colors hover:bg-white/25"
          >
            <Images className="size-3.5" aria-hidden="true" />
            Se alle {klinikkbilder.length}
          </button>
        </figcaption>
      </figure>
      <Galleri indeks={apen} onLukk={() => setApen(null)} onBytt={setApen} />
    </>
  );
}
