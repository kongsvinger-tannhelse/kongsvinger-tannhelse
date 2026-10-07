"use client";

import { useSyncExternalStore } from "react";
import { Bred } from "./Bred";
import { INNLEDNING } from "./deler";
import { Smal } from "./Smal";

/**
 * «Behandlinger» on the front page: «Leporelloen». The scenes are printed on
 * a strip of paper folded like a concertina. On a wide screen it stands
 * across the page and unfolds sideways (Bred); on a phone or a tablet it
 * hangs down the page and each panel drops open as it comes into view
 * (Smal). The scenes and their motion are the ones /behandlinger shows.
 *
 * The server cannot know the screen, so it sends both, each hidden by CSS on
 * the other's screens; once the page is live only the one that fits is kept.
 */

const BRED = "(min-width: 1024px)";

function lytt(endret: () => void) {
  const m = window.matchMedia(BRED);
  m.addEventListener("change", endret);
  return () => m.removeEventListener("change", endret);
}

export function Leporello() {
  const bred = useSyncExternalStore(
    lytt,
    () => window.matchMedia(BRED).matches,
    () => null
  );

  return (
    <section id="behandlinger" aria-labelledby="behandlinger-tittel" className="overflow-hidden bg-[var(--color-papir)] py-[clamp(88px,11vw,152px)]">
      <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-px)]">
        <div className="lg:flex lg:items-end lg:justify-between lg:gap-12">
          <h2 id="behandlinger-tittel" className="font-bold text-[var(--color-glomma-deep)]" style={{ fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 0.95, letterSpacing: "-0.05em" }}>
            Behandlinger
          </h2>
          <p className="mt-4 max-w-[40ch] text-[17px] leading-[1.6] text-[var(--color-tekst-2)] lg:mt-0">{INNLEDNING}</p>
        </div>
      </div>

      {bred !== false && (
        <div className="mt-20 hidden lg:block">
          <Bred />
        </div>
      )}
      {bred !== true && (
        <div className="mt-12 px-[var(--container-px)] md:mt-14 lg:hidden">
          <Smal />
        </div>
      )}
    </section>
  );
}
