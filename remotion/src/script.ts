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

// --- Global centered caption track -----------------------------------------
// The on-screen graphics differ per scene, but the spoken-word captions now
// render as a single consistent overlay dead-center on screen (viral-reel
// style), independent of whatever scene graphic is playing behind them.
// This flattens every scene's lines onto the composition's absolute frame
// timeline using SCENE_DURATIONS as cumulative offsets.

export type Theme = "light" | "dark";

export interface AbsoluteCaption {
  text: string;
  start: number; // absolute frame in the full composition
  duration: number;
  theme: Theme;
}

const SCENE_ORDER: Array<{ key: keyof typeof SCENE_DURATIONS; lines: CaptionLine[]; theme: Theme }> = [
  { key: "cube", lines: cubeLines, theme: "light" },
  { key: "underFive", lines: underFiveLines, theme: "light" },
  { key: "overForty", lines: overFortyLines, theme: "light" },
  { key: "numberLine", lines: numberLineLines, theme: "light" },
  { key: "countdown", lines: countdownLines, theme: "dark" },
  // "statement" is intentionally excluded here: Scene6Statement already
  // renders its line as a big bold centered headline, so adding it to the
  // global caption track would just duplicate the same text on screen.
  { key: "statement", lines: [], theme: "light" },
];

export const TOTAL_DURATION_IN_FRAMES = Object.values(SCENE_DURATIONS).reduce((a, b) => a + b, 0);

export const SCENE_BOUNDARIES: number[] = (() => {
  let offset = 0;
  const out: number[] = [];
  for (const scene of SCENE_ORDER) {
    offset += SCENE_DURATIONS[scene.key];
    out.push(offset);
  }
  return out;
})();

export const ALL_CAPTIONS: AbsoluteCaption[] = (() => {
  let offset = 0;
  const out: AbsoluteCaption[] = [];
  for (const scene of SCENE_ORDER) {
    for (const line of scene.lines) {
      out.push({
        text: line.text,
        start: offset + line.startFrame,
        duration: line.durationInFrames,
        theme: scene.theme,
      });
    }
    offset += SCENE_DURATIONS[scene.key];
  }
  return out;
})();
