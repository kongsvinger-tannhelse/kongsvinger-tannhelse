import { klinikk } from "@/data/klinikk";
import { Lenke, Topp, Ut } from "@/components/tekstside";

/* /personvern: the privacy notice, kept to what the law asks for (GDPR
   article 13): who is responsible, what is collected and why, the legal
   basis, who gets it, for how long, your rights, and where to complain.
   It says only what the site really does: the form mails the message to
   the clinic (components/kontakt/melding.ts) and keeps no copy, and there
   are no cookies and no analytics. Change it before the site starts doing
   anything new with visitors' data. */

const { adresse, telefon, epost } = klinikk;

export const OPPDATERT = "2026-10-08";
const DATO = new Date(`${OPPDATERT}T12:00:00Z`).toLocaleDateString("nb-NO", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Oslo" });

const STERK = "font-semibold text-[var(--color-glomma-deep)]";

/** Not yet confirmed by the clinic: shown plainly until it is. */
function Ubekreftet({ children }: { children: React.ReactNode }) {
  return (
    <span className="mt-2 block rounded-[12px] border border-dashed border-[#B98A2E] bg-[#FBF3E1] px-3.5 py-2 text-[14.5px] leading-[1.55] text-[#5E4A1F]">
      <span className="font-semibold">Ikke bekreftet av klinikken ennå:</span> {children}
    </span>
  );
}

const RADER: { tittel: string; tekst: React.ReactNode }[] = [
  {
    tittel: "Hvem er ansvarlig",
    tekst: (
      <>
        <span className={STERK}>{klinikk.navn}</span>, {adresse.gate}, {adresse.postnummer} {adresse.sted}.<br />
        <Lenke href={`mailto:${epost}`}>{epost}</Lenke>
        <br />
        <Lenke href={telefon.lenke}>{telefon.visning}</Lenke>
      </>
    ),
  },
  {
    tittel: "Kontaktskjemaet",
    tekst: (
      <>
        Skriver du til oss, får vi navnet ditt, telefonnummeret, e-postadressen og meldingen. Vi bruker det bare til å svare deg. Meldingen kommer
        som en e-post til innboksen vår, og nettsiden lagrer ingen kopi. For å stoppe søppelpost ser serveren på IP-adressen din. Det er frivillig
        å bruke skjemaet; du kan også ringe. Ikke skriv personnummer eller helseopplysninger i skjemaet.
      </>
    ),
  },
  {
    tittel: "Når du besøker siden",
    tekst: (
      <>
        Serveren registrerer IP-adressen din, hvilken side du åpner og når, for å vise sidene og beskytte dem mot angrep. Nettsiden bruker ingen
        informasjonskapsler (cookies) og ingen besøksstatistikk.
      </>
    ),
  },
  {
    tittel: "Grunnlag i loven",
    tekst: (
      <>
        Vår berettigede interesse i å svare dem som tar kontakt, og i en trygg nettside (personvernforordningen artikkel 6 nr. 1 bokstav f).
      </>
    ),
  },
  {
    tittel: "Hvem får opplysningene",
    tekst: (
      <>
        <span className={STERK}>Vercel Inc.</span> drifter nettsiden fra USA. Overføringen dit bygger på EU-U.S. Data Privacy Framework, som Vercel er
        sertifisert under. <span className={STERK}>one.com</span> leverer e-posten vår fra Danmark. Ingen andre får opplysningene, med mindre loven
        krever det.
      </>
    ),
  },
  {
    tittel: "Hvor lenge",
    tekst: (
      <>
        Vi sletter meldingen når vi ikke lenger trenger den for å svare deg. Vercel lagrer de tekniske opplysningene bare en begrenset tid.
        <Ubekreftet>klinikkens egen rutine for når e-poster fra skjemaet slettes.</Ubekreftet>
      </>
    ),
  },
  {
    tittel: "Rettighetene dine",
    tekst: (
      <>
        Du kan be om innsyn i hva vi har om deg, og om å få det rettet eller slettet. Du kan også be oss begrense bruken, protestere mot den, eller
        få opplysningene utlevert. Kontakt oss på e-post eller telefon.
      </>
    ),
  },
  {
    tittel: "Klage",
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

        <dl className="mt-10 rounded-[28px] bg-[#FBF8F1] px-[clamp(22px,5vw,56px)] py-[clamp(14px,2.5vw,28px)] shadow-[0_40px_70px_-50px_rgba(10,25,32,0.5)] ring-1 ring-[var(--color-strek)] md:mt-14">
          {RADER.map((r) => (
            <div key={r.tittel} className="grid gap-1.5 border-b border-dashed border-[var(--color-strek)] py-6 last:border-b-0 md:grid-cols-[200px_minmax(0,1fr)] md:gap-10">
              <dt className="text-[13px] font-semibold uppercase leading-[1.5] tracking-[0.12em] text-[var(--color-teal)] md:pt-1">{r.tittel}</dt>
              <dd className="max-w-[60ch] text-[17px] leading-[1.65] text-[var(--color-tekst)]">{r.tekst}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-6 text-[14px] text-[var(--color-tekst-svak)]">
          Sist oppdatert <time dateTime={OPPDATERT}>{DATO}</time>.
        </p>
      </div>
    </main>
  );
}
