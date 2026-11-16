import { Fragment } from "react";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { klinikk } from "@/data/klinikk";
import type { Del } from "@/data/artikler";
import { SIDETITTEL } from "@/lib/sidetittel";
import { cn } from "@/lib/utils";
import { Merke, Vis } from "./deler";
import { ApentNa } from "./klokke";
import { InneLapp, MargLapp, type Festet } from "./mellom";
import { TEGNINGER } from "./tegninger";
import s from "./artikler.module.css";

/* The note from the clinic, in parts: the sheet, its title, each kind
   of section with its pen sketches and the sticky notes pinned to it, and
   the goodbye with one button.

   On a wide screen every section is a text column and a margin. The margin
   holds the section's sticky notes (Margflyt.tsx puts each one beside its
   words), or, when there are none, the section's sketch. When the notes
   take the margin, the sketch steps into the text, on the left, clear of
   the arrows. */

export function Sporsmal({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h2 className={cn("text-[26px] font-bold leading-[1.15] tracking-[-0.03em] text-[var(--color-glomma-deep)] md:text-[30px]", className)}>{children}</h2>;
}

export function Brod({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-[18.5px] leading-[1.7] text-[var(--color-tekst)] md:text-[19.5px]", className)}>{children}</p>;
}

const KANT = "border-t border-dashed border-[var(--color-strek)]";

/** A section on a wide screen: the text, and the margin beside it. */
const MED_MARG = "lg:grid lg:grid-cols-[minmax(0,1fr)_var(--marg)] lg:gap-x-[var(--renne)]";

/** The sheet of paper the note is written on. */
export function Ark({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <article className={cn("relative rounded-[28px] bg-[#FFFDF8] px-[clamp(22px,6vw,80px)] pb-[clamp(36px,6vw,72px)] pt-[clamp(32px,5vw,60px)] shadow-[0_40px_70px_-50px_rgba(10,25,32,0.5)] ring-1 ring-[var(--color-strek)]", className)}>
      {children}
    </article>
  );
}

/** The top of a sheet: the title and the short intro under it, centred. The text below starts from the left. */
export function Topp({ tittel, ingress, className }: { tittel: string; ingress: string; className?: string }) {
  return (
    <header className={cn("text-center", className)}>
      <h1 className="mx-auto max-w-[22ch] text-balance font-bold text-[var(--color-glomma-deep)]" style={SIDETITTEL}>
        {tittel}
      </h1>
      <p className="mx-auto mt-4 max-w-[44ch] text-balance text-[18px] leading-[1.55] text-[var(--color-tekst-2)] md:mt-5 md:text-[20px]">{ingress}</p>
    </header>
  );
}

export type Seksjon = Exclude<Del, { type: "lapp" }>;

/** The pinned notes whose words are in this piece of text. */
const iTekst = (tekst: string, lapper: Festet[]) => lapper.filter((l) => l.id && l.lapp.feste && tekst.includes(l.lapp.feste));

/** A piece of text, with a pen underline under the words a note is pinned to. */
function Merket({ tekst, lapper }: { tekst: string; lapper: Festet[] }) {
  const her = iTekst(tekst, lapper)
    .map((l) => ({ l, i: tekst.indexOf(l.lapp.feste as string) }))
    .sort((a, b) => a.i - b.i);
  if (her.length === 0) return tekst;
  const biter: React.ReactNode[] = [];
  let fra = 0;
  for (const { l, i } of her) {
    const ord = l.lapp.feste as string;
    if (i < fra) continue;
    biter.push(tekst.slice(fra, i));
    biter.push(
      <Vis as="span" key={l.id} id={l.id as string} className={s.understrek}>
        {ord}
      </Vis>,
    );
    fra = i + ord.length;
  }
  biter.push(tekst.slice(fra));
  return biter;
}

/** On a narrower screen: the notes pinned in this piece of text, right after it. */
function Inne({ tekst, lapper }: { tekst: string; lapper: Festet[] }) {
  return iTekst(tekst, lapper).map((l) => <InneLapp key={l.n} festet={l} />);
}

/** On a narrower screen: the notes that are not pinned, after the section's text. */
function Frie({ lapper }: { lapper: Festet[] }) {
  return lapper.filter((l) => !l.id).map((l) => <InneLapp key={l.n} festet={l} className="pt-8" />);
}

/** On a wide screen: the margin with the section's notes, the pinned ones first. */
function Marg({ lapper }: { lapper: Festet[] }) {
  const ordnet = [...lapper.filter((l) => l.id), ...lapper.filter((l) => !l.id)];
  return (
    <div data-marg="" className="hidden lg:order-2 lg:flex lg:flex-col lg:gap-10">
      {ordnet.map((l) => (
        <MargLapp key={l.n} festet={l} />
      ))}
    </div>
  );
}

/** One section of the note, of whichever kind, with the sticky notes that follow it. */
export function DelVisning({ del, lapper }: { del: Seksjon; lapper: Festet[] }) {
  const harMarg = lapper.length > 0;
  switch (del.type) {
    case "tekst": {
      const T = del.tegning ? TEGNINGER[del.tegning] : null;
      return (
        <Vis as="section" id={del.id} className={cn("scroll-mt-28 flow-root gap-x-14 py-10 md:grid md:grid-cols-[minmax(0,1fr)_200px] md:py-14", MED_MARG, KANT)}>
          {T && (
            <div className={cn("float-right mb-2 ml-4 w-28 md:order-2 md:float-none md:m-0 md:w-full lg:max-w-[210px]", harMarg && "lg:hidden")}>
              <T strek className="w-full" />
            </div>
          )}
          <div className="space-y-4 md:order-1">
            <Sporsmal>{del.tittel}</Sporsmal>
            <div className={cn(T && harMarg && "lg:grid lg:grid-cols-[136px_minmax(0,1fr)] lg:items-start lg:gap-x-8")}>
              {/* the notes have the margin: the sketch comes into the text, on the left */}
              {T && harMarg && (
                <div className="hidden pt-1 lg:block">
                  <T strek className="w-full" />
                </div>
              )}
              <div className="space-y-4">
                {del.avsnitt.map((a) => (
                  <Fragment key={a}>
                    <Brod>
                      <Merket tekst={a} lapper={lapper} />
                    </Brod>
                    <Inne tekst={a} lapper={lapper} />
                  </Fragment>
                ))}
                <Frie lapper={lapper} />
              </div>
            </div>
          </div>
          {harMarg && <Marg lapper={lapper} />}
        </Vis>
      );
    }

    case "liste": {
      const festet = lapper.some((l) => l.id);
      return (
        <Vis as="section" id={del.id} className={cn("scroll-mt-28 py-10 md:py-14", MED_MARG, KANT)}>
          <div className="min-w-0 lg:order-1">
            <Sporsmal>{del.tittel}</Sporsmal>
            {del.intro && (
              <>
                <Brod className="mt-4">
                  <Merket tekst={del.intro} lapper={lapper} />
                </Brod>
                <Inne tekst={del.intro} lapper={lapper} />
              </>
            )}
            {/* side by side on a tablet, unless a note has to fit in after an item */}
            <ul className={cn("mt-8 grid gap-x-10 gap-y-10", !festet && "sm:grid-cols-2 lg:grid-cols-1")}>
              {del.punkter.map((p, i) => {
                const T = TEGNINGER[p.tegning];
                return (
                  <li key={p.id} id={`${del.id}-${p.id}`} className="scroll-mt-28">
                    <div className="flex gap-4">
                      <T strek className="w-24 shrink-0 md:w-28" forsink={i * 0.25} />
                      <div>
                        <h3 className="text-[19px] font-bold text-[var(--color-glomma-deep)]">{p.navn}</h3>
                        <p className="mt-1.5 text-[17px] leading-[1.6] text-[var(--color-tekst)]">
                          <Merket tekst={p.tekst} lapper={lapper} />
                        </p>
                        {p.ekstra && (
                          <p className="mt-2 text-[15.5px] leading-[1.55] text-[var(--color-tekst-2)]">
                            {del.ekstraNavn && <span className="font-semibold text-[var(--color-tekst)]">{del.ekstraNavn} </span>}
                            <Merket tekst={p.ekstra} lapper={lapper} />
                          </p>
                        )}
                      </div>
                    </div>
                    <Inne tekst={p.tekst} lapper={lapper} />
                    {p.ekstra && <Inne tekst={p.ekstra} lapper={lapper} />}
                  </li>
                );
              })}
            </ul>
            <Frie lapper={lapper} />
          </div>
          {harMarg && <Marg lapper={lapper} />}
        </Vis>
      );
    }

    case "tips":
      return (
        <Vis as="section" id={del.id} className={cn("scroll-mt-28 py-10 md:py-14", MED_MARG, KANT)}>
          <div className="min-w-0 lg:order-1">
            <Sporsmal>{del.tittel}</Sporsmal>
            <ol className="mt-7 space-y-5">
              {del.punkter.map((p, i) => {
                const T = TEGNINGER[p.tegning];
                return (
                  <li key={p.tekst}>
                    <div className="flex items-center gap-4 md:gap-5">
                      <T strek className="w-14 shrink-0 md:w-16" forsink={i * 0.2} />
                      <Brod>
                        <Merket tekst={p.tekst} lapper={lapper} />
                      </Brod>
                    </div>
                    <Inne tekst={p.tekst} lapper={lapper} />
                  </li>
                );
              })}
            </ol>
            {del.obs && (
              <>
                <p className="mt-8 rounded-r-2xl border-l-4 bg-[#F8E4DB]/60 px-5 py-4 text-[17px] leading-[1.6] text-[#5E2418]" style={{ borderColor: "#D9634C" }}>
                  <span className="font-bold">Obs! </span>
                  <Merket tekst={del.obs} lapper={lapper} />
                </p>
                <Inne tekst={del.obs} lapper={lapper} />
              </>
            )}
            <Frie lapper={lapper} />
          </div>
          {harMarg && <Marg lapper={lapper} />}
        </Vis>
      );
  }
}

/**
 * The goodbye at the bottom of the note: a line, and one button to book.
 * `apent`: under the phone number, say whether the clinic is open now (the articles do).
 */
/** The goodbye at the foot of a note. `bestill` adds the «Be om time» button; without it, just the phone number. */
export function Hilsen({ tekst, className, apent = false, bestill = true }: { tekst: string; className?: string; apent?: boolean; bestill?: boolean }) {
  return (
    <footer className={cn("mt-12 flex flex-col items-start gap-6 rounded-[22px] bg-[var(--color-kalk)]/70 p-6 md:mt-16 md:flex-row md:items-center md:justify-between md:p-8", className)}>
      <div className="flex items-center gap-4">
        <Merke className="size-12" />
        <p className="text-[17px] leading-[1.45] text-[var(--color-tekst)]">
          {tekst}{" "}
          <br />
          <span className="font-semibold text-[var(--color-glomma-deep)]">Hilsen alle oss</span>
          <span className="text-[var(--color-tekst-2)]"> på {klinikk.navn}</span>
        </p>
      </div>
      <div className="shrink-0">
        {bestill && (
          <Link
            href="/kontakt"
            className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full bg-[var(--color-glomma)] px-8 py-4 text-[17px] font-semibold text-[var(--color-papir)] shadow-[0_12px_30px_-14px_rgba(22,48,59,0.7)] transition-colors duration-300 hover:bg-[var(--color-glomma-deep)]"
          >
            <CalendarDays className="size-5" aria-hidden="true" />
            Be om time
          </Link>
        )}
        <p className={cn("text-[14.5px] text-[var(--color-tekst-2)]", bestill ? "mt-2.5 md:text-center" : "md:text-right")}>
          {bestill ? "eller ring" : "Ring oss på"}{" "}
          <a href={klinikk.telefon.lenke} className="whitespace-nowrap font-semibold text-[var(--color-glomma-deep)] underline-offset-4 hover:underline">
            {klinikk.telefon.visning}
          </a>
          {/* the hours on the server; open now, or when it opens, in the browser */}
          {apent && <ApentNa className="mt-0.5 block text-[13.5px] text-[var(--color-tekst-svak)]" />}
        </p>
      </div>
    </footer>
  );
}
