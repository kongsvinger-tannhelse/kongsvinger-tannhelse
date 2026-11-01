import { Smuler } from "@/components/Smuler";
import { Bunnlinje } from "@/components/behandlinger/deler";
import { Ingress, Skog, Tittel } from "./deler";
import { Galleri } from "./Galleri";
import { Skogen } from "./Skogbunn";
import { GALLERI, LAGET } from "./tekst";
import { Triptyk } from "./Triptyk";

/**
 * The «Om oss» page, «Skogbunnen»: mostly light paper, and the forest seen
 * from its floor. A short welcome, centred. Then the three as a folding
 * triptych, each with a portrait and a few words about them (a row you
 * swipe sideways on a phone), and under them the forest, a path coming up
 * out of the paper into a clearing in the middle. Last, the photos in the
 * order of a visit: one large, arrows on each side, all of them small
 * underneath.
 */

const h2 = { fontSize: "clamp(30px, 3.4vw, 48px)", lineHeight: 1, letterSpacing: "-0.045em" } as const;

export function OmOssSide() {
  return (
    <main className="overflow-hidden bg-[var(--color-papir)]">
      <section aria-labelledby="om-tittel" className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-px)] pt-[clamp(104px,10vw,132px)] text-center">
        <Smuler side="Om oss" />
        <div id="om-tittel" className="mt-6">
          <Tittel />
        </div>
        <Ingress className="mx-auto mt-5 max-w-[46ch] text-balance" />
      </section>

      <section aria-labelledby="laget-tittel" className="pt-[clamp(48px,6vw,88px)]">
        <h2 id="laget-tittel" className="sr-only">
          {LAGET.tittel}
        </h2>
        <Triptyk />
        {/* the forest under them */}
        <Skog className="relative mt-4 h-[240px] w-full md:mt-6 md:h-[clamp(270px,25vw,380px)]" margin="0px 0px -8% 0px">
          <div className="absolute inset-0 md:hidden">
            <Skogen W={640} H={300} />
          </div>
          <div className="absolute inset-0 hidden md:block">
            <Skogen W={1600} H={380} />
          </div>
        </Skog>
      </section>

      <section aria-labelledby="galleri-tittel" className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-px)] pb-[clamp(96px,11vw,160px)] pt-[clamp(56px,7vw,104px)]">
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-end">
          <h2 id="galleri-tittel" className="font-bold text-[var(--color-glomma-deep)]" style={h2}>
            {GALLERI.tittel}
          </h2>
          <p className="max-w-[48ch] text-balance text-[17px] leading-[1.6] text-[var(--color-tekst-2)]">{GALLERI.tekst}</p>
        </div>
        <div className="mt-8 md:mt-12">
          <Galleri />
        </div>
      </section>
      {/* phones: Ring oss and Be om time along the bottom, as on the treatment pages */}
      <Bunnlinje />
      {/* the page ends in the footer's own landscape, the bridge at dusk */}
    </main>
  );
}
