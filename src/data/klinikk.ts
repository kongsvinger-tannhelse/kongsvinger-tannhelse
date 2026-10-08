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
  apningstider: { dager: "Mandag–fredag", fra: "08:30", til: "15:30", stengt: "Lørdag–søndag" },
} as const;

export const ansatte = [
  { navn: "Per Hafthun", rolle: "Tannlege", bilde: "/images/klinikk/hafthun.webp" },
  { navn: "Umer Zia", rolle: "Tannlege", bilde: "/images/klinikk/zia.webp" },
  { navn: "Eba Wasty", rolle: "Tannpleier", bilde: "/images/klinikk/eba.webp" },
] as const;

export type Behandling = { navn: string; tekst: string };

/* The old site's three groups and treatments. The text is rewritten in plain
   words, with the words people search for (tannlege, tannpine, hvite tenner),
   but says nothing the old site didn't: no prices, no promises. */
export const behandlinger: Record<"ordinaer" | "akutt" | "estetisk", { tittel: string; ingress: string; liste: Behandling[] }> = {
  ordinaer: {
    tittel: "Ordinære behandlinger",
    ingress:
      "Det meste vi gjør er vanlig tannbehandling: tannsjekk, tannrens og fyllinger, og hjelp med plager som ising, munntørrhet og tanngnissing. Går du jevnlig til tannlegen, holder tennene seg friske lenger.",
    liste: [
      { navn: "Tannsjekk", tekst: "En tannsjekk hos tannlegen er den enkleste måten å holde munnen frisk på. Vi ser etter hull, tannkjøttsykdom og slitasje, og finner problemer tidlig, mens de er små og enkle å behandle." },
      { navn: "Tannfylling", tekst: "Har du fått hull i tannen, fjerner tannlegen det ødelagte tannvevet og fyller rommet med en tannfarget fylling. Fyllingsmateriale kan også endre formen på en tann eller lukke et lite mellomrom." },
      { navn: "Tannbleking", tekst: "Vil du ha hvitere tenner? Bleking med blekegel kan gjøre tennene lysere. Tannlegen ser først på tennene og forteller hva som passer for deg." },
      { navn: "Tannrens", tekst: "En tannrens fjerner plakk og tannstein som har bygget seg opp over tid. Blir de ikke fjernet jevnlig, kan bakteriene gi hull i tennene og tannkjøttsykdom." },
      { navn: "Tannkjøttbehandling", tekst: "Rødt, hovent eller blødende tannkjøtt er ofte gingivitt, det tidligste stadiet av tannkjøttsykdom. Behandlingen er jevnlig tannrens hos oss og god munnhygiene hjemme." },
      { navn: "Tannstein", tekst: "Tannstein er plakk som har hardnet på tennene. Den sitter så godt fast at tannbørste og tanntråd ikke får den bort. Bare tannlege eller tannpleier kan fjerne den." },
      { navn: "Rotfylling", tekst: "Er nerven i tannen betent, infisert eller død, kan en rotfylling redde tannen. Nerven fjernes, rotkanalene renses og desinfiseres, og tannen fylles og forsegles. Tannlegen kan bedøve tannen først. Hvordan det kjennes, er forskjellig fra person til person." },
      { navn: "Munntørrhet", tekst: "Munntørrhet betyr at du lager for lite spytt. Det kan gi ubehag, dårlig ånde og flere hull i tennene. Det er vanlig hos eldre, ved bruk av en del medisiner og hos kreftpasienter." },
      { navn: "Tanngnissing", tekst: "Tanngnissing er at du biter hardt sammen eller gnisser tennene uten å merke det, oftest mens du sover. Behandlingen er bittskinne om natten, reparasjon av skader på tennene og stressbehandling." },
      { navn: "Ising i tenner", tekst: "Isner det i tennene når du drikker noe kaldt? Følsomme tenner skyldes oftest slitt emalje eller blottlagte tannrøtter, men kan også komme av hull, en sprekk, en slitt fylling eller tannkjøttsykdom." },
      { navn: "Trekking av tenner", tekst: "Noen tenner kan ikke reddes, på grunn av råte, tannkjøttsykdom eller skade. Da trekker tannlegen tannen, særlig når den gir tannpine. Etterpå kan tannen erstattes, for eksempel med et implantat eller en bro." },
      { navn: "Dårlig ånde", tekst: "Dårlig ånde er svært vanlig, og som regel kan du gjøre mye med det selv: hold tenner, tunge og munn rene. Går det ikke over, kan tannlegen se etter årsaken." },
      { navn: "Visdomstenner", tekst: "En visdomstann som sitter fast og gir betennelse igjen og igjen, kan trekkes når annen behandling ikke har hjulpet. Tannlegen vurderer om tannen bør fjernes." },
    ],
  },
  akutt: {
    tittel: "Akutt tannbehandling",
    ingress:
      "Har du fått tannpine, slått en tann eller mistet en fylling? Ring oss så tidlig på dagen som mulig. Vi gjør vårt beste for å gi deg time samme dag. Vi har åpent mandag til fredag 08:30–15:30.",
    liste: [
      { navn: "Tannsmerte", tekst: "Har du vedvarende smerter i en tann, er det på tide å gå til tannlegen. Årsaken kan være råte, en sprukket tann eller en infeksjon." },
      { navn: "Tannskade", tekst: "Er en tann løs, slått inn, slått ut eller knekt? Kontakt tannlegen så snart som mulig, og ta med tannen eller biten hvis du finner den." },
      { navn: "Tannverk", tekst: "Lett tannverk kan komme av irritert tannkjøtt. Sterkere tannverk skyldes ofte hull, infeksjon eller sykdom, og går ikke over av seg selv. Da trenger du tannlege." },
      { navn: "Mistet fylling", tekst: "Har du mistet en fylling, kontakt tannlegen så snart som mulig. Hold området rent og unngå å tygge på den siden til du kommer inn." },
      { navn: "Hevelse", tekst: "Hevelse rundt en tann eller i ansiktet kan komme av en infeksjon. Ta kontakt så fort det lar seg gjøre; noen ganger trengs antibiotika. Har du feber, eller blir det tungt å svelge eller puste, ring legevakten på 116 117." },
      { navn: "Løsnet tannkrone", tekst: "En tannkrone kan løsne av tanngnissing, råte, et slag eller klissete mat, og sementen kan svekkes over tid. Ta vare på kronen og ta den med til tannlegen." },
    ],
  },
  estetisk: {
    tittel: "Estetisk tannbehandling",
    ingress:
      "Estetisk tannbehandling gir deg et finere smil og tenner som virker som de skal: tannkroner, tannbroer, skallfasetter, tannimplantat og proteser. Vi forklarer valgene, så du kan bestemme hva som passer for deg.",
    liste: [
      { navn: "Tannkrone", tekst: "En tannkrone er en hette formet som en tann, som settes over en svekket tann. Den gir tannen styrke og form igjen, og kan forlenge levetiden til tannen." },
      { navn: "Tannbro", tekst: "En tannbro erstatter én eller flere tenner som mangler. Den festes til kroner på nabotennene og sitter fast hele tiden, så du slipper å ta den ut." },
      { navn: "Skallfasetter", tekst: "Skallfasetter er tynne skall av keramikk eller kompositt som festes på forsiden av tennene, for en hvitere og jevnere overflate." },
      { navn: "Tannimplantat", tekst: "Et tannimplantat er en liten skrue i kjevebenet som vokser fast og bærer en ny tann. Det er et fast alternativ til protese og bro, når kjevebenet er godt nok." },
      { navn: "Delprotese", tekst: "En delprotese er en avtakbar protese som festes til tennene du har igjen, og erstatter de tennene som mangler." },
      { navn: "Helprotese", tekst: "En helprotese er et avtakbart tannsett når alle tennene i en kjeve er borte. Den tilpasses munnen din, så den sitter fast med vakuumsug." },
    ],
  },
};

