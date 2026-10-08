import { Check, ChevronDown } from "lucide-react";
import { Bestill } from "@/components/behandlinger/side";
import { Kilder, Seksjon, Topp, Ut } from "@/components/tekstside";
import { ALDER, GRUPPER, HELFO_GJENNOMGATT, HELFO_KILDER, HELFO_SPORSMAL, STONADSPUNKTER } from "@/data/helfo";
import { cn } from "@/lib/utils";

/* /helfo: who pays what at the dentist. The age ruler shows it at a
   glance; the clinic's direct settlement with Helfo comes next, then
   Helfo's 15 conditions, the frikort, the public dental service, the
   questions people search for, and the sources. Every fact is in
   data/helfo.ts with its source. */

/* The ruler's colour for each age group, and its length in years (the last one runs on). */
const FARGE = {
  barn: { strek: "#A7B88A", flate: "rgba(167,184,138,0.45)" },
  unge: { strek: "#2DA4B4", flate: "rgba(45,164,180,0.32)" },
  voksne: { strek: "#22404D", flate: "rgba(34,64,77,0.85)" },
} as const;
const AR = { barn: 19, unge: 10, voksne: 12 } as const;

/** One mark per year, from 0 and on past 29: the three groups as lengths of a ruler. */
function Linjal() {
  return (
    <div aria-hidden="true" className="relative">
      <div className="flex h-4 overflow-hidden rounded-full">
        {ALDER.map((a) => (
          <div
            key={a.id}
            style={{
              flexGrow: AR[a.id],
              flexBasis: 0,
              backgroundColor: FARGE[a.id].flate,
              // a fine line at every year
              backgroundImage: "linear-gradient(to right, rgba(243,244,241,0.55) 0 1px, transparent 1px)",
              backgroundSize: `${100 / AR[a.id]}% 100%`,
              ...(a.id === "voksne" ? { maskImage: "linear-gradient(to right, #000 55%, transparent)" } : {}),
            }}
          />
        ))}
      </div>
      <div className="mt-2 flex text-[13px] font-semibold tabular-nums text-[var(--color-tekst-2)]">
        {ALDER.map((a) => (
          <span key={a.id} style={{ flexGrow: AR[a.id], flexBasis: 0 }}>
            {a.fra === 0 ? "0 år" : a.fra}
          </span>
        ))}
      </div>
    </div>
  );
}

