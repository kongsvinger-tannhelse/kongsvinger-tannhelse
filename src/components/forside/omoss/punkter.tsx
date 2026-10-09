/* What the clinic stands for, in three short lines under the three of them.
   The Helfo line says what the Råd og tips article says (hva-dekker-helfo.ts,
   from Helsenorge's Tannlegeregning). */

const PUNKTER = [
  { tittel: "Erfarne tannleger", tekst: "Vi har mange års erfaring, og vi elsker det vi gjør." },
  { tittel: "Direkte oppgjør med Helfo", tekst: "Har du rett på støtte fra Helfo, ordner vi det for deg. Du betaler bare din del." },
  { tittel: "Alltid pasienten i fokus", tekst: "Vi tar godt imot alle pasientene våre, og gjør vårt beste for at du skal føle deg vel hos oss." },
];

export function Punkter({ className }: { className?: string }) {
  return (
    <ul className={className}>
      {PUNKTER.map(({ tittel, tekst }) => (
        <li key={tittel} className="mx-auto max-w-[34ch] text-center">
          <p className="text-[17px] font-bold leading-[1.25] tracking-[-0.01em] text-[var(--color-glomma-deep)] md:text-[19px]">{tittel}</p>
          <p className="mt-2 text-[15px] leading-[1.6] text-[var(--color-tekst-2)] md:text-[16px]">{tekst}</p>
        </li>
      ))}
    </ul>
  );
}
