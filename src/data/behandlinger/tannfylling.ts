import { BKILDE } from "./kilder";
import type { Behandlingsside } from "./typer";

/* A filling. Every line checked on 8 October 2026 against the sources at
   the bottom; the comments name the source behind each part. No rules for
   afterwards: that differs from patient to patient, so the page says so and
   points to the dentist. */

export const tannfylling: Behandlingsside = {
  slug: "tannfylling",
  navn: "Tannfylling",
  // the clinic's own words (klinikk.ts)
  ingress: "Har du fått hull i tannen, fjerner tannlegen det ødelagte tannvevet og fyller rommet med en tannfarget fylling. Her ser du hvordan det går for seg.",
  lesetid: "2 minutter å lese",
  beskrivelse: "Tannfylling hos tannlegen i Kongsvinger: tegn på hull i tennene, hvordan en fylling lages steg for steg, bedøvelse, og hva du bør tenke på etterpå.",
  deler: [
    {
      type: "tekst",
      id: "hva",
      tittel: "Hva er en fylling?",
      avsnitt: [
        // SML Fylling: replacing lost tooth substance
        "En fylling erstatter den delen av tannen som har gått tapt.",
        // Helsenorge: recreates the tooth's form and function, and stops the hole growing
        "Den gir tannen form og funksjon igjen, og hindrer at hullet blir større.",
      ],
      tegning: "fylt",
    },
    {
      type: "tegn",
      id: "tegn",
      tittel: "Har jeg hull i tannen?",
      // Helsenorge: bacteria turn sugar from food and drink into acid
      intro: "Hull kommer når bakteriene på tennene gjør sukker fra mat og drikke om til syre.",
      punkter: [
        // Helsenorge (white spots), SML Karies (white or brown discolouring)
        { tekst: "Du ser en hvit eller brun flekk på tannen.", tegning: "flekk" },
        // Helsenorge: larger holes can give ising
        { tekst: "Det iser i tannen.", tegning: "kanaler" },
        // Helsenorge: larger holes can give toothache
        { tekst: "Det verker i tannen.", tegning: "nerve" },
      ],
      // Helsenorge: small holes give no symptoms
      etter: "Små hull gir ofte ingen plager i det hele tatt.",
    },
    // Helsedirektoratet, voksne: enamel caries should be treated without drilling
    { type: "lapp", lapp: { slag: "visste", tekst: "Ikke alle hull trenger fylling. Et tidlig hull i emaljen kan ofte stoppes uten at tannlegen borer." } },
    {
      type: "serie",
      id: "slik",
      tittel: "Slik går det for seg",
      ruter: [
        // SML Lidokain: dentists numb single teeth
        { tegning: "roligtann", tekst: "Først bedøver tannlegen tannen." },
        // Helsenorge: the dentist drills away the damaged tooth
        { tegning: "bor", tekst: "Så borer tannlegen bort det ødelagte tannvevet." },
        // SML Pulpitt: with deep fillings a protective material is laid underneath
        { tegning: "underlag", tekst: "Er hullet dypt, legges et beskyttende lag over nerven først.", mellom: true },
        // Helsenorge (tooth-coloured filling material), SML Kompositt
        { tegning: "fylt", tekst: "Hullet fylles med et tannfarget materiale som heter kompositt." },
        // SML Lysherding and Kompositt: a strong blue light hardens it
        { tegning: "lampe", tekst: "Et sterkt blått lys gjør fyllingen hard." },
      ],
    },
    // SML Kompositt: amalgam banned in 2008, composite now the most used
    { type: "lapp", lapp: { slag: "visste", tekst: "Amalgam ble forbudt i Norge i 2008. I dag er tannfarget kompositt det vanligste fyllingsmaterialet." } },
    {
      type: "tekst",
      id: "vondt",
      tittel: "Gjør det vondt?",
      avsnitt: [
        // SML Lidokain (local anaesthesia), Felleskatalogen (it works quickly)
        "Tannen bedøves før vi begynner, og bedøvelsen virker raskt.",
      ],
      tegning: "snakke",
    },
    {
      type: "tekst",
      id: "etterpa",
      tittel: "Hva skjer etterpå?",
      avsnitt: [
        // SML Pulpitt: deep fillings near the nerve can pass on cold and heat
        "Hvordan tannen kjennes etterpå, er forskjellig fra person til person. Er fyllingen dyp, kan tannen for eksempel bli mer følsom for kulde og varme.",
        "Tannlegen forteller deg hva du bør tenke på. Merker du noe som ikke går over, ring oss gjerne.",
      ],
      tegning: "klokke",
    },
    // Tannlegeforeningen Kloke valg: don't replace fillings only because they are old
    { type: "lapp", lapp: { slag: "tips", tekst: "En gammel fylling trenger ikke byttes bare fordi den er gammel. Den byttes når det er en grunn til det." } },
    {
      type: "pris",
      id: "pris",
      sporsmal: "Hva koster en fylling?",
      tekst: "Ring oss, så får du vite hva en fylling vil koste.",
      // Helfo Tilstander: adults pay as a rule; no. 10 hyposalivasjon, no. 9 attrisjon/erosjon
      helfo: "Som hovedregel betaler voksne fyllinger selv. Helfo kan dekke en del ved noen tilstander, for eksempel munntørrhet eller unormalt slitte tenner.",
      tegning: "regning",
    },
  ],
  slutt: "Tror du at du har et hull? Bestill en time, så ser vi på det.",
  kilder: [
    BKILDE.smlFylling,
    BKILDE.hnHull,
    BKILDE.smlKaries,
    BKILDE.hdirVoksne,
    BKILDE.smlLidokain,
    BKILDE.smlPulpitt,
    BKILDE.smlKompositt,
    BKILDE.smlLysherding,
    BKILDE.fkXylocain,
    BKILDE.ntfKlokeValg,
    BKILDE.helfoTilstander,
  ],
};
