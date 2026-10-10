import type { Rute, Stripe } from "@/data/behandlinger/typer";
import { cn } from "@/lib/utils";
import { Arbeidstegning, Fargeskala, Kalender, Puter, Tannrad, Tekst } from "./striper2";
import { Bro, Buer, Fliser, Kroner, Rotter } from "./striper3";
import { Draaper, Luke, Maal, Puslespill, Skjell, Smil } from "./striper4";
import { Hakk, Lokk, Lupe, Plaster, Skyer, Strikk } from "./striper5";
import { BTEGNINGER } from "./tegninger";
import s from "./side.module.css";

/* The treatment told as a comic strip, in the shape the treatment asks for:
   squares in rows, round frames on a string, or one of the shapes in
   striper2.tsx to striper5.tsx. The frames take the page's ink (blekk.ts). A step not
   everyone needs has a dashed frame. Server-safe: the line between the
   round frames is plain SVG. */

/** Squares in rows: two on a phone, three or four on a wider screen. */
function Ruter({ ruter }: { ruter: Rute[] }) {
  return (
    <ol className={cn("mt-8 grid grid-cols-2 gap-x-4 gap-y-7 md:gap-x-6 md:gap-y-10", ruter.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3")}>
      {ruter.map((r, i) => {
        const T = BTEGNINGER[r.tegning];
        return (
          <li key={r.tekst}>
            <figure>
              <div className={cn("grid aspect-square place-items-center rounded-[18px]", s.rute, r.mellom && s.mellom)}>
                <T className="w-[82%]" forsink={i * 0.35} />
              </div>
              <Tekst className="mt-3">{r.tekst}</Tekst>
            </figure>
          </li>
        );
      })}
    </ol>
  );
}

/**
 * Round frames on a string, rising and falling like a wave: two by two on a
 * phone, all in one row on a wide screen, where a dotted line runs from the
 * middle of each frame to the next (under the frames, so it seems to thread
 * them). Up to five frames.
 */
function Perler({ ruter }: { ruter: Rute[] }) {
  return (
    <ol className="mt-8 grid grid-cols-2 gap-x-5 gap-y-8 lg:flex lg:gap-x-5">
      {ruter.map((r, i) => {
        const T = BTEGNINGER[r.tegning];
        const nede = i % 2 === 1;
        return (
          <li key={r.tekst} className={cn("lg:flex-1", nede && "mt-12")}>
            <figure>
              <div className="relative">
                {i < ruter.length - 1 && (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 100 48"
                    preserveAspectRatio="none"
                    className={cn(s.traad, "absolute left-1/2 hidden h-12 w-[calc(100%+1.25rem)] lg:block", nede ? "top-[calc(50%-3rem)]" : "top-1/2")}
                  >
                    <path d={nede ? "M0,48 C45,48 55,0 100,0" : "M0,0 C45,0 55,48 100,48"} vectorEffect="non-scaling-stroke" />
                  </svg>
                )}
                <div className={cn("relative z-[1] grid aspect-square place-items-center rounded-full", s.rute, r.mellom && s.mellom)}>
                  <T className="w-[70%]" forsink={i * 0.35} />
                </div>
              </div>
              <Tekst className="mt-3 text-center">{r.tekst}</Tekst>
            </figure>
          </li>
        );
      })}
    </ol>
  );
}

export function Stripen({ form = "ruter", ruter }: { form?: Stripe; ruter: Rute[] }) {
  switch (form) {
    case "ruter":
      return <Ruter ruter={ruter} />;
    case "perler":
      return <Perler ruter={ruter} />;
    case "puter":
      return <Puter ruter={ruter} />;
    case "arbeidstegning":
      return <Arbeidstegning ruter={ruter} />;
    case "kalender":
      return <Kalender ruter={ruter} />;
    case "tannrad":
      return <Tannrad ruter={ruter} />;
    case "fargeskala":
      return <Fargeskala ruter={ruter} />;
    case "fliser":
      return <Fliser ruter={ruter} />;
    case "rotter":
      return <Rotter ruter={ruter} />;
    case "buer":
      return <Buer ruter={ruter} />;
    case "kroner":
      return <Kroner ruter={ruter} />;
    case "bro":
      return <Bro ruter={ruter} />;
    case "smil":
      return <Smil ruter={ruter} />;
    case "puslespill":
      return <Puslespill ruter={ruter} />;
    case "skjell":
      return <Skjell ruter={ruter} />;
    case "luke":
      return <Luke ruter={ruter} />;
    case "draaper":
      return <Draaper ruter={ruter} />;
    case "maal":
      return <Maal ruter={ruter} />;
    case "strikk":
      return <Strikk ruter={ruter} />;
    case "skyer":
      return <Skyer ruter={ruter} />;
    case "lupe":
      return <Lupe ruter={ruter} />;
    case "plaster":
      return <Plaster ruter={ruter} />;
    case "hakk":
      return <Hakk ruter={ruter} />;
    case "lokk":
      return <Lokk ruter={ruter} />;
  }
}
