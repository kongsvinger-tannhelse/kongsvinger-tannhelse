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
  fkXylocain: { utgiver: "Felleskatalogen", navn: "Pakningsvedlegg for Xylocain Dental adrenalin", url: "https://www.felleskatalogen.no/medisin/pasienter/pil-xylocain-dental-adrenalin-dentsply-565545" },
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
  // who pays
  hnTannlegeregning: KILDE.hnTannlegeregning,
  helfoTilstander: { utgiver: "Helfo", navn: "Tilstander som kan gi rett til stønad til tannbehandling", url: "https://www.helfo.no/tannlege/regelverk-og-takster-for-tannlege/tilstander-som-kan-gi-rett-til-st%C3%B8nad-til-tannbehandling" },
} as const satisfies Record<string, Kilde>;

/** The day the pages were last checked against their sources. */
export const BGJENNOMGATT = "2026-10-08";
