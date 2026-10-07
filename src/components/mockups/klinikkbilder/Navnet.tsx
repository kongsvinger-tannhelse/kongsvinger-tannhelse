"use client";

import { getImageProps } from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import { Images } from "lucide-react";
import { klinikkbilder } from "@/data/klinikk";
import { Hero } from "@/components/forside/Hero";
import { Galleri } from "@/components/forside/Galleri";
import { useHeroKlar } from "@/components/forside/useHeroKlar";
import s from "./navnet.module.css";

const UTVALG = [0, 3, 1, 2, 4];
const VIS = 5600;
const URL = klinikkbilder.map(
  (b) => getImageProps({ src: b.src, alt: "", width: 1200, height: Math.round((1200 * b.hoyde) / b.bredde), quality: 75 }).props.src
);

/**
 * F — «Navnet». No panel, no frame: when the camera has come to rest, the
 * white letters of «Kongsvinger» turn to glass, and through them you see the
 * clinic's rooms, drifting slowly, one after another. The name holds the
 * place. A small note at the top says which room you are looking at.
 */
export function NavnetHero() {
  const klar = useHeroKlar(3600);
  const [nr, setNr] = useState(0);
  const [apen, setApen] = useState<number | null>(null);

  useEffect(() => {
    if (!klar || apen !== null) return;
    const t = window.setInterval(() => setNr((n) => (n + 1) % UTVALG.length), VIS);
    return () => window.clearInterval(t);
  }, [klar, apen]);

  // fetch the rooms early, so a letter never turns to an empty window
  useEffect(() => {
    UTVALG.forEach((u) => {
      const img = new window.Image();
      img.src = URL[u];
    });
  }, []);

  const tittel = (
    <>
      <span aria-hidden="true" className="block overflow-hidden pb-[0.07em]">
        <span className={`hero-linje relative inline-block ${s.ord}`} style={{ animationDelay: "2.6s" }}>
          <span className={s.hvit} data-av={klar}>
            Kongsvinger
          </span>
          {UTVALG.map((u, i) => (
            <span
              key={u}
              className={s.vindu}
              data-vis={klar && i === nr}
              style={{ backgroundImage: `url(${URL[u]})`, "--start": `${(i * 37) % 100}%` } as CSSProperties}
            >
              Kongsvinger
            </span>
          ))}
        </span>
      </span>
      <span aria-hidden="true" className="block overflow-hidden pb-[0.07em]">
        <span className="hero-linje inline-block" style={{ fontWeight: 360, animationDelay: "2.72s" }}>
          Tannhelse
        </span>
      </span>
    </>
  );

  const merknad = (
    <div className={s.merknad} data-vis={klar}>
      <span className="text-white/70">Gjennom navnet:</span>
      <span key={nr} className={s.rom}>
        {klinikkbilder[UTVALG[nr]].tekst}
      </span>
      <button
        type="button"
        onClick={() => setApen(UTVALG[nr])}
        className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 font-medium backdrop-blur-md transition-colors hover:bg-white/25"
      >
        <Images className="size-3.5" aria-hidden="true" />
        Se rommene
      </button>
    </div>
  );

  return (
    <>
      <Hero tittel={tittel} bilder={merknad} />
      <Galleri indeks={apen} onLukk={() => setApen(null)} onBytt={setApen} />
    </>
  );
}
