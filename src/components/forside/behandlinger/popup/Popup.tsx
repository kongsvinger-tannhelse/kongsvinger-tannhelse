"use client";

import { createContext, useContext, useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { motion } from "framer-motion";
import s from "./popup.module.css";

/**
 * The paper pop-up engine. Every scene is drawn on a page 400 × 480, cut
 * from sheets that lie flat while the stage turns, then stand up in turn,
 * back to front, with the hero's spring. When the stage is about to turn
 * again they fold back down, front first.
 */

export const SIDE = { b: 400, h: 480 } as const;

export type PopupProps = {
  /** True while the pieces stand; false while the stage turns. */
  oppe: boolean;
  /** True while the scene is on screen and standing: loops and stories play. */
  spiller: boolean;
  redusert: boolean;
};

/** The pop-up spring, the same as the hero's. */
export const FJAER = { type: "spring", stiffness: 85, damping: 13 } as const;

/** How long the sheets take to fold flat, front first. */
export const FOLD_MS = 420;

const ISkygge = createContext(false);

/**
 * The scene's own box, always 400 × 480 in proportion, covering whatever
 * window it is put in and anchored at its foot. The CSS loops place their
 * pivots in this box, so it must never be squeezed.
 */
export function Kasse({ children }: { children: ReactNode }) {
  return (
    <div
      className="absolute bottom-0 left-1/2 h-full min-w-full -translate-x-1/2"
      style={{ aspectRatio: `${SIDE.b} / ${SIDE.h}`, perspective: 1100, perspectiveOrigin: "50% 30%" }}
    >
      {children}
    </div>
  );
}

/** The shadow a sheet throws on the page: its shapes again, lower, in one tint. */
export function Skygge({ dy = 5, children }: { dy?: number; children: ReactNode }) {
  if (useContext(ISkygge)) return null;
  return (
    <ISkygge.Provider value>
      <g className={s.skygge} transform={`translate(0 ${dy})`}>
        {children}
      </g>
    </ISkygge.Provider>
  );
}

/** Lines and light throw no shadow. */
export function UtenSkygge({ children }: { children: ReactNode }) {
  return useContext(ISkygge) ? null : <>{children}</>;
}

/** The page's box, fitted to the page. */
export function Flate({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <svg
      viewBox={`0 0 ${SIDE.b} ${SIDE.h}`}
      preserveAspectRatio="xMidYMax meet"
      className={`absolute inset-0 h-full w-full overflow-visible ${className ?? ""}`}
      style={style}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/** A loose drawing above the sheets that throws its own shadow. */
export function Fri({ children, skygge = true }: { children: ReactNode; skygge?: boolean }) {
  return (
    <Flate>
      {skygge && <Skygge>{children}</Skygge>}
      {children}
    </Flate>
  );
}

/** One sheet, hinged at the foot of the page. `n` is its place in the order, back to front. */
export function Ark({
  n,
  av = 4,
  oppe,
  redusert,
  skygge = true,
  over,
  children,
}: {
  n: number;
  /** How many sheets the scene has, so they fold down front first. */
  av?: number;
  oppe: boolean;
  redusert: boolean;
  skygge?: boolean;
  /** Drawn on the sheet but outside its own shadow: loops and moving parts. */
  over?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <motion.div
      className="absolute inset-0"
      style={{ transformOrigin: "50% 100%" }}
      initial={{ rotateX: 88, opacity: 0 }}
      animate={oppe ? { rotateX: 0, opacity: 1 } : { rotateX: 88, opacity: 0 }}
      transition={
        redusert
          ? { duration: 0 }
          : oppe
            ? { rotateX: { ...FJAER, delay: 0.08 + n * 0.12 }, opacity: { duration: 0.2, delay: 0.08 + n * 0.12 } }
            : { duration: 0.3, ease: [0.5, 0, 0.75, 0], delay: Math.max(0, av - n) * 0.03 }
      }
    >
      {children && (
        <Flate>
          {skygge && <Skygge>{children}</Skygge>}
          {children}
        </Flate>
      )}
      {over}
    </motion.div>
  );
}

/** A layer with a CSS loop (see popup.module.css), so the loop moves a finished picture. */
export function Los({ klasse, spiller, skygge = true, style, children }: { klasse?: string; spiller: boolean; skygge?: boolean; style?: CSSProperties; children: ReactNode }) {
  return (
    <div className={`${s.los} ${klasse ?? ""}`} data-on={spiller} style={style}>
      <Fri skygge={skygge}>{children}</Fri>
    </div>
  );
}

/** A piece lowered onto the page on two strings, or lifted off it. */
export function Senk({
  nede,
  redusert,
  fra = -520,
  snorer,
  fjaer = { stiffness: 42, damping: 9, mass: 1.1 },
  children,
}: {
  /** True once the piece has come down; false while it hangs above, out of sight. */
  nede: boolean;
  redusert: boolean;
  /** How far above its place it hangs. */
  fra?: number;
  /** The strings, drawn up from the piece; they show only while it travels. */
  snorer?: { d: string; synlige: boolean };
  fjaer?: { stiffness: number; damping: number; mass?: number };
  children: ReactNode;
}) {
  return (
    <motion.g
      initial={false}
      animate={{ y: nede ? 0 : fra }}
      transition={redusert ? { duration: 0 } : nede ? { type: "spring", ...fjaer } : { duration: 1.2, ease: [0.5, 0, 0.3, 1] }}
    >
      {snorer && (
        <UtenSkygge>
          <motion.path
            d={snorer.d}
            fill="none"
            stroke="#16303B"
            strokeWidth={1.2}
            initial={false}
            animate={{ opacity: snorer.synlige && !redusert ? 0.7 : 0 }}
            transition={{ duration: 0.4 }}
          />
        </UtenSkygge>
      )}
      {children}
    </motion.g>
  );
}

/** Steps a scene through named phases while it plays, once; "av" otherwise. */
export function useFase<P extends string>(spiller: boolean, steg: readonly (readonly [P, number])[]): P | "av" {
  const [i, setI] = useState(-1);
  useEffect(() => {
    let k = spiller ? 0 : -1;
    let t = setTimeout(function neste() {
      setI(k);
      if (k < 0 || k >= steg.length - 1) return;
      const vent = steg[k][1];
      k += 1;
      t = setTimeout(neste, vent);
    }, 0);
    return () => clearTimeout(t);
  }, [spiller, steg]);
  return spiller && i >= 0 ? steg[i][0] : "av";
}

/** Whether the story has reached `mål`: the steps in order, and with reduced motion the end at once. */
export function naadd<P extends string>(steg: readonly (readonly [P, number])[], fase: P | "av", mål: P, redusert: boolean) {
  if (fase === "av") return false;
  if (redusert) return true;
  const i = steg.findIndex(([p]) => p === fase);
  const j = steg.findIndex(([p]) => p === mål);
  return i >= j;
}

export const loop = s;

export const css = (v: Record<string, string>) => v as CSSProperties;
