import { SIDETITTEL } from "@/lib/sidetittel";
import { cn } from "@/lib/utils";
import { INGRESS, TITTEL } from "./tekst";

/* Server-rendered heading and introduction. The forest also renders on
   the server, fully visible without a viewport observer or animation. */

export function Tittel({ className }: { className?: string }) {
  return (
    <h1 className={cn("font-bold text-[var(--color-glomma-deep)]", className)} style={SIDETITTEL}>
      {TITTEL}
    </h1>
  );
}

export function Ingress({ className }: { className?: string }) {
  return <p className={cn("text-[19px] leading-[1.55] text-[var(--color-tekst)] md:text-[21px]", className)}>{INGRESS}</p>;
}
