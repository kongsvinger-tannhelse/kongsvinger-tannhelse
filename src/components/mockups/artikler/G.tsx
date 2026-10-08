import { Smuler } from "./deler";
import { ArsakDel, Ark, Avsender, BorteDel, Hilsen, LysDel, NerveDel, TipsDel } from "./lapp";
import { GulLapp } from "./mellom";
import { Sjekk } from "./Sjekk";
import { SMATT } from "./tekst";

/* G «Lappen med gule lapper»: A's note from Per, with the self-check
   written on the sheet itself, and yellow sticky notes (a fact, a trick, a
   tip) pinned between the sections so they hang over the sheet's edge. */

export function G() {
  return (
    <main className="overflow-x-clip bg-[var(--color-papir)] pb-[clamp(56px,10vw,140px)] pt-[clamp(96px,12vw,140px)]">
      <div className="mx-auto w-full max-w-[1040px] px-[var(--container-px)]">
        <Smuler />
        <Ark className="mt-8">
          <Avsender />
          <Sjekk lys className="mt-10 md:mt-12" />
          <div className="mt-6 md:mt-10">
            <NerveDel kant={false} />
            <GulLapp smatt={SMATT.lag} side="h" vri={1.5} />
            <ArsakDel />
            <GulLapp smatt={SMATT.notat} side="v" vri={-1.8} />
            <TipsDel />
            <GulLapp smatt={SMATT.spytt} side="h" vri={1.2} />
            <BorteDel />
            <GulLapp smatt={SMATT.traad} side="v" vri={-1.4} />
            <LysDel />
          </div>
          <Hilsen />
        </Ark>
      </div>
    </main>
  );
}
