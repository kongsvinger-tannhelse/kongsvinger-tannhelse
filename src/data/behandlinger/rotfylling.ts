import { BKILDE } from "./kilder";
import type { Behandlingsside } from "./typer";

/* Root canal treatment. Every line checked on 8 October 2026 against the
   sources at the bottom; the comments name the source behind each part.
   «Som oftest smertefritt» and «tannpinen går ofte over med en gang» are
   the clinic's own words (klinikk.ts, from the old site). Nothing about how
   long it is tender afterwards, eating afterwards, or how often it works:
   no source of the kind we use says it. */

export const rotfylling: Behandlingsside = {
  slug: "rotfylling",
  navn: "Rotfylling",
  // SML Rotfylling
  ingress: "Er nerven inne i tannen betent eller død, kan en rotfylling redde tannen. Her ser du hva som skjer, steg for steg.",
  lesetid: "3 minutter å lese",
  beskrivelse: "Rotfylling hos tannlegen i Kongsvinger: hva det er, tegn på at nerven er syk, hvordan det foregår steg for steg, om det gjør vondt, og hva som skjer etterpå.",
  deler: [
    {
      type: "tekst",
      id: "hva",
      tittel: "Hva er en rotfylling?",
      avsnitt: [
        // SML Tannrotbetennelse: the hollow inside every tooth, «tannens nerve»
        "Inne i hver tann er det et lite hulrom som kalles tannpulpa, eller «nerven».",
        // SML Rotfylling and Tannrotbetennelse; Helsenorge: the nerve is removed and the root filled
        "Blir nerven betent eller dør, fjerner tannlegen den, renser kanalene inne i roten og fyller dem igjen. Det kalles en rotfylling.",
      ],
      tegning: "nerve",
    },
    {
      type: "tegn",
      id: "tegn",
      tittel: "Kjenner du noe av dette?",
      // SML Tannrotbetennelse: mostly caries, also crowns or fillings, or a blow; Helsenorge: a hole deep enough to reach the nerve
      intro: "Som regel kommer det av et hull som har gått helt inn til nerven. Det kan også komme av en gammel fylling eller krone, eller et slag mot tannen.",
      punkter: [
        // SML Tannsmerter
        { tekst: "Det iser lenge etter at du har drukket noe kaldt.", tegning: "kanaler" },
        // SML Tannsmerter
        { tekst: "Det verker av seg selv, uten at du har spist eller drukket noe.", tegning: "betennelse" },
        // SML Tannrotbetennelse
        { tekst: "Det gjør vondt å tygge på tannen.", tegning: "stille" },
        // SML Tannbyll
        { tekst: "Det har kommet en hevelse eller kul i tannkjøttet.", tegning: "hevelse" },
        // SML Tannrotbetennelse (trauma)
        { tekst: "Tannen har fått et kraftig slag.", tegning: "sprekk" },
      ],
      // SML Rotfylling (chronic inflammation can give no symptoms), Tannrotbetennelse (x-ray)
      etter: "Noen ganger merker du ingenting. Da ser tannlegen det på røntgen.",
    },
    // Helsedirektoratet, via «Redd for tannlegen?»: preparation and predictability help
    { type: "lapp", lapp: { slag: "tips", tekst: "Gruer du deg? Si fra når du bestiller time, så kan tannlegen forklare hva som skjer underveis." } },
    {
      type: "serie",
      id: "slik",
      tittel: "Slik går det for seg",
      ruter: [
        // SML Tannrotbetennelse: history, examination, x-ray
        { tegning: "rontgen", tekst: "Først ser tannlegen på tannen og tar et røntgenbilde." },
        // UiO and Helsedirektoratet: anaesthesia
        { tegning: "roligtann", tekst: "Tannen kan bedøves før vi begynner." },
        // SML Rotfylling: a disinfected rubber dam, sterile instruments
        { tegning: "gummiduk", tekst: "En tynn gummiduk holder tannen ren og tørr." },
        // SML Rotfylling and Tannrotbetennelse: remove the infection, rinse with a bacteria-killing liquid
        { tegning: "rot-renses", tekst: "Nerven tas ut, og kanalene renses med en væske som dreper bakterier." },
        // UiO: calcium hydroxide as a temporary antibacterial medicine between visits
        { tegning: "rot-medisin", tekst: "Trengs det flere besøk, får tannen medisin inni og et lokk på toppen.", mellom: true },
        // SML Rotfylling: a bacteria-tight root filling, then a filling or a crown
        { tegning: "rot-fylt", tekst: "Til slutt fylles kanalene tett, og tannen får en fylling eller en krone." },
      ],
      // SML Rotfylling (often several visits, molars have several canals), UiO (a living tooth can be done in one)
      etter: "Ofte trengs det flere besøk, særlig for jekslene, som har flere kanaler. Noen ganger kan alt gjøres på ett besøk.",
    },
    // SML Rotfylling: front teeth usually one canal, molars several
    { type: "lapp", lapp: { slag: "visste", tekst: "Fortennene har som regel én rotkanal. Jekslene har flere, og da tar det ofte litt lengre tid." } },
    {
      type: "tekst",
      id: "vondt",
      tittel: "Gjør det vondt?",
      avsnitt: [
        // UiO and Helsedirektoratet (anaesthesia); the clinic's own words
        "Tannlegen kan bedøve tannen før behandlingen. Hos oss gjøres rotfylling som oftest smertefritt, og tannpinen går ofte over med en gang.",
        // SML Tannbyll: draining an abscess relieves the pressure pain
        "Har du en byll, kan det lette med en gang trykket slipper ut.",
        // UiO: the patient is told what to expect afterwards
        "Tannlegen forteller deg hva du kan vente deg de første dagene etterpå.",
      ],
      tegning: "snakke",
    },
    {
      type: "tekst",
      id: "etterpa",
      tittel: "Hva skjer etterpå?",
      avsnitt: [
        // SML Tannrotbetennelse
        "Som regel virker tannen helt som før etter en rotfylling.",
        // Tannlegeforeningen Kloke valg: a crown only when a filling can't give good form, function and look
        "Ofte holder det med en vanlig fylling. En krone lages bare når en fylling ikke kan gi tannen god form og funksjon.",
        // UiO: the final result can only be judged at the check after a year
        "Om rotfyllingen har lykkes, kan man først se sikkert ved en kontroll etter omtrent et år.",
        // NHI Pulpitt (extraction is the alternative; the inflammation can spread)
        "Det andre valget er å trekke tannen. Venter du for lenge, kan betennelsen spre seg til tannkjøttet og beinet rundt tannen.",
      ],
      tegning: "rot-krone",
    },
    // SML Tannbleking: a root-filled, discoloured tooth can be bleached from inside, by a dentist
    { type: "lapp", lapp: { slag: "visste", tekst: "Har en rotfylt tann blitt mørkere, kan den blekes innenfra hos tannlegen." } },
    {
      type: "pris",
      id: "pris",
      sporsmal: "Hva koster en rotfylling?",
      tekst: "Prisen kommer an på tannen og hvor mange besøk som trengs. Ring oss, så får du vite hva det vil koste.",
      // Helfo Tilstander: adults pay as a rule; no. 13 tannskade ved ulykke
      helfo: "Som hovedregel betaler voksne rotfyllingen selv. Helfo kan dekke en del, for eksempel ved en tannskade etter en ulykke.",
      tegning: "regning",
    },
  ],
  slutt: "Lurer du på om tannen din trenger en rotfylling? Bestill en time, så ser vi på den.",
  kilder: [
    BKILDE.smlRotfylling,
    BKILDE.smlTannrotbetennelse,
    BKILDE.smlTannsmerter,
    BKILDE.smlTannbyll,
    BKILDE.smlTannbleking,
    BKILDE.hnHull,
    BKILDE.nhiPulpitt,
    BKILDE.ntfKlokeValg,
    BKILDE.uioEndodonti,
    BKILDE.helfoTilstander,
  ],
};
