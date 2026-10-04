import { spring } from "remotion";

/** One-shot bounce-in: 0 → ~1.08 → 1, for scale/opacity entrances. */
export const bounceIn = (frame: number, fps: number, delay = 0) =>
  spring({
    frame: frame - delay,
    fps,
    config: { damping: 11, mass: 0.6, stiffness: 170 },
  });

/** Snappier punch, used for quick emphasis beats (number swaps, reveals). */
export const punch = (frame: number, fps: number, delay = 0) =>
  spring({
    frame: frame - delay,
    fps,
    config: { damping: 9, mass: 0.4, stiffness: 260 },
  });

/** Continuous idle breathing (no frame-zero snap), for ambient background motion. */
export const breathe = (frame: number, period = 45, amplitude = 1) =>
  Math.sin(frame / (period / (Math.PI * 2))) * amplitude;

/** Small continuous wiggle rotation, for "alert"-style looping icons. */
export const wiggle = (frame: number, period = 18, amplitude = 6) =>
  Math.sin(frame / (period / (Math.PI * 2))) * amplitude;

/** Euclidean length of a straight line, for stroke-dasharray draw-in animations. */
export const lineLength = (x1: number, y1: number, x2: number, y2: number) =>
  Math.hypot(x2 - x1, y2 - y1);
