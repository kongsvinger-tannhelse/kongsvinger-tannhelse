import { cn } from "@/lib/utils";
import { Ansikt, Knapper, Smuler, Vis } from "./deler";
import { FORFATTER } from "./forfatter";
import { Lysene } from "./Lysene";
import { Sjekk } from "./Sjekk";
import { ARSAK_TEGNING, Nerve, Stille, TIPS_TEGNING } from "./tegninger";
import { ARSAKER, ARTIKKEL, BORTE, NERVEN, TIPS } from "./tekst";
import s from "./artikler.module.css";

/* D «Sjekk selv»: the reader starts by tapping what it feels like, and gets
   a hint straight away. The whole article follows in one calm column, big
   and easy to read, for those who want to know more. */

const Overskrift = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-[30px] font-bold leading-[1.1] tracking-[-0.035em] text-[var(--color-glomma-deep)] md:text-[38px]">{children}</h2>
);

const Brod = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <p className={cn("text-[19px] leading-[1.7] text-[var(--color-tekst)] md:text-[20px]", className)}>{children}</p>
);

export function D() {
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
        </header>

        <div className="mt-10 md:mt-14">
          <Sjekk />
        </div>

        {/* the article, for those who want to know more */}
        <div className="mx-auto mt-20 max-w-[700px] space-y-20 md:mt-28 md:space-y-24">
          <p className="text-center text-[15px] font-semibold uppercase tracking-[0.14em] text-[var(--color-tekst-svak)]">Vil du vite mer? Les videre</p>

          <Vis as="section" className="flow-root">
            <div className={cn("float-right -mt-4 ml-5 w-32 md:w-48", s.opp)}>
              <Nerve className="w-full" />
            </div>
            <Overskrift>{NERVEN.sporsmal}</Overskrift>
            <div className="mt-5 space-y-4">
              {NERVEN.tekst.map((t) => (
                <Brod key={t}>{t}</Brod>
              ))}
            </div>
          </Vis>

          <Vis as="section">
            <Overskrift>{ARSAKER.sporsmal}</Overskrift>
            <Brod className="mt-4">{ARSAKER.intro}</Brod>
            <ol className="mt-8 space-y-4">
              {ARSAKER.liste.map((a, i) => {
                const T = ARSAK_TEGNING[a.id];
                return (
                  <li key={a.id} className="flex items-center gap-5 rounded-[24px] bg-white p-4 pr-6 shadow-[0_20px_40px_-34px_rgba(10,25,32,0.5)] ring-1 ring-[var(--color-strek)] md:gap-6">
                    <div className={cn("w-24 shrink-0 md:w-32", s.opp)} style={{ "--forsink": `${0.1 + i * 0.15}s` } as React.CSSProperties}>
                      <T className="w-full" />
                    </div>
                    <div>
                      <h3 className="text-[21px] font-bold tracking-[-0.02em] text-[var(--color-glomma-deep)]">{a.navn}</h3>
                      <p className="mt-1 text-[17.5px] leading-[1.55] text-[var(--color-tekst)]">{a.tekst}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </Vis>

          <Vis as="section">
            <Overskrift>{TIPS.sporsmal}</Overskrift>
            <ul className="mt-8 space-y-5">
              {TIPS.liste.map((t) => {
                const T = TIPS_TEGNING[t.id];
                return (
                  <li key={t.id} className="flex items-center gap-5">
                    <span className="grid size-16 shrink-0 place-items-center rounded-full bg-[#E1EFF1]">
                      <T className="w-11" />
                    </span>
                    <Brod>{t.tekst}</Brod>
                  </li>
                );
              })}
            </ul>
            <p className="mt-8 rounded-2xl bg-[#F8E4DB] px-6 py-4 text-[18px] leading-[1.55] text-[#5E2418]">
              <span className="font-bold">Obs! </span>
              {TIPS.advarsel}
            </p>
          </Vis>

          <Vis as="section" className="flow-root">
            <div className={cn("float-right -mt-4 ml-5 w-32 md:w-48", s.opp)}>
              <Stille className="w-full" />
            </div>
            <Overskrift>{BORTE.sporsmal}</Overskrift>
            <div className="mt-5 space-y-4">
              {BORTE.tekst.map((t) => (
                <Brod key={t}>{t}</Brod>
              ))}
            </div>
          </Vis>
        </div>

        <Lysene className="mx-auto mt-20 max-w-[1000px] md:mt-28" />

        <section className="mx-auto mt-16 flex max-w-[1000px] flex-col gap-6 rounded-[28px] bg-[var(--color-kalk)] p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <p className="text-[24px] font-bold leading-[1.2] tracking-[-0.03em] text-[var(--color-glomma-deep)] md:text-[28px]">Usikker? Ring oss, så hjelper vi deg.</p>
          <Knapper className="shrink-0" />
        </section>
      </div>
    </main>
  );
}
