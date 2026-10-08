import { Lightbulb, Timer } from "lucide-react";
import { cn } from "@/lib/utils";
import { Ansikt, Knapper, Smuler, Vis } from "./deler";
import { FORFATTER } from "./forfatter";
import { Lysene } from "./Lysene";
import { Quiz } from "./Quiz";
import { ARSAK_TEGNING, Nerve, Stille, TIPS_TEGNING } from "./tegninger";
import { ARSAKER, ARTIKKEL, BORTE, FAKTA, KORT, NERVEN, TIPS } from "./tekst";
import s from "./artikler.module.css";

/* F «Visste du?»: a magazine page. The short version comes first, for
   those in a hurry; numbered chapters for the rest, with «did you know?»
   notes along the way, and a true-or-false quiz at the end. */

function Kapittel({ nr, tittel, children, tegning }: { nr: number; tittel: string; children: React.ReactNode; tegning?: React.ReactNode }) {
  return (
    <Vis as="section" className="grid gap-6 md:grid-cols-[120px_minmax(0,1fr)] md:gap-10">
      <p aria-hidden="true" className="text-[64px] font-bold leading-none tracking-[-0.06em] text-[#BFE0E5] md:text-[96px]">
        {String(nr).padStart(2, "0")}
      </p>
      <div className={cn(tegning && "flow-root")}>
        {tegning && <div className={cn("float-right -mt-2 ml-5 w-32 md:w-44", s.opp)}>{tegning}</div>}
        <h2 className="text-[30px] font-bold leading-[1.1] tracking-[-0.035em] text-[var(--color-glomma-deep)] md:text-[38px]">{tittel}</h2>
        <div className="mt-5">{children}</div>
      </div>
    </Vis>
  );
}

const Brod = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <p className={cn("text-[19px] leading-[1.7] text-[var(--color-tekst)] md:text-[20px]", className)}>{children}</p>
);

function VisstDu({ tekst, vri }: { tekst: string; vri: number }) {
  return (
    <Vis className="mx-auto max-w-[620px]">
      <aside className={cn("flex gap-4 rounded-[24px] bg-[#FBF0D9] p-6 shadow-[0_24px_40px_-30px_rgba(107,74,16,0.55)] md:p-7", s.opp)} style={{ rotate: `${vri}deg` }}>
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#E2A93B] text-white">
          <Lightbulb className="size-5" aria-hidden="true" />
        </span>
        <div>
          <p className="text-[15px] font-bold uppercase tracking-[0.12em] text-[#6B4A10]">Visste du?</p>
          <p className="mt-1.5 text-[18.5px] leading-[1.55] text-[#3E2C0A]">{tekst}</p>
        </div>
      </aside>
    </Vis>
  );
}

