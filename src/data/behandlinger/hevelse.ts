import { BKILDE } from "./kilder";
import type { Behandlingsside } from "./typer";

/* A swelling by a tooth. Every line checked on 8 October 2026 against the
   sources at the bottom; the comments name the source behind each part.
   No first aid beyond the clinic's own text: contact us, and the danger
   signs as Helsenorge's page on tooth abscesses gives them. */

export const hevelse: Behandlingsside = {
  slug: "hevelse",
  navn: "Hevelse",
  // the clinic's own words (klinikk.ts)
  ingress: "Hevelse rundt en tann eller i ansiktet kan komme av en infeksjon. Ta kontakt med oss så fort det lar seg gjøre. Her ser du hva det kan være, og hva vi gjør.",
  tittelbilde: "kulefisk",
  blekk: "tegl",
  stripe: "puter",
  beskrivelse: "Hevelse ved en tann hos tannlegen i Kongsvinger: hva en tannbyll er, tegn du bør se etter, når du må ha hjelp med en gang, og hva tannlegen gjør.",
  deler: [
    {
      type: "tekst",
      id: "hva",
      tittel: "Hva kan en hevelse være?",
      avsnitt: [
        // SML Tannbyll and Helsenorge Tannbyll: an infection at the root of a tooth, sometimes felt as a lump in the gum beside it
        "Ofte er det en tannbyll: en infeksjon ved roten av en tann. Den kan kjennes som en kul i tannkjøttet ved siden av tannen.",
        // NHI Tannbyll: from a dead nerve, from gum disease, or round a wisdom tooth on its way up; SML Tannbyll
        "Den kan komme fra en død nerve inne i tannen, fra tannkjøttsykdom eller rundt en visdomstann som er på vei opp.",
      ],
      tegning: "byll-snitt",
    },
    // SML Tannbyll: it starts inside the tooth; the infection spreads to the root's tip and breaks down the bone round it
    { type: "lapp", lapp: { slag: "visste", tekst: "En tannbyll starter ofte inne i tannen. Når nerven dør, kan infeksjonen spre seg ut gjennom roten og inn i kjevebeinet." } },
    {
      type: "tegn",
      id: "tegn",
      tittel: "Kjenner du noe av dette?",
      punkter: [
        // Helsenorge Tannbyll: a lump or swelling in the gum, red and swollen gum
        { tekst: "En kul eller hevelse i tannkjøttet ved en tann.", tegning: "kul-tannkjott" },
        // Helsenorge Tannbyll: pain when you chew
        { tekst: "Det gjør vondt å tygge eller bite på tannen.", tegning: "bite-vondt" },
        // Helsenorge Tannbyll: a bad taste in the mouth
        { tekst: "Du har en vond smak i munnen.", tegning: "vond-smak" },
        // the clinic's text (swelling in the face), NHI Tannbyll (facial swelling)
        { tekst: "Kinnet eller ansiktet er hovent.", tegning: "kinn-vondt" },
        // Helsenorge Tannbyll (fever), SML Tannbyll (feeling unwell)
        { tekst: "Du har feber eller føler deg syk.", tegning: "feber" },
      ],
      // the clinic's text
      etter: "Ta kontakt så fort det lar seg gjøre.",
    },
    {
      type: "tekst",
      id: "haster",
      tittel: "Når må jeg ha hjelp med en gang?",
      avsnitt: [
        // Helsenorge Tannbyll: in rare cases serious, if the infection spreads
        "En tannbyll kan i sjeldne tilfeller bli alvorlig hvis infeksjonen sprer seg.",
        // Helsenorge Tannbyll (contact a doctor or the legevakt at once), Helsenorge Legevakt (116 117)
        "Har du problemer med å svelge, økende hevelse i ansiktet eller halsen, vansker med å åpne munnen, eller høy feber og føler deg syk, må du kontakte lege eller legevakten med en gang. Legevakten har telefon 116 117.",
        // Helsenorge Tannbyll: ring 113 if you have trouble breathing
        "Har du pustevansker, ring 113.",
      ],
      tegning: "blaalys",
      varsel: true,
    },
    {
      type: "serie",
      id: "slik",
      tittel: "Slik går det for seg hos oss",
      ruter: [
        // Helsenorge Tannbyll: the dentist examines the teeth and takes x-rays to find where the infection is and what causes it
        { tegning: "rontgen-byll", tekst: "Vi undersøker tennene og tar røntgenbilder for å finne hvor infeksjonen er, og hva som er årsaken." },
        // SML Tannbyll (an opening relieves the pressure), Helsenorge Tannbyll (draining the pus)
        { tegning: "byll-letter", tekst: "Ofte lages det en liten åpning i byllen, så trykket letter." },
        // Helsenorge Tannbyll: as a rule no antibiotics, but with fever, feeling poorly or a spreading infection; the clinic's text
        { tegning: "antibiotika", tekst: "Noen ganger trengs antibiotika i tillegg.", mellom: true },
        // Helsenorge Tannbyll, SML Tannbyll: a root filling, or the tooth is taken out
        { tegning: "byll-valg", tekst: "Så må årsaken behandles, ofte med en rotfylling, eller ved at tannen trekkes." },
      ],
    },
  ],
  slutt: "Har du en hevelse ved en tann? Ring oss så tidlig på dagen som mulig.",
  kilder: [BKILDE.hnTannbyll, BKILDE.smlTannbyll, BKILDE.nhiTannbyll, BKILDE.hnLegevakt],
};
