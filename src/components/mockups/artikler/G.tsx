import { Smuler, Vis } from "./deler";
import { ArsakDel, Ark, Avsender, BorteDel, Brod, Hilsen, NerveDel, Sporsmal, TipsDel } from "./lapp";
import { GulLapp } from "./mellom";
import { Sjekk } from "./Sjekk";
import { SMATT } from "./tekst";

/* G «Lappen med gule lapper»: A's note from Per, with yellow sticky notes
   (a fact, a trick, a tip) pinned between the sections so they hang over
   the sheet's edge. Once you have read it all, you can tap what it feels
   like for you and get a hint; the note ends with one button, to book. */

export function G() {
  return (
    <main className="overflow-x-clip bg-[var(--color-papir)] pb-[clamp(56px,10vw,140px)] pt-[clamp(96px,12vw,140px)]">
      <div className="mx-auto w-full max-w-[1040px] px-[var(--container-px)]">
        <Smuler />
        <Ark className="mt-8">
          <Avsender />
          <div className="mt-10 md:mt-14">
            <NerveDel />
            <GulLapp smatt={SMATT.lag} side="h" vri={1.5} />
            <ArsakDel />
            <GulLapp smatt={SMATT.notat} side="v" vri={-1.8} />
            <TipsDel />
            <GulLapp smatt={SMATT.spytt} side="h" vri={1.2} />
            <BorteDel />
            <GulLapp smatt={SMATT.traad} side="v" vri={-1.4} />

            {/* after reading: what does it feel like for you? */}
            <Vis as="section" id="hos-deg" className="scroll-mt-28 border-t border-dashed border-[var(--color-strek)] pt-10 md:pt-14">
              <Sporsmal>Hvordan kjennes det hos deg?</Sporsmal>
              <Brod className="mt-3">Nå som du har lest, kan du trykke på det som ligner mest. Da får du et lite hint om hva det kan være.</Brod>
              <Sjekk lys rolig utenTittel className="mt-7" />
            </Vis>
          </div>
          <Hilsen enKnapp />
        </Ark>
      </div>
    </main>
  );
}
