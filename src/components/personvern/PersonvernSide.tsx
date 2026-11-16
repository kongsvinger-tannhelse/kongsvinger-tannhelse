import { klinikk } from "@/data/klinikk";
import { Lenke, Tekstside, Ut } from "@/components/tekstside";

/* /personvern: the privacy notice, and only what GDPR article 13 asks for:
   who is responsible, what is collected and why, the legal basis, who gets
   it and the transfer to the USA, for how long, your rights, and where to
   complain. Nothing more, by the clinic's wish: no promises, nothing the
   law doesn't require. It describes what the site really does: the form
   mails the message to the clinic (components/kontakt/melding.ts), and the
   server sees the visitor's IP address. The site's functions run in
   Vercel's Stockholm region (arn1, set in the Vercel dashboard on
   2026-10-08). Visits are counted by Vercel Web Analytics and Speed
   Insights (layout.tsx, 2026-10-12), which set no cookies and store nothing
   in the browser, so they need no consent under ekomloven § 3-15. Change
   this page before the site does anything new with visitors' data; anything
   that stores something in the browser needs consent, and a banner. */

const { adresse, telefon, epost } = klinikk;

export const OPPDATERT = "2026-10-12";

const STERK = "font-semibold text-[var(--color-glomma-deep)]";

/* One paragraph per thing article 13 asks for, with no labels: each says
   what it is about in its own first words. */
const AVSNITT: { id: string; tekst: React.ReactNode }[] = [
  {
    id: "ansvarlig",
    tekst: (
      <>
        Ansvarlig for opplysningene er <span className={STERK}>{klinikk.navn}</span>, {adresse.gate}, {adresse.postnummer} {adresse.sted}.<br />
        <Lenke href={`mailto:${epost}`}>{epost}</Lenke>{" "}
        <br />
        <Lenke href={telefon.lenke}>{telefon.visning}</Lenke>
      </>
    ),
  },
  {
    id: "skjema",
    tekst: (
      <>
        Skriver du til oss, får vi navnet ditt, telefonnummeret, e-postadressen og meldingen. Vi bruker det bare til å svare deg. Det er
        frivillig å bruke skjemaet; du kan også ringe.
      </>
    ),
  },
  {
    id: "besok",
    tekst: (
      <>
        Når du besøker siden, registrerer serveren IP-adressen din, hvilken side du åpner og når, for å vise sidene og beskytte dem mot angrep og søppelpost.
      </>
    ),
  },
  {
    id: "statistikk",
    tekst: (
      <>
        Vi teller besøkene med Vercel Web Analytics og Speed Insights: hvilke sider som blir lest, hvor besøkene kommer fra, hva slags enhet og nettleser de
        bruker, og hvor raskt sidene lastes. Vi ser bare samlede tall, ikke hvem du er. Nettsiden bruker ingen informasjonskapsler (cookies) og lagrer ingenting
        på enheten din.
      </>
    ),
  },
  {
    id: "grunnlag",
    tekst: (
      <>
        Grunnlaget i loven er vår berettigede interesse i å svare dem som tar kontakt, i en trygg nettside og i å vite hvordan den blir brukt (personvernforordningen artikkel 6 nr. 1 bokstav f).
      </>
    ),
  },
  {
    id: "mottakere",
    tekst: (
      <>
        Opplysningene går til leverandørene som drifter nettsiden (<span className={STERK}>Vercel Inc.</span>) og e-posten vår (<span className={STERK}>one.com</span>).
        Nettsiden kjører på Vercels servere i Stockholm, men Vercel er et amerikansk selskap, så opplysningene kan bli overført til USA. Det bygger på EU-U.S. Data Privacy Framework, som Vercel er
        sertifisert under.
      </>
    ),
  },
  {
    id: "lagring",
    tekst: (
      <>
        Vi sletter meldingen når vi ikke lenger trenger den for å svare deg. Vercel lagrer de tekniske opplysningene bare en begrenset tid.
      </>
    ),
  },
  {
    id: "rettigheter",
    tekst: (
      <>
        Du kan be om innsyn i hva vi har om deg, og om å få det rettet eller slettet. Du kan også be oss begrense bruken, eller protestere mot den.
        Kontakt oss på e-post eller telefon.
      </>
    ),
  },
  {
    id: "klage",
    tekst: (
      <>
        Mener du at vi bryter reglene, kan du{" "}
        <Ut href="https://www.datatilsynet.no/om-datatilsynet/kontakt-oss/klage-til-datatilsynet/">klage til Datatilsynet</Ut>.
      </>
    ),
  },
];

export function PersonvernSide() {
  return <Tekstside side="Personvern" tittel="Personvern" ingress={<p>Hva nettsiden samler inn om deg, og hvorfor.</p>} avsnitt={AVSNITT} />;
}
