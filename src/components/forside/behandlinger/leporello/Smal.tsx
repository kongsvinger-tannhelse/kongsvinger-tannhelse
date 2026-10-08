"use client";

import Link from "next/link";
import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { m, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { harSide, sideSti } from "@/data/behandlinger/sider";
import { cn } from "@/lib/utils";
import { TRE } from "../grupper";
import { Alle, MERKE, Scene } from "./deler";
import s from "./leporello.module.css";

/**
 * «Leporelloen» on a phone or a tablet. The same strip hangs down the page
 * instead, folded at every crease: a scene, then its words printed on the
 * paper under it, then the next scene, and last the panel with every
 * treatment and the way on to them. Each panel lies folded back behind the
 * crease above it, and drops open as it comes into view, the way a
 * fold-out falls open in the hand; once a scene's panel is open, the scene
 * stands up. The panels lie flat once open, with only the creases left:
 * a shadow where the paper folds in, a line of light where it folds out.
 */

/** The last panel's place along the strip. */
const SISTE = 2 * TRE.length;

export function Smal() {
  const redusert = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement | null>(null);
  const synlig = useInView(ref);

  return (
    <div ref={ref} className={s.heng}>
      {TRE.map((t, k) => (
        <Fragment key={t.id}>
          <Brett n={2 * k} redusert={redusert} aria-hidden>
            {(apen) => (
              <div className="relative aspect-[400/480] w-full">
                <Scene id={t.id} oppe={apen} spiller={synlig && apen} redusert={redusert} />
              </div>
            )}
          </Brett>
          <Brett n={2 * k + 1} redusert={redusert}>
            {() => (
              <div className="relative px-6 pb-8 pt-7">
                <span aria-hidden="true" className="absolute right-6 top-7 text-[12px] font-semibold tabular-nums text-[var(--color-teal)]">
                  0{k + 1}
                </span>
                <p className={MERKE}>{t.gruppe.tittel}</p>
                <h3 className="mt-2.5 font-bold text-[var(--color-glomma-deep)]" style={{ fontSize: "clamp(22px, 6vw, 26px)", lineHeight: 1, letterSpacing: "-0.04em" }}>
                  {t.navn}
                </h3>
                <p className="mt-3 text-[15.5px] leading-[1.6] text-[var(--color-tekst-2)]">{t.tekst}</p>
                {harSide(t.id) && (
              <Link href={sideSti(t.id)} className="group mt-3 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[var(--color-glomma)] underline underline-offset-4">
                Les mer om {t.navn.toLowerCase()}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            )}
              </div>
            )}
          </Brett>
        </Fragment>
      ))}

      <Brett n={SISTE} redusert={redusert}>
        {() => (
          <div className="px-6 pb-7 pt-7">
            <Alle className="text-[16px] leading-[1.55]" />
            <Link
              href="/behandlinger"
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-[var(--color-glomma)] px-6 py-3.5 text-[14px] font-semibold text-[var(--color-papir)] shadow-[0_12px_30px_-14px_rgba(22,48,59,0.7)] transition-colors duration-300 hover:bg-[var(--color-glomma-deep)]"
            >
              Se alle behandlingene
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
        )}
      </Brett>
    </div>
  );
}

/**
 * One panel, hinged at the crease above it. It waits folded back into the
 * page, edge on, and drops open on a spring when its place comes into view.
 * Its place is kept the whole time, so nothing below it moves.
 */
function Brett({ n, redusert, "aria-hidden": skjult, children }: { n: number; redusert: boolean; "aria-hidden"?: boolean; children: (apen: boolean) => ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const vist = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  // open: the drop has settled, so the scene on it may stand up
  const [apen, setApen] = useState(false);
  useEffect(() => {
    if (!vist) return;
    const t = window.setTimeout(() => setApen(true), redusert ? 0 : 480);
    return () => window.clearTimeout(t);
  }, [vist, redusert]);

  return (
    <div ref={ref} aria-hidden={skjult || undefined} className="relative">
      <m.div
        className={cn(s.brett, n === 0 ? s.forste : n % 2 ? s.inn : s.ut, n === SISTE && s.siste)}
        style={{ transformOrigin: "50% 0%", transformPerspective: 1000 }}
        initial={{ rotateX: -88, opacity: 0 }}
        animate={vist ? { rotateX: 0, opacity: 1 } : { rotateX: -88, opacity: 0 }}
        transition={redusert ? { duration: 0 } : { rotateX: { type: "spring", stiffness: 70, damping: 12 }, opacity: { duration: 0.18 } }}
      >
        {children(apen)}
      </m.div>
    </div>
  );
}
