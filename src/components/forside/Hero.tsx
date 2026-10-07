import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { klinikk } from "@/data/klinikk";
import { Utsikt } from "@/components/forside/utsikt/Utsikt";
import { Klinikkbilder } from "@/components/forside/Klinikkbilder";
import s from "./hero.module.css";

/**
 * «Langs elva». On first paint the camera follows Glomma from the fortress,
 * from the farms on the left down to the bend in the river, and comes to
 * rest. The name arrives up in the sky, top left, in the river's own dark
 * slate, with the two buttons under it. Then the clinic's rooms pop up beside
 * it: an arch and two squares. Nothing stands at the foot of the view.
 *
 * (Earlier versions of the clinic photos are kept on the git branch
 * mockups/klinikkbilder.)
 */
export function Hero() {
  return (
    <section aria-label="Velkommen" className={`${s.glid} relative h-[100svh] min-h-[640px] overflow-hidden`}>
      <Utsikt zoom={1.22} fx={0.62} fy={0.46} fxSmal={0.7} />

      {/* The wrapper spans the hero; only what is in it takes the pointer. */}
      <div className="pointer-events-none absolute inset-x-0 top-[84px] md:top-[clamp(96px,13vh,132px)]">
        <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-6 px-[var(--container-px)] md:flex-row md:items-start md:justify-between md:gap-10 [&>*]:pointer-events-auto">
          <div className="pt-1">
            <h1 className="text-[var(--color-glomma-deep)]" style={{ fontSize: "clamp(44px, 6.4vw, 104px)", lineHeight: 0.9, letterSpacing: "-0.055em" }}>
              <span className="sr-only">{klinikk.navn}</span>
              {["Kongsvinger", "Tannhelse"].map((tekst, i) => (
                <span key={tekst} aria-hidden="true" className="block overflow-hidden pb-[0.07em]">
                  <span className="hero-linje inline-block font-bold" style={{ animationDelay: `${2.6 + i * 0.12}s` }}>
                    {tekst}
                  </span>
                </span>
              ))}
            </h1>

            <p className="hero-loft mt-4 text-[18px] font-medium leading-[1.4] text-[var(--color-glomma)] md:mt-5 md:text-[20px]" style={{ animationDelay: "2.9s" }}>
              Tannlegene Hafthun og Zia, {klinikk.adresse.gate}.
            </p>

            <div className="hero-loft mt-7 flex flex-wrap gap-2.5" style={{ animationDelay: "3.05s" }}>
              <Link
                href="/kontakt"
                className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-glomma)] px-6 py-3.5 text-[14px] font-semibold text-[var(--color-papir)] shadow-[0_12px_30px_-14px_rgba(22,48,59,0.7)] transition-colors duration-300 hover:bg-[var(--color-glomma-deep)]"
              >
                Bestill time
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
              <a
                href={klinikk.telefon.lenke}
                className="inline-flex items-center rounded-full border border-[rgba(22,48,59,0.22)] bg-white/55 px-5 py-3.5 text-[14px] font-medium text-[var(--color-glomma-deep)] backdrop-blur-sm transition-colors duration-300 hover:bg-white/80"
              >
                Ring {klinikk.telefon.visning}
              </a>
            </div>
          </div>

          <Klinikkbilder />
        </div>
      </div>
    </section>
  );
}
