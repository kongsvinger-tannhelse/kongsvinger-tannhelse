"use client";

import { useSyncExternalStore } from "react";
import { Clock } from "lucide-react";
import { klinikk } from "@/data/klinikk";
import { apningsstatus } from "@/lib/apent";

/* A clock that ticks once a minute. The server (and the first render in the
   browser, which must match it) has no time of its own: it gets null. */
function abonner(cb: () => void) {
  const t = window.setInterval(cb, 20_000);
  return () => window.clearInterval(t);
}
const minuttNa = () => Math.floor(Date.now() / 60_000);
const ingen = () => null;

/**
 * «Åpent nå · til 15:30», or when it opens next, with a green or grey dot.
 * Until the browser knows the time it shows the plain opening hours, which
 * is also what search engines and visitors without scripts see.
 */
export function Apningsstatus() {
  const minutt = useSyncExternalStore(abonner, minuttNa, ingen);
  const { dager, fra, til } = klinikk.apningstider;

  if (minutt === null) {
    return (
      <>
        <Clock className="size-4 shrink-0 text-[var(--color-glomma)]" aria-hidden="true" />
        <span>
          {dager} {fra}–{til}
        </span>
      </>
    );
  }
  const status = apningsstatus(new Date(minutt * 60_000));
  return (
    <>
      <span
        aria-hidden="true"
        className="mx-[3px] size-2.5 shrink-0 rounded-full"
        style={{
          background: status.apen ? "var(--color-apen)" : "var(--color-stein)",
          boxShadow: status.apen ? "0 0 0 4px color-mix(in srgb, var(--color-apen) 20%, transparent)" : "none",
        }}
      />
      <span>{status.tekst}</span>
    </>
  );
}
