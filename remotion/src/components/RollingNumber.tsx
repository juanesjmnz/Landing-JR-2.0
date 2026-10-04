import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { fontHeavy } from "../fonts";
import { punch } from "../utils/anim";

interface RollingNumberProps {
  value: string;
  color: string;
  fontSize?: number;
  /** Frame (relative to the scene) at which this value became current — each
   * character flips/slides in staggered from that moment. */
  changedAtFrame: number;
}

/**
 * Odometer-flavored value display: whenever `value` changes (tracked via
 * `changedAtFrame`), every character slides up into place with a staggered
 * spring pop instead of just appearing — much more "motion design" than a
 * flat text swap.
 */
export const RollingNumber: React.FC<RollingNumberProps> = ({
  value,
  color,
  fontSize = 90,
  changedAtFrame,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rel = frame - changedAtFrame;
  const chars = value.split("");

  return (
    <div
      style={{
        display: "flex",
        fontFamily: fontHeavy,
        fontWeight: 800,
        fontSize,
        color,
        position: "relative",
      }}
    >
      {chars.map((ch, i) => {
        const delay = i * 2;
        const p = punch(rel, fps, delay);
        const clamped = Math.max(0, Math.min(1, p));
        const translateY = interpolate(clamped, [0, 1], [-fontSize * 0.5, 0]);
        const opacity = interpolate(rel - delay, [0, 4], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <span
            key={`${i}-${ch}`}
            style={{
              display: "inline-block",
              transform: `translateY(${translateY}px)`,
              opacity,
              minWidth: ch === "-" ? "0.5ch" : undefined,
            }}
          >
            {ch}
          </span>
        );
      })}
    </div>
  );
};
