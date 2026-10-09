"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useInView, useReducedMotion } from "framer-motion";
import { Opp } from "@/components/forside/omoss/deler";
import { INNLEDNING, Kartkreditt, Kontaktlinje, Tittel } from "@/components/kontakt/Detaljer";
import { Kart } from "@/components/kontakt/Kart";
import { Skjema } from "@/components/kontakt/Skjema";
import { klinikk } from "@/data/klinikk";
import { Frimerke, Poststempel } from "./deler";

/**
 * «Kontakt», «Postkortet». Under the heading, phone, e-mail and opening hours
 * in one line. Then a postcard to the clinic stands up on the hero's spring:
 * its picture side is the drawn map of the clinic's part of town (a link to
 * Google Maps, with the pin dropping onto Fjellgata 4); its writing side is
 * the form, on writing lines, with the clinic's address printed where the
 * address goes, a stamp with the clinic's tooth, and the opening hours as
 * the postmark, pressed on once the card stands. Under the card, a link to
 * the Kontakt page for the way here and what to do with toothache.
 */

/** The map on the card, in map units (see kartdata.ts): taller beside the form, wider on phones. */
const BILDE = { x: -205, y: -330, b: 490, h: 560 };
const BILDE_SMAL = { x: -190, y: -150, b: 440, h: 380 };

const { adresse } = klinikk;

export function Kontakt() {
  const redusert = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement | null>(null);
  const vist = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <section id="kontakt" aria-labelledby="kontakt-tittel" className="bg-[var(--color-papir)] pb-[clamp(88px,10vw,140px)] pt-[clamp(88px,11vw,152px)]">
      <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-px)]">
        <div className="md:flex md:items-end md:justify-between md:gap-12">
          <Tittel id="kontakt-tittel" />
          <p className="mt-4 max-w-[44ch] text-[17px] leading-[1.6] text-[var(--color-tekst-2)] md:mt-0">{INNLEDNING}</p>
        </div>

        <Kontaktlinje className="mt-10 md:mt-12" />

        <div ref={ref} className="mt-12 md:mt-16">
          <Opp vis={vist} n={0} redusert={redusert}>
            <div className="grid grid-cols-1 gap-x-8 rounded-[6px] bg-[#FFFDF8] p-3 shadow-[0_34px_70px_-34px_rgba(10,25,32,0.6),0_2px_0_rgba(10,25,32,0.04)] sm:p-4 md:grid-cols-2 md:p-5">
              {/* the picture side */}
              <div className="relative">
                <Kart utsnitt={BILDE_SMAL} vis={vist} redusert={redusert} skrift={13} className="rounded-[3px] md:hidden" />
                <Kart utsnitt={BILDE} vis={vist} redusert={redusert} skrift={13} className="hidden h-full rounded-[3px] md:block" />
              </div>

              {/* the writing side */}
              <div className="relative px-2 pb-3 pt-6 sm:px-4 md:pb-4 md:pl-2 md:pr-6 md:pt-6">
                <div className="flex items-start justify-between gap-6">
                  <div className="pt-1">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-tekst-svak)]">Til</p>
                    <address className="mt-2 not-italic">
                      {[klinikk.navn, adresse.gate, `${adresse.postnummer} ${adresse.sted}`].map((linje) => (
                        <span key={linje} className="block border-b border-[rgba(23,34,40,0.2)] py-1 text-[15.5px] font-medium text-[var(--color-glomma-deep)]">
                          {linje}
                        </span>
                      ))}
                    </address>
                  </div>
                  <div className="relative shrink-0">
                    <Frimerke />
                    <Poststempel vis={vist} />
                  </div>
                </div>

                <Skjema stil="linjer" tittel={null} className="mt-8" />
              </div>
            </div>
          </Opp>
          <div className="mt-3 flex flex-col-reverse gap-x-6 gap-y-4 sm:flex-row sm:items-start sm:justify-between">
            <Kartkreditt />
            {/* the rest is on the Kontakt page */}
            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-2 self-start text-[16px] font-semibold text-[var(--color-glomma)] underline decoration-[rgba(34,64,77,0.3)] underline-offset-[5px] transition-colors hover:text-[var(--color-glomma-deep)] hover:decoration-current"
            >
              Alt om å finne oss, og akutt tannpine
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
