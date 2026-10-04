// Guion en español (adaptado, no traducción literal). Tiempos sincronizados
// con la narración real generada en ElevenLabs (public/narracion.mp3,
// ver remotion/public/narracion.mp3). Si regrabas el audio, actualiza estos
// números (o re-corre el script de resync) y el resto del sistema no cambia.

export type Speaker = "peter" | "coach";

export interface CaptionLine {
  text: string;
  start: number; // segundos, absolutos sobre el video completo
  end: number;
  speaker: Speaker;
}

export interface Shot {
  id: number;
  start: number;
  end: number;
  bg: string;
  topLabel: string;
  visual: string; // key into the Shots component map
  lines: CaptionLine[];
}

const P: Speaker = "peter";
const C: Speaker = "coach";

export const BG = {
  cream: "#FBF3E6",
  creamAlt: "#F7F1E4",
  tan: "#EFC868",
  yellow: "#F5C242",
  pink: "#FF4FA3",
  amber: "#F5A623",
  blue: "#AEE7F4",
  green: "#A9E8A0",
  black: "#111111",
};

export const shots: Shot[] = [
  {
    id: 1,
    start: 0.0,
    end: 5.002,
    bg: BG.cream,
    topLabel: "FUNDADOR B2B SAAS · ANUNCIOS EN META",
    visual: "TestLog",
    lines: [
      {
        text: "Tengo una empresa B2B SaaS y he probado todo tipo de anuncio en Meta.",
        start: 0.0,
        end: 5.002,
        speaker: P,
      },
    ],
  },
  {
    id: 2,
    start: 5.002,
    end: 7.695,
    bg: BG.yellow,
    topLabel: "ANUNCIOS DIVERTIDOS",
    visual: "StatFunny",
    lines: [
      {
        text: "Los anuncios divertidos tuvieron vistas y cero demos.",
        start: 5.002,
        end: 7.695,
        speaker: P,
      },
    ],
  },
  {
    id: 3,
    start: 7.695,
    end: 11.927,
    bg: BG.yellow,
    topLabel: "ANUNCIOS EDUCATIVOS",
    visual: "StatEducational",
    lines: [
      {
        text: "Los educativos se guardaron 200 veces y nadie agendó.",
        start: 7.695,
        end: 11.927,
        speaker: P,
      },
    ],
  },
  {
    id: 4,
    start: 11.927,
    end: 16.672,
    bg: BG.yellow,
    topLabel: "VEREDICTO DE PETER",
    visual: "TripleBad",
    lines: [
      {
        text: "Las ofertas se sintieron muy vendedoras, así que Meta simplemente no funciona para nosotros.",
        start: 11.927,
        end: 16.672,
        speaker: P,
      },
    ],
  },
  {
    id: 5,
    start: 16.972,
    end: 20.441,
    bg: BG.cream,
    topLabel: "CÓMO PETER LOS CORRIÓ",
    visual: "TripleWorked",
    lines: [
      {
        text: "Cada uno de esos anuncios funcionó, Peter.",
        start: 16.972,
        end: 20.441,
        speaker: C,
      },
    ],
  },
  {
    id: 6,
    start: 20.441,
    end: 28.768,
    bg: BG.cream,
    topLabel: "LA MISMA LÓGICA QUE...",
    visual: "PitchVC",
    lines: [
      {
        text: "Solo los corriste uno a la vez. Es como lanzarle tu pitch a un inversionista,",
        start: 20.441,
        end: 25.715,
        speaker: C,
      },
      {
        text: "que te diga que no, y concluir que levantar capital no funciona.",
        start: 25.715,
        end: 28.768,
        speaker: C,
      },
    ],
  },
  {
    id: 7,
    start: 29.068,
    end: 34.773,
    bg: BG.cream,
    topLabel: "RONDA SEMILLA DE PETER",
    visual: "SeedRound",
    lines: [
      {
        text: "Así conseguimos nuestra ronda semilla.",
        start: 29.068,
        end: 31.015,
        speaker: P,
      },
      {
        text: "De mi tío.",
        start: 31.015,
        end: 32.086,
        speaker: P,
      },
      {
        text: "Se nota. Aquí está el punto:",
        start: 32.386,
        end: 34.773,
        speaker: C,
      },
    ],
  },
  {
    id: 8,
    start: 34.773,
    end: 48.942,
    bg: BG.creamAlt,
    topLabel: "LOS 3 MOMENTOS DE TU COMPRADOR",
    visual: "Moments",
    lines: [
      {
        text: "Tu comprador pasa por tres momentos.",
        start: 34.773,
        end: 37.607,
        speaker: C,
      },
      {
        text: "Primero, sabe que algo está mal, pero no sabe qué lo arregla.",
        start: 37.607,
        end: 41.932,
        speaker: C,
      },
      {
        text: "Luego, descubre la solución y empieza a comparar opciones.",
        start: 41.932,
        end: 45.511,
        speaker: C,
      },
      {
        text: "Después, está listo, comparándote con todo lo demás.",
        start: 45.511,
        end: 48.942,
        speaker: C,
      },
    ],
  },
  {
    id: 9,
    start: 48.942,
    end: 52.82,
    bg: BG.tan,
    topLabel: "1 ANUNCIO = 1 MOMENTO",
    visual: "Mapping",
    lines: [
      {
        text: "Cada uno de tus anuncios solo le habla a uno de esos momentos.",
        start: 48.942,
        end: 52.82,
        speaker: C,
      },
    ],
  },
  {
    id: 10,
    start: 53.12,
    end: 58.92,
    bg: BG.cream,
    topLabel: "¿CUÁL ANUNCIO ES EL CORRECTO?",
    visual: "WhichAd",
    lines: [
      {
        text: "¿Entonces qué tipo de anuncio es el correcto?",
        start: 53.12,
        end: 55.442,
        speaker: P,
      },
      {
        text: "Los tres, en la misma campaña.",
        start: 55.742,
        end: 58.92,
        speaker: C,
      },
    ],
  },
  {
    id: 11,
    start: 58.92,
    end: 61.391,
    bg: BG.yellow,
    topLabel: "SE LLAMA...",
    visual: "SwarmTitle",
    lines: [
      {
        text: "Se llama la Estrategia del Enjambre.",
        start: 58.92,
        end: 61.391,
        speaker: C,
      },
    ],
  },
  {
    id: 12,
    start: 61.391,
    end: 77.987,
    bg: BG.pink,
    topLabel: "MOMENTO 1 · ANUNCIO 1 DE 3 · ATENCIÓN",
    visual: "AttentionAds",
    lines: [
      {
        text: "Primero, anuncios de atención para quienes sienten el dolor.",
        start: 61.391,
        end: 65.275,
        speaker: C,
      },
      {
        text: "Un meme sobre tu vendedor actualizando el CRM a las 11 de la noche.",
        start: 65.275,
        end: 70.219,
        speaker: C,
      },
      {
        text: "Un sketch sobre la junta directiva donde el pipeline “se ve saludable”.",
        start: 70.219,
        end: 74.456,
        speaker: C,
      },
      {
        text: "O una oferta tan directa que no pueden ignorar.",
        start: 74.456,
        end: 77.987,
        speaker: C,
      },
    ],
  },
  {
    id: 13,
    start: 78.287,
    end: 82.884,
    bg: BG.amber,
    topLabel: "OBJECIÓN DE PETER",
    visual: "Pushback",
    lines: [
      {
        text: "¿Memes? Somos una empresa enterprise.",
        start: 78.287,
        end: 80.641,
        speaker: P,
      },
      {
        text: "Nuestros compradores son gente seria.",
        start: 80.641,
        end: 82.884,
        speaker: P,
      },
    ],
  },
  {
    id: 14,
    start: 83.184,
    end: 89.45,
    bg: BG.creamAlt,
    topLabel: "LA REALIDAD",
    visual: "Comeback",
    lines: [
      {
        text: "Tus compradores son gente seria que manda memes sobre su jefe en Slack todo el día.",
        start: 83.184,
        end: 89.45,
        speaker: C,
      },
    ],
  },
  {
    id: 15,
    start: 89.45,
    end: 101.982,
    bg: BG.blue,
    topLabel: "MOMENTO 2 · ANUNCIO 2 DE 3 · ENSEÑANZA",
    visual: "TeachingAds",
    lines: [
      {
        text: "Segundo, anuncios educativos para quienes conocen la solución pero no han elegido a quién.",
        start: 89.45,
        end: 94.97,
        speaker: C,
      },
      {
        text: "Tu fundador en un pizarrón, o un video tipo Loom,",
        start: 94.97,
        end: 98.401,
        speaker: C,
      },
      {
        text: "explicando cómo funciona realmente el problema.",
        start: 98.401,
        end: 101.982,
        speaker: C,
      },
    ],
  },
  {
    id: 16,
    start: 101.982,
    end: 107.054,
    bg: BG.blue,
    topLabel: "EL OBJETIVO",
    visual: "OneThought",
    lines: [
      {
        text: "Quieres un solo pensamiento en su cabeza:",
        start: 101.982,
        end: 104.667,
        speaker: C,
      },
      {
        text: "“Esta persona sabe de lo que habla.”",
        start: 104.667,
        end: 107.054,
        speaker: C,
      },
    ],
  },
  {
    id: 17,
    start: 107.354,
    end: 110.187,
    bg: BG.cream,
    topLabel: "PETER PREGUNTA",
    visual: "PeterAsksSaved",
    lines: [
      {
        text: "¿Cuáles son los anuncios que se guardaron y nunca convirtieron?",
        start: 107.354,
        end: 110.187,
        speaker: P,
      },
    ],
  },
  {
    id: 18,
    start: 110.487,
    end: 115.012,
    bg: BG.cream,
    topLabel: "DÓNDE VAN LOS GUARDADOS",
    visual: "MaybeLaterFolder",
    lines: [
      {
        text: "Se guardaron como tu deck en la carpeta “tal vez después” de un inversionista.",
        start: 110.487,
        end: 115.012,
        speaker: C,
      },
    ],
  },
  {
    id: 19,
    start: 115.012,
    end: 123.238,
    bg: BG.green,
    topLabel: "MOMENTO 3 · ANUNCIO 3 DE 3 · CIERRE",
    visual: "ClosingAds",
    lines: [
      {
        text: "Necesitabas el tercer tipo: anuncios de cierre, para quienes ya están listos.",
        start: 115.012,
        end: 119.81,
        speaker: C,
      },
      {
        text: "Un piloto pagado con resultados por escrito.",
        start: 119.81,
        end: 123.238,
        speaker: C,
      },
    ],
  },
  {
    id: 20,
    start: 123.238,
    end: 130.642,
    bg: BG.green,
    topLabel: "TÚ VS. LA ALTERNATIVA",
    visual: "Versus",
    lines: [
      {
        text: "Tú contra contratar dos SDRs más.",
        start: 123.238,
        end: 127.214,
        speaker: C,
      },
      {
        text: "Tú contra “mejor lo construimos nosotros mismos”.",
        start: 127.214,
        end: 130.642,
        speaker: C,
      },
    ],
  },
  {
    id: 21,
    start: 130.942,
    end: 133.403,
    bg: BG.cream,
    topLabel: "PETER PREGUNTA",
    visual: "WhyOneCampaignTitle",
    lines: [
      {
        text: "¿Pero por qué poner los tres en una sola campaña?",
        start: 130.942,
        end: 133.403,
        speaker: P,
      },
    ],
  },
  {
    id: 22,
    start: 133.703,
    end: 140.136,
    bg: BG.cream,
    topLabel: "EL TRABAJO DE META",
    visual: "Funnel",
    lines: [
      {
        text: "Porque Meta le muestra a cada persona el anuncio para el que está lista,",
        start: 133.703,
        end: 137.192,
        speaker: C,
      },
      {
        text: "y el mismo comprador se topa con los tres.",
        start: 137.192,
        end: 140.136,
        speaker: C,
      },
    ],
  },
  {
    id: 23,
    start: 140.136,
    end: 146.896,
    bg: BG.yellow,
    topLabel: "EL MISMO COMPRADOR, TODA LA SEMANA",
    visual: "WeeklyCalendar",
    lines: [
      {
        text: "Un meme el lunes, un pizarrón el miércoles,",
        start: 140.136,
        end: 143.385,
        speaker: C,
      },
      {
        text: "una oferta piloto el viernes.",
        start: 143.385,
        end: 145.479,
        speaker: C,
      },
      {
        text: "Eso es el enjambre.",
        start: 145.479,
        end: 146.896,
        speaker: C,
      },
    ],
  },
  {
    id: 24,
    start: 146.896,
    end: 151.258,
    bg: BG.yellow,
    topLabel: "RESERVA UNA DEMO",
    visual: "FormFill",
    lines: [
      {
        text: "Para cuando llenan tu formulario, sienten que ya te conocen.",
        start: 146.896,
        end: 151.258,
        speaker: C,
      },
    ],
  },
  {
    id: 25,
    start: 151.558,
    end: 153.74,
    bg: BG.cream,
    topLabel: "PETER PREGUNTA",
    visual: "NoneBadTitle",
    lines: [
      {
        text: "¿Entonces ninguno de mis anuncios estaba mal?",
        start: 151.558,
        end: 153.74,
        speaker: P,
      },
    ],
  },
  {
    id: 26,
    start: 154.04,
    end: 159.838,
    bg: BG.cream,
    topLabel: "EL VEREDICTO FINAL",
    visual: "VerdictRecap",
    lines: [
      {
        text: "No, Peter.",
        start: 154.04,
        end: 156.419,
        speaker: C,
      },
      {
        text: "Solo hiciste que cada uno hiciera todo el trabajo solo,",
        start: 156.419,
        end: 159.838,
        speaker: C,
      },
    ],
  },
  {
    id: 27,
    start: 159.838,
    end: 166.38,
    bg: BG.yellow,
    topLabel: "TU EQUIPO DE MARKETING",
    visual: "Headcount",
    lines: [
      {
        text: "como tu equipo de marketing de una sola persona,",
        start: 159.838,
        end: 162.514,
        speaker: C,
      },
      {
        text: "que justo actualizó su LinkedIn a “disponible para trabajar”.",
        start: 162.514,
        end: 166.38,
        speaker: C,
      },
    ],
  },
  {
    id: 28,
    start: 166.38,
    end: 172.059,
    bg: BG.black,
    topLabel: "CONOCE EL PLAYBOOK",
    visual: "CTA",
    lines: [
      {
        text: "Comenta “Peter” y te envío el SOP de la Estrategia del Enjambre.",
        start: 166.38,
        end: 172.059,
        speaker: C,
      },
    ],
  },
];

export const TOTAL_SECONDS = shots[shots.length - 1].end;
