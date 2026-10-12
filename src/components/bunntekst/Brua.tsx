"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";
import {
  m,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { BOLGER, GLIMT, LAG, UTSNITT, viser, type Boks, type Utsnitt } from "./lag";
import { LAMPER, speilbiter, type Lampe } from "./lamper";
import s from "./brua.module.css";

/**
 * The top of the footer: the bridge over Glomma, drawn. The old steel truss
 * bridge on its stone piers, the far bank's forest and fields under the blue
 * hills, the river, the green bank and the sandbar, the birch on the left and
 * the pine branches hanging in from the top (tools/tegn_brua.py).
 *
 * Three layers, stacked as plain images so the browser paints each once and
 * only moves them: the scene, the birch, the pine. As the drawing comes into
 * view the scene rises into place, the birch leans in from the left and the
 * pine drops in from above; then the light glints on the water, the birch
 * and the pine move a little in the wind, and the near layers drift against
 * the scene as the page scrolls.
 *
 * And evening falls as the reader comes down to it (`skumring`, 0 = day,
 * 1 = night, tied to the scroll): a dusk sky warms behind the hills, the
 * landscape dims, and the bridge's lamps light one by one along the deck,
 * each with its light on the water. At its foot the river runs into the
 * footer's own colour (`overgang`).
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
    <Image src={`${KILDE}${navn}.svg`} alt="" width={lag.b} height={lag.h} unoptimized draggable={false} className="block size-full select-none" />
  );
}

/** One lamp: it lights when the evening has come far enough, and its light falls on the water. */
function Lys({ lampe, skumring, terskel, glod }: { lampe: Lampe; skumring: MotionValue<number>; terskel: number; glod: string }) {
  const opacity = useTransform(skumring, [terskel, terskel + 0.06], [0, 1]);
  const r = lampe.langt ? 13 : 17;
  return (
    <m.g style={{ opacity }}>
      {speilbiter(lampe).map((b) => (
        <rect key={b.y} x={b.x - b.b / 2} y={b.y} width={b.b} height={1.6} rx={0.8} fill="#FFD48A" opacity={b.o} />
      ))}
      <circle cx={lampe.x} cy={lampe.y} r={r} fill={`url(#${glod})`} />
      <circle cx={lampe.x} cy={lampe.y} r={lampe.langt ? 1.3 : 1.7} fill="#FFF6DE" />
    </m.g>
  );
}

function Tegning({ utsnitt, skumring, overgang, className }: { utsnitt: Utsnitt; skumring: MotionValue<number>; overgang: string; className?: string }) {
  const u = UTSNITT[utsnitt];
  const ref = useRef<HTMLDivElement | null>(null);
  const vist = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const iBilde = useInView(ref);
  const redusert = useReducedMotion() ?? false;
  const glod = `glod-${useId().replace(/:/g, "")}`;

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

  // the lamps in this crop, lit from the left as the evening deepens
  const lamper = LAMPER.filter((l) => l.x > u.x && l.x < u.x + u.b);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", vist && s.aktiv, vist && !iBilde && s.pause, className)} style={{ aspectRatio: `${u.b} / ${u.h}` }}>
      {/* the dusk sky, behind the scene, whose own sky is open */}
      <m.div
        className="absolute inset-0"
        style={{
          opacity: skumring,
          background:
            "linear-gradient(to bottom, rgba(110,111,146,0) 0%, rgba(110,111,146,0.22) 7%, rgba(150,124,140,0.55) 13%, rgba(201,143,126,0.85) 19%, #EBB58C 24%, #F0C597 30%)",
        }}
      />

      <m.div className="absolute" style={plass(LAG.scene, u)} initial={{ opacity: 0, y: 16 }} animate={vist ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }} transition={myk(0)}>
        <Bilde navn="scene" lag={LAG.scene} />
      </m.div>

      {/* the light on the water, over the scene and under the near layers */}
      <svg viewBox={`${u.x} ${u.y} ${u.b} ${u.h}`} className="absolute inset-0 size-full">
        {BOLGER.map((b, i) => (
          <rect key={`b${i}`} className={s.bolge} x={b.x} y={b.y} width={b.b} height={1.3} rx={0.65} fill="#E9EFEF" style={{ animationDelay: `${b.forsinkelse}s` }} />
        ))}
        {GLIMT.map((g, i) => (
          <rect key={i} className={s.glimt} x={g.x} y={g.y} width={g.b} height={g.h} rx={g.h / 2} fill="#F8FBFA" style={{ animationDelay: `${g.forsinkelse}s`, animationDuration: `${g.varighet}s` }} />
        ))}
      </svg>

      {viser(LAG.bjork, u) && (
        <m.div className="absolute will-change-transform" style={{ ...plass(LAG.bjork, u), y: bjorkY }}>
          <m.div className="size-full" initial={{ opacity: 0, x: -26 }} animate={vist ? { opacity: 1, x: 0 } : { opacity: 0, x: -26 }} transition={myk(0.2)}>
            <div className={cn("size-full", s.bjork)}>
              <Bilde navn="bjork" lag={LAG.bjork} />
            </div>
          </m.div>
        </m.div>
      )}

      {viser(LAG.furu, u) && (
        <m.div className="absolute will-change-transform" style={{ ...plass(LAG.furu, u), ...toning(LAG.furu, u), y: furuY }}>
          <m.div className="size-full" initial={{ opacity: 0, y: -30 }} animate={vist ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }} transition={myk(0.35)}>
            <div className={cn("size-full", s.furu)}>
              <Bilde navn="furu" lag={LAG.furu} />
            </div>
          </m.div>
        </m.div>
      )}

      {/* the landscape dims; the top stays clear so the page above runs into the sky */}
      <m.div
        className="absolute inset-0"
        style={{
          opacity: skumring,
          background: "linear-gradient(to bottom, rgba(22,30,56,0) 0%, rgba(22,30,56,0.18) 16%, rgba(18,30,52,0.46) 34%, rgba(14,26,44,0.58) 100%)",
        }}
      />
      <svg viewBox={`${u.x} ${u.y} ${u.b} ${u.h}`} className="absolute inset-0 size-full">
        <defs>
          <radialGradient id={glod}>
            <stop offset="0" stopColor="#FFE9B8" stopOpacity="0.95" />
            <stop offset="0.3" stopColor="#FFCB7A" stopOpacity="0.4" />
            <stop offset="1" stopColor="#FFB45C" stopOpacity="0" />
          </radialGradient>
        </defs>
        {lamper.map((l, i) => (
          <Lys key={`${l.x}-${l.y}`} lampe={l} skumring={skumring} terskel={0.5 + (i / Math.max(1, lamper.length - 1)) * 0.3} glod={glod} />
        ))}
      </svg>

      {/* the river runs on into the footer */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[34%]"
        style={{ background: `linear-gradient(to bottom, transparent 0%, color-mix(in srgb, ${overgang} 55%, transparent) 50%, ${overgang} 100%)` }}
      />
    </div>
  );
}

