"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import r from "./triptyk.module.css";

/**
 * A row you swipe sideways on a phone or tablet: one card in view with the
 * next one peeking in, each snapping to the middle, and a dot for each
 * under it that you can tap. From 1100 px up the mockups lay the cards out
 * on the page itself, and the dots are hidden.
 */
export function Spor({ n, className, children, etikett }: { n: number; className?: string; children: ReactNode; etikett: string }) {
  const ref = useRef<HTMLUListElement | null>(null);
  const [nr, setNr] = useState(0);

  /** Where each card sits along the row, so the dot for the card nearest the middle lights. */
  const paaScroll = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const midt = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let avstand = Infinity;
    Array.from(el.children).forEach((c, k) => {
      const b = c as HTMLElement;
      const d = Math.abs(b.offsetLeft + b.offsetWidth / 2 - midt);
      if (d < avstand) {
        avstand = d;
        best = k;
      }
    });
    setNr(best);
  }, []);

  const gaTil = (k: number) => {
    const el = ref.current;
    const kort = el?.children[k] as HTMLElement | undefined;
    if (!el || !kort) return;
    el.scrollTo({ left: kort.offsetLeft - (el.clientWidth - kort.offsetWidth) / 2, behavior: "smooth" });
  };

  return (
    <>
      <ul ref={ref} className={className} onScroll={paaScroll} aria-label={etikett}>
        {children}
      </ul>
      <div className={r.prikker} role="group" aria-label={`${etikett}, velg person`}>
        {Array.from({ length: n }, (_, k) => (
          <button key={k} type="button" onClick={() => gaTil(k)} aria-label={`Vis person ${k + 1} av ${n}`} aria-current={k === nr ? "true" : undefined} className={cn(r.prikk, k === nr && r.prikkAktiv)} />
        ))}
      </div>
    </>
  );
}
