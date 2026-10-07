"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { Images } from "lucide-react";
import { klinikk, klinikkbilder } from "@/data/klinikk";
import { Galleri } from "@/components/forside/Galleri";
import { useHeroKlar } from "@/components/forside/useHeroKlar";

// The three rooms, left to right; the middle arch is the tall one.
const BUER = [
  { indeks: 2, hoyde: 0.78 },
  { indeks: 0, hoyde: 1 },
  { indeks: 3, hoyde: 0.78 },
];
const EASE = [0.25, 0.1, 0.25, 1] as const;

/**
 * G — «Buegangen». The arch from Ringebu, a rectangle with a half circle on
 * top, three times over, like an arcade. When the camera has stopped, the
 * arches pop up one after the other, the room inside each flipping up from
 * flat the way a page stands up in a pop-up book. Then they keep still; a
 * hand over one makes it lean in, and a click opens the gallery.
 */
export function Buegangen() {
  const klar = useHeroKlar(3700);
  const redusert = useReducedMotion() ?? false;
  const [apen, setApen] = useState<number | null>(null);

  return (
    <>
      <div className="flex flex-col items-end md:mr-[clamp(0px,2vw,32px)]">
        <div className="flex items-end gap-[clamp(10px,1.2vw,18px)]">
          {BUER.map((b, n) => (
            <Bue key={b.indeks} indeks={b.indeks} hoyde={b.hoyde} n={n} vis={klar} redusert={redusert} onApne={setApen} />
          ))}
        </div>

        <motion.div
          className="mt-4 flex items-center gap-3 text-[13px] text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]"
          initial={{ opacity: 0, y: 6 }}
          animate={klar ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
          transition={redusert ? { duration: 0 } : { duration: 0.6, delay: 0.9, ease: EASE }}
        >
          <span className="max-md:hidden">Fra klinikken i {klinikk.adresse.gate}</span>
          <button
            type="button"
            onClick={() => setApen(0)}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 font-medium backdrop-blur-md transition-colors hover:bg-white/25"
          >
            <Images className="size-3.5" aria-hidden="true" />
            Se alle {klinikkbilder.length}
          </button>
        </motion.div>
      </div>
      <Galleri indeks={apen} onLukk={() => setApen(null)} onBytt={setApen} />
    </>
  );
}

function Bue({
  indeks,
  hoyde,
  n,
  vis,
  redusert,
  onApne,
}: {
  indeks: number;
  hoyde: number;
  n: number;
  vis: boolean;
  redusert: boolean;
  onApne: (i: number) => void;
}) {
  const bilde = klinikkbilder[indeks];
  // a hand over the arch makes it lean in, a little, toward the pointer
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 120, damping: 16 });
  const sy = useSpring(py, { stiffness: 120, damping: 16 });
  const rotateY = useTransform(sx, (v) => v * 7);
  const rotateX = useTransform(sy, (v) => v * -5);
  const forsinkelse = 0.1 + n * 0.16;

  return (
    <motion.div
      className="[perspective:900px]"
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
        className="group relative block overflow-hidden rounded-t-full shadow-[0_26px_50px_-26px_rgba(0,0,0,0.65)] ring-1 ring-white/25 [transform-style:preserve-3d]"
        style={{
          width: `calc(clamp(74px, 9.5vw, 136px) * ${hoyde === 1 ? 1.18 : 1})`,
          aspectRatio: `300 / ${Math.round(540 * (hoyde === 1 ? 1 : 0.92))}`,
          rotateX,
          rotateY,
        }}
      >
        {/* the room stands up from flat inside the arch, like a page in a pop-up book */}
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
            loading="eager"
            sizes="(min-width: 768px) 170px, 26vw"
            className="object-cover transition-transform duration-700 ease-[var(--ease-rolig)] group-hover:scale-[1.05]"
          />
          {/* a soft light at the crown of the arch */}
          <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_60%_at_50%_0%,rgba(255,255,255,0.18),transparent_60%)]" />
        </motion.span>
      </motion.button>
    </motion.div>
  );
}
