"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import farTegnet from "@/components/forside/utsikt/far-tegnet.webp";
import naerTegnet from "@/components/forside/utsikt/near-tegnet.webp";
import styles from "./mobilbytte.module.css";

/*
 * MOCKUP (phones and tablets, below lg): the frame under the words opens on
 * the drawing of the view over Glomma, and a moment later the treatment room
 * takes its place. Three ways for it to come in:
 *
 *   snitt         — the photo sweeps in from the left behind a slanted edge
 *                   (the hero's own diagonal) with a rim of low sun on it.
 *   sola          — the photo opens out of the sun in the drawing, a soft
 *                   circle growing until it fills the frame.
 *   fremkalling   — the camera drifts towards the town while it waits, then
 *                   the sun floods the frame with light and the room comes
 *                   up out of it, like a photo developing.
 *
 * It waits for the photo to have loaded, and for VENT ms since the page
 * started loading (not since the scripts woke up), so a slow phone doesn't
 * get a longer look at the drawing. With reduced motion: no movement, the
 * photo simply takes over.
 */

export type Variant = "snitt" | "sola" | "fremkalling";

const ROMMET = "/images/klinikk/behandlingsrom.webp";
const VENT = 1100;

export function MobilBytte({ variant, className }: { variant: Variant; className?: string }) {
  const [lastet, setLastet] = useState(false);
  const [bilde, setBilde] = useState(false);
  const foto = useRef<HTMLImageElement>(null);

  // the photo may have finished before React woke up, and missed onLoad
  useEffect(() => {
    if (foto.current?.complete) setLastet(true);
  }, []);

  useEffect(() => {
    if (!lastet) return;
    const rolig = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = window.setTimeout(() => setBilde(true), rolig ? 0 : Math.max(0, VENT - performance.now()));
    return () => window.clearTimeout(t);
  }, [lastet]);

  return (
    <div className={cn(styles.rute, className)}>
      <div className={cn(styles.innhold, styles[variant])} data-fase={bilde ? "bilde" : "tegning"}>
        {/* the drawing: its two layers, framed on the sun, the bridge and the town */}
        <div aria-hidden="true" className={styles.tegning}>
          <div className={styles.flytt}>
            {[farTegnet, naerTegnet].map((lag, i) => (
              <Image key={i} src={lag} alt="" fill priority sizes="(min-width: 1024px) 100vw, 170vw" className="object-cover" />
            ))}
          </div>
        </div>

        <div className={styles.foto}>
          <div className={styles.flytt}>
            <Image
              ref={foto}
              src={ROMMET}
              alt="Behandlingsrommet: stolen, instrumentene og brettet"
              fill
              loading="eager"
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover"
              onLoad={() => setLastet(true)}
            />
          </div>
        </div>

        {/* the light that rides on the change */}
        <div aria-hidden="true" className={styles.lys} />
      </div>
    </div>
  );
}
