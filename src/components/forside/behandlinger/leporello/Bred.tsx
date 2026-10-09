"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { animate, m, useInView, useMotionTemplate, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { harSide, sideSti } from "@/data/behandlinger/sider";
import { cn } from "@/lib/utils";
import { TRE } from "../grupper";
import { FARGE } from "../popup/tegning";
import { Alle, Omslag, Scene } from "./deler";
import s from "./leporello.module.css";

/**
 * «Leporelloen» on a wide screen. The three scenes are printed on one long
 * strip folded like a concertina, with a fourth panel at the end that holds
 * all the treatments. It lies closed on the page, showing its cover; when it
 * comes into view it unfolds from the middle, fold by fold, and comes to
 * rest standing in a gentle zigzag, the panels catching the light from the
 * left by turns (the two middle panels flatter than the outer two, so their
 * words read straight on). Then each scene stands up in its panel, one after
 * the other, with what it shows printed on the paper under it.
 *
 * Each panel hangs on the right edge of the one before (the DOM nests them),
 * so a fold is one rotateY about that edge, and the angles add up.
 */

/** The angle the two outer panels stand at once open, from the page's plane. */
const VINKEL = 16;
/** The two middle panels' angle: flatter, so their words are not slanted. */
const MIDT = 6;
/** Closed, each fold is almost flat back on the panel before it. */
const LUKKET = 178;
/** How far the open strip reaches, in panel widths (the CSS's --bred). */
const SPENN = 2 * Math.cos((VINKEL * Math.PI) / 180) + 2 * Math.cos((MIDT * Math.PI) / 180);
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
    // the panels end at VINKEL, -MIDT, MIDT and -VINKEL
    const maal = [-(VINKEL + MIDT), 2 * MIDT, -(VINKEL + MIDT)];
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
  const skyv = useTransform(() => SPENN / 2 - (spenn.get()[0] + spenn.get()[1]) / 2);
  const flytt = useMotionTemplate`translateX(calc(var(--w) * ${skyv}))`;
  const skyggeVenstre = useTransform(() => spenn.get()[0] + skyv.get());
  const skyggeBredde = useTransform(() => spenn.get()[1] - spenn.get()[0]);
  const skyggeStil = {
    left: useMotionTemplate`calc(var(--w) * ${skyggeVenstre})`,
    width: useMotionTemplate`calc(var(--w) * ${skyggeBredde})`,
  };

  // a scene is pure picture; the words under it are the panel's text
  const scene = (k: number) => (
    <div aria-hidden="true" className="absolute inset-0">
      <Scene id={TRE[k].id} oppe={staar > k} spiller={synlig && staar > k} redusert={redusert} />
    </div>
  );
  const ord = (k: number) => (
    <div className={cn(ORD, "hero-loft")} style={{ animationPlayState: staar > k ? "running" : "paused", animationDelay: "0.25s" }}>
      <Ord k={k} />
    </div>
  );
  const side = (k: number, bilde: ReactNode) => <Side bilde={bilde}>{ord(k)}</Side>;

  return (
    <div ref={ref} className={s.bred}>
      <div className={s.bredBoks}>
        {/* The box's height: the four panels' words, stacked unseen in one
            cell, so every panel is as tall as the one with the most to say. */}
        <div aria-hidden="true" inert className={s.maal}>
          {[0, 1, 2, 3].map((k) => (
            <div key={k} className={ORD}>
              <Ord k={k} skjult />
            </div>
          ))}
        </div>

        {/* its shadow on the page */}
        <m.div aria-hidden="true" className={s.bredSkygge} style={skyggeStil} />

        <div className="absolute inset-0" style={{ perspective: 2400, perspectiveOrigin: "50% 35%" }}>
          <m.div className="absolute inset-y-0 left-0 w-[var(--w)]" style={{ transform: flytt, transformStyle: "preserve-3d" }}>
            <Panel forste ledd={fot} vinkel={a0} forside={side(0, scene(0))}>
              <Panel ledd={l1} vinkel={a1} forside={side(1, scene(1))}>
                <Panel ledd={l2} vinkel={a2} forside={side(2, scene(2))}>
                  <Panel ledd={l3} vinkel={a3} forside={<Register>{ord(3)}</Register>} bakside={<Omslag />} />
                </Panel>
              </Panel>
            </Panel>
          </m.div>
        </div>
      </div>
    </div>
  );
}

