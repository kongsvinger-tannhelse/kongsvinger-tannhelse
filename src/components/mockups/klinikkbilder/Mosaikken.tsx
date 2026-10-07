"use client";

import { getImageProps } from "next/image";
import { useEffect, useState, type CSSProperties } from "react";
import { Images } from "lucide-react";
import { klinikk, klinikkbilder } from "@/data/klinikk";
import { Galleri } from "@/components/forside/Galleri";
import { useHeroKlar } from "@/components/forside/useHeroKlar";
import { cn } from "@/lib/utils";
import s from "./mosaikken.module.css";

const N = klinikkbilder.length;
const KOL = 3;
const RAD = 3;
const VIS = 5200;

// One optimised URL per photo, shared by all nine tiles as a background.
const URLER = klinikkbilder.map(
  (b) => getImageProps({ src: b.src, alt: "", width: 1200, height: Math.round((1200 * b.hoyde) / b.bredde), quality: 75 }).props.src
);

type Flater = { a: number | null; b: number | null };

/**
 * C — «Mosaikken». Beside the view hangs a grid of nine clear panes. When the
 * camera has stopped they turn over, one after another in a diagonal wave,
 * and the landscape becomes the treatment room. Every few seconds the wave
 * runs again and the next room turns up. Hover holds it; click to see it all.
 */
export function Mosaikken() {
  const klar = useHeroKlar(3800);
  const [vendt, setVendt] = useState(0); // half-turns so far; odd shows face b
  const [flater, setFlater] = useState<Flater>({ a: null, b: 0 });
  const [pause, setPause] = useState(false);
  const [apen, setApen] = useState<number | null>(null);
  const vist = vendt % 2 === 1 ? flater.b : flater.a;

  // Fetch every room up front, so a pane never turns over onto nothing.
  useEffect(() => {
    URLER.forEach((u) => {
      const img = new window.Image();
      img.src = u;
    });
  }, []);

  // The first wave, once the camera has come to rest
  useEffect(() => {
    if (!klar) return;
    const t = window.setTimeout(() => setVendt((v) => (v === 0 ? 1 : v)), 0);
    return () => window.clearTimeout(t);
  }, [klar]);

  // Then the next room every few seconds: paint it on the hidden face, then turn.
  useEffect(() => {
    if (!klar || pause || apen !== null || vendt === 0) return;
    const t = window.setTimeout(() => {
      const neste = ((vist ?? -1) + 1) % N;
      setFlater((f) => (vendt % 2 === 1 ? { ...f, a: neste } : { ...f, b: neste }));
      window.setTimeout(() => setVendt((v) => v + 1), 80);
    }, VIS);
    return () => window.clearTimeout(t);
  }, [klar, pause, apen, vendt, vist]);

  return (
    <>
      <div className={s.ramme} onPointerEnter={() => setPause(true)} onPointerLeave={() => setPause(false)}>
        <button
          type="button"
          className={s.rutenett}
          onClick={() => setApen(vist ?? 0)}
          aria-label={`Vis bildene fra klinikken${vist !== null ? `. Nå: ${klinikkbilder[vist].tekst}` : ""}`}
        >
          {Array.from({ length: KOL * RAD }, (_, k) => {
            const r = Math.floor(k / KOL);
            const c = k % KOL;
            const bit = { "--r": r, "--c": c, "--bx": `${(c / (KOL - 1)) * 100}%`, "--by": `${(r / (RAD - 1)) * 100}%` } as CSSProperties;
            return (
              <span key={k} className={cn(s.rute, r === 0 && c === 0 && s.tl, r === 0 && c === KOL - 1 && s.tr, r === RAD - 1 && c === 0 && s.bl, r === RAD - 1 && c === KOL - 1 && s.br)} style={bit}>
                <span className={s.snu} style={{ transform: `rotateY(${vendt * 180}deg)` }}>
                  <span className={cn(s.flate, flater.a === null && [s.tom, "vent"])} style={flater.a !== null ? { backgroundImage: `url(${URLER[flater.a]})` } : undefined} />
                  <span className={cn(s.flate, s.bak)} style={flater.b !== null ? { backgroundImage: `url(${URLER[flater.b]})` } : undefined} />
                </span>
              </span>
            );
          })}
        </button>

        <div className={cn(s.tekst, vendt > 0 && s.synlig)}>
          <span>
            <span key={vist ?? "x"} className={s.bytt}>
              {vist !== null ? klinikkbilder[vist].tekst : ""}
            </span>
            <span className="block text-white/70">Fra klinikken i {klinikk.adresse.gate}</span>
          </span>
          <button
            type="button"
            onClick={() => setApen(0)}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 font-medium backdrop-blur-md transition-colors hover:bg-white/25"
          >
            <Images className="size-3.5" aria-hidden="true" />
            Se alle {N}
          </button>
        </div>
      </div>
      <Galleri indeks={apen} onLukk={() => setApen(null)} onBytt={setApen} />
    </>
  );
}
