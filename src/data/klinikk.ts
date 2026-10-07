/* Facts about the clinic, taken from the old site (crawl/SITE-BRIEF.md, 2026-10-06). */

export const klinikk = {
  navn: "Kongsvinger Tannhelse",
  undertittel: "Tannlege Hafthun & Zia",
  url: "https://kongsvingertannhelse.no",
  telefon: { visning: "62 81 50 09", lenke: "tel:+4762815009" },
  epost: "post@kongsvingertannhelse.no",
  adresse: { gate: "Fjellgata 4", postnummer: "2212", sted: "Kongsvinger" },
  // From the Google Maps embed on the old site
  geo: { lat: 60.1915, lng: 11.9955 },
  apningstider: { dager: "Mandag–fredag", fra: "08:30", til: "15:30" },
} as const;

export const ansatte = [
  { navn: "Per Hafthun", rolle: "Tannlege", bilde: "/images/klinikk/hafthun.jpg" },
  { navn: "Umer Zia", rolle: "Tannlege", bilde: "/images/klinikk/zia.jpg" },
  { navn: "Eba Wasty", rolle: "Tannpleier", bilde: "/images/klinikk/eba.jpg" },
] as const;

export type Behandling = { navn: string; tekst: string };

/* The old site's three groups. Typos from the old copy are corrected. */
export const behandlinger: Record<"ordinaer" | "akutt" | "estetisk", { tittel: string; liste: Behandling[] }> = {
  ordinaer: {
    tittel: "Ordinære behandlinger",
    liste: [
      { navn: "Tannsjekk", tekst: "En tannsjekk lar tannlegen se om du har noen tannproblemer, og hjelper deg å holde munnen frisk. Det er best å håndtere problemer tidlig, eller forhindre dem helt." },
      { navn: "Tannfylling", tekst: "En fylling behandler et lite hull i en tann. Tannlegen fjerner det ødelagte tannvevet og fyller rommet med fyllmateriale. Fyllmateriale kan også brukes estetisk, for eksempel for å endre tannform eller lukke mellomrom." },
      { navn: "Tannbleking", tekst: "Tannlegen tar avtrykk og lager en blekeskinne du bruker hjemme med blekegel, ikke mer enn ti dager av gangen. Bør brukes sammen med fluorbehandling." },
      { navn: "Tannrens", tekst: "En tannrens fjerner plakk og tannstein som bygger seg opp over tid. Fjernes de ikke jevnlig, kan bakteriene gi hull og tannkjøttsykdom." },
      { navn: "Tannkjøttbehandling", tekst: "Gingivitt er det tidligste stadiet av tannkjøttsykdom: rødt, hovent eller blødende tannkjøtt. Behandlingen er jevnlig rens og bedre munnhygiene hjemme." },
      { navn: "Tannstein", tekst: "Tannstein er forkalket plakk. Bare tannlege eller tannpleier kan fjerne den; børsting og tanntråd alene holder ikke." },
      { navn: "Rotfylling", tekst: "Betent, infisert eller død nerve fjernes, nerverommet renses og desinfiseres, og tannen fylles og forsegles. Behandlingen kan som oftest gjøres smertefritt og fjerner ofte smerten med en gang." },
      { navn: "Munntørrhet", tekst: "Redusert spyttstrøm kan gi ubehag, dårlig ånde og mer hull. Vanlig hos eldre, ved medisinbruk og hos kreftpasienter." },
      { navn: "Tanngnissing", tekst: "Ufrivillig sammenbiting, oftest i søvne. Behandles med bittskinne om natten, reparasjon av skader og stressbehandling." },
      { navn: "Ising i tenner", tekst: "Følsomme tenner skyldes oftest slitt emalje eller blottlagte tannrøtter, men kan også komme av hull, sprekk, slitt fylling eller tannkjøttsykdom." },
      { navn: "Trekking av tenner", tekst: "Tenner som ikke kan reddes på grunn av råte, tannkjøttsykdom eller skade, særlig når de gir tannpine." },
      { navn: "Dårlig ånde", tekst: "Svært vanlig, og som regel noe du kan gjøre noe med selv: hold tenner, tunge og munn rene." },
      { navn: "Visdomstenner", tekst: "Visdomstenner som sitter fast og gir tilbakevendende betennelse kan fjernes når annen behandling ikke har hjulpet." },
    ],
  },
  akutt: {
    tittel: "Akutt tannbehandling",
    liste: [
      { navn: "Tannsmerte", tekst: "Har du vedvarende smerter, er det på tide å oppsøke tannlege. Årsaken kan være råte, en sprukket tann eller en infeksjon." },
      { navn: "Tannskade", tekst: "Løs, innslått, mistet eller knekt tann. Kontakt oss så snart som mulig." },
      { navn: "Tannverk", tekst: "Mindre tannverk kan komme av irritert tannkjøtt. Mer alvorlig verk skyldes hull, infeksjon eller sykdom som ikke går over av seg selv." },
      { navn: "Mistet fylling", tekst: "Kontakt tannlegen så snart som mulig. Hold området rent og unngå å tygge på det til du kommer inn." },
      { navn: "Hevelse", tekst: "Hevelse rundt en tann eller i ansiktet: ta kontakt så fort det lar seg gjøre. Noen ganger trengs antibiotika." },
      { navn: "Løsnet tannkrone", tekst: "Tanngnissing, råte, slag eller klissete mat kan løsne en krone, og sementen kan svekkes over tid." },
    ],
  },
  estetisk: {
    tittel: "Estetisk tannbehandling",
    liste: [
      { navn: "Tannkrone", tekst: "En tannformet hette som gjenoppretter en svekket tann og kan forlenge levetiden til den." },
      { navn: "Tannbro", tekst: "Erstatter én eller flere manglende tenner med kroner på nabotennene, og sitter fast permanent." },
      { navn: "Skallfasetter", tekst: "Tynne skall av keramikk eller kompositt som festes på tannen for en hvitere overflate." },
      { navn: "Tannimplantat", tekst: "En skrue i kjevebenet som vokser fast og bærer en krone. Et fast alternativ til protese og bro, når kjevebenet er godt nok." },
      { navn: "Delprotese", tekst: "En avtakbar protese som festes på de gjenværende tennene og erstatter dem som mangler." },
      { navn: "Helprotese", tekst: "Et avtakbart tannsett når alle tennene i en kjeve er borte, tilpasset så det sitter med vakuumsug." },
    ],
  },
};