/** Who pays, by age: the ruler, with a card under each length of it. */
function Aldre() {
  return (
    <section aria-labelledby="alder-tittel" className="mt-12 md:mt-16">
      <h2 id="alder-tittel" className="text-[26px] font-bold leading-[1.15] tracking-[-0.03em] text-[var(--color-glomma-deep)] md:text-[30px]">
        Hvem betaler, etter alder
      </h2>
      <p className="mt-2 text-[16px] text-[var(--color-tekst-2)]">Alderen regnes etter året du fyller, ikke bursdagen din.</p>
      <div className="mt-7">
        <Linjal />
      </div>
      <ul className="mt-5 grid gap-4 lg:grid-cols-[minmax(0,19fr)_minmax(0,10fr)_minmax(0,12fr)]">
        {ALDER.map((a) => {
          const mork = a.id === "voksne";
          return (
            <li
              key={a.id}
              className={cn(
                "rounded-[22px] border-t-[3px] p-5 ring-1 sm:p-6",
                mork ? "bg-[var(--color-glomma)] text-[var(--color-papir)] ring-transparent" : "bg-[#FBF8F1] ring-[var(--color-strek)]"
              )}
              style={{ borderTopColor: FARGE[a.id].strek }}
            >
              <p className={cn("text-[13px] font-semibold uppercase tracking-[0.12em]", mork ? "text-[var(--color-bjork)]" : "text-[var(--color-tekst-svak)]")}>{a.hvem}</p>
              <h3 className={cn("mt-1 text-[28px] font-bold tracking-[-0.03em]", mork ? "text-[var(--color-papir)]" : "text-[var(--color-glomma-deep)]")}>{a.alder}</h3>
              <dl className="mt-4 space-y-3 text-[15.5px] leading-[1.55]">
                <div>
                  <dt className={cn("text-[13px]", mork ? "text-[var(--color-tekst-lys-2)]" : "text-[var(--color-tekst-svak)]")}>Hvor</dt>
                  <dd className="font-medium">{a.hvor}</dd>
                </div>
                <div>
                  <dt className={cn("text-[13px]", mork ? "text-[var(--color-tekst-lys-2)]" : "text-[var(--color-tekst-svak)]")}>Du betaler</dt>
                  <dd className="font-medium">{a.betaler}</dd>
                </div>
              </dl>
              <p className={cn("mt-4 border-t border-dashed pt-3 text-[14.5px] leading-[1.55]", mork ? "border-[var(--color-strek-lys)] text-[var(--color-tekst-lys-2)]" : "border-[var(--color-strek)] text-[var(--color-tekst-2)]")}>
                {a.mer}
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

const TRINN = [
  "Tannlegen vurderer om du har rett på stønad.",
  "Du betaler din del: forskjellen mellom prisen og det Helfo dekker.",
  "Vi sender kravet til Helfo. Du søker ikke selv.",
];

/** The clinic settles with Helfo directly. */
function Oppgjor() {
  return (
    <section aria-labelledby="oppgjor-tittel" className="mt-12 rounded-[28px] bg-[#FBF8F1] px-6 py-8 ring-1 ring-[var(--color-strek)] sm:px-10 sm:py-10 md:mt-16">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        <div>
          <h2 id="oppgjor-tittel" className="text-[26px] font-bold leading-[1.15] tracking-[-0.03em] text-[var(--color-glomma-deep)] md:text-[30px]">
            Vi har direkte oppgjør med Helfo
          </h2>
          <p className="mt-3 text-[17px] leading-[1.65] text-[var(--color-tekst-2)]">
            Har du rett på stønad, slipper du å legge ut for det Helfo dekker. Det er bare tannleger med direkte oppgjør som kan gi deg stønad.
          </p>
        </div>
        <ol className="grid gap-4">
          {TRINN.map((t, i) => (
            <li key={t} className="flex items-start gap-4">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[var(--color-glomma)] text-[15px] font-bold tabular-nums text-[var(--color-papir)]">{i + 1}</span>
              <span className="pt-1.5 text-[17px] leading-[1.55] text-[var(--color-tekst)]">{t}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Sporsmal() {
  return (
    <section aria-labelledby="sporsmal-tittel" className="mt-14 md:mt-20">
      <h2 id="sporsmal-tittel" className="text-[26px] font-bold leading-[1.15] tracking-[-0.03em] text-[var(--color-glomma-deep)] md:text-[30px]">
        Spørsmål og svar
      </h2>
      <div className="mt-6 border-t border-[var(--color-strek)]">
        {HELFO_SPORSMAL.map((q, i) => (
          <details key={q.s} className="group border-b border-[var(--color-strek)]" open={i === 0}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[18px] font-semibold tracking-[-0.015em] text-[var(--color-glomma-deep)] [&::-webkit-details-marker]:hidden">
              <h3>{q.s}</h3>
              <ChevronDown className="size-5 shrink-0 text-[var(--color-tekst-svak)] transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
            </summary>
            <p className="max-w-[64ch] pb-6 text-[16.5px] leading-[1.65] text-[var(--color-tekst-2)]">{q.svar}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

const DELER = {
  tilstander: { id: "tilstander", tittel: "Når Helfo betaler for voksne" },
  frikort: { id: "frikort", tittel: "Egenandel og frikort" },
  offentlig: { id: "offentlig", tittel: "Den offentlige tannhelsetjenesten" },
  pris: { id: "pris", tittel: "Pris før behandlingen" },
};

export function HelfoSide() {
  return (
    <main className="overflow-x-clip bg-[var(--color-papir)]">
      <div className="mx-auto w-full max-w-[1040px] px-[var(--container-px)] pt-[clamp(104px,12vw,150px)]">
        <Topp side="Helfo" tittel="Hva dekker Helfo hos tannlegen?">
          <p>
            De fleste voksne betaler tannlegen selv. Men barn og unge voksne får tannbehandling gratis eller billigere, og har du visse sykdommer,
            dekker Helfo en del av regningen. Her er hvem som betaler hva.
          </p>
        </Topp>

        <Aldre />
        <Oppgjor />

        <div className="mt-14 md:mt-20">
          <Seksjon del={DELER.tilstander} nr={1}>
            <p>
              Fra året du fyller 29, betaler du som hovedregel tannbehandlingen selv. Helfo gir stønad ved 15 sykdommer og tilstander. Helfo betaler
              etter faste satser (takster), og tannlegen kan ta mer enn satsen. Forskjellen betaler du selv.
            </p>
            <ol className="gap-x-10 pt-2 text-[16.5px] leading-[1.5] sm:columns-2">
              {STONADSPUNKTER.map((p, i) => (
                <li key={p} className="mb-2.5 flex break-inside-avoid gap-3">
                  <span className="w-6 shrink-0 text-right font-semibold tabular-nums text-[var(--color-teal)]">{i + 1}</span>
                  <span>{p}</span>
                </li>
              ))}
            </ol>
            <p>Det er tannlegen som vurderer om du har rett på stønad. Tannregulering gjøres av en spesialist, en kjeveortoped.</p>
          </Seksjon>

          <Seksjon del={DELER.frikort} nr={2}>
            <p>
              For to av tilstandene, sykdommer og misdannelser i munn og kjeve (5) og periodontitt (6), betaler du en egenandel som teller med på
              frikortet. Tannlegen melder den inn for deg. I 2026 får du frikort når du har betalt 3 278 kroner i egenandeler.
            </p>
            <p>Forskjellen mellom prisen hos tannlegen og det Helfo dekker, må du betale selv, også når du har frikort.</p>
          </Seksjon>

          <Seksjon del={DELER.offentlig} nr={3}>
            <p>
              Fylkeskommunen har ansvaret for Den offentlige tannhelsetjenesten. I Kongsvinger er det{" "}
              <Ut href="https://innlandetfylke.no/tjenester/tannhelse/">Innlandet fylkeskommune</Ut>. I tillegg til barn, ungdom og unge voksne skal
              den gi tannbehandling til:
            </p>
            <ul className="grid gap-2 !list-none !pl-0">
              {GRUPPER.map((g) => (
                <li key={g} className="flex gap-3 !pl-0">
                  <Check className="mt-1 size-4 shrink-0 text-[var(--color-teal)]" aria-hidden="true" />
                  {g}
                </li>
              ))}
            </ul>
            <p>
              Har du vært utsatt for tortur eller overgrep, eller har du sterk angst for tannbehandling, kan du få hjelp gjennom TOO-tilbudet i Den
              offentlige tannhelsetjenesten.
            </p>
          </Seksjon>

          <Seksjon del={DELER.pris} nr={4}>
            <p>
              Koster behandlingen mer enn 5 000 kroner, skal du få et skriftlig pristilbud før behandlingen starter. Dekker Helfo noe, skal beløpet stå i
              tilbudet.
            </p>
          </Seksjon>
        </div>

        <Sporsmal />
        <Kilder kilder={HELFO_KILDER} dato={HELFO_GJENNOMGATT} className="mt-14 md:mt-16" />
      </div>

      <Bestill />
    </main>
  );
}
