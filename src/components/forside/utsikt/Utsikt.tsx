"use client";

import { getImageProps, type StaticImageData } from "next/image";
import { useEffect, useRef, useSyncExternalStore, type CSSProperties } from "react";
import { m, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import far from "./far.webp";
import near from "./near.webp";

/** The two depths of the view: the photograph unless a page asks for others (e.g. the drawn mockup). */
export type Lag = { far: StaticImageData; near: StaticImageData };
const FOTO: Lag = { far, near };
import s from "./utsikt.module.css";

/**
 * «Utsikten». The view from Kongsvinger festning on a summer day: the treetops
 * below the fortress hill, the farms and fields, and Glomma bending away
 * through the valley under a high blue sky.
 *
 * The photograph is cut in two depths (see lag.py): the far valley, and the
 * near treetops. The two breathe against each other, the pointer leans them,
 * and on the way down the page the valley lags behind the trees. A hero can
 * add its own entrance on top (an opening slit, or a camera move).
 *
 * Photo: «View from the Kongsvinger Fortress» by SiljeAO, Pexels licence.
 */

const REDUCE = "(prefers-reduced-motion: reduce)";
function subscribeReduce(cb: () => void) {
  const m = window.matchMedia(REDUCE);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
}

/** The photo's aspect ratio (4800 x 3200 layers) */
const AR = 1.5;

/** The one width phones get (it must be in next.config's deviceSizes). */
const TELEFON = 1600;

/**
 * One depth of the photograph. Wide screens choose from the full range of
 * widths by `sizes`; phones get a single 1600 px version, whatever their
 * pixel density: the panorama is about 1600 CSS px wide there (what PageSpeed
 * measures as displayed), and bigger files cost bytes for treetops a little
 * sharper than anyone sees in motion. Loaded eagerly at high priority, not through Next's preload, which
 * would fetch the wide-screen size on phones as well.
 */
function Dybdefoto({ src }: { src: StaticImageData }) {
  const felles = { src, alt: "", quality: 75 } as const;
  const { props: bred } = getImageProps({ ...felles, sizes: "max(130vw, 195vh)" });
  const { props: smal } = getImageProps({ ...felles, width: TELEFON, height: Math.round(TELEFON / AR) });
  // getImageProps gives the phone version as "…w=1600 1x, …w=3200 2x"; keep only the first
  const smalSrc = smal.srcSet?.split(", ")[0].split(" ")[0] ?? smal.src;
  return (
    <picture>
      <source media="(max-width: 767px)" srcSet={`${smalSrc} ${TELEFON}w`} sizes="max(130vw, 195vh)" />
      <img {...bred} alt="" loading="eager" fetchPriority="high" />
    </picture>
  );
}

/**
 * The view is ready (data-klar) once both photos are in, and the entrance
 * starts; data-klar-ved notes when, so useHeroKlar can keep time from it.
 * VAKT does this in the page's own HTML, before React wakes: a photo that is
 * cached, or just quicker than the page's scripts, has loaded before React
 * could listen for it (on 2026-10-09 the view stood still for 2.7–3.9 s
 * waiting on the fallback). The effect does the same for a visit by a link.
 */
const VAKT = `(function(s){var b=s.querySelectorAll("img"),n=0;function k(){if(++n<b.length||s.dataset.klar)return;s.dataset.klar="true";s.dataset.klarVed=String(Math.round(performance.now()))}b.forEach(function(i){if(i.complete)k();else{i.addEventListener("load",k);i.addEventListener("error",k)}})})(document.currentScript.parentElement)`;

function merkKlar(el: HTMLElement) {
  if (el.dataset.klar) return;
  el.dataset.klar = "true";
  el.dataset.klarVed = String(Math.round(performance.now()));
}

const ingen = () => () => {};

type Props = {
  /** horizontal spot (0–1 across the panorama) kept in view; phones can use another */
  fx?: number;
  fxSmal?: number;
  fy?: number;
  /** open out of the embrasure slit on first paint */
  skar?: boolean;
  /** enter with a camera glide from the panorama's top-left corner to the resting spot */
  glid?: boolean;
  /** enlarge beyond cover, to give a camera move room */
  zoom?: number;
  /** how far the valley lags behind on scroll, in % of the hero's height */
  etterslep?: number;
  className?: string;
  /** placed between the two depths, e.g. words that sit behind the ramparts */
  mellom?: React.ReactNode;
  /** other pictures for the two depths, in the same 3:2 shape */
  lag?: Lag;
};

export function Utsikt({ fx = 0.6, fxSmal = 0.7, fy = 0.5, skar = false, glid = false, zoom = 1, etterslep = 14, className, mellom, lag = FOTO }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useSyncExternalStore(subscribeReduce, () => window.matchMedia(REDUCE).matches, () => false);

  // The pointer, -1..1 across the scene, eased
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 50, damping: 18, mass: 1 });
  const sy = useSpring(py, { stiffness: 50, damping: 18, mass: 1 });
  const farX = useTransform(sx, (v) => v * -8);
  const farY = useTransform(sy, (v) => v * -4);
  const naerX = useTransform(sx, (v) => v * -24);
  const naerY = useTransform(sy, (v) => v * -10);

  // On the way down, the valley lags behind the fortress.
  const hoyde = useRef(900);
  const { scrollY } = useScroll();
  const fremdrift = useTransform(scrollY, (v) => Math.min(1, Math.max(0, v / hoyde.current)));
  const slep = useTransform(fremdrift, [0, 1], reduced ? ["0%", "0%"] : ["0%", `${etterslep}%`]);

  useEffect(() => {
    const el = ref.current;
    const vert = el?.parentElement;
    if (!el || !vert) return;
    const flytt = (e: PointerEvent) => {
      if (reduced || e.pointerType !== "mouse") return;
      const r = vert.getBoundingClientRect();
      px.set(((e.clientX - r.left) / r.width) * 2 - 1);
      py.set(((e.clientY - r.top) / r.height) * 2 - 1);
    };
    const ut = () => {
      px.set(0);
      py.set(0);
    };
    vert.addEventListener("pointermove", flytt);
    vert.addEventListener("pointerleave", ut);
    // Pause the breathing while the view is off screen.
    const synlig = new IntersectionObserver((e) => {
      el.dataset.on = String(e[e.length - 1].isIntersecting);
    });
    const storrelse = new ResizeObserver(() => {
      hoyde.current = el.offsetHeight || 900;
    });
    synlig.observe(el);
    storrelse.observe(el);
    return () => {
      vert.removeEventListener("pointermove", flytt);
      vert.removeEventListener("pointerleave", ut);
      synlig.disconnect();
      storrelse.disconnect();
    };
  }, [px, py, reduced]);

  // Hold the entrance until both depths are in, so it never moves over an
  // empty wall. If the photos are slow, start anyway after a moment.
  // True only while React takes over the server's HTML, where VAKT has run;
  // a page rendered in the browser leaves it out (a script there never runs).
  const fraTjener = useSyncExternalStore(ingen, () => false, () => true);
  useEffect(() => {
    const el = ref.current;
    if (!el || el.dataset.klar) return;
    const venter = [...el.querySelectorAll("img")].filter((b) => !b.complete);
    let igjen = venter.length;
    if (!igjen) {
      merkKlar(el);
      return;
    }
    const ferdig = () => {
      igjen -= 1;
      if (igjen === 0) merkKlar(el);
    };
    venter.forEach((b) => {
      b.addEventListener("load", ferdig, { once: true });
      b.addEventListener("error", ferdig, { once: true });
    });
    const t = window.setTimeout(() => merkKlar(el), 1500);
    return () => {
      window.clearTimeout(t);
      venter.forEach((b) => {
        b.removeEventListener("load", ferdig);
        b.removeEventListener("error", ferdig);
      });
    };
  }, []);

  const vars = { "--fx": fx, "--fy": fy, "--fx-smal": fxSmal, "--zoom": zoom, "--ar": AR } as CSSProperties;

  return (
    // suppressHydrationWarning: VAKT may already have added data-klar
    <div ref={ref} data-on="false" className={cn(s.scene, skar && s.skar, glid && s.glid, "utsikt", className)} style={vars} suppressHydrationWarning>
      {/* the two depths are pure picture; anything placed between them (mellom) stays reachable */}
      <m.div aria-hidden="true" className={s.dybde} style={{ y: slep }}>
        <div className={s.inngang}>
          <div className={s.pust}>
            <m.div className={cn(s.ramme, "utsikt-ramme")} style={{ x: farX, y: farY }}>
              <Dybdefoto src={lag.far} />
            </m.div>
          </div>
        </div>
      </m.div>

      {mellom}

      <div aria-hidden="true" className={s.dybde}>
        <div className={cn(s.inngang, s.inngangNaer)}>
          <div className={cn(s.pust, s.pustNaer)}>
            <m.div className={cn(s.ramme, "utsikt-ramme")} style={{ x: naerX, y: naerY }}>
              <Dybdefoto src={lag.near} />
            </m.div>
          </div>
        </div>
      </div>

      {fraTjener && <script dangerouslySetInnerHTML={{ __html: VAKT }} />}
    </div>
  );
}
