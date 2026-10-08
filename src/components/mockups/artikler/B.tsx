import { cn } from "@/lib/utils";
import { Ansikt, Knapper, Smuler, Vis } from "./deler";
import { FORFATTER } from "./forfatter";
import { ARSAK_TEGNING, Nerve, Stille, TIPS_TEGNING } from "./tegninger";
import { ARSAKER, ARTIKKEL, BORTE, LYSFARGE, NERVEN, TIPS, TRAFIKKLYS, type Arsak } from "./tekst";
import s from "./artikler.module.css";

/* B «Bildeboka»: the article as a little picture book for grown-ups. Open
   spreads of paper, one big picture and a few big sentences on each page.
   The pictures stand up off the page as it comes into view. */

const PAPIR = "#FBF8F1";

function Sidetall({ n, side }: { n: number; side: "v" | "h" }) {
  return <p className={cn("mt-auto pt-8 text-[13px] font-semibold tabular-nums text-[var(--color-tekst-svak)]", side === "h" && "text-right")}>{n}</p>;
}

/** An open book: two pages side by side with the fold between them; on a phone, one page under the other. */
function Oppslag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <Vis className={cn("relative grid overflow-hidden rounded-[30px] shadow-[0_40px_70px_-50px_rgba(10,25,32,0.55)] ring-1 ring-[var(--color-strek)] md:grid-cols-2", className)} style={{ background: PAPIR }}>
      {children}
      <div aria-hidden="true" className={cn("pointer-events-none absolute inset-y-0 left-1/2 hidden w-24 -translate-x-1/2 md:block", s.fals)} />
    </Vis>
  );
}

function Side({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex min-h-0 flex-col p-7 sm:p-10 md:min-h-[540px] md:p-14 [&+&]:border-t [&+&]:border-dashed [&+&]:border-[var(--color-strek)] md:[&+&]:border-t-0", className)}>{children}</div>;
}

const Overskrift = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-bold text-[var(--color-glomma-deep)]" style={{ fontSize: "clamp(30px, 3.6vw, 46px)", lineHeight: 1.04, letterSpacing: "-0.04em" }}>
    {children}
  </h2>
);

const Stor = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <p className={cn("text-[21px] leading-[1.5] text-[var(--color-tekst)] md:text-[24px]", className)}>{children}</p>
);

/** One cause on its own page: the picture, its name, two sentences. */
function ArsakSide({ a, n, side }: { a: Arsak; n: number; side: "v" | "h" }) {
  const T = ARSAK_TEGNING[a.id];
  return (
    <Side>
      <div className={cn("mx-auto w-[min(78%,300px)]", s.opp)} style={{ "--forsink": side === "v" ? "0.1s" : "0.35s" } as React.CSSProperties}>
        <T className="w-full" />
      </div>
      <h3 className="mt-6 text-[28px] font-bold tracking-[-0.03em] text-[var(--color-glomma-deep)] md:text-[32px]">{a.navn}</h3>
      <Stor className="mt-3">{a.tekst}</Stor>
      <p className="mt-4 text-[18px] leading-[1.55] text-[var(--color-tekst-2)]">
        <span className="font-semibold text-[var(--color-tekst)]">Slik kjennes det: </span>
        {a.kjennes}
      </p>
      <Sidetall n={n} side={side} />
    </Side>
  );
}

