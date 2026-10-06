/** Stand-in for the next section, so the hero can be judged while scrolling away from it. */
export function Plassholder() {
  return (
    <section className="mx-auto w-full max-w-[var(--container-max)] px-[var(--container-px)] py-[clamp(96px,12vw,160px)]">
      <p className="max-w-[44ch] text-[15px] leading-[1.6] text-[var(--color-tekst-svak)]">
        Neste seksjon kommer her. Denne plassen er bare med for at du skal kunne se hvordan toppen oppfører seg når du
        blar nedover.
      </p>
      <div className="mt-10 h-[60vh] rounded-[14px] border border-dashed border-[var(--color-strek)]" />
    </section>
  );
}
