// Guion en español (adaptado, no traducción literal) + timing tomado del
// audio original en inglés (segundos). Cuando llegue el audio narrado en
// español real, solo hay que actualizar los `start`/`end` de cada línea
// (y de cada shot) para resincronizar — el resto del sistema no cambia.

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
    end: 3.9,
    bg: BG.cream,
    topLabel: "FUNDADOR B2B SAAS · ANUNCIOS EN META",
    visual: "TestLog",
    lines: [
      {
        text: "Tengo una empresa B2B SaaS y he probado todo tipo de anuncio en Meta.",
        start: 0.0,
        end: 3.9,
        speaker: P,
      },
    ],
  },
  {
    id: 2,
    start: 3.9,
    end: 6.0,
    bg: BG.yellow,
    topLabel: "ANUNCIOS DIVERTIDOS",
    visual: "StatFunny",
    lines: [
      {
        text: "Los anuncios divertidos tuvieron vistas y cero demos.",
        start: 3.9,
        end: 6.0,
        speaker: P,
      },
    ],
  },
  {
    id: 3,
    start: 6.0,
    end: 9.3,
    bg: BG.yellow,
    topLabel: "ANUNCIOS EDUCATIVOS",
    visual: "StatEducational",
    lines: [
      {
        text: "Los educativos se guardaron 200 veces y nadie agendó.",
        start: 6.0,
        end: 9.3,
        speaker: P,
      },
    ],
  },
  {
    id: 4,
    start: 9.3,
    end: 13.0,
    bg: BG.yellow,
    topLabel: "VEREDICTO DE PETER",
    visual: "TripleBad",
    lines: [
      {
        text: "Las ofertas se sintieron muy vendedoras, así que Meta simplemente no funciona para nosotros.",
        start: 9.3,
        end: 13.0,
        speaker: P,
      },
    ],
  },
  {
    id: 5,
    start: 13.0,
    end: 15.5,
    bg: BG.cream,
    topLabel: "CÓMO PETER LOS CORRIÓ",
    visual: "TripleWorked",
    lines: [
      {
        text: "Cada uno de esos anuncios funcionó, Peter.",
        start: 13.0,
        end: 15.5,
        speaker: C,
      },
    ],
  },
  {
    id: 6,
    start: 15.5,
    end: 21.5,
    bg: BG.cream,
    topLabel: "LA MISMA LÓGICA QUE...",
    visual: "PitchVC",
    lines: [
      {
        text: "Solo los corriste uno a la vez. Es como lanzarle tu pitch a un inversionista,",
        start: 15.5,
        end: 19.3,
        speaker: C,
      },
      {
        text: "que te diga que no, y concluir que levantar capital no funciona.",
        start: 19.3,
        end: 21.5,
        speaker: C,
      },
    ],
  },
  {
    id: 7,
    start: 21.5,
    end: 26.2,
    bg: BG.cream,
    topLabel: "RONDA SEMILLA DE PETER",
    visual: "SeedRound",
    lines: [
      {
        text: "Así conseguimos nuestra ronda semilla.",
        start: 21.5,
        end: 23.5,
        speaker: P,
      },
      { text: "De mi tío.", start: 23.5, end: 24.6, speaker: P },
      {
        text: "Se nota. Aquí está el punto:",
        start: 24.6,
        end: 26.2,
        speaker: C,
      },
    ],
  },
  {
    id: 8,
    start: 26.2,
    end: 35.7,
    bg: BG.creamAlt,
    topLabel: "LOS 3 MOMENTOS DE TU COMPRADOR",
    visual: "Moments",
    lines: [
      {
        text: "Tu comprador pasa por tres momentos.",
        start: 26.2,
        end: 28.1,
        speaker: C,
      },
      {
        text: "Primero, sabe que algo está mal, pero no sabe qué lo arregla.",
        start: 28.1,
        end: 31.0,
        speaker: C,
      },
      {
        text: "Luego, descubre la solución y empieza a comparar opciones.",
        start: 31.0,
        end: 33.4,
        speaker: C,
      },
      {
        text: "Después, está listo, comparándote con todo lo demás.",
        start: 33.4,
        end: 35.7,
        speaker: C,
      },
    ],
  },
  {
    id: 9,
    start: 35.7,
    end: 38.3,
    bg: BG.tan,
    topLabel: "1 ANUNCIO = 1 MOMENTO",
    visual: "Mapping",
    lines: [
      {
        text: "Cada uno de tus anuncios solo le habla a uno de esos momentos.",
        start: 35.7,
        end: 38.3,
        speaker: C,
      },
    ],
  },
  {
    id: 10,
    start: 38.3,
    end: 42.4,
    bg: BG.cream,
    topLabel: "¿CUÁL ANUNCIO ES EL CORRECTO?",
    visual: "WhichAd",
    lines: [
      {
        text: "¿Entonces qué tipo de anuncio es el correcto?",
        start: 38.3,
        end: 40.6,
        speaker: P,
      },
      {
        text: "Los tres, en la misma campaña.",
        start: 40.6,
        end: 42.4,
        speaker: C,
      },
    ],
  },
  {
    id: 11,
    start: 42.4,
    end: 43.8,
    bg: BG.yellow,
    topLabel: "SE LLAMA...",
    visual: "SwarmTitle",
    lines: [
      {
        text: "Se llama la Estrategia del Enjambre.",
        start: 42.4,
        end: 43.8,
        speaker: C,
      },
    ],
  },
  {
    id: 12,
    start: 43.8,
    end: 53.2,
    bg: BG.pink,
    topLabel: "MOMENTO 1 · ANUNCIO 1 DE 3 · ATENCIÓN",
    visual: "AttentionAds",
    lines: [
      {
        text: "Primero, anuncios de atención para quienes sienten el dolor.",
        start: 43.8,
        end: 46.0,
        speaker: C,
      },
      {
        text: "Un meme sobre tu vendedor actualizando el CRM a las 11 de la noche.",
        start: 46.0,
        end: 48.8,
        speaker: C,
      },
      {
        text: "Un sketch sobre la junta directiva donde el pipeline “se ve saludable”.",
        start: 48.8,
        end: 51.2,
        speaker: C,
      },
      {
        text: "O una oferta tan directa que no pueden ignorar.",
        start: 51.2,
        end: 53.2,
        speaker: C,
      },
    ],
  },
  {
    id: 13,
    start: 53.2,
    end: 57.3,
    bg: BG.amber,
    topLabel: "OBJECIÓN DE PETER",
    visual: "Pushback",
    lines: [
      {
        text: "¿Memes? Somos una empresa enterprise.",
        start: 53.2,
        end: 55.3,
        speaker: P,
      },
      {
        text: "Nuestros compradores son gente seria.",
        start: 55.3,
        end: 57.3,
        speaker: P,
      },
    ],
  },
  {
    id: 14,
    start: 57.3,
    end: 61.5,
    bg: BG.creamAlt,
    topLabel: "LA REALIDAD",
    visual: "Comeback",
    lines: [
      {
        text: "Tus compradores son gente seria que manda memes sobre su jefe en Slack todo el día.",
        start: 57.3,
        end: 61.5,
        speaker: C,
      },
    ],
  },
  {
    id: 15,
    start: 61.5,
    end: 69.9,
    bg: BG.blue,
    topLabel: "MOMENTO 2 · ANUNCIO 2 DE 3 · ENSEÑANZA",
    visual: "TeachingAds",
    lines: [
      {
        text: "Segundo, anuncios educativos para quienes conocen la solución pero no han elegido a quién.",
        start: 61.5,
        end: 65.2,
        speaker: C,
      },
      {
        text: "Tu fundador en un pizarrón, o un video tipo Loom,",
        start: 65.2,
        end: 67.5,
        speaker: C,
      },
      {
        text: "explicando cómo funciona realmente el problema.",
        start: 67.5,
        end: 69.9,
        speaker: C,
      },
    ],
  },
  {
    id: 16,
    start: 69.9,
    end: 73.3,
    bg: BG.blue,
    topLabel: "EL OBJETIVO",
    visual: "OneThought",
    lines: [
      {
        text: "Quieres un solo pensamiento en su cabeza:",
        start: 69.9,
        end: 71.7,
        speaker: C,
      },
      {
        text: "“Esta persona sabe de lo que habla.”",
        start: 71.7,
        end: 73.3,
        speaker: C,
      },
    ],
  },
  {
    id: 17,
    start: 73.3,
    end: 76.3,
    bg: BG.cream,
    topLabel: "PETER PREGUNTA",
    visual: "PeterAsksSaved",
    lines: [
      {
        text: "¿Cuáles son los anuncios que se guardaron y nunca convirtieron?",
        start: 73.3,
        end: 76.3,
        speaker: P,
      },
    ],
  },
  {
    id: 18,
    start: 76.3,
    end: 79.6,
    bg: BG.cream,
    topLabel: "DÓNDE VAN LOS GUARDADOS",
    visual: "MaybeLaterFolder",
    lines: [
      {
        text: "Se guardaron como tu deck en la carpeta “tal vez después” de un inversionista.",
        start: 76.3,
        end: 79.6,
        speaker: C,
      },
    ],
  },
  {
    id: 19,
    start: 79.6,
    end: 85.6,
    bg: BG.green,
    topLabel: "MOMENTO 3 · ANUNCIO 3 DE 3 · CIERRE",
    visual: "ClosingAds",
    lines: [
      {
        text: "Necesitabas el tercer tipo: anuncios de cierre, para quienes ya están listos.",
        start: 79.6,
        end: 83.1,
        speaker: C,
      },
      {
        text: "Un piloto pagado con resultados por escrito.",
        start: 83.1,
        end: 85.6,
        speaker: C,
      },
    ],
  },
  {
    id: 20,
    start: 85.6,
    end: 91.0,
    bg: BG.green,
    topLabel: "TÚ VS. LA ALTERNATIVA",
    visual: "Versus",
    lines: [
      {
        text: "Tú contra contratar dos SDRs más.",
        start: 85.6,
        end: 88.5,
        speaker: C,
      },
      {
        text: "Tú contra “mejor lo construimos nosotros mismos”.",
        start: 88.5,
        end: 91.0,
        speaker: C,
      },
    ],
  },
  {
    id: 21,
    start: 91.0,
    end: 93.6,
    bg: BG.cream,
    topLabel: "PETER PREGUNTA",
    visual: "WhyOneCampaignTitle",
    lines: [
      {
        text: "¿Pero por qué poner los tres en una sola campaña?",
        start: 91.0,
        end: 93.6,
        speaker: P,
      },
    ],
  },
  {
    id: 22,
    start: 93.6,
    end: 99.5,
    bg: BG.cream,
    topLabel: "EL TRABAJO DE META",
    visual: "Funnel",
    lines: [
      {
        text: "Porque Meta le muestra a cada persona el anuncio para el que está lista,",
        start: 93.6,
        end: 96.8,
        speaker: C,
      },
      {
        text: "y el mismo comprador se topa con los tres.",
        start: 96.8,
        end: 99.5,
        speaker: C,
      },
    ],
  },
  {
    id: 23,
    start: 99.5,
    end: 105.7,
    bg: BG.yellow,
    topLabel: "EL MISMO COMPRADOR, TODA LA SEMANA",
    visual: "WeeklyCalendar",
    lines: [
      {
        text: "Un meme el lunes, un pizarrón el miércoles,",
        start: 99.5,
        end: 102.48,
        speaker: C,
      },
      {
        text: "una oferta piloto el viernes.",
        start: 102.48,
        end: 104.4,
        speaker: C,
      },
      { text: "Eso es el enjambre.", start: 104.4, end: 105.7, speaker: C },
    ],
  },
  {
    id: 24,
    start: 105.7,
    end: 109.7,
    bg: BG.yellow,
    topLabel: "RESERVA UNA DEMO",
    visual: "FormFill",
    lines: [
      {
        text: "Para cuando llenan tu formulario, sienten que ya te conocen.",
        start: 105.7,
        end: 109.7,
        speaker: C,
      },
    ],
  },
  {
    id: 25,
    start: 109.7,
    end: 111.4,
    bg: BG.cream,
    topLabel: "PETER PREGUNTA",
    visual: "NoneBadTitle",
    lines: [
      {
        text: "¿Entonces ninguno de mis anuncios estaba mal?",
        start: 109.7,
        end: 111.4,
        speaker: P,
      },
    ],
  },
  {
    id: 26,
    start: 111.4,
    end: 115.3,
    bg: BG.cream,
    topLabel: "EL VEREDICTO FINAL",
    visual: "VerdictRecap",
    lines: [
      { text: "No, Peter.", start: 111.4, end: 113.0, speaker: C },
      {
        text: "Solo hiciste que cada uno hiciera todo el trabajo solo,",
        start: 113.0,
        end: 115.3,
        speaker: C,
      },
    ],
  },
  {
    id: 27,
    start: 115.3,
    end: 119.7,
    bg: BG.yellow,
    topLabel: "TU EQUIPO DE MARKETING",
    visual: "Headcount",
    lines: [
      {
        text: "como tu equipo de marketing de una sola persona,",
        start: 115.3,
        end: 117.1,
        speaker: C,
      },
      {
        text: "que justo actualizó su LinkedIn a “disponible para trabajar”.",
        start: 117.1,
        end: 119.7,
        speaker: C,
      },
    ],
  },
  {
    id: 28,
    start: 119.7,
    end: 123.52,
    bg: BG.black,
    topLabel: "CONOCE EL PLAYBOOK",
    visual: "CTA",
    lines: [
      {
        text: "Comenta “Peter” y te envío el SOP de la Estrategia del Enjambre.",
        start: 119.7,
        end: 123.52,
        speaker: C,
      },
    ],
  },
];

export const TOTAL_SECONDS = shots[shots.length - 1].end;
