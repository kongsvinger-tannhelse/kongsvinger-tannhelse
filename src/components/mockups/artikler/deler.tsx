"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { useInView, type UseInViewOptions } from "framer-motion";
import { CalendarDays, Phone } from "lucide-react";
import { klinikk } from "@/data/klinikk";
import { cn } from "@/lib/utils";
import { FORFATTER } from "./forfatter";

/* The parts the three drafts share: the "seen" switch, the crumbs, the
   author's face, the two buttons and the A/B/C switch. */

/** Marks its children seen the first time they come into view. Server and first render say "nei", so it hydrates. */
export function Vis({
  as: Tag = "div",
  className,
  style,
  children,
  margin = "0px 0px -14% 0px",
  id,
}: {
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  margin?: UseInViewOptions["margin"];
  id?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const vist = useInView(ref, { once: true, margin });
  return (
    <Tag ref={ref} id={id} data-vis={vist ? "ja" : "nei"} className={className} style={style}>
      {children}
    </Tag>
  );
}

export function Smuler({ className }: { className?: string }) {
  return (
    <nav aria-label="Brødsmuler" className={cn("text-[13px] text-[var(--color-tekst-svak)]", className)}>
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="underline-offset-4 hover:text-[var(--color-tekst)] hover:underline">
            Forside
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>Råd og tips</li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="text-[var(--color-tekst-2)]">
          Tannverk
        </li>
      </ol>
    </nav>
  );
}

/** The author's face in a circle. */
export function Ansikt({ className, sizes = "96px" }: { className?: string; sizes?: string }) {
  return (
    <span className={cn("relative block shrink-0 overflow-hidden rounded-full bg-[var(--color-kalk)]", className)}>
      <Image
        src={FORFATTER.bilde}
        alt=""
        fill
        sizes={sizes}
        className="object-cover"
        style={{ objectPosition: FORFATTER.fokus, transform: `scale(${FORFATTER.zoom})`, transformOrigin: FORFATTER.fokus }}
      />
    </span>
  );
}

export function Knapper({ className, lys = false }: { className?: string; lys?: boolean }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <a
        href={klinikk.telefon.lenke}
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold transition-colors duration-300",
          lys
            ? "bg-[var(--color-papir)] text-[var(--color-glomma-deep)] hover:bg-white"
            : "bg-[var(--color-glomma)] text-[var(--color-papir)] shadow-[0_12px_30px_-14px_rgba(22,48,59,0.7)] hover:bg-[var(--color-glomma-deep)]"
        )}
      >
        <Phone className="size-4" aria-hidden="true" />
        Ring {klinikk.telefon.visning}
      </a>
      <Link
        href="/#kontakt"
        className={cn(
          "inline-flex items-center gap-2 rounded-full border px-6 py-3.5 text-[15px] font-semibold transition-colors duration-300",
          lys
            ? "border-[var(--color-strek-lys)] text-[var(--color-papir)] hover:bg-white/10"
            : "border-[var(--color-strek)] bg-white text-[var(--color-glomma-deep)] hover:border-[var(--color-glomma)]"
        )}
      >
        <CalendarDays className="size-4" aria-hidden="true" />
        Bestill time
      </Link>
    </div>
  );
}

/** A and B and C, bottom left, to compare. */
export function Bryter() {
  const sti = usePathname();
  return (
    <nav aria-label="Utkast" className="fixed bottom-4 left-4 right-4 z-[60] flex w-max max-w-[calc(100vw-32px)] gap-1 overflow-x-auto rounded-full bg-[var(--color-glomma-deep)] p-1 text-[13px] font-semibold shadow-lg">
      {[
        ["a", "A Lappen"],
        ["b", "B Bildeboka"],
        ["c", "C Du spør"],
        ["d", "D Sjekk selv"],
        ["e", "E Inni tanna"],
        ["f", "F Visste du?"],
      ].map(([k, navn]) => {
        const her = sti?.endsWith(`/${k}`);
        return (
          <Link key={k} href={`/mockups/artikler/${k}`} className={cn("shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 transition-colors", her ? "bg-[var(--color-papir)] text-[var(--color-glomma-deep)]" : "text-[var(--color-papir)] hover:bg-white/10")}>
            {navn}
          </Link>
        );
      })}
    </nav>
  );
}
