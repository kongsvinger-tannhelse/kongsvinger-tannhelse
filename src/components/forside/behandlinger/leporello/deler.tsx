"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { GRUPPER } from "../grupper";
import { Kasse } from "../popup/Popup";
import { FARGE } from "../popup/tegning";
import { SCENER } from "../scener";

/* What both folds of «Leporelloen» share: the words, a scene on its paper,
   the list of every treatment, and the cover. */

/** The old site's own description of what the clinic does (its meta description). */
export const INNLEDNING = "Vi tilbyr alt fra tannsjekk og tannrens til estetisk tannbehandling.";

/** The small spaced capitals the Kontakt section uses for its labels. */
export const MERKE = "text-[12px] font-medium uppercase tracking-[0.12em] text-[var(--color-tekst-svak)]";

/** One treatment's pop-up, standing on the scenes' own paper, anchored at its foot. */
export function Scene({ id, oppe, spiller, redusert }: { id: string; oppe: boolean; spiller: boolean; redusert: boolean }) {
  const S = SCENER[id];
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: FARGE.papir }}>
      <Kasse>{S ? <S oppe={oppe} spiller={spiller} redusert={redusert} /> : null}</Kasse>
    </div>
  );
}

/** Every treatment by its group, as running lines: «Ordinære Tannsjekk · Tannfylling · …». */
export function Alle({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <span className={cn("block text-[var(--color-tekst-2)]", className)} style={style}>
      {GRUPPER.map((g) => (
        <span key={g.id} className="mb-[0.7em] block last:mb-0">
          <b className="font-semibold text-[var(--color-glomma-deep)]">{g.kort}e </b>
          {g.liste.map((b) => b.navn).join(" · ")}
        </span>
      ))}
    </span>
  );
}

/** The cover, in the river's slate: what shows while the strip lies closed. Sized by the panel width, --w. */
export function Omslag() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center" style={{ background: "var(--color-glomma)" }}>
      <Image src="/images/merke.png" alt="" width={192} height={192} className="rounded-[22%]" style={{ width: "calc(var(--w) * 0.19)", height: "auto" }} />
      <span className="mt-[10%] font-bold text-[var(--color-papir)]" style={{ fontSize: "calc(var(--w) * 0.095)", letterSpacing: "-0.045em", lineHeight: 1 }}>
        Behandlinger
      </span>
      <span className="mt-[3%] text-[var(--color-tekst-lys-2)]" style={{ fontSize: "calc(var(--w) * 0.042)" }}>
        Kongsvinger Tannhelse
      </span>
      <span className="absolute inset-x-[9%] bottom-[7%] font-medium uppercase text-[var(--color-tekst-lys-2)]" style={{ fontSize: "calc(var(--w) * 0.032)", letterSpacing: "0.14em" }}>
        Fjellgata 4
      </span>
    </div>
  );
}
