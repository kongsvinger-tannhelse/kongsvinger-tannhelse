"use client";

import Image from "next/image";
import { Kasse } from "../popup/Popup";
import { FARGE } from "../popup/tegning";
import { SCENER } from "../scener";

/* What both folds of «Leporelloen» share: the words, a scene on its paper,
   and the cover. */

/** What the clinic does, from the first and simplest to the last panel's dentures. */
export const INNLEDNING = "Vi tilbyr alt fra tannsjekk og tannrens til proteser.";

/** One treatment's pop-up, standing on the scenes' own paper, anchored at its foot. */
export function Scene({ id, oppe, spiller, redusert }: { id: string; oppe: boolean; spiller: boolean; redusert: boolean }) {
  const S = SCENER[id];
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: FARGE.papir }}>
      <Kasse>{S ? <S oppe={oppe} spiller={spiller} redusert={redusert} /> : null}</Kasse>
    </div>
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
