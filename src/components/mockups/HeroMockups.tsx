import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { klinikk } from "@/data/klinikk";
import { Apningsstatus } from "@/components/forside/Apningsstatus";
import { kortskrift } from "@/components/omoss/skrift";
import { cn } from "@/lib/utils";

/*
 * MOCKUPS of a new hero (not on the live front page): white at the top with
 * the name, the treatment room (bilde6: the chair, the instruments, the tray)
 * beside it behind a diagonal edge, and at the foot the white warms to
 * yellow and the town on its hill (landskap-*.webp, from «Om oss») rises
 * under it. Three ways to set it: Snitt, Solstripe, Vindu.
 */

const ROMMET = "/images/klinikk/bilde6.webp";
const SOL = "#F7DC8C"; // the low sun in the hero drawing
const SOL_LYS = "#FCEFC4";

/**
 * The town on its hill, across the foot of the hero: the wide drawing, sunk
 * partly below the edge so the fortress and the houses show and the forest
 * under them is cut off. Wider than the screen on a phone, so it isn't a sliver.
 */
function Byen({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute -left-[45%] bottom-0 w-[190%] translate-y-[34%] md:left-0 md:w-full md:translate-y-[46%]", className)}>
      <Image src="/images/tegninger/landskap-bred.webp" alt="" width={3200} height={964} sizes="(min-width: 768px) 100vw, 190vw" className="block h-auto w-full" />
    </div>
  );
}

/** The two buttons and the note on whether the clinic is open, as on the live hero. */
function Knapper({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex flex-wrap gap-2.5">
        <Link
          href="/kontakt"
          className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-glomma)] px-6 py-3.5 text-[14px] font-semibold text-[var(--color-papir)] shadow-[0_12px_30px_-14px_rgba(22,48,59,0.7)] transition-colors duration-300 hover:bg-[var(--color-glomma-deep)]"
        >
          Be om time
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
        <a
          href={klinikk.telefon.lenke}
          className="inline-flex items-center gap-2 rounded-full border-2 border-[var(--color-teal)] bg-white px-5 py-3 text-[14px] font-medium text-[var(--color-glomma-deep)] transition-colors duration-300 hover:bg-[#EAF6F8]"
        >
          <Phone className="size-4" aria-hidden="true" />
          Ring {klinikk.telefon.visning}
        </a>
      </div>
      <p className="flex items-center gap-2 text-[14px] font-medium text-[var(--color-glomma-deep)]">
        <Apningsstatus />
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   1 · «Snitt». The words on white to the left, as on the live hero; the
   treatment room up in the top right corner, the whole photo (its own
   5:4 shape, nothing cropped) about half the screen high, its left edge
   cut on a gentle diagonal. Under it the white warms to yellow and the
   town stands across the foot.
   ───────────────────────────────────────────────────────────────────── */
