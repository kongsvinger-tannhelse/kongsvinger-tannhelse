import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { klinikk } from "@/data/klinikk";
import type { Artikkel, Del } from "@/data/artikler";
import { cn } from "@/lib/utils";
import { Merke, Vis } from "./deler";
import { GulLapp } from "./mellom";
import { TEGNINGER } from "./tegninger";

/* The note from the clinic, in parts: the sheet, who it is from, each kind
   of section with its pen sketches, the yellow sticky notes between them,
   and the goodbye with one button. */

export function Sporsmal({ children }: { children: React.ReactNode }) {
  return <h2 className="text-[26px] font-bold leading-[1.15] tracking-[-0.03em] text-[var(--color-glomma-deep)] md:text-[30px]">{children}</h2>;
}

export function Brod({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("text-[18.5px] leading-[1.7] text-[var(--color-tekst)] md:text-[19.5px]", className)}>{children}</p>;
}

const KANT = "border-t border-dashed border-[var(--color-strek)]";

/** The sheet of paper the note is written on. */
export function Ark({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <article className={cn("relative rounded-[28px] bg-[#FBF8F1] px-[clamp(22px,6vw,80px)] pb-[clamp(36px,6vw,72px)] pt-[clamp(32px,5vw,60px)] shadow-[0_40px_70px_-50px_rgba(10,25,32,0.5)] ring-1 ring-[var(--color-strek)]", className)}>
      {children}
    </article>
  );
}

/** Who the note is from, the title and the short intro. */
export function Avsender({ artikkel }: { artikkel: Artikkel }) {
  return (
    <header>
      <div className="flex items-center gap-4">
        <Merke className="size-14 shadow-[0_6px_18px_-10px_rgba(10,25,32,0.45)] ring-1 ring-[var(--color-strek)] md:size-[72px]" />
        <div>
          <p className="text-[15px] font-semibold text-[var(--color-glomma-deep)]">Fra tannlegene på {klinikk.navn}</p>
          <p className="text-[13.5px] text-[var(--color-tekst-svak)]">{artikkel.lesetid}</p>
        </div>
      </div>
      <h1 className="mt-8 max-w-[15ch] font-bold text-[var(--color-glomma-deep)]" style={{ fontSize: "clamp(42px, 6.4vw, 78px)", lineHeight: 0.98, letterSpacing: "-0.05em" }}>
        {artikkel.tittel}
      </h1>
      <p className="mt-6 max-w-[38ch] text-[20px] leading-[1.55] text-[var(--color-tekst-2)] md:text-[23px]">{artikkel.ingress}</p>
    </header>
  );
}

/** One section of the note, of whichever kind. `n` counts the sticky notes, so they alternate sides. */
export function DelVisning({ del, n }: { del: Del; n: number }) {
  switch (del.type) {
    case "tekst": {
      const T = del.tegning ? TEGNINGER[del.tegning] : null;
      return (
        <Vis as="section" id={del.id} className={cn("scroll-mt-28 flow-root gap-x-14 py-10 md:grid md:grid-cols-[minmax(0,1fr)_200px] md:py-14", KANT)}>
          {T && (
            <div className="float-right mb-2 ml-4 w-28 md:order-2 md:float-none md:m-0 md:w-full">
              <T strek className="w-full" />
            </div>
          )}
          <div className="space-y-4 md:order-1">
            <Sporsmal>{del.tittel}</Sporsmal>
            {del.avsnitt.map((a) => (
              <Brod key={a}>{a}</Brod>
            ))}
          </div>
        </Vis>
      );
    }

    case "liste":
      return (
        <Vis as="section" id={del.id} className={cn("scroll-mt-28 py-10 md:py-14", KANT)}>
          <Sporsmal>{del.tittel}</Sporsmal>
          {del.intro && <Brod className="mt-4">{del.intro}</Brod>}
          <ul className="mt-8 grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {del.punkter.map((p, i) => {
              const T = TEGNINGER[p.tegning];
              return (
                <li key={p.id} id={`${del.id}-${p.id}`} className="flex scroll-mt-28 gap-4">
                  <T strek className="w-24 shrink-0 md:w-28" forsink={i * 0.25} />
                  <div>
                    <h3 className="text-[19px] font-bold text-[var(--color-glomma-deep)]">{p.navn}</h3>
                    <p className="mt-1.5 text-[17px] leading-[1.6] text-[var(--color-tekst)]">{p.tekst}</p>
                    {p.ekstra && (
                      <p className="mt-2 text-[15.5px] leading-[1.55] text-[var(--color-tekst-2)]">
                        {del.ekstraNavn && <span className="font-semibold text-[var(--color-tekst)]">{del.ekstraNavn} </span>}
                        {p.ekstra}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </Vis>
      );

    case "tips":
      return (
        <Vis as="section" id={del.id} className={cn("scroll-mt-28 py-10 md:py-14", KANT)}>
          <Sporsmal>{del.tittel}</Sporsmal>
          <ol className="mt-7 space-y-5">
            {del.punkter.map((p, i) => {
              const T = TEGNINGER[p.tegning];
              return (
                <li key={p.tekst} className="flex items-center gap-4 md:gap-5">
                  <T strek className="w-14 shrink-0 md:w-16" forsink={i * 0.2} />
                  <Brod>{p.tekst}</Brod>
                </li>
              );
            })}
          </ol>
          {del.obs && (
            <p className="mt-8 rounded-r-2xl border-l-4 bg-[#F8E4DB]/60 px-5 py-4 text-[17px] leading-[1.6] text-[#5E2418]" style={{ borderColor: "#D9634C" }}>
              <span className="font-bold">Obs! </span>
              {del.obs}
            </p>
          )}
        </Vis>
      );

    case "lapp":
      return <GulLapp lapp={del.lapp} side={n % 2 === 0 ? "h" : "v"} vri={VRI[n % VRI.length]} />;
  }
}

/** How much each sticky note leans, in turn. */
const VRI = [1.5, -1.8, 1.2, -1.4];

/** The goodbye at the bottom of the note: a line, and one button to book. */
export function Hilsen({ tekst, className }: { tekst: string; className?: string }) {
  return (
    <footer className={cn("mt-12 flex flex-col items-start gap-6 rounded-[22px] bg-[var(--color-kalk)]/70 p-6 md:mt-16 md:flex-row md:items-center md:justify-between md:p-8", className)}>
      <div className="flex items-center gap-4">
        <Merke className="size-12" />
        <p className="text-[17px] leading-[1.45] text-[var(--color-tekst)]">
          {tekst}
          <br />
          <span className="font-semibold text-[var(--color-glomma-deep)]">Hilsen alle oss</span>
          <span className="text-[var(--color-tekst-2)]"> på {klinikk.navn}</span>
        </p>
      </div>
      <div className="shrink-0">
        <Link
          href="/kontakt"
          className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full bg-[var(--color-glomma)] px-8 py-4 text-[17px] font-semibold text-[var(--color-papir)] shadow-[0_12px_30px_-14px_rgba(22,48,59,0.7)] transition-colors duration-300 hover:bg-[var(--color-glomma-deep)]"
        >
          <CalendarDays className="size-5" aria-hidden="true" />
          Bestill time
        </Link>
        <p className="mt-2.5 text-[14.5px] text-[var(--color-tekst-2)] md:text-center">
          eller ring{" "}
          <a href={klinikk.telefon.lenke} className="whitespace-nowrap font-semibold text-[var(--color-glomma-deep)] underline-offset-4 hover:underline">
            {klinikk.telefon.visning}
          </a>
        </p>
      </div>
    </footer>
  );
}
