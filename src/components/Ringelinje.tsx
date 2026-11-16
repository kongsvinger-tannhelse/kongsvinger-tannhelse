"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CalendarDays, Phone } from "lucide-react";
import { klinikk } from "@/data/klinikk";
import { cn } from "@/lib/utils";

/**
 * The phone's bottom bar: Ring oss and Be om time, fixed along the bottom.
 * `etter`: the id of buttons that already say the same at the top of the
 * page (the front page's hero). The bar then waits until they have scrolled
 * up out of view, so the two never show at once. It starts hidden on the
 * server too, so the first render matches.
 */
export function Bunnlinje({ etter }: { etter?: string }) {
  const [vis, setVis] = useState(!etter);

  useEffect(() => {
    if (!etter) return;
    const knapper = document.getElementById(etter);
    // `etter` must name an element on the page; without it the bar stays hidden
    if (!knapper) return;
    const io = new IntersectionObserver(([e]) => setVis(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(knapper);
    return () => io.disconnect();
  }, [etter]);

  return (
    <div
      inert={!vis}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 md:hidden border-t border-[var(--color-strek)] bg-[color-mix(in_srgb,var(--color-papir)_94%,transparent)] px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md transition-transform duration-300 ease-out motion-reduce:transition-none",
        !vis && "translate-y-full",
      )}
    >
      <div className="mx-auto grid max-w-[440px] grid-cols-2 gap-2.5">
        <a href={klinikk.telefon.lenke} className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[var(--color-glomma)] text-[15px] font-semibold text-[var(--color-papir)]">
          <Phone className="size-4" aria-hidden="true" />
          Ring oss
        </a>
        <Link href="/kontakt" className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-[var(--color-strek)] bg-white text-[15px] font-semibold text-[var(--color-glomma-deep)]">
          <CalendarDays className="size-4" aria-hidden="true" />
          Be om time
        </Link>
      </div>
    </div>
  );
}
