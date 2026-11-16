import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { klinikk } from "@/data/klinikk";
import { Apningsstatus } from "@/components/forside/Apningsstatus";
import { Bytte } from "@/components/forside/Bytte";
import tegnet from "@/components/forside/utsikt/tegnet.webp";

/**
 * «Snitt» (chosen 2026-10-12 from three proposals). White at the top with the
 * name to the left; the treatment room in the top right, cut on a diagonal
 * that follows the words; and lower down the drawing of the view over Glomma
 * (tools/tegn_hero.py: the river, the bridge, the town and the fortress)
 * rises out of the white. Nothing behind it is coloured, so there is nothing
 * to see but white until the drawing has come. From lg up nothing waits or
 * slides in: the name and the photo are there in the first frame, which is
 * what PageSpeed times.
 *
 * Phones and tablets: one screen tall and no more. The words at the top, the
 * two buttons on one line, and under them a frame filling the rest, which
 * opens on the drawing and then lets the room sweep in (Bytte.tsx).
 */

// Retouched version of the clinic's treatment-room photo; the original remains beside it.
const ROMMET = "/images/klinikk/behandlingsrom-polert.webp";

/**
 * From lg up: the drawing, showing only its lower part
 * across the foot of the hero. Its top fades out, so the drawing's own hazy
 * horizon runs straight into the white above it.
 */
function Utsikten() {
  const maske = "linear-gradient(to bottom, transparent 0%, #000 26%)";
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] hidden h-[46%] overflow-hidden lg:block" style={{ maskImage: maske, WebkitMaskImage: maske }}>
      {/* the whole drawing (3:2), sunk so its foreground trees are cut off */}
      <div className="absolute bottom-0 left-0 aspect-[3/2] w-full translate-y-[14%]">
        <Image src={tegnet} alt="" fill sizes="(min-width: 1024px) 100vw, 170vw" className="object-cover" />
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section aria-label="Velkommen" className="relative flex h-[100svh] min-h-[520px] flex-col overflow-hidden bg-white lg:block lg:h-auto lg:min-h-[max(680px,100svh)]">
      {/* the words, and from lg up the room sized by them: from the top of the page
          to the foot of the words (the opening hours), as tall as they reach */}
      <div className="relative z-10">
        <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-px)] pt-[clamp(84px,12svh,120px)] lg:pt-[clamp(112px,15vh,150px)]">
          <div className="max-w-[560px]">
            {/* on phones, smaller when the screen is short, so the frame below keeps its room */}
            <h1
              className="text-[length:clamp(34px,min(11.5vw,6.4svh),64px)] font-bold text-[var(--color-glomma-deep)] lg:text-[length:clamp(44px,6vw,92px)]"
              style={{ lineHeight: 0.92, letterSpacing: "-0.035em" }}
            >
              Kongsvinger{" "}
              <br />
              Tannhelse
            </h1>
            <p className="mt-2.5 text-[16px] font-medium text-[var(--color-glomma)] md:text-[18px] lg:mt-5 lg:text-[20px]">Tannlegene Hafthun og Zia</p>

            <div id="hero-knapper" className="mt-5 flex flex-col gap-3 lg:mt-7">
              {/* one line on every phone: the two buttons share it, and the icons wait for sm */}
              <div className="flex gap-2 lg:gap-2.5">
                <Link
                  href="/kontakt"
                  className="group inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[var(--color-glomma)] px-4 py-3.5 text-[14px] font-semibold text-[var(--color-papir)] shadow-[0_12px_30px_-14px_rgba(22,48,59,0.7)] transition-colors duration-300 hover:bg-[var(--color-glomma-deep)] sm:flex-none sm:px-6"
                >
                  Be om time
                  <ArrowRight className="hidden size-4 transition-transform duration-300 group-hover:translate-x-0.5 sm:block" aria-hidden="true" />
                </Link>
                <a
                  href={klinikk.telefon.lenke}
                  className="inline-flex flex-[1.3] items-center justify-center gap-2 whitespace-nowrap rounded-full border-2 border-[var(--color-teal)] bg-white px-3 py-3 text-[14px] font-medium text-[var(--color-glomma-deep)] transition-colors duration-300 hover:bg-[#EAF6F8] sm:flex-none sm:px-5"
                >
                  <Phone className="hidden size-4 sm:block" aria-hidden="true" />
                  Ring {klinikk.telefon.visning}
                </a>
              </div>
              <p className="flex items-center gap-2 text-[13px] font-medium text-[var(--color-glomma-deep)] md:text-[14px]">
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
            by the buttons. */}
        <div
          className="absolute inset-y-0 left-[var(--fra)] right-0 hidden [clip-path:polygon(14%_0,100%_0,100%_100%,0_100%)] lg:block"
          style={{ "--fra": "calc(max(0px, (100vw - var(--container-max)) / 2) + var(--container-px) + 5.4 * clamp(44px, 6vw, 92px) + 24px)" } as CSSProperties}
        >
          <Image src={ROMMET} alt="Behandlingsrommet: stolen, instrumentene og brettet" fill priority sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover object-[50%_32%]" />
        </div>
      </div>

      {/* phones and tablets: the frame fills what's left of the screen */}
      <Bytte className="relative mt-5 min-h-[200px] flex-1 lg:hidden" />

      <Utsikten />
    </section>
  );
}
