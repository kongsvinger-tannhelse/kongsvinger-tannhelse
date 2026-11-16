import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Vis } from "@/components/artikler/deler";
import { Sporsmal } from "@/components/artikler/lapp";
import { finnArtikkel } from "@/data/artikler";
import { RAD_OG_TIPS } from "@/data/artikler/typer";
import { artiklerOm } from "@/data/artikler/tema";
import { BESLEKTET } from "@/data/behandlinger/beslektet";
import { finnBehandlingsside, sideSti, type Behandlingsside } from "@/data/behandlinger";

export type Lenke = { href: string; navn: string };

/** «Les også»: plain links in the page's own link style, the target's name as the text. */
export function LesOgsa({ lenker }: { lenker: Lenke[] }) {
  if (lenker.length === 0) return null;
  return (
    <Vis as="section" id="les-ogsa" className="scroll-mt-28 border-t border-dashed border-[var(--color-strek)] pt-10 md:pt-14">
      <Sporsmal>Les også</Sporsmal>
      <ul className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-9 sm:gap-y-3">
        {lenker.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="group text-[17px] font-semibold leading-[1.5] text-[var(--color-glomma)] underline underline-offset-4">
              {l.navn}
              <ArrowRight className="ml-1.5 inline size-4 align-[-0.15em] transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </Vis>
  );
}

/**
 * «Les også», after the last part of a treatment's note: three other
 * treatment pages that go with it (data/behandlinger/beslektet.ts), then the
 * Råd og tips article about it (data/artikler/tema.ts), unless a part of the
 * page already links to that article. The page says nothing new about either.
 */
export function Beslektet({ side }: { side: Behandlingsside }) {
  const mal: readonly string[] = (BESLEKTET as Record<string, readonly string[]>)[side.slug] ?? [];
  const sider = mal.flatMap((s) => {
    const b = finnBehandlingsside(s);
    return b ? [{ href: sideSti(b.slug), navn: b.navn }] : [];
  });
  const lenketFraFor = new Set(side.deler.flatMap((d) => (d.type === "tekst" && d.lenke ? [d.lenke.slug] : [])));
  const artikler = artiklerOm(side.slug)
    .filter((a) => !lenketFraFor.has(a))
    .flatMap((a) => {
      const artikkel = finnArtikkel(a);
      return artikkel ? [{ href: `${RAD_OG_TIPS.sti}/${artikkel.slug}`, navn: artikkel.tittel }] : [];
    });
  return <LesOgsa lenker={[...sider, ...artikler]} />;
}
