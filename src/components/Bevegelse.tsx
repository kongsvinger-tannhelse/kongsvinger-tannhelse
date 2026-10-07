"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Framer Motion with only what the site uses: animations, variants, exits,
 * hover and tap (domAnimation), not the layout and drag machinery. The
 * components use the small `m` elements, which get their features from here.
 * `strict` makes a full `motion` element throw, so the whole library can't
 * creep back in unnoticed.
 */
export function Bevegelse({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
