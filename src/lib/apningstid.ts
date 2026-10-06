"use client";

import { useSyncExternalStore } from "react";

/** Mon–Fri 08:30–15:30, Oslo time. Public holidays are not known here. */
const APNER = 8 * 60 + 30;
const STENGER = 15 * 60 + 30;

export type Apningsstatus = { apen: boolean; tekst: string };

export function apningsstatus(naa: Date): Apningsstatus {
  const deler = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Oslo",
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    })
      .formatToParts(naa)
      .map((d) => [d.type, d.value])
  );
  const dag = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(deler.weekday); // 0 = mandag
  const min = Number(deler.hour) * 60 + Number(deler.minute);
  const hverdag = dag < 5;

  if (hverdag && min >= APNER && min < STENGER) return { apen: true, tekst: "Åpent nå, til 15:30" };
  if (hverdag && min < APNER) return { apen: false, tekst: "Åpner i dag kl. 08:30" };
  if (dag < 4) return { apen: false, tekst: "Åpner i morgen kl. 08:30" };
  return { apen: false, tekst: "Åpner mandag kl. 08:30" };
}

function abonner(varsle: () => void) {
  const id = window.setInterval(varsle, 60_000);
  return () => window.clearInterval(id);
}

/** Null on the server and during hydration, so the markup always matches. */
export function useApningsstatus(): Apningsstatus | null {
  // The snapshot is the text, a stable primitive; "open" is derived from it.
  const tekst = useSyncExternalStore(abonner, () => apningsstatus(new Date()).tekst, () => null);
  return tekst ? { tekst, apen: tekst.startsWith("Åpent") } : null;
}
