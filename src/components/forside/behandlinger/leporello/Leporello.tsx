"use client";

import { Suspense, useSyncExternalStore } from "react";
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
 * Each in its own Suspense boundary, so React wakes them in two short turns
 * rather than one long one.
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
    <section id="behandlinger" aria-labelledby="behandlinger-tittel" className="overflow-hidden bg-[var(--color-papir)] pb-[clamp(52px,5.5vw,80px)] pt-[clamp(88px,11vw,152px)]">
      <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-px)]">
        <h2 id="behandlinger-tittel" className="sr-only">
          Behandlinger
        </h2>
        <p className="seksjonsinngang">{INNLEDNING}</p>
      </div>

      {bred !== false && (
        <div className="mt-20 hidden lg:block">
          <Suspense>
            <Bred />
          </Suspense>
        </div>
      )}
      {bred !== true && (
        <div className="mt-12 px-[var(--container-px)] md:mt-14 lg:hidden">
          <Suspense>
            <Smal />
          </Suspense>
        </div>
      )}
    </section>
  );
}
