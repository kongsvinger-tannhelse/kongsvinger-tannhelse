"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate, m, useInView, useMotionTemplate, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { harSide, sideSti } from "@/data/behandlinger/sider";
import { cn } from "@/lib/utils";
import { TRE } from "../grupper";
import { FARGE } from "../popup/tegning";
import { Alle, MERKE, Omslag, Scene } from "./deler";
import s from "./leporello.module.css";

/**
 * «Leporelloen» on a wide screen. The three scenes are printed on one long
 * strip folded like a concertina, with a fourth panel at the end that holds
 * all the treatments. It lies closed on the page, showing its cover; when it
 * comes into view it unfolds from the middle, fold by fold, and comes to
 * rest standing in a gentle zigzag, the panels catching the light from the
 * left by turns. Then each scene stands up in its panel, one after the
 * other. Under each panel stands what it shows.
 *
 * Each panel hangs on the right edge of the one before (the DOM nests them),
 * so a fold is one rotateY about that edge, and the angles add up.
 */

/** The angle each panel stands at once open, from the page's plane. */
const VINKEL = 16;
/** Closed, each fold is almost flat back on the panel before it. */
const LUKKET = 178;
const COS = Math.cos((VINKEL * Math.PI) / 180);
const FJAER = { type: "spring", stiffness: 52, damping: 14, mass: 1 } as const;

const grad = (v: number) => (v * Math.PI) / 180;

/** How dark a face is at angle θ, with the light from the left, in front. */
function skygge(theta: number, bak = false) {
  const n = bak ? -1 : 1;
  const b = n * (-0.41 * Math.sin(grad(theta)) + 0.91 * Math.cos(grad(theta)));
  return Math.min(0.3, Math.max(0, (0.97 - b) * 0.36));
}

export function Bred() {
  const redusert = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement | null>(null);
  const vist = useInView(ref, { once: true, margin: "0px 0px -18% 0px" });
  const synlig = useInView(ref);
  // how many panels have their scene standing
  const [staar, setStaar] = useState(0);

  const fot = useMotionValue(0);
  const l1 = useMotionValue(-LUKKET);
  const l2 = useMotionValue(LUKKET);
  const l3 = useMotionValue(-LUKKET);

  useEffect(() => {
    if (!vist) return;
    const leddene = [l1, l2, l3];
    const maal = [-2 * VINKEL, 2 * VINKEL, -2 * VINKEL];
    const timere: number[] = [];
    if (redusert) {
      fot.set(VINKEL);
      leddene.forEach((l, k) => l.set(maal[k]));
      timere.push(window.setTimeout(() => setStaar(4), 0));
      return () => timere.forEach((t) => window.clearTimeout(t));
    }
    const kj = [animate(fot, VINKEL, FJAER), ...leddene.map((l, k) => animate(l, maal[k], { ...FJAER, delay: 0.1 + k * 0.17 }))];
    for (let k = 1; k <= 4; k++) timere.push(window.setTimeout(() => setStaar(k), 950 + k * 230));
    return () => {
      kj.forEach((a) => a.stop());
      timere.forEach((t) => window.clearTimeout(t));
    };
  }, [vist, redusert, fot, l1, l2, l3]);

  // each panel's angle to the page
  const a0 = fot;
  const a1 = useTransform(() => fot.get() + l1.get());
  const a2 = useTransform(() => a1.get() + l2.get());
  const a3 = useTransform(() => a2.get() + l3.get());

  // where the strip reaches, in panel widths, so it is kept in the middle while it opens
  const spenn = useTransform(() => {
    let x = 0;
    let min = 0;
    let max = 0;
    for (const a of [a0.get(), a1.get(), a2.get(), a3.get()]) {
      x += Math.cos(grad(a));
      min = Math.min(min, x);
      max = Math.max(max, x);
    }
    return [min, max] as const;
  });
  const skyv = useTransform(() => 2 * COS - (spenn.get()[0] + spenn.get()[1]) / 2);
  const flytt = useMotionTemplate`translateX(calc(var(--w) * ${skyv}))`;
  const skyggeVenstre = useTransform(() => spenn.get()[0] + skyv.get());
  const skyggeBredde = useTransform(() => spenn.get()[1] - spenn.get()[0]);
  const skyggeStil = {
    left: useMotionTemplate`calc(var(--w) * ${skyggeVenstre})`,
    width: useMotionTemplate`calc(var(--w) * ${skyggeBredde})`,
  };

  const scene = (k: number) => <Scene id={TRE[k].id} oppe={staar > k} spiller={synlig && staar > k} redusert={redusert} />;

  return (
    <div ref={ref} className={s.bred}>
      <div className={s.bredBoks}>
        {/* its shadow on the page */}
        <m.div aria-hidden="true" className={s.bredSkygge} style={skyggeStil} />

        <div aria-hidden="true" className="absolute inset-0" style={{ perspective: 2400, perspectiveOrigin: "50% 35%" }}>
          <m.div className="absolute inset-y-0 left-0 w-[var(--w)]" style={{ transform: flytt, transformStyle: "preserve-3d" }}>
            <Panel forste ledd={fot} vinkel={a0} forside={scene(0)}>
              <Panel ledd={l1} vinkel={a1} forside={scene(1)}>
                <Panel ledd={l2} vinkel={a2} forside={scene(2)}>
                  <Panel ledd={l3} vinkel={a3} forside={<Register />} bakside={<Omslag />} />
                </Panel>
              </Panel>
            </Panel>
          </m.div>
        </div>
      </div>

      {/* what each panel shows, under it */}
      <ol className={s.bredTekster}>
        {TRE.map((t, k) => (
          <li key={t.id} className={cn(s.bredTekst, "hero-loft")} style={{ animationPlayState: staar > k ? "running" : "paused", animationDelay: "0.25s" }}>
            <p className={MERKE}>{t.gruppe.tittel}</p>
            <h3 className="mt-2.5 font-bold text-[var(--color-glomma-deep)]" style={{ fontSize: "clamp(26px, 2.3vw, 32px)", lineHeight: 1, letterSpacing: "-0.04em" }}>
              {t.navn}
            </h3>
            <p className="mt-3 text-[15px] leading-[1.6] text-[var(--color-tekst-2)]">{t.tekst}</p>
            {harSide(t.id) && (
              <Link href={sideSti(t.id)} className="group mt-3 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[var(--color-glomma)] underline underline-offset-4">
                Les mer om {t.navn.toLowerCase()}
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            )}
          </li>
        ))}
        <li className={cn(s.bredTekst, "hero-loft")} style={{ animationPlayState: staar > 3 ? "running" : "paused", animationDelay: "0.25s" }}>
          <p className={MERKE}>Alle behandlingene</p>
          <Link
            href="/behandlinger"
            className="group mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--color-glomma)] px-6 py-3.5 text-[14px] font-semibold text-[var(--color-papir)] shadow-[0_12px_30px_-14px_rgba(22,48,59,0.7)] transition-colors duration-300 hover:bg-[var(--color-glomma-deep)]"
          >
            Se alle behandlingene
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </li>
      </ol>
    </div>
  );
}

