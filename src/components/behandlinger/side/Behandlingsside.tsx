import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { klinikk } from "@/data/klinikk";
import { BGJENNOMGATT, PRIS_TITTEL, type Behandlingsside as Side, type Del } from "@/data/behandlinger";
import { Merke, Smuler, Vis } from "@/components/artikler/deler";
import { Ark, Brod, Hilsen, Sporsmal } from "@/components/artikler/lapp";
import { GulLapp } from "@/components/artikler/mellom";
import { Bunnlinje } from "@/components/behandlinger/deler";
import { cn } from "@/lib/utils";
import { BTEGNINGER } from "./tegninger";

/**
 * A treatment's own page: a note from the clinic, like the «Råd og tips»
 * notes, with pen sketches in the margin and yellow notes between the
 * parts. The treatment itself is told as a comic strip: pen drawings that
 * draw themselves one after the other, each with a line under it; a step
 * not everyone needs has a dashed frame. Then the price, a goodbye with one
 * button, and the sources.
 */

const HELFO = "/rad-og-tips/hva-dekker-helfo";
const KANT = "scroll-mt-28 border-t border-dashed border-[var(--color-strek)] py-10 md:py-14";
const DATO = new Date(`${BGJENNOMGATT}T12:00:00Z`).toLocaleDateString("nb-NO", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Oslo" });

/** A part of the note with its sketch in the margin. */
function MedTegning({ id, tittel, tegning, children }: { id: string; tittel: string; tegning: React.ReactNode; children: React.ReactNode }) {
  return (
    <Vis as="section" id={id} className={cn(KANT, "flow-root gap-x-14 md:grid md:grid-cols-[minmax(0,1fr)_200px]")}>
      <div className="float-right mb-2 ml-4 w-28 md:order-2 md:float-none md:m-0 md:w-full">{tegning}</div>
      <div className="space-y-4 md:order-1">
        <Sporsmal>{tittel}</Sporsmal>
        {children}
      </div>
    </Vis>
  );
}

function Visning({ del, n }: { del: Del; n: number }) {
  switch (del.type) {
    case "tekst": {
      const T = BTEGNINGER[del.tegning];
      return (
        <MedTegning id={del.id} tittel={del.tittel} tegning={<T className="w-full" />}>
          {del.avsnitt.map((a) => (
            <Brod key={a}>{a}</Brod>
          ))}
        </MedTegning>
      );
    }

    case "tegn":
      return (
        <Vis as="section" id={del.id} className={KANT}>
          <Sporsmal>{del.tittel}</Sporsmal>
          {del.intro && <Brod className="mt-4">{del.intro}</Brod>}
          <ul className="mt-7 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {del.punkter.map((p, i) => {
              const T = BTEGNINGER[p.tegning];
              return (
                <li key={p.tekst} className="flex items-center gap-4">
                  <T className="w-16 shrink-0 md:w-[72px]" forsink={i * 0.15} />
                  <span className="text-[18px] leading-[1.45] text-[var(--color-tekst)]">{p.tekst}</span>
                </li>
              );
            })}
          </ul>
          {del.etter && <Brod className="mt-6">{del.etter}</Brod>}
        </Vis>
      );

    case "serie":
      return (
        <Vis as="section" id={del.id} className={KANT}>
          <Sporsmal>{del.tittel}</Sporsmal>
          <ol className={cn("mt-8 grid grid-cols-2 gap-x-4 gap-y-7 md:gap-x-6 md:gap-y-10", del.ruter.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3")}>
            {del.ruter.map((r, i) => {
              const T = BTEGNINGER[r.tegning];
              return (
                <li key={r.tekst}>
                  <figure>
                    <div
                      className={cn(
                        "grid aspect-square place-items-center rounded-[18px] bg-[#FDFBF5]",
                        r.mellom ? "border-2 border-dashed border-[rgba(22,48,59,0.35)]" : "border-2 border-[rgba(22,48,59,0.78)] shadow-[3px_4px_0_rgba(22,48,59,0.12)]"
                      )}
                    >
                      <T className="w-[82%]" forsink={i * 0.35} />
                    </div>
                    <figcaption className="mt-3 text-[15.5px] leading-[1.45] text-[var(--color-tekst)] md:text-[16.5px]">{r.tekst}</figcaption>
                  </figure>
                </li>
              );
            })}
          </ol>
          {del.etter && <Brod className="mt-8">{del.etter}</Brod>}
        </Vis>
      );

    case "pris": {
      const T = BTEGNINGER[del.tegning];
      return (
        <MedTegning id={del.id} tittel={PRIS_TITTEL} tegning={<T className="w-full" />}>
          <Brod>{del.tekst}</Brod>
          <Brod>
            {del.helfo}{" "}
            <Link href={HELFO} className="font-semibold text-[var(--color-glomma)] underline underline-offset-4">
              Les hva Helfo dekker
            </Link>
            .
          </Brod>
        </MedTegning>
      );
    }

    case "lapp":
      return <GulLapp lapp={del.lapp} side={n % 2 ? "h" : "v"} vri={n % 2 ? 1.2 : -1.5} />;
  }
}

