import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ARTIKLER, RAD_OG_TIPS } from "@/data/artikler";
import { Vis } from "@/components/artikler/deler";
import { TEGNINGER } from "@/components/artikler/tegninger";

/* A small band on the front page: three of the notes from «Råd og tips»,
   each on its own sheet with its pen sketch, and a way to all of them. */

const UTVALG = ["vondt-i-tanna", "redd-for-tannlegen", "slik-pusser-du-tennene"];

export function RadOgTips() {
  const artikler = UTVALG.map((slug) => ARTIKLER.find((a) => a.slug === slug)!).filter(Boolean);
  return (
    <section id="rad-og-tips" aria-labelledby="rad-og-tips-tittel" className="bg-[var(--color-papir)] pt-[clamp(72px,9vw,128px)]">
      <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-px)]">
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <div className="max-w-[560px]">
            <h2 id="rad-og-tips-tittel" className="font-bold text-[var(--color-glomma-deep)]" style={{ fontSize: "clamp(32px, 4vw, 52px)", lineHeight: 1, letterSpacing: "-0.045em" }}>
              {RAD_OG_TIPS.navn}
            </h2>
            <p className="mt-3 text-[17.5px] leading-[1.6] text-[var(--color-tekst-2)]">Korte, enkle tekster om vanlige ting i munnen, skrevet så alle kan forstå dem.</p>
          </div>
          <Link href={RAD_OG_TIPS.sti} className="group inline-flex items-center gap-2 text-[16px] font-semibold text-[var(--color-glomma-deep)] underline-offset-4 hover:underline">
            Se alle {ARTIKLER.length}
            <ArrowRight className="size-4 text-[var(--color-teal)] transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>

        <ul className="mt-8 grid gap-4 md:mt-10 md:grid-cols-3">
          {artikler.map((a, i) => {
            const T = TEGNINGER[a.tegning];
            return (
              <Vis as="li" key={a.slug}>
                <Link
                  href={`${RAD_OG_TIPS.sti}/${a.slug}`}
                  className="group flex h-full items-center gap-4 rounded-[22px] bg-[#FBF8F1] p-4 pr-5 ring-1 ring-[var(--color-strek)] transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_40px_-30px_rgba(10,25,32,0.5)] md:p-5"
                >
                  <T strek className="w-16 shrink-0 md:w-20" forsink={i * 0.2} />
                  <span className="min-w-0 flex-1">
                    <span className="block text-[18px] font-bold leading-[1.25] tracking-[-0.01em] text-[var(--color-glomma-deep)]">{a.tittel}</span>
                    <span className="mt-1 block text-[14px] text-[var(--color-tekst-svak)]">{a.lesetid}</span>
                  </span>
                  <ArrowRight className="size-5 shrink-0 text-[var(--color-teal)] transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </Vis>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
