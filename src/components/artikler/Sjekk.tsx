"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, CalendarDays, Check, Phone } from "lucide-react";
import { klinikk } from "@/data/klinikk";
import { FORBEHOLD, LEGEVAKT, RAD_OG_TIPS, STENGT, type Handling, type Sjekk as SjekkData } from "@/data/artikler/typer";
import type { Apningsstatus } from "@/lib/apent";
import { cn } from "@/lib/utils";
import { stengtSetning, useApningsstatus } from "./klokke";
import { Nerve, TEGNINGER } from "./tegninger";

/* The check at the bottom of the note: tap what fits, and get a hint at
   once, with what to do next. Nothing is chosen on the server or the first
   render, so it hydrates; the answer rises in with the hero's «loft».

   The hint knows the time. When the clinic is closed and the hint says to
   ring today or now, it says that we are closed and when we open, and the
   button rings the legevakt (116 117) instead; our number comes second. */

const KNAPP = "mt-4 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[var(--color-glomma)] px-5 py-3 text-[15px] font-semibold text-[var(--color-papir)] transition-colors duration-300 hover:bg-[var(--color-glomma-deep)]";

/** What to do next, by day: as written. */
function Dag({ h }: { h: Handling }) {
  return (
    <>
      <p className="text-[19px] font-bold text-[var(--color-glomma-deep)]">{h.tittel}</p>
      <p className="mt-1.5 text-[17px] leading-[1.55] text-[var(--color-tekst)]">{h.tekst}</p>
      {h.stengt && <p className="mt-2 text-[15.5px] leading-[1.55] text-[var(--color-tekst-2)]">{STENGT}</p>}
      {h.knapp === "bestill" && (
        <Link href="/kontakt" className={KNAPP}>
          <CalendarDays className="size-4" aria-hidden="true" />
          Be om time
        </Link>
      )}
      {h.knapp === "ring" && (
        <a href={klinikk.telefon.lenke} className={KNAPP}>
          <Phone className="size-4" aria-hidden="true" />
          Ring {klinikk.telefon.visning}
        </a>
      )}
    </>
  );
}

/** What to do next when the clinic is closed and it should not wait: the legevakt first, our number after. */
function Natt({ h, status }: { h: Handling; status: Apningsstatus }) {
  return (
    <>
      <p className="text-[19px] font-bold text-[var(--color-glomma-deep)]">{stengtSetning(status)}</p>
      <p className="mt-1.5 text-[17px] leading-[1.55] text-[var(--color-tekst)]">
        {h.stengt ? "Ikke vent til vi åpner. Ring legevakten nå." : "Kan det ikke vente til vi åpner, ring legevakten."}
      </p>
      <a href={LEGEVAKT.lenke} className={KNAPP}>
        <Phone className="size-4" aria-hidden="true" />
        Ring legevakten {LEGEVAKT.visning}
      </a>
      <p className="mt-3 text-[15.5px] leading-[1.55] text-[var(--color-tekst-2)]">
        Vårt nummer, når vi har åpent:{" "}
        <a href={klinikk.telefon.lenke} className="whitespace-nowrap font-semibold text-[var(--color-glomma-deep)] underline underline-offset-4">
          {klinikk.telefon.visning}
        </a>
      </p>
    </>
  );
}

export function Sjekk({ sjekk, className }: { sjekk: SjekkData; className?: string }) {
  const [valgtId, setValgtId] = useState<string | null>(null);
  const status = useApningsstatus();
  const stengt = status !== null && !status.apen;
  const valgt = sjekk.valg.find((v) => v.id === valgtId) ?? null;
  const T = valgt ? TEGNINGER[valgt.tegning] : null;

  return (
    <div className={cn("overflow-hidden rounded-[32px] bg-[var(--color-kalk)]/80 p-4 sm:p-8 md:p-10", className)}>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
        <div>
          <p className="text-[18px] text-[var(--color-tekst-2)]">{sjekk.hjelp}</p>
          <ul className="mt-5 space-y-2.5">
            {sjekk.valg.map((v) => {
              const her = v.id === valgtId;
              return (
                <li key={v.id}>
                  <button
                    type="button"
                    aria-pressed={her}
                    onClick={() => setValgtId(v.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-[18px] border px-5 py-4 text-left text-[17px] font-medium leading-[1.35] transition-[background-color,border-color,color] duration-300",
                      her ? "border-transparent bg-[var(--color-glomma)] text-[var(--color-papir)]" : "border-[var(--color-strek)] bg-white text-[var(--color-tekst)] hover:border-[var(--color-glomma)]"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "grid size-6 shrink-0 place-items-center rounded-full border transition-colors duration-300",
                        her ? "border-transparent bg-[var(--color-papir)] text-[var(--color-glomma)]" : "border-[var(--color-stein)]"
                      )}
                    >
                      {her && <Check className="size-3.5" strokeWidth={3} />}
                    </span>
                    {v.svar}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* the hint */}
        <div aria-live="polite" className="flex">
          {valgt && T ? (
            <div key={valgt.id} className="hero-loft flex w-full flex-col rounded-[24px] bg-white p-5 text-[var(--color-tekst)] shadow-[0_24px_50px_-40px_rgba(10,25,32,0.55)] sm:p-6 md:p-8">
              <T strek className="w-24 md:w-28" />
              <p className="mt-3 text-[14px] font-semibold text-[var(--color-tekst-svak)]">{sjekk.merke}</p>
              <p className="mt-1 text-[26px] font-bold leading-[1.1] tracking-[-0.03em] text-[var(--color-glomma-deep)] md:text-[30px]">{valgt.overskrift}</p>
              <p className="mt-4 text-[18px] leading-[1.6]">{valgt.forklaring}</p>

              {valgt.lenke && (
                <Link
                  href={`${RAD_OG_TIPS.sti}/${valgt.lenke.slug}`}
                  className="mt-3 inline-flex items-center gap-1.5 self-start text-[16px] font-semibold text-[var(--color-tekst)] underline underline-offset-4"
                >
                  {valgt.lenke.tekst}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              )}

              {valgt.handling && (
                <div className="mt-6 rounded-[18px] bg-[var(--color-kalk)]/70 p-5">
                  {stengt && valgt.handling.haster ? <Natt h={valgt.handling} status={status} /> : <Dag h={valgt.handling} />}
                  {/* ringing us, but not urgent: the button stays, with when we open */}
                  {stengt && !valgt.handling.haster && valgt.handling.knapp === "ring" && (
                    <p className="mt-3 text-[15.5px] leading-[1.55] text-[var(--color-tekst-2)]">{stengtSetning(status)}</p>
                  )}
                </div>
              )}
              <p className="mt-auto pt-5 text-[14px] text-[var(--color-tekst-svak)]">{sjekk.forbehold ?? FORBEHOLD}</p>
            </div>
          ) : (
            <div className="flex w-full flex-col items-center justify-center rounded-[24px] border border-dashed border-[var(--color-stein)]/50 p-8 text-center">
              <Nerve strek className="w-36" />
              <p className="mt-5 max-w-[24ch] text-[18px] leading-[1.5] text-[var(--color-tekst-2)]">Velg det som passer, så får du et hint her.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
