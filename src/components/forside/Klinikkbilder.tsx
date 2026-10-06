"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Images, X } from "lucide-react";
import { klinikk, klinikkbilder } from "@/data/klinikk";
import { cn } from "@/lib/utils";
import s from "./hero.module.css";

/**
 * Three photos from inside the clinic, set beside the view once the camera
 * has come to rest: the treatment room in its round mirror large, the room
 * and the waiting room under it. Any of them opens the full set.
 */
export function Klinikkbilder({ className }: { className?: string }) {
  const [apen, setApen] = useState<number | null>(null);
  const [stor, sma1, sma2] = klinikkbilder;

  return (
    <>
      <div className={cn(s.klinikk, className)}>
        <div className="grid grid-cols-3 gap-2 md:grid-cols-2 md:gap-2.5">
          <Flis bilde={stor} indeks={0} onApne={setApen} className="md:col-span-2 md:aspect-[4/3]" sizes="(min-width: 768px) 380px, 33vw" />
          <Flis bilde={sma1} indeks={1} onApne={setApen} sizes="(min-width: 768px) 190px, 33vw" />
          <Flis bilde={sma2} indeks={2} onApne={setApen} sizes="(min-width: 768px) 190px, 33vw" />
        </div>
        <div className={cn(s.flis, "mt-2.5 flex items-center justify-between gap-4 text-[13px] text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.45)]")} style={{ "--i": 3 } as React.CSSProperties}>
          <span className="font-medium">Fra klinikken i {klinikk.adresse.gate}</span>
          <button
            type="button"
            onClick={() => setApen(0)}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 font-medium backdrop-blur-md transition-colors hover:bg-white/25"
          >
            <Images className="size-3.5" aria-hidden="true" />
            Se alle {klinikkbilder.length}
          </button>
        </div>
      </div>

      <Galleri indeks={apen} onLukk={() => setApen(null)} onBytt={setApen} />
    </>
  );
}

type Bilde = (typeof klinikkbilder)[number];

function Flis({
  bilde,
  indeks,
  onApne,
  className,
  sizes,
}: {
  bilde: Bilde;
  indeks: number;
  onApne: (i: number) => void;
  className?: string;
  sizes: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onApne(indeks)}
      aria-label={`Vis bildet: ${bilde.tekst}`}
      className={cn(
        s.flis,
        "group relative aspect-[4/3] overflow-hidden rounded-[10px] bg-white/10 shadow-[0_20px_44px_-22px_rgba(0,0,0,0.6)] ring-1 ring-white/25",
        className
      )}
      style={{ "--i": indeks } as React.CSSProperties}
    >
      <Image
        src={bilde.src}
        alt=""
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-700 ease-[var(--ease-rolig)] group-hover:scale-[1.04]"
      />
    </button>
  );
}

/** The full set, one at a time, over a dark veil. Arrows and Esc work. */
function Galleri({ indeks, onLukk, onBytt }: { indeks: number | null; onLukk: () => void; onBytt: (i: number) => void }) {
  const lukkRef = useRef<HTMLButtonElement | null>(null);
  const forrigeFokus = useRef<HTMLElement | null>(null);
  const n = klinikkbilder.length;
  const apen = indeks !== null;

  const bytt = useCallback((steg: number) => indeks !== null && onBytt((indeks + steg + n) % n), [indeks, n, onBytt]);

  useEffect(() => {
    if (!apen) return;
    forrigeFokus.current = document.activeElement as HTMLElement | null;
    lukkRef.current?.focus();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
      forrigeFokus.current?.focus();
    };
  }, [apen]);

  useEffect(() => {
    if (!apen) return;
    const tast = (e: KeyboardEvent) => {
      if (e.key === "Escape") onLukk();
      if (e.key === "ArrowRight") bytt(1);
      if (e.key === "ArrowLeft") bytt(-1);
    };
    window.addEventListener("keydown", tast);
    return () => window.removeEventListener("keydown", tast);
  }, [apen, bytt, onLukk]);

  const bilde = indeks !== null ? klinikkbilder[indeks] : null;

  return (
    <AnimatePresence>
      {bilde && indeks !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Bilder fra klinikken"
          className="fixed inset-0 z-[100] flex flex-col bg-[rgba(10,22,28,0.94)] text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          onClick={onLukk}
        >
          <div className="flex items-center justify-between px-[var(--container-px)] py-4 text-[14px]">
            <span className="tabular-nums text-white/70">
              {indeks + 1} av {n}
            </span>
            <button
              ref={lukkRef}
              type="button"
              onClick={onLukk}
              className="inline-flex size-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              aria-label="Lukk"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-20" onClick={(e) => e.stopPropagation()}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={bilde.src}
                className="relative flex h-full w-full max-w-[1200px] flex-col items-center justify-center"
                initial={{ opacity: 0, scale: 0.985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.985 }}
                transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="relative h-[min(72vh,900px)] w-full">
                  <Image src={bilde.src} alt={bilde.tekst} fill sizes="(min-width: 1200px) 1200px, 100vw" className="object-contain" />
                </div>
                <figcaption className="mt-4 text-center text-[15px] text-white/85">{bilde.tekst}</figcaption>
              </motion.figure>
            </AnimatePresence>

            <button
              type="button"
              onClick={() => bytt(-1)}
              className="absolute left-2 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 md:left-6"
              aria-label="Forrige bilde"
            >
              <ArrowLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => bytt(1)}
              className="absolute right-2 top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 md:right-6"
              aria-label="Neste bilde"
            >
              <ArrowRight className="size-5" aria-hidden="true" />
            </button>
          </div>

          <div className="flex justify-center gap-2 overflow-x-auto px-4 py-4" onClick={(e) => e.stopPropagation()}>
            {klinikkbilder.map((b, i) => (
              <button
                key={b.src}
                type="button"
                onClick={() => onBytt(i)}
                aria-label={`Bilde ${i + 1}: ${b.tekst}`}
                aria-current={i === indeks}
                className={cn(
                  "relative h-12 w-16 shrink-0 overflow-hidden rounded-[6px] ring-1 transition-opacity",
                  i === indeks ? "opacity-100 ring-white" : "opacity-50 ring-white/20 hover:opacity-80"
                )}
              >
                <Image src={b.src} alt="" fill sizes="64px" className="object-cover" />
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
