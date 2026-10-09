import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { ARTIKLER, RAD_OG_TIPS } from "@/data/artikler";
import { Vis } from "@/components/artikler/deler";
import { TEGNINGER } from "@/components/artikler/tegninger";
import { cn } from "@/lib/utils";

/* A band on the front page, in the river's deep slate under the fortress
   hill: three of the notes from «Råd og tips», taped up a little askew like
   notes on the board in a waiting room, each with its pen sketch drawing
   itself. The middle one is the articles' own yellow sticky note. A hand over
   a note straightens it. Wide screens show the three side by side; phones
   show them smaller in a row that scrolls sideways, each one snapping into
   place with the next one peeking in at the edge. */

const UTVALG = ["vondt-i-tanna", "redd-for-tannlegen", "slik-pusser-du-tennene"];

/** How each note hangs: a small tilt, where the tape sits, and its paper. */
const HENG = [
  { vri: -1.6, tape: "left-[30%] rotate-[-4deg]", gul: false },
  { vri: 1.2, tape: "left-[55%] rotate-[3deg]", gul: true },
  { vri: -0.7, tape: "left-[40%] rotate-[-2deg]", gul: false },
] as const;

export function RadOgTips() {
  const artikler = UTVALG.map((slug) => ARTIKLER.find((a) => a.slug === slug)!).filter(Boolean);
  return (
    <section id="rad-og-tips" aria-labelledby="rad-og-tips-tittel" className="bg-[var(--color-glomma-deep)] pb-[clamp(72px,9vw,128px)] pt-[clamp(64px,8vw,112px)]">
      <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-px)]">
        <h2 id="rad-og-tips-tittel" className="sr-only">
          {RAD_OG_TIPS.navn}
        </h2>
        <p className="seksjonsinngang text-[var(--color-papir)]">Her finner du artikler som hjelper deg med alt fra generell munnhelse til Helfo.</p>

        {/* phones: the row runs to the screen's edges and scrolls under the finger */}
        <ul className="-mx-[var(--container-px)] mt-10 flex snap-x snap-mandatory scroll-px-[var(--container-px)] gap-4 overflow-x-auto px-[var(--container-px)] pb-6 pt-4 [scrollbar-width:none] md:mx-0 md:mt-14 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible md:p-0 [&::-webkit-scrollbar]:hidden">
          {artikler.map((a, i) => {
            const T = TEGNINGER[a.tegning];
            const h = HENG[i % HENG.length];
            return (
              <Vis as="li" key={a.slug} className="w-[74%] max-w-[300px] shrink-0 snap-start md:w-auto md:max-w-none">
                <Link
                  href={`${RAD_OG_TIPS.sti}/${a.slug}`}
                  style={{ "--vri": `${h.vri}deg` } as CSSProperties}
                  className={cn(
                    "group relative flex h-full flex-col rounded-[4px] p-5 shadow-[0_22px_34px_-20px_rgba(0,0,0,0.55),0_2px_0_rgba(0,0,0,0.06)] transition-[rotate,translate,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [rotate:var(--vri)] hover:[rotate:0deg] hover:-translate-y-1 hover:shadow-[0_32px_44px_-24px_rgba(0,0,0,0.6)] focus-visible:[rotate:0deg] motion-reduce:transition-none md:p-8",
                    h.gul ? "bg-[var(--color-lapp)]" : "bg-[#FFFDF8]"
                  )}
                >
                  {/* the tape */}
                  <span aria-hidden="true" className={cn("absolute -top-3 h-6 w-20 -translate-x-1/2 bg-[rgba(246,241,222,0.82)] shadow-[0_1px_2px_rgba(0,0,0,0.18)] md:w-24", h.tape)} />
                  <T strek className="w-16 md:w-32" forsink={i * 0.2} />
                  <span className={cn("mt-3 block text-[18px] font-bold leading-[1.2] tracking-[-0.015em] md:mt-6 md:text-[24px]", h.gul ? "text-[var(--color-lapp-tekst)]" : "text-[var(--color-glomma-deep)]")}>{a.tittel}</span>
                  <span className={cn("mt-2 hidden text-[16px] leading-[1.55] md:block", h.gul ? "text-[var(--color-lapp-blekk)]" : "text-[var(--color-tekst-2)]")}>{a.ingress}</span>
                  <span className="mt-auto flex justify-end pt-4 md:pt-6">
                    <ArrowRight className={cn("size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 md:size-6", h.gul ? "text-[var(--color-lapp-blekk)]" : "text-[var(--color-teal)]")} aria-hidden="true" />
                  </span>
                </Link>
              </Vis>
            );
          })}
        </ul>

        <Link href={RAD_OG_TIPS.sti} className="group mt-8 inline-flex items-center gap-2 text-[16px] font-semibold text-[var(--color-papir)] underline decoration-[rgba(226,241,241,0.35)] underline-offset-[5px] transition-colors hover:decoration-current md:mt-12">
          Se alle artiklene
          <ArrowRight className="size-4 text-[var(--color-lapp)] transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