export function Snitt() {
  return (
    <section aria-label="Velkommen" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-white md:block md:min-h-[max(680px,100svh)]">
      {/* the room: full width under the words on a phone, top right from md up */}
      <div className="relative z-[6] order-2 mt-8 aspect-[5/4] w-full [clip-path:polygon(0_10%,100%_0,100%_100%,0_100%)] md:absolute md:right-0 md:top-0 md:mt-0 md:w-[min(52vw,calc(56svh*1.25))] md:[clip-path:polygon(14%_0,100%_0,100%_100%,0_100%)]">
        <Image src={ROMMET} alt="Behandlingsrommet: stolen, instrumentene og brettet" fill priority sizes="(min-width: 768px) 52vw, 100vw" className="object-cover" />
      </div>

      <div className="relative z-10 order-1 mx-auto w-full max-w-[var(--container-max)] px-[var(--container-px)] pt-[100px] md:pt-[clamp(112px,15vh,150px)]">
        <div className="max-w-[560px]">
          <h1 className="font-bold text-[var(--color-glomma-deep)]" style={{ fontSize: "clamp(44px, 6vw, 92px)", lineHeight: 0.92, letterSpacing: "-0.035em" }}>
            Kongsvinger
            <br />
            Tannhelse
          </h1>
          <p className="mt-4 text-[18px] font-medium text-[var(--color-glomma)] md:mt-5 md:text-[20px]">Tannlegene Hafthun og Zia</p>
          <Knapper className="mt-7" />
        </div>
      </div>

      {/* white → yellow, then the town */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[30%] md:h-[36%]"
        style={{ background: `linear-gradient(to bottom, rgba(255,255,255,0) 0%, ${SOL_LYS} 45%, ${SOL} 100%)` }}
      />
      <Byen className="z-[7]" />
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   2 · «Solstripe». The diagonal is not a hard cut but a band of light:
   the white runs into a warm yellow stripe along the edge, and the room
   shows through behind it. The name is set like a magazine cover: the
   place in a light serif italic, the clinic huge under it.
   ───────────────────────────────────────────────────────────────────── */
export function Solstripe() {
  return (
    <section aria-label="Velkommen" className="relative min-h-[100svh] overflow-hidden bg-white md:min-h-[max(720px,100svh)]">
      {/* the room, the full height of the right side; on a phone, the lower half */}
      <div className="absolute inset-x-0 bottom-0 h-[52%] md:inset-y-0 md:left-auto md:right-0 md:h-auto md:w-[62%]">
        <Image src={ROMMET} alt="Behandlingsrommet: stolen, instrumentene og brettet" fill priority sizes="(min-width: 768px) 62vw, 100vw" className="object-cover object-[35%_45%]" />
      </div>
      {/* the light: white, then a yellow band along the diagonal, then the room */}
      <div
        aria-hidden="true"
        className="absolute inset-0 md:hidden"
        style={{ background: `linear-gradient(172deg, #fff 0%, #fff 47%, ${SOL_LYS} 52%, ${SOL} 55%, rgba(247,220,140,0.55) 58%, rgba(247,220,140,0) 66%)` }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden md:block"
        style={{ background: `linear-gradient(105deg, #fff 0%, #fff 40%, ${SOL_LYS} 45%, ${SOL} 48.5%, rgba(247,220,140,0.6) 52%, rgba(247,220,140,0) 60%)` }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[var(--container-max)] px-[var(--container-px)] pt-[108px] md:pt-[clamp(150px,22vh,220px)]">
        <div className="max-w-[520px]">
          <h1 className="text-[var(--color-glomma-deep)]">
            <span className={cn(kortskrift.className, "block italic text-[var(--color-glomma)]")} style={{ fontSize: "clamp(34px, 3.6vw, 54px)", fontWeight: 500, lineHeight: 1 }}>
              Kongsvinger
            </span>
            <span className="block font-bold" style={{ fontSize: "clamp(58px, 7.6vw, 118px)", lineHeight: 0.9, letterSpacing: "-0.045em" }}>
              Tannhelse
            </span>
          </h1>
          <p className="mt-5 max-w-[30ch] text-[18px] leading-[1.45] text-[var(--color-tekst-2)] md:text-[20px]">
            Tannlegene <span className="font-semibold text-[var(--color-glomma-deep)]">Hafthun og Zia</span>
          </p>
          <Knapper className="mt-8" />
        </div>
      </div>

      {/* the foot: the yellow gathers and the town rises over the room */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[30%]"
        style={{ background: `linear-gradient(to bottom, rgba(247,220,140,0) 0%, rgba(252,239,196,0.85) 45%, ${SOL_LYS} 100%)` }}
      />
      <Byen className="z-[6]" />
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────
   3 · «Vindu». The whole hero is one sky: white at the top, warm yellow
   lower down, the town at the foot. The name runs big across the top,
   with a yellow marker stroke under «Tannhelse»; the room hangs in the
   sky as a tall slanted pane, its left edge the diagonal.
   ───────────────────────────────────────────────────────────────────── */
export function Vindu() {
  return (
    <section
      aria-label="Velkommen"
      className="relative min-h-[100svh] overflow-hidden md:min-h-[max(720px,100svh)]"
      style={{ background: `linear-gradient(to bottom, #fff 0%, #fff 38%, ${SOL_LYS} 66%, ${SOL} 100%)` }}
    >
      <div className="relative z-10 mx-auto grid w-full max-w-[var(--container-max)] gap-8 px-[var(--container-px)] pt-[108px] md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] md:items-start md:gap-12 md:pt-[clamp(140px,20vh,200px)]">
        <div>
          <h1 className="font-bold text-[var(--color-glomma-deep)]" style={{ fontSize: "clamp(46px, 6vw, 92px)", lineHeight: 0.95, letterSpacing: "-0.04em" }}>
            Kongsvinger
            <br />
            <span className="relative inline-block">
              <span aria-hidden="true" className="absolute inset-x-[-0.08em] bottom-[0.06em] h-[0.32em] -skew-x-12 rounded-[3px]" style={{ background: SOL }} />
              <span className="relative">Tannhelse</span>
            </span>
          </h1>
          <p className="mt-5 text-[18px] font-medium text-[var(--color-glomma)] md:text-[20px]">Tannlegene Hafthun og Zia</p>
          <Knapper className="mt-8" />
        </div>

        {/* the pane: a parallelogram, its left edge the diagonal */}
        <div className="relative mb-[44vw] h-[280px] md:mb-0 md:h-[min(52svh,500px)]">
          <div className="absolute inset-0 overflow-hidden rounded-[6px] shadow-[0_40px_60px_-40px_rgba(22,48,59,0.55)] [clip-path:polygon(16%_0,100%_0,100%_100%,0_100%)]">
            <Image src={ROMMET} alt="Behandlingsrommet: stolen, instrumentene og brettet" fill priority sizes="(min-width: 768px) 45vw, 100vw" className="object-cover object-[30%_50%]" />
          </div>
          {/* a thin yellow line along the diagonal, like light on the glass */}
          <svg aria-hidden="true" className="pointer-events-none absolute inset-0 size-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="16" y1="0" x2="0" y2="100" stroke={SOL} strokeWidth="1.2" vectorEffect="non-scaling-stroke" transform="translate(-1.5 0)" style={{ strokeWidth: 6 }} />
          </svg>
        </div>
      </div>

      <Byen className="z-[5]" />
    </section>
  );
}

export const MOCKUPS = { "1": { navn: "Snitt", Hero: Snitt }, "2": { navn: "Solstripe", Hero: Solstripe }, "3": { navn: "Vindu", Hero: Vindu } } as const;
