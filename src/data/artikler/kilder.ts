/* The sources the articles were checked against, on 8 October 2026: the
   national health portal (Helsenorge), the Norwegian Directorate of Health
   (Helsedirektoratet), Helfo and Lovdata (for who pays), the Norwegian
   Dental Association (Tannlegeforeningen), the medical encyclopedia written
   by university dentists (Store medisinske leksikon) and Norsk
   Helseinformatikk (NHI.no), which doctors write. Each article lists the
   ones its words rest on. */

export type Kilde = { navn: string; utgiver: string; url: string };

export const KILDE = {
  hnKaries: { utgiver: "Helsenorge", navn: "Hull i tennene (karies)", url: "https://www.helsenorge.no/sykdom/munn-tenner-kjeve/hull-og-tannskader/" },
  hnBarn: { utgiver: "Helsenorge", navn: "Tannstell hos barn", url: "https://www.helsenorge.no/tannhelse/tannstell-hos-barn/" },
  hnSmertestillende: { utgiver: "Helsenorge", navn: "Reseptfrie smertestillende legemidler", url: "https://www.helsenorge.no/smertestillende" },
  hnLegevakt: { utgiver: "Helsenorge", navn: "Legevakt", url: "https://www.helsenorge.no/hjelpetilbud-i-kommunene/legevakt/" },
  hnSnus: { utgiver: "Helsenorge", navn: "Helseskader av snus", url: "https://www.helsenorge.no/snus-og-roykeslutt/helseskader-av-snus" },
  hnPust: { utgiver: "Helsenorge", navn: "Mestring av langvarige smerter", url: "https://www.helsenorge.no/undersokelse-og-behandling/langvarige-smerter/" },
  hdirVoksne: { utgiver: "Helsedirektoratet", navn: "Råd om tannhelse for voksne over 20 år", url: "https://www.helsedirektoratet.no/faglige-rad/helsefremmende-og-forebyggende-tannhelsetiltak-for-voksne-over-20-ar/rad" },
  hdirAngst: { utgiver: "Helsedirektoratet", navn: "Tannbehandlingsangst blant barn og unge", url: "https://www.helsedirektoratet.no/retningslinjer/tannhelsetjenester-til-barn-og-unge-020-ar/tannbehandlingsangst-blant-barn-og-unge" },
  hdirToo: { utgiver: "Helsedirektoratet", navn: "Tilrettelagt tannhelsetilbud (TOO)", url: "https://www.helsedirektoratet.no/tema/tannhelse/tilrettelagt-tannhelsetilbud--too" },
  tooinfo: { utgiver: "TOO", navn: "Behandlingstilbud for deg med angst for tannbehandling", url: "https://www.tooinfo.no/om-too-tilbudet.599253.no.html" },
  ntfRad: { utgiver: "Tannlegeforeningen", navn: "Gode råd til god munnhelse", url: "https://www.tannlegeforeningen.no/fag-og-politikk/pasientinformasjon/gode-rad-til-god-munnhelse.html" },
  nhiTannpine: { utgiver: "NHI.no", navn: "Førstehjelp ved tannpine", url: "https://nhi.no/forstehjelp/munn-og-fordoyelse/tannpine" },
  nhiPulpitt: { utgiver: "NHI.no", navn: "Pulpitt, betennelse inne i tannen", url: "https://nhi.no/sykdommer/magetarm/tannhelse/pulpitt-tannrotsbetennelse/symptomer" },
  nhiTannbyll: { utgiver: "NHI.no", navn: "Tannbyll", url: "https://nhi.no/sykdommer/magetarm/tannhelse/tannbyll/all" },
  nhiTannkjott: { utgiver: "NHI.no", navn: "Tannkjøttbetennelse og tannløsning", url: "https://nhi.no/sykdommer/magetarm/tannhelse/tannkjottbetennelse" },
  nhiBarn: { utgiver: "NHI.no", navn: "Tannhelse hos barn", url: "https://nhi.no/sykdommer/barn/ore-nese-hals/tannhelse-hos-barn/all" },
  nhiFrokost: { utgiver: "NHI.no", navn: "Pusse tenner før eller etter frokost?", url: "https://nhi.no/livsstil/egenomsorg/pusse-tenner-for-eller-etter-frokost" },
  smlTennene: { utgiver: "Store medisinske leksikon", navn: "Tennene", url: "https://sml.snl.no/tennene" },
  smlEmalje: { utgiver: "Store medisinske leksikon", navn: "Tannemalje", url: "https://sml.snl.no/tannemalje" },
  smlTannsmerter: { utgiver: "Store medisinske leksikon", navn: "Tannsmerter", url: "https://sml.snl.no/tannsmerter" },
  smlSlitasje: { utgiver: "Store medisinske leksikon", navn: "Tannslitasje", url: "https://sml.snl.no/tannslitasje" },
  smlGingivitt: { utgiver: "Store medisinske leksikon", navn: "Gingivitt", url: "https://sml.snl.no/gingivitt" },
  smlTannstein: { utgiver: "Store medisinske leksikon", navn: "Tannstein", url: "https://sml.snl.no/tannstein" },
  smlRemineralisering: { utgiver: "Store medisinske leksikon", navn: "Remineralisering", url: "https://sml.snl.no/remineralisering" },
  smlTannlegeskrekk: { utgiver: "Store medisinske leksikon", navn: "Tannlegeskrekk", url: "https://sml.snl.no/tannlegeskrekk" },
  lovSamtykke: { utgiver: "Lovdata", navn: "Pasient- og brukerrettighetsloven § 4-1 (samtykke)", url: "https://lovdata.no/lov/1999-07-02-63/§4-1" },
  hnTannlegeregning: { utgiver: "Helsenorge", navn: "Hvem betaler tannlegeregningen din?", url: "https://www.helsenorge.no/betaling-for-helsetjenester/hvem-betaler-tannlegeregningen-din/" },
  hnFrikort: { utgiver: "Helsenorge", navn: "Frikort for helsetjenester", url: "https://www.helsenorge.no/betaling-for-helsetjenester/frikort-for-helsetjenester/" },
  helfoTilstander: { utgiver: "Helfo", navn: "Tilstander som kan gi rett til stønad til tannbehandling", url: "https://www.helfo.no/tannlege/regelverk-og-takster-for-tannlege/tilstander-som-kan-gi-rett-til-st%C3%B8nad-til-tannbehandling" },
  helfoUngeVoksne: { utgiver: "Helfo", navn: "Fylkeskommunene har ansvaret for tannbehandlingen av unge voksne 19–28 år", url: "https://www.helfo.no/nyheter/fylkeskommunene-har-ansvaret-for-tannbehandlingen-av-unge-voksne-19-28-ar" },
  lovTannhelse: { utgiver: "Lovdata", navn: "Tannhelsetjenesteloven § 1-3 (hvem som har rett)", url: "https://lovdata.no/lov/1983-06-03-54/§1-3" },
  lovVederlag: { utgiver: "Lovdata", navn: "Forskrift om vederlag i den offentlige tannhelsetjenesten", url: "https://lovdata.no/forskrift/1984-05-24-1268" },
  lovPristilbud: { utgiver: "Lovdata", navn: "Prisopplysningsforskriften § 18 (skriftlig pristilbud)", url: "https://lovdata.no/forskrift/2012-11-14-1066/§18" },
} as const satisfies Record<string, Kilde>;

/** The day the articles were last checked against their sources. */
export const GJENNOMGATT = "2026-10-08";
