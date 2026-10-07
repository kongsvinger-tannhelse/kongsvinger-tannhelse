"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, type TargetAndTransition, type Transition } from "framer-motion";
import { Images } from "lucide-react";
import { klinikk, klinikkbilder } from "@/data/klinikk";
import { Galleri } from "@/components/forside/Galleri";
import { useHeroKlar } from "@/components/forside/useHeroKlar";

const N = klinikkbilder.length;
const SYNLIGE = 4; // prints you can see in the stack
const VIS = 4600;

const REDUCE = "(prefers-reduced-motion: reduce)";
const abonner = (cb: () => void) => {
  const m = window.matchMedia(REDUCE);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};

/** Where a print sits, by how deep in the stack it is (0 = on top). */
function plass(d: number, vifte: boolean) {
  if (vifte) {
    // fanned like a hand of cards, pivoting low under the stack
    const k = Math.min(d, SYNLIGE - 1) - (SYNLIGE - 1) / 2;
    // shifted left, into the open sky, so the top print stays on screen
    return { x: `${-k * 24 - 32}%`, y: Math.abs(k) * 12 - 14, rotate: -k * 7, scale: 0.9, opacity: d < SYNLIGE ? 1 : 0 };
  }
  return { x: `${d * 4.5}%`, y: d * -12, rotate: d * 2.4, scale: 1 - d * 0.045, opacity: d < SYNLIGE ? 1 - d * 0.1 : 0 };
}

/**
 * B — «Kortstokken». Once the camera has stopped, a small stack of prints is
 * dealt onto the view, one by one, the way you would lay photos on a table
 * for someone. Every few seconds the top print slides away and the next room
 * is under it. Hover and the stack fans out in your hand; pick any print to
 * see it large.
 */
export function Kortstokken() {
  const klar = useHeroKlar(3700);
  const redusert = useSyncExternalStore(abonner, () => window.matchMedia(REDUCE).matches, () => false);
  const [topp, setTopp] = useState(0);
  const [flyttet, setFlyttet] = useState(false); // the top print has just been slid away
  const [vifte, setVifte] = useState(false);
  const [apen, setApen] = useState<number | null>(null);

  useEffect(() => {
    if (!klar || vifte || apen !== null) return;
    const t = window.setInterval(() => {
      setTopp((n) => (n + 1) % N);
      setFlyttet(true);
    }, VIS);
    return () => window.clearInterval(t);
  }, [klar, vifte, apen]);

  const fanne = (v: boolean) => {
    setVifte(v);
    setFlyttet(false);
  };
  const ut = (topp - 1 + N) % N;

  return (
    <>
      <div className="w-[46vw] md:mr-[clamp(0px,2vw,32px)] md:w-[clamp(220px,min(28vw,44vh),380px)]">
        <div
          className="relative aspect-[4/3]"
          onPointerEnter={(e) => e.pointerType === "mouse" && fanne(true)}
          onPointerLeave={() => fanne(false)}
        >
          {klinikkbilder.map((b, i) => {
            const d = (i - topp + N) % N;
            const mal = plass(d, vifte);
            let animate: TargetAndTransition = mal;
            let transition: Transition = { type: "spring", stiffness: 170, damping: 23 };

            if (!klar) {
              // waiting off to the right, to be dealt in
              animate = { x: "150%", y: -40, rotate: 14, scale: 1, opacity: 0 };
              transition = { duration: 0 };
            } else if (flyttet && i === ut && !vifte && !redusert) {
              // the print that just left the top slides off to the left, then slips in at the back
              animate = {
                x: ["0%", "-125%", mal.x],
                y: [0, 46, mal.y],
                rotate: [0, -15, mal.rotate],
                scale: [1, 0.96, mal.scale],
                opacity: [1, 0, 0],
              };
              transition = { duration: 1.15, times: [0, 0.55, 1], ease: [0.4, 0, 0.2, 1] };
            } else if (!flyttet && !vifte) {
              // the deal: the bottom print lands first, the top one last
              transition = { type: "spring", stiffness: 120, damping: 20, delay: (SYNLIGE - 1 - Math.min(d, SYNLIGE - 1)) * 0.16 };
            }
            if (redusert) transition = { duration: 0 };

            return (
              <motion.button
                key={b.src}
                type="button"
                onClick={() => setApen(i)}
                aria-label={`Vis bildet: ${b.tekst}`}
                tabIndex={d < SYNLIGE ? 0 : -1}
                className="absolute inset-0 rounded-[8px] bg-[#fbfbf8] p-[5px] shadow-[0_26px_50px_-24px_rgba(8,20,26,0.8)] outline-offset-4"
                style={{ zIndex: N - d, transformOrigin: vifte ? "50% 150%" : "50% 50%" }}
                initial={false}
                animate={animate}
                transition={transition}
              >
                <span className="relative block h-full w-full overflow-hidden rounded-[4px]">
                  <Image src={b.src} alt="" fill loading="eager" sizes="(min-width: 768px) 380px, 46vw" className="object-cover" />
                </span>
              </motion.button>
            );
          })}
        </div>

        <motion.div
          className="mt-7 hidden items-center justify-between gap-3 text-[13px] text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.5)] md:flex"
          initial={false}
          animate={{ opacity: klar ? 1 : 0, y: klar ? 0 : 6 }}
          transition={{ duration: 0.6, delay: klar && !flyttet ? 0.9 : 0 }}
        >
          <span>
            <span className="block font-semibold">{klinikkbilder[topp].tekst}</span>
            <span className="text-white/70">Fra klinikken i {klinikk.adresse.gate}</span>
          </span>
          <button
            type="button"
            onClick={() => setApen(topp)}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 font-medium backdrop-blur-md transition-colors hover:bg-white/25"
          >
            <Images className="size-3.5" aria-hidden="true" />
            Se alle {N}
          </button>
        </motion.div>
      </div>
      <Galleri indeks={apen} onLukk={() => setApen(null)} onBytt={setApen} />
    </>
  );
}
