import { Smuler } from "@/components/Smuler";
import { Ingress, Laget, Skog, Tittel } from "./deler";
import { Galleri } from "./Galleri";
import { Bunn, Lund } from "./Skogbunn";
import { GALLERI, LAGET } from "./tekst";

/**
 * The «Om oss» page, «Skogbunnen»: mostly light paper, and the forest seen
 * low down. A short welcome, and from md up a small grove beside it, drawn
 * like the forest floor further down (a phone leaves it out, so the people
 * come sooner). Then the three, as old photographs with a few words about
 * each in the border, standing above a strip of forest floor kept clear
 * under them. Last, the photos in the order of a visit: one large, arrows on
 * each side, all of them small underneath.
 */

const h2 = { fontSize: "clamp(30px, 3.4vw, 48px)", lineHeight: 1, letterSpacing: "-0.045em" } as const;

function Stripe({ seed, fri, className }: { seed: number; fri?: boolean; className?: string }) {
  return (
    <Skog className={className ?? "relative h-[90px] w-full md:h-[120px]"}>
      <div className="absolute inset-0 md:hidden">
        <Bunn W={600} H={140} seed={seed} fri={fri} />
      </div>
      <div className="absolute inset-0 hidden md:block">
        <Bunn W={1600} H={150} seed={seed} fri={fri} />
      </div>
    </Skog>
  );
}

export function OmOssSide() {
  return (
    <main className="overflow-hidden bg-[var(--color-papir)]">
      <section aria-labelledby="om-tittel" className="mx-auto grid w-full max-w-[var(--container-max)] gap-10 px-[var(--container-px)] pt-[clamp(104px,10vw,132px)] pb-4 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:items-end md:gap-12 md:pb-0 lg:gap-16">
        <div className="md:pb-10">
          <Smuler side="Om oss" />
          <div id="om-tittel" className="mt-6">
            <Tittel />
          </div>
          <Ingress className="mt-6 max-w-[42ch]" />
        </div>
        <Skog className="hidden md:block">
          <Lund className="block h-auto w-full" />
        </Skog>
      </section>

      <section aria-labelledby="laget-tittel" className="pt-[clamp(48px,6vw,80px)]">
        <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-px)]">
          <div className="text-center">
            <h2 id="laget-tittel" className="font-bold text-[var(--color-glomma-deep)]" style={h2}>
              {LAGET.tittel}
            </h2>
            <p className="mx-auto mt-4 max-w-[44ch] text-balance text-[17px] leading-[1.6] text-[var(--color-tekst-2)]">{LAGET.tekst}</p>
          </div>
          <Laget className="mx-auto mt-10 md:mt-12" />
        </div>
        <Stripe seed={17} fri className="relative mt-6 h-[90px] w-full md:mt-2 md:h-[130px]" />
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
      {/* the page ends in the footer's own landscape, the bridge at dusk */}
    </main>
  );
}
