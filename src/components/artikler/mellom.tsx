import { Lightbulb, NotebookPen, Sparkles } from "lucide-react";
import type { Lapp } from "@/data/artikler";
import { cn } from "@/lib/utils";
import { Vis } from "./deler";
import s from "./artikler.module.css";

/* A yellow sticky note between two sections of the note: a fact, a small
   trick or a good tip, taped on so it hangs over the sheet's edge on a
   wide screen, and sits in line on a phone. */

const IKON = { visste: Lightbulb, triks: NotebookPen, tips: Sparkles } as const;
const NAVN = { visste: "Visste du?", triks: "Lite triks", tips: "Godt tips" } as const;

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
