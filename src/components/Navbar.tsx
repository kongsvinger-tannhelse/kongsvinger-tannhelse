"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { klinikk } from "@/data/klinikk";
import { cn } from "@/lib/utils";

const LENKER = [
  { href: "/behandlinger", tekst: "Behandlinger" },
  { href: "/om-oss", tekst: "Om oss" },
  { href: "/rad-og-tips", tekst: "Råd og tips" },
  { href: "/kontakt", tekst: "Kontakt" },
];

/**
 * Floats over the hero with no background of its own (on the front page a
 * frosted white, so the links read where the hero's photo runs up under
 * them); once the page has moved, it settles onto a sheet of paper with a
 * hairline under it.
 * On the front page (`forside`) the hero's own big name sits right below, so
 * while the bar floats over it only the tooth shows; the name comes in once
 * the page moves. Screen readers get the name all along.
 */
export function Navbar({ forside = false }: { forside?: boolean }) {
  const [flyttet, setFlyttet] = useState(false);
  const [apen, setApen] = useState(false);

  useEffect(() => {
    const sjekk = () => setFlyttet(window.scrollY > 24);
    sjekk();
    window.addEventListener("scroll", sjekk, { passive: true });
    return () => window.removeEventListener("scroll", sjekk);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500",
        flyttet || apen
          ? "bg-[color-mix(in_srgb,var(--color-papir)_88%,transparent)] shadow-[0_1px_0_var(--color-strek)] backdrop-blur-md"
          : forside
            ? "bg-white/85 backdrop-blur-md"
            : "bg-transparent"
      )}
    >
      <nav
        aria-label="Hovedmeny"
        className="mx-auto flex h-[72px] w-full max-w-[var(--container-max)] items-center justify-between gap-6 px-[var(--container-px)]"
      >
        <Link href="/" className="flex items-center gap-3 text-[var(--color-tekst)]" onClick={() => setApen(false)}>
          <Image src="/images/merke.png" alt="" width={36} height={36} className="size-9 rounded-[9px]" priority />
          <span
            className={cn(
              "leading-[1.05] transition-[opacity,transform] duration-500",
              forside && !flyttet && !apen && "-translate-x-1 opacity-0"
            )}
          >
            <span className="block whitespace-nowrap text-[16px] font-semibold tracking-[-0.02em]">{klinikk.navn}</span>
            <span className="block text-[12px] text-[var(--color-tekst-2)]">{klinikk.undertittel}</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {LENKER.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="whitespace-nowrap text-[14px] font-medium text-[var(--color-tekst)] underline-offset-[6px] decoration-1 hover:underline"
              >
                {l.tekst}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/kontakt"
            className="hidden whitespace-nowrap rounded-full bg-[var(--color-glomma)] px-5 py-2.5 text-[14px] font-semibold text-[var(--color-papir)] transition-colors duration-300 hover:bg-[var(--color-glomma-deep)] sm:inline-flex"
          >
            Be om time
          </Link>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full text-[var(--color-tekst)] lg:hidden"
            aria-expanded={apen}
            aria-controls="mobilmeny"
            aria-label={apen ? "Lukk meny" : "Åpne meny"}
            onClick={() => setApen((v) => !v)}
          >
            {apen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {apen && (
        <div id="mobilmeny" className="border-t border-[var(--color-strek)] px-[var(--container-px)] pb-6 pt-2 lg:hidden">
          <ul className="flex flex-col">
            {LENKER.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setApen(false)}
                  className="block border-b border-[var(--color-strek)] py-4 text-[20px] font-medium tracking-[-0.02em]"
                >
                  {l.tekst}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex gap-2">
            <Link href="/kontakt" className="rounded-full bg-[var(--color-glomma)] px-5 py-3 text-[14px] font-semibold text-[var(--color-papir)]">
              Be om time
            </Link>
            <a href={klinikk.telefon.lenke} className="rounded-full border border-[var(--color-strek)] px-5 py-3 text-[14px] font-medium">
              {klinikk.telefon.visning}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
