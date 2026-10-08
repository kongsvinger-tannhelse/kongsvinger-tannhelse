import { cn } from "@/lib/utils";
import { Vis } from "./deler";
import { LYSFARGE, TRAFIKKLYS } from "./tekst";
import s from "./artikler.module.css";

/* The traffic light for D, E and F: three cards, red first, each lamp
   coming on in turn when the cards are seen. */

export function Lysene({ className, overskrift = true }: { className?: string; overskrift?: boolean }) {
  const lys = [...TRAFIKKLYS.lys].reverse();
  return (
    <Vis as="section" className={className}>
      {overskrift && (
        <>
          <h2 className="text-[30px] font-bold leading-[1.1] tracking-[-0.035em] text-[var(--color-glomma-deep)] md:text-[38px]">{TRAFIKKLYS.sporsmal}</h2>
          <p className="mt-3 text-[19px] leading-[1.6] text-[var(--color-tekst-2)]">{TRAFIKKLYS.intro}</p>
        </>
      )}
      <ul className={cn("grid gap-4 md:grid-cols-3", overskrift && "mt-8")}>
        {lys.map((l, i) => {
          const f = LYSFARGE[l.farge];
          return (
            <li key={l.farge} className="flex flex-col rounded-[24px] p-6 md:p-7" style={{ background: f.flate }}>
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className={cn("block size-8 shrink-0 rounded-full", s.lampe)}
                  style={{ background: f.prikk, boxShadow: `0 0 0 4px var(--color-glomma-deep), 0 0 26px 6px ${f.prikk}77`, "--forsink": `${0.2 + i * 0.4}s` } as React.CSSProperties}
                />
                <h3 className="text-[22px] font-bold tracking-[-0.02em]" style={{ color: f.tekst }}>
                  {l.tittel}
                </h3>
              </div>
              <ul className="mt-4 space-y-2 text-[17px] leading-[1.5] text-[var(--color-tekst)]">
                {l.nar.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
              <p className="mt-auto pt-5 text-[17px] font-semibold text-[var(--color-glomma-deep)]">{l.gjor}</p>
            </li>
          );
        })}
      </ul>
      <p className="mt-5 text-[15.5px] leading-[1.6] text-[var(--color-tekst-2)]">{TRAFIKKLYS.etterStengetid}</p>
    </Vis>
  );
}
