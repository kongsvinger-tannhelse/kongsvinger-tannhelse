/**
 * The contact form's fields and what each must hold. Checked by sendMelding
 * on the server; the forms show what it sends back. A plain module (see
 * klinikk.ts).
 */

export const FELT = ["navn", "telefon", "epost", "melding"] as const;
export type Felt = (typeof FELT)[number];
export type Verdier = Record<Felt, string>;

export const MAX: Record<Felt, number> = { navn: 100, telefon: 30, epost: 200, melding: 4000 };

/** The fields that must be filled in; of phone and e-mail, one will do (see feilene). */
export const PAKREVD: Record<Felt, boolean> = { navn: true, telefon: false, epost: false, melding: true };

const EPOST = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** What is wrong with one field on its own, or null when it will do. Phone and e-mail may each be left empty. */
export function feilI(f: Felt, raw: string): string | null {
  const v = raw.trim();
  if (v.length > MAX[f]) return f === "melding" ? "Meldingen er for lang." : "Dette feltet er for langt.";
  switch (f) {
    case "navn":
      return v ? null : "Skriv navnet ditt.";
    case "telefon":
      if (!v) return null;
      return /^[+\d\s().-]+$/.test(v) && v.replace(/\D/g, "").length >= 8 ? null : "Sjekk telefonnummeret. Det skal ha minst 8 sifre.";
    case "epost":
      if (!v) return null;
      return EPOST.test(v) ? null : "Sjekk e-postadressen.";
    case "melding":
      return v ? null : "Skriv en melding.";
  }
}

/** Everything wrong with a message: each field, and a way to answer (a phone number or an e-mail address, at least one). */
export function feilene(v: Verdier): Partial<Record<Felt, string>> {
  const errors: Partial<Record<Felt, string>> = {};
  for (const f of FELT) {
    const feil = feilI(f, v[f]);
    if (feil) errors[f] = feil;
  }
  if (!v.telefon.trim() && !v.epost.trim()) errors.telefon = "Skriv telefonnummeret ditt eller e-postadressen din, så vi kan svare deg.";
  return errors;
}
