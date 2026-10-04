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
    end: 5.433,
    bg: BG.cream,
    topLabel: "FUNDADOR B2B SAAS · ANUNCIOS EN META",
    visual: "TestLog",
    lines: [
      {
        text: "Tengo una empresa B2B SaaS y he probado todo tipo de anuncio en Meta.",
        start: 0.0,
        end: 5.433,
        speaker: P,
      },
    ],
  },
  {
    id: 2,
    start: 5.433,
    end: 8.359,
    bg: BG.yellow,
    topLabel: "ANUNCIOS DIVERTIDOS",
    visual: "StatFunny",
    lines: [
      {
        text: "Los anuncios divertidos tuvieron vistas y cero demos.",
        start: 5.433,
        end: 8.359,
        speaker: P,
      },
    ],
  },
  {
    id: 3,
    start: 8.359,
    end: 12.957,
    bg: BG.yellow,
    topLabel: "ANUNCIOS EDUCATIVOS",
    visual: "StatEducational",
    lines: [
      {
        text: "Los educativos se guardaron 200 veces y nadie agendó.",
        start: 8.359,
        end: 12.957,
        speaker: P,
      },
    ],
  },
  {
    id: 4,
    start: 12.957,
    end: 18.112,
    bg: BG.yellow,
    topLabel: "VEREDICTO DE PETER",
    visual: "TripleBad",
    lines: [
      {
        text: "Las ofertas se sintieron muy vendedoras, así que Meta simplemente no funciona para nosotros.",
        start: 12.957,
        end: 18.112,
        speaker: P,
      },
    ],
  },
  {
    id: 5,
    start: 18.412,
    end: 22.058,
    bg: BG.cream,
    topLabel: "CÓMO PETER LOS CORRIÓ",
    visual: "TripleWorked",
    lines: [
      {
        text: "Cada uno de esos anuncios funcionó, Peter.",
        start: 18.412,
        end: 22.058,
        speaker: C,
      },
    ],
  },
  {
    id: 6,
    start: 22.058,
    end: 30.811,
    bg: BG.cream,
    topLabel: "LA MISMA LÓGICA QUE...",
    visual: "PitchVC",
    lines: [
      {
        text: "Solo los corriste uno a la vez. Es como lanzarle tu pitch a un inversionista,",
        start: 22.058,
        end: 27.602,
        speaker: C,
      },
      {
        text: "que te diga que no, y concluir que levantar capital no funciona.",
        start: 27.602,
        end: 30.811,
        speaker: C,
      },
    ],
  },
  {
    id: 7,
    start: 31.111,
    end: 37.242,
    bg: BG.cream,
    topLabel: "RONDA SEMILLA DE PETER",
    visual: "SeedRound",
    lines: [
      {
        text: "Así conseguimos nuestra ronda semilla.",
        start: 31.111,
        end: 33.088,
        speaker: P,
      },
      {
        text: "De mi tío.",
        start: 33.088,
        end: 34.176,
        speaker: P,
      },
      {
        text: "Se nota. Aquí está el punto:",
        start: 34.476,
        end: 37.242,
        speaker: C,
      },
    ],
  },
  {
    id: 8,
    start: 37.242,
    end: 53.666,
    bg: BG.creamAlt,
    topLabel: "LOS 3 MOMENTOS DE TU COMPRADOR",
    visual: "Moments",
    lines: [
      {
        text: "Tu comprador pasa por tres momentos.",
        start: 37.242,
        end: 40.527,
        speaker: C,
      },
      {
        text: "Primero, sabe que algo está mal, pero no sabe qué lo arregla.",
        start: 40.527,
        end: 45.54,
        speaker: C,
      },
      {
        text: "Luego, descubre la solución y empieza a comparar opciones.",
        start: 45.54,
        end: 49.689,
        speaker: C,
      },
      {
        text: "Después, está listo, comparándote con todo lo demás.",
        start: 49.689,
        end: 53.666,
        speaker: C,
      },
    ],
  },
  {
    id: 9,
    start: 53.666,
    end: 58.16,
    bg: BG.tan,
    topLabel: "1 ANUNCIO = 1 MOMENTO",
    visual: "Mapping",
    lines: [
      {
        text: "Cada uno de tus anuncios solo le habla a uno de esos momentos.",
        start: 53.666,
        end: 58.16,
        speaker: C,
      },
    ],
  },
  {
    id: 10,
    start: 58.46,
    end: 64.479,
    bg: BG.cream,
    topLabel: "¿CUÁL ANUNCIO ES EL CORRECTO?",
    visual: "WhichAd",
    lines: [
      {
        text: "¿Entonces qué tipo de anuncio es el correcto?",
        start: 58.46,
        end: 61.061,
        speaker: P,
      },
      {
        text: "Los tres, en la misma campaña.",
        start: 61.361,
        end: 64.479,
        speaker: C,
      },
    ],
  },
  {
    id: 11,
    start: 64.479,
    end: 66.904,
    bg: BG.yellow,
    topLabel: "SE LLAMA...",
    visual: "SwarmTitle",
    lines: [
      {
        text: "Se llama la Estrategia del Enjambre.",
        start: 64.479,
        end: 66.904,
        speaker: C,
      },
    ],
  },
  {
    id: 12,
    start: 66.904,
    end: 83.188,
    bg: BG.pink,
    topLabel: "MOMENTO 1 · ANUNCIO 1 DE 3 · ATENCIÓN",
    visual: "AttentionAds",
    lines: [
      {
        text: "Primero, anuncios de atención para quienes sienten el dolor.",
        start: 66.904,
        end: 70.715,
        speaker: C,
      },
      {
        text: "Un meme sobre tu vendedor actualizando el CRM a las 11 de la noche.",
        start: 70.715,
        end: 75.566,
        speaker: C,
      },
      {
        text: "Un sketch sobre la junta directiva donde el pipeline “se ve saludable”.",
        start: 75.566,
        end: 79.723,
        speaker: C,
      },
      {
        text: "O una oferta tan directa que no pueden ignorar.",
        start: 79.723,
        end: 83.188,
        speaker: C,
      },
    ],
  },
  {
    id: 13,
    start: 83.488,
    end: 88.271,
    bg: BG.amber,
    topLabel: "OBJECIÓN DE PETER",
    visual: "Pushback",
    lines: [
      {
        text: "¿Memes? Somos una empresa enterprise.",
        start: 83.488,
        end: 85.938,
        speaker: P,
      },
      {
        text: "Nuestros compradores son gente seria.",
        start: 85.938,
        end: 88.271,
        speaker: P,
      },
    ],
  },
  {
    id: 14,
    start: 88.571,
    end: 95.666,
    bg: BG.creamAlt,
    topLabel: "LA REALIDAD",
    visual: "Comeback",
    lines: [
      {
        text: "Tus compradores son gente seria que manda memes sobre su jefe en Slack todo el día.",
        start: 88.571,
        end: 95.666,
        speaker: C,
      },
    ],
  },
  {
    id: 15,
    start: 95.666,
    end: 109.856,
    bg: BG.blue,
    topLabel: "MOMENTO 2 · ANUNCIO 2 DE 3 · ENSEÑANZA",
    visual: "TeachingAds",
    lines: [
      {
        text: "Segundo, anuncios educativos para quienes conocen la solución pero no han elegido a quién.",
        start: 95.666,
        end: 101.916,
        speaker: C,
      },
      {
        text: "Tu fundador en un pizarrón, o un video tipo Loom,",
        start: 101.916,
        end: 105.801,
        speaker: C,
      },
      {
        text: "explicando cómo funciona realmente el problema.",
        start: 105.801,
        end: 109.856,
        speaker: C,
      },
    ],
  },
  {
    id: 16,
    start: 109.856,
    end: 115.599,
    bg: BG.blue,
    topLabel: "EL OBJETIVO",
    visual: "OneThought",
    lines: [
      {
        text: "Quieres un solo pensamiento en su cabeza:",
        start: 109.856,
        end: 112.896,
        speaker: C,
      },
      {
        text: "“Esta persona sabe de lo que habla.”",
        start: 112.896,
        end: 115.599,
        speaker: C,
      },
    ],
  },
  {
    id: 17,
    start: 115.899,
    end: 119.196,
    bg: BG.cream,
    topLabel: "PETER PREGUNTA",
    visual: "PeterAsksSaved",
    lines: [
      {
        text: "¿Cuáles son los anuncios que se guardaron y nunca convirtieron?",
        start: 115.899,
        end: 119.196,
        speaker: P,
      },
    ],
  },
  {
    id: 18,
    start: 119.496,
    end: 124.021,
    bg: BG.cream,
    topLabel: "DÓNDE VAN LOS GUARDADOS",
    visual: "MaybeLaterFolder",
    lines: [
      {
        text: "Se guardaron como tu deck en la carpeta “tal vez después” de un inversionista.",
        start: 119.496,
        end: 124.021,
        speaker: C,
      },
    ],
  },
  {
    id: 19,
    start: 124.021,
    end: 132.247,
    bg: BG.green,
    topLabel: "MOMENTO 3 · ANUNCIO 3 DE 3 · CIERRE",
    visual: "ClosingAds",
    lines: [
      {
        text: "Necesitabas el tercer tipo: anuncios de cierre, para quienes ya están listos.",
        start: 124.021,
        end: 128.82,
        speaker: C,
      },
      {
        text: "Un piloto pagado con resultados por escrito.",
        start: 128.82,
        end: 132.247,
        speaker: C,
      },
    ],
  },
  {
    id: 20,
    start: 132.247,
    end: 139.651,
    bg: BG.green,
    topLabel: "TÚ VS. LA ALTERNATIVA",
    visual: "Versus",
    lines: [
      {
        text: "Tú contra contratar dos SDRs más.",
        start: 132.247,
        end: 136.224,
        speaker: C,
      },
      {
        text: "Tú contra “mejor lo construimos nosotros mismos”.",
        start: 136.224,
        end: 139.651,
        speaker: C,
      },
    ],
  },
  {
    id: 21,
    start: 139.951,
    end: 142.923,
    bg: BG.cream,
    topLabel: "PETER PREGUNTA",
    visual: "WhyOneCampaignTitle",
    lines: [
      {
        text: "¿Pero por qué poner los tres en una sola campaña?",
        start: 139.951,
        end: 142.923,
        speaker: P,
      },
    ],
  },
  {
    id: 22,
    start: 143.223,
    end: 149.997,
    bg: BG.cream,
    topLabel: "EL TRABAJO DE META",
    visual: "Funnel",
    lines: [
      {
        text: "Porque Meta le muestra a cada persona el anuncio para el que está lista,",
        start: 143.223,
        end: 146.897,
        speaker: C,
      },
      {
        text: "y el mismo comprador se topa con los tres.",
        start: 146.897,
        end: 149.997,
        speaker: C,
      },
    ],
  },
  {
    id: 23,
    start: 149.997,
    end: 157.114,
    bg: BG.yellow,
    topLabel: "EL MISMO COMPRADOR, TODA LA SEMANA",
    visual: "WeeklyCalendar",
    lines: [
      {
        text: "Un meme el lunes, un pizarrón el miércoles,",
        start: 149.997,
        end: 153.418,
        speaker: C,
      },
      {
        text: "una oferta piloto el viernes.",
        start: 153.418,
        end: 155.622,
        speaker: C,
      },
      {
        text: "Eso es el enjambre.",
        start: 155.622,
        end: 157.114,
        speaker: C,
      },
    ],
  },
  {
    id: 24,
    start: 157.114,
    end: 161.707,
    bg: BG.yellow,
    topLabel: "RESERVA UNA DEMO",
    visual: "FormFill",
    lines: [
      {
        text: "Para cuando llenan tu formulario, sienten que ya te conocen.",
        start: 157.114,
        end: 161.707,
        speaker: C,
      },
    ],
  },
  {
    id: 25,
    start: 162.007,
    end: 164.561,
    bg: BG.cream,
    topLabel: "PETER PREGUNTA",
    visual: "NoneBadTitle",
    lines: [
      {
        text: "¿Entonces ninguno de mis anuncios estaba mal?",
        start: 162.007,
        end: 164.561,
        speaker: P,
      },
    ],
  },
  {
    id: 26,
    start: 164.861,
    end: 170.016,
    bg: BG.cream,
    topLabel: "EL VEREDICTO FINAL",
    visual: "VerdictRecap",
    lines: [
      {
        text: "No, Peter.",
        start: 164.861,
        end: 166.976,
        speaker: C,
      },
      {
        text: "Solo hiciste que cada uno hiciera todo el trabajo solo,",
        start: 166.976,
        end: 170.016,
        speaker: C,
      },
    ],
  },
  {
    id: 27,
    start: 170.016,
    end: 175.833,
    bg: BG.yellow,
    topLabel: "TU EQUIPO DE MARKETING",
    visual: "Headcount",
    lines: [
      {
        text: "como tu equipo de marketing de una sola persona,",
        start: 170.016,
        end: 172.396,
        speaker: C,
      },
      {
        text: "que justo actualizó su LinkedIn a “disponible para trabajar”.",
        start: 172.396,
        end: 175.833,
        speaker: C,
      },
    ],
  },
  {
    id: 28,
    start: 175.833,
    end: 180.882,
    bg: BG.black,
    topLabel: "CONOCE EL PLAYBOOK",
    visual: "CTA",
    lines: [
      {
        text: "Comenta “Peter” y te envío el SOP de la Estrategia del Enjambre.",
        start: 175.833,
        end: 180.882,
        speaker: C,
      },
    ],
  },
];

export const TOTAL_SECONDS = shots[shots.length - 1].end;
