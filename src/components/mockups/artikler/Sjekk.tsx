"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowDown, CalendarDays, Check, Phone } from "lucide-react";
import { klinikk } from "@/data/klinikk";
import { cn } from "@/lib/utils";
import { Nerve, TEGNING } from "./tegninger";
import { LYSFARGE, SJEKK, STENGT, TRAFIKKLYS, type Valg } from "./tekst";

/* The self-check: tap what it feels like, and get a hint at once: what it
   could be, and how soon to ring. Nothing is chosen on the server or the
   first render, so it hydrates; the answer rises in with the hero's «loft».
   Dark on its own (D, H), or light and written on the note itself (G, I).
   With `lesMer`, the hint links down to where the note explains it. */

/** Where in the note each hint is explained. */
const LES_MER: Record<Valg["tegning"], string> = {
  hull: "#arsak-hull",
  sprekk: "#arsak-sprekk",
  tannkjott: "#arsak-tannkjott",
  betennelse: "#arsak-betennelse",
  hevelse: "#lys",
};

export function Sjekk({
  lys: lyst = false,
  lesMer = false,
  utenTittel = false,
  rolig = false,
  className,
}: {
  lys?: boolean;
  lesMer?: boolean;
  utenTittel?: boolean;
  /** No traffic-light colours in the hint: just what to do, in plain words. */
  rolig?: boolean;
  className?: string;
}) {
  const [valgtId, setValgtId] = useState<string | null>(null);
  const valgt = SJEKK.valg.find((v) => v.id === valgtId) ?? null;
  const lys = valgt ? TRAFIKKLYS.lys.find((l) => l.farge === valgt.lys)! : null;
  const T = valgt ? TEGNING[valgt.tegning] : null;

  return (
    <section
      aria-labelledby={utenTittel ? undefined : "sjekk-tittel"}
      aria-label={utenTittel ? "Sjekk selv" : undefined}
      className={cn(
        "overflow-hidden rounded-[32px]",
        lyst ? "p-4 sm:p-8 md:p-10" : "p-6 sm:p-10 md:p-12",
        lyst ? "bg-[var(--color-kalk)]/80 text-[var(--color-tekst)]" : "bg-[var(--color-glomma-deep)] text-[var(--color-papir)]",
        className
      )}
    >
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
        <div>
          {!utenTittel && (
            <>
              <p className={cn("text-[13px] font-semibold uppercase tracking-[0.16em]", lyst ? "text-[var(--color-teal)]" : "text-[var(--color-bjork)]")}>Sjekk selv</p>
              <h2 id="sjekk-tittel" className={cn("mt-3 text-[30px] font-bold leading-[1.1] tracking-[-0.035em] md:text-[40px]", lyst && "text-[var(--color-glomma-deep)]")}>
                {SJEKK.sporsmal}
              </h2>
            </>
          )}
          <p className={cn(!utenTittel && "mt-2", "text-[18px]", lyst ? "text-[var(--color-tekst-2)]" : "text-[var(--color-tekst-lys-2)]")}>{SJEKK.hjelp}</p>

          <ul className={cn(utenTittel ? "mt-5" : "mt-7", "space-y-2.5")} role="list">
            {SJEKK.valg.map((v) => {
              const her = v.id === valgtId;
              return (
                <li key={v.id}>
                  <button
                    type="button"
                    aria-pressed={her}
                    onClick={() => setValgtId(v.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-[18px] border px-5 py-4 text-left text-[17px] font-medium leading-[1.35] transition-[background-color,border-color,color] duration-300",
                      lyst
                        ? her
                          ? "border-transparent bg-[var(--color-glomma)] text-[var(--color-papir)]"
                          : "border-[var(--color-strek)] bg-white text-[var(--color-tekst)] hover:border-[var(--color-glomma)]"
                        : her
                          ? "border-transparent bg-[var(--color-papir)] text-[var(--color-glomma-deep)]"
                          : "border-[var(--color-strek-lys)] bg-white/[0.04] text-[var(--color-papir)] hover:border-white/40 hover:bg-white/[0.08]"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "grid size-6 shrink-0 place-items-center rounded-full border transition-colors duration-300",
                        her
                          ? lyst
                            ? "border-transparent bg-[var(--color-papir)] text-[var(--color-glomma)]"
                            : "border-transparent bg-[var(--color-glomma)] text-[var(--color-papir)]"
                          : lyst
                            ? "border-[var(--color-stein)]"
                            : "border-white/40"
                      )}
                    >
                      {her && <Check className="size-3.5" strokeWidth={3} />}
                    </span>
                    {v.kjennes}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* the hint */}
        <div aria-live="polite" className="flex">
          {valgt && lys && T ? (
            <div key={valgt.id} className={cn("hero-loft flex w-full flex-col rounded-[24px] p-5 text-[var(--color-tekst)] sm:p-6 md:p-8", lyst ? "bg-white shadow-[0_24px_50px_-40px_rgba(10,25,32,0.55)]" : "bg-[var(--color-papir)]")}>
              <div className={cn("flex items-start", lyst ? "flex-col gap-3" : "gap-5")}>
                <T strek={lyst} className={cn("shrink-0", lyst ? "w-24 md:w-28" : "w-28 md:w-36")} />
                <div className={cn(!lyst && "pt-2")}>
                  <p className="text-[14px] font-semibold text-[var(--color-tekst-svak)]">Det kan være</p>
                  <p className="mt-1 text-[26px] font-bold leading-[1.1] tracking-[-0.03em] text-[var(--color-glomma-deep)] md:text-[30px]">{valgt.kanVaere}</p>
                </div>
              </div>
              <p className="mt-5 text-[18px] leading-[1.6]">{valgt.forklaring}</p>

              {rolig ? (
                <div className="mt-6 rounded-[18px] bg-[var(--color-kalk)]/70 p-5">
                  <p className="text-[19px] font-bold text-[var(--color-glomma-deep)]">{lys.tittel}</p>
                  <p className="mt-1.5 text-[17px] leading-[1.55] text-[var(--color-tekst)]">{lys.gjor}</p>
                  {lys.farge === "rod" && <p className="mt-2 text-[15.5px] leading-[1.55] text-[var(--color-tekst-2)]">{STENGT}</p>}
                  {lys.farge === "gronn" ? (
                    <Link href="/#kontakt" className="mt-4 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[var(--color-glomma)] px-5 py-3 text-[15px] font-semibold text-[var(--color-papir)]">
                      <CalendarDays className="size-4" aria-hidden="true" />
                      Bestill time
                    </Link>
                  ) : (
                    <a href={klinikk.telefon.lenke} className="mt-4 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[var(--color-glomma)] px-5 py-3 text-[15px] font-semibold text-[var(--color-papir)]">
                      <Phone className="size-4" aria-hidden="true" />
                      Ring {klinikk.telefon.visning}
                    </a>
                  )}
                </div>
              ) : (
                <div className="mt-6 rounded-[18px] p-5" style={{ background: LYSFARGE[lys.farge].flate }}>
                  <div className="flex items-center gap-3">
                    <span aria-hidden="true" className="block size-5 rounded-full" style={{ background: LYSFARGE[lys.farge].prikk, boxShadow: `0 0 14px 2px ${LYSFARGE[lys.farge].prikk}88` }} />
                    <p className="text-[20px] font-bold" style={{ color: LYSFARGE[lys.farge].tekst }}>
                      {lys.tittel}
                    </p>
                  </div>
                  <p className="mt-2 text-[17px] font-semibold text-[var(--color-glomma-deep)]">{lys.gjor}</p>
                  {lys.farge !== "gronn" && (
                    <a href={klinikk.telefon.lenke} className="mt-4 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-[var(--color-glomma)] px-5 py-3 text-[15px] font-semibold text-[var(--color-papir)]">
                      <Phone className="size-4" aria-hidden="true" />
                      Ring {klinikk.telefon.visning}
                    </a>
                  )}
                </div>
              )}
              <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
                <p className="text-[14px] text-[var(--color-tekst-svak)]">{SJEKK.forbehold}</p>
                {lesMer && (
                  <a href={LES_MER[valgt.tegning]} className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[var(--color-teal)] underline-offset-4 hover:underline">
                    <ArrowDown className="size-4" aria-hidden="true" />
                    Les mer om dette
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className={cn("flex w-full flex-col items-center justify-center rounded-[24px] border border-dashed p-8 text-center", lyst ? "border-[var(--color-stein)]/50" : "border-[var(--color-strek-lys)]")}>
              <Nerve strek className={cn("w-36", !lyst && "opacity-80 [&_*]:!stroke-[var(--color-papir)]")} />
              <p className={cn("mt-5 max-w-[24ch] text-[18px] leading-[1.5]", lyst ? "text-[var(--color-tekst-2)]" : "text-[var(--color-tekst-lys-2)]")}>Velg det som passer, så får du et hint her.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
