"use client";

import { useState } from "react";
import { Check, Phone } from "lucide-react";
import { klinikk } from "@/data/klinikk";
import { cn } from "@/lib/utils";
import { Nerve, TEGNING } from "./tegninger";
import { LYSFARGE, SJEKK, TRAFIKKLYS } from "./tekst";

/* D's self-check: tap what it feels like, and get a hint at once: what it
   could be, and how soon to ring. Nothing is chosen on the server or the
   first render, so it hydrates; the answer rises in with the hero's «loft». */

export function Sjekk() {
  const [valgtId, setValgtId] = useState<string | null>(null);
  const valgt = SJEKK.valg.find((v) => v.id === valgtId) ?? null;
  const lys = valgt ? TRAFIKKLYS.lys.find((l) => l.farge === valgt.lys)! : null;
  const T = valgt ? TEGNING[valgt.tegning] : null;

  return (
    <section aria-labelledby="sjekk-tittel" className="overflow-hidden rounded-[32px] bg-[var(--color-glomma-deep)] p-6 text-[var(--color-papir)] sm:p-10 md:p-12">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
        <div>
          <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--color-bjork)]">Sjekk selv</p>
          <h2 id="sjekk-tittel" className="mt-3 text-[30px] font-bold leading-[1.1] tracking-[-0.035em] md:text-[40px]">
            {SJEKK.sporsmal}
          </h2>
          <p className="mt-2 text-[18px] text-[var(--color-tekst-lys-2)]">{SJEKK.hjelp}</p>

          <ul className="mt-7 space-y-2.5" role="list">
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
                      her
                        ? "border-transparent bg-[var(--color-papir)] text-[var(--color-glomma-deep)]"
                        : "border-[var(--color-strek-lys)] bg-white/[0.04] text-[var(--color-papir)] hover:border-white/40 hover:bg-white/[0.08]"
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "grid size-6 shrink-0 place-items-center rounded-full border transition-colors duration-300",
                        her ? "border-transparent bg-[var(--color-glomma)] text-[var(--color-papir)]" : "border-white/40"
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
            <div key={valgt.id} className="hero-loft flex w-full flex-col rounded-[24px] bg-[var(--color-papir)] p-6 text-[var(--color-tekst)] md:p-8">
              <div className="flex items-start gap-5">
                <T className="w-28 shrink-0 md:w-36" />
                <div className="pt-2">
                  <p className="text-[14px] font-semibold text-[var(--color-tekst-svak)]">Det kan være</p>
                  <p className="mt-1 text-[26px] font-bold leading-[1.1] tracking-[-0.03em] text-[var(--color-glomma-deep)] md:text-[30px]">{valgt.kanVaere}</p>
                </div>
              </div>
              <p className="mt-5 text-[18px] leading-[1.6]">{valgt.forklaring}</p>

              <div className="mt-6 rounded-[18px] p-5" style={{ background: LYSFARGE[lys.farge].flate }}>
                <div className="flex items-center gap-3">
                  <span aria-hidden="true" className="block size-5 rounded-full" style={{ background: LYSFARGE[lys.farge].prikk, boxShadow: `0 0 14px 2px ${LYSFARGE[lys.farge].prikk}88` }} />
                  <p className="text-[20px] font-bold" style={{ color: LYSFARGE[lys.farge].tekst }}>
                    {lys.tittel}
                  </p>
                </div>
                <p className="mt-2 text-[17px] font-semibold text-[var(--color-glomma-deep)]">{lys.gjor}</p>
                {lys.farge !== "gronn" && (
                  <a href={klinikk.telefon.lenke} className="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--color-glomma)] px-5 py-3 text-[15px] font-semibold text-[var(--color-papir)]">
                    <Phone className="size-4" aria-hidden="true" />
                    Ring {klinikk.telefon.visning}
                  </a>
                )}
              </div>
              <p className="mt-auto pt-5 text-[14px] text-[var(--color-tekst-svak)]">{SJEKK.forbehold}</p>
            </div>
          ) : (
            <div className="flex w-full flex-col items-center justify-center rounded-[24px] border border-dashed border-[var(--color-strek-lys)] p-8 text-center">
              <Nerve strek className="w-36 opacity-80 [&_*]:!stroke-[var(--color-papir)]" />
              <p className="mt-5 max-w-[24ch] text-[18px] leading-[1.5] text-[var(--color-tekst-lys-2)]">Velg det som passer, så får du et hint her.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
