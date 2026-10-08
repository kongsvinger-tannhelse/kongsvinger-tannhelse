import { cn } from "@/lib/utils";
import { Ansikt, Knapper, Smuler, Vis } from "./deler";
import { FORFATTER } from "./forfatter";
import { ARSAK_TEGNING, Nerve, Stille, TIPS_TEGNING } from "./tegninger";
import { ARSAKER, ARTIKKEL, BORTE, LYSFARGE, NERVEN, TIPS, TRAFIKKLYS } from "./tekst";
import s from "./artikler.module.css";

/* C «Du spør, vi svarer»: the article as a conversation. The reader's
   questions, in their own words, on the right; the dentist's answers on the
   left. The most urgent question comes first. A list of the questions stays
   beside it on a wide screen, to jump straight to the one you have. */

const SPORSMAL = [
  { id: "haster", s: "Haster det?" },
  { id: "hvorfor", s: NERVEN.sporsmal },
  { id: "hva", s: ARSAKER.sporsmal },
  { id: "gjore", s: TIPS.sporsmal },
  { id: "borte", s: BORTE.sporsmal },
] as const;

/** The reader's question, in a bubble on the right. */
function Du({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn("flex justify-end", s.stig)}>
      <p className="max-w-[30ch] rounded-[26px] rounded-br-[8px] bg-[var(--color-glomma)] px-6 py-4 text-[21px] font-semibold leading-[1.3] tracking-[-0.015em] text-[var(--color-papir)] md:text-[24px]">
        {children}
      </p>
    </div>
  );
}

/** The dentist's answer, on the left, with his face. */
function Vi({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn("mt-5 flex items-start gap-3 md:gap-4", s.stig)} style={{ "--forsink": "0.25s" } as React.CSSProperties}>
      <Ansikt className="mt-1 size-10 md:size-12" />
      <div className="min-w-0 flex-1 rounded-[26px] rounded-tl-[8px] bg-white p-6 shadow-[0_24px_50px_-40px_rgba(10,25,32,0.5)] ring-1 ring-[var(--color-strek)] md:p-8">{children}</div>
    </div>
  );
}

function Rad({ id, sporsmal, children }: { id: string; sporsmal: React.ReactNode; children: React.ReactNode }) {
  return (
    <Vis as="section" id={id} className="scroll-mt-28">
      <h2 className="sr-only">{sporsmal}</h2>
      <Du>{sporsmal}</Du>
      <Vi>{children}</Vi>
    </Vis>
  );
}

const Brod = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <p className={cn("text-[18.5px] leading-[1.65] text-[var(--color-tekst)]", className)}>{children}</p>
);

