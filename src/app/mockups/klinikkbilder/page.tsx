import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata = { title: "Klinikkbilder: mockups", robots: { index: false } };

const FORSLAG = [
  {
    bokstav: "H",
    navn: "Buen og rutene",
    tekst:
      "Én bue som på Ringebu, med behandlingsrommet i det runde speilet, og ved siden av den to vanlige kvadrater med fire hjørner, det ene over det andre. De spretter opp etter tur når kameraet har stoppet, buen først. Navnet står øverst til venstre, oppe i himmelen, så bildene får god plass til høyre.",
    bilde: "/images/klinikk/bilde8.jpg",
    href: "/mockups/klinikkbilder/h",
  },
  {
    bokstav: "G",
    navn: "Buegangen",
    tekst:
      "Buen fra Ringebu, et rektangel med en halvsirkel på toppen, tre ganger, som en buegang. Når kameraet har stoppet, spretter buene opp etter hverandre, og rommet i hver av dem reiser seg fra flatt, som en side i en sprettopp-bok. Så står de stille; holder du musa over en bue, lener den seg mot deg.",
    bilde: "/images/klinikk/bilde3.jpg",
    href: "/mockups/klinikkbilder/g",
  },
  {
    bokstav: "A",
    navn: "Speilet",
    tekst:
      "Klinikken har et stort rundt speil med en ring av varmt lys i behandlingsrommet. Det speilet henger her i himmelen over Glomma: lysringen tegner seg rundt når kameraet har stoppet, og inne i glasset kommer rommene ett etter ett, mens lyset går rundt som en klokke.",
    bilde: "/images/klinikk/bilde3.jpg",
    href: "/mockups/klinikkbilder/a",
  },
  {
    bokstav: "B",
    navn: "Kortstokken",
    tekst:
      "En liten bunke fotografier deles ut over utsikten, ett og ett, som når du legger bilder på bordet for noen. Med noen sekunders mellomrom glir det øverste bildet bort og neste rom ligger under. Hold musa over, så vifter bunken seg ut som kort på hånden.",
    bilde: "/images/klinikk/bilde8.jpg",
    href: "/mockups/klinikkbilder/b",
  },
  {
    bokstav: "C",
    navn: "Mosaikken",
    tekst:
      "Ni klare ruter henger ved siden av utsikten. Når kameraet har stoppet snur de seg i en diagonal bølge, og landskapet blir til behandlingsrommet. Bølgen går igjen med noen sekunders mellomrom, og neste rom kommer fram.",
    bilde: "/images/klinikk/bilde6.jpg",
    href: "/mockups/klinikkbilder/c",
  },
  {
    bokstav: "D",
    navn: "Bak trærne",
    tekst:
      "Bildene står inne i landskapet, mellom dalen og de nære trekronene. Når kameraet har stoppet, stiger tre innrammede rom langsomt opp bak skogen, det midterste høyest, som en sol over trærne. Trærne står virkelig foran dem. Pek på et rom, så løfter det seg helt fri.",
    bilde: "/images/klinikk/bilde9.jpg",
    href: "/mockups/klinikkbilder/d",
  },
  {
    bokstav: "E",
    navn: "Punktene",
    tekst:
      "Rundt ti tusen lyspunkter samler seg ut av himmelen over Glomma og legger seg til et behandlingsrom, før bildet blir skarpt. Med noen sekunders mellomrom slipper punktene taket og samles igjen som neste rom. Før musa over, så går rommet i oppløsning rundt den og samler seg igjen.",
    bilde: "/images/klinikk/bilde5.jpg",
    href: "/mockups/klinikkbilder/e",
  },
  {
    bokstav: "F",
    navn: "Navnet",
    tekst:
      "Ingen ramme, ingen panel. Når kameraet har stoppet, blir bokstavene i «Kongsvinger» til glass, og gjennom dem ser du rommene på klinikken, som glir sakte forbi, ett etter ett. Navnet bærer stedet.",
    bilde: "/images/klinikk/bilde2.jpg",
    href: "/mockups/klinikkbilder/f",
  },
];

export default function KlinikkbilderMockups() {
  return (
    <main className="bg-[var(--color-papir)]">
      <header className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-px)] pb-12 pt-24 md:pt-32">
        <h1 className="font-semibold" style={{ fontSize: "clamp(40px, 6vw, 80px)", letterSpacing: "-0.05em", lineHeight: 0.95 }}>
          Bildene fra klinikken
        </h1>
        <p className="mt-5 max-w-[56ch] text-[17px] leading-[1.6] text-[var(--color-tekst-2)]">
          Åtte måter å vise rommene på i toppen av forsiden, når kameraet har fulgt Glomma og blitt stående. Alle åpner
          det samme bildegalleriet når du trykker på dem.
        </p>
      </header>

      <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-px)] pb-28">
        <div className="border-t border-[var(--color-strek)]">
          {FORSLAG.map((f) => (
            <article
              key={f.bokstav}
              className="grid grid-cols-1 gap-6 border-b border-[var(--color-strek)] py-10 md:grid-cols-[300px_1fr_auto] md:items-center md:gap-10"
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-[10px] bg-[var(--color-kalk)]">
                <Image src={f.bilde} alt="" fill sizes="300px" className="object-cover" />
              </div>
              <div className="max-w-[60ch]">
                <h2 className="text-[clamp(24px,2.6vw,34px)] font-medium tracking-[-0.03em]">
                  {f.bokstav}. {f.navn}
                </h2>
                <p className="mt-3 text-[15px] leading-[1.65] text-[var(--color-tekst-2)]">{f.tekst}</p>
              </div>
              <Link
                href={f.href}
                className="inline-flex items-center gap-3 self-start rounded-full border border-[var(--color-strek)] px-5 py-2.5 text-[14px] font-medium transition-colors hover:border-[var(--color-glomma)] md:self-center"
              >
                Se forslaget
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
