import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { klinikk } from "@/data/klinikk";

export const metadata: Metadata = {
  title: "Fant ikke siden",
};

const { telefon, apningstider: tid } = klinikk;

const SIDER = [
  { href: "/", tekst: "Forsiden", om: "Velkommen til oss" },
  { href: "/behandlinger", tekst: "Behandlinger", om: "Alt vi gjør, forklart enkelt" },
  { href: "/kontakt", tekst: "Kontakt", om: "Ring, skriv eller finn veien" },
  { href: "/om-oss", tekst: "Om oss", om: "Hvem vi er" },
  { href: "/rad-og-tips", tekst: "Råd og tips", om: "Når det gjør vondt, iser eller blør" },
];

/** A gate in the fortress wall, drawn in one thin line, with the road running through it. */
function Port() {
  const blekk = "var(--color-stein)";
  // the stones of the arch, from one side to the other
  const steiner = Array.from({ length: 11 }, (_, i) => {
    const v = Math.PI - (i * Math.PI) / 10;
    const [c, s] = [Math.cos(v), Math.sin(v)];
    return `M${(100 + 62 * c).toFixed(1)} ${(112 - 62 * s).toFixed(1)} L${(100 + 84 * c).toFixed(1)} ${(112 - 84 * s).toFixed(1)}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 200 240" className="h-auto w-[150px] md:w-[180px]" aria-hidden="true">
      <g fill="none" stroke={blekk} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round">
        {/* the wall either side, cut off */}
        <path d="M0 112 H16 M184 112 H200 M0 150 H16 M184 150 H200 M0 188 H16 M184 188 H200" opacity={0.6} />
        {/* the arch: an outer ring of stones and the opening */}
        <path d="M16 236 V112 A84 84 0 0 1 184 112 V236" />
        <path d="M38 236 V112 A62 62 0 0 1 162 112 V236" />
        <path d={steiner} />
        {/* the road, narrowing towards the far side */}
        <path d="M58 236 L94 168 M142 236 L106 168" opacity={0.7} />
        <path d="M100 232 V222 M100 210 V202 M100 192 V186 M100 178 V174" opacity={0.5} />
        <path d="M0 236 H200" />
      </g>
      <text x={100} y={134} textAnchor="middle" fontSize={26} fontWeight={700} letterSpacing={-1} fill="var(--color-glomma)">
        404
      </text>
    </svg>
  );
}

/** Any address the site doesn't have: say so kindly, and show the way on. */
export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="overflow-x-clip bg-[var(--color-papir)]">
        <div className="mx-auto w-full max-w-[880px] px-[var(--container-px)] pb-[clamp(104px,11vw,150px)] pt-[clamp(112px,13vw,170px)]">
          <div className="flex flex-col items-center text-center">
            <div className="hero-loft">
              <Port />
            </div>
            <h1
              className="hero-loft mt-8 font-bold text-[var(--color-glomma-deep)]"
              style={{ fontSize: "clamp(40px, 5.6vw, 72px)", lineHeight: 0.98, letterSpacing: "-0.05em", animationDelay: "0.08s" }}
            >
              Fant ikke siden
            </h1>
            <p className="hero-loft mt-5 max-w-[46ch] text-[18px] leading-[1.6] text-[var(--color-tekst-2)]" style={{ animationDelay: "0.16s" }}>
              Siden du leter etter, finnes ikke her. Kanskje er adressen skrevet litt feil, eller kanskje lenken er fra den gamle nettsiden vår.
              Herfra finner du fram:
            </p>
          </div>

          <nav aria-label="Sider" className="hero-loft mt-12" style={{ animationDelay: "0.24s" }}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {SIDER.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="group flex items-center gap-4 rounded-[20px] bg-[#FBF8F1] px-5 py-4 ring-1 ring-[var(--color-strek)] transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_40px_-30px_rgba(10,25,32,0.5)]"
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block text-[17px] font-semibold tracking-[-0.015em] text-[var(--color-glomma-deep)]">{s.tekst}</span>
                      <span className="block text-[14px] text-[var(--color-tekst-svak)]">{s.om}</span>
                    </span>
                    <ArrowRight className="size-5 shrink-0 text-[var(--color-teal)] transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="mt-12 text-center text-[16px] leading-[1.6] text-[var(--color-tekst-2)]">
            Eller ring oss, så hjelper vi deg:
            <br />
            <a
              href={telefon.lenke}
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-[var(--color-glomma)] px-6 py-3.5 text-[15px] font-semibold tabular-nums text-[var(--color-papir)] shadow-[0_12px_30px_-14px_rgba(22,48,59,0.7)] transition-colors duration-300 hover:bg-[var(--color-glomma-deep)]"
            >
              <Phone className="size-4" aria-hidden="true" />
              {telefon.visning}
            </a>
            <span className="mt-2 block text-[14px] text-[var(--color-tekst-svak)]">
              {tid.dager} {tid.fra}–{tid.til}
            </span>
          </p>
        </div>
      </main>
    </>
  );
}
