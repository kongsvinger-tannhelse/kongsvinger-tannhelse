import { Cookie, Mail, ShieldCheck, UserRound } from "lucide-react";
import { klinikk } from "@/data/klinikk";
import { Innhold, Lenke, Seksjon, Topp, Ut, type Del } from "@/components/tekstside";

/* /personvern: what the site does with what you tell it, in plain words.
   Only what the code really does: the form mails the message to the clinic
   (components/kontakt/melding.ts), nothing is stored, no cookies, no
   analytics, the font is served from the site itself, and the map is a
   drawing with a link to Google Maps. Change this page before the site
   starts doing anything new with visitors' data. */

const { adresse, telefon, epost } = klinikk;

export const OPPDATERT = "2026-10-08";
const DATO = new Date(`${OPPDATERT}T12:00:00Z`).toLocaleDateString("nb-NO", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Oslo" });

const DELER = [
  { id: "ansvarlig", tittel: "Hvem som er ansvarlig" },
  { id: "skjema", tittel: "Når du skriver til oss" },
  { id: "hvor-lenge", tittel: "Hvor lenge vi tar vare på det" },
  { id: "besok", tittel: "Når du besøker nettsiden" },
  { id: "hvem-far", tittel: "Hvem som får opplysningene" },
  { id: "rettigheter", tittel: "Rettighetene dine" },
  { id: "klage", tittel: "Klage til Datatilsynet" },
] as const satisfies readonly Del[];

const DEL = Object.fromEntries(DELER.map((d) => [d.id, d])) as Record<(typeof DELER)[number]["id"], Del>;

const KORT = [
  { ikon: Cookie, tekst: "Nettsiden bruker ingen informasjonskapsler (cookies), ingen sporing og ingen besøksstatistikk." },
  { ikon: Mail, tekst: "Skriver du til oss, går meldingen som e-post rett til innboksen vår. Vi bruker den bare til å svare deg." },
  { ikon: ShieldCheck, tekst: "Vi selger ikke opplysningene dine, og deler dem bare med dem som driver nettsiden og e-posten for oss." },
  { ikon: UserRound, tekst: "Du kan alltid spørre hva vi har om deg, og be oss rette eller slette det." },
];

/** Not yet confirmed by the clinic: shown plainly until it is. */
function Ubekreftet({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[14px] border border-dashed border-[#B98A2E] bg-[#FBF3E1] px-4 py-3 text-[15.5px] leading-[1.6] text-[#5E4A1F]">
      <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#8A6420]">Ikke bekreftet av klinikken ennå</p>
      <p className="mt-1">{children}</p>
    </div>
  );
}

export function PersonvernSide() {
  return (
    <main className="overflow-x-clip bg-[var(--color-papir)]">
      <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-px)] pb-[clamp(104px,11vw,150px)] pt-[clamp(104px,12vw,150px)]">
        <Topp side="Personvern" tittel="Personvern">
          <p>
            Slik behandler vi opplysningene dine når du besøker nettsiden og når du skriver til oss. Kort fortalt: vi samler inn så lite som mulig, og bare
            det vi trenger for å svare deg.
          </p>
        </Topp>

        <div className="mt-12 grid gap-12 md:mt-16 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
          <Innhold deler={DELER} />

          <div className="min-w-0 max-w-[820px]">
            {/* the short version */}
            <section aria-labelledby="kort-tittel" className="rounded-[28px] bg-[var(--color-glomma)] px-6 py-8 text-[var(--color-papir)] sm:px-10 sm:py-10">
              <h2 id="kort-tittel" className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[var(--color-bjork)]">
                Kort fortalt
              </h2>
              <ul className="mt-5 grid gap-x-10 gap-y-5 sm:grid-cols-2">
                {KORT.map(({ ikon: Ikon, tekst }) => (
                  <li key={tekst} className="flex gap-3.5 text-[16px] leading-[1.55] text-[var(--color-tekst-lys)]">
                    <Ikon className="mt-0.5 size-5 shrink-0 text-[var(--color-bjork)]" strokeWidth={1.6} aria-hidden="true" />
                    {tekst}
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-10 rounded-[28px] bg-[#FBF8F1] px-[clamp(22px,5vw,64px)] py-[clamp(32px,5vw,56px)] shadow-[0_40px_70px_-50px_rgba(10,25,32,0.5)] ring-1 ring-[var(--color-strek)] md:mt-12">
              <Seksjon del={DEL.ansvarlig} nr={1}>
                <p>
                  {klinikk.navn} er ansvarlig for opplysningene som samles inn gjennom denne nettsiden. Har du spørsmål om personvern, eller vil du bruke
                  rettighetene dine, kontakt oss:
                </p>
                <address className="not-italic">
                  <span className="block font-semibold text-[var(--color-glomma-deep)]">{klinikk.navn}</span>
                  {adresse.gate}, {adresse.postnummer} {adresse.sted}
                  <br />
                  <Lenke href={`mailto:${epost}`}>{epost}</Lenke>
                  <br />
                  <Lenke href={telefon.lenke}>{telefon.visning}</Lenke>
                </address>
                <p>
                  Denne siden gjelder nettsiden. Når du er pasient hos oss, fører vi pasientjournal etter reglene i helselovgivningen. Spør oss gjerne
                  om det når du er her.
                </p>
              </Seksjon>

              <Seksjon del={DEL.skjema} nr={2}>
                <p>
                  I skjemaet på <Lenke href="/kontakt">kontaktsiden</Lenke> og på forsiden ber vi om navn, telefonnummer, e-postadresse og meldingen din.
                  Vi bruker dem bare til å svare deg, for eksempel for å finne en time som passer.
                </p>
                <p>
                  Når du trykker Send, går meldingen fra nettsiden som en e-post til innboksen vår, {epost}. Nettsiden lagrer ingen kopi av den, og
                  den havner ikke i noe register eller noen database.
                </p>
                <p>
                  Skjemaet er ikke laget for helseopplysninger. Skriv derfor ikke personnummer eller noe om helsen din der. Det tar vi heller på
                  telefon, eller når du kommer til oss.
                </p>
                <p>
                  For å stoppe søppelpost teller nettsiden hvor mange meldinger som kommer fra samme IP-adresse i løpet av ti minutter. Tellingen
                  skjer bare i serverens minne og blir ikke skrevet ned. Skjemaet har også et skjult felt som bare roboter fyller ut.
                </p>
                <p>
                  Grunnlaget i loven er at vi har en berettiget interesse i å svare når du tar kontakt (personvernforordningen artikkel 6 nr. 1
                  bokstav f). Ber du om en time, er grunnlaget også at du vil inngå en avtale med oss (bokstav b).
                </p>
              </Seksjon>

              <Seksjon del={DEL["hvor-lenge"]} nr={3}>
                <p>Vi tar bare vare på meldingen så lenge vi trenger den for å svare deg og følge opp det du spør om.</p>
                <Ubekreftet>Hvor lenge e-postene blir liggende i innboksen før de slettes. Her kommer klinikkens egen rutine.</Ubekreftet>
              </Seksjon>

              <Seksjon del={DEL.besok} nr={4}>
                <p>
                  Som alle nettsider får serveren noen tekniske opplysninger når du åpner en side: IP-adressen din, hvilken side du ba om, når du gjorde
                  det, og hva slags nettleser du bruker. Vercel, som drifter nettsiden for oss, bruker dem til å levere sidene og til å finne feil og
                  stoppe angrep, og tar vare på dem i en begrenset tid. Grunnlaget er vår berettigede interesse i en trygg nettside som virker
                  (artikkel 6 nr. 1 bokstav f).
                </p>
                <p>
                  <strong className="font-semibold text-[var(--color-glomma-deep)]">Ingen informasjonskapsler.</strong> Nettsiden setter ingen
                  informasjonskapsler (cookies) og lagrer ingenting på enheten din. Derfor spør vi deg heller ikke om samtykke.
                </p>
                <p>
                  <strong className="font-semibold text-[var(--color-glomma-deep)]">Ingen statistikk eller sporing.</strong> Vi bruker i dag ingen
                  besøksstatistikk, ingen annonsesporing og ingen knapper fra sosiale medier. Tar vi i bruk besøksstatistikk senere, oppdaterer vi
                  denne siden først. Lagrer verktøyet noe på enheten din, spør vi deg om lov før det skjer.
                </p>
                <p>
                  <strong className="font-semibold text-[var(--color-glomma-deep)]">Skrift og kart.</strong> Skriften på siden ligger på vår egen
                  server, så nettleseren din henter ingenting fra Google når du åpner siden. Kartet er en tegning, ikke et innebygd kart. Først når du
                  trykker på kartet eller på «Veibeskrivelse», åpnes Google Maps, og da gjelder Googles egne regler. Det samme gjelder lenkene våre
                  til Helsenorge og andre nettsider.
                </p>
              </Seksjon>

              <Seksjon del={DEL["hvem-far"]} nr={5}>
                <p>To leverandører får opplysningene, fordi de driver tjenestene vi bruker:</p>
                <ul>
                  <li>
                    <strong className="font-semibold text-[var(--color-glomma-deep)]">Vercel Inc.</strong> drifter nettsiden. Vercel er et amerikansk
                    selskap, og serveren som tar imot skjemaet, står i USA. Overføringen dit bygger på EUs rammeverk for personvern mellom EU og USA
                    (EU-U.S. Data Privacy Framework), som Vercel er sertifisert under.
                  </li>
                  <li>
                    <strong className="font-semibold text-[var(--color-glomma-deep)]">one.com</strong> leverer e-posten vår. Meldingen sendes gjennom
                    one.com til innboksen vår, som ligger hos dem i Danmark.
                  </li>
                </ul>
                <p>Ellers gir vi ikke opplysningene dine til noen, med mindre loven krever det. Vi selger dem aldri.</p>
              </Seksjon>

              <Seksjon del={DEL.rettigheter} nr={6}>
                <p>Du har rett til å:</p>
                <ul>
                  <li>få vite hvilke opplysninger vi har om deg, og få en kopi (innsyn)</li>
                  <li>få rettet opplysninger som er feil</li>
                  <li>få slettet opplysninger vi ikke lenger trenger</li>
                  <li>be oss begrense hva vi bruker opplysningene til, eller protestere mot at vi bruker dem</li>
                  <li>få opplysningene du har gitt oss, i et format du kan ta med deg</li>
                </ul>
                <p>
                  Send en e-post til <Lenke href={`mailto:${epost}`}>{epost}</Lenke> eller ring <Lenke href={telefon.lenke}>{telefon.visning}</Lenke>. Det er
                  gratis, og vi svarer senest innen en måned. Vi kan be deg bekrefte hvem du er, så vi ikke gir opplysningene dine til feil person.
                </p>
              </Seksjon>

              <Seksjon del={DEL.klage} nr={7}>
                <p>
                  Mener du at vi behandler opplysningene dine i strid med reglene, kan du{" "}
                  <Ut href="https://www.datatilsynet.no/om-datatilsynet/kontakt-oss/klage-til-datatilsynet/">klage til Datatilsynet</Ut>. Si gjerne fra
                  til oss først, så kan vi rette det med en gang.
                </p>
                <p>
                  Reglene står i <Ut href="https://lovdata.no/lov/2018-06-15-38">personopplysningsloven</Ut>, som gjør EUs personvernforordning (GDPR)
                  til norsk lov.
                </p>
              </Seksjon>

              <p className="mt-2 border-t border-dashed border-[var(--color-strek)] pt-6 text-[14px] text-[var(--color-tekst-svak)]">
                Sist oppdatert <time dateTime={OPPDATERT}>{DATO}</time>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
