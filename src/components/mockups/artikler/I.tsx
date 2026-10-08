import { Smuler } from "./deler";
import { ArsakDel, Ark, Avsender, BorteDel, Hilsen, LysDel, NerveDel, Sporsmal, TipsDel } from "./lapp";
import { Figur, Rute } from "./mellom";
import { Sjekk } from "./Sjekk";
import { Lagene, Sukkerklokka } from "./tegninger";
import { ARSAKER, BORTE, LAG, NERVEN, SJEKK, SMATT, TIPS, TRAFIKKLYS } from "./tekst";

/* I «Læreboka»: the note as short numbered chapters, with a list of them at
   the top, the self-check as chapter 0, and small labelled figures between
   the chapters, as in a good textbook: the tooth's three layers, and the
   sugar clock. */

const KAPITLER = [
  { nr: 0, id: "sjekk", navn: "Sjekk selv: hvordan kjennes det?" },
  { nr: 1, id: "nerven", navn: NERVEN.sporsmal },
  { nr: 2, id: "arsaker", navn: ARSAKER.sporsmal },
  { nr: 3, id: "tips", navn: TIPS.sporsmal },
  { nr: 4, id: "stille", navn: BORTE.sporsmal },
  { nr: 5, id: "lys", navn: TRAFIKKLYS.sporsmal },
];

export function I() {
  return (
    <main className="bg-[var(--color-papir)] pb-[clamp(56px,10vw,140px)] pt-[clamp(96px,12vw,140px)]">
      <div className="mx-auto w-full max-w-[1040px] px-[var(--container-px)]">
        <Smuler />
        <Ark className="mt-8">
          <Avsender />

          {/* what is in the note */}
          <nav aria-label="Innhold" className="mt-10 rounded-[22px] bg-[var(--color-kalk)]/60 p-6 md:p-7">
            <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--color-tekst-svak)]">I denne lappen</p>
            <ol className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {KAPITLER.map((k) => (
                <li key={k.id}>
                  <a href={`#${k.id}`} className="flex items-baseline gap-3 text-[16.5px] leading-[1.4] text-[var(--color-tekst)] underline-offset-4 hover:text-[var(--color-glomma-deep)] hover:underline">
                    <span className="w-4 shrink-0 font-bold tabular-nums text-[var(--color-teal)]">{k.nr}</span>
                    {k.navn}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <section id="sjekk" className="scroll-mt-28 pt-12 md:pt-16">
            <Sporsmal nr={0}>Sjekk selv: {SJEKK.sporsmal.toLowerCase()}</Sporsmal>
            <Sjekk lys lesMer utenTittel className="mt-6" />
          </section>

          <div className="mt-6 md:mt-10">
            <NerveDel nr={1} />
            <Figur nr={1} tegning={<Lagene className="w-full" />} smatt={SMATT.lag}>
              <ul className="mt-4 space-y-1.5 text-[16.5px] leading-[1.5] text-[var(--color-tekst-2)]">
                {LAG.map((l) => (
                  <li key={l.navn}>
                    <span className="font-semibold text-[var(--color-glomma-deep)]">{l.navn}:</span> {l.tekst}
                  </li>
                ))}
              </ul>
            </Figur>
            <ArsakDel nr={2} />
            <Figur nr={2} tegning={<Sukkerklokka className="w-full" />} smatt={SMATT.syre} />
            <TipsDel nr={3} />
            <Rute smatt={SMATT.notat} />
            <BorteDel nr={4} />
            <LysDel nr={5} />
          </div>
          <Hilsen />
        </Ark>
      </div>
    </main>
  );
}
