// Spanish caption lines + frame timing, derived word-for-word from the real
// recorded voiceover (public/voiceover-es.mp3) via forced-alignment
// transcription. Every startFrame/durationInFrames below is driven by that
// recording's actual timestamps at 30fps — if the audio changes, re-run the
// alignment and update this file to match.

export interface CaptionLine {
  text: string;
  startFrame: number; // relative to the scene's own Sequence
  durationInFrames: number;
}

export const SCENE_DURATIONS = {
  counter: 307, // 0.00 - 10.23s
  underFive: 363, // overlaps TRANSITION_FRAMES with neighbors (nominal, not final on-screen time)
  overBudget: 181, // the voiceover runs straight into scene 4 with ~no gap
  numberLine: 337,
  countdown: 314,
  statement: 173,
} as const;

export const counterLines: CaptionLine[] = [
  { text: "¿Cuántos anuncios necesitas por conjunto de anuncios?", startFrame: 9, durationInFrames: 86 },
  { text: "Ni 1, ni 50,", startFrame: 100, durationInFrames: 31 },
  { text: "el rango ideal es 5 a 25 aproximadamente, dependiendo de tu presupuesto.", startFrame: 142, durationInFrames: 132 },
];

export const underFiveLines: CaptionLine[] = [
  { text: "Con menos de 5 no hay señal de aprendizaje ni variedad suficiente,", startFrame: 0, durationInFrames: 110 },
  { text: "Meta no puede hacer pruebas entre los anuncios", startFrame: 130, durationInFrames: 59 },
  { text: "y al tener poca variación, un solo anuncio puede llevar mucha inversión y generar sesgo.", startFrame: 189, durationInFrames: 136 },
];

export const overBudgetLines: CaptionLine[] = [
  { text: "Con más de 25 el presupuesto se diluye,", startFrame: 0, durationInFrames: 65 },
  { text: "puede que un muy buen anuncio esté escondido porque nunca obtuvo gasto.", startFrame: 74, durationInFrames: 93 },
];

export const overBudgetHeadline = "Un solo flujo delgado de presupuesto, todos pasan hambre";

export const numberLineLines: CaptionLine[] = [
  { text: "El número exacto dentro del rango depende de tu presupuesto", startFrame: 0, durationInFrames: 106 },
  { text: "y de tu velocidad de producción creativa.", startFrame: 106, durationInFrames: 57 },
  { text: "Más gasto y más conceptos, necesitas subir más tu cantidad.", startFrame: 178, durationInFrames: 104 },
];

export const countdownLines: CaptionLine[] = [
  { text: "La prueba de oro es: ¿puedes identificar tus anuncios ganadores en tan solo 10 días?", startFrame: 0, durationInFrames: 155 },
  { text: "Si no puedes hacerlo, tienes demasiados anuncios para el presupuesto que tienes.", startFrame: 175, durationInFrames: 100 },
];

export const statementLines = {
  first: "UN CONJUNTO DE ANUNCIOS\nES UNA PRUEBA CONTROLADA",
  second: "NO UN LUGAR PARA SOLTAR\nCIENTOS DE ANUNCIOS Y NO REVISARLO",
  firstDuration: 80,
};

// Full narration script, in order — matches public/voiceover-es.mp3 exactly.
export const FULL_SCRIPT_ES = [
  ...counterLines,
  ...underFiveLines,
  ...overBudgetLines,
  ...numberLineLines,
  ...countdownLines,
]
  .map((l) => l.text)
  .concat(["Un conjunto de anuncios es una prueba controlada,", "no un lugar para soltar cientos de anuncios y no revisarlo."]);

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
  { key: "counter", lines: counterLines, theme: "light" },
  { key: "underFive", lines: underFiveLines, theme: "light" },
  { key: "overBudget", lines: overBudgetLines, theme: "light" },
  { key: "numberLine", lines: numberLineLines, theme: "light" },
  { key: "countdown", lines: countdownLines, theme: "dark" },
  // "statement" is intentionally excluded here: Scene6Statement already
  // renders its line as a big bold centered headline, so adding it to the
  // global caption track would just duplicate the same text on screen.
  { key: "statement", lines: [], theme: "light" },
];

// Scenes are assembled with @remotion/transitions' <TransitionSeries>, which
// makes adjacent scenes overlap by TRANSITION_FRAMES (the transition "eats"
// into both sides rather than being inserted between them). So a scene's
// absolute start in the final composition is NOT the naive cumulative sum of
// prior durations — it's that sum minus one transition-worth of frames per
// prior cut. This constant must match Video.tsx's TransitionSeries timing.
export const TRANSITION_FRAMES = 14;

interface SceneSpan {
  start: number;
  end: number; // start + this scene's own full nominal duration
  theme: Theme;
}

const SCENE_SPANS: SceneSpan[] = (() => {
  let offset = 0;
  const out: SceneSpan[] = [];
  SCENE_ORDER.forEach((scene, i) => {
    const duration = SCENE_DURATIONS[scene.key];
    out.push({ start: offset, end: offset + duration, theme: scene.theme });
    const isLast = i === SCENE_ORDER.length - 1;
    offset += duration - (isLast ? 0 : TRANSITION_FRAMES);
  });
  return out;
})();

/** Real composition length once transition overlaps are accounted for. */
export const TOTAL_DURATION_IN_FRAMES = SCENE_SPANS[SCENE_SPANS.length - 1].end;

/** { start, end } per scene on the actual (overlap-adjusted) timeline — used
 * by the timeline bar to size/fill each chapter segment. */
export const SCENE_SEGMENTS: Array<{ start: number; end: number }> = SCENE_SPANS.map((s) => ({
  start: s.start,
  end: s.end,
}));

export const getThemeAtFrame = (frame: number): Theme => {
  for (const span of SCENE_SPANS) {
    if (frame < span.end) return span.theme;
  }
  return SCENE_SPANS[SCENE_SPANS.length - 1].theme;
};

export const ALL_CAPTIONS: AbsoluteCaption[] = (() => {
  const out: AbsoluteCaption[] = [];
  SCENE_ORDER.forEach((scene, i) => {
    const sceneStart = SCENE_SPANS[i].start;
    const sceneDuration = SCENE_DURATIONS[scene.key];
    const isLastScene = i === SCENE_ORDER.length - 1;
    // Trim back a line that would otherwise run right up to the scene's
    // nominal end: the next scene's content starts sliding in TRANSITION_FRAMES
    // early (the transition overlaps both sides), so without this the
    // outgoing caption visually collides with the incoming scene's own text.
    const captionCutoff = isLastScene ? sceneDuration : sceneDuration - TRANSITION_FRAMES;
    for (const line of scene.lines) {
      const clampedDuration = Math.min(line.durationInFrames, captionCutoff - line.startFrame);
      if (clampedDuration <= 0) continue;
      out.push({
        text: line.text,
        start: sceneStart + line.startFrame,
        duration: clampedDuration,
        theme: scene.theme,
      });
    }
  });
  return out;
})();
