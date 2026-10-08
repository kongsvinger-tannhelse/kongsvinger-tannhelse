import { KILDE, type Kilde } from "@/data/artikler/kilder";

/* The words on /helfo: what the state pays for at the dentist. Every fact
   was checked on 8 October 2026 against the official pages listed in
   HELFO_KILDER (Helfo, Helsenorge, Lovdata, Helsedirektoratet). No amounts
   or percentages beyond what those pages say. Young adults lost Helfo's
   support on 1 July 2026; check the sources again when the rules change.
   «Direkte oppgjør» is the clinic's own word (2026-10-08). A plain module
   (see klinikk.ts). */

export const HELFO_GJENNOMGATT = "2026-10-08";

export const HELFO_KILDER: Kilde[] = [
  { utgiver: "Helsenorge", navn: "Hvem betaler tannlegeregningen din?", url: "https://www.helsenorge.no/betaling-for-helsetjenester/hvem-betaler-tannlegeregningen-din/" },
  { utgiver: "Helfo", navn: "Tilstander som kan gi rett til stønad til tannbehandling", url: "https://www.helfo.no/tannlege/regelverk-og-takster-for-tannlege/tilstander-som-kan-gi-rett-til-st%C3%B8nad-til-tannbehandling" },
  { utgiver: "Helfo", navn: "Fylkeskommunene har ansvaret for tannbehandlingen av unge voksne 19–28 år", url: "https://www.helfo.no/nyheter/fylkeskommunene-har-ansvaret-for-tannbehandlingen-av-unge-voksne-19-28-ar" },
  { utgiver: "Helsenorge", navn: "Frikort for helsetjenester", url: "https://www.helsenorge.no/betaling-for-helsetjenester/frikort-for-helsetjenester/" },
  { utgiver: "Helsenorge", navn: "Tannregulering til barn og unge", url: "https://www.helsenorge.no/tannhelse/tannregulering-til-barn-og-unge/" },
  { utgiver: "Helsedirektoratet", navn: "Tannbehandling til unge voksne mellom 19 og 28 år", url: "https://www.helsedirektoratet.no/lov-og-forskrift/tannhelsetjenesteloven/tannbehandling-til-unge-voksne-mellom-19-og-28-ar" },
  { utgiver: "Lovdata", navn: "Tannhelsetjenesteloven § 1-3 (hvem som har rett)", url: "https://lovdata.no/lov/1983-06-03-54/§1-3" },
  { utgiver: "Lovdata", navn: "Forskrift om vederlag for tannhelsetjenester i den offentlige tannhelsetjenesten", url: "https://lovdata.no/forskrift/1984-05-24-1268" },
  { utgiver: "Lovdata", navn: "Prisopplysningsforskriften § 18 (skriftlig pristilbud)", url: "https://lovdata.no/forskrift/2012-11-14-1066/§18" },
  KILDE.hdirToo,
];

/** Who pays, by age. Ages count by the year you turn them, as the rules do. */
export const ALDER = [
  {
    id: "barn",
    fra: 0,
    til: 18,
    alder: "0–18 år",
    hvem: "Barn og ungdom",
    hvor: "Den offentlige tannhelsetjenesten",
    betaler: "Ingenting. All behandling er gratis, bortsett fra tannregulering.",
    mer: "Til og med det året du fyller 18.",
  },
  {
    id: "unge",
    fra: 19,
    til: 28,
    alder: "19–28 år",
    hvem: "Unge voksne",
    hvor: "Den offentlige tannhelsetjenesten",
    betaler: "25 prosent av prisen. Det offentlige betaler resten.",
    mer: "Fra 1. juli 2026 gir Helfo ikke lenger stønad til deg i denne alderen hos private tannleger, med noen få unntak.",
  },
  {
    id: "voksne",
    fra: 29,
    til: null,
    alder: "29 år og eldre",
    hvem: "Voksne",
    hvor: "Privat tannlege, som oss",
    betaler: "Vanligvis hele regningen selv.",
    mer: "Helfo dekker en del av utgiftene ved 15 sykdommer og tilstander.",
  },
] as const;