export function F() {
  return (
    <main className="bg-[var(--color-papir)] pb-[clamp(56px,10vw,140px)] pt-[clamp(96px,12vw,140px)]">
      <div className="mx-auto w-full max-w-[1180px] px-[var(--container-px)]">
        <Smuler />

        <Vis as="header" className="mt-8 grid items-center gap-8 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:gap-12">
          <div>
            <p className="text-[14px] font-semibold uppercase tracking-[0.14em] text-[var(--color-teal)]">Råd fra tannlegen</p>
            <h1 className="mt-4 font-bold text-[var(--color-glomma-deep)]" style={{ fontSize: "clamp(44px, 6.6vw, 92px)", lineHeight: 0.95, letterSpacing: "-0.055em" }}>
              {ARTIKKEL.tittel}
            </h1>
            <p className="mt-6 max-w-[38ch] text-[20px] leading-[1.55] text-[var(--color-tekst-2)] md:text-[22px]">{ARTIKKEL.ingress}</p>
            <div className="mt-6 flex items-center gap-3 text-[14px] text-[var(--color-tekst-2)]">
              <Ansikt className="size-10" />
              <span>
                Skrevet av <span className="font-semibold text-[var(--color-glomma-deep)]">{FORFATTER.navn}</span>, {FORFATTER.rolle.toLowerCase()} · {ARTIKKEL.lesetid}
              </span>
            </div>
          </div>
          <div className={cn("mx-auto w-[min(80%,420px)]", s.opp)}>
            <Nerve className="w-full" />
          </div>
        </Vis>

        {/* the short version */}
        <section className="mx-auto mt-14 max-w-[1000px] rounded-[32px] bg-[#E1EFF1] p-7 sm:p-10 md:mt-20 md:p-12">
          <div className="flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-full bg-[var(--color-teal)] text-white">
              <Timer className="size-5" aria-hidden="true" />
            </span>
            <h2 className="text-[24px] font-bold tracking-[-0.03em] text-[var(--color-glomma-deep)] md:text-[28px]">{KORT.tittel}</h2>
          </div>
          <ol className="mt-7 grid gap-5 md:grid-cols-3 md:gap-8">
            {KORT.punkter.map((p, i) => (
              <li key={p} className="flex gap-3.5">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[var(--color-glomma)] text-[15px] font-bold text-[var(--color-papir)]">{i + 1}</span>
                <p className="text-[19px] font-medium leading-[1.5] text-[var(--color-glomma-deep)]">{p}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="mx-auto mt-20 max-w-[920px] space-y-20 md:mt-28 md:space-y-24">
          <Kapittel nr={1} tittel={NERVEN.sporsmal}>
            <div className="space-y-4">
              {NERVEN.tekst.map((t) => (
                <Brod key={t}>{t}</Brod>
              ))}
            </div>
          </Kapittel>

          <VisstDu tekst={FAKTA[0].tekst} vri={-1.2} />

          <Kapittel nr={2} tittel={ARSAKER.sporsmal}>
            <Brod>{ARSAKER.intro}</Brod>
            <ul className="mt-7 grid gap-4 sm:grid-cols-2">
              {ARSAKER.liste.map((a, i) => {
                const T = ARSAK_TEGNING[a.id];
                return (
                  <li key={a.id} className="rounded-[24px] bg-white p-6 shadow-[0_20px_40px_-34px_rgba(10,25,32,0.5)] ring-1 ring-[var(--color-strek)]">
                    <div className={cn("w-28", s.opp)} style={{ "--forsink": `${0.1 + i * 0.15}s` } as React.CSSProperties}>
                      <T className="w-full" />
                    </div>
                    <h3 className="mt-3 text-[21px] font-bold tracking-[-0.02em] text-[var(--color-glomma-deep)]">{a.navn}</h3>
                    <p className="mt-1.5 text-[17px] leading-[1.55] text-[var(--color-tekst)]">{a.tekst}</p>
                    <p className="mt-2 text-[15.5px] leading-[1.5] text-[var(--color-tekst-2)]">
                      <span className="font-semibold text-[var(--color-tekst)]">Slik kjennes det: </span>
                      {a.kjennes}
                    </p>
                  </li>
                );
              })}
            </ul>
          </Kapittel>

          <VisstDu tekst={FAKTA[1].tekst} vri={1} />

          <Kapittel nr={3} tittel={TIPS.sporsmal}>
            <ul className="space-y-5">
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
          </Kapittel>

          <Kapittel nr={4} tittel={BORTE.sporsmal} tegning={<Stille className="w-full" />}>
            <div className="space-y-4">
              {BORTE.tekst.map((t) => (
                <Brod key={t}>{t}</Brod>
              ))}
            </div>
          </Kapittel>
        </div>

        <div className="mx-auto mt-20 max-w-[1000px] md:mt-28">
          <Quiz />
        </div>

        <Lysene className="mx-auto mt-20 max-w-[1000px] md:mt-24" />

        <section className="mx-auto mt-16 flex max-w-[1000px] flex-col gap-6 rounded-[28px] bg-[var(--color-kalk)] p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <p className="text-[24px] font-bold leading-[1.2] tracking-[-0.03em] text-[var(--color-glomma-deep)] md:text-[28px]">Usikker? Ring oss, så hjelper vi deg.</p>
          <Knapper className="shrink-0" />
        </section>
      </div>
    </main>
  );
}
