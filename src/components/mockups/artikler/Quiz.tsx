"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { QUIZ } from "./tekst";

/* F's quiz: four statements, true or false. A tap shows whether you were
   right and why. Nothing is answered on the server, so it hydrates. */

export function Quiz() {
  const [svar, setSvar] = useState<Record<string, boolean>>({});
  const antallRiktige = QUIZ.sporsmal.filter((q) => q.id in svar && svar[q.id] === q.sant).length;
  const ferdig = Object.keys(svar).length === QUIZ.sporsmal.length;

  return (
    <section aria-labelledby="quiz-tittel" className="rounded-[32px] bg-[var(--color-glomma-deep)] p-6 text-[var(--color-papir)] sm:p-10 md:p-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 id="quiz-tittel" className="text-[32px] font-bold leading-[1.05] tracking-[-0.04em] md:text-[44px]">
            {QUIZ.tittel}
          </h2>
          <p className="mt-2 text-[18px] text-[var(--color-tekst-lys-2)]">{QUIZ.intro}</p>
        </div>
        <p aria-live="polite" className={cn("rounded-full bg-white/10 px-4 py-2 text-[15px] font-semibold transition-opacity duration-500", ferdig ? "opacity-100" : "opacity-0")}>
          {antallRiktige} av {QUIZ.sporsmal.length} riktige{antallRiktige === QUIZ.sporsmal.length ? " – supert!" : ""}
        </p>
      </div>

      <ol className="mt-8 grid gap-4 md:grid-cols-2">
        {QUIZ.sporsmal.map((q, i) => {
          const besvart = q.id in svar;
          const riktig = besvart && svar[q.id] === q.sant;
          return (
            <li key={q.id} className={cn("flex flex-col rounded-[24px] p-6 transition-colors duration-500 md:p-7", besvart ? "bg-[var(--color-papir)] text-[var(--color-tekst)]" : "bg-white/[0.06]")}>
              <p className={cn("text-[14px] font-semibold", besvart ? "text-[var(--color-tekst-svak)]" : "text-[var(--color-bjork)]")}>Påstand {i + 1}</p>
              <p className={cn("mt-2 text-[21px] font-semibold leading-[1.35] tracking-[-0.015em]", besvart && "text-[var(--color-glomma-deep)]")}>{q.pastand}</p>

              {besvart ? (
                <div className="hero-loft mt-auto pt-5">
                  <p className="flex items-center gap-2 text-[18px] font-bold" style={{ color: riktig ? "#1F5A3A" : "#7A2B1E" }}>
                    <span className="grid size-7 place-items-center rounded-full text-white" style={{ background: riktig ? "#3FA36B" : "#D9634C" }}>
                      {riktig ? <Check className="size-4" strokeWidth={3} aria-hidden="true" /> : <X className="size-4" strokeWidth={3} aria-hidden="true" />}
                    </span>
                    {riktig ? "Riktig!" : "Ikke helt."} Det er {q.sant ? "sant" : "usant"}.
                  </p>
                  <p className="mt-2 text-[17px] leading-[1.55]">{q.svar}</p>
                </div>
              ) : (
                <div className="mt-auto flex gap-2.5 pt-6">
                  {[true, false].map((v) => (
                    <button
                      key={String(v)}
                      type="button"
                      onClick={() => setSvar((s) => ({ ...s, [q.id]: v }))}
                      className="flex-1 rounded-full border border-[var(--color-strek-lys)] py-3 text-[16px] font-semibold transition-colors hover:bg-[var(--color-papir)] hover:text-[var(--color-glomma-deep)]"
                    >
                      {v ? "Sant" : "Usant"}
                    </button>
                  ))}
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