/** The words' place on a panel: under the scene, on the same paper. */
const ORD = "px-[8%] pb-[8%] pt-[6%]";

/** One panel's face: its picture at the top, as tall as the panel used to be, and its words under it. */
function Side({ bilde, children }: { bilde: ReactNode; children: ReactNode }) {
  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: FARGE.papir }}>
      <div className="relative shrink-0" style={{ height: "calc(var(--w) * 1.2)" }}>
        {bilde}
      </div>
      {children}
    </div>
  );
}

/**
 * What a panel says: the treatment, a few words and the way to its page; on
 * the last panel, the way to them all. (No small capitals over the names:
 * the scene and the words say which kind of treatment it is.) `skjult` is the unseen
 * copy that sizes the box, with no heading or link of its own.
 */
function Ord({ k, skjult = false }: { k: number; skjult?: boolean }) {
  const Tittel = skjult ? "p" : "h3";
  if (k === TRE.length) {
    return (
      <>
        <Lenke
          skjult={skjult}
          href="/behandlinger"
          className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-glomma)] px-6 py-3.5 text-[14px] font-semibold text-[var(--color-papir)] shadow-[0_12px_30px_-14px_rgba(22,48,59,0.7)] transition-colors duration-300 hover:bg-[var(--color-glomma-deep)]"
        >
          Se alle behandlingene
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
        </Lenke>
      </>
    );
  }
  const t = TRE[k];
  return (
    <>
      <Tittel className="font-bold text-[var(--color-glomma-deep)]" style={{ fontSize: "clamp(26px, 2.3vw, 32px)", lineHeight: 1, letterSpacing: "-0.03em" }}>
        {t.navn}
      </Tittel>
      <p className="mt-3 text-[16px] leading-[1.6] text-[var(--color-tekst-2)]">{t.tekst}</p>
      {harSide(t.id) && (
        <Lenke skjult={skjult} href={sideSti(t.id)} className="group mt-3 inline-flex items-center gap-1.5 text-[16px] font-semibold text-[var(--color-glomma)] underline underline-offset-4">
          Les mer om {t.navn.toLowerCase()}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
        </Lenke>
      )}
    </>
  );
}

/** A link, or in the unseen copy just its words. */
function Lenke({ skjult, href, className, children }: { skjult: boolean; href: string; className: string; children: ReactNode }) {
  if (skjult) return <span className={className}>{children}</span>;
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
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
      <div aria-hidden="true" className={cn(s.flate, s.bak)}>
        {bakside}
        <m.div className="pointer-events-none absolute inset-0 bg-[#3B3424]" style={{ opacity: skyggeBak }} />
      </div>
      {children}
    </m.div>
  );
}

/** The last panel: every treatment, set large enough to fill the whole page like the back of a book, and the way to them all at its foot. */
function Register({ children }: { children: ReactNode }) {
  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: FARGE.papir }}>
      <div className="flex min-h-0 flex-1 flex-col px-[9%] pt-[9%] text-[var(--color-glomma-deep)]">
        {/* 0.058: the largest that fits every width from 1024 to 1920 px (measured); any room left spreads between the groups */}
        <Alle className="flex flex-1 flex-col justify-between" style={{ fontSize: "calc(var(--w) * 0.058)", lineHeight: 1.45 }} />
      </div>
      <div className="mx-[8%] mt-[6%] border-t border-[var(--color-strek)]" />
      {children}
    </div>
  );
}