/**
 * One panel of the strip, hinged on the right edge of the one before it (the
 * first on the strip's left end). It carries its two faces and, nested
 * inside, the next panel.
 */
function Panel({ forste = false, ledd, vinkel, forside, bakside, children }: { forste?: boolean; ledd: MotionValue<number>; vinkel: MotionValue<number>; forside: ReactNode; bakside?: ReactNode; children?: ReactNode }) {
  const skyggeFor = useTransform(vinkel, (v) => skygge(v));
  const skyggeBak = useTransform(vinkel, (v) => skygge(v, true));
  return (
    <m.div className={cn("absolute top-0 h-full w-[var(--w)]", forste ? "left-0" : "left-full")} style={{ rotateY: ledd, transformOrigin: "0% 50%", transformStyle: "preserve-3d" }}>
      <div className={s.flate}>
        {forside}
        <div className={s.kant} />
        <m.div className="pointer-events-none absolute inset-0 bg-[#3B3424]" style={{ opacity: skyggeFor }} />
      </div>
      <div className={cn(s.flate, s.bak)}>
        {bakside}
        <m.div className="pointer-events-none absolute inset-0 bg-[#3B3424]" style={{ opacity: skyggeBak }} />
      </div>
      {children}
    </m.div>
  );
}

/** The last panel: every treatment, set large enough to fill the page, like the back of a book. A link to them all (the button under it is the one in the tab order). */
function Register() {
  return (
    <Link href="/behandlinger" tabIndex={-1} className="absolute inset-0 flex flex-col px-[9%] pb-[8%] pt-[9%] text-[var(--color-glomma-deep)]" style={{ background: FARGE.papir }}>
      <Alle className="flex flex-1 flex-col justify-between" style={{ fontSize: "calc(var(--w) * 0.046)", lineHeight: 1.45 }} />
      <span className="mt-[5%] inline-flex items-center gap-1.5 border-t border-[var(--color-strek)] pt-[5%] font-semibold" style={{ fontSize: "calc(var(--w) * 0.046)" }}>
        Se alle <ArrowRight style={{ width: "1em", height: "1em" }} aria-hidden="true" />
      </span>
    </Link>
  );
}
