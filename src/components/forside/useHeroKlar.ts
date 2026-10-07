"use client";

import { useEffect, useState } from "react";

/**
 * True once the hero's view has its photographs in (the `.utsikt` element
 * gets data-klar) and `etter` ms have passed — i.e. when the camera move
 * that starts at that moment has come to rest. Lets JS-driven pieces join
 * the same timeline as the CSS ones. With reduced motion, true at once.
 */
export function useHeroKlar(etter = 4000) {
  const [klar, setKlar] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = window.setTimeout(() => setKlar(true), 0);
      return () => window.clearTimeout(t);
    }
    const el = document.querySelector<HTMLElement>(".utsikt");
    let timer = 0;
    const start = () => {
      timer = window.setTimeout(() => setKlar(true), etter);
    };
    if (!el || el.dataset.klar === "true") {
      start();
      return () => window.clearTimeout(timer);
    }
    const obs = new MutationObserver(() => {
      if (el.dataset.klar === "true") {
        obs.disconnect();
        start();
      }
    });
    obs.observe(el, { attributes: true, attributeFilter: ["data-klar"] });
    return () => {
      obs.disconnect();
      window.clearTimeout(timer);
    };
  }, [etter]);
  return klar;
}
