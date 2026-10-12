import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { klinikk } from "@/data/klinikk";
import { Apningsstatus } from "@/components/forside/Apningsstatus";
import { cn } from "@/lib/utils";
import farTegnet from "@/components/forside/utsikt/far-tegnet.webp";
import naerTegnet from "@/components/forside/utsikt/near-tegnet.webp";

/**
 * «Snitt» (chosen 2026-10-12 from three proposals). White at the top with the
 * name to the left; the treatment room in the top right, cut on a diagonal
 * that follows the words; and lower down the white warms to yellow and the
 * drawing of the view over Glomma (tools/tegn_hero.py: the river, the bridge,
 * the town and the fortress) rises out of it. Phones and tablets: the words,
 * then the photo, then the drawing.
 *
 * Nothing waits or slides in: the name and the photo are there in the first
 * frame, which is what PageSpeed times. (The animated view it replaced, with
 * the camera glide and the clinic photos in a pane, is in git history before
 * this file's 2026-10-12 rewrite.)
 */

// bilde6, upscaled by the clinic (2000 × 1600); the source is kilder/klinikk/behandlingsrom-oppskalert.webp
const ROMMET = "/images/klinikk/behandlingsrom.webp";
const SOL = "#F7DC8C"; // the low sun in the drawing
const SOL_LYS = "#FCEFC4";

/**
 * The drawing, its two layers stacked, showing only its lower part across the
 * foot of the hero. Its top fades out, so the yellow above runs straight into
 * the drawing's own hazy horizon. On a phone it is enlarged and moved left so
 * the town and the fortress stand in the middle.
 */
function Utsikten({ className }: { className?: string }) {
  const maske = "linear-gradient(to bottom, transparent 0%, #000 26%)";
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden", className)} style={{ maskImage: maske, WebkitMaskImage: maske }}>
      {/* the whole drawing (3:2), sunk so its foreground trees are cut off */}
      <div className="absolute bottom-0 left-[-130%] aspect-[3/2] w-[230%] translate-y-[12%] md:left-0 md:w-full md:translate-y-[14%]">
        {[farTegnet, naerTegnet].map((lag, i) => (
          <Image key={i} src={lag} alt="" fill sizes="(min-width: 768px) 100vw, 230vw" className="object-cover" />
        ))}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      aria-label="Velkommen"
      className="relative min-h-[100svh] overflow-hidden lg:min-h-[max(680px,100svh)]"
      style={{ background: `linear-gradient(to bottom, #fff 0%, #fff 52%, ${SOL_LYS} 66%, ${SOL} 78%)` }}
    >
      {/* the words, and the room sized by them: from lg up it runs from the top of the
          page to the foot of the words (the opening hours), as tall as they reach */}
      <div className="relative z-10">
        <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-px)] pt-[100px] lg:pt-[clamp(112px,15vh,150px)]">
          <div className="max-w-[560px]">
            <h1 className="font-bold text-[var(--color-glomma-deep)]" style={{ fontSize: "clamp(44px, 6vw, 92px)", lineHeight: 0.92, letterSpacing: "-0.035em" }}>
              Kongsvinger
              <br />
              Tannhelse
            </h1>
            <p className="mt-4 text-[18px] font-medium text-[var(--color-glomma)] md:mt-5 md:text-[20px]">Tannlegene Hafthun og Zia</p>

            <div className="mt-7 flex flex-col gap-3">
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
          </div>
        </div>

        {/* From lg up: from just past the name to the right edge of the screen, as tall as
            the words; the frame is wider than the photo there, so a strip of ceiling and floor
            is trimmed, keeping the instruments, the tray and the chair. Its left edge is worked
            out from the name (5.74 em wide in this face, at the size the h1 sets), so the
            diagonal keeps the same gap from «Kongsvinger» on every screen and comes in close
            by the buttons. Phones and tablets get the whole photo, full width. */}
        <div
          className="relative mt-8 aspect-[5/4] w-full [clip-path:polygon(0_10%,100%_0,100%_100%,0_100%)] lg:absolute lg:inset-y-0 lg:left-[var(--fra)] lg:right-0 lg:mt-0 lg:aspect-auto lg:h-full lg:w-auto lg:[clip-path:polygon(14%_0,100%_0,100%_100%,0_100%)]"
          style={{ "--fra": "calc(max(0px, (100vw - var(--container-max)) / 2) + var(--container-px) + 5.4 * clamp(44px, 6vw, 92px) + 24px)" } as CSSProperties}
        >
          <Image src={ROMMET} alt="Behandlingsrommet: stolen, instrumentene og brettet" fill priority sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover lg:object-[50%_32%]" />
        </div>
      </div>

      {/* on phones and tablets the drawing needs its own room under the photo */}
      <div className="h-[300px] lg:hidden" aria-hidden="true" />
      <Utsikten className="z-[5] h-[340px] lg:h-[46%]" />
    </section>
  );
}
