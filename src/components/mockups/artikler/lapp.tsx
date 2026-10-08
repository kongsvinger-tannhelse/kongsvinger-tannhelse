import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { klinikk } from "@/data/klinikk";
import { cn } from "@/lib/utils";
import { Ansikt, Knapper, Vis } from "./deler";
import { FORFATTER } from "./forfatter";
import { ARSAK_TEGNING, Nerve, Stille, TIPS_TEGNING } from "./tegninger";
import { ARSAKER, ARTIKKEL, BORTE, LYSFARGE, NERVEN, TIPS, TRAFIKKLYS } from "./tekst";
import s from "./artikler.module.css";

/* The note from the dentist, in parts: the sheet, Per at the top, each
   section with its pen sketch, the traffic light and the goodbye. A uses
   them as they are; G, H and I put other things between them. */

type Del = { id?: string; nr?: number; kant?: boolean };

/** A section's question. With `nr`, a chapter number in a pen circle beside it. */
export function Sporsmal({ children, nr }: { children: React.ReactNode; nr?: number }) {
  return (
    <h2 className="flex items-start gap-3.5 text-[26px] font-bold leading-[1.15] tracking-[-0.03em] text-[var(--color-glomma-deep)] md:text-[30px]">
      {nr !== undefined && (
        <span aria-hidden="true" className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full border-2 border-[var(--color-teal)] text-[16px] font-bold tracking-normal text-[var(--color-teal)] md:size-10">
          {nr}
        </span>
      )}
      <span>{children}</span>
    </h2>
  );
}

