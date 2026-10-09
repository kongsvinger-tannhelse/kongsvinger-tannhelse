import { ArrowUpRight } from "lucide-react";
import { Smuler } from "@/components/Smuler";
import { SIDETITTEL } from "@/lib/sidetittel";
import { cn } from "@/lib/utils";

/* The parts of the site's plain text pages (Personvern): the top, and links
   in the text. */

/** Crumbs, the title and the short intro, centred; the text under them starts from the left. */
export function Topp({ side, tittel, children }: { side: string; tittel: React.ReactNode; children: React.ReactNode }) {
  return (
    <header className="text-center">
      <Smuler side={side} />
      <h1 className="mx-auto mt-6 max-w-[22ch] text-balance font-bold text-[var(--color-glomma-deep)]" style={SIDETITTEL}>
        {tittel}
      </h1>
      <div className="mx-auto mt-5 max-w-[58ch] text-balance text-[18px] leading-[1.6] text-[var(--color-tekst-2)] md:mt-6">{children}</div>
    </header>
  );
}

const LENKE = "font-medium text-[var(--color-glomma)] underline decoration-1 underline-offset-4 hover:text-[var(--color-glomma-deep)]";

/** A link inside the text. Phone numbers never break across lines. */
export function Lenke({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className={cn(LENKE, href.startsWith("tel:") && "whitespace-nowrap")}>
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
