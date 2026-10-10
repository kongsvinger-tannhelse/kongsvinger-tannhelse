import { BKILDE } from "./kilder";
import type { Behandlingsside } from "./typer";

/* A lost filling. Every line checked on 8 October 2026 against the sources
   at the bottom; the comments name the source behind each part. The book's
   first aid (keep it clean, chew on the other side) is left out: no
   official source says it. */

export const mistetFylling: Behandlingsside = {
  slug: "mistet-fylling",
  navn: "Mistet fylling",
  // the clinic's own words (klinikk.ts)
  ingress: "Har du mistet en fylling, kontakt oss så snart som mulig. Her ser du hvorfor det kan skje, og hva vi gjør.",
  tittelbilde: "skjaere",
  beskrivelse: "Mistet fylling hos tannlegen i Kongsvinger: hvorfor en fylling kan falle ut, hvorfor du bør komme snart, og hva tannlegen gjør.",
  deler: [
    {
      type: "tekst",
      id: "hvorfor",
      tittel: "Hvorfor kan en fylling falle ut?",
      avsnitt: [
        // Gjør kloke valg (Tannlegeforeningen), advice 4: the most common reasons are decay at the edge and a fracture of the filling or the tooth
        "De vanligste grunnene er et nytt hull i kanten av fyllingen, eller at fyllingen eller tannen knekker.",
        // Gjør kloke valg, advice 4: oral hygiene and diet, the filling's size and the load on it
        "Hvor lenge en fylling holder, kommer blant annet an på hvor stor den er, hvor mye den belastes, og på munnhygiene og kosthold.",
      ],
      tegning: "fylling-kant",
    },
    {
      type: "tekst",
      id: "snart",
      tittel: "Hvorfor bør jeg komme snart?",
      avsnitt: [
        // SML Tannsmerter: a missing filling can let bacteria into the nerve, felt as strong ising or toothache
        "Uten fyllingen ligger tannen åpen. Bakterier kan komme inn mot nerven, og det kan begynne å ise eller verke.",
        // Helsenorge Hull i tennene: an untreated hole gradually grows
        "Et hull som ikke blir behandlet, blir gradvis større.",
      ],
      tegning: "apen-tann",
    },
    // Gjør kloke valg, advice 4: not only because it is old; every treatment weakens the tooth
    { type: "lapp", lapp: { slag: "visste", tekst: "En fylling skal ikke skiftes bare fordi den er gammel. Hvert inngrep svekker tannen litt." } },
    {
      type: "serie",
      id: "slik",
      tittel: "Slik går det for seg hos oss",
      ruter: [
        // Helsenorge Hull i tennene: x-rays are needed in most cases
        { tegning: "rontgen-fylling", tekst: "Vi ser på tannen, og tar ofte et røntgenbilde." },
        // Helsenorge Hull i tennene: the damaged tooth tissue is removed
        { tegning: "fjerne-kant", tekst: "Er det et nytt hull, fjerner vi det ødelagte tannvevet." },
        // Helsenorge Hull i tennene (a new filling), Gjør kloke valg (part of a filling can be repaired)
        { tegning: "lapp-fylling", tekst: "Så får tannen en ny fylling, eller den gamle repareres." },
        // Helsenorge Hull i tennene (an inlay where much is gone, a crown when too little is left), Gjør kloke valg, advice 6
        { tegning: "innlegg-krone", tekst: "Er det lite igjen av tannen, kan den trenge et innlegg eller en krone.", mellom: true },
      ],
    },
    // Helsenorge Hull i tennene: fluoride toothpaste twice a day helps best against holes
    { type: "lapp", lapp: { slag: "tips", tekst: "Puss tennene to ganger om dagen med fluortannkrem. Det hjelper best mot nye hull." } },
  ],
  slutt: "Har du mistet en fylling? Ring oss så tidlig på dagen som mulig.",
  kilder: [BKILDE.ntfKlokeValg, BKILDE.smlTannsmerter, BKILDE.hnHull, BKILDE.smlFylling],
};
