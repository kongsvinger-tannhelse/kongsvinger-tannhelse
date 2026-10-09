import { BKILDE } from "./kilder";
import type { Behandlingsside } from "./typer";

/* A tooth hurt by a fall or a blow. Every line checked on 8 October 2026
   against the sources at the bottom; the comments name the source behind
   each part. The first aid is only what Helsenorge (Helsedirektoratet)
   says, since the sources differ on rinsing and on keeping the tooth in the
   mouth; nothing beyond it. */

export const tannskade: Behandlingsside = {
  slug: "tannskade",
  navn: "Tannskade",
  // the clinic's own words (klinikk.ts)
  ingress: "Er en tann løs, slått inn, slått ut eller knekt? Kontakt tannlegen så snart som mulig, og ta med tannen eller biten hvis du finner den.",
  tittelbilde: "ball",
  beskrivelse: "Tannskade hos tannlegen i Kongsvinger: hva du gjør hvis en tann blir slått ut eller knekker, hvordan tannlegen behandler skaden, og hvem som betaler.",
  deler: [
    {
      type: "tekst",
      id: "hva",
      tittel: "Hva er en tannskade?",
      avsnitt: [
        // SML Tannskade: a mechanical blow; sport, traffic accidents, fights
        "En tannskade kommer av et slag mot en eller flere tenner, for eksempel ved et fall, i sport eller i trafikken.",
        // NHI Tannskader: broken, loosened, lost or pushed-in tooth
        "Tannen kan knekke, løsne, bli slått inn eller slått helt ut.",
      ],
      tegning: "fortann-knekt",
    },
    {
      type: "tekst",
      id: "slatt-ut",
      tittel: "Hvis en tann blir slått ut",
      avsnitt: [
        // Helsenorge, Akutte tannskader: a permanent tooth knocked out, see a dentist as quickly as possible
        "Er en voksentann slått ut, er det viktig å komme til tannlegen så raskt som mulig.",
        // Helsenorge: don't touch the root; keep it in milk; the root must not dry out
        "Ta i tannen uten å røre roten, og pass på at den ikke tørker. Den kan for eksempel ligge i melk på veien.",
        // Helsenorge: milk teeth are not put back
        "Melketenner skal ikke settes tilbake.",
        // Helsenorge: out of hours, contact the legevakt
        "Har vi stengt, kan du kontakte legevakten på 116 117.",
      ],
      tegning: "melk",
    },
    // SML Reimplantasjon: the cells only survive if the tooth is kept moist
    { type: "lapp", lapp: { slag: "visste", tekst: "Cellene på roten tåler ikke å tørke. Derfor haster det, og tannen bør holdes fuktig." } },
    {
      type: "serie",
      id: "slik",
      tittel: "Slik går det for seg hos tannlegen",
      ruter: [
        // NHI Tannskader: x-rays of injured teeth are needed
        { tegning: "rontgen-fortann", tekst: "Tannlegen undersøker tannen og tar røntgenbilder." },
        // SML Tannskade: small fractures with a filling
        { tegning: "fylt-fortann", tekst: "Er en liten bit borte, kan tannen ofte repareres med en fylling." },
        // SML Tannskade: larger ones with a crown
        { tegning: "krone-fortann", tekst: "Er mye borte, kan tannen trenge en krone." },
        // SML Tannskade: a root filling if the nerve is involved
        { tegning: "rot-renses", tekst: "Er nerven skadet, kan tannen trenge en rotfylling.", mellom: true },
        // Helsenorge (a plan for follow-up and checks), SML Tannskade (long-term follow-up)
        { tegning: "kontroller", tekst: "Etterpå lager tannlegen en plan for kontroller, for noen skader viser seg først senere." },
      ],
      // Helsenorge: it depends on your age and how big the injury is
      etter: "Hva som trengs, kommer an på hvor stor skaden er, og hvor gammel du er.",
    },
    {
      type: "tekst",
      id: "folge-med",
      tittel: "Hva bør jeg følge med på?",
      avsnitt: [
        // Helsenorge: contact the dentist if pain continues, it is sore when eating, it changes colour or gets looser, or a lump or swelling comes
        "Noen ganger viser en skade seg først senere. Ta kontakt hvis det fortsetter å gjøre vondt, tannen skifter farge eller blir løsere, eller du får en kul eller hevelse i tannkjøttet.",
      ],
      tegning: "fortann-endring",
    },
  ],
  slutt: "Har du skadet en tann? Ring oss så snart du kan.",
  kilder: [BKILDE.hnAkutt, BKILDE.smlTannskade, BKILDE.smlReimplantasjon, BKILDE.nhiTannskader, BKILDE.hnLegevakt],
};
