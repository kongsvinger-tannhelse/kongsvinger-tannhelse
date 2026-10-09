"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BILDER } from "./tekst";

/**
 * The clinic's photos, in the order of a visit: one large, an arrow on each
 * side to go to the one before or after, and all of them small in a row
 * underneath (five fit across a phone, so nothing hides off the side); a
 * small one shows that one large. Swipe on the large one, or use the arrow
 * keys when the gallery has focus. Only the shown photo and its two
 * neighbours are drawn large, so the next is ready without loading them all.
 */
export function Galleri() {
  const [nr, setNr] = useState(0);
  const n = BILDER.length;
  const start = useRef<number | null>(null);

  const ga = useCallback((d: number) => setNr((v) => (v + d + n) % n), [n]);

  const naboer = new Set([nr, (nr + 1) % n, (nr - 1 + n) % n]);
  const pil = "absolute top-1/2 z-10 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-[color-mix(in_srgb,var(--color-papir)_88%,transparent)] text-[var(--color-glomma-deep)] shadow-[0_8px_24px_-10px_rgba(10,25,32,0.6)] backdrop-blur-sm transition-colors duration-300 hover:bg-[var(--color-papir)] md:size-14";

  return (
    <div
      role="region"
      aria-roledescription="bildekarusell"
      aria-label="Bilder fra klinikken"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") ga(1);
        if (e.key === "ArrowLeft") ga(-1);
      }}
      className="mx-auto max-w-[1040px] rounded-[26px] outline-offset-8 focus-visible:outline-2 focus-visible:outline-[var(--color-glomma)]"
    >
      <div
        className="relative aspect-[5/4] w-full touch-pan-y overflow-hidden rounded-[22px] bg-[var(--color-kalk)] md:aspect-[3/2] md:rounded-[26px]"
        onPointerDown={(e) => (start.current = e.clientX)}
        onPointerUp={(e) => {
          if (start.current === null) return;
          const dx = e.clientX - start.current;
          start.current = null;
          if (Math.abs(dx) > 40) ga(dx < 0 ? 1 : -1);
        }}
      >
        {BILDER.map((b, i) =>
          naboer.has(i) ? (
            <Image
              key={b.src}
              src={b.src}
              alt={i === nr ? b.alt : ""}
              aria-hidden={i !== nr}
              fill
              sizes="(min-width: 1100px) 1040px, 100vw"
              draggable={false}
              className={cn("object-cover transition-opacity duration-500 ease-out", i === nr ? "opacity-100" : "opacity-0")}
            />
          ) : null
        )}

        <button type="button" onClick={() => ga(-1)} aria-label="Forrige bilde" className={cn(pil, "left-3 md:left-5")}>
          <ChevronLeft className="size-6" aria-hidden="true" />
        </button>
        <button type="button" onClick={() => ga(1)} aria-label="Neste bilde" className={cn(pil, "right-3 md:right-5")}>
          <ChevronRight className="size-6" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-3 flex items-baseline justify-between gap-4 px-1 text-[14px] md:mt-4 md:text-[15px]">
        <p className="font-medium text-[var(--color-tekst)]" aria-live="polite">
          {BILDER[nr].tekst}
        </p>
        <p className="shrink-0 tabular-nums text-[var(--color-tekst-svak)]">
          {nr + 1} / {n}
        </p>
      </div>

      <ul className="mt-3 grid grid-cols-5 gap-2 px-1 pt-1 pb-1.5 md:mt-4 md:flex md:justify-center md:gap-2.5">
        {BILDER.map((b, i) => (
          <li key={b.src} className="min-w-0">
            <button
              type="button"
              onClick={() => setNr(i)}
              aria-label={`Vis bilde ${i + 1}: ${b.tekst}`}
              aria-current={i === nr}
              className={cn(
                "relative block aspect-[5/4] w-full overflow-hidden rounded-[10px] transition-[opacity,box-shadow] duration-300 md:aspect-auto md:h-[68px] md:w-[86px] md:rounded-[12px]",
                i === nr ? "opacity-100 shadow-[0_0_0_2.5px_var(--color-papir),0_0_0_4.5px_var(--color-glomma)]" : "opacity-60 hover:opacity-100"
              )}
            >
              <Image src={b.src} alt="" fill sizes="86px" className="object-cover" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
