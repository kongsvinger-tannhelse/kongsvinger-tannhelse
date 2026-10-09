import Image from "next/image";
import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { klinikk } from "@/data/klinikk";
import { cn } from "@/lib/utils";

/* What the footer says, in pieces: light text on the river at night, the
   headings in white. All facts from klinikk.ts. */

const { adresse, telefon, epost, apningstider: tid } = klinikk;

const SIDER = [
  { href: "/behandlinger", tekst: "Behandlinger" },
  { href: "/om-oss", tekst: "Om oss" },
  { href: "/rad-og-tips", tekst: "Råd og tips" },
  { href: "/rad-og-tips/hva-dekker-helfo", tekst: "Helfo" },
  { href: "/kontakt", tekst: "Kontakt" },
];

/** A plain link out to the map; nothing is embedded. */
const KARTLENKE = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${adresse.gate}, ${adresse.postnummer} ${adresse.sted}`)}`;

const tekst = "text-[16px] leading-[1.7] text-[var(--color-tekst-lys-2)]";
const lenke = "text-[var(--color-tekst-lys)] transition-colors duration-300 hover:text-white";
const etikett = "mb-2 text-[16px] font-semibold tracking-[-0.01em] text-white";

/** The clinic's name with its mark, and the organisation number under it. */
export function Merke() {
  return (
    <div className="shrink-0">
      <Link href="/" className="inline-flex items-center gap-3">
        <Image src="/images/merke.png" alt="" width={44} height={44} className="size-11 rounded-[10px]" />
        <span className="text-left leading-[1.1]">
          <span className="block text-[20px] font-semibold tracking-[-0.02em] text-[var(--color-papir)]">{klinikk.navn}</span>
          <span className="block text-[14px] text-[var(--color-tekst-lys-2)]">{klinikk.undertittel}</span>
        </span>
      </Link>
      <p className="mt-4 text-[14px] text-[var(--color-tekst-lys-2)]">Org.nr. {klinikk.orgnr}</p>
    </div>
  );
}

/** Phone and e-mail. On phones it takes the full width, so the address stays on one line. */
export function Kontakt() {
  // its own row on phones and tablets: the e-mail address is wider than a quarter of a tablet
  return (
    <div className="col-span-2 md:col-span-3">
      <h3 className={etikett}>Kontakt</h3>
      <p className="text-[16px] leading-[1.7]">
        <a href={telefon.lenke} className={lenke}>
          {telefon.visning}
        </a>
        <br />
        <a href={`mailto:${epost}`} className={lenke}>
          {epost}
        </a>
      </p>
    </div>
  );
}

export function Besok() {
  return (
    <div>
      <h3 className={etikett}>Besøk oss</h3>
      <p className={tekst}>
        {adresse.gate}
        <br />
        {adresse.postnummer} {adresse.sted}
      </p>
      <a href={KARTLENKE} target="_blank" rel="noopener noreferrer" className={cn("mt-1 inline-flex items-center gap-1 text-[14px] font-medium underline decoration-white/30 decoration-1 underline-offset-[5px]", lenke)}>
        Vis i kart <ArrowUpRight className="size-3.5" aria-hidden="true" />
        <span className="sr-only">(åpner Google Maps)</span>
      </a>
    </div>
  );
}

export function Tider() {
  return (
    <div>
      <h3 className={etikett}>Åpningstider</h3>
      <p className={tekst}>
        {tid.dager} <span className="whitespace-nowrap">{tid.fra}–{tid.til}</span>
        <br />
        {tid.stengt} stengt
      </p>
    </div>
  );
}

export function Sider() {
  return (
    <nav aria-label="Bunnmeny">
      <h3 className={etikett}>Sider</h3>
      <ul className="space-y-1 text-[16px] leading-[1.7]">
        {SIDER.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className={lenke}>
              {l.tekst}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/**
 * The bottom line: copyright and the privacy page, a credit, back to the top.
 * The hero is our own drawing and needs no credit. The fortress drawing in
 * «Om oss» is drawn over a CC BY 2.0 photo, whose licence asks for one.
 */
export function Bunnlinje({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-3 border-t border-white/12 pt-6 text-[12px] leading-[1.6] text-white/55 md:flex-row md:items-start md:justify-between md:gap-10", className)}>
      <p className="shrink-0">
        © {new Date().getFullYear()} {klinikk.navn} ·{" "}
        <Link href="/personvern" className="underline decoration-1 underline-offset-2 hover:text-white">
          Personvern
        </Link>
      </p>
      <p className="max-w-[70ch] md:text-center">Festningen er tegnet etter et bilde fra Kongsvinger kommune (CC BY 2.0).</p>
      <a href="#" className="inline-flex shrink-0 items-center gap-1.5 font-medium text-white/75 transition-colors hover:text-white">
        Til toppen <ArrowUp className="size-3.5" aria-hidden="true" />
      </a>
    </div>
  );
}
