import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors } from "../theme";
import { SCENE_BOUNDARIES, TOTAL_DURATION_IN_FRAMES } from "../script";

/** Quick white punch-flash at every scene cut — gives hard cuts extra snap. */
export const TransitionFlash: React.FC = () => {
  const frame = useCurrentFrame();
  const boundaries = SCENE_BOUNDARIES.filter((b) => b < TOTAL_DURATION_IN_FRAMES);

  const opacity = boundaries.reduce((max, b) => {
    const v = interpolate(frame, [b - 3, b, b + 5], [0, 0.85, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    return Math.max(max, v);
  }, 0);

  if (opacity <= 0) return null;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.white, opacity, pointerEvents: "none" }} />
  );
};
