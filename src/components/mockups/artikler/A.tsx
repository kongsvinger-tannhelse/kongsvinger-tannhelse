import { Smuler } from "./deler";
import { ArsakDel, Ark, Avsender, BorteDel, Hilsen, LysDel, NerveDel, TipsDel } from "./lapp";

/* A «Lappen fra tannlegen»: the article is a note from Per, on a sheet of
   paper, with his face at the top. Pen sketches in the margin draw
   themselves as you read, the way a dentist sketches while explaining. */

export function A() {
  return (
    <main className="bg-[var(--color-papir)] pb-[clamp(56px,10vw,140px)] pt-[clamp(96px,12vw,140px)]">
      <div className="mx-auto w-full max-w-[1040px] px-[var(--container-px)]">
        <Smuler />
        <Ark className="mt-8">
          <Avsender />
          <div className="mt-10 md:mt-14">
            <NerveDel />
            <ArsakDel />
            <TipsDel />
            <BorteDel />
            <LysDel />
          </div>
          <Hilsen />
        </Ark>
      </div>
    </main>
  );
}
