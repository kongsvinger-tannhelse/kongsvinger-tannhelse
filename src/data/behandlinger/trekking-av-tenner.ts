import { BKILDE } from "./kilder";
import type { Behandlingsside } from "./typer";

/* Taking out a tooth (not wisdom teeth, which have their own page). Every
   line checked on 8 October 2026 against the sources at the bottom; the
   comments name the source behind each part. No advice for afterwards and
   no word on who takes out which tooth: that differs from patient to
   patient. */

export const trekkingAvTenner: Behandlingsside = {
  slug: "trekking-av-tenner",
  navn: "Trekking av tenner",
  ingress: "Noen tenner kan ikke reddes. Da kan det være best å trekke dem. Her ser du hvorfor en tann kan måtte trekkes, og hvordan det går for seg.",
  hosOss: "Hos oss på Kongsvinger Tannhelse ser vi på tannen, og henviser deg videre hvis det trengs.",
  tittelbilde: "tang",
  beskrivelse: "Trekking av tenner hos tannlegen i Kongsvinger: når en tann må trekkes, hvordan det går for seg, bedøvelse, og hva som kan gjøres med tannluka etterpå.",
  deler: [
    {
      type: "tekst",
      id: "nar",
      tittel: "Når må en tann trekkes?",
      avsnitt: [
        // Helsenorge: a tooth too weak to be treated is extracted to avoid inflammation round it
        "Er tannen så svekket at den ikke kan behandles, kan den måtte trekkes for å unngå betennelse rundt den.",
        // SML Tanntrekking: infection at the root tip after caries, periodontitis, too little room, a broken crown or root
        "Vanlige grunner er betennelse ved rotspissen etter et hull, langvarig tannkjøttsykdom, for lite plass i kjeven, eller at tannen har knekt.",
      ],
      tegning: "hull",
    },
    // Helsenorge, Hode- og halskreft; SML Tanntrekking
    { type: "lapp", lapp: { slag: "visste", tekst: "Før strålebehandling mot hode og hals er det ofte nødvendig å trekke noen tenner." } },
    {
      type: "serie",
      id: "slik",
      tittel: "Slik går det for seg",
      ruter: [
        // Helsenorge: the dentist judges whether it can be treated
        { tegning: "lupe-rot", tekst: "Først undersøker vi tannen og vurderer om den kan reddes." },
        // SML Tanntrekking: usually local anaesthesia
        { tegning: "rolig-trekk", tekst: "Tannen bedøves, vanligvis med lokalbedøvelse." },
        // SML Tanntrekking; Helsedirektoratet takst 401 (roots may be split)
        { tegning: "trekk", tekst: "Tannen tas ut. Noen ganger deles den først, så det blir enklere." },
        // SML Tanntrekking: the gum may be stitched
        { tegning: "sting", tekst: "Noen ganger trengs et par sting i tannkjøttet.", mellom: true },
        { tegning: "snakke-luke", tekst: "Til slutt forteller vi deg hva du bør tenke på de første dagene." },
      ],
      // Helse Bergen: tooth surgery is normally done by the dentist; the hospital takes referred patients
      etter: "De fleste tenner trekkes hos tannlegen. Er det vanskelig å få ut tannen, kan det være aktuelt å bli henvist videre.",
    },
    {
      type: "tekst",
      id: "vondt",
      tittel: "Gjør det vondt?",
      avsnitt: [
        // SML Tanntrekking: local anaesthesia
        "Tannen bedøves før den trekkes. Hvordan det kjennes etterpå, er forskjellig fra person til person, og vi gir deg råd.",
        // SML Tanntrekking: general anaesthesia can be considered for dental fear
        "Har du sterk tannlegeskrekk, kan behandling i narkose noen ganger være aktuelt.",
        // Tannlegeforeningen: with blood thinners the dentist may plan with your doctor
        "Bruker du blodfortynnende medisiner, si fra til oss på forhånd.",
      ],
      tegning: "tablett",
    },
    {
      type: "tekst",
      id: "luka",
      tittel: "Hva med tannluka?",
      avsnitt: [
        // the clinic's text (klinikk.ts); SML Tannskade: replaced with a prosthesis, bridge or implant
        "Etterpå kan tannen ofte erstattes, for eksempel med et implantat, en bro eller en protese. Vi går gjennom valgene med deg.",
      ],
      tegning: "luke-sporsmal",
    },
  ],
  slutt: "Har du en tann som plager deg? Bestill en time, så ser vi på den.",
  kilder: [BKILDE.smlTanntrekking, BKILDE.hnHull, BKILDE.hnHodeHals, BKILDE.ntfBlodfortynnende, BKILDE.hbKjevekirurgi, BKILDE.smlTannskade],
};
