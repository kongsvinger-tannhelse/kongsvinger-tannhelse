import { Smuler } from "./deler";
import { ArsakDel, Ark, Avsender, BorteDel, Hilsen, LysDel, NerveDel, TipsDel } from "./lapp";
import { TipsRad } from "./mellom";
import { Sjekk } from "./Sjekk";
import { SMATT } from "./tekst";

/* H «Sjekk først»: D's dark self-check opens the note, and every hint
   links down to where Per explains it. Between the sections, a row of
   three small cards: something to know, a trick, a tip. */

export function H() {
  return (
    <main className="bg-[var(--color-papir)] pb-[clamp(56px,10vw,140px)] pt-[clamp(96px,12vw,140px)]">
      <div className="mx-auto w-full max-w-[1100px] px-[var(--container-px)]">
        <Smuler />
        <Ark className="mt-8">
          <Avsender />
          <Sjekk lesMer className="-mx-[clamp(8px,2vw,32px)] mt-10 md:mt-12" />
          <div className="mt-6 md:mt-10">
            <NerveDel kant={false} />
            <ArsakDel />
            <TipsRad smatt={[SMATT.lag, SMATT.notat, SMATT.traad]} className="border-t border-dashed border-[var(--color-strek)]" />
            <TipsDel />
            <BorteDel />
            <TipsRad smatt={[SMATT.syre, SMATT.spytt, SMATT.myk]} className="border-t border-dashed border-[var(--color-strek)]" />
            <LysDel />
          </div>
          <Hilsen />
        </Ark>
      </div>
    </main>
  );
}
