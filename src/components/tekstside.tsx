import { ArrowUpRight } from "lucide-react";
import { Smuler } from "@/components/Smuler";
import { SIDETITTEL } from "@/lib/sidetittel";
import { cn } from "@/lib/utils";

/* The parts of the site's plain text pages (Personvern, Vilkår): the top,
   the sheet with the text, and links in the text. */

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

/** The page around the text: the top over a sheet of paper, one paragraph after another with a dashed line between. */
export function Tekstside({ side, tittel, ingress, avsnitt }: { side: string; tittel: string; ingress: React.ReactNode; avsnitt: { id: string; tekst: React.ReactNode }[] }) {
  return (
    <main className="overflow-x-clip bg-[var(--color-papir)]">
      <div className="mx-auto w-full max-w-[960px] px-[var(--container-px)] pb-[clamp(104px,11vw,150px)] pt-[clamp(104px,12vw,150px)]">
        <Topp side={side} tittel={tittel}>
          {ingress}
        </Topp>

        <div className="mx-auto mt-10 max-w-[760px] rounded-[28px] bg-[#FFFDF8] px-[clamp(22px,5vw,56px)] py-[clamp(14px,2.5vw,28px)] shadow-[0_40px_70px_-50px_rgba(10,25,32,0.5)] ring-1 ring-[var(--color-strek)] md:mt-14">
          {avsnitt.map((a) => (
            <p key={a.id} className="border-b border-dashed border-[var(--color-strek)] py-6 text-[17px] leading-[1.65] text-[var(--color-tekst)] last:border-b-0">
              {a.tekst}
            </p>
          ))}
        </div>
      </div>
    </main>
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