/** What the page rests on: the pages it was checked against, and when. */
function Kilder({ side }: { side: Side }) {
  return (
    <section aria-labelledby="kilder" className="mt-10 border-t border-dashed border-[var(--color-strek)] pt-8 md:mt-12">
      <h2 id="kilder" className="text-[15px] font-bold uppercase tracking-[0.12em] text-[var(--color-tekst-2)]">
        Kilder
      </h2>
      <p className="mt-2 max-w-[60ch] text-[15px] leading-[1.6] text-[var(--color-tekst-2)]">
        Teksten er sjekket mot disse sidene, sist {DATO}. Den erstatter ikke en undersøkelse hos tannlegen.
      </p>
      <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
        {side.kilder.map((k) => (
          <li key={k.url}>
            <a
              href={k.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-baseline gap-1.5 text-[14.5px] leading-[1.45] text-[var(--color-tekst)] underline decoration-[var(--color-strek)] decoration-1 underline-offset-4 hover:decoration-[var(--color-glomma)]"
            >
              <span>
                <span className="font-semibold text-[var(--color-glomma-deep)]">{k.utgiver}:</span> {k.navn}
              </span>
              <ArrowUpRight className="size-3.5 shrink-0 translate-y-0.5 text-[var(--color-tekst-svak)]" aria-hidden="true" />
              <span className="sr-only">(åpnes i ny fane)</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Behandlingsside({ side }: { side: Side }) {
  let lapper = 0;
  return (
    <main className="overflow-x-clip bg-[var(--color-papir)] pb-[clamp(110px,11vw,150px)] pt-[clamp(96px,12vw,140px)]">
      <div className="mx-auto w-full max-w-[1040px] px-[var(--container-px)]">
        <Smuler sider={[{ navn: "Behandlinger", href: "/behandlinger" }, { navn: side.navn }]} />
        <Ark className="mt-8">
          <header>
            <div className="flex items-center gap-4">
              <Merke className="size-14 shadow-[0_6px_18px_-10px_rgba(10,25,32,0.45)] ring-1 ring-[var(--color-strek)] md:size-[72px]" />
              <div>
                <p className="text-[15px] font-semibold text-[var(--color-glomma-deep)]">Fra tannlegene på {klinikk.navn}</p>
                <p className="text-[13.5px] text-[var(--color-tekst-svak)]">{side.lesetid}</p>
              </div>
            </div>
            <h1 className="mt-8 font-bold text-[var(--color-glomma-deep)]" style={{ fontSize: "clamp(46px, 7vw, 88px)", lineHeight: 0.95, letterSpacing: "-0.05em" }}>
              {side.navn}
            </h1>
            <p className="mt-6 max-w-[38ch] text-[20px] leading-[1.55] text-[var(--color-tekst-2)] md:text-[23px]">{side.ingress}</p>
          </header>
          <div className="mt-10 md:mt-14">
            {side.deler.map((del, i) => (
              <Visning key={del.type === "lapp" ? `lapp-${i}` : del.id} del={del} n={del.type === "lapp" ? lapper++ : 0} />
            ))}
          </div>
          <Hilsen tekst={side.slutt} />
          <Kilder side={side} />
        </Ark>
      </div>
      <Bunnlinje />
    </main>
  );
}
