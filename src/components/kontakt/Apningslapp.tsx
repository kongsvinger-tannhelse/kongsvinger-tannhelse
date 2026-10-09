"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { Clock } from "lucide-react";
import { klinikk } from "@/data/klinikk";
import { apningsstatus } from "@/lib/apent";
import { cn } from "@/lib/utils";
import s from "./brevveksling.module.css";

/* A clock that ticks once a minute, as on the front page (Apningsstatus.tsx).
   The server, and the first render in the browser that must match it, has no
   time of its own: it gets null. */
function abonner(cb: () => void) {
  const t = window.setInterval(cb, 20_000);
  return () => window.clearInterval(t);
}
const minuttNa = () => Math.floor(Date.now() / 60_000);
const ingen = () => null;

const { apningstider: tid } = klinikk;

/* Every line of the note hangs from the same left edge, the dot (or clock) in the margin before it. */
const LINJE = "relative pl-[22px]";

const LEGEVAKT = (
  <p className={cn(LINJE, "mt-3 text-[14.5px] leading-[1.45] text-[var(--color-lapp-blekk)]")}>
    Haster det?{" "}
    <br />
    Ring legevakten på{" "}
    <a href="tel:116117" className="whitespace-nowrap font-semibold text-[var(--color-lapp-tekst)] underline underline-offset-2">
      116 117
    </a>
  </p>
);

/** What it says: the state in bold, then when, on a line of its own. */
function Status({ merke, hva, nar }: { merke: ReactNode; hva: string; nar?: string }) {
  return (
    <p className={cn(LINJE, "text-[17px] leading-[1.4]")}>
      <span aria-hidden="true" className="absolute left-0 top-[0.42em] grid size-3.5 place-items-center">
        {merke}
      </span>
      <strong className="font-bold">{hva}</strong>
      {nar && (
        <>
          ,{" "}
          <br />
          {nar}
        </>
      )}
    </p>
  );
}

function Prikk({ apen }: { apen: boolean }) {
  return (
    <span
      className="block size-2.5 rounded-full"
      style={{
        background: apen ? "var(--color-apen)" : "var(--color-stein)",
        boxShadow: apen ? "0 0 0 4px color-mix(in srgb, var(--color-apen) 22%, transparent)" : "none",
      }}
    />
  );
}

/**
 * The yellow note by the phone number: «Åpent nå, til 15:30», or when the
 * clinic opens again and the legevakt number for what can't wait. Until the
 * browser knows the time it shows the opening hours, which is also what
 * search engines and visitors without scripts see. Its height is set by the
 * longest thing it can say, so nothing below it moves when it changes.
 */
export function Apningslapp({ className }: { className?: string }) {
  const minutt = useSyncExternalStore(abonner, minuttNa, ingen);
  const status = minutt === null ? null : apningsstatus(new Date(minutt * 60_000));
  // apningsstatus says «Åpent nå · til 15:30»; the note writes it as a sentence
  const [hva, nar] = status ? status.tekst.split(" · ") : [];

  return (
    <div
      className={cn(
        "relative grid w-[min(100%,264px)] bg-[var(--color-lapp)] px-5 pb-[18px] pt-6 text-[var(--color-lapp-tekst)] shadow-[0_18px_30px_-18px_rgba(107,74,16,0.55),0_2px_0_rgba(107,74,16,0.08)]",
        className
      )}
    >
      {/* the tape */}
      <span aria-hidden="true" className="absolute -top-2.5 left-1/2 h-5 w-20 -translate-x-1/2 rotate-[-4deg] bg-white/60 shadow-[0_1px_2px_rgba(0,0,0,0.08)]" />

      {/* the longest it says, unseen, to hold the height */}
      <div aria-hidden="true" className="invisible col-start-1 row-start-1">
        <Status merke={null} hva="Stengt nå" nar={`åpner i morgen kl. ${tid.fra}`} />
        {LEGEVAKT}
      </div>

      <div key={status ? `${status.apen}` : "tider"} className={cn("col-start-1 row-start-1 self-center", status && s.lappinn)}>
        {status === null ? (
          <Status merke={<Clock className="size-3.5 text-[var(--color-lapp-blekk)]" />} hva={tid.dager} nar={`${tid.fra}–${tid.til}`} />
        ) : (
          <>
            <Status merke={<Prikk apen={status.apen} />} hva={hva} nar={nar} />
            {!status.apen && LEGEVAKT}
          </>
        )}
      </div>
    </div>
  );
}