export function B() {
  const [hull, sprekk, tannkjott, betennelse] = ARSAKER.liste;
  return (
    <main className="bg-[var(--color-kalk)] pb-[clamp(56px,10vw,140px)] pt-[clamp(96px,12vw,140px)]">
      <div className="mx-auto w-full max-w-[1180px] px-[var(--container-px)]">
        <Smuler />

        {/* the cover */}
        <header className="mt-8 grid items-end gap-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:gap-14">
          <div>
            <p className="text-[14px] font-semibold uppercase tracking-[0.14em] text-[var(--color-teal)]">En liten bildebok om tannverk</p>
            <h1 className="mt-4 font-bold text-[var(--color-glomma-deep)]" style={{ fontSize: "clamp(46px, 7.4vw, 104px)", lineHeight: 0.94, letterSpacing: "-0.055em" }}>
              {ARTIKKEL.tittel}
            </h1>
          </div>
          <div>
            <p className="text-[20px] leading-[1.55] text-[var(--color-tekst-2)] md:text-[22px]">{ARTIKKEL.ingress}</p>
            <div className="mt-6 flex items-center gap-3 text-[14px] text-[var(--color-tekst-2)]">
              <Ansikt className="size-10" />
              <span>
                Laget av <span className="font-semibold text-[var(--color-glomma-deep)]">{FORFATTER.navn}</span>, {FORFATTER.rolle.toLowerCase()} · {ARTIKKEL.lesetid}
              </span>
            </div>
          </div>
        </header>

        <div className="mt-12 space-y-8 md:mt-16 md:space-y-12">
          {/* 1–2: the nerve */}
          <Oppslag>
            <Side className="justify-center" >
              <div className={cn("mx-auto w-[min(86%,400px)]", s.opp)}>
                <Nerve className="w-full" />
              </div>
              <Sidetall n={1} side="v" />
            </Side>
            <Side className="justify-center">
              <div className="my-auto">
                <Overskrift>{NERVEN.sporsmal}</Overskrift>
                <div className="mt-6 space-y-4">
                  {NERVEN.tekst.map((t) => (
                    <Stor key={t}>{t}</Stor>
                  ))}
                </div>
              </div>
              <Sidetall n={2} side="h" />
            </Side>
          </Oppslag>

          {/* 3–6: the four causes, two to a spread */}
          <div className="px-1 pt-4 md:pt-8">
            <Overskrift>{ARSAKER.sporsmal}</Overskrift>
            <Stor className="mt-3 text-[var(--color-tekst-2)]">{ARSAKER.intro}</Stor>
          </div>
          <Oppslag>
            <ArsakSide a={hull} n={3} side="v" />
            <ArsakSide a={sprekk} n={4} side="h" />
          </Oppslag>
          <Oppslag>
            <ArsakSide a={tannkjott} n={5} side="v" />
            <ArsakSide a={betennelse} n={6} side="h" />
          </Oppslag>

          {/* 7: what to do today, five small pictures on one wide page */}
          <Vis className="overflow-hidden rounded-[30px] p-7 shadow-[0_40px_70px_-50px_rgba(10,25,32,0.55)] ring-1 ring-[var(--color-strek)] sm:p-10 md:p-14" style={{ background: PAPIR }}>
            <Overskrift>{TIPS.sporsmal}</Overskrift>
            <ol className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
              {TIPS.liste.map((t, i) => {
                const T = TIPS_TEGNING[t.id];
                return (
                  <li key={t.id} className="flex flex-col">
                    <div className={cn("grid aspect-square w-full max-w-[200px] place-items-center rounded-full bg-[#E1EFF1]", s.opp)} style={{ "--forsink": `${0.1 + i * 0.14}s` } as React.CSSProperties}>
                      <T className="w-[72%]" />
                    </div>
                    <p className="mt-5 text-[18px] leading-[1.5] text-[var(--color-tekst)]">
                      <span className="mr-1.5 font-bold text-[var(--color-teal)]">{i + 1}.</span>
                      {t.tekst}
                    </p>
                  </li>
                );
              })}
            </ol>
            <p className="mt-10 rounded-2xl bg-[#F8E4DB] px-6 py-4 text-[18px] leading-[1.55] text-[#5E2418]">
              <span className="font-bold">Obs! </span>
              {TIPS.advarsel}
            </p>
            <Sidetall n={7} side="h" />
          </Vis>

          {/* 8–9: pain that stops */}
          <Oppslag>
            <Side className="justify-center">
              <div className="my-auto">
                <Overskrift>{BORTE.sporsmal}</Overskrift>
                <div className="mt-6 space-y-4">
                  {BORTE.tekst.map((t) => (
                    <Stor key={t}>{t}</Stor>
                  ))}
                </div>
              </div>
              <Sidetall n={8} side="v" />
            </Side>
            <Side className="justify-center">
              <div className={cn("mx-auto w-[min(86%,400px)]", s.opp)} style={{ "--forsink": "0.3s" } as React.CSSProperties}>
                <Stille className="w-full" />
              </div>
              <Sidetall n={9} side="h" />
            </Side>
          </Oppslag>

          {/* 10: the traffic light, the last page */}
          <Vis className="overflow-hidden rounded-[30px] p-7 shadow-[0_40px_70px_-50px_rgba(10,25,32,0.55)] ring-1 ring-[var(--color-strek)] sm:p-10 md:p-14" style={{ background: PAPIR }}>
            <Overskrift>{TRAFIKKLYS.sporsmal}</Overskrift>
            <Stor className="mt-3 text-[var(--color-tekst-2)]">{TRAFIKKLYS.intro}</Stor>
            <ul className="mt-10 grid gap-5 md:grid-cols-3">
              {TRAFIKKLYS.lys.map((l, i) => {
                const f = LYSFARGE[l.farge];
                return (
                  <li key={l.farge} className="flex flex-col rounded-[24px] p-6 md:p-8" style={{ background: f.flate }}>
                    <span
                      aria-hidden="true"
                      className={cn("block size-14 rounded-full ring-[6px] ring-[var(--color-glomma-deep)] md:size-16", s.lampe)}
                      style={{ background: f.prikk, boxShadow: `0 0 0 6px var(--color-glomma-deep), 0 0 34px 8px ${f.prikk}77`, "--forsink": `${0.3 + i * 0.45}s` } as React.CSSProperties}
                    />
                    <h3 className="mt-6 text-[26px] font-bold tracking-[-0.03em]" style={{ color: f.tekst }}>
                      {l.tittel}
                    </h3>
                    <ul className="mt-3 space-y-2 text-[17.5px] leading-[1.5] text-[var(--color-tekst)]">
                      {l.nar.map((n) => (
                        <li key={n}>{n}</li>
                      ))}
                    </ul>
                    <p className="mt-auto pt-5 text-[17.5px] font-semibold text-[var(--color-glomma-deep)]">{l.gjor}</p>
                  </li>
                );
              })}
            </ul>
            <p className="mt-6 text-[16px] leading-[1.6] text-[var(--color-tekst-2)]">{TRAFIKKLYS.etterStengetid}</p>
            <Sidetall n={10} side="h" />
          </Vis>

          {/* the back cover */}
          <section className="flex flex-col gap-6 rounded-[30px] bg-[var(--color-glomma-deep)] p-8 text-[var(--color-papir)] md:flex-row md:items-center md:justify-between md:p-12">
            <div>
              <p className="text-[28px] font-bold tracking-[-0.03em] md:text-[34px]">Slutt. Lurer du fortsatt på noe?</p>
              <p className="mt-2 text-[18px] text-[var(--color-tekst-lys-2)]">Ring oss, så finner vi ut av det sammen.</p>
            </div>
            <Knapper lys className="shrink-0" />
          </section>
        </div>
      </div>
    </main>
  );
}