/* Photos from the clinic (from the old site). The first three are the ones the
   front page shows; the rest open in the gallery. */
export const klinikkbilder = [
  { src: "/images/klinikk/bilde3.jpg", tekst: "Behandlingsrommet, sett i det runde speilet", bredde: 2400, hoyde: 1920 },
  { src: "/images/klinikk/bilde8.jpg", tekst: "Et av behandlingsrommene", bredde: 2400, hoyde: 1920 },
  { src: "/images/klinikk/bilde9.jpg", tekst: "Venterommet", bredde: 1946, hoyde: 1556 },
  { src: "/images/klinikk/bilde6.jpg", tekst: "Behandlingsstolen, klar for neste pasient", bredde: 2400, hoyde: 1920 },
  { src: "/images/klinikk/bilde5.jpg", tekst: "Instrumentene ved stolen", bredde: 2400, hoyde: 1920 },
  { src: "/images/klinikk/bilde2.jpg", tekst: "Utstyret i behandlingsrommet", bredde: 2400, hoyde: 1920 },
  { src: "/images/klinikk/bilde4.jpg", tekst: "Benken i behandlingsrommet", bredde: 2400, hoyde: 1920 },
  { src: "/images/klinikk/bilde1.jpg", tekst: "En detalj fra venterommet", bredde: 2400, hoyde: 1920 },
] as const;

/* The hero photograph. Kept here, not in the client component that shows it:
   a server component importing a constant from a "use client" module gets a
   reference, not the value. */
export const utsiktKreditt = {
  sted: "Utsikten fra Kongsvinger festning",
  fotograf: "SiljeAO / Pexels",
  href: "https://www.pexels.com/photo/view-from-the-kongsvinger-fortress-hedmark-norway-14777353/",
} as const;
