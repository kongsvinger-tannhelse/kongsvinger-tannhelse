"use client";

import { klinikk } from "@/data/klinikk";
import { useApningsstatus } from "@/lib/apningstid";
import { cn } from "@/lib/utils";

/**
 * Open now? Where, and the number. One line of facts: on a sheet of glass,
 * or ("film") as white credits on a hairline, over a dark picture.
 */
export function Infolinje({
  className,
  variant = "glass",
  kreditt,
}: {
  className?: string;
  variant?: "glass" | "film";
  /** credit for the picture behind, shown as one more column */
  kreditt?: { navn: string; href: string };
}) {
  const status = useApningsstatus();
  const film = variant === "film";
  return (
    <dl
      className={cn(
        cn("grid grid-cols-2 gap-x-8 gap-y-3 text-[14px]", kreditt ? "md:grid-cols-4" : "sm:grid-cols-3"),
        film
          ? "border-t border-white/25 pt-4 text-white [&_dt]:!text-white/60"
          : "rounded-[14px] bg-[color-mix(in_srgb,var(--color-papir)_82%,transparent)] px-5 py-4 text-[var(--color-tekst)] shadow-[0_18px_40px_-24px_rgba(22,48,59,0.45)] backdrop-blur-md sm:px-6",
        className
      )}
    >
      <div>
        <dt className="text-[12px] text-[var(--color-tekst-svak)]">Akkurat nå</dt>
        <dd className="mt-0.5 flex items-center gap-2 font-medium xl:whitespace-nowrap">
          <span
            aria-hidden="true"
            className={cn("size-2 rounded-full", status?.apen ? "bg-[var(--color-apen)] shadow-[0_0_0_4px_rgba(63,163,107,0.18)]" : film ? "bg-white/50" : "bg-[var(--color-stein)]")}
          />
          {status?.tekst ?? `${klinikk.apningstider.dager} ${klinikk.apningstider.fra}–${klinikk.apningstider.til}`}
        </dd>
      </div>
      <div>
        <dt className="text-[12px] text-[var(--color-tekst-svak)]">Adresse</dt>
        <dd className="mt-0.5 font-medium">
          {klinikk.adresse.gate}, {klinikk.adresse.sted}
        </dd>
      </div>
      <div>
        <dt className="text-[12px] text-[var(--color-tekst-svak)]">Telefon</dt>
        <dd className="mt-0.5 font-medium">
          <a href={klinikk.telefon.lenke} className="underline-offset-4 hover:underline">
            {klinikk.telefon.visning}
          </a>
        </dd>
      </div>
      {kreditt && (
        <div>
          <dt className="text-[12px] text-[var(--color-tekst-svak)]">Bildet</dt>
          <dd className="mt-0.5 font-medium">
            <a href={kreditt.href} className="underline-offset-4 hover:underline">
              {kreditt.navn}
            </a>
          </dd>
        </div>
      )}
    </dl>
  );
}
