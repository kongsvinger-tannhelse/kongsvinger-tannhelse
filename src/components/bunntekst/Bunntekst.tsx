import { Brua } from "./Brua";
import { Besok, Bunnlinje, Kontakt, Merke, Sider, Tider } from "./deler";

/**
 * The footer, on every page: «Kveld». The page ends at the bridge over
 * Glomma, and as the reader comes down to it evening falls: the sky warms
 * behind the hills, the landscape dims, and the lamps light one by one along
 * the deck, each with its light on the water. Below, the footer lies on the
 * river at night, in white: the clinic's name and organisation number, and
 * beside them how to reach it, where it is, the hours and the pages; then the
 * copyright, the credit the fortress drawing's licence asks for, and the way
 * back up. The evening is tied to the scroll, so going back up brings the day
 * back.
 *
 * A server component, so the year is the server's; only the bridge (which
 * follows the scroll) runs in the browser.
 */

const NATT = "#0E2230";

export function Bunntekst() {
  return (
    <footer>
      <Brua overgang={NATT} />
      <div style={{ background: NATT }} className="pb-10 pt-8 md:pt-4">
        <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-px)]">
          {/* phones and tablets: the name over the columns, centred; wide: the name on the left and the four beside it, five in a row */}
          <div className="flex flex-col items-center text-center lg:flex-row lg:items-start lg:justify-between lg:gap-12 lg:text-left">
            <Merke />
            <div className="mt-12 grid w-full max-w-[900px] grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4 lg:mt-0 lg:flex lg:w-auto lg:max-w-none lg:gap-x-[clamp(40px,5vw,80px)]">
              <Kontakt />
              <Besok />
              <Tider />
              <Sider />
            </div>
          </div>
          <Bunnlinje className="mt-14 md:mt-20" />
        </div>
      </div>
    </footer>
  );
}
