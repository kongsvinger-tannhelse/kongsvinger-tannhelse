"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { klinikkbilder } from "@/data/klinikk";
import { Galleri } from "@/components/forside/Galleri";
import { useHeroKlar } from "@/components/forside/useHeroKlar";
import { cn } from "@/lib/utils";

const EASE = [0.25, 0.1, 0.25, 1] as const;

// By index into klinikkbilder: the arch, and the two squares stacked beside it.
const BUE = 0; // the treatment room in its round mirror
const SMA = [3, 2]; // the treatment chair, the waiting room

/**
 * H — «Buen og rutene». One arch, as on Ringebu: a tall rectangle with a
 * half circle on top, and the treatment room in it. Beside it, two plain
 * squares with four corners, one over the other. When the camera has stopped
 * they pop up in turn, the arch first, each room standing up from flat like a
 * page in a pop-up book. Then they keep still; a hand over one leans it in,
 * a click opens the gallery.
 *
 * Geometry: the column of squares is as tall as the arch, the arch is 300:540
 * like Ringebu's, so the arch takes 0.526 of the width (less the gap) and the
 * group is about 1.06 times as wide as it is tall. Its size follows the
 * screen's width and height, whichever is tighter. No caption: a click on
 * any of the three opens the full set.
 */
export function BuenOgRutene() {
  const klar = useHeroKlar(3700);
  const redusert = useReducedMotion() ?? false;
  const [apen, setApen] = useState<number | null>(null);

  return (
    <>
      <div
        className="w-[66vw] self-end md:mr-[clamp(0px,1vw,16px)] md:w-[clamp(290px,min(35.7vw,56vh),545px)] md:self-auto"
        style={{ "--mellom": "clamp(8px, 1vw, 14px)" } as CSSProperties}
      >
        <div
          className="grid"
          style={{
            gridTemplateColumns: "calc((100% - var(--mellom)) * 0.526) 1fr",
            gridTemplateRows: "1fr 1fr",
            gap: "var(--mellom)",
            aspectRatio: "1.06 / 1",
          }}
        >
          <Flis indeks={BUE} form="bue" n={0} vis={klar} redusert={redusert} onApne={setApen} className="row-span-2" sizes="(min-width: 768px) 340px, 40vw" />
          {SMA.map((indeks, k) => (
            <Flis key={indeks} indeks={indeks} form="rute" n={1 + k} vis={klar} redusert={redusert} onApne={setApen} sizes="(min-width: 768px) 300px, 36vw" />
          ))}
        </div>

      </div>
      <Galleri indeks={apen} onLukk={() => setApen(null)} onBytt={setApen} />
    </>
  );
}

function Flis({
  indeks,
  form,
  n,
  vis,
  redusert,
  onApne,
  className,
  sizes,
}: {
  indeks: number;
  form: "bue" | "rute";
  n: number;
  vis: boolean;
  redusert: boolean;
  onApne: (i: number) => void;
  className?: string;
  sizes: string;
}) {
  const bilde = klinikkbilder[indeks];
  // a hand over the pane leans it in, a little, toward the pointer
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 16 });
  const sy = useSpring(py, { stiffness: 120, damping: 16 });
  const rotateY = useTransform(sx, (v) => v * (form === "bue" ? 6 : 4));
  const rotateX = useTransform(sy, (v) => v * -4);
  const forsinkelse = 0.1 + n * 0.17;

  return (
    <motion.div
      className={cn("relative min-h-0 [perspective:1000px]", className)}
      initial={{ opacity: 0, y: 26 }}
      animate={vis ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
      transition={redusert ? { duration: 0 } : { duration: 0.55, delay: forsinkelse, ease: EASE }}
    >
      <motion.button
        type="button"
        onClick={() => onApne(indeks)}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          px.set(((e.clientX - r.left) / r.width) * 2 - 1);
          py.set(((e.clientY - r.top) / r.height) * 2 - 1);
        }}
        onPointerLeave={() => {
          px.set(0);
          py.set(0);
        }}
        aria-label={`Vis bildet: ${bilde.tekst}`}
        className={cn(
          "group absolute inset-0 block overflow-hidden shadow-[0_26px_50px_-26px_rgba(0,0,0,0.65)] ring-1 ring-white/25 [transform-style:preserve-3d]",
          form === "bue" ? "rounded-t-full" : "rounded-[10px]"
        )}
        style={{ rotateX, rotateY }}
      >
        {/* the room stands up from flat, like a page in a pop-up book */}
        <motion.span
          className="absolute inset-0 block origin-bottom"
          initial={{ rotateX: 88, opacity: 0 }}
          animate={vis ? { rotateX: 0, opacity: 1 } : { rotateX: 88, opacity: 0 }}
          transition={
            redusert
              ? { duration: 0 }
              : {
                  rotateX: { type: "spring", stiffness: 85, damping: 13, delay: forsinkelse + 0.25 },
                  opacity: { duration: 0.25, delay: forsinkelse + 0.25 },
                }
          }
        >
          <Image
            src={bilde.src}
            alt=""
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-700 ease-[var(--ease-rolig)] group-hover:scale-[1.05]"
          />
          {form === "bue" && (
            <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_50%_at_50%_0%,rgba(255,255,255,0.18),transparent_60%)]" />
          )}
        </motion.span>
      </motion.button>
    </motion.div>
  );
}