/* Photos from the clinic (from the old site). The first three are the ones the
   front page shows; the rest open in the gallery. */
export const klinikkbilder = [
  { src: "/images/klinikk/bilde3.webp", tekst: "Behandlingsrommet, sett i det runde speilet", bredde: 2400, hoyde: 1920 },
  { src: "/images/klinikk/bilde8.webp", tekst: "Et av behandlingsrommene", bredde: 2400, hoyde: 1920 },
  { src: "/images/klinikk/bilde9.webp", tekst: "Venterommet", bredde: 1946, hoyde: 1556 },
  { src: "/images/klinikk/bilde6.webp", tekst: "Behandlingsstolen, klar for neste pasient", bredde: 2400, hoyde: 1920 },
  { src: "/images/klinikk/bilde5.webp", tekst: "Instrumentene ved stolen", bredde: 2400, hoyde: 1920 },
  { src: "/images/klinikk/bilde2.webp", tekst: "Utstyret i behandlingsrommet", bredde: 2400, hoyde: 1920 },
  { src: "/images/klinikk/bilde4.webp", tekst: "Benken i behandlingsrommet", bredde: 2400, hoyde: 1920 },
  { src: "/images/klinikk/bilde1.webp", tekst: "En detalj fra venterommet", bredde: 2400, hoyde: 1920 },
] as const;

/* The hero photograph. Kept here, not in the client component that shows it:
   a server component importing a constant from a "use client" module gets a
   reference, not the value. */
export const utsiktKreditt = {
  sted: "Utsikten fra Kongsvinger festning",
  fotograf: "SiljeAO / Pexels",
  href: "https://www.pexels.com/photo/view-from-the-kongsvinger-fortress-hedmark-norway-14777353/",
} as const;
