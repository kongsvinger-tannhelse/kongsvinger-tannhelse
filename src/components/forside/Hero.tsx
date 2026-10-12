import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { klinikk } from "@/data/klinikk";
import { Utsikt, type Lag } from "@/components/forside/utsikt/Utsikt";
import { Klinikkbilder } from "@/components/forside/Klinikkbilder";
import { Apningsstatus } from "@/components/forside/Apningsstatus";
import farTegnet from "@/components/forside/utsikt/far-tegnet.webp";
import naerTegnet from "@/components/forside/utsikt/near-tegnet.webp";

/**
 * The view is drawn (tools/tegn_hero.py): morning over Glomma, the sun low
 * over the hills, the town and the fortress on the right. Phones get it at
 * 2560 px, so the houses and the bridge stay crisp enlarged. The photograph
 * it replaced is still Utsikt's default.
 */
const TEGNING: Lag = { far: farTegnet, near: naerTegnet, telefon: 2560 };

/**
 * «Langs elva». On first paint the camera follows Glomma from the fortress,
 * from the farms on the left down to the bend in the river, and comes to
 * rest. The name stands in the sky from the start, top left, in the river's
 * own dark slate; while the camera settles the buttons rise under it, and the
 * clinic's rooms appear beside it in a square pane with a ring of light: all
 * of it in about two seconds. The words don't wait for the pictures; only the
 * view and the pane do. Under the buttons: whether the clinic is open right now, and
 * what to do with a toothache. Nothing stands at the foot of the view.
 *
 * (Earlier versions of the clinic photos are kept on the git branch
 * mockups/klinikkbilder.)
 */
export function Hero() {
  return (
    <section aria-label="Velkommen" className="relative h-[100svh] min-h-[640px] overflow-hidden">
      {/* The wrapper spans the hero; only what is in it takes the pointer. It
          comes before the view in the HTML (and over it by z-index), so the
          browser paints the name in its very first frame. */}
      <div className="pointer-events-none absolute inset-x-0 top-[84px] z-10 md:top-[clamp(96px,13vh,132px)]">
        <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-6 px-[var(--container-px)] md:flex-row md:items-start md:justify-between md:gap-10 [&>*]:pointer-events-auto">
          <div className="pt-1">
            <h1 className="text-[var(--color-glomma-deep)]" style={{ fontSize: "clamp(44px, 6.4vw, 104px)", lineHeight: 0.92, letterSpacing: "-0.035em" }}>
              <span className="sr-only">{klinikk.navn}</span>
              {/* there from the first frame: the name is the page's largest
                  content, which PageSpeed times (LCP), so it doesn't slide in */}
              {["Kongsvinger", "Tannhelse"].map((tekst) => (
                <span key={tekst} aria-hidden="true" className="block pb-[0.07em] font-bold">
                  {tekst}
                </span>
              ))}
            </h1>

            <p className="hero-loft mt-4 text-[18px] font-medium leading-[1.4] text-[var(--color-glomma)] md:mt-5 md:text-[20px]" style={{ animationDelay: "0.95s" }}>
              Tannlegene Hafthun og Zia, {klinikk.adresse.gate}.{" "}
              <br />
              Vi tar imot nye pasienter.
            </p>

            {/* the two buttons, and under them, as wide as both together, a white note
                (not a button): open or closed right now, and what to do with a toothache */}
            <div className="hero-loft mt-7 inline-flex flex-col gap-2.5" style={{ animationDelay: "1.05s" }}>
              <div className="flex gap-2.5">
                <Link
                  href="/kontakt"
                  className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-glomma)] px-6 py-3.5 text-[14px] font-semibold text-[var(--color-papir)] shadow-[0_12px_30px_-14px_rgba(22,48,59,0.7)] transition-colors duration-300 hover:bg-[var(--color-glomma-deep)]"
                >
                  Be om time
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
                <a
                  href={klinikk.telefon.lenke}
                  className="inline-flex items-center rounded-full border-2 border-[var(--color-teal)] bg-white px-5 py-3 text-[14px] font-medium text-[var(--color-glomma-deep)] transition-colors duration-300 hover:bg-[#EAF6F8]"
                >
                  Ring {klinikk.telefon.visning}
                </a>
              </div>
              <div className="rounded-[20px] bg-white px-5 py-3.5 text-[14px] leading-[1.45]">
                <p className="flex items-center gap-2 font-medium text-[var(--color-glomma-deep)]">
                  <Apningsstatus />
                </p>
                <p className="mt-1 text-[var(--color-tekst-2)]">
                  Akutt tannpine?{" "}
                  <a href={klinikk.telefon.lenke} className="font-medium text-[var(--color-glomma-deep)] underline decoration-1 underline-offset-[3px]">
                    Ring oss
                  </a>{" "}
                  så fort du kan.
                </p>
              </div>
            </div>
          </div>

          <Klinikkbilder />
        </div>
      </div>

      <Utsikt glid zoom={1.22} fx={0.62} fy={0.46} fxSmal={0.7} lag={TEGNING} />
    </section>
  );
}
