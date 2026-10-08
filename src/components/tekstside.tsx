import { ArrowUpRight } from "lucide-react";
import { Smuler } from "@/components/Smuler";
import type { Kilde } from "@/data/artikler/kilder";
import { cn } from "@/lib/utils";

/* The parts of the site's plain text pages (Personvern, Helfo): the top, a
   numbered section, links, and the sources. */

export type Del = { id: string; tittel: string };

/** Crumbs, the title and the short intro. */
export function Topp({ side, tittel, children }: { side: string; tittel: React.ReactNode; children: React.ReactNode }) {
  return (
    <header>
      <Smuler side={side} />
      <h1 className="mt-6 max-w-[16ch] font-bold text-[var(--color-glomma-deep)]" style={{ fontSize: "clamp(42px, 6vw, 80px)", lineHeight: 0.95, letterSpacing: "-0.055em" }}>
        {tittel}
      </h1>
      <div className="mt-5 max-w-[58ch] text-[18px] leading-[1.6] text-[var(--color-tekst-2)] md:mt-6">{children}</div>
    </header>
  );
}

/** One numbered section of the text. */
export function Seksjon({ del, nr, children }: { del: Del; nr: number; children: React.ReactNode }) {
  return (
    <section id={del.id} aria-labelledby={`${del.id}-tittel`} className="scroll-mt-28 border-t border-dashed border-[var(--color-strek)] py-10 first:border-t-0 first:pt-0 md:py-12">
      <p className="text-[13px] font-semibold tabular-nums tracking-[0.12em] text-[var(--color-teal)]">{String(nr).padStart(2, "0")}</p>
      <h2 id={`${del.id}-tittel`} className="mt-2 text-[26px] font-bold leading-[1.15] tracking-[-0.03em] text-[var(--color-glomma-deep)] md:text-[30px]">
        {del.tittel}
      </h2>
      <div className="mt-4 max-w-[64ch] space-y-4 text-[17.5px] leading-[1.7] text-[var(--color-tekst)] [&_li]:pl-1 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:marker:text-[var(--color-stein)]">
        {children}
      </div>
    </section>
  );
}

const LENKE = "font-medium text-[var(--color-glomma)] underline decoration-1 underline-offset-4 hover:text-[var(--color-glomma-deep)]";

/** A link inside the text. Phone numbers never break across lines. */
export function Lenke({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className={cn(LENKE, href.startsWith("tel:") && "whitespace-nowrap tabular-nums")}>
      {children}
    </a>
  );
}

/** What the page rests on: the official pages it was checked against, and when. */
export function Kilder({ kilder, dato, className }: { kilder: readonly Kilde[]; dato: string; className?: string }) {
  const nar = new Date(`${dato}T12:00:00Z`).toLocaleDateString("nb-NO", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Oslo" });
  return (
    <section aria-labelledby="kilder" className={cn("border-t border-dashed border-[var(--color-strek)] pt-8", className)}>
      <h2 id="kilder" className="text-[15px] font-bold uppercase tracking-[0.12em] text-[var(--color-tekst-2)]">
        Kilder
      </h2>
      <p className="mt-2 max-w-[60ch] text-[15px] leading-[1.6] text-[var(--color-tekst-2)]">
        Teksten er sjekket mot disse sidene fra myndighetene, sist {nar}. Reglene kan endre seg; det er sidene under som gjelder.
      </p>
      <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
        {kilder.map((k) => (
          <li key={k.url}>
            <a
              href={k.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-baseline gap-1.5 text-[14.5px] leading-[1.45] text-[var(--color-tekst)] underline decoration-[var(--color-strek)] decoration-1 underline-offset-4 hover:decoration-[var(--color-glomma)]"
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

/** A link to another site, which opens in a new tab. */
export function Ut({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cn(LENKE, "inline-flex items-baseline gap-0.5")}>
      {children}
      <ArrowUpRight className="size-3.5 shrink-0 translate-y-0.5" aria-hidden="true" />
      <span className="sr-only">(åpnes i ny fane)</span>
    </a>
  );
}
