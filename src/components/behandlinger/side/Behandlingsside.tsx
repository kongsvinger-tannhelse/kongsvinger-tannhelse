import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { RAD_OG_TIPS } from "@/data/artikler/typer";
import { type Behandlingsside as Side, type Del, type Stripe } from "@/data/behandlinger";
import { SAMME_SIDE } from "@/data/behandlinger/sider";
import { Smuler, Vis } from "@/components/artikler/deler";
import { Ark, Brod, Hilsen, Sporsmal } from "@/components/artikler/lapp";
import { GulLapp } from "@/components/artikler/mellom";
import { Bunnlinje } from "@/components/behandlinger/deler";
import { GRUPPER } from "@/components/forside/behandlinger/grupper";
import { SIDETITTEL } from "@/lib/sidetittel";
import { cn } from "@/lib/utils";
import { blekkStil } from "./blekk";
import { Beslektet } from "./Beslektet";
import { MedNummer, RingOss, Spiral, Stjerner, Vask } from "./signaturer";
import { Stripen } from "./striper";
import { BTEGNINGER } from "./tegninger";
import { Natt, TITTELBILDER } from "./tittelbilder";
import s from "./side.module.css";

/**
 * A treatment's own page: a note from the clinic, like the «Råd og tips»
 * notes, with pen sketches in the margin and sticky notes between the
 * parts. The treatment itself is told as a comic strip: pen drawings that
 * draw themselves one after the other, each with a line under it; a step
 * not everyone needs has a dashed frame. Then a goodbye with one button,
 * and the sources.
 *
 * Under the intro, one line ties the page to the clinic (hosOss); the pages
 * for what can't wait open with the call card instead, and their danger
 * signs sit in a card in red pen.
 *
 * What makes each page its own, beside its drawings: its ink (blekk.ts),
 * which colours the frames, the notes and a watercolour wash behind the
 * drawings; the shape of its strip (striper.tsx); and what only it has
 * (signatur: a night sky over the top, or a calendar's binding).
 */

/** Under every comic strip: this is how it often goes, not a promise. */
const SERIE_FORBEHOLD = "Slik går det ofte for seg, men det er forskjellig fra pasient til pasient. Vi forteller deg hva som gjelder for deg.";
const KANT = "scroll-mt-28 border-t border-dashed border-[var(--color-strek)] py-10 md:py-14";

/** The pages for what can't wait: the book's «Akutt» group, each by the page it has. */
const AKUTT = new Set<string>(GRUPPER.find((g) => g.id === "akutt")?.liste.map((b) => SAMME_SIDE[b.id] ?? b.id));

/** A part of the note with its sketch in the margin. `varsel`: the danger signs, in a card in red pen. */
function MedTegning({ id, tittel, tegning, varsel = false, children }: { id: string; tittel: string; tegning: React.ReactNode; varsel?: boolean; children: React.ReactNode }) {
  const rad = "flow-root gap-x-14 md:grid md:grid-cols-[minmax(0,1fr)_200px]";
  const innhold = (
    <>
      <div className="float-right mb-2 ml-4 w-28 md:order-2 md:float-none md:m-0 md:w-full">{tegning}</div>
      <div className="space-y-4 md:order-1">
        <Sporsmal className={cn(varsel && "text-[#A3301F]")}>{tittel}</Sporsmal>
        {children}
      </div>
    </>
  );
  return varsel ? (
    <Vis as="section" id={id} className={KANT}>
      <div className={cn(rad, s.varsel)}>{innhold}</div>
    </Vis>
  ) : (
    <Vis as="section" id={id} className={cn(KANT, rad)}>
      {innhold}
    </Vis>
  );
}

/** A drawing, on a wash of the page's ink when it has one. */
function Tegning({ id, vask, seed, className, forsink, utenfor = "-inset-3" }: { id: keyof typeof BTEGNINGER; vask: boolean; seed: number; className?: string; forsink?: number; utenfor?: string }) {
  const T = BTEGNINGER[id];
  return (
    <div className={cn("relative", className)}>
      {vask && <Vask seed={seed} className={utenfor} />}
      <T className="relative w-full" forsink={forsink} />
    </div>
  );
}