export function C() {
  return (
    <main className="bg-[var(--color-papir)] pb-[clamp(56px,10vw,140px)] pt-[clamp(96px,12vw,140px)]">
      <div className="mx-auto w-full max-w-[1180px] px-[var(--container-px)]">
        <Smuler />
        <header className="mt-8 max-w-[860px]">
          <h1 className="font-bold text-[var(--color-glomma-deep)]" style={{ fontSize: "clamp(42px, 6.4vw, 84px)", lineHeight: 0.96, letterSpacing: "-0.055em" }}>
            {ARTIKKEL.tittel}
          </h1>
          <p className="mt-6 max-w-[42ch] text-[20px] leading-[1.55] text-[var(--color-tekst-2)] md:text-[22px]">{ARTIKKEL.ingress}</p>
          <div className="mt-6 flex items-center gap-3 text-[14px] text-[var(--color-tekst-2)]">
            <Ansikt className="size-10" />
            <span>
              Svar fra <span className="font-semibold text-[var(--color-glomma-deep)]">{FORFATTER.navn}</span>, {FORFATTER.rolle.toLowerCase()} · {ARTIKKEL.lesetid}
            </span>
          </div>
        </header>

        <div className="mt-12 grid gap-12 md:mt-16 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-16">
          {/* the questions, to jump to the one you have */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--color-tekst-svak)]">Spørsmålene</p>
            <ol className="mt-4 space-y-1 border-l border-[var(--color-strek)]">
              {SPORSMAL.map((q, i) => (
                <li key={q.id}>
                  <a href={`#${q.id}`} className="-ml-px flex gap-3 border-l-2 border-transparent py-2 pl-4 text-[15.5px] leading-[1.35] text-[var(--color-tekst-2)] transition-colors hover:border-[var(--color-glomma)] hover:text-[var(--color-glomma-deep)]">
                    <span className="tabular-nums text-[var(--color-tekst-svak)]">{i + 1}</span>
                    {q.s}
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          <div className="max-w-[820px] space-y-16 md:space-y-20">
            <Rad id="haster" sporsmal="Haster det?">
              <Brod>Det kommer an på hvordan det kjennes. Se hvilken farge som passer best:</Brod>
              <ul className="mt-6 space-y-3">
                {[...TRAFIKKLYS.lys].reverse().map((l, i) => {
                  const f = LYSFARGE[l.farge];
                  return (
                    <li key={l.farge} className="flex gap-4 rounded-[20px] p-5 md:gap-5 md:p-6" style={{ background: f.flate }}>
                      <span aria-hidden="true" className={cn("mt-0.5 size-7 shrink-0 rounded-full", s.lampe)} style={{ background: f.prikk, boxShadow: `0 0 16px 1px ${f.prikk}88`, "--forsink": `${0.5 + i * 0.35}s` } as React.CSSProperties} />
                      <div>
                        <h3 className="text-[19px] font-bold" style={{ color: f.tekst }}>
                          {l.tittel}
                        </h3>
                        <p className="mt-1 text-[16.5px] leading-[1.55] text-[var(--color-tekst)]">{l.nar.join(" ")}</p>
                        <p className="mt-2 text-[16.5px] font-semibold text-[var(--color-glomma-deep)]">{l.gjor}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-4 text-[15px] leading-[1.6] text-[var(--color-tekst-2)]">{TRAFIKKLYS.etterStengetid}</p>
            </Rad>

            <Rad id="hvorfor" sporsmal={NERVEN.sporsmal}>
              <div className="flow-root">
                <Nerve className="float-right -mr-2 -mt-2 ml-4 w-32 md:w-44" />
                <div className="space-y-3">
                  {NERVEN.tekst.map((t) => (
                    <Brod key={t}>{t}</Brod>
                  ))}
                </div>
              </div>
            </Rad>

            <Rad id="hva" sporsmal={ARSAKER.sporsmal}>
              <Brod>{ARSAKER.intro}</Brod>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {ARSAKER.liste.map((a) => {
                  const T = ARSAK_TEGNING[a.id];
                  return (
                    <li key={a.id} className="rounded-[20px] bg-[var(--color-papir)] p-5">
                      <T className="w-24" />
                      <h3 className="mt-3 text-[19px] font-bold text-[var(--color-glomma-deep)]">{a.navn}</h3>
                      <p className="mt-1.5 text-[16.5px] leading-[1.55] text-[var(--color-tekst)]">{a.tekst}</p>
                      <p className="mt-2 text-[15px] leading-[1.5] text-[var(--color-tekst-2)]">
                        <span className="font-semibold text-[var(--color-tekst)]">Slik kjennes det: </span>
                        {a.kjennes}
                      </p>
                    </li>
                  );
                })}
              </ul>
            </Rad>

            <Rad id="gjore" sporsmal={TIPS.sporsmal}>
              <ul className="space-y-3">
                {TIPS.liste.map((t) => {
                  const T = TIPS_TEGNING[t.id];
                  return (
                    <li key={t.id} className="flex items-center gap-4">
                      <span className="grid size-14 shrink-0 place-items-center rounded-full bg-[#E1EFF1]">
                        <T className="w-10" />
                      </span>
                      <Brod>{t.tekst}</Brod>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-6 rounded-2xl bg-[#F8E4DB] px-5 py-4 text-[17px] leading-[1.55] text-[#5E2418]">
                <span className="font-bold">Obs! </span>
                {TIPS.advarsel}
              </p>
            </Rad>

            <Rad id="borte" sporsmal={BORTE.sporsmal}>
              <div className="flow-root">
                <Stille className="float-right -mr-2 -mt-2 ml-4 w-32 md:w-44" />
                <div className="space-y-3">
                  {BORTE.tekst.map((t) => (
                    <Brod key={t}>{t}</Brod>
                  ))}
                </div>
              </div>
            </Rad>

            <Vis as="section">
              <Du>Jeg vil heller snakke med noen.</Du>
              <Vi>
                <Brod>Det skjønner vi godt. Ring oss, så finner vi ut av det sammen. Du kan også skrive til oss.</Brod>
                <Knapper className="mt-5" />
              </Vi>
            </Vis>
          </div>
        </div>
      </div>
    </main>
  );
}
