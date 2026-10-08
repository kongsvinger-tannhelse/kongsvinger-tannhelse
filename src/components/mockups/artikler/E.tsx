"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Ansikt, Knapper, Smuler } from "./deler";
import { FORFATTER } from "./forfatter";
import { Lysene } from "./Lysene";
import { ARSAK_TEGNING, Nerve, Stille, TIPS_TEGNING } from "./tegninger";
import { ARSAKER, ARTIKKEL, BORTE, NERVEN, TIPS } from "./tekst";

/* E «Inni tanna»: one big tooth stays on screen while the words go by
   beside it, one short idea at a time. The tooth changes with the words:
   the nerve, a hole, a crack, sore gum, a throbbing nerve, a nerve gone
   quiet. On a phone the tooth stays at the top and the words pass under it. */

const STEG = [
  { id: "nerve", T: Nerve, merke: "Inne i tanna", tittel: NERVEN.sporsmal, tekst: [...NERVEN.tekst] },
  ...ARSAKER.liste.map((a, i) => ({
    id: a.id,
    T: ARSAK_TEGNING[a.id],
    merke: `Hva kan det være? ${i + 1} av ${ARSAKER.liste.length}`,
    tittel: a.navn,
    tekst: [a.tekst, a.kjennes],
  })),
  { id: "stille", T: Stille, merke: "Når det blir stille", tittel: BORTE.sporsmal, tekst: [...BORTE.tekst] },
];

/** Which step's words are crossing a line a little below the middle of the screen (on a phone, just under the tooth). */
function useAktivtSteg(antall: number) {
  const [aktiv, setAktiv] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (oppf) => {
        for (const o of oppf) if (o.isIntersecting) setAktiv(Number((o.target as HTMLElement).dataset.steg));
      },
      { rootMargin: "-60% 0px -39% 0px" }
    );
    refs.current.slice(0, antall).forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [antall]);
  return { aktiv, refs };
}

