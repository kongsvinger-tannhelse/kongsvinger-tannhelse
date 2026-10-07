import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { klinikk, utsiktKreditt } from "@/data/klinikk";
import { Utsikt } from "@/components/forside/utsikt/Utsikt";
import { Infolinje } from "@/components/forside/Infolinje";
import { Klinikkbilder } from "@/components/forside/Klinikkbilder";
import { cn } from "@/lib/utils";
import s from "./hero.module.css";

/**
 * «Langs elva». On first paint the camera follows Glomma from the fortress,
 * from the farms on the left down to the bend in the river, and comes to
 * rest. The name arrives, low over the dark treetops in white the way a film
 * puts its title over the opening shot, or (tittelOppe) up in the sky in the
 * river's own dark slate, with the buttons under it and nothing at the foot
 * of the view. Then the clinic's own rooms are laid in beside it; with the
 * name low, the facts run along the bottom like credits.
 */
type Props = {
  /** what stands beside the view once the camera has stopped */
  bilder?: React.ReactNode;
  /** placed in the landscape itself, between the far valley and the near treetops */
  mellom?: React.ReactNode;
  /** replaces the two lines of the name (the h1 keeps its accessible text) */
  tittel?: React.ReactNode;
  /** the name and the line under it up in the sky, top left, instead of low over the trees */
  tittelOppe?: boolean;
};

export function Hero({ bilder = <Klinikkbilder />, mellom, tittel, tittelOppe = false }: Props) {
  const navn = (
    <h1
      className={tittelOppe ? "text-[var(--color-glomma-deep)]" : "text-white"}
      style={{ fontSize: tittelOppe ? "clamp(44px, 6.4vw, 104px)" : "clamp(48px, 7.4vw, 120px)", lineHeight: 0.9, letterSpacing: "-0.055em" }}
    >
      <span className="sr-only">{klinikk.navn}</span>
      {tittel ??
        [
          { tekst: "Kongsvinger", vekt: 700 },
          { tekst: "Tannhelse", vekt: tittelOppe ? 700 : 360 },
        ].map((l, i) => (
          <span key={l.tekst} aria-hidden="true" className="block overflow-hidden pb-[0.07em]">
            <span className="hero-linje inline-block" style={{ fontWeight: l.vekt, animationDelay: `${2.6 + i * 0.12}s` }}>
              {l.tekst}
            </span>
          </span>
        ))}
    </h1>
  );

  const undertittel = (
    <p
      className={cn(
        "text-[18px] font-medium leading-[1.4]",
        tittelOppe ? "hero-loft mt-4 text-[var(--color-glomma)] md:mt-5 md:text-[20px]" : "text-white/85"
      )}
      style={tittelOppe ? { animationDelay: "2.9s" } : undefined}
    >
      Tannlegene Hafthun og Zia, {klinikk.adresse.gate}.
    </p>
  );

  const knapper = (
    <div className={cn("flex flex-wrap gap-2.5", tittelOppe && "hero-loft mt-7")} style={tittelOppe ? { animationDelay: "3.05s" } : undefined}>
      <Link
        href="/kontakt"
        className={cn(
          "group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-semibold transition-colors duration-300",
          tittelOppe
            ? "bg-[var(--color-glomma)] text-[var(--color-papir)] shadow-[0_12px_30px_-14px_rgba(22,48,59,0.7)] hover:bg-[var(--color-glomma-deep)]"
            : "bg-[var(--color-papir)] text-[var(--color-glomma-deep)] hover:bg-white"
        )}
      >
        Bestill time
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
      </Link>
      <a
        href={klinikk.telefon.lenke}
        className={cn(
          "inline-flex items-center rounded-full px-5 py-3.5 text-[14px] font-medium backdrop-blur-sm transition-colors duration-300",
          tittelOppe
            ? "border border-[rgba(22,48,59,0.22)] bg-white/55 text-[var(--color-glomma-deep)] hover:bg-white/80"
            : "border border-white/35 text-white hover:border-white/70"
        )}
      >
        Ring {klinikk.telefon.visning}
      </a>
    </div>
  );

  return (
    <section aria-label="Velkommen" className={`${s.glid} relative h-[100svh] min-h-[640px] overflow-hidden`}>
      <Utsikt zoom={1.22} fx={0.62} fy={0.46} fxSmal={0.7} mellom={mellom} />
      {!tittelOppe && (
        <div aria-hidden="true" className={`${s.skygge} hero-loft pointer-events-none absolute inset-0`} style={{ animationDelay: "1.8s" }} />
      )}

      {/* The top: the clinic beside the view, and (tittelOppe) the name in the sky.
          The wrappers span the hero; only what is in them takes the pointer,
          so things placed in the landscape underneath can still be reached. */}
      <div className="pointer-events-none absolute inset-x-0 top-[84px] md:top-[clamp(96px,13vh,132px)]">
        <div
          className={cn(
            "mx-auto flex w-full max-w-[var(--container-max)] px-[var(--container-px)] [&>*]:pointer-events-auto",
            tittelOppe ? "flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10" : "justify-end"
          )}
        >
          {tittelOppe && (
            <div className="pt-1">
              {navn}
              {undertittel}
              {knapper}
            </div>
          )}
          {bilder}
        </div>
      </div>

      {!tittelOppe && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0">
          <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-px)] pb-6 md:pb-9 [&_a]:pointer-events-auto [&_button]:pointer-events-auto">
            {navn}

            <div className="mt-6 grid grid-cols-1 gap-6 md:mt-8 lg:grid-cols-[minmax(320px,1fr)_auto] lg:items-end lg:gap-10 xl:gap-16">
              <div className="hero-loft flex flex-col gap-5" style={{ animationDelay: "3s" }}>
                {undertittel}
                {knapper}
              </div>
              <div className="hero-loft lg:min-w-[540px] xl:min-w-[640px]" style={{ animationDelay: "3.2s" }}>
                <Infolinje variant="film" kreditt={{ navn: utsiktKreditt.fotograf, href: utsiktKreditt.href }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
