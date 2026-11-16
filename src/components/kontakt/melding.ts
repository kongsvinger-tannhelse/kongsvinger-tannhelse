"use server";

import { Resolver } from "node:dns/promises";
import { headers } from "next/headers";
import nodemailer from "nodemailer";
import { klinikk } from "@/data/klinikk";
import { FELLE, FELT, feilene, type Felt } from "@/components/kontakt/sjekk";

/**
 * Sends a message from the contact form to the clinic's inbox, as Ringebu
 * does: by SMTP through one.com (the clinic's mail is already there), from a
 * mailbox of its own for the site, so the clinic's own password never reaches
 * the site. The host holds that mailbox and its password as SMTP_USER and
 * SMTP_PASS; SMTP_HOST, SMTP_PORT and SMTP_TO are optional. Without them
 * `next dev` prints the message instead of sending it, and a production build
 * refuses, so a missing setting shows up as the error text with the phone
 * number rather than as messages that quietly go nowhere.
 */

export type MeldingState =
  | { status: "idle" }
  | { status: "sent" }
  | { status: "invalid"; errors: Partial<Record<Felt, string>> }
  | { status: "error"; reason: "busy" | "failed" };

// A few messages per visitor in ten minutes. This lives in the memory of one
// server instance, so it slows a flood down; it is no hard limit.
const VINDU = 10 * 60 * 1000;
const PER_VINDU = 5;
const sett = new Map<string, number[]>();

function forMange(ip: string) {
  const na = Date.now();
  const nylig = (sett.get(ip) ?? []).filter((t) => na - t < VINDU);
  if (nylig.length >= PER_VINDU) return true;
  nylig.push(na);
  sett.set(ip, nylig);
  if (sett.size > 5000) sett.clear();
  return false;
}

// A short wait: a slow lookup lets the message through rather than keep a patient waiting
const dns = new Resolver({ timeout: 2500, tries: 2 });

/**
 * Whether the address's domain takes e-mail, i.e. has a mail server (MX)
 * listed. Made-up domains have none. Whether the mailbox itself exists only
 * a mail to it can tell. When the lookup itself fails, the message goes
 * through.
 */
async function tarImotPost(epost: string) {
  const domene = epost.split("@").pop()!;
  try {
    const mx = await dns.resolveMx(domene);
    // a "null MX" (RFC 7505), one record pointing at ".", says the domain takes no mail
    return mx.some((r) => r.exchange !== "" && r.exchange !== ".");
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    return code !== "ENOTFOUND" && code !== "ENODATA";
  }
}

function les(form: FormData, key: string) {
  const v = form.get(key);
  return typeof v === "string" ? v.trim() : "";
}

export async function sendMelding(_forrige: MeldingState, form: FormData): Promise<MeldingState> {
  // The hidden field only a bot should fill in. Browser autofill or an agent
  // can fill it too, so a filled-in field no longer drops the message: it is
  // checked like any other and reaches the clinic marked as possible spam.
  const mistenkt = les(form, FELLE) !== "";

  const v = Object.fromEntries(FELT.map((f) => [f, les(form, f)])) as Record<Felt, string>;
  const errors = feilene(v);
  if (!errors.epost && !(await tarImotPost(v.epost))) errors.epost = "Vi finner ikke denne e-postadressen. Sjekk at den er skrevet riktig.";
  if (Object.keys(errors).length) return { status: "invalid", errors };

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "ukjent";
  if (forMange(ip)) return { status: "error", reason: "busy" };

  const subject = `${mistenkt ? "[mulig spam] " : ""}Melding fra nettsiden:${v.navn.replace(/[\r\n]+/g, " ")}`;
  const text = `Navn: ${v.navn}\nTelefon: ${v.telefon}\nE-post: ${v.epost}\n\n${v.melding}\n`;

  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[kontaktskjema] SMTP_USER/SMTP_PASS mangler, så meldingen ble ikke sendt:\n${subject}\n${text}`);
      return { status: "sent" };
    }
    console.error("[kontaktskjema] SMTP_USER/SMTP_PASS mangler i produksjon");
    return { status: "error", reason: "failed" };
  }

  const port = Number(process.env.SMTP_PORT ?? 465);
  try {
    await nodemailer
      .createTransport({
        host: process.env.SMTP_HOST ?? "send.one.com",
        port,
        secure: port === 465,
        auth: { user, pass },
      })
      .sendMail({
        from: { name: "Nettsiden", address: user },
        to: process.env.SMTP_TO ?? klinikk.epost,
        // The clinic answers by pressing Svar
        replyTo: { name: v.navn, address: v.epost },
        subject,
        text,
      });
    return { status: "sent" };
  } catch (err) {
    console.error("[kontaktskjema] Sending feilet", err);
    return { status: "error", reason: "failed" };
  }
}
