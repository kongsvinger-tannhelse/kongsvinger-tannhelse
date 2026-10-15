/**
 * The contact form's fields and what each must hold. Checked by sendMelding
 * on the server; the forms show what it sends back. A plain module (see
 * klinikk.ts).
 */

export const FELT = ["navn", "telefon", "epost", "melding"] as const;
export type Felt = (typeof FELT)[number];
export type Verdier = Record<Felt, string>;

export const MAX: Record<Felt, number> = { navn: 100, telefon: 30, epost: 200, melding: 4000 };

/** Every field must be filled in, so the clinic can both ring and write back. */
export const PAKREVD: Record<Felt, boolean> = { navn: true, telefon: true, epost: true, melding: true };

// A name, @, and a domain of letters, digits and hyphens with a top-level part of two letters or more
const EPOST = /^[^\s@]+@([a-z\d](?:[a-z\d-]*[a-z\d])?\.)+[a-z]{2,}$/i;

// The providers most people here use. An address one slip away from one of
// these (gmial.com, hotmail.con) is almost certainly that one mistyped.
const KJENTE = ["gmail.com", "hotmail.com", "hotmail.no", "outlook.com", "icloud.com", "yahoo.com", "yahoo.no", "online.no"];
// Real providers one slip away from those (mail.com and gmail.com), never taken for a typo
const OGSA = ["mail.com", "email.com", "live.com", "live.no", "msn.com", "me.com", "mac.com", "gmx.com"];

/** Edits between two strings, a swap of neighbours counting as one. */
function avstand(a: string, b: string) {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array<number>(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++) {
      const k = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + k);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
  return d[a.length][b.length];
}

/** The known provider an address's domain looks like a typo of, if any. */
export function mentDu(epost: string): string | null {
  const domene = epost.split("@").pop()!.toLowerCase();
  if (KJENTE.includes(domene) || OGSA.includes(domene)) return null;
  return KJENTE.find((k) => avstand(domene, k) === 1) ?? null;
}

/** What is wrong with one field on its own, or null when it will do. */
export function feilI(f: Felt, raw: string): string | null {
  const v = raw.trim();
  if (v.length > MAX[f]) return f === "melding" ? "Meldingen er for lang." : "Dette feltet er for langt.";
  switch (f) {
    case "navn":
      return v ? null : "Skriv navnet ditt.";
    case "telefon":
      if (!v) return "Skriv telefonnummeret ditt.";
      return /^[+\d\s().-]+$/.test(v) && v.replace(/\D/g, "").length >= 8 ? null : "Sjekk telefonnummeret. Det skal ha minst 8 sifre.";
    case "epost": {
      if (!v) return "Skriv e-postadressen din.";
      if (!EPOST.test(v)) return "Sjekk e-postadressen.";
      const forslag = mentDu(v);
      return forslag ? `Mente du ${v.split("@")[0]}@${forslag}?` : null;
    }
    case "melding":
      return v ? null : "Skriv en melding.";
  }
}

/** Everything wrong with a message, field by field. */
export function feilene(v: Verdier): Partial<Record<Felt, string>> {
  const errors: Partial<Record<Felt, string>> = {};
  for (const f of FELT) {
    const feil = feilI(f, v[f]);
    if (feil) errors[f] = feil;
  }
  return errors;
}
