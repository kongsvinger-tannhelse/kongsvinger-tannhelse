import { darligAnde } from "./darlig-ande";
import { delprotese } from "./delprotese";
import { helprotese } from "./helprotese";
import { hevelse } from "./hevelse";
import { isingITenner } from "./ising-i-tenner";
import { losnetTannkrone } from "./losnet-tannkrone";
import { mistetFylling } from "./mistet-fylling";
import { munntorrhet } from "./munntorrhet";
import { rotfylling } from "./rotfylling";
import { skallfasetter } from "./skallfasetter";
import { tannbleking } from "./tannbleking";
import { tannbro } from "./tannbro";
import { tannfylling } from "./tannfylling";
import { tanngnissing } from "./tanngnissing";
import { tannimplantat } from "./tannimplantat";
import { tannkjottbehandling } from "./tannkjottbehandling";
import { tannkrone } from "./tannkrone";
import { tannrens } from "./tannrens";
import { tannsjekk } from "./tannsjekk";
import { tannskade } from "./tannskade";
import { tannverk } from "./tannverk";
import { trekkingAvTenner } from "./trekking-av-tenner";
import { visdomstenner } from "./visdomstenner";
import { MED_SIDE } from "./sider";
import type { Behandlingsside } from "./typer";

/* Every treatment that has a page of its own, in the book's order. A plain
   module (see klinikk.ts). The rest are only in the /behandlinger book. */

export const BEHANDLINGSSIDER: Behandlingsside[] = [
  tannsjekk,
  tannfylling,
  tannbleking,
  tannrens,
  tannkjottbehandling,
  rotfylling,
  munntorrhet,
  tanngnissing,
  isingITenner,
  trekkingAvTenner,
  darligAnde,
  visdomstenner,
  tannskade,
  tannverk,
  mistetFylling,
  hevelse,
  losnetTannkrone,
  tannkrone,
  tannbro,
  skallfasetter,
  tannimplantat,
  delprotese,
  helprotese,
];

export const finnBehandlingsside = (slug: string) => BEHANDLINGSSIDER.find((b) => b.slug === slug);

// The light list the links use must name exactly these pages
if (BEHANDLINGSSIDER.map((b) => b.slug).join() !== MED_SIDE.join()) {
  throw new Error("data/behandlinger: MED_SIDE in sider.ts does not match BEHANDLINGSSIDER");
}

export { harSide, sideSti } from "./sider";

export * from "./typer";
export { BGJENNOMGATT } from "./kilder";