export function E() {
  const { aktiv, refs } = useAktivtSteg(STEG.length);

  return (
    <main className="bg-[var(--color-papir)] pb-[clamp(56px,10vw,140px)] pt-[clamp(96px,12vw,140px)]">
      <div className="mx-auto w-full max-w-[1180px] px-[var(--container-px)]">
        <Smuler />
        <header className="mt-8 max-w-[820px]">
          <h1 className="font-bold text-[var(--color-glomma-deep)]" style={{ fontSize: "clamp(42px, 6.4vw, 84px)", lineHeight: 0.96, letterSpacing: "-0.055em" }}>
            {ARTIKKEL.tittel}
          </h1>
          <p className="mt-6 max-w-[40ch] text-[20px] leading-[1.55] text-[var(--color-tekst-2)] md:text-[22px]">{ARTIKKEL.ingress}</p>
          <div className="mt-6 flex items-center gap-3 text-[14px] text-[var(--color-tekst-2)]">
            <Ansikt className="size-10" />
            <span>
              Skrevet av <span className="font-semibold text-[var(--color-glomma-deep)]">{FORFATTER.navn}</span>, {FORFATTER.rolle.toLowerCase()} · {ARTIKKEL.lesetid}
            </span>
          </div>
          <p className="mt-10 inline-flex items-center gap-2 text-[15px] font-semibold text-[var(--color-teal)]">
            <ArrowDown className="size-4" aria-hidden="true" />
            Bli med inn i tanna
          </p>
        </header>

        {/* the tooth that stays, and the words that pass */}
        <div className="relative mt-6 lg:grid lg:grid-cols-2 lg:gap-16">
          <div className="sticky top-[64px] z-10 -mx-[var(--container-px)] bg-[var(--color-papir)] px-[var(--container-px)] pb-3 lg:top-0 lg:mx-0 lg:flex lg:h-screen lg:self-start lg:items-center lg:bg-transparent lg:px-0 lg:pb-0">
            <div className="mx-auto w-full max-w-[min(32vh,520px)] lg:max-w-[520px]">
              <div className="relative aspect-square w-full">
                {STEG.map((st, i) => (
                  <div
                    key={st.id}
                    aria-hidden={i !== aktiv}
                    className="absolute inset-0 transition-[opacity,transform] duration-700 ease-[var(--ease-rolig)] motion-reduce:transition-none"
                    style={{ opacity: i === aktiv ? 1 : 0, transform: i === aktiv ? "scale(1)" : `scale(0.94) translateY(${i < aktiv ? -10 : 10}px)` }}
                  >
                    <st.T className="h-full w-full" />
                  </div>
                ))}
              </div>
              {/* where you are */}
              <div className="mt-2 flex justify-center gap-1.5 lg:mt-6" aria-hidden="true">
                {STEG.map((st, i) => (
                  <span key={st.id} className={cn("h-1.5 rounded-full transition-all duration-500", i === aktiv ? "w-7 bg-[var(--color-glomma)]" : "w-1.5 bg-[var(--color-stein)]/40")} />
                ))}
              </div>
            </div>
            {/* a soft edge, so the words slide in under the tooth on a phone */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-full h-10 bg-gradient-to-b from-[var(--color-papir)] to-transparent lg:hidden" />
          </div>

          <ol>
            {STEG.map((st, i) => (
              <li
                key={st.id}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                data-steg={i}
                className="flex min-h-[66vh] items-start py-6 lg:min-h-[88vh] lg:items-center lg:py-10"
              >
                <div className={cn("max-w-[480px] transition-opacity duration-500", i === aktiv ? "opacity-100" : "opacity-35")}>
                  <p className="text-[14px] font-semibold uppercase tracking-[0.14em] text-[var(--color-teal)]">{st.merke}</p>
                  <h2 className="mt-3 text-[32px] font-bold leading-[1.08] tracking-[-0.04em] text-[var(--color-glomma-deep)] md:text-[44px]">{st.tittel}</h2>
                  <div className="mt-5 space-y-4">
                    {st.tekst.map((t) => (
                      <p key={t} className="text-[20px] leading-[1.6] text-[var(--color-tekst)] md:text-[23px]">
                        {t}
                      </p>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* out of the tooth again: what to do, and how soon */}
        <section className="mx-auto mt-10 max-w-[1000px] rounded-[32px] bg-[var(--color-kalk)] p-7 sm:p-10 md:p-14">
          <h2 className="text-[30px] font-bold leading-[1.1] tracking-[-0.035em] text-[var(--color-glomma-deep)] md:text-[38px]">{TIPS.sporsmal}</h2>
          <ul className="mt-8 grid gap-x-10 gap-y-6 md:grid-cols-2">
            {TIPS.liste.map((t) => {
              const T = TIPS_TEGNING[t.id];
              return (
                <li key={t.id} className="flex items-center gap-5">
                  <span className="grid size-16 shrink-0 place-items-center rounded-full bg-[var(--color-papir)]">
                    <T className="w-11" />
                  </span>
                  <p className="text-[18.5px] leading-[1.55] text-[var(--color-tekst)]">{t.tekst}</p>
                </li>
              );
            })}
          </ul>
          <p className="mt-8 rounded-2xl bg-[#F8E4DB] px-6 py-4 text-[18px] leading-[1.55] text-[#5E2418]">
            <span className="font-bold">Obs! </span>
            {TIPS.advarsel}
          </p>
        </section>

        <Lysene className="mx-auto mt-20 max-w-[1000px] md:mt-24" />

        <section className="mx-auto mt-16 flex max-w-[1000px] flex-col gap-6 rounded-[28px] bg-[var(--color-glomma-deep)] p-8 text-[var(--color-papir)] md:flex-row md:items-center md:justify-between md:p-10">
          <p className="text-[24px] font-bold leading-[1.2] tracking-[-0.03em] md:text-[28px]">Usikker? Ring oss, så hjelper vi deg.</p>
          <Knapper lys className="shrink-0" />
        </section>
      </div>
    </main>
  );
}