const BRED = "(min-width: 768px)";
function lytt(cb: () => void) {
  const m = window.matchMedia(BRED);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
}

/** The room a crop takes before it is drawn, so nothing moves when it comes. */
function Plass({ utsnitt, className }: { utsnitt: Utsnitt; className?: string }) {
  const u = UTSNITT[utsnitt];
  return <div className={className} style={{ aspectRatio: `${u.b} / ${u.h}` }} />;
}

/**
 * The band: a wide crop from md up, a narrower one on phones. Full width, so
 * its foot meets the footer (`overgang` is the footer's colour); it rises a
 * little into the empty space at the foot of the section above. The evening
 * is measured over the band itself, from its top near the bottom of the
 * screen to its foot a little above the middle, so the lamps are lit while
 * it is in sight.
 *
 * The drawing (some 300 elements a crop) is only built once the reader is
 * within a couple of screens of it, and only the crop the screen shows: it
 * is on every page, and building it while the page starts up held the
 * phone's processor for longer than anything above it. Until then its room
 * is kept, so the page doesn't move. Its entrance waits for the reader anyway.
 */
export function Brua({ overgang }: { overgang: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.55"] });
  const skumring = useTransform(scrollYProgress, [0.12, 0.95], [0, 1]);
  const bred = useSyncExternalStore(lytt, () => window.matchMedia(BRED).matches, () => null);
  const [naer, setNaer] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || naer) return;
    const obs = new IntersectionObserver((e) => e.some((x) => x.isIntersecting) && setNaer(true), { rootMargin: "1600px 0px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, [naer]);

  const tegnet = naer && bred !== null;
  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none relative -mt-[clamp(48px,7vw,104px)] w-full">
      {tegnet && !bred ? <Tegning utsnitt="smal" skumring={skumring} overgang={overgang} className="md:hidden" /> : <Plass utsnitt="smal" className="md:hidden" />}
      {tegnet && bred ? <Tegning utsnitt="bred" skumring={skumring} overgang={overgang} className="hidden md:block" /> : <Plass utsnitt="bred" className="hidden md:block" />}
    </div>
  );
}
