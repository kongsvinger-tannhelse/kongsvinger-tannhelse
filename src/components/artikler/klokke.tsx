"use client";

import { useSyncExternalStore } from "react";
import { klinikk } from "@/data/klinikk";
import { apningsstatus, type Apningsstatus } from "@/lib/apent";

/* The articles' clock: is the clinic open right now? The server (and the
   first render in the browser, which must match it) has no time of its
   own, so it gets null and shows the daytime words; the browser then
   switches, and looks again every minute. Same clock as the front page's
   «Åpent nå». */

function abonner(cb: () => void) {
  const t = window.setInterval(cb, 20_000);
  return () => window.clearInterval(t);
}
const minuttNa = () => Math.floor(Date.now() / 60_000);
const ingen = () => null;

/** Open or closed now, and when it opens next; null until the browser knows the time. */
export function useApningsstatus(): Apningsstatus | null {
  const minutt = useSyncExternalStore(abonner, minuttNa, ingen);
  return minutt === null ? null : apningsstatus(new Date(minutt * 60_000));
}

/** When it opens next, out of the status: «i morgen kl. 08:30», «mandag kl. 08:30», «kl. 08:30». */
export function nesteApning(status: Apningsstatus): string | null {
  const ord = "åpner ";
  const i = status.tekst.indexOf(ord);
  return i < 0 ? null : status.tekst.slice(i + ord.length);
}

/** «Vi har stengt nå. Vi åpner i morgen kl. 08:30.», with the time kept on one line. */
export function stengtSetning(status: Apningsstatus): string {
  const nar = nesteApning(status)?.replace("kl. ", "kl.\u00a0");
  return nar ? `Vi har stengt nå. Vi åpner ${nar}.` : "Vi har stengt nå.";
}

/** The opening hours, then (in the browser) open now or when it opens. Under the phone number. */
export function ApentNa({ className }: { className?: string }) {
  const status = useApningsstatus();
  const { dager, fra, til } = klinikk.apningstider;
  return <span className={className}>{status ? status.tekst : `${dager} ${fra}–${til}`}</span>;
}
