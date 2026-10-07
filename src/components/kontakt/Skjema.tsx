"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { klinikk } from "@/data/klinikk";
import { cn } from "@/lib/utils";
import { sendMelding, type MeldingState } from "./melding";
import { FELT, MAX, type Felt, type Verdier } from "./sjekk";

/**
 * The contact form. It posts to sendMelding (melding.ts), which mails it to
 * the clinic. The fields are controlled so what the visitor wrote stays put
 * when sending fails; React empties uncontrolled fields after every form
 * action. Two looks: boxed fields, or writing lines as on a postcard.
 */

const LENKE = "font-medium text-[var(--color-glomma-deep)] underline underline-offset-2 hover:text-[var(--color-glomma)]";
const TOM: Verdier = { navn: "", telefon: "", epost: "", melding: "" };

export function Skjema({
  stil = "felt",
  tittel = "Send oss en melding",
  className,
}: {
  stil?: "felt" | "linjer";
  /** null when the page around it already says it */
  tittel?: string | null;
  className?: string;
}) {
  const [state, action, pending] = useActionState<MeldingState, FormData>(sendMelding, { status: "idle" });
  const [verdier, setVerdier] = useState(TOM);
  const form = useRef<HTMLFormElement>(null);
  const takk = useRef<HTMLDivElement>(null);
  const boks = useRef<HTMLDivElement>(null);
  // The form's height when it was sent, so the thanks keeps the room it had
  const [hoyde, setHoyde] = useState<number>();
  const id = useId();

  const errors = state.status === "invalid" ? state.errors : {};

  // After a send, move focus to what came of it: the first field to fix, or the thanks.
  useEffect(() => {
    if (state.status === "invalid") {
      const forste = FELT.find((f) => state.errors[f]);
      if (forste) form.current?.querySelector<HTMLElement>(`[name="${forste}"]`)?.focus();
    } else if (state.status === "sent") {
      takk.current?.focus();
    }
  }, [state]);

  if (state.status === "sent") {
    return (
      <div ref={takk} tabIndex={-1} role="status" className={cn("flex flex-col justify-center outline-none", className)} style={{ minHeight: hoyde }}>
        <p className="text-[24px] font-semibold tracking-[-0.03em] text-[var(--color-glomma-deep)]">Takk for meldingen.</p>
        <p className="mt-2 text-[16px] leading-[1.55] text-[var(--color-tekst-2)]">Vi svarer deg så snart vi kan.</p>
      </div>
    );
  }

  const linjer = stil === "linjer";
  const LABEL = "block text-[13.5px] font-medium text-[var(--color-tekst-2)]";
  const FELTSTIL = linjer
    ? "mt-0.5 block w-full border-0 border-b border-[rgba(23,34,40,0.28)] bg-transparent px-0 py-2 text-[16px] leading-[1.4] text-[var(--color-tekst)] outline-none transition-colors hover:border-[rgba(23,34,40,0.5)] focus:border-[var(--color-glomma)] focus-visible:outline-none focus-visible:shadow-[0_1.5px_0_var(--color-glomma)] aria-[invalid=true]:border-[#B4462F]"
    : "mt-1.5 block w-full rounded-[12px] border border-[rgba(23,34,40,0.18)] bg-white px-4 py-2.5 text-[16px] leading-[1.4] text-[var(--color-tekst)] outline-none transition-colors hover:border-[rgba(23,34,40,0.34)] focus:border-[var(--color-glomma)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-teal)] aria-[invalid=true]:border-[#B4462F]";

  const sett = (f: Felt) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setVerdier((v) => ({ ...v, [f]: e.target.value }));

  const feil = (f: Felt) =>
    errors[f] ? (
      <p id={`${id}${f}-feil`} className="mt-1.5 text-[13.5px] text-[#B4462F]">
        {errors[f]}
      </p>
    ) : null;

  const felt = (f: Felt, mer?: string) => ({
    name: f,
    required: true,
    maxLength: MAX[f],
    value: verdier[f],
    onChange: sett(f),
    "aria-invalid": errors[f] ? true : undefined,
    "aria-describedby": [errors[f] ? `${id}${f}-feil` : "", mer ?? ""].filter(Boolean).join(" ") || undefined,
  });

  return (
    <div ref={boks} className={className}>
      {tittel && <h3 className="mb-4 text-[22px] font-semibold tracking-[-0.03em] text-[var(--color-glomma-deep)]">{tittel}</h3>}

      <form ref={form} action={action} noValidate onSubmit={() => setHoyde(boks.current?.offsetHeight)} className="@container">
        <label className={LABEL}>
          Navn
          <input autoComplete="name" className={FELTSTIL} {...felt("navn")} />
          {feil("navn")}
        </label>

        {/* Side by side once the form itself is wide enough, wherever it sits */}
        <div className={cn("grid gap-x-5 @md:grid-cols-2", linjer ? "mt-4 gap-y-4" : "mt-3.5 gap-y-3.5")}>
          <label className={LABEL}>
            Telefon
            <input type="tel" autoComplete="tel" className={FELTSTIL} {...felt("telefon")} />
            {feil("telefon")}
          </label>
          <label className={LABEL}>
            E-post
            <input type="email" autoComplete="email" className={FELTSTIL} {...felt("epost")} />
            {feil("epost")}
          </label>
        </div>

        <label className={cn(LABEL, linjer ? "mt-4" : "mt-3.5")}>
          Melding
          <textarea
            rows={linjer ? 4 : 3}
            className={cn(
              FELTSTIL,
              "resize-y",
              // writing lines under the text, 28px apart, as on a card
              linjer && "border-b-0 bg-[linear-gradient(transparent_27px,rgba(23,34,40,0.2)_27px,rgba(23,34,40,0.2)_28px)] bg-[length:100%_28px] bg-local py-0 leading-[28px]"
            )}
            {...felt("melding", `${id}merk`)}
          />
          {feil("melding")}
        </label>
        <p id={`${id}merk`} className="mt-1.5 text-[13px] leading-[1.5] text-[var(--color-tekst-svak)]">
          Ikke skriv personnummer eller helseopplysninger her.
        </p>

        {/* Hidden from people; a bot that fills it in is quietly turned away */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label>
            Nettsted
            <input name="nettsted" tabIndex={-1} autoComplete="off" defaultValue="" />
          </label>
        </div>

        {state.status === "error" && (
          <p role="alert" className="mt-5 text-[15px] leading-[1.55] text-[var(--color-tekst)]">
            {state.reason === "busy" ? "Du har sendt mange meldinger på kort tid. " : "Det gikk ikke å sende meldingen. "}
            Ring oss på{" "}
            <a href={klinikk.telefon.lenke} className={cn(LENKE, "tabular-nums")}>
              {klinikk.telefon.visning}
            </a>{" "}
            eller skriv til{" "}
            <a href={`mailto:${klinikk.epost}`} className={LENKE}>
              {klinikk.epost}
            </a>
            .
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="group mt-5 inline-flex items-center gap-2.5 rounded-full bg-[var(--color-glomma)] px-6 py-3.5 text-[14px] font-semibold text-[var(--color-papir)] shadow-[0_12px_30px_-14px_rgba(22,48,59,0.7)] transition-colors duration-300 hover:bg-[var(--color-glomma-deep)] disabled:cursor-wait disabled:opacity-70"
        >
          {pending ? "Sender …" : "Send"}
          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
        </button>
      </form>
    </div>
  );
}
