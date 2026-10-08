import { Lightbulb, NotebookPen, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Vis } from "./deler";
import { SMATT_NAVN, type Smatt } from "./tekst";
import s from "./artikler.module.css";

/* Small lessons between the note's sections: a yellow sticky note pinned
   over the sheet's edge (G), a row of three little cards (H), and a
   textbook figure with its caption (I). */

const IKON = { visste: Lightbulb, triks: NotebookPen, tips: Sparkles } as const;

const FARGE = {
  visste: { flate: "#FBF0D9", ikon: "#E2A93B", tekst: "#3E2C0A", merke: "#6B4A10" },
  triks: { flate: "#E1EFF1", ikon: "#2DA4B4", tekst: "#16303B", merke: "#1D6A75" },
  tips: { flate: "#ECF1E2", ikon: "#7E9A5A", tekst: "#1F3318", merke: "#3F5A2A" },
} as const;

/** A yellow sticky note with tape, pinned so it hangs over the sheet's edge on a wide screen. */
export function GulLapp({ smatt, side, vri }: { smatt: Smatt; side: "v" | "h"; vri: number }) {
  const Ikon = IKON[smatt.slag];
  return (
    <Vis className={cn("relative z-10 my-2 flex", side === "h" ? "justify-end lg:-mr-[150px]" : "justify-start lg:-ml-[150px]")}>
      <aside className={cn("relative w-full max-w-[380px] bg-[#FCEFB0] px-6 pb-6 pt-7 shadow-[0_18px_30px_-18px_rgba(107,74,16,0.55),0_2px_0_rgba(107,74,16,0.08)]", s.stig)} style={{ rotate: `${vri}deg` }}>
        {/* the tape */}
        <span aria-hidden="true" className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rotate-[-3deg] bg-white/60 shadow-[0_1px_2px_rgba(0,0,0,0.08)] backdrop-blur-[1px]" />
        <p className="flex items-center gap-2 text-[14px] font-bold uppercase tracking-[0.12em] text-[#6B4A10]">
          <Ikon className="size-4" aria-hidden="true" />
          {SMATT_NAVN[smatt.slag]}
        </p>
        <p className="mt-2 text-[18px] leading-[1.55] text-[#3E2C0A]">{smatt.tekst}</p>
      </aside>
    </Vis>
  );
}

/** Three little cards in a row, between two sections. */
export function TipsRad({ smatt, className }: { smatt: Smatt[]; className?: string }) {
  return (
    <Vis as="aside" aria-label="Tips og triks" className={cn("py-10 md:py-12", className)}>
      <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--color-tekst-svak)]">Tips og triks</p>
      <ul className="mt-5 grid gap-4 md:grid-cols-3">
        {smatt.map((m, i) => {
          const Ikon = IKON[m.slag];
          const f = FARGE[m.slag];
          return (
            <li key={m.id} className={cn("flex flex-col rounded-[22px] p-5 md:p-6", s.stig)} style={{ background: f.flate, "--forsink": `${i * 0.12}s` } as React.CSSProperties}>
              <span className="grid size-10 place-items-center rounded-full text-white" style={{ background: f.ikon }}>
                <Ikon className="size-[18px]" aria-hidden="true" />
              </span>
              <p className="mt-4 text-[14px] font-bold uppercase tracking-[0.1em]" style={{ color: f.merke }}>
                {SMATT_NAVN[m.slag]}
              </p>
              <p className="mt-1.5 text-[17px] leading-[1.55]" style={{ color: f.tekst }}>
                {m.tekst}
              </p>
            </li>
          );
        })}
      </ul>
    </Vis>
  );
}

/** A figure, as in a textbook: the drawing, «Figur n» and what it shows. */
export function Figur({ nr, tegning, smatt, children }: { nr: number; tegning: React.ReactNode; smatt: Smatt; children?: React.ReactNode }) {
  return (
    <Vis as="figure" className="my-2 grid items-center gap-6 rounded-[24px] border border-[var(--color-strek)] bg-white/70 p-6 md:grid-cols-[minmax(0,300px)_minmax(0,1fr)] md:gap-10 md:p-8">
      <div className="mx-auto w-full max-w-[300px]">{tegning}</div>
      <figcaption>
        <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-[var(--color-teal)]">
          Figur {nr} · {SMATT_NAVN[smatt.slag]}
        </p>
        <p className="mt-2 text-[19px] leading-[1.6] text-[var(--color-tekst)]">{smatt.tekst}</p>
        {children}
      </figcaption>
    </Vis>
  );
}

/** A small boxed tip in pen, for I between chapters. */
export function Rute({ smatt }: { smatt: Smatt }) {
  const Ikon = IKON[smatt.slag];
  return (
    <Vis as="aside" className={cn("my-2 flex gap-4 rounded-[20px] border-2 border-dashed border-[var(--color-teal)]/50 p-5 md:p-6", s.stig)}>
      <Ikon className="mt-0.5 size-6 shrink-0 text-[var(--color-teal)]" aria-hidden="true" />
      <div>
        <p className="text-[14px] font-bold uppercase tracking-[0.12em] text-[#1D6A75]">{SMATT_NAVN[smatt.slag]}</p>
        <p className="mt-1 text-[18px] leading-[1.55] text-[var(--color-tekst)]">{smatt.tekst}</p>
      </div>
    </Vis>
  );
}
