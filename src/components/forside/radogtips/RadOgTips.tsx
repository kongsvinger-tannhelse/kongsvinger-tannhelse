import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ARTIKLER, RAD_OG_TIPS } from "@/data/artikler";
import { Vis } from "@/components/artikler/deler";
import { TEGNINGER } from "@/components/artikler/tegninger";

/* A band on the front page: three of the notes from «Råd og tips», each on
   its own sheet with its pen sketch on top, and a way to all of them. Wide
   screens show the three large, side by side; phones show them smaller in a
   row that scrolls sideways, each one snapping into place with the next one
   peeking in at the edge. */

const UTVALG = ["vondt-i-tanna", "redd-for-tannlegen", "slik-pusser-du-tennene"];

export function RadOgTips() {
  const artikler = UTVALG.map((slug) => ARTIKLER.find((a) => a.slug === slug)!).filter(Boolean);
  return (
    <section id="rad-og-tips" aria-labelledby="rad-og-tips-tittel" className="bg-[var(--color-papir)] pt-[clamp(72px,9vw,128px)]">
      <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-px)]">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <div className="max-w-[560px]">
            <h2 id="rad-og-tips-tittel" className="seksjonstittel font-bold text-[var(--color-glomma-deep)]">
              {RAD_OG_TIPS.navn}
            </h2>
            <p className="mt-3 text-[17.5px] leading-[1.6] text-[var(--color-tekst-2)]">Korte, enkle tekster om vanlige ting i munnen, skrevet så alle kan forstå dem.</p>
          </div>
          <Link href={RAD_OG_TIPS.sti} className="group inline-flex items-center gap-2 text-[16px] font-semibold text-[var(--color-glomma-deep)] underline-offset-4 hover:underline">
            Se alle
            <ArrowRight className="size-4 text-[var(--color-teal)] transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        {/* phones: the row runs to the screen's edges and scrolls under the finger
            (the lift on hover is for wide screens; the row would clip its shadow) */}
        <ul className="-mx-[var(--container-px)] mt-8 flex snap-x snap-mandatory scroll-px-[var(--container-px)] gap-3 overflow-x-auto px-[var(--container-px)] pb-3 pt-1 [scrollbar-width:none] md:mx-0 md:mt-10 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:p-0 [&::-webkit-scrollbar]:hidden">
          {artikler.map((a, i) => {
            const T = TEGNINGER[a.tegning];
            return (
              <Vis as="li" key={a.slug} className="w-[74%] max-w-[300px] shrink-0 snap-start md:w-auto md:max-w-none">
                <Link
                  href={`${RAD_OG_TIPS.sti}/${a.slug}`}
                  className="group flex h-full flex-col rounded-[22px] bg-[#FFFDF8] p-5 ring-1 ring-[var(--color-strek)] transition-[box-shadow,translate] duration-300 md:rounded-[28px] md:hover:-translate-y-1 md:hover:shadow-[0_30px_50px_-34px_rgba(10,25,32,0.5)] md:p-8"
                >
                  <T strek className="w-16 md:w-36" forsink={i * 0.2} />
                  <span className="mt-3 block text-[18px] font-bold leading-[1.2] tracking-[-0.015em] text-[var(--color-glomma-deep)] md:mt-6 md:text-[24px]">{a.tittel}</span>
                  <span className="mt-auto flex items-center justify-between gap-4 pt-4 md:pt-6">
                    <span className="text-[14px] text-[var(--color-tekst-svak)] md:text-[15px]">{a.lesetid}</span>
                    <ArrowRight className="size-5 shrink-0 md:size-6 text-[var(--color-teal)] transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </Vis>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