export function Brod({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-[18.5px] leading-[1.7] text-[var(--color-tekst)] md:text-[19.5px]", className)}>{children}</p>;
}

const KANT = "border-t border-dashed border-[var(--color-strek)]";

/** A section with the words on the left and a sketch in the right margin (above the words, small, on a phone). */
export function Avsnitt({ id, kant = true, tegning, children }: { id?: string; kant?: boolean; tegning?: React.ReactNode; children: React.ReactNode }) {
  return (
    <Vis as="section" id={id} className={cn("scroll-mt-28 flow-root gap-x-14 py-10 md:grid md:grid-cols-[minmax(0,1fr)_200px] md:py-14", kant && KANT)}>
      {tegning && <div className="float-right mb-2 ml-4 w-28 md:order-2 md:float-none md:m-0 md:w-full">{tegning}</div>}
      <div className="space-y-4 md:order-1">{children}</div>
    </Vis>
  );
}

/** The sheet of paper the note is written on. */
export function Ark({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <article className={cn("relative rounded-[28px] bg-[#FBF8F1] px-[clamp(22px,6vw,80px)] pb-[clamp(36px,6vw,72px)] pt-[clamp(32px,5vw,60px)] shadow-[0_40px_70px_-50px_rgba(10,25,32,0.5)] ring-1 ring-[var(--color-strek)]", className)}>
      {children}
    </article>
  );
}

/** Per at the top of the note, the title and the short intro. */
export function Avsender() {
  return (
    <header>
      <div className="flex items-center gap-4">
        <Ansikt className="size-14 ring-4 ring-white md:size-[72px]" />
        <div>
          <p className="text-[15px] font-semibold text-[var(--color-glomma-deep)]">
            Fra {FORFATTER.rolle.toLowerCase()} {FORFATTER.navn}
          </p>
          <p className="text-[13.5px] text-[var(--color-tekst-svak)]">{ARTIKKEL.lesetid}</p>
        </div>
      </div>
      <h1 className="mt-8 max-w-[14ch] font-bold text-[var(--color-glomma-deep)]" style={{ fontSize: "clamp(42px, 6.4vw, 78px)", lineHeight: 0.98, letterSpacing: "-0.05em" }}>
        {ARTIKKEL.tittel}
      </h1>
      <p className="mt-6 max-w-[38ch] text-[20px] leading-[1.55] text-[var(--color-tekst-2)] md:text-[23px]">{ARTIKKEL.ingress}</p>
    </header>
  );
}

export function NerveDel({ id = "nerven", nr, kant }: Del) {
  return (
    <Avsnitt id={id} kant={kant} tegning={<Nerve strek className="w-full" />}>
      <Sporsmal nr={nr}>{NERVEN.sporsmal}</Sporsmal>
      {NERVEN.tekst.map((t) => (
        <Brod key={t}>{t}</Brod>
      ))}
    </Avsnitt>
  );
}

export function ArsakDel({ id = "arsaker", nr, kant = true }: Del) {
  return (
    <Vis as="section" id={id} className={cn("scroll-mt-28 py-10 md:py-14", kant && KANT)}>
      <Sporsmal nr={nr}>{ARSAKER.sporsmal}</Sporsmal>
      <Brod className="mt-4">{ARSAKER.intro}</Brod>
      <ul className="mt-8 grid gap-x-10 gap-y-10 sm:grid-cols-2">
        {ARSAKER.liste.map((a, i) => {
          const T = ARSAK_TEGNING[a.id];
          return (
            <li key={a.id} id={`arsak-${a.id}`} className="flex scroll-mt-28 gap-4">
              <T strek className="w-24 shrink-0 md:w-28" forsink={i * 0.25} />
              <div>
                <h3 className="text-[19px] font-bold text-[var(--color-glomma-deep)]">{a.navn}</h3>
                <p className="mt-1.5 text-[17px] leading-[1.6] text-[var(--color-tekst)]">{a.tekst}</p>
                <p className="mt-2 text-[15.5px] leading-[1.55] text-[var(--color-tekst-2)]">
                  <span className="font-semibold text-[var(--color-tekst)]">Slik kjennes det: </span>
                  {a.kjennes}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </Vis>
  );
}

export function TipsDel({ id = "tips", nr, kant = true }: Del) {
  return (
    <Vis as="section" id={id} className={cn("scroll-mt-28 py-10 md:py-14", kant && KANT)}>
      <Sporsmal nr={nr}>{TIPS.sporsmal}</Sporsmal>
      <ol className="mt-7 space-y-5">
        {TIPS.liste.map((t, i) => {
          const T = TIPS_TEGNING[t.id];
          return (
            <li key={t.id} className="flex items-center gap-4 md:gap-5">
              <T strek className="w-14 shrink-0 md:w-16" forsink={i * 0.2} />
              <Brod>{t.tekst}</Brod>
            </li>
          );
        })}
      </ol>
      <p className="mt-8 rounded-r-2xl border-l-4 bg-[#F8E4DB]/60 px-5 py-4 text-[17px] leading-[1.6] text-[#5E2418]" style={{ borderColor: "#D9634C" }}>
        <span className="font-bold">Obs! </span>
        {TIPS.advarsel}
      </p>
    </Vis>
  );
}

export function BorteDel({ id = "stille", nr, kant }: Del) {
  return (
    <Avsnitt id={id} kant={kant} tegning={<Stille strek className="w-full" />}>
      <Sporsmal nr={nr}>{BORTE.sporsmal}</Sporsmal>
      {BORTE.tekst.map((t) => (
        <Brod key={t}>{t}</Brod>
      ))}
    </Avsnitt>
  );
}

/** The traffic light: one lamp for each row, in one dark housing, red on top as on a real one. */
export function LysDel({ id = "lys", nr, kant = true }: Del) {
  const lys = [...TRAFIKKLYS.lys].reverse();
  return (
    <Vis as="section" id={id} className={cn("scroll-mt-28 pt-10 md:pt-14", kant && KANT)}>
      <Sporsmal nr={nr}>{TRAFIKKLYS.sporsmal}</Sporsmal>
      <Brod className="mt-3">{TRAFIKKLYS.intro}</Brod>
      <div className="relative mt-8 grid grid-cols-[52px_minmax(0,1fr)] gap-x-5 md:grid-cols-[64px_minmax(0,1fr)] md:gap-x-8">
        <div aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-[52px] rounded-[26px] bg-[var(--color-glomma-deep)] md:w-[64px] md:rounded-[32px]" />
        {lys.map((l, i) => {
          const f = LYSFARGE[l.farge];
          return (
            <div key={l.farge} className="contents">
              <div className="relative flex items-start justify-center pt-6">
                <span
                  aria-hidden="true"
                  className={cn("block size-9 rounded-full md:size-11", s.lampe)}
                  style={{ background: f.prikk, boxShadow: `0 0 22px 2px ${f.prikk}88`, "--forsink": `${0.3 + i * 0.45}s` } as React.CSSProperties}
                />
              </div>
              <div className={cn("py-5", i < lys.length - 1 && "border-b border-[var(--color-strek)]")}>
                <h3 className="text-[21px] font-bold" style={{ color: f.tekst }}>
                  {l.tittel}
                </h3>
                <ul className="mt-2 space-y-1 text-[17px] leading-[1.55] text-[var(--color-tekst)]">
                  {l.nar.map((n) => (
                    <li key={n} className="flex gap-2.5">
                      <span aria-hidden="true" className="mt-[0.62em] size-1.5 shrink-0 rounded-full" style={{ background: f.prikk }} />
                      {n}
                    </li>
                  ))}
                </ul>
                <p className="mt-2.5 text-[17px] font-semibold text-[var(--color-glomma-deep)]">{l.gjor}</p>
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-6 text-[15.5px] leading-[1.6] text-[var(--color-tekst-2)]">{TRAFIKKLYS.etterStengetid}</p>
    </Vis>
  );
}

/** Per's goodbye at the bottom of the note, with the two buttons (or, with `enKnapp`, only «Bestill time», and the number as words). */
export function Hilsen({ className, enKnapp = false }: { className?: string; enKnapp?: boolean }) {
  if (enKnapp) {
    return (
      <footer className={cn("mt-12 flex flex-col items-start gap-6 rounded-[22px] bg-[var(--color-kalk)]/70 p-6 md:mt-16 md:flex-row md:items-center md:justify-between md:p-8", className)}>
        <div className="flex items-center gap-4">
          <Ansikt className="size-12" />
          <p className="text-[17px] leading-[1.45] text-[var(--color-tekst)]">
            Vil du at vi ser på tanna? Bestill en time, så tar vi en titt.
            <br />
            <span className="font-semibold text-[var(--color-glomma-deep)]">Hilsen {FORFATTER.navn.split(" ")[0]}</span>
            <span className="text-[var(--color-tekst-2)]"> og alle på {klinikk.navn}</span>
          </p>
        </div>
        <div className="shrink-0">
          <Link
            href="/#kontakt"
            className="inline-flex items-center gap-2.5 rounded-full bg-[var(--color-glomma)] px-8 py-4 text-[17px] font-semibold text-[var(--color-papir)] shadow-[0_12px_30px_-14px_rgba(22,48,59,0.7)] transition-colors duration-300 hover:bg-[var(--color-glomma-deep)]"
          >
            <CalendarDays className="size-5" aria-hidden="true" />
            Bestill time
          </Link>
          <p className="mt-2.5 text-[14.5px] text-[var(--color-tekst-2)] md:text-center">
            eller ring{" "}
            <a href={klinikk.telefon.lenke} className="font-semibold text-[var(--color-glomma-deep)] underline-offset-4 hover:underline">
              {klinikk.telefon.visning}
            </a>
          </p>
        </div>
      </footer>
    );
  }
  return (
    <footer className={cn("mt-12 flex flex-col gap-6 rounded-[22px] bg-[var(--color-kalk)]/70 p-6 md:mt-16 md:flex-row md:items-center md:justify-between md:p-8", className)}>
      <div className="flex items-center gap-4">
        <Ansikt className="size-12" />
        <p className="text-[17px] leading-[1.45] text-[var(--color-tekst)]">
          Lurer du på noe? Ring oss, så hjelper vi deg.
          <br />
          <span className="font-semibold text-[var(--color-glomma-deep)]">Hilsen {FORFATTER.navn.split(" ")[0]}</span>
          <span className="text-[var(--color-tekst-2)]"> og alle på {klinikk.navn}</span>
        </p>
      </div>
      <Knapper className="shrink-0" />
    </footer>
  );
}
