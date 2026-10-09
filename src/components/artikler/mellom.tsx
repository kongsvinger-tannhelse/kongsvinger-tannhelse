import { Lightbulb, NotebookPen, Sparkles } from "lucide-react";
import type { Lapp } from "@/data/artikler";
import { cn } from "@/lib/utils";
import { Vis } from "./deler";
import { AKSENT } from "./tegninger";
import s from "./artikler.module.css";

/* The yellow sticky notes: a fact, a small trick or a good tip, pinned to
   the words they explain. On a wide screen a note sits in the sheet's
   margin beside its paragraph, with a short pen arrow from the underlined
   words (Margflyt.tsx lays them out); on a narrower screen it sits in line,
   right after the paragraph. A note that is not pinned to anything stays
   where it was, between two sections: at the foot of the margin, or after
   the section's text. */

const IKON = { visste: Lightbulb, triks: NotebookPen, tips: Sparkles } as const;
const NAVN = { visste: "Visste du?", triks: "Lite triks", tips: "Godt tips" } as const;

/** How much each sticky note leans, in turn. */
const VRI = [1.5, -1.8, 1.2, -1.4];

/** A note, its place in the article (for the lean) and the id of the words it is pinned to, if any. */
export type Festet = { lapp: Lapp; n: number; id: string | null };

/** The note itself: a strip of tape, what kind of note, and the words. `liten`: the compact one, in the text. */
function Lappen({ lapp, n, liten = false, className }: { lapp: Lapp; n: number; liten?: boolean; className?: string }) {
  const Ikon = IKON[lapp.slag];
  return (
    <aside
      className={cn(
        "relative bg-[var(--color-lapp)] shadow-[0_18px_30px_-18px_rgba(107,74,16,0.55),0_2px_0_rgba(107,74,16,0.08)]",
        s.stig,
        className,
      )}
      style={{ rotate: `${VRI[n % VRI.length]}deg` }}
    >
      {/* the tape */}
      <span aria-hidden="true" className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 rotate-[-3deg] bg-white/60 shadow-[0_1px_2px_rgba(0,0,0,0.08)]" />
      <p className={cn("flex items-center gap-2 font-bold text-[var(--color-lapp-blekk)]", liten ? "text-[14px]" : "text-[15px]")}>
        <Ikon className="size-4 shrink-0" aria-hidden="true" />
        {NAVN[lapp.slag]}
      </p>
      <p className={cn("mt-1 leading-[1.5] text-[var(--color-lapp-tekst)]", liten ? "text-[16px]" : "text-[17px]")}>{lapp.tekst}</p>
    </aside>
  );
}

/**
 * A note in the margin, for wide screens. Pinned: Margflyt moves it down
 * beside its words and draws the arrow (two pen strokes, empty until then).
 * Not pinned: it sinks to the foot of the margin, where the section ends.
 */
export function MargLapp({ festet }: { festet: Festet }) {
  const { lapp, n, id } = festet;
  return (
    <div data-lapp="" data-feste={id ?? undefined} className={cn("relative", !id && "mt-auto")}>
      <Vis className="relative">
        {id && (
          <svg
            data-pil=""
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 size-px overflow-visible"
            fill="none"
            stroke={AKSENT}
            strokeWidth={1.9}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path pathLength={1} className={s.strek} style={{ "--forsink": "0.5s" } as React.CSSProperties} />
            <path pathLength={1} className={s.strek} style={{ "--forsink": "1.25s" } as React.CSSProperties} />
          </svg>
        )}
        <Lappen lapp={lapp} n={n} className="w-full px-5 pb-5 pt-6" />
      </Vis>
    </div>
  );
}

/** A note in line, right after the words it explains, for narrower screens. */
export function InneLapp({ festet, className }: { festet: Festet; className?: string }) {
  const { lapp, n } = festet;
  return (
    <Vis className={cn("relative z-10 clear-both flex py-3 lg:hidden", n % 2 === 0 ? "justify-end" : "justify-start", className)}>
      <Lappen lapp={lapp} n={n} liten className="w-[92%] max-w-[340px] px-4 pb-4 pt-5" />
    </Vis>
  );
}

/**
 * The old free-standing note, a full row between two sections, hanging over
 * the sheet's edge on a wide screen. The treatment pages still use it; the
 * articles pin their notes (MargLapp, InneLapp).
 */
export function GulLapp({ lapp, side, vri }: { lapp: Lapp; side: "v" | "h"; vri: number }) {
  const Ikon = IKON[lapp.slag];
  return (
    <Vis className={cn("relative z-10 my-2 flex", side === "h" ? "justify-end lg:-mr-[150px]" : "justify-start lg:-ml-[150px]")}>
      <aside className={cn("relative w-full max-w-[380px] bg-[#FCEFB0] px-6 pb-6 pt-7 shadow-[0_18px_30px_-18px_rgba(107,74,16,0.55),0_2px_0_rgba(107,74,16,0.08)]", s.stig)} style={{ rotate: `${vri}deg` }}>
        {/* the tape */}
        <span aria-hidden="true" className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rotate-[-3deg] bg-white/60 shadow-[0_1px_2px_rgba(0,0,0,0.08)] backdrop-blur-[1px]" />
        <p className="flex items-center gap-2 text-[14px] font-bold uppercase tracking-[0.12em] text-[#6B4A10]">
          <Ikon className="size-4" aria-hidden="true" />
          {NAVN[lapp.slag]}
        </p>
        <p className="mt-2 text-[18px] leading-[1.55] text-[#3E2C0A]">{lapp.tekst}</p>
      </aside>
    </Vis>
  );
}
