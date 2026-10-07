"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { Images } from "lucide-react";
import { klinikk, klinikkbilder } from "@/data/klinikk";
import { Galleri } from "@/components/forside/Galleri";
import { cn } from "@/lib/utils";
import s from "./baktraerne.module.css";

// The three rooms that rise, by index into klinikkbilder
const UTVALG = [0, 3, 2];

/**
 * D — «Bak trærne». This one lives inside the landscape, between the far
 * valley and the near treetops. When the camera has stopped, three framed
 * rooms rise slowly up from behind the forest into the valley, the middle one
 * highest, like the sun coming up over the trees. The trees really are in
 * front of them. Point at one and it lifts further clear; pick it to see it
 * large.
 */
export function BakTraerne() {
  const [apen, setApen] = useState<number | null>(null);

  return (
    <div className={s.lag}>
      <div className={s.rekke}>
        {UTVALG.map((indeks, i) => {
          const b = klinikkbilder[indeks];
          return (
            <div key={b.src} className={cn(s.stige, "vent")} style={{ "--i": i } as CSSProperties}>
              <button type="button" className={s.ramme} onClick={() => setApen(indeks)} aria-label={`Vis bildet: ${b.tekst}`}>
                <span className={s.navn}>{b.tekst}</span>
                <span className={s.bilde}>
                  <Image src={b.src} alt="" fill loading="eager" sizes="(min-width: 768px) 190px, 28vw" className="object-cover" />
                </span>
              </button>
            </div>
          );
        })}
      </div>

      <button type="button" className={cn(s.alle, "vent")} onClick={() => setApen(0)}>
        <Images className="size-3.5" aria-hidden="true" />
        Se alle {klinikkbilder.length} fra {klinikk.adresse.gate}
      </button>

      <Galleri indeks={apen} onLukk={() => setApen(null)} onBytt={setApen} />
    </div>
  );
}
