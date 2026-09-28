// Spanish caption lines + frame timing, derived from the original reel's
// narration timestamps (transcribed at 0.0–38.4s, 30fps project).
// Re-time these once the real Spanish voiceover audio is available: adjust
// each line's startFrame/durationInFrames (and SCENE_DURATIONS below) to
// match the new audio's actual word timing.

export interface CaptionLine {
  text: string;
  startFrame: number; // relative to the scene's own Sequence
  durationInFrames: number;
}

export const SCENE_DURATIONS = {
  cube: 189, // 0.0 - 6.3s
  underFive: 213, // 6.3 - 13.4s
  overForty: 153, // 13.4 - 18.5s
  numberLine: 261, // 18.5 - 27.2s
  countdown: 186, // 27.2 - 33.4s
  statement: 150, // 33.4 - 38.4s
} as const;

export const cubeLines: CaptionLine[] = [
  { text: "¿Cuántos anuncios por conjunto de anuncios? Ni uno, ni 100 —", startFrame: 0, durationInFrames: 111 },
  { text: "el rango de trabajo es de 5 a 40.", startFrame: 111, durationInFrames: 78 },
];

export const underFiveLines: CaptionLine[] = [
  { text: "Con menos de 5, no hay señal de aprendizaje,", startFrame: 0, durationInFrames: 69 },
  { text: "Meta no puede secuenciar entre los anuncios", startFrame: 69, durationInFrames: 63 },
  { text: "y la variación temprana se confunde con la verdad.", startFrame: 132, durationInFrames: 81 },
];

export const overFortyLines: CaptionLine[] = [
  { text: "Con más de 40, el presupuesto se diluye.", startFrame: 0, durationInFrames: 72 },
  { text: "Los ganadores nunca logran el gasto suficiente para demostrarlo.", startFrame: 72, durationInFrames: 81 },
];

export const overFortyHeadline = "Un solo flujo delgado de presupuesto, todos pasan hambre";

export const numberLineLines: CaptionLine[] = [
  { text: "El número exacto dentro del rango depende de tu presupuesto", startFrame: 0, durationInFrames: 105 },
  { text: "y tu velocidad creativa.", startFrame: 105, durationInFrames: 51 },
  { text: "Más gasto y más conceptos — necesitas subir más alto.", startFrame: 156, durationInFrames: 105 },
];

export const countdownLines: CaptionLine[] = [
  { text: "La prueba es: ¿puedes identificar a tus ganadores en 10 días?", startFrame: 0, durationInFrames: 120 },
  { text: "Si no, tienes demasiados anuncios.", startFrame: 120, durationInFrames: 66 },
];

export const statementLines = {
  first: "UN CONJUNTO DE ANUNCIOS\nES UNA PRUEBA CONTROLADA",
  second: "NO ES UN LUGAR PARA\nSOLTAR 5.000 ANUNCIOS",
  firstDuration: 66,
};

// Full narration script, in order — same text used for the ES voiceover deliverable.
export const FULL_SCRIPT_ES = [
  ...cubeLines,
  ...underFiveLines,
  ...overFortyLines,
  ...numberLineLines,
  ...countdownLines,
]
  .map((l) => l.text)
  .concat(["Un conjunto de anuncios es una prueba controlada,", "no un lugar para soltar 5.000 anuncios."]);
