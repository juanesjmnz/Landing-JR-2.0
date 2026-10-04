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
    end: 5.489,
    bg: BG.cream,
    topLabel: "FUNDADOR B2B SAAS · ANUNCIOS EN META",
    visual: "TestLog",
    lines: [
      {
        text: "Tengo una empresa B2B SaaS y he probado todo tipo de anuncio en Meta.",
        start: 0.0,
        end: 5.489,
        speaker: P,
      },
    ],
  },
  {
    id: 2,
    start: 5.489,
    end: 8.445,
    bg: BG.yellow,
    topLabel: "ANUNCIOS DIVERTIDOS",
    visual: "StatFunny",
    lines: [
      {
        text: "Los anuncios divertidos tuvieron vistas y cero demos.",
        start: 5.489,
        end: 8.445,
        speaker: P,
      },
    ],
  },
  {
    id: 3,
    start: 8.445,
    end: 13.09,
    bg: BG.yellow,
    topLabel: "ANUNCIOS EDUCATIVOS",
    visual: "StatEducational",
    lines: [
      {
        text: "Los educativos se guardaron 200 veces y nadie agendó.",
        start: 8.445,
        end: 13.09,
        speaker: P,
      },
    ],
  },
  {
    id: 4,
    start: 13.09,
    end: 18.297,
    bg: BG.yellow,
    topLabel: "VEREDICTO DE PETER",
    visual: "TripleBad",
    lines: [
      {
        text: "Las ofertas se sintieron muy vendedoras, así que Meta simplemente no funciona para nosotros.",
        start: 13.09,
        end: 18.297,
        speaker: P,
      },
    ],
  },
  {
    id: 5,
    start: 18.597,
    end: 21.903,
    bg: BG.cream,
    topLabel: "CÓMO PETER LOS CORRIÓ",
    visual: "TripleWorked",
    lines: [
      {
        text: "Cada uno de esos anuncios funcionó, Peter.",
        start: 18.597,
        end: 21.903,
        speaker: C,
      },
    ],
  },
  {
    id: 6,
    start: 21.903,
    end: 29.836,
    bg: BG.cream,
    topLabel: "LA MISMA LÓGICA QUE...",
    visual: "PitchVC",
    lines: [
      {
        text: "Solo los corriste uno a la vez. Es como lanzarle tu pitch a un inversionista,",
        start: 21.903,
        end: 26.927,
        speaker: C,
      },
      {
        text: "que te diga que no, y concluir que levantar capital no funciona.",
        start: 26.927,
        end: 29.836,
        speaker: C,
      },
    ],
  },
  {
    id: 7,
    start: 30.136,
    end: 36.22,
    bg: BG.cream,
    topLabel: "RONDA SEMILLA DE PETER",
    visual: "SeedRound",
    lines: [
      {
        text: "Así conseguimos nuestra ronda semilla.",
        start: 30.136,
        end: 32.083,
        speaker: P,
      },
      {
        text: "De mi tío.",
        start: 32.083,
        end: 33.154,
        speaker: P,
      },
      {
        text: "Se nota. Aquí está el punto:",
        start: 33.454,
        end: 36.22,
        speaker: C,
      },
    ],
  },
  {
    id: 8,
    start: 36.22,
    end: 52.644,
    bg: BG.creamAlt,
    topLabel: "LOS 3 MOMENTOS DE TU COMPRADOR",
    visual: "Moments",
    lines: [
      {
        text: "Tu comprador pasa por tres momentos.",
        start: 36.22,
        end: 39.505,
        speaker: C,
      },
      {
        text: "Primero, sabe que algo está mal, pero no sabe qué lo arregla.",
        start: 39.505,
        end: 44.519,
        speaker: C,
      },
      {
        text: "Luego, descubre la solución y empieza a comparar opciones.",
        start: 44.519,
        end: 48.668,
        speaker: C,
      },
      {
        text: "Después, está listo, comparándote con todo lo demás.",
        start: 48.668,
        end: 52.644,
        speaker: C,
      },
    ],
  },
  {
    id: 9,
    start: 52.644,
    end: 57.139,
    bg: BG.tan,
    topLabel: "1 ANUNCIO = 1 MOMENTO",
    visual: "Mapping",
    lines: [
      {
        text: "Cada uno de tus anuncios solo le habla a uno de esos momentos.",
        start: 52.644,
        end: 57.139,
        speaker: C,
      },
    ],
  },
  {
    id: 10,
    start: 57.439,
    end: 63.63,
    bg: BG.cream,
    topLabel: "¿CUÁL ANUNCIO ES EL CORRECTO?",
    visual: "WhichAd",
    lines: [
      {
        text: "¿Entonces qué tipo de anuncio es el correcto?",
        start: 57.439,
        end: 60.086,
        speaker: P,
      },
      {
        text: "Los tres, en la misma campaña.",
        start: 60.386,
        end: 63.63,
        speaker: C,
      },
    ],
  },
  {
    id: 11,
    start: 63.63,
    end: 66.153,
    bg: BG.yellow,
    topLabel: "SE LLAMA...",
    visual: "SwarmTitle",
    lines: [
      {
        text: "Se llama la Estrategia del Enjambre.",
        start: 63.63,
        end: 66.153,
        speaker: C,
      },
    ],
  },
  {
    id: 12,
    start: 66.153,
    end: 83.095,
    bg: BG.pink,
    topLabel: "MOMENTO 1 · ANUNCIO 1 DE 3 · ATENCIÓN",
    visual: "AttentionAds",
    lines: [
      {
        text: "Primero, anuncios de atención para quienes sienten el dolor.",
        start: 66.153,
        end: 70.118,
        speaker: C,
      },
      {
        text: "Un meme sobre tu vendedor actualizando el CRM a las 11 de la noche.",
        start: 70.118,
        end: 75.165,
        speaker: C,
      },
      {
        text: "Un sketch sobre la junta directiva donde el pipeline “se ve saludable”.",
        start: 75.165,
        end: 79.49,
        speaker: C,
      },
      {
        text: "O una oferta tan directa que no pueden ignorar.",
        start: 79.49,
        end: 83.095,
        speaker: C,
      },
    ],
  },
  {
    id: 13,
    start: 83.395,
    end: 87.992,
    bg: BG.amber,
    topLabel: "OBJECIÓN DE PETER",
    visual: "Pushback",
    lines: [
      {
        text: "¿Memes? Somos una empresa enterprise.",
        start: 83.395,
        end: 85.75,
        speaker: P,
      },
      {
        text: "Nuestros compradores son gente seria.",
        start: 85.75,
        end: 87.992,
        speaker: P,
      },
    ],
  },
  {
    id: 14,
    start: 88.292,
    end: 95.07,
    bg: BG.creamAlt,
    topLabel: "LA REALIDAD",
    visual: "Comeback",
    lines: [
      {
        text: "Tus compradores son gente seria que manda memes sobre su jefe en Slack todo el día.",
        start: 88.292,
        end: 95.07,
        speaker: C,
      },
    ],
  },
  {
    id: 15,
    start: 95.07,
    end: 108.626,
    bg: BG.blue,
    topLabel: "MOMENTO 2 · ANUNCIO 2 DE 3 · ENSEÑANZA",
    visual: "TeachingAds",
    lines: [
      {
        text: "Segundo, anuncios educativos para quienes conocen la solución pero no han elegido a quién.",
        start: 95.07,
        end: 101.041,
        speaker: C,
      },
      {
        text: "Tu fundador en un pizarrón, o un video tipo Loom,",
        start: 101.041,
        end: 104.753,
        speaker: C,
      },
      {
        text: "explicando cómo funciona realmente el problema.",
        start: 104.753,
        end: 108.626,
        speaker: C,
      },
    ],
  },
  {
    id: 16,
    start: 108.626,
    end: 114.113,
    bg: BG.blue,
    topLabel: "EL OBJETIVO",
    visual: "OneThought",
    lines: [
      {
        text: "Quieres un solo pensamiento en su cabeza:",
        start: 108.626,
        end: 111.531,
        speaker: C,
      },
      {
        text: "“Esta persona sabe de lo que habla.”",
        start: 111.531,
        end: 114.113,
        speaker: C,
      },
    ],
  },
  {
    id: 17,
    start: 114.413,
    end: 117.571,
    bg: BG.cream,
    topLabel: "PETER PREGUNTA",
    visual: "PeterAsksSaved",
    lines: [
      {
        text: "¿Cuáles son los anuncios que se guardaron y nunca convirtieron?",
        start: 114.413,
        end: 117.571,
        speaker: P,
      },
    ],
  },
  {
    id: 18,
    start: 117.871,
    end: 122.823,
    bg: BG.cream,
    topLabel: "DÓNDE VAN LOS GUARDADOS",
    visual: "MaybeLaterFolder",
    lines: [
      {
        text: "Se guardaron como tu deck en la carpeta “tal vez después” de un inversionista.",
        start: 117.871,
        end: 122.823,
        speaker: C,
      },
    ],
  },
  {
    id: 19,
    start: 122.823,
    end: 131.827,
    bg: BG.green,
    topLabel: "MOMENTO 3 · ANUNCIO 3 DE 3 · CIERRE",
    visual: "ClosingAds",
    lines: [
      {
        text: "Necesitabas el tercer tipo: anuncios de cierre, para quienes ya están listos.",
        start: 122.823,
        end: 128.075,
        speaker: C,
      },
      {
        text: "Un piloto pagado con resultados por escrito.",
        start: 128.075,
        end: 131.827,
        speaker: C,
      },
    ],
  },
  {
    id: 20,
    start: 131.827,
    end: 139.93,
    bg: BG.green,
    topLabel: "TÚ VS. LA ALTERNATIVA",
    visual: "Versus",
    lines: [
      {
        text: "Tú contra contratar dos SDRs más.",
        start: 131.827,
        end: 136.178,
        speaker: C,
      },
      {
        text: "Tú contra “mejor lo construimos nosotros mismos”.",
        start: 136.178,
        end: 139.93,
        speaker: C,
      },
    ],
  },
  {
    id: 21,
    start: 140.23,
    end: 143.109,
    bg: BG.cream,
    topLabel: "PETER PREGUNTA",
    visual: "WhyOneCampaignTitle",
    lines: [
      {
        text: "¿Pero por qué poner los tres en una sola campaña?",
        start: 140.23,
        end: 143.109,
        speaker: P,
      },
    ],
  },
  {
    id: 22,
    start: 143.409,
    end: 149.519,
    bg: BG.cream,
    topLabel: "EL TRABAJO DE META",
    visual: "Funnel",
    lines: [
      {
        text: "Porque Meta le muestra a cada persona el anuncio para el que está lista,",
        start: 143.409,
        end: 146.723,
        speaker: C,
      },
      {
        text: "y el mismo comprador se topa con los tres.",
        start: 146.723,
        end: 149.519,
        speaker: C,
      },
    ],
  },
  {
    id: 23,
    start: 149.519,
    end: 155.939,
    bg: BG.yellow,
    topLabel: "EL MISMO COMPRADOR, TODA LA SEMANA",
    visual: "WeeklyCalendar",
    lines: [
      {
        text: "Un meme el lunes, un pizarrón el miércoles,",
        start: 149.519,
        end: 152.605,
        speaker: C,
      },
      {
        text: "una oferta piloto el viernes.",
        start: 152.605,
        end: 154.593,
        speaker: C,
      },
      {
        text: "Eso es el enjambre.",
        start: 154.593,
        end: 155.939,
        speaker: C,
      },
    ],
  },
  {
    id: 24,
    start: 155.939,
    end: 160.081,
    bg: BG.yellow,
    topLabel: "RESERVA UNA DEMO",
    visual: "FormFill",
    lines: [
      {
        text: "Para cuando llenan tu formulario, sienten que ya te conocen.",
        start: 155.939,
        end: 160.081,
        speaker: C,
      },
    ],
  },
  {
    id: 25,
    start: 160.381,
    end: 162.935,
    bg: BG.cream,
    topLabel: "PETER PREGUNTA",
    visual: "NoneBadTitle",
    lines: [
      {
        text: "¿Entonces ninguno de mis anuncios estaba mal?",
        start: 160.381,
        end: 162.935,
        speaker: P,
      },
    ],
  },
  {
    id: 26,
    start: 163.235,
    end: 168.525,
    bg: BG.cream,
    topLabel: "EL VEREDICTO FINAL",
    visual: "VerdictRecap",
    lines: [
      {
        text: "No, Peter.",
        start: 163.235,
        end: 165.406,
        speaker: C,
      },
      {
        text: "Solo hiciste que cada uno hiciera todo el trabajo solo,",
        start: 165.406,
        end: 168.525,
        speaker: C,
      },
    ],
  },
  {
    id: 27,
    start: 168.525,
    end: 174.494,
    bg: BG.yellow,
    topLabel: "TU EQUIPO DE MARKETING",
    visual: "Headcount",
    lines: [
      {
        text: "como tu equipo de marketing de una sola persona,",
        start: 168.525,
        end: 170.967,
        speaker: C,
      },
      {
        text: "que justo actualizó su LinkedIn a “disponible para trabajar”.",
        start: 170.967,
        end: 174.494,
        speaker: C,
      },
    ],
  },
  {
    id: 28,
    start: 174.494,
    end: 179.675,
    bg: BG.black,
    topLabel: "CONOCE EL PLAYBOOK",
    visual: "CTA",
    lines: [
      {
        text: "Comenta “Peter” y te envío el SOP de la Estrategia del Enjambre.",
        start: 174.494,
        end: 179.675,
        speaker: C,
      },
    ],
  },
];

export const TOTAL_SECONDS = shots[shots.length - 1].end;
