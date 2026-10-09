import Link from "next/link";
import { ArrowRight, ChevronDown, Phone } from "lucide-react";
import { PUNKTER } from "./punkter";
import { klinikk } from "@/data/klinikk";
import { SIDETITTEL } from "@/lib/sidetittel";

/* The parts of /behandlinger around the treatments themselves: the top,
   the questions, and the data for search engines. */

const { telefon, epost, adresse, apningstider } = klinikk;

/* Questions people ask before they ring a dentist, answered from what the
   clinic's own site says. Shown on the page and given to search engines. */
const SPORSMAL: { s: string; svar: string; lenke?: { href: string; tekst: string } }[] = [
  {
    s: "Hva gjør jeg hvis jeg får akutt tannpine?",
    svar: `Ring oss på ${telefon.visning} så tidlig på dagen som mulig. Vi gjør vårt beste for å gi deg time samme dag. Vi har åpent ${apningstider.dager.toLowerCase()} ${apningstider.fra}–${apningstider.til}. Utenom åpningstiden, eller hvis du har økende hevelse, problemer med å svelge eller høy feber, ring legevakten på 116 117. Har du pustevansker, ring 113.`,
  },
  {
    s: "Hvor ofte bør jeg gå til tannsjekk?",
    svar: "Det er forskjellig fra person til person. Tannlegen ser på tennene og tannkjøttet ditt og anbefaler hvor ofte du bør komme. Jo tidligere et problem blir oppdaget, jo enklere er det å behandle.",
  },
  {
    s: "Hva er forskjellen på en tannbro og et tannimplantat?",
    svar: "Begge erstatter tenner som mangler, og begge sitter fast. En tannbro festes til kroner på nabotennene. Et tannimplantat er en skrue i kjevebenet som bærer en ny tann alene, så nabotennene ikke må slipes. Implantat krever at kjevebenet er godt nok.",
  },
  {
    s: "Kan jeg få hvitere tenner hos tannlegen?",
    svar: "Ja. Ved tannbleking lager vi en blekeskinne etter avtrykk av tennene dine, og du bruker den hjemme med blekegel. Skallfasetter er et annet valg, for en hvitere og jevnere overflate.",
    lenke: { href: "/behandlinger/tannbleking", tekst: "Les om tannbleking" },
  },
  {
    s: "Dekker Helfo noe av tannbehandlingen?",
    svar: "Som hovedregel betaler voksne tannbehandlingen selv, men Helfo dekker en del ved 15 sykdommer og tilstander, og vi har direkte oppgjør med Helfo. Barn, ungdom og unge voksne til og med året de fyller 28, får tannbehandling i Den offentlige tannhelsetjenesten.",
    lenke: { href: "/rad-og-tips/hva-dekker-helfo", tekst: "Les om hva Helfo dekker" },
  },
  {
    s: "Hvordan bestiller jeg time hos tannlegen i Kongsvinger?",
    svar: `Ring ${telefon.visning}, send e-post til ${epost}, eller skriv til oss i skjemaet på kontaktsiden. Du finner oss i ${adresse.gate}, ${adresse.postnummer} ${adresse.sted}.`,
  },
];

const URL = `${klinikk.url}/behandlinger`;

export const strukturert = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalWebPage",
      "@id": `${URL}#side`,
      url: URL,
      name: "Tannbehandling i Kongsvinger",
      inLanguage: "nb-NO",
      about: { "@type": "Dentist", "@id": `${klinikk.url}/#klinikk`, name: klinikk.navn },
      mainEntity: {
        "@type": "ItemList",
        name: "Behandlinger hos Kongsvinger Tannhelse",
        numberOfItems: PUNKTER.length,
        itemListElement: PUNKTER.map((p) => ({
          "@type": "ListItem",
          position: p.nr,
          item: { "@type": "MedicalProcedure", name: p.navn, description: p.tekst, url: `${URL}#${p.id}` },
        })),
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Forside", item: `${klinikk.url}/` },
        { "@type": "ListItem", position: 2, name: "Behandlinger", item: URL },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: SPORSMAL.map((q) => ({ "@type": "Question", name: q.s, acceptedAnswer: { "@type": "Answer", text: q.svar } })),
    },
  ],
};

/** The structured data, as a script tag. */
export function Strukturert() {
  return (
    <script
      type="application/ld+json"
      // Safe: built from the site's own static data, not user input
      dangerouslySetInnerHTML={{ __html: JSON.stringify(strukturert) }}
    />
  );
}

