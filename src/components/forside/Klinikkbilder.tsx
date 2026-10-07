"use client";

import Image from "next/image";
import { useState } from "react";
import { Images } from "lucide-react";
import { Galleri } from "./Galleri";
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
