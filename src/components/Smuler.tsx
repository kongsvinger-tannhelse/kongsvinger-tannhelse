import Link from "next/link";

/** «Forside / <this page>» at the top of a page, centred over the centred title. */
export function Smuler({ side }: { side: string }) {
  return (
    <nav aria-label="Brødsmuler" className="text-[13px] text-[var(--color-tekst-svak)]">
      <ol className="flex items-center justify-center gap-2">
        <li>
          <Link href="/" className="underline-offset-4 hover:text-[var(--color-tekst)] hover:underline">
            Forside
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li aria-current="page" className="text-[var(--color-tekst-2)]">
          {side}
        </li>
      </ol>
    </nav>
  );
}
