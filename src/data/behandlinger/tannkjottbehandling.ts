import { BKILDE } from "./kilder";
import type { Behandlingsside } from "./typer";

/* Treatment of gum disease. Every line checked on 8 October 2026 against the
   sources at the bottom; the comments name the source behind each part. No
   promise that lost tissue comes back (SML: unpredictable, and limited). */

export const tannkjottbehandling: Behandlingsside = {
  slug: "tannkjottbehandling",
  navn: "Tannkjøttbehandling",
  // the clinic's own words (klinikk.ts)
  ingress: "Rødt, hovent eller blødende tannkjøtt er ofte gingivitt, det tidligste stadiet av tannkjøttsykdom. Her ser du hvordan tannkjøttsykdom behandles, og hva du selv kan gjøre.",
  hosOss: "Hos oss på Kongsvinger Tannhelse ser vi på tannkjøttet ditt, og henviser deg videre hvis det trengs.",
  tittelbilde: "tannkjott",
  beskrivelse: "Tannkjøttbehandling hos tannlegen i Kongsvinger: gingivitt og periodontitt, tegn på tannkjøttsykdom, hvordan det behandles, og hva du selv kan gjøre.",
  deler: [
    {
      type: "tekst",
      id: "hva",
      tittel: "Hva er tannkjøttsykdom?",
      avsnitt: [
        // SML Periodontitt: bacteria on the tooth surface, in the gap between tooth and gum
        "Tannkjøttsykdom kommer av bakterier som vokser på tennene, i kanten mellom tannen og tannkjøttet.",
        // SML Gingivitt (the attachment is intact) and Periodontitt (the tissue round the teeth breaks down)
        "Den milde formen heter gingivitt. Da sitter tennene fortsatt godt fast, og betennelsen kan gå over. Blir det periodontitt, brytes vevet som holder tennene, sakte ned.",
      ],
      tegning: "to-stadier",
    },
    {
      type: "tegn",
      id: "tegn",
      tittel: "Kjenner du noe av dette?",
      punkter: [
        // SML Periodontitt: red and/or swollen gums that bleed when brushing or flossing
        { tekst: "Tannkjøttet er rødt eller hovent.", tegning: "tannkjott" },
        { tekst: "Det blør når du pusser eller bruker tanntråd.", tegning: "blor" },
        // NHI Tannkjøttbetennelse: bad breath among the first signs
        { tekst: "Du har dårlig ånde.", tegning: "ande" },
        // SML Periodontitt: teeth that have moved or loosened
        { tekst: "Tenner har flyttet seg eller løsnet.", tegning: "los-tann" },
      ],
      // SML Periodontitt: often not noticed until teeth have moved or loosened
      etter: "Mange merker lite i starten.",
    },
    // SML Periodontitt: about half of all adults have it, mild or more severe
    { type: "lapp", lapp: { slag: "visste", tekst: "Omtrent halvparten av alle voksne har periodontitt, i mild eller mer alvorlig grad." } },
    {
      type: "serie",
      id: "slik",
      tittel: "Slik behandles det",
      ruter: [
        // SML Gingivitt and Periodontitt: dentists or hygienists diagnose it; the pocket depth is measured
        { tegning: "sonde", tekst: "Vi undersøker tannkjøttet og måler hvor dypt det går ned langs tennene." },
        // UiO, Behandling av periodontitt: the patient learns an effective way to keep the teeth clean
        { tegning: "hjem-utstyr", tekst: "Du får råd om hvordan du best holder tennene rene hjemme." },
        // SML Periodontitt (remove plaque and tartar), UiO (scraped away under the gum margin)
        { tegning: "skrape-under", tekst: "Bakteriebelegg og tannstein, også under tannkjøttkanten, skrapes bort." },
        // SML Periodontitt: in some severe cases surgery may be needed
        { tegning: "for-etter", tekst: "Etterpå ser vi hvordan det har gått. Noen ganger trengs mer behandling.", mellom: true },
        // UiO: regular follow-up with checks and new cleaning is very important
        { tegning: "gjentak", tekst: "Faste kontroller og ny rens hjelper med å holde sykdommen i sjakk." },
      ],
      // Helsedirektoratet rundskriv: referral from a general dentist or hygienist to a specialist in periodontics
      etter: "Ved alvorlig periodontitt kan det være aktuelt å bli henvist til en spesialist.",
    },
    {
      type: "tekst",
      id: "bra",
      tittel: "Blir det bra igjen?",
      avsnitt: [
        // SML Gingivitt: removing the plaque makes the inflammation go
        "Gingivitt går over når bakteriebelegget fjernes.",
        // SML Periodontitt: the outcome depends on how much is already lost; regrowth is unpredictable and limited
        "Ved periodontitt kan behandlingen stoppe sykdommen, men vev som er borte, kommer sjelden helt tilbake. Hvordan det går, er forskjellig fra person til person, blant annet etter hvor langt sykdommen har kommet.",
      ],
      tegning: "tapt-vev",
    },
    {
      type: "tekst",
      id: "selv",
      tittel: "Hva kan jeg gjøre selv?",
      avsnitt: [
        // SML Periodontitt: cleaning aids vary from patient to patient; UiO: daily cleaning is crucial
        "Det viktigste er å holde tennene rene hver dag. Hva slags hjelpemidler som passer, er forskjellig fra person til person, og vi gir deg råd.",
        // SML Periodontitt: smoking can give a poorer outcome
        "Røyking kan gjøre at behandlingen virker dårligere.",
      ],
      tegning: "borste",
    },
  ],
  slutt: "Blør tannkjøttet, eller lurer du på om du har tannkjøttsykdom? Bestill en time, så ser vi på det.",
  kilder: [BKILDE.smlPeriodontitt, BKILDE.smlGingivitt, BKILDE.nhiTannkjott, BKILDE.uioPerio, BKILDE.hdirRundskriv],
};
