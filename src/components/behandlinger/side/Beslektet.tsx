import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Vis } from "@/components/artikler/deler";
import { Sporsmal } from "@/components/artikler/lapp";
import { BESLEKTET } from "@/data/behandlinger/beslektet";
import { finnBehandlingsside, sideSti } from "@/data/behandlinger";

/**
 * «Les også», after the last part of a treatment's note: three other
 * treatment pages that go with it (data/behandlinger/beslektet.ts). Plain
 * links in the page's own link style, the target's name as the text, so
 * the page says nothing new about the treatments.
 */
export function Beslektet({ slug }: { slug: string }) {
  const mal: readonly string[] = (BESLEKTET as Record<string, readonly string[]>)[slug] ?? [];
  const sider = mal.flatMap((s) => {
    const side = finnBehandlingsside(s);
    return side ? [side] : [];
  });
  return (
    <Vis as="section" id="les-ogsa" className="scroll-mt-28 border-t border-dashed border-[var(--color-strek)] pt-10 md:pt-14">
      <Sporsmal>Les også</Sporsmal>
      <ul className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-9 sm:gap-y-3">
        {sider.map((side) => (
          <li key={side.slug}>
            <Link href={sideSti(side.slug)} className="group text-[17px] font-semibold leading-[1.5] text-[var(--color-glomma)] underline underline-offset-4">
              {side.navn}
              <ArrowRight className="ml-1.5 inline size-4 align-[-0.15em] transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </Vis>
  );
}
