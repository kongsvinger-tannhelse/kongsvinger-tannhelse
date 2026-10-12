import Link from "next/link";
import { klinikk } from "@/data/klinikk";
import { Lenke, Tekstside } from "@/components/tekstside";

/* /vilkar: the terms for using the website, and only the website. The old
   site had none, and the clinic has given no terms for appointments (no
   cancellation fee, no prices), so nothing here speaks of them; add them
   here, in their own paragraph, if the clinic asks. Like /personvern, one
   paragraph per thing, each saying what it is about in its first words. */

const { telefon } = klinikk;

export const OPPDATERT = "2026-10-12";

const LENKE = "font-medium text-[var(--color-glomma)] underline decoration-1 underline-offset-4 hover:text-[var(--color-glomma-deep)]";

const AVSNITT: { id: string; tekst: React.ReactNode }[] = [
  {
    id: "hvem",
    tekst: (
      <>
        Nettsiden er laget av {klinikk.navn}, {klinikk.adresse.gate}, {klinikk.adresse.postnummer} {klinikk.adresse.sted} (org.nr. {klinikk.orgnr}). Når du bruker
        den, godtar du vilkårene på denne siden.
      </>
    ),
  },
  {
    id: "informasjon",
    tekst: (
      <>
        Det som står om tenner og behandlinger her, er generell informasjon. Det erstatter ikke en undersøkelse hos tannlegen, og vi kan ikke si hva som er rett for
        akkurat deg før vi har sett tennene dine. Har du plager, ring oss på <Lenke href={telefon.lenke}>{telefon.visning}</Lenke>.
      </>
    ),
  },
  {
    id: "akutt",
    tekst: (
      <>
        Trenger du hjelp når vi har stengt, ring legevakten på <Lenke href="tel:116117">116 117</Lenke>. Er det livstruende, ring{" "}
        <Lenke href="tel:113">113</Lenke>.
      </>
    ),
  },
  {
    id: "skjema",
    tekst: (
      <>
        En melding gjennom skjemaet er ikke en bestilt time. Du har time når vi har bekreftet den til deg. Haster det, er det raskest å ringe.
      </>
    ),
  },
  {
    id: "lenker",
    tekst: (
      <>
        Lenker til andre nettsider, som Helsenorge og Store medisinske leksikon, er der for at du skal kunne lese mer. Vi har ikke ansvar for innholdet på dem.
      </>
    ),
  },
  {
    id: "rettigheter",
    tekst: (
      <>
        Tekstene, tegningene og bildene på nettsiden tilhører {klinikk.navn}, unntatt det som er merket med en annen lisens nederst på siden. Du kan gjerne lenke
        til sidene, men spør oss før du bruker innholdet andre steder.
      </>
    ),
  },
  {
    id: "personvern",
    tekst: (
      <>
        Hva vi gjør med opplysningene dine, står på{" "}
        <Link href="/personvern" className={LENKE}>
          siden om personvern
        </Link>
        .
      </>
    ),
  },
  {
    id: "endringer",
    tekst: (
      <>
        Vi kan endre vilkårene. Den gjeldende versjonen står alltid her, og ble sist endret{" "}
        {new Date(OPPDATERT).toLocaleDateString("nb-NO", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })}. Spørsmål? Skriv til{" "}
        <Lenke href={`mailto:${klinikk.epost}`}>{klinikk.epost}</Lenke>.
      </>
    ),
  },
];

export function VilkarSide() {
  return <Tekstside side="Vilkår" tittel="Vilkår for bruk" ingress={<p>Hva som gjelder når du bruker nettsiden vår.</p>} avsnitt={AVSNITT} />;
}
