import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { klinikk, utsiktKreditt } from "@/data/klinikk";
import { Utsikt } from "@/components/forside/utsikt/Utsikt";
import { Infolinje } from "@/components/forside/Infolinje";
import { Klinikkbilder } from "@/components/forside/Klinikkbilder";
import s from "./hero.module.css";

/**
 * «Langs elva». On first paint the camera follows Glomma from the fortress,
 * from the farms on the left down to the bend in the river, and comes to
 * rest. The name arrives in white, low over the dark treetops, the way a film
 * puts its title over the opening shot. Then the clinic's own rooms are laid
 * in beside the view, and the facts run along the bottom like credits.
 */
export function Hero() {
  return (
    <section aria-label="Velkommen" className={`${s.glid} relative h-[100svh] min-h-[640px] overflow-hidden`}>
      <Utsikt zoom={1.22} fx={0.62} fy={0.46} fxSmal={0.7} />
      <div aria-hidden="true" className={`${s.skygge} hero-loft pointer-events-none absolute inset-0`} style={{ animationDelay: "1.8s" }} />

      {/* The clinic, beside the view */}
      <div className="absolute inset-x-0 top-[84px] md:top-[clamp(96px,13vh,132px)]">
        <div className="mx-auto flex w-full max-w-[var(--container-max)] justify-end px-[var(--container-px)]">
          <Klinikkbilder />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0">
        <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-px)] pb-6 md:pb-9">
          <h1 className="text-white" style={{ fontSize: "clamp(48px, 7.4vw, 120px)", lineHeight: 0.9, letterSpacing: "-0.055em" }}>
            <span className="sr-only">{klinikk.navn}</span>
            {[
              { tekst: "Kongsvinger", vekt: 700 },
              { tekst: "Tannhelse", vekt: 360 },
            ].map((l, i) => (
              <span key={l.tekst} aria-hidden="true" className="block overflow-hidden pb-[0.07em]">
                <span className="hero-linje inline-block" style={{ fontWeight: l.vekt, animationDelay: `${2.6 + i * 0.12}s` }}>
                  {l.tekst}
                </span>
              </span>
            ))}
          </h1>

          <div className="mt-6 grid grid-cols-1 gap-6 md:mt-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
            <div className="hero-loft flex flex-col gap-5" style={{ animationDelay: "3s" }}>
              <p className="text-[18px] font-medium leading-[1.4] text-white/85">Tannlegene Hafthun og Zia, {klinikk.adresse.gate}.</p>
              <div className="flex flex-wrap gap-2.5">
                <Link
                  href="/kontakt"
                  className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-papir)] px-6 py-3.5 text-[14px] font-semibold text-[var(--color-glomma-deep)] transition-colors duration-300 hover:bg-white"
                >
                  Bestill time
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
                <a
                  href={klinikk.telefon.lenke}
                  className="inline-flex items-center rounded-full border border-white/35 px-5 py-3.5 text-[14px] font-medium text-white backdrop-blur-sm transition-colors duration-300 hover:border-white/70"
                >
                  Ring {klinikk.telefon.visning}
                </a>
              </div>
            </div>
            <div className="hero-loft lg:min-w-[640px]" style={{ animationDelay: "3.2s" }}>
              <Infolinje variant="film" kreditt={{ navn: utsiktKreditt.fotograf, href: utsiktKreditt.href }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
