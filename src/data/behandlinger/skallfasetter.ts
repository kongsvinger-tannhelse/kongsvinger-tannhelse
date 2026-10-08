import { BKILDE } from "./kilder";
import type { Behandlingsside } from "./typer";

/* Veneers. Every line checked on 8 October 2026 against the sources at the
   bottom; the comments name the source behind each part. «Keramikk eller
   kompositt» is the clinic's own text (klinikk.ts). No source compares
   veneers with bleaching or a crown, so the page only names the choices. */

export const skallfasetter: Behandlingsside = {
  slug: "skallfasetter",
  navn: "Skallfasetter",
  // the clinic's own words (klinikk.ts)
  ingress: "Skallfasetter er tynne skall av keramikk eller kompositt som festes på forsiden av tennene, for en jevnere og lysere overflate.",
  lesetid: "2 minutter å lese",
  beskrivelse: "Skallfasetter hos tannlegen i Kongsvinger: hva en fasett er, hvilke andre valg som finnes, og hvordan fasetter lages steg for steg.",
  deler: [
    {
      type: "tekst",
      id: "hva",
      tittel: "Hva er skallfasetter?",
      avsnitt: [
        // SML Laminat: a shell replacing the enamel on the side facing the lips or cheek
        "En skallfasett er et tynt skall som limes på forsiden av tannen, den siden du ser når du smiler.",
        // SML Laminat: often used to improve the tooth's appearance
        "Fasetter brukes ofte for å gjøre tennene finere, for eksempel jevnere i farge eller form.",
      ],
      tegning: "fasett",
    },
    {
      type: "tekst",
      id: "valg",
      tittel: "Er det noe for meg?",
      avsnitt: [
        // SML Laminat: used for appearance
        "Skallfasetter er som regel en behandling for utseendet, ikke noe du må ha.",
        // SML Emaljefeil (fillings, veneers or crowns), SML Tannbleking
        "Andre valg kan være tannbleking, en fylling eller en krone. Hva som passer, er forskjellig fra person til person, og tannlegen går gjennom valgene med deg.",
      ],
      tegning: "hvit",
    },
    // SML Fasett: a small, bounded surface
    { type: "lapp", lapp: { slag: "visste", tekst: "Ordet fasett betyr en liten, avgrenset flate." } },
    {
      type: "serie",
      id: "slik",
      tittel: "Slik går det for seg",
      ruter: [
        // UiO: colour and shape
        { tegning: "farge", tekst: "Først ser tannlegen på tennene, og dere snakker om farge og form." },
        // UiO: as little tooth as possible is removed
        { tegning: "fasett-slip", tekst: "Et tynt lag tas av forsiden av tannen, så lite som mulig." },
        // UiO: an impression
        { tegning: "avtrykk", tekst: "Vi tar avtrykk, og fasettene lages etter dem." },
        // UiO (tried and cemented), SML Laminat (bonded to the tooth)
        { tegning: "fasett", tekst: "Fasetten prøves, og limes så fast på tannen." },
      ],
    },
    // UiO, Hvite tenner?: teeth grow darker with the years
    { type: "lapp", lapp: { slag: "visste", tekst: "Tennene blir naturlig litt mørkere med årene." } },
    {
      type: "pris",
      id: "pris",
      sporsmal: "Hva koster skallfasetter?",
      tekst: "Ring oss, så får du vite hva fasetter vil koste.",
      // Helfo Tilstander: adults pay as a rule; support only for some conditions
      helfo: "Som hovedregel betaler voksne selv. Helfo dekker bare tannbehandling ved noen sykdommer og tilstander, og tannlegen vurderer om du har rett.",
      tegning: "regning",
    },
  ],
  slutt: "Lurer du på om fasetter passer for deg? Bestill en time, så ser vi på tennene dine.",
  kilder: [BKILDE.smlLaminat, BKILDE.smlFasett, BKILDE.smlEmaljefeil, BKILDE.smlTannbleking, BKILDE.uioAdhesiv, BKILDE.uioHvite, BKILDE.hnTannlegeregning, BKILDE.helfoTilstander],
};