export function Topp({ veiledning }: { veiledning: string }) {
  return (
    <header>
      <nav aria-label="Brødsmuler" className="text-[13px] text-[var(--color-tekst-svak)]">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="underline-offset-4 hover:text-[var(--color-tekst)] hover:underline">
              Forside
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-[var(--color-tekst-2)]">
            Behandlinger
          </li>
        </ol>
      </nav>

      <h1 className="mt-6 font-bold text-[var(--color-glomma-deep)]" style={SIDETITTEL}>
        Tannbehandling{" "}
        <br />i Kongsvinger
      </h1>
      <p className="mt-4 max-w-[54ch] text-[17.5px] md:mt-6 leading-[1.65] text-[var(--color-tekst-2)]">
        Hos oss får du hjelp med det meste: fra tannsjekk og tannrens til akutt tannpine, rotfylling, tannimplantat og tannbleking. {veiledning}
      </p>

      {/* on a phone the bottom bar has these */}
      <div className="mt-8 hidden flex-wrap items-center gap-3 md:flex">
        <a
          href={telefon.lenke}
          className="inline-flex items-center gap-2 rounded-full bg-[var(--color-glomma)] px-6 py-3.5 text-[15px] font-semibold text-[var(--color-papir)] shadow-[0_12px_30px_-14px_rgba(22,48,59,0.7)] transition-colors duration-300 hover:bg-[var(--color-glomma-deep)]"
        >
          <Phone className="size-4" aria-hidden="true" />
          Ring {telefon.visning}
        </a>
        <Link
          href="/kontakt"
          className="group inline-flex items-center gap-2 rounded-full border border-[var(--color-strek)] bg-white/60 px-6 py-3.5 text-[15px] font-semibold text-[var(--color-glomma-deep)] transition-colors duration-300 hover:border-[var(--color-glomma)]"
        >
          Be om time
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      </div>

      <dl className="mt-9 hidden flex-wrap gap-x-8 gap-y-3 border-t border-[var(--color-strek)] pt-5 text-[14px] md:flex">
        <div>
          <dt className="text-[var(--color-tekst-svak)]">Adresse</dt>
          <dd className="font-medium text-[var(--color-tekst)]">
            {adresse.gate}, {adresse.sted}
          </dd>
        </div>
        <div>
          <dt className="text-[var(--color-tekst-svak)]">Åpent</dt>
          <dd className="font-medium text-[var(--color-tekst)]">
            {apningstider.dager} {apningstider.fra}–{apningstider.til}
          </dd>
        </div>
        <div>
          <dt className="text-[var(--color-tekst-svak)]">Akutt hjelp</dt>
          <dd className="font-medium text-[var(--color-tekst)]">Ring så tidlig som mulig</dd>
        </div>
      </dl>
    </header>
  );
}

export function Sporsmal() {
  return (
    <section aria-labelledby="sporsmal-tittel" className="border-t border-[var(--color-strek)] bg-[var(--color-kalk)]">
      <div className="mx-auto grid w-full max-w-[var(--container-max)] gap-10 px-[var(--container-px)] py-[clamp(72px,9vw,120px)] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <h2 id="sporsmal-tittel" className="font-bold text-[var(--color-glomma-deep)]" style={{ fontSize: "clamp(34px, 4vw, 56px)", lineHeight: 0.98, letterSpacing: "-0.05em" }}>
            Spørsmål{" "}
            <br />
            og svar
          </h2>
          <p className="mt-4 max-w-[38ch] text-[16.5px] leading-[1.65] text-[var(--color-tekst-2)]">
            Det folk ofte lurer på før de ringer tannlegen. Finner du ikke svaret, ring oss på{" "}
            <a href={telefon.lenke} className="font-semibold text-[var(--color-glomma)] underline underline-offset-4">
              {telefon.visning}
            </a>
            .
          </p>
        </div>
        <div className="border-t border-[var(--color-strek)]">
          {SPORSMAL.map((q, i) => (
            <details key={q.s} className="group border-b border-[var(--color-strek)]" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[18px] font-semibold tracking-[-0.015em] text-[var(--color-glomma-deep)] [&::-webkit-details-marker]:hidden">
                <h3>{q.s}</h3>
                <ChevronDown className="size-5 shrink-0 text-[var(--color-tekst-svak)] transition-transform duration-300 group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="max-w-[62ch] pb-6 text-[16px] leading-[1.65] text-[var(--color-tekst-2)]">
                {q.svar}
                {q.lenke && (
                  <>
                    {" "}
                    <Link href={q.lenke.href} className="font-semibold text-[var(--color-glomma)] underline underline-offset-4">
                      {q.lenke.tekst}
                    </Link>
                  </>
                )}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
