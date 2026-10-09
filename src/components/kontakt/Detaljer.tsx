import { klinikk } from "@/data/klinikk";
import { cn } from "@/lib/utils";
import { KART_KREDITT } from "./kartdata";

/*
 * The words of the «Kontakt» section, apart from the form and the map: the
 * old site's line, and phone, e-mail and hours in one line.
 * The facts all come from klinikk.ts.
 */

/** The old site's own words about being there for everything. */
export const INNLEDNING = "Vi står klare til å hjelpe deg med alt fra rutinemessige undersøkelser til akutte behov.";

const { apningstider: tid } = klinikk;

const MERKE = "block text-[12px] font-medium uppercase tracking-[0.12em] text-[var(--color-tekst-svak)]";
const VERDI = "mt-2 block text-[18px] font-medium leading-[1.45] tracking-[-0.01em] text-[var(--color-glomma-deep)]";

/** Phone, e-mail and opening hours side by side, all at one size, between hairlines. */
export function Kontaktlinje({ className }: { className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 gap-x-10 gap-y-6 border-y border-[var(--color-strek)] py-7 sm:grid-cols-2 md:grid-cols-3", className)}>
      <a href={klinikk.telefon.lenke} className="group block">
        <span className={MERKE}>Ring oss</span>
        <span className={cn(VERDI, "tabular-nums transition-colors group-hover:text-[var(--color-glomma)]")}>{klinikk.telefon.visning}</span>
      </a>
      <a href={`mailto:${klinikk.epost}`} className="group block">
        <span className={MERKE}>E-post</span>
        <span className={cn(VERDI, "break-all transition-colors group-hover:text-[var(--color-glomma)] sm:break-normal")}>{klinikk.epost}</span>
      </a>
      <div className="sm:col-span-2 md:col-span-1">
        <p className={MERKE}>Åpningstider</p>
        <p className={cn(VERDI, "tabular-nums")}>
          {tid.dager} {tid.fra}–{tid.til}
          <span className="block text-[var(--color-tekst-2)]">{tid.stengt} stengt</span>
        </p>
      </div>
    </div>
  );
}

/** The credit OpenStreetMap asks for, under the map. */
export function Kartkreditt({ className }: { className?: string }) {
  return (
    <p className={cn("text-[11.5px] text-[var(--color-tekst-svak)]", className)}>
      <a href={KART_KREDITT.href} target="_blank" rel="noopener noreferrer" className="underline-offset-2 hover:underline">
        {KART_KREDITT.tekst}
      </a>
    </p>
  );
}
