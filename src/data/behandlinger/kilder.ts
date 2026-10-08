import { KILDE, type Kilde } from "@/data/artikler/kilder";

/* The sources the treatment pages were checked against, on 8 October 2026:
   Store medisinske leksikon (written by the dental faculties), Helsenorge,
   Helsedirektoratet, NHI.no, Felleskatalogen, the Norwegian Dental
   Association and its journal, the dental faculty at the University of
   Oslo, the university hospitals (St. Olavs, Helse Bergen, UNN), Mattilsynet,
   Lovdata and Helfo. Each page lists the ones its words rest on. */

export const BKILDE = {
  // root fillings
  smlRotfylling: { utgiver: "Store medisinske leksikon", navn: "Rotfylling", url: "https://sml.snl.no/rotfylling" },
  smlTannrotbetennelse: { utgiver: "Store medisinske leksikon", navn: "Tannrotbetennelse", url: "https://sml.snl.no/tannrotbetennelse" },
  smlTannsmerter: { utgiver: "Store medisinske leksikon", navn: "Tannsmerter", url: "https://sml.snl.no/tannsmerter" },
  smlTannbyll: { utgiver: "Store medisinske leksikon", navn: "Tannbyll", url: "https://sml.snl.no/tannbyll" },
  nhiPulpitt: { utgiver: "NHI.no", navn: "Pulpitt, betennelse inne i tannen", url: "https://nhi.no/sykdommer/magetarm/tannhelse/pulpitt-tannrotsbetennelse" },
  uioEndodonti: { utgiver: "Det odontologiske fakultet, UiO", navn: "Klinisk endodonti 2024", url: "https://www.odont.uio.no/iko/om/organisasjon/fagavd/endodonti/rutiner-metoder/kliniske-rutiner-2024.pdf" },
  // check-ups and cleaning
  hdirVoksne: KILDE.hdirVoksne,
  smlTannrontgen: { utgiver: "Store medisinske leksikon", navn: "Tannrøntgen", url: "https://sml.snl.no/tannr%C3%B8ntgen" },
  ntfRad: KILDE.ntfRad,
  lnlPlakk: { utgiver: "Lille norske leksikon", navn: "Plakk", url: "https://lille.snl.no/plakk" },
  smlTannstein: KILDE.smlTannstein,
  smlPeriodontitt: { utgiver: "Store medisinske leksikon", navn: "Periodontitt", url: "https://sml.snl.no/periodontitt" },
  smlTannpleier: { utgiver: "Store medisinske leksikon", navn: "Tannpleier", url: "https://sml.snl.no/tannpleier" },
  // fillings
  hnHull: { utgiver: "Helsenorge", navn: "Hull og tannskader", url: "https://www.helsenorge.no/sykdom/munn-tenner-kjeve/hull-og-tannskader/" },
  smlFylling: { utgiver: "Store medisinske leksikon", navn: "Fylling", url: "https://sml.snl.no/fylling_-_odontologi" },
  smlKaries: { utgiver: "Store medisinske leksikon", navn: "Karies", url: "https://sml.snl.no/karies" },
  smlLidokain: { utgiver: "Store medisinske leksikon", navn: "Lidokain", url: "https://sml.snl.no/lidokain" },
  smlPulpitt: { utgiver: "Store medisinske leksikon", navn: "Pulpitt", url: "https://sml.snl.no/pulpitt" },
  smlKompositt: { utgiver: "Store medisinske leksikon", navn: "Kompositt", url: "https://sml.snl.no/kompositt" },
  smlLysherding: { utgiver: "Store medisinske leksikon", navn: "Lysherding", url: "https://sml.snl.no/lysherding" },
  ntfKlokeValg: { utgiver: "Tannlegeforeningen", navn: "Gjør kloke valg", url: "https://www.tannlegeforeningen.no/klokevalg/" },
  // wisdom teeth
  smlVisdom: { utgiver: "Store medisinske leksikon", navn: "Visdomstennene", url: "https://sml.snl.no/visdomstennene" },
  nhiVisdom: { utgiver: "NHI.no", navn: "Innkilt visdomstann", url: "https://nhi.no/sykdommer/orenesehals/tannhelse/visdomstann-innkilt" },
  nhiPerikoronitt: { utgiver: "NHI.no", navn: "Perikoronitt", url: "https://nhi.no/sykdommer/magetarm/tannhelse/perikoronitt" },
  stoVisdom: { utgiver: "St. Olavs hospital", navn: "Fjerning av visdomstenner", url: "https://www.stolav.no/behandlinger/fjerning-av-visdomstenner/" },
  hbVisdom: { utgiver: "Helse Bergen", navn: "Visdomstenner, operasjon", url: "https://helse-bergen.no/behandlinger/visdomstenner-operasjon/" },
  // implants
  smlImplantat: { utgiver: "Store medisinske leksikon", navn: "Tannimplantat", url: "https://sml.snl.no/tannimplantat" },
  smlOralImplantologi: { utgiver: "Store medisinske leksikon", navn: "Oral implantologi", url: "https://sml.snl.no/oral_implantologi" },
  smlBroprotese: { utgiver: "Store medisinske leksikon", navn: "Broprotese", url: "https://sml.snl.no/broprotese" },
  smlTannskade: { utgiver: "Store medisinske leksikon", navn: "Tannskade", url: "https://sml.snl.no/tannskade" },
  unnImplantat: { utgiver: "Universitetssykehuset Nord-Norge", navn: "Tannimplantat", url: "https://unn.no/behandlinger/tannimplantat/" },
  // crowns
  kvKrone: { utgiver: "Gjør kloke valg (Tannlegeforeningen)", navn: "Kroneterapi bør ikke benyttes dersom det kan oppnås god kontur, funksjon og estetikk med en fylling", url: "https://www.legeforeningen.no/kloke-valg/anbefalinger/den-norske-tannlegeforening/kroneterapi-bor-ikke-benyttes-dersom-det-kan-oppnas-god-kontur-funksjon-og-estetikk-med-en-fylling/" },
  smlTannkrone: { utgiver: "Store medisinske leksikon", navn: "Tannkrone", url: "https://sml.snl.no/tannkrone" },
  smlTannprotese: { utgiver: "Store medisinske leksikon", navn: "Tannprotese", url: "https://sml.snl.no/tannprotese" },
  uioKrone: { utgiver: "Det odontologiske fakultet, UiO", navn: "Klinikkhåndbok: krone", url: "https://www.odont.uio.no/iko/om/organisasjon/fagavd/protetikk-bittfunksjon/handbok/mk%20krone%201.html" },
  uioCad: { utgiver: "Det odontologiske fakultet, UiO", navn: "Ny teknologi like bra som gammel", url: "https://www.odont.uio.no/iko/forskning/aktuelt/aktuelle-saker/2020/ny-teknologi-like-bra-som-gammel--.html" },
  // bleaching
  smlTannbleking: { utgiver: "Store medisinske leksikon", navn: "Tannbleking", url: "https://sml.snl.no/tannbleking" },
  smlTennene: KILDE.smlTennene,
  mtBleking: { utgiver: "Mattilsynet", navn: "Tannbleiking", url: "https://www.mattilsynet.no/kosmetikk-og-kroppspleieprodukter/tannbleking" },
  lovKosmetikk: { utgiver: "Lovdata", navn: "Kosmetikkforskriften (blekemidler for tenner)", url: "https://lovdata.no/dokument/SF/forskrift/2013-04-08-391" },
  tidBleking: { utgiver: "Den norske tannlegeforenings Tidende", navn: "Minimalt invasiv estetisk behandling av misfargede tenner", url: "https://www.tannlegetidende.no/article/2026/01/Minimalt-invasiv-estetisk-behandling-av-misfargede-tenner-illustrert-med-pasientkasus" },
  // bridges, veneers, dentures
  smlPlateprotese: { utgiver: "Store medisinske leksikon", navn: "Plateprotese", url: "https://sml.snl.no/plateprotese" },
  uioBro: { utgiver: "Det odontologiske fakultet, UiO", navn: "Klinikkhåndbok: broprotese", url: "https://www.odont.uio.no/studier/ressurser/protetikk/Fast%20protetikk/Broprotese/" },
  smlLaminat: { utgiver: "Store medisinske leksikon", navn: "Laminat (skallfasett)", url: "https://sml.snl.no/laminat" },
  smlFasett: { utgiver: "Store medisinske leksikon", navn: "Fasett", url: "https://sml.snl.no/fasett" },
  smlEmaljefeil: { utgiver: "Store medisinske leksikon", navn: "Emaljefeil", url: "https://sml.snl.no/emaljefeil" },
  uioAdhesiv: { utgiver: "Det odontologiske fakultet, UiO", navn: "Klinikkhåndbok: protetisk behandling med adhesiv teknikk", url: "https://www.odont.uio.no/studier/ressurser/protetikk/Fast%20protetikk/Protetisk-behandling-med-adhesiv-teknikk/" },
  uioHvite: { utgiver: "Det odontologiske fakultet, UiO", navn: "Hvite tenner?", url: "https://www.odont.uio.no/iko/om/aktuelt/aktuelle-saker/2015/hvite--tenner-.html" },
  smlGebiss: { utgiver: "Store medisinske leksikon", navn: "Gebiss", url: "https://sml.snl.no/gebiss" },
  uioHelprotese: { utgiver: "Det odontologiske fakultet, UiO", navn: "Klinikkhåndbok: helprotese", url: "https://www.odont.uio.no/studier/ressurser/protetikk/Avtagbar%20protetikk/Helsett/" },
  hdirPunkt15: { utgiver: "Helsedirektoratet", navn: "Stønadspunkt 15: helt eller delvis tanntap, uten egne tenner i underkjeven", url: "https://www.helsedirektoratet.no/rundskriv/folketrygdloven-kap-5/rundskriv-til-folketrygdloven--5-6--5-6-a-og--5-25--undersokelse-og-behandling-hos-tannlege-og-tannpleier-for-sykdom-og-skade/helsedirektoratets-utfyllende-bestemmelser-og-retningslinjer-til--1--stonadsberettiget-undersokelse-og-behandling/stonadspunkt-15-helt-eller-delvis-tanntap-uten-egne-tenner-i-underkjeven" },
  // extraction, grinding, dry mouth
  smlTanntrekking: { utgiver: "Store medisinske leksikon", navn: "Tanntrekking", url: "https://sml.snl.no/tanntrekking" },
  hnHodeHals: { utgiver: "Helsenorge", navn: "Hode- og halskreft", url: "https://www.helsenorge.no/sykdom/kreft/hode-og-halskreft/" },
  ntfBlodfortynnende: { utgiver: "Tannlegeforeningen", navn: "Håndtering av blodfortynnende ved tannbehandling", url: "https://www.tannlegeforeningen.no/arkiv/nyhetsarkiv/nyheter/2023-05-16-oppklaring-rundt-handtering-av-antikoagulantia-ved-tannbehandling.html" },
  hbKjevekirurgi: { utgiver: "Helse Bergen", navn: "Kjevekirurgisk avdeling: tilvising", url: "https://www.helse-bergen.no/avdelinger/klinikk-for-hovudhals/kjevekirurgisk-avdeling/tilvising/" },
  smlBruksisme: { utgiver: "Store medisinske leksikon", navn: "Bruksisme", url: "https://sml.snl.no/bruksisme" },
  smlBittskinne: { utgiver: "Store medisinske leksikon", navn: "Bittskinne", url: "https://sml.snl.no/bittskinne" },
  smlSlitasje: KILDE.smlSlitasje,
  nhiTanngnissing: { utgiver: "NHI.no", navn: "Tanngnissing", url: "https://nhi.no/sykdommer/magetarm/tannhelse/tanngnissing" },
  smlMunntorrhet: { utgiver: "Store medisinske leksikon", navn: "Munntørrhet", url: "https://sml.snl.no/munnt%C3%B8rrhet" },
  nhiMunntorrhet: { utgiver: "NHI.no", navn: "Munntørrhet", url: "https://nhi.no/sykdommer/magetarm/munnhule/munntorrhet" },
  // gum disease and injuries
  smlGingivitt: KILDE.smlGingivitt,
  nhiTannkjott: KILDE.nhiTannkjott,
  uioPerio: { utgiver: "Det odontologiske fakultet, UiO", navn: "Behandling av periodontitt", url: "https://www.odont.uio.no/iko/om/organisasjon/fagavd/periodonti/forskning/periodontale-sykdommer/behandlingperio.html" },
  hnLegevakt: KILDE.hnLegevakt,
  hnAkutt: { utgiver: "Helsenorge", navn: "Akutte tannskader", url: "https://www.helsenorge.no/tannhelse/akutte-tannskader/" },
  smlReimplantasjon: { utgiver: "Store medisinske leksikon", navn: "Reimplantasjon", url: "https://sml.snl.no/reimplantasjon_-_odontologi" },
  nhiTannskader: { utgiver: "NHI.no", navn: "Tannskader", url: "https://nhi.no/sykdommer/magetarm/tannhelse/tannskader" },
  // toothache and swelling
  nhiTannpine: KILDE.nhiTannpine,
  nhiTannbyll: KILDE.nhiTannbyll,
  hnTannbyll: { utgiver: "Helsenorge", navn: "Tannbyll", url: "https://www.helsenorge.no/sykdom/munn-tenner-kjeve/tannbyll/" },
  // sensitive teeth and bad breath
  tidIsing: { utgiver: "Den norske tannlegeforenings Tidende", navn: "Dentin hypersensitivitet – fint navn på banal lidelse?", url: "https://www.tannlegetidende.no/asset/2012/P12-10-816.pdf" },
  smlDarligAnde: { utgiver: "Store medisinske leksikon", navn: "Dårlig ånde", url: "https://sml.snl.no/d%C3%A5rlig_%C3%A5nde" },
  nhiDarligAnde: { utgiver: "NHI.no", navn: "Dårlig ånde", url: "https://nhi.no/sykdommer/magetarm/munnhule/darlig-ande" },
  // lost fillings and loose crowns
  tidKroneFeste: { utgiver: "Den norske tannlegeforenings Tidende", navn: "Kroneprepareringer og retensjonselementer", url: "https://www.tannlegetidende.no/journal/2010/11/dntt-394637/Kroneprepareringer_og_retensjonselementer" },
  tidSement: { utgiver: "Den norske tannlegeforenings Tidende", navn: "Retensjon av sementerte protetiske erstatninger", url: "https://www.tannlegetidende.no/journal/2021/6/m-372/Retensjon_av_sementerte_protetiske_erstatninger" },
  // partial dentures
  uioDelprotese: { utgiver: "Det odontologiske fakultet, UiO", navn: "Klinikkhåndbok: avtagbar partiell plateprotese", url: "https://www.odont.uio.no/studier/ressurser/protetikk/Avtagbar%20protetikk/Avtagbar-partiell-plateprotese/" },
  tidDelprotese: { utgiver: "Den norske tannlegeforenings Tidende", navn: "Partialproteser – fortsatt aktuell og forsvarlig behandling", url: "https://www.tannlegetidende.no/asset/2004/P04-15-837.pdf" },
  hdirRundskriv:{ utgiver: "Helsedirektoratet", navn: "Rundskriv: stønadsberettiget undersøkelse og behandling", url: "https://www.helsedirektoratet.no/rundskriv/folketrygdloven-kap-5/rundskriv-til-folketrygdloven--5-6--5-6-a-og--5-25--undersokelse-og-behandling-hos-tannlege-og-tannpleier-for-sykdom-og-skade/helsedirektoratets-utfyllende-bestemmelser-og-retningslinjer-til--1--stonadsberettiget-undersokelse-og-behandling" },
} as const satisfies Record<string, Kilde>;

/** The day the pages were last checked against their sources. */
export const BGJENNOMGATT = "2026-10-08";
