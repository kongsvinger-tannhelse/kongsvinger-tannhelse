"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { FORVARSEL } from "@/components/forside/utsikt/forvarsel";
import tegnet from "@/components/forside/utsikt/tegnet.webp";
import styles from "./bytte.module.css";

/*
 * Phones and tablets (below lg): the frame under the words opens on the
 * drawing of the view over Glomma, and a moment later the treatment room
 * sweeps in from the left behind a slanted edge (the hero's own diagonal),
 * with a rim of low sun along it. «Snitt», chosen 2026-10-12 from three
 * proposals (the others: the photo opening out of the drawing's sun, and the
 * frame flooding with light; in git history).
 *
 * It waits for the photo to have loaded, and for VENT ms since the page
 * started loading (not since the scripts woke up), so a slow phone doesn't
 * get a longer look at the drawing. With reduced motion the photo simply
 * takes over, without the sweep.
 */

const ROMMET = "/images/klinikk/behandlingsrom.webp";
const VENT = 1100;

export function Bytte({ className }: { className?: string }) {
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
      <div className={styles.innhold} data-fase={bilde ? "bilde" : "tegning"}>
        {/* the drawing, framed on the sun, the bridge and the town; its miniature until it has come */}
        <div aria-hidden="true" className={styles.tegning}>
          <div className={styles.flytt}>
            <Image src={tegnet} alt="" fill preload sizes="(min-width: 1024px) 100vw, 170vw" className="object-cover" style={FORVARSEL} />
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

        {/* the rim of sun on the edge */}
        <div aria-hidden="true" className={styles.lys} />
      </div>
    </div>
  );
}
