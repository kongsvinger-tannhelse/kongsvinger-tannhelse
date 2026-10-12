import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, Phone } from "lucide-react";
import { klinikk } from "@/data/klinikk";
import { Apningsstatus } from "@/components/forside/Apningsstatus";
import { MobilBytte, type Variant } from "@/components/mockups/MobilBytte";
import farTegnet from "@/components/forside/utsikt/far-tegnet.webp";
import naerTegnet from "@/components/forside/utsikt/near-tegnet.webp";

/*
 * MOCKUPS of the front-page hero on phones and tablets (not on the live front
 * page). From lg up it is the live hero, unchanged. Below lg the hero is one
 * screen tall and nothing more: the words at the top, the two buttons on one
 * line (no icons), and the frame under them filling the rest, which opens on
 * the drawing and then gives way to the treatment room (MobilBytte.tsx).
 */

const ROMMET = "/images/klinikk/behandlingsrom.webp";
const SOL = "#F7DC8C";
const SOL_LYS = "#FCEFC4";

/** From lg up, as on the live hero: the drawing across the foot. */
function Utsikten() {
  const maske = "linear-gradient(to bottom, transparent 0%, #000 26%)";
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] hidden h-[46%] overflow-hidden lg:block" style={{ maskImage: maske, WebkitMaskImage: maske }}>
      <div className="absolute bottom-0 left-0 aspect-[3/2] w-full translate-y-[14%]">
        {[farTegnet, naerTegnet].map((lag, i) => (
          <Image key={i} src={lag} alt="" fill sizes="(min-width: 1024px) 100vw, 170vw" className="object-cover" />
        ))}
      </div>
    </div>
  );
}

function Hero({ variant }: { variant: Variant }) {
  return (
    <section aria-label="Velkommen" className="relative flex h-[100svh] min-h-[520px] flex-col overflow-hidden bg-white lg:block lg:h-auto lg:min-h-[max(680px,100svh)]">
      {/* from lg up, the white warming to yellow behind the drawing */}
      <div aria-hidden="true" className="absolute inset-0 hidden lg:block" style={{ background: `linear-gradient(to bottom, #fff 0%, #fff 52%, ${SOL_LYS} 66%, ${SOL} 78%)` }} />

      <div className="relative z-10">
        <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-px)] pt-[clamp(84px,12svh,120px)] lg:pt-[clamp(112px,15vh,150px)]">
          <div className="max-w-[560px]">
            {/* on phones, smaller when the screen is short, so the frame below keeps its room */}
            <h1
              className="text-[length:clamp(34px,min(11.5vw,6.4svh),64px)] font-bold text-[var(--color-glomma-deep)] lg:text-[length:clamp(44px,6vw,92px)]"
              style={{ lineHeight: 0.92, letterSpacing: "-0.035em" }}
            >
              Kongsvinger
              <br />
              Tannhelse
            </h1>
            <p className="mt-2.5 text-[16px] font-medium text-[var(--color-glomma)] md:text-[18px] lg:mt-5 lg:text-[20px]">Tannlegene Hafthun og Zia</p>

            <div className="mt-5 flex flex-col gap-3 lg:mt-7">
              {/* one line on every phone: the two buttons share it, and the icons wait for lg */}
              <div className="flex gap-2 lg:gap-2.5">
                <Link
                  href="/kontakt"
                  className="group inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-[var(--color-glomma)] px-4 py-3.5 text-[14px] font-semibold text-[var(--color-papir)] shadow-[0_12px_30px_-14px_rgba(22,48,59,0.7)] transition-colors duration-300 hover:bg-[var(--color-glomma-deep)] sm:flex-none sm:px-6 lg:px-6"
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

        {/* from lg up, the room beside the words, exactly as on the live hero */}
        <div
          className="absolute inset-y-0 left-[var(--fra)] right-0 hidden [clip-path:polygon(14%_0,100%_0,100%_100%,0_100%)] lg:block"
          style={{ "--fra": "calc(max(0px, (100vw - var(--container-max)) / 2) + var(--container-px) + 5.4 * clamp(44px, 6vw, 92px) + 24px)" } as CSSProperties}
        >
          <Image src={ROMMET} alt="Behandlingsrommet: stolen, instrumentene og brettet" fill priority sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover lg:object-[50%_32%]" />
        </div>
      </div>

      {/* phones and tablets: the frame fills what's left of the screen */}
      <MobilBytte variant={variant} className="relative mt-5 min-h-[200px] flex-1 lg:hidden" />

      <Utsikten />
    </section>
  );
}

export const MOBIL_MOCKUPS = {
  "1": { navn: "Snitt", Hero: () => <Hero variant="snitt" /> },
  "2": { navn: "Sola", Hero: () => <Hero variant="sola" /> },
  "3": { navn: "Fremkalling", Hero: () => <Hero variant="fremkalling" /> },
};
