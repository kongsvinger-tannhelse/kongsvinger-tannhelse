"use client";

import Image from "next/image";
import { useRef, type CSSProperties } from "react";
import { motion, useInView, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { cn } from "@/lib/utils";
import { BOLGER, GLIMT, LAG, UTSNITT, viser, type Boks, type Utsnitt } from "./lag";
import s from "./brua.module.css";

/**
 * The foot of the front page, under «Kontakt»: the bridge over Glomma,
 * drawn. The old steel truss bridge on its stone piers, the far bank's
 * forest and fields under the blue hills, the river, the green bank and the
 * sandbar, the birch on the left and the pine branches hanging in from the
 * top (tools/tegn_brua.py). The page ends on the river.
 *
 * Three layers, stacked as plain images so the browser paints each once and
 * only moves them: the scene, the birch, the pine. As the drawing comes into
 * view the scene rises into place, the birch leans in from the left and the
 * pine drops in from above; after that the light glints on the water, the
 * birch and the pine move a little in the wind, and the near layers drift
 * against the scene as the page scrolls.
 */

const KILDE = "/images/tegninger/brua/";

/** A layer's place inside the crop, in percent of the crop. */
function plass(lag: Boks, u: Boks): CSSProperties {
  return {
    left: `${((lag.x - u.x) / u.b) * 100}%`,
    top: `${((lag.y - u.y) / u.h) * 100}%`,
    width: `${(lag.b / u.b) * 100}%`,
    height: `${(lag.h / u.h) * 100}%`,
  };
}

/**
 * The sky is open (the page shows through), so the pine branches would be
 * cut off in a hard line where the crop begins; instead they fade in from the
 * sky, a little below that line so the scroll drift never shows the edge.
 */
function toning(lag: Boks, u: Boks): CSSProperties {
  const fra = ((u.y - lag.y) / lag.h) * 100 + 4;
  const maske = `linear-gradient(to bottom, transparent ${fra}%, #000 ${fra + 16}%)`;
  return { maskImage: maske, WebkitMaskImage: maske };
}

function Bilde({ navn, lag }: { navn: keyof typeof LAG; lag: Boks }) {
  return (
    <Image
      src={`${KILDE}${navn}.svg`}
      alt=""
      width={lag.b}
      height={lag.h}
      unoptimized
      draggable={false}
      className="block size-full select-none"
    />
  );
}

function Tegning({ utsnitt, className }: { utsnitt: Utsnitt; className?: string }) {
  const u = UTSNITT[utsnitt];
  const ref = useRef<HTMLDivElement | null>(null);
  const vist = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const iBilde = useInView(ref);
  const redusert = useReducedMotion() ?? false;

  // the near layers drift against the scene as the page scrolls; both start
  // at 0 so the server's markup and the browser's first render agree
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bjorkY = useMotionValue(0);
  const furuY = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const k = redusert ? 0 : v - 0.5;
    bjorkY.set(-k * 44);
    furuY.set(k * 26);
  });

  const myk = (forsinkelse: number) =>
    redusert ? { duration: 0 } : { duration: 1.5, ease: [0.25, 0.1, 0.25, 1] as const, delay: forsinkelse };

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", vist && s.aktiv, vist && !iBilde && s.pause, className)}
      style={{ aspectRatio: `${u.b} / ${u.h}` }}
    >
      <motion.div
        className="absolute"
        style={plass(LAG.scene, u)}
        initial={{ opacity: 0, y: 16 }}
        animate={vist ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={myk(0)}
      >
        <Bilde navn="scene" lag={LAG.scene} />
      </motion.div>

      {/* the light on the water, over the scene and under the near layers */}
      <svg viewBox={`${u.x} ${u.y} ${u.b} ${u.h}`} className="absolute inset-0 size-full">
        {BOLGER.map((b, i) => (
          <rect key={`b${i}`} className={s.bolge} x={b.x} y={b.y} width={b.b} height={1.3} rx={0.65} fill="#E9EFEF" style={{ animationDelay: `${b.forsinkelse}s` }} />
        ))}
        {GLIMT.map((g, i) => (
          <rect
            key={i}
            className={s.glimt}
            x={g.x}
            y={g.y}
            width={g.b}
            height={g.h}
            rx={g.h / 2}
            fill="#F8FBFA"
            style={{ animationDelay: `${g.forsinkelse}s`, animationDuration: `${g.varighet}s` }}
          />
        ))}
      </svg>

      {viser(LAG.bjork, u) && (
        <motion.div className="absolute will-change-transform" style={{ ...plass(LAG.bjork, u), y: bjorkY }}>
          <motion.div
            className="size-full"
            initial={{ opacity: 0, x: -26 }}
            animate={vist ? { opacity: 1, x: 0 } : { opacity: 0, x: -26 }}
            transition={myk(0.2)}
          >
            <div className={cn("size-full", s.bjork)}>
              <Bilde navn="bjork" lag={LAG.bjork} />
            </div>
          </motion.div>
        </motion.div>
      )}

      {viser(LAG.furu, u) && (
        <motion.div className="absolute will-change-transform" style={{ ...plass(LAG.furu, u), ...toning(LAG.furu, u), y: furuY }}>
          <motion.div
            className="size-full"
            initial={{ opacity: 0, y: -30 }}
            animate={vist ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
            transition={myk(0.35)}
          >
            <div className={cn("size-full", s.furu)}>
              <Bilde navn="furu" lag={LAG.furu} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

/** The band itself: a wide crop for screens from md up, a narrower one for phones. */
export function Brua() {
  return (
    <div aria-hidden="true" className="pointer-events-none relative mx-auto -mt-[clamp(48px,7vw,104px)] w-full max-w-[1800px]">
      <Tegning utsnitt="smal" className="md:hidden" />
      <Tegning utsnitt="bred" className="hidden md:block" />
    </div>
  );
}
