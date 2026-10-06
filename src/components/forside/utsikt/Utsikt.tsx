"use client";

import Image from "next/image";
import { useEffect, useRef, useSyncExternalStore, type CSSProperties } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import far from "./far.webp";
import near from "./near.webp";
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

type Props = {
  /** horizontal spot (0–1 across the panorama) kept in view; phones can use another */
  fx?: number;
  fxSmal?: number;
  fy?: number;
  /** open out of the embrasure slit on first paint */
  skar?: boolean;
  /** enlarge beyond cover, to give a camera move room */
  zoom?: number;
  /** how far the valley lags behind on scroll, in % of the hero's height */
  etterslep?: number;
  className?: string;
  /** placed between the two depths, e.g. words that sit behind the ramparts */
  mellom?: React.ReactNode;
};

export function Utsikt({ fx = 0.6, fxSmal = 0.7, fy = 0.5, skar = false, zoom = 1, etterslep = 14, className, mellom }: Props) {
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

  // Hold the entrance until both depths are decoded, so the slit never opens
  // onto an empty wall. If the photos are slow, open anyway after a moment.
  const lastet = useRef(0);
  const klar = () => {
    lastet.current += 1;
    if (lastet.current >= 2 && ref.current) ref.current.dataset.klar = "true";
  };
  useEffect(() => {
    const t = window.setTimeout(() => {
      if (ref.current) ref.current.dataset.klar = "true";
    }, 2500);
    return () => window.clearTimeout(t);
  }, []);

  const vars = { "--fx": fx, "--fy": fy, "--fx-smal": fxSmal, "--zoom": zoom, "--ar": AR } as CSSProperties;

  return (
    <div ref={ref} data-on="false" aria-hidden="true" className={cn(s.scene, skar && s.skar, "utsikt", className)} style={vars}>
      <motion.div className={s.dybde} style={{ y: slep }}>
        <div className={s.inngang}>
          <div className={s.pust}>
            <motion.div className={cn(s.ramme, "utsikt-ramme")} style={{ x: farX, y: farY }}>
              <Image src={far} alt="" priority sizes="max(130vw, 195vh)" quality={90} onLoad={klar} />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {mellom}

      <div className={s.dybde}>
        <div className={cn(s.inngang, s.inngangNaer)}>
          <div className={cn(s.pust, s.pustNaer)}>
            <motion.div className={cn(s.ramme, "utsikt-ramme")} style={{ x: naerX, y: naerY }}>
              <Image src={near} alt="" priority sizes="max(130vw, 195vh)" quality={90} onLoad={klar} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
