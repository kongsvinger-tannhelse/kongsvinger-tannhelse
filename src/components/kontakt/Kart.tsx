"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useId } from "react";
import { ArrowUpRight } from "lucide-react";
import { klinikk } from "@/data/klinikk";
import { cn } from "@/lib/utils";
import { FJELLGATA, GOOGLE_MAPS, KLINIKKHUS, NAVN, TEGNING, type Utsnitt } from "./kartdata";

/**
 * The drawn map of the clinic's part of town, cut to `utsnitt`. The drawing
 * is a picture (kart.svg); the clinic's house, the names and the pin are laid
 * over it here, so the type is the page's own. The pin, an arch with the
 * clinic's tooth in it, drops onto Fjellgata 4 on the hero's spring once
 * `vis` turns true. The whole map is one link to Google Maps.
 *
 * `skrift` is the size of the quiet names in map units; choose it so they come
 * out about 11px at the size the map is shown.
 */
export function Kart({
  utsnitt,
  vis,
  redusert,
  skrift = 11,
  papir = "#F6F3EB",
  className,
}: {
  utsnitt: Utsnitt;
  vis: boolean;
  redusert: boolean;
  skrift?: number;
  papir?: string;
  className?: string;
}) {
  const id = `fjellgata-${useId().replace(/:/g, "")}`;
  const { x, y, b, h } = utsnitt;

  return (
    <a
      href={GOOGLE_MAPS}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Vis ${klinikk.adresse.gate} i Google Maps (åpnes i ny fane)`}
      className={cn("group relative block overflow-hidden", className)}
      style={{ aspectRatio: `${b} / ${h}`, background: papir }}
    >
      <svg viewBox={`${x} ${y} ${b} ${h}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
        <image href={TEGNING.src} x={TEGNING.x} y={TEGNING.y} width={TEGNING.b} height={TEGNING.h} />
        <path d={KLINIKKHUS} fill="var(--color-teal)" stroke="var(--color-glomma-deep)" strokeWidth={1} />
        <path id={id} d={FJELLGATA} fill="none" />
        <text fontSize={skrift * 0.82} fill="#7C766A" letterSpacing={skrift * 0.06} fontWeight={500}>
          <textPath href={`#${id}`} startOffset="18%">
            Fjellgata
          </textPath>
        </text>
        {NAVN.map((n) => (
          <text
            key={n.tekst}
            x={n.x}
            y={n.y}
            textAnchor="middle"
            fontSize={n.slag === "vann" ? skrift * 1.25 : n.slag === "stor" ? skrift : skrift * 0.82}
            fontStyle={n.slag === "vann" ? "italic" : undefined}
            fontWeight={n.slag === "stor" ? 600 : 500}
            letterSpacing={n.slag === "strok" ? skrift * 0.22 : n.slag === "vann" ? skrift * 0.3 : 0}
            fill={n.slag === "vann" ? "#56777D" : n.slag === "stor" ? "#3E4A4F" : "#8E8778"}
            stroke={papir}
            strokeWidth={n.slag === "vann" ? 0 : skrift * 0.28}
            paintOrder="stroke"
          >
            {n.slag === "strok" ? n.tekst.toUpperCase() : n.tekst}
          </text>
        ))}
      </svg>

      {/* the pin, standing on the clinic */}
      <span className="pointer-events-none absolute" style={{ left: `${(-x / b) * 100}%`, top: `${(-y / h) * 100}%` }}>
        <motion.span
          className="absolute bottom-0 left-0 flex -translate-x-1/2 flex-col items-center"
          initial={{ y: -36, opacity: 0 }}
          animate={vis ? { y: 0, opacity: 1 } : { y: -36, opacity: 0 }}
          transition={
            redusert
              ? { duration: 0 }
              : { y: { type: "spring", stiffness: 85, damping: 13, delay: 0.55 }, opacity: { duration: 0.2, delay: 0.55 } }
          }
        >
          <span className="block rounded-t-full bg-[#FBF8F1] p-[3px] shadow-[0_10px_18px_-8px_rgba(10,25,32,0.65)]">
            <span className="relative block h-[38px] w-[30px] overflow-hidden rounded-t-full bg-[#5B9BA8]">
              <Image src="/images/merke.png" alt="" fill sizes="40px" className="scale-[1.25] object-cover" />
            </span>
          </span>
          <span className="block h-[9px] w-[2px] bg-[var(--color-glomma-deep)]" />
          <span className="block size-[6px] -translate-y-[1px] rounded-full bg-[var(--color-glomma-deep)]" />
        </motion.span>
        <motion.span
          className="absolute bottom-[26px] left-[24px] whitespace-nowrap rounded-[8px] bg-[#FBF8F1] px-2.5 py-1.5 shadow-[0_8px_18px_-10px_rgba(10,25,32,0.55)]"
          initial={{ opacity: 0, x: -6 }}
          animate={vis ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
          transition={redusert ? { duration: 0 } : { duration: 0.5, delay: 1.05, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <span className="block text-[12.5px] font-semibold leading-tight tracking-[-0.01em] text-[var(--color-glomma-deep)]">{klinikk.navn}</span>
          <span className="block text-[11.5px] leading-tight text-[var(--color-tekst-2)]">{klinikk.adresse.gate}</span>
        </motion.span>
      </span>

      <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-[#FBF8F1]/95 px-3.5 py-2 text-[12.5px] font-semibold text-[var(--color-glomma-deep)] shadow-[0_6px_16px_-8px_rgba(10,25,32,0.5)] transition-colors group-hover:bg-white">
        Vis i Google Maps
        <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px" aria-hidden="true" />
      </span>
    </a>
  );
}
