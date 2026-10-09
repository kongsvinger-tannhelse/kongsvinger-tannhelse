import { klinikk } from "@/data/klinikk";
import { Lenke, Topp, Ut } from "@/components/tekstside";

/* /personvern: the privacy notice, and only what GDPR article 13 asks for:
   who is responsible, what is collected and why, the legal basis, who gets
   it and the transfer to the USA, for how long, your rights, and where to
   complain. Nothing more, by the clinic's wish: no promises, nothing the
   law doesn't require. It describes what the site really does: the form
   mails the message to the clinic (components/kontakt/melding.ts), and the
   server sees the visitor's IP address. The site's functions run in
   Vercel's Stockholm region (arn1, set in the Vercel dashboard on
   2026-10-08). Change this page before the site does anything new with
   visitors' data; cookies or analytics need their own line here (and
   consent, under ekomloven § 3-15, if they store anything). */

const { adresse, telefon, epost } = klinikk;

export const OPPDATERT = "2026-10-08";

const STERK = "font-semibold text-[var(--color-glomma-deep)]";

/* One paragraph per thing article 13 asks for, with no labels: each says
   what it is about in its own first words. */
const AVSNITT: { id: string; tekst: React.ReactNode }[] = [
  {
    id: "ansvarlig",
    tekst: (
      <>
        Ansvarlig for opplysningene er <span className={STERK}>{klinikk.navn}</span>, {adresse.gate}, {adresse.postnummer} {adresse.sted}.<br />
        <Lenke href={`mailto:${epost}`}>{epost}</Lenke>
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
    id: "grunnlag",
    tekst: (
      <>
        Grunnlaget i loven er vår berettigede interesse i å svare dem som tar kontakt, og i en trygg nettside (personvernforordningen artikkel 6 nr. 1 bokstav f).
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
  return (
    <main className="overflow-x-clip bg-[var(--color-papir)]">
      <div className="mx-auto w-full max-w-[960px] px-[var(--container-px)] pb-[clamp(104px,11vw,150px)] pt-[clamp(104px,12vw,150px)]">
        <Topp side="Personvern" tittel="Personvern">
          <p>Hva nettsiden samler inn om deg, og hvorfor.</p>
        </Topp>

        <div className="mx-auto mt-10 max-w-[760px] rounded-[28px] bg-[#FFFDF8] px-[clamp(22px,5vw,56px)] py-[clamp(14px,2.5vw,28px)] shadow-[0_40px_70px_-50px_rgba(10,25,32,0.5)] ring-1 ring-[var(--color-strek)] md:mt-14">
          {AVSNITT.map((a) => (
            <p key={a.id} className="border-b border-dashed border-[var(--color-strek)] py-6 text-[17px] leading-[1.65] text-[var(--color-tekst)] last:border-b-0">
              {a.tekst}
            </p>
          ))}
        </div>
      </div>
    </main>
  );
}
