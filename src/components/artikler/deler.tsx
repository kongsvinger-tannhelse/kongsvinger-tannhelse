"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { useInView, type UseInViewOptions } from "framer-motion";
import { cn } from "@/lib/utils";

/* Small parts of the «Råd og tips» pages: the "seen" switch the drawings
   wait for, the crumbs, and the clinic's mark where a face would be. */

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

export type Smule = { navn: string; href?: string };

/** Forside / … / this page. The last crumb is the page itself. */
export function Smuler({ sider, className }: { sider: Smule[]; className?: string }) {
  const alle: Smule[] = [{ navn: "Forside", href: "/" }, ...sider];
  return (
    <nav aria-label="Brødsmuler" className={cn("text-[13px] text-[var(--color-tekst-svak)]", className)}>
      <ol className="flex flex-wrap items-center gap-2">
        {alle.map((s, i) => {
          const sist = i === alle.length - 1;
          return (
            <li key={s.navn} className="flex items-center gap-2">
              {sist || !s.href ? (
                <span aria-current={sist ? "page" : undefined} className={cn(sist && "text-[var(--color-tekst-2)]")}>
                  {s.navn}
                </span>
              ) : (
                <Link href={s.href} className="underline-offset-4 hover:text-[var(--color-tekst)] hover:underline">
                  {s.navn}
                </Link>
              )}
              {!sist && <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** The clinic's mark in a white circle: who the note is from. */
export function Merke({ className }: { className?: string }) {
  return (
    <span className={cn("relative grid shrink-0 place-items-center overflow-hidden rounded-full bg-white", className)}>
      <Image src="/images/merke.png" alt="" width={96} height={96} className="size-[64%] rounded-[22%]" />
    </span>
  );
}
