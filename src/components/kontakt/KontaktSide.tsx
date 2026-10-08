"use client";

import { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Phone } from "lucide-react";
import { Smuler } from "@/components/Smuler";
import { Skog } from "@/components/omoss/deler";
import { klinikk } from "@/data/klinikk";
import { INNLEDNING, Kartkreditt, Kontaktlinje } from "./Detaljer";
import { Elva } from "./Elva";
import { Kart } from "./Kart";
import { Skjema } from "./Skjema";

/**
 * The Kontakt page. The heading and the old site's line, phone, e-mail and
 * hours in one line; then Glomma across the page; then the form beside what
 * to do with toothache and how to find the clinic, with the drawn map. The
 * page ends at the river under the bridge, which the footer brings.
 */

const { telefon, adresse, apningstider: tid } = klinikk;

/** The map on the visit card, in map units (see kartdata.ts): the clinic and Glomma. */
const UTSNITT = { x: -190, y: -190, b: 480, h: 390 };

/** Google Maps with the way to the clinic from where you are. */
const VEIBESKRIVELSE = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${adresse.gate}, ${adresse.postnummer} ${adresse.sted}`)}`;

const h2 = "text-[24px] font-bold leading-[1.1] tracking-[-0.03em] md:text-[28px]";

export function KontaktSide() {
  const redusert = useReducedMotion() ?? false;
  const kartRef = useRef<HTMLDivElement | null>(null);
  const kartVist = useInView(kartRef, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <main className="overflow-x-clip bg-[var(--color-papir)]">
      <header className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-px)] pt-[clamp(104px,12vw,150px)]">
        <Smuler side="Kontakt" />
        <div className="mt-6 md:flex md:items-end md:justify-between md:gap-12">
          <h1 className="font-bold text-[var(--color-glomma-deep)]" style={{ fontSize: "clamp(42px, 6vw, 80px)", lineHeight: 0.95, letterSpacing: "-0.055em" }}>
            Kontakt{" "}
            <br />
            tannlegen
          </h1>
          <p className="mt-5 max-w-[44ch] text-[18px] leading-[1.6] text-[var(--color-tekst-2)] md:mt-0">
            {INNLEDNING} Ring oss, send en e-post, eller skriv til oss i skjemaet. Du finner oss i {adresse.gate}, midt i Kongsvinger.
          </p>
        </div>
        <Kontaktlinje className="mt-10 md:mt-12" />
      </header>

      {/* Glomma */}
      <Skog className="relative mt-6 h-[200px] w-full md:mt-4 md:h-[clamp(220px,20vw,300px)]">
        <div className="absolute inset-0 md:hidden">
          <Elva W={600} H={300} id="elva-smal" />
        </div>
        <div className="absolute inset-0 hidden md:block">
          <Elva W={1600} H={300} id="elva-bred" />
        </div>
      </Skog>

      <div className="mx-auto grid w-full max-w-[var(--container-max)] gap-6 px-[var(--container-px)] pb-[clamp(104px,11vw,150px)] pt-[clamp(40px,5vw,64px)] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-8">
        {/* the form */}
        <section aria-label="Send oss en melding" className="rounded-[28px] bg-[#FBF8F1] p-6 lg:sticky lg:top-28 lg:self-start shadow-[0_30px_60px_-34px_rgba(10,25,32,0.5)] sm:p-9 lg:p-11">
          <Skjema />
        </section>

        <div className="flex flex-col gap-6 lg:gap-8">
          {/* toothache */}
          <section aria-labelledby="akutt-tittel" className="rounded-[28px] bg-[var(--color-glomma)] p-6 text-[var(--color-papir)] sm:p-8">
            <h2 id="akutt-tittel" className={h2}>
              Akutt tannpine?
            </h2>
            <p className="mt-3 text-[16px] leading-[1.6] text-[var(--color-tekst-lys-2)]">
              Ring oss så tidlig på dagen som mulig, så finner vi en time. Vi har åpent {tid.dager.toLowerCase()} {tid.fra}–{tid.til}.
            </p>
            <p className="mt-3 text-[16px] leading-[1.6] text-[var(--color-tekst-lys-2)]">
              Utenom åpningstiden, eller hvis du har feber eller hevelse som gjør det tungt å svelge eller puste, ring legevakten på 116 117.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              <a href={telefon.lenke} className="inline-flex items-center gap-2 rounded-full bg-[var(--color-papir)] px-5 py-3 text-[15px] font-semibold text-[var(--color-glomma-deep)] transition-colors duration-300 hover:bg-white">
                <Phone className="size-4" aria-hidden="true" />
                {telefon.visning}
              </a>
              <a href="tel:116117" className="inline-flex items-center gap-2 rounded-full border border-[var(--color-strek-lys)] px-5 py-3 text-[15px] font-semibold text-[var(--color-papir)] transition-colors duration-300 hover:border-[var(--color-papir)]">
                Legevakten 116 117
              </a>
            </div>
          </section>

          {/* finding the clinic */}
          <section aria-labelledby="besok-tittel" className="rounded-[28px] bg-[#FBF8F1] p-3 shadow-[0_30px_60px_-34px_rgba(10,25,32,0.5)] sm:p-4">
            <div ref={kartRef}>
              <Kart utsnitt={UTSNITT} vis={kartVist} redusert={redusert} skrift={12} className="rounded-[20px]" />
            </div>
            <div className="px-3 pb-3 pt-5 sm:px-4">
              <h2 id="besok-tittel" className={`${h2} text-[var(--color-glomma-deep)]`}>
                Besøk oss
              </h2>
              <address className="mt-2 text-[16.5px] not-italic leading-[1.6] text-[var(--color-tekst)]">
                {klinikk.navn}
                <br />
                {adresse.gate}, {adresse.postnummer} {adresse.sted}
              </address>
              <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-[15px] tabular-nums">
                <dt className="text-[var(--color-tekst-2)]">{tid.dager}</dt>
                <dd className="font-medium text-[var(--color-tekst)]">
                  {tid.fra}–{tid.til}
                </dd>
                <dt className="text-[var(--color-tekst-2)]">{tid.stengt}</dt>
                <dd className="font-medium text-[var(--color-tekst)]">Stengt</dd>
              </dl>
              <a
                href={VEIBESKRIVELSE}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--color-glomma)] px-5 py-3 text-[15px] font-semibold text-[var(--color-papir)] transition-colors duration-300 hover:bg-[var(--color-glomma-deep)]"
              >
                Veibeskrivelse
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-px group-hover:translate-x-px" aria-hidden="true" />
                <span className="sr-only">(åpnes i Google Maps)</span>
              </a>
              <Kartkreditt className="mt-4" />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
