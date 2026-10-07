/**
 * The contact form's fields and what each must hold. Shared by the form,
 * which checks as the visitor goes, and by sendMelding, which checks again on
 * the server and has the last word. A plain module (see klinikk.ts).
 */

export const FELT = ["navn", "telefon", "epost", "melding"] as const;
export type Felt = (typeof FELT)[number];
export type Verdier = Record<Felt, string>;

export const MAX: Record<Felt, number> = { navn: 100, telefon: 30, epost: 200, melding: 4000 };

const EPOST = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** What is wrong with one field, or null when it will do. */
export function feilI(f: Felt, raw: string): string | null {
  const v = raw.trim();
  if (v.length > MAX[f]) return f === "melding" ? "Meldingen er for lang." : "Dette feltet er for langt.";
  switch (f) {
    case "navn":
      return v ? null : "Skriv navnet ditt.";
    case "telefon":
      if (!v) return "Skriv telefonnummeret ditt.";
      return /^[+\d\s().-]+$/.test(v) && v.replace(/\D/g, "").length >= 8 ? null : "Sjekk telefonnummeret.";
    case "epost":
      if (!v) return "Skriv e-postadressen din.";
      return EPOST.test(v) ? null : "Sjekk e-postadressen.";
    case "melding":
      return v ? null : "Skriv en melding.";
  }
}
