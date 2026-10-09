"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* Puts each sticky note in the margin beside the words it explains, and
   draws the pen arrow from those words to the note. Wide screens only; on
   a narrower screen the notes sit in the text and this does nothing.

   It only ever moves a note down (a top margin), never up, and the notes
   stay in the margin's flow: so a note can never cover another note or a
   line of text, and when the notes need more room than the text, the
   section simply grows. Before it runs (on the server, without scripts),
   the notes stand at the top of their margin, which reads fine too. */

const BRED = "(min-width: 1024px)";
/** How far above the line with the words a note starts, so the arrow meets it near its top. */
const OVER = 22;

export function Margflyt({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const rot = ref.current;
    if (!rot) return;
    const mq = window.matchMedia(BRED);
    let ramme = 0;
    const legg = () => {
      cancelAnimationFrame(ramme);
      ramme = requestAnimationFrame(() => leggUt(rot, mq.matches));
    };
    leggUt(rot, mq.matches);
    const ro = new ResizeObserver(legg);
    ro.observe(rot);
    mq.addEventListener("change", legg);
    document.fonts?.ready.then(legg);
    return () => {
      cancelAnimationFrame(ramme);
      ro.disconnect();
      mq.removeEventListener("change", legg);
    };
  }, []);

  return (
    <div ref={ref} className={cn("[--marg:240px] [--renne:40px] xl:[--marg:280px] xl:[--renne:56px]", className)}>
      {children}
    </div>
  );
}

function leggUt(rot: HTMLElement, bred: boolean) {
  for (const marg of rot.querySelectorAll<HTMLElement>("[data-marg]")) {
    const lapper = Array.from(marg.querySelectorAll<HTMLElement>(":scope > [data-lapp]"));
    for (const l of lapper) l.style.marginTop = "";
    if (!bred) continue;
    for (const l of lapper) {
      const ord = l.dataset.feste ? document.getElementById(l.dataset.feste) : null;
      const linjer = ord?.getClientRects();
      if (!ord || !linjer?.length) continue;
      // down to the line with the words, if it is lower than where the note stands now
      const ned = linjer[0].top - OVER - l.getBoundingClientRect().top;
      if (ned > 0.5) l.style.marginTop = `${ned}px`;
      tegnPil(l, ord);
    }
  }
}

/** Where the text ends on the line the words end on: the arrow starts just after it. */
function linjeslutt(ord: HTMLElement, siste: DOMRect) {
  let slutt = siste.right;
  const blokk = ord.parentElement;
  if (!blokk) return slutt;
  const rest = document.createRange();
  rest.setStartAfter(ord);
  rest.setEnd(blokk, blokk.childNodes.length);
  const midt = (siste.top + siste.bottom) / 2;
  for (const r of rest.getClientRects()) {
    if (r.width > 0 && r.top < midt && r.bottom > midt) slutt = Math.max(slutt, r.right);
  }
  return slutt;
}

/** A short pen arrow, from just after the underlined words to the note's edge. */
function tegnPil(l: HTMLElement, ord: HTMLElement) {
  const [bue, hode] = Array.from(l.querySelectorAll<SVGPathElement>("[data-pil] path"));
  if (!bue || !hode) return;
  const linjer = ord.getClientRects();
  const siste = linjer[linjer.length - 1];
  const boks = l.getBoundingClientRect();
  const r1 = (x: number) => Math.round(x * 10) / 10;

  const sx = linjeslutt(ord, siste) + 10 - boks.left;
  const sy = siste.top + siste.height * 0.62 - boks.top;
  const ex = -7;
  const ey = Math.min(Math.max(sy, 30), boks.height - 30);
  const dx = ex - sx;
  // leaves the line going right and a little up, and comes into the note level
  bue.setAttribute("d", `M${r1(sx)},${r1(sy)} C${r1(sx + dx * 0.45)},${r1(sy - 16)} ${r1(ex - Math.min(28, dx * 0.35))},${r1(ey)} ${r1(ex)},${r1(ey)}`);
  hode.setAttribute("d", `M${r1(ex - 8)},${r1(ey - 5.5)} L${r1(ex)},${r1(ey)} L${r1(ex - 8)},${r1(ey + 5.5)}`);
}
