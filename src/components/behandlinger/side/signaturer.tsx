import { Phone } from "lucide-react";
import { lauv, r2, rng, stjerne } from "@/components/forside/behandlinger/popup/tegning";
import { ApentNa } from "@/components/artikler/klokke";
import { klinikk } from "@/data/klinikk";
import { cn } from "@/lib/utils";
import a from "@/components/artikler/artikler.module.css";
import s from "./side.module.css";

/* The pieces that make a treatment page its own, beside its drawings: the
   watercolour wash in the page's ink, the night sky over the tanngnissing
   page, the calendar binding on the tannsjekk page, and the phone card at
   the top of the pages for what can't wait. */

/** A watercolour wash in the page's ink, behind a pen drawing. It fills its box and comes once the pen has drawn. */
export function Vask({ seed, className }: { seed: number; className?: string }) {
  return (
    <div aria-hidden="true" className={cn("absolute inset-0", className)}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="size-full">
        <path d={lauv(50, 52, 47, 43, seed, 8)} className={a.blekk} style={{ fill: "var(--b-vask)" }} />
      </svg>
    </div>
  );
}

/* The night sky: small stars scattered over the top of the sheet, a few of
   them slowly twinkling, and three bright ones. Never in the dawn at the
   bottom, nor in a band down the middle where the title is. */
const STJERNER = (() => {
  const t = rng(23);
  const prikker: { x: number; y: number; r: number; o: number; blinker: boolean; d: number }[] = [];
  while (prikker.length < 40) {
    const x = r2(t() * 1000);
    const y = r2(t() * 380);
    if (x > 200 && x < 800 && y < 250) continue;
    prikker.push({ x, y, r: r2(0.9 + t() * 1.5), o: r2(0.45 + t() * 0.55), blinker: prikker.length % 4 === 0, d: r2(t() * 5) });
  }
  return prikker;
})();

export function Stjerner() {
  return (
    <svg aria-hidden="true" viewBox="0 0 1000 560" preserveAspectRatio="xMidYMin slice" className="pointer-events-none absolute inset-0 size-full">
      {STJERNER.map((p) => (
        <circle
          key={`${p.x}-${p.y}`}
          cx={p.x}
          cy={p.y}
          r={p.r}
          fill="#FFF6DD"
          opacity={p.o}
          className={p.blinker ? s.stjerne : undefined}
          style={p.blinker ? { animationDelay: `${p.d}s` } : undefined}
        />
      ))}
      <path d={`${stjerne(120, 70, 7)} ${stjerne(846, 118, 8)} ${stjerne(930, 300, 5)} ${stjerne(64, 330, 5)}`} fill="#F6E3A6" />
    </svg>
  );
}

/** The tannsjekk page bound at the top like a wall calendar: a wire ring through a hole, every 24 px along the sheet's top edge. */
export function Spiral() {
  return (
    <svg aria-hidden="true" className={s.spiral}>
      <defs>
        <pattern id="spiral" width={24} height={34} patternUnits="userSpaceOnUse">
          <ellipse cx={13.5} cy={24} rx={3.4} ry={2.8} fill="#27373E" fillOpacity={0.75} />
          <path d="M12,24 L12.6,4.5 Q13,1 15.5,1.2 Q18,1.6 17.6,5 L17,14" fill="none" stroke="#78858A" strokeWidth={2.2} strokeLinecap="round" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#spiral)" />
    </svg>
  );
}

/**
 * At the top of a page for what can't wait: call us, early in the day; we do
 * our best to see you the same day; and whether we're open now. The words are
 * the book's «Akutt» intro (klinikk.ts).
 */
export function RingOss() {
  return (
    <div
      className="inline-flex max-w-full items-center gap-4 rounded-[20px] border-2 border-[var(--b-ramme,#A8432C)] bg-white px-5 py-4 text-left shadow-[3px_4px_0_var(--b-skygge,rgba(168,67,44,0.16))] md:gap-5 md:px-6"
      style={{ rotate: "-1deg" }}
    >
      <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[var(--b-ramme,#A8432C)] text-white">
        <Phone className="size-5" aria-hidden="true" />
      </span>
      <span className="block min-w-0">
        <span className="block text-[15px] font-semibold leading-snug text-[var(--b-lapp-blekk,#8A3218)]">Ring oss så tidlig på dagen som mulig</span>
        <a href={klinikk.telefon.lenke} className="mt-0.5 block whitespace-nowrap text-[26px] font-bold leading-tight tracking-[-0.02em] text-[var(--color-glomma-deep)] underline-offset-4 hover:underline">
          {klinikk.telefon.visning}
        </a>
        <span className="mt-1 block text-balance text-[15px] leading-snug text-[var(--color-tekst)]">Vi gjør vårt beste for å gi deg time samme dag.</span>
        <ApentNa className="mt-1 block text-balance text-[14px] leading-snug text-[var(--color-tekst-2)]" />
      </span>
    </div>
  );
}

/** The numbers to call in a piece of text, as links. */
const NUMMER = /(116 117|113)/;

export function MedNummer({ tekst }: { tekst: string }) {
  return tekst.split(NUMMER).map((bit, i) =>
    i % 2 ? (
      <a key={i} href={`tel:${bit.replace(" ", "")}`} className="whitespace-nowrap font-bold underline decoration-2 underline-offset-4">
        {bit}
      </a>
    ) : (
      bit
    ),
  );
}
