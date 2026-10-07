import type { ComponentType } from "react";
import type { PopupProps } from "../popup/Popup";
import { DarligAnde, IsingITenner, Munntorrhet, Rotfylling, Tannbleking, Tannfylling, Tanngnissing, Tannkjottbehandling, Tannrens, Tannsjekk, Tannstein, TrekkingAvTenner, Visdomstenner } from "./ordinaer";
import { Hevelse, LosnetTannkrone, MistetFylling, Tannskade, Tannsmerte, Tannverk } from "./akutt";
import { Delprotese, Helprotese, Skallfasetter, Tannbro, Tannimplantat, Tannkrone } from "./estetisk";

/* Each treatment's pop-up, by its id (see grupper.ts). */

export const SCENER: Record<string, ComponentType<PopupProps>> = {
  tannsjekk: Tannsjekk,
  tannfylling: Tannfylling,
  tannbleking: Tannbleking,
  tannrens: Tannrens,
  tannkjottbehandling: Tannkjottbehandling,
  tannstein: Tannstein,
  rotfylling: Rotfylling,
  munntorrhet: Munntorrhet,
  tanngnissing: Tanngnissing,
  "ising-i-tenner": IsingITenner,
  "trekking-av-tenner": TrekkingAvTenner,
  "darlig-ande": DarligAnde,
  visdomstenner: Visdomstenner,
  tannsmerte: Tannsmerte,
  tannskade: Tannskade,
  tannverk: Tannverk,
  "mistet-fylling": MistetFylling,
  hevelse: Hevelse,
  "losnet-tannkrone": LosnetTannkrone,
  tannkrone: Tannkrone,
  tannbro: Tannbro,
  skallfasetter: Skallfasetter,
  tannimplantat: Tannimplantat,
  delprotese: Delprotese,
  helprotese: Helprotese,
};