/** One part of the note. `n`: a sticky note's place among the notes; `i`: the part's place, so each wash has its own shape. */
function Visning({ del, n, i, vask, stripe }: { del: Del; n: number; i: number; vask: boolean; stripe?: Stripe }) {
  switch (del.type) {
    case "tekst":
      return (
        <MedTegning id={del.id} tittel={del.tittel} varsel={del.varsel} tegning={<Tegning id={del.tegning} vask={vask && !del.varsel} seed={i * 7 + 3} />}>
          {del.avsnitt.map((a) => (
            <Brod key={a}>{del.varsel ? <MedNummer tekst={a} /> : a}</Brod>
          ))}
          {del.lenke && (
            <p>
              <Link href={`${RAD_OG_TIPS.sti}/${del.lenke.slug}`} className="group text-[17px] font-semibold leading-[1.5] text-[var(--color-glomma)] underline underline-offset-4">
                {del.lenke.tekst}
                <ArrowRight className="ml-1.5 inline size-4 align-[-0.15em] transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </p>
          )}
        </MedTegning>
      );

    case "tegn":
      return (
        <Vis as="section" id={del.id} className={KANT}>
          <Sporsmal>{del.tittel}</Sporsmal>
          {del.intro && <Brod className="mt-4">{del.intro}</Brod>}
          <ul className="mt-7 grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {del.punkter.map((p, j) => (
              <li key={p.tekst} className="flex items-center gap-4">
                <Tegning id={p.tegning} vask={vask} seed={i * 7 + j + 20} className="w-16 shrink-0 md:w-[72px]" forsink={j * 0.15} utenfor="-inset-1.5" />
                <span className="text-[18px] leading-[1.45] text-[var(--color-tekst)]">{p.tekst}</span>
              </li>
            ))}
          </ul>
          {del.etter && <Brod className="mt-6">{del.etter}</Brod>}
        </Vis>
      );

    case "serie":
      return (
        <Vis as="section" id={del.id} className={KANT}>
          <Sporsmal>{del.tittel}</Sporsmal>
          <Stripen form={stripe} ruter={del.ruter} />
          {del.etter && <Brod className="mt-8">{del.etter}</Brod>}
          <p className="mt-5 text-[16px] italic leading-[1.6] text-[var(--color-tekst-2)]">{SERIE_FORBEHOLD}</p>
        </Vis>
      );

    case "lapp":
      return <GulLapp lapp={del.lapp} side={n % 2 ? "h" : "v"} vri={n % 2 ? 1.2 : -1.5} />;
  }
}

export function Behandlingsside({ side }: { side: Side }) {
  const Tittelbilde = TITTELBILDER[side.tittelbilde];
  const natt = side.signatur === "natt";
  const vask = side.blekk !== undefined;
  const akutt = AKUTT.has(side.slug);
  let lapper = 0;

  return (
    <main className="overflow-x-clip bg-[var(--color-papir)] pb-[clamp(110px,11vw,150px)] pt-[clamp(96px,12vw,140px)]">
      <div className="mx-auto w-full max-w-[1040px] px-[var(--container-px)]" style={blekkStil(side.blekk)}>
        <Smuler sider={[{ navn: "Behandlinger", href: "/behandlinger" }, { navn: side.navn }]} />
        <Ark className="mt-8">
          {side.signatur === "spiral" && <Spiral />}
          {/* The top across the sheet's whole width: the words from the left, the
              drawing beside them (under them on a phone), so the page gets shorter. */}
          <Vis as="header" margin="0px" className={cn("md:grid md:grid-cols-[minmax(0,1fr)_minmax(200px,280px)] md:items-center md:gap-12", natt && cn(s.natt, s.nattSide))}>
            {natt && <Stjerner />}
            <div className="relative">
              <h1 className={cn("text-pretty font-bold", natt ? "text-[#FFF8E7]" : "text-[var(--color-glomma-deep)]")} style={SIDETITTEL}>
                {side.navn}
              </h1>
              <p className={cn("mt-4 text-pretty text-[18px] leading-[1.55] md:mt-5 md:text-[20px]", natt ? "text-[#FFF8E7]/80" : "text-[var(--color-tekst-2)]")}>{side.ingress}</p>
              {side.hosOss && (
                <p className={cn("mt-3 text-pretty text-[18px] font-semibold leading-[1.5] md:text-[20px]", natt ? "text-[#FFF8E7]" : "text-[var(--color-glomma-deep)]")}>{side.hosOss}</p>
              )}
              {akutt && (
                <div className="mt-7">
                  <RingOss />
                </div>
              )}
            </div>
            <div className="relative mx-auto mt-8 w-full max-w-[260px] md:mx-0 md:mt-0 md:max-w-none">
              {vask && !natt && <Vask seed={5} className="-inset-x-6 -inset-y-4" />}
              {natt ? <Natt paaMork className="relative w-full" /> : <Tittelbilde className="relative w-full" />}
            </div>
          </Vis>
          <div className="mt-10 md:mt-14">
            {side.deler.map((del, i) => (
              <Visning key={del.type === "lapp" ? `lapp-${i}` : del.id} del={del} n={del.type === "lapp" ? lapper++ : 0} i={i} vask={vask} stripe={side.stripe} />
            ))}
          </div>
          <Beslektet slug={side.slug} />
          <Hilsen tekst={side.slutt} apent={akutt} />
          {/* No list of sources here: these are the clinic's own pages. The
              sources stay in the data (and in the structured data for search
              engines); the Råd og tips articles still show theirs. */}
        </Ark>
      </div>
      <Bunnlinje />
    </main>
  );
}
