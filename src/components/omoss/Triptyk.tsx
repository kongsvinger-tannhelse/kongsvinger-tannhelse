import { Vis } from "@/components/artikler/deler";
import { Buebilde } from "@/components/forside/omoss/deler";
import { PERSONER } from "@/components/forside/omoss/ansatte";
import { kortskrift } from "./skrift";
import { cn } from "@/lib/utils";
import { BIOER } from "./tekst";
import { Guilloche, Ornament, Signatur, Stempel } from "./triptykdeler";
import { Spor } from "./Spor";
import r from "./triptyk.module.css";

/**
 * E «Triptyken»: the three as one folding triptych, three hinged panels in a
 * row. The middle one stands a little taller and the wings are turned
 * slightly in towards the viewer. When it comes into view the wings swing
 * open from the middle, brass hinges holding them. Below 1100 px each panel
 * is a card in a row you swipe sideways (see Spor).
 */

const POS = ["v", "m", "h"] as const;

export function Triptyk() {
  return (
    <Vis as="div" className={cn("mx-auto w-full max-w-[var(--container-max)] min-[1100px]:px-[var(--container-px)]", r.evis, r.eskap, kortskrift.className)} margin="0px 0px -12% 0px">
      <Spor n={BIOER.length} className={r.eprad} etikett="Tannlegene og tannpleieren">
        {BIOER.map((bio, i) => {
          const person = PERSONER.find((p) => p.navn === bio.navn)!;
          return (
            <li key={bio.navn} data-pos={POS[i % POS.length]} className={r.epanel}>
              {i === 1 && (
                <>
                  <span className={cn(r.ehengsel, r.ehv)} aria-hidden="true" />
                  <span className={cn(r.ehengsel, r.ehh)} aria-hidden="true" />
                </>
              )}
              <div className={r.efoto}>
                <Buebilde person={person} kolonne={{ px: 182, vw: 40 }} />
              </div>
              <header className={r.etopp}>
                <Ornament className={r.eornament} />
                <h3 className={r.enavn}>{bio.navn}</h3>
                <p className={r.erolle}>{bio.rolle}</p>
                <Guilloche className={r.eguil} />
              </header>
              <div className={r.ekropp}>
                {bio.avsnitt.map((a) => (
                  <p key={a} className={r.ebrod}>
                    {a}
                  </p>
                ))}
              </div>
              {bio.sitat && <p className={r.esitat}>«{bio.sitat}»</p>}
              <footer className={r.efot}>
                <p className={r.eskole}>{bio.skole}</p>
                <Signatur i={i} forsink={1.4 + i * 0.3} className={r.esignatur} />
              </footer>
              <Stempel initialer={bio.initialer} className={r.estempel} />
            </li>
          );
        })}
      </Spor>
    </Vis>
  );
}