/** Helfo's 15 conditions, in Helfo's own order and plainer words. */
export const STONADSPUNKTER = [
  "Sjelden medisinsk tilstand",
  "Leppe-kjeve-ganespalte",
  "Svulster i munnen, i vevet rundt eller ellers i hodet",
  "Behandling for å hindre infeksjon ved visse sykdommer",
  "Sykdommer og misdannelser i munn og kjeve",
  "Periodontitt (alvorlig tannkjøttsykdom)",
  "Forstyrrelser i hvordan tennene har utviklet seg",
  "Feil bitt (tannregulering)",
  "Unormalt mye slitte tenner (attrisjon og erosjon)",
  "For lite spytt (munntørrhet)",
  "Allergi mot fyllingsmaterialer",
  "Tannskade ved godkjent yrkesskade",
  "Tannskade ved ulykke",
  "Sterkt nedsatt evne til å ta vare på tennene selv, ved varig sykdom eller funksjonsnedsettelse",
  "Tannløs underkjeve, når du har mistet alle eller nesten alle tennene",
] as const;

/** The other groups the public dental service must offer care to (tannhelsetjenesteloven § 1-3). */
export const GRUPPER = [
  "Personer med psykisk utviklingshemming",
  "Eldre, langtidssyke og uføre som bor på institusjon eller får hjemmesykepleie",
  "Personer som får hjelp i kommunens rusomsorg",
  "Innsatte i fengsel",
] as const;

/** Questions people search for. Shown on the page and given to search engines. */
export const HELFO_SPORSMAL = [
  {
    s: "Hva dekker Helfo hos tannlegen?",
    svar: "De fleste voksne betaler tannbehandlingen selv. Helfo dekker en del av utgiftene hvis du har en av 15 sykdommer eller tilstander, for eksempel periodontitt, munntørrhet, en tannskade etter en ulykke eller en sjelden medisinsk tilstand. Det er tannlegen som vurderer om du har rett på stønad.",
  },
  {
    s: "Må jeg søke om refusjon for tannbehandling selv?",
    svar: "Nei. Vi har direkte oppgjør med Helfo. Det betyr at vi sender kravet til Helfo for deg, og at du bare betaler din del når du er hos oss. Du må ikke legge ut for det Helfo dekker.",
  },
  {
    s: "Får unge voksne mellom 19 og 28 år hjelp fra Helfo?",
    svar: "Ikke lenger, med noen få unntak. Fra 1. juli 2026 får du tannbehandling i Den offentlige tannhelsetjenesten fra året du fyller 19 til og med året du fyller 28, og der betaler du 25 prosent av prisen. Går du til en privat tannlege, kan ikke tannlegen sende krav til Helfo for deg. Unntakene er noe tannregulering, og de som ikke har rett på tilbudet fordi de ikke har bodd lenge nok i Norge.",
  },
  {
    s: "Teller tannlegeregningen med på frikortet?",
    svar: "Bare for to av de 15 tilstandene: sykdommer og misdannelser i munn og kjeve, og periodontitt. Da teller egenandelen med på frikortet, og tannlegen melder den inn for deg. Forskjellen mellom prisen hos tannlegen og det Helfo dekker, må du betale selv, også når du har frikort.",
  },
  {
    s: "Dekker Helfo tannregulering?",
    svar: "Barn og unge kan få fra 40 til 100 prosent stønad fra Helfo til tannregulering, etter hva slags behandling kjeveortopeden mener trengs. Kjeveortopeden kan ta mer enn det Helfo dekker, så de fleste må betale en del selv, også de som får 100 prosent.",
  },
  {
    s: "Hva gjør jeg hvis jeg ikke har råd til tannlegen?",
    svar: "Har du dårlig råd, kan du søke Nav om støtte til tannbehandling (økonomisk sosialhjelp).",
  },
] as const;
