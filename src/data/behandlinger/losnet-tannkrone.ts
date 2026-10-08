import { BKILDE } from "./kilder";
import type { Behandlingsside } from "./typer";

/* A crown that has come loose. Every line checked on 8 October 2026 against
   the sources at the bottom; the comments name the source behind each part.
   The book's «keep the crown and bring it» is left out, and so is «a blow»
   as a cause: no official source says them. Whether the same crown can go
   back on is the dentist's to say, so the page does not promise it. */

export const losnetTannkrone: Behandlingsside = {
  slug: "losnet-tannkrone",
  navn: "Løsnet tannkrone",
  ingress: "Har en tannkrone løsnet, ta kontakt med tannlegen. Her ser du hvordan en krone sitter fast, hvorfor den kan løsne, og hva tannlegen gjør.",
  tittelbilde: "vind",
  lesetid: "2 minutter å lese",
  beskrivelse: "Løsnet tannkrone hos tannlegen i Kongsvinger: hvordan en krone sitter fast, hvorfor den kan løsne, og hva tannlegen gjør.",
  deler: [
    {
      type: "tekst",
      id: "feste",
      tittel: "Hvordan sitter en krone fast?",
      avsnitt: [
        // Helsenorge Hull i tennene: a crown is a cap set over the tooth, which is first ground to the right shape
        "En krone er en kappe som settes utenpå tannen. Tannen slipes først til, så kronen får godt tak.",
        // Tidende 2010: held by the shape of the prepared tooth and by the cement that fills the gap
        "Kronen holdes på plass av formen på tannen under, og av sementen som fyller rommet mellom tannen og kronen.",
      ],
      tegning: "krone-sement",
    },
    {
      type: "tegn",
      id: "hvorfor",
      tittel: "Hvorfor kan en krone løsne?",
      punkter: [
        // Tidende 2010 (secondary decay the most common complication), Tidende 2021
        { tekst: "Et nytt hull i tannen under kronen.", tegning: "hull-under" },
        // Tidende 2021: weak walls can fracture even under a crown, and then it may come loose
        { tekst: "Tannen under kronen sprekker eller knekker.", tegning: "sprekk-under" },
        // Tidende 2010: chewing sticky food pulls at the crown
        { tekst: "Klissete mat kan dra i kronen når du tygger.", tegning: "klissete" },
        // Tidende 2021 (chewing load and grinding strain the cement), SML Bruksisme (overloaded teeth)
        { tekst: "Store krefter, for eksempel når du biter hardt sammen eller gnisser tenner.", tegning: "vekt" },
        // Tidende 2021: the cement in the gap at the edge wears and dissolves over time
        { tekst: "Sementen i kanten kan slites og løses opp over tid.", tegning: "sement-slitt" },
      ],
    },
    // Tidende 2010: a crown coming loose is among the most common complications of crowns and bridges
    { type: "lapp", lapp: { slag: "visste", tekst: "At en krone løsner, er en av de vanligste tingene som kan skje med kroner og broer." } },
    {
      type: "serie",
      id: "slik",
      tittel: "Slik går det for seg hos tannlegen",
      ruter: [
        // Tidende 2010, Tidende 2021: decay and fracture of the tooth under it
        { tegning: "lupe-krone", tekst: "Tannlegen ser på kronen og tannen under." },
        // Helsenorge Hull i tennene: x-rays are needed to find decay in most cases
        { tegning: "rontgen-krone", tekst: "Tannlegen ser etter hull, og tar ofte et røntgenbilde." },
        // Helsenorge Hull i tennene (a hole is treated), Tidende 2021 (a fracture)
        { tegning: "behandle-stump", tekst: "Er det et hull eller en sprekk i tannen, må det behandles.", mellom: true },
        // Tidende 2010: a revision means a new crown
        { tegning: "ny-krone", tekst: "Hva som gjøres videre, kommer an på hvordan tannen og kronen har det. Noen ganger trengs en ny krone." },
      ],
    },
    // Helsenorge Tannbyll: brush with fluoride toothpaste and clean between the teeth every day
    { type: "lapp", lapp: { slag: "tips", tekst: "Puss rundt kronen like godt som rundt de andre tennene, og rens mellom tennene hver dag." } },
  ],
  slutt: "Har en krone løsnet? Ring oss så tidlig på dagen som mulig.",
  kilder: [BKILDE.hnHull, BKILDE.tidKroneFeste, BKILDE.tidSement, BKILDE.smlBruksisme, BKILDE.hnTannbyll],
};
