/* Is the clinic open right now, and if not, when does it open? Worked out in
   Norwegian time, with the public holidays and the clinic's own closed days
   (klinikk.stengteDager) taken out. A plain module, so server and client can share it. */

import { klinikk } from "@/data/klinikk";

const DAGER = ["søndag", "mandag", "tirsdag", "onsdag", "torsdag", "fredag", "lørdag"];
const MANEDER = ["januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"];

const iso = (d: Date) => d.toISOString().slice(0, 10);
const pluss = (d: Date, dager: number) => new Date(d.getTime() + dager * 86_400_000);

/** Easter Sunday (the Gregorian computus), as a UTC date. */
function paskedag(ar: number) {
  const a = ar % 19, b = Math.floor(ar / 100), c = ar % 100;
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
  const maned = Math.floor((h + l - 7 * m + 114) / 31), dag = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(Date.UTC(ar, maned - 1, dag));
}

/** Norway's public holidays (helligdager) in a year, as YYYY-MM-DD. */
export function helligdager(ar: number): Set<string> {
  const p = paskedag(ar);
  const faste = ["01-01", "05-01", "05-17", "12-25", "12-26"].map((md) => `${ar}-${md}`);
  // skjærtorsdag, langfredag, 1. and 2. påskedag, Kristi himmelfart, 1. and 2. pinsedag
  const flytende = [-3, -2, 0, 1, 39, 49, 50].map((n) => iso(pluss(p, n)));
  return new Set([...faste, ...flytende]);
}

const minutter = (hhmm: string) => {
  const [t, m] = hhmm.split(":").map(Number);
  return t * 60 + m;
};

/** The date and time on the wall in Kongsvinger at `na`. */
function iKongsvinger(na: Date) {
  const deler = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Oslo", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
      .formatToParts(na)
      .map((p) => [p.type, p.value]),
  );
  return { dato: new Date(Date.UTC(+deler.year, +deler.month - 1, +deler.day)), minutt: +deler.hour * 60 + +deler.minute };
}

/** A weekday the clinic is open: Monday to Friday, not a holiday, not one of its own closed days. */
function apenDag(d: Date) {
  const ukedag = d.getUTCDay();
  return ukedag >= 1 && ukedag <= 5 && !helligdager(d.getUTCFullYear()).has(iso(d)) && !klinikk.stengteDager.includes(iso(d));
}

export type Apningsstatus = { apen: boolean; tekst: string };

export function apningsstatus(na: Date): Apningsstatus {
  const { fra, til } = klinikk.apningstider;
  const { dato, minutt } = iKongsvinger(na);
  if (apenDag(dato) && minutt >= minutter(fra) && minutt < minutter(til)) return { apen: true, tekst: `Åpent nå · til ${til}` };
  if (apenDag(dato) && minutt < minutter(fra)) return { apen: false, tekst: `Stengt nå · åpner kl. ${fra}` };

  for (let n = 1; n <= 31; n++) {
    const dag = pluss(dato, n);
    if (!apenDag(dag)) continue;
    const nar = n === 1 ? "i morgen" : n <= 6 ? DAGER[dag.getUTCDay()] : `${dag.getUTCDate()}. ${MANEDER[dag.getUTCMonth()]}`;
    return { apen: false, tekst: `Stengt nå · åpner ${nar} kl. ${fra}` };
  }
  return { apen: false, tekst: "Stengt nå" };
}
