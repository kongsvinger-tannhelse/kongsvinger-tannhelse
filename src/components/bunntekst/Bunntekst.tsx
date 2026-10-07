import { Brua } from "./Brua";
import { Besok, Bunnlinje, Kontakt, Merke, Sider, Tider } from "./deler";

/**
 * The footer, on every page: «Kveld». The page ends at the bridge over
 * Glomma, and as the reader comes down to it evening falls: the sky warms
 * behind the hills, the landscape dims, and the lamps light one by one along
 * the deck, each with its light on the water. Below, the footer lies on the
 * river at night: the clinic's name, how to reach it, where it is, the hours
 * and the pages, its headings in the lamps' warm light; then the copyright,
 * who the pictures are from, and the way back up. The evening is tied to the
 * scroll, so going back up brings the day back.
 *
 * A server component, so the year is the server's; only the bridge (which
 * follows the scroll) runs in the browser.
 */

const NATT = "#0E2230";
const LAMPELYS = "text-[#EBC07F]";

export function Bunntekst() {
  return (
    <footer>
      <Brua overgang={NATT} />
      <div style={{ background: NATT }} className="pb-10 pt-8 md:pt-4">
        <div className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-px)]">
          <div className="flex flex-col items-center text-center">
            <Merke />
          </div>
          <div className="mx-auto mt-12 grid max-w-[900px] grid-cols-2 gap-x-8 gap-y-10 text-center md:grid-cols-4">
            <Kontakt aksent={LAMPELYS} />
            <Besok aksent={LAMPELYS} />
            <Tider aksent={LAMPELYS} />
            <Sider aksent={LAMPELYS} />
          </div>
          <Bunnlinje className="mt-14 md:mt-20" />
        </div>
      </div>
    </footer>
  );
}
