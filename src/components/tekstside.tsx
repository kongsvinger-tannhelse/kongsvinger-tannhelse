import { ArrowUpRight } from "lucide-react";
import { Smuler } from "@/components/Smuler";
import { cn } from "@/lib/utils";

/* The parts of the site's plain text pages (Personvern, Helfo): the top, the
   list of what the page holds, a numbered section, and an outside link. */

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

/** What the page holds, beside the text on wide screens; it stays in view while you read. */
export function Innhold({ deler, className }: { deler: readonly Del[]; className?: string }) {
  return (
    <nav aria-label="På denne siden" className={cn("hidden lg:block", className)}>
      <div className="sticky top-28">
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--color-tekst-svak)]">På denne siden</p>
        <ol className="mt-4 space-y-2.5 border-l border-[var(--color-strek)]">
          {deler.map((d, i) => (
            <li key={d.id}>
              <a
                href={`#${d.id}`}
                className="-ml-px flex gap-3 border-l border-transparent py-0.5 pl-4 text-[14px] leading-[1.4] text-[var(--color-tekst-2)] transition-colors hover:border-[var(--color-glomma)] hover:text-[var(--color-glomma-deep)]"
              >
                <span className="w-4 shrink-0 tabular-nums text-[var(--color-tekst-svak)]">{i + 1}</span>
                {d.tittel}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
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
