import type { CSSProperties } from "react";
import pen from "@/components/artikler/artikler.module.css";

/* The small pieces the diploma mockups share: the seal, the guilloche band,
   the ornament over a name and the pen signatures. Each takes the class that
   places it, so the mockups can style them for their own layout. */

export const SIGNATUR = [
  "M4,28 C14,6 22,6 22,20 C22,32 16,36 26,26 C36,14 40,16 38,26 C44,10 56,12 52,26 C60,22 70,12 78,22 C92,34 104,14 146,18",
  "M6,22 C10,10 20,8 22,20 C24,32 30,30 36,18 C40,10 44,14 42,24 C48,28 54,12 60,16 C70,22 80,30 96,20 C110,12 126,26 144,14",
  "M4,26 C12,12 22,10 26,20 C28,28 20,32 18,24 C20,12 40,8 46,22 C52,32 58,16 66,18 C76,20 80,30 92,24 C108,16 124,22 146,12",
] as const;

/** The seal's scalloped edge: a circle with 22 shallow bumps. */
const KANT = (() => {
  const pkt = Array.from({ length: 220 }, (_, k) => {
    const v = (k / 220) * Math.PI * 2;
    const r = 45 + 2.4 * Math.cos(22 * v);
    return `${(50 + r * Math.cos(v)).toFixed(1)},${(50 + r * Math.sin(v)).toFixed(1)}`;
  });
  return `M${pkt.join(" L")} Z`;
})();

/** Three sine waves, a third of a turn apart, that cross each other like the weave on a certificate. */
const GUILLOCHE = [0, 1, 2].map((k) => {
  const pkt = Array.from({ length: 121 }, (_, i) => {
    const x = i * 2;
    const y = 6 + 4.6 * Math.sin((x / 240) * Math.PI * 2 * 9 + (k * Math.PI * 2) / 3);
    return `${x},${y.toFixed(2)}`;
  });
  return `M${pkt.join(" L")}`;
});

export function Stempel({ initialer, className }: { initialer: string; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <radialGradient id={`stempel-${initialer}`} cx="38%" cy="32%" r="80%">
          <stop offset="0" stopColor="#4BBFCC" />
          <stop offset="0.55" stopColor="#2DA4B4" />
          <stop offset="1" stopColor="#1D7380" />
        </radialGradient>
      </defs>
      <path d={KANT} fill={`url(#stempel-${initialer})`} />
      <circle cx="50" cy="50" r="36" fill="none" stroke="#FFFDF8" strokeOpacity="0.6" strokeWidth="1.2" />
      <circle cx="50" cy="50" r="32.5" fill="none" stroke="#FFFDF8" strokeOpacity="0.3" strokeWidth="0.8" />
      <text x="50" y="60.5" textAnchor="middle" fontSize="30" fontStyle="italic" fontWeight="600" fill="#FFFDF8" style={{ letterSpacing: "-0.02em", fontFamily: "inherit" }}>
        {initialer}
      </text>
    </svg>
  );
}

export function Guilloche({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 12" preserveAspectRatio="none" className={className} aria-hidden="true">
      {GUILLOCHE.map((p, k) => (
        <path key={k} d={p} fill="none" stroke="#A47E3E" strokeOpacity={0.55} strokeWidth={0.7} />
      ))}
    </svg>
  );
}

export function Ornament({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 130 16" className={className} aria-hidden="true">
      <path d="M2,8 H52 M78,8 H128" fill="none" stroke="#A47E3E" strokeWidth={1} strokeLinecap="round" />
      <path d="M65,2 L71,8 L65,14 L59,8 Z" fill="none" stroke="#A47E3E" strokeWidth={1.1} />
    </svg>
  );
}

/** A pen signature that draws itself when an ancestor says the card has been seen. */
export function Signatur({ i, forsink = 1, className }: { i: number; forsink?: number; className?: string }) {
  return (
    <svg viewBox="0 0 150 40" className={className} aria-hidden="true">
      <path
        d={SIGNATUR[i % SIGNATUR.length]}
        fill="none"
        stroke="#2B2117"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
        className={pen.strek}
        style={{ "--forsink": `${forsink}s` } as CSSProperties}
      />
    </svg>
  );
}
