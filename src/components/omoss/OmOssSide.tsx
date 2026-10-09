import { Bestill } from "@/components/behandlinger/side";
import { Smuler } from "@/components/Smuler";
import { Avsnitt, Ingress, Laget, Skog, Tittel } from "./deler";
import { Galleri } from "./Galleri";
import { Bunn, Skogsbilde } from "./Skogbunn";
import { GALLERI, LAGET } from "./tekst";

/**
 * The «Om oss» page, «Skogbunnen»: mostly light paper and text, and the
 * forest seen low down. Beside the welcome, an arched window (the portraits' shape)
 * looking into the forest: trunks rising out of it, light from the upper
 * right, moss and berries at the foot. Between the parts, low strips of
 * forest floor; the three stand above one, the floor kept clear under them.
 * The photos in a gallery: one large, arrows on each side, all of them
 * small underneath.
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
      <section aria-labelledby="om-tittel" className="mx-auto grid w-full max-w-[var(--container-max)] gap-10 px-[var(--container-px)] pt-[clamp(104px,12vw,150px)] pb-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-center lg:gap-16">
        <div>
          <Smuler side="Om oss" />
          <div id="om-tittel" className="mt-6">
            <Tittel />
          </div>
          <Ingress className="mt-6 max-w-[42ch]" />
          <Avsnitt className="mt-6 max-w-[58ch]" />
        </div>
        <Skog className="relative mx-auto aspect-[4/5] w-full max-w-[340px] rounded-t-full bg-[#FFFDF8] p-[3%] shadow-[0_30px_60px_-30px_rgba(10,25,32,0.55)] lg:max-w-[440px]">
          <div className="relative size-full overflow-hidden rounded-t-full">
            <Skogsbilde />
          </div>
        </Skog>
      </section>

      <Stripe seed={5} />

      <section aria-labelledby="laget-tittel" className="pt-[clamp(56px,7vw,96px)]">
        <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-px)] text-center">
          <h2 id="laget-tittel" className="font-bold text-[var(--color-glomma-deep)]" style={h2}>
            {LAGET.tittel}
          </h2>
          <p className="mx-auto mt-4 max-w-[44ch] text-[17px] leading-[1.6] text-[var(--color-tekst-2)]">{LAGET.tekst}</p>
          <Laget className="mx-auto mt-10" />
        </div>
        <Stripe seed={17} fri className="relative -mt-2 h-[90px] w-full md:h-[130px]" />
      </section>

      <section aria-labelledby="galleri-tittel" className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-px)] py-[clamp(56px,7vw,104px)]">
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-end">
          <h2 id="galleri-tittel" className="font-bold text-[var(--color-glomma-deep)]" style={h2}>
            {GALLERI.tittel}
          </h2>
          <p className="max-w-[48ch] text-[17px] leading-[1.6] text-[var(--color-tekst-2)]">{GALLERI.tekst}</p>
        </div>
        <div className="mt-8 md:mt-12">
          <Galleri />
        </div>
      </section>

      <Stripe seed={29} />
      <Bestill />
    </main>
  );
}
