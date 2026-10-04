import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { fontHeavy } from "../fonts";
import { bounceIn } from "../utils/anim";

interface BounceWordProps {
  text: string;
  color: string;
  delay: number;
  fontSize: number;
  background?: string;
}

/** A single word/phrase that springs in with a scale+fade bounce, staggered by `delay` frames. */
export const BounceWord: React.FC<BounceWordProps> = ({ text, color, delay, fontSize, background }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = bounceIn(frame, fps, delay);
  const scale = 0.5 + Math.max(0, Math.min(1.1, p)) * 0.5;
  const opacity = interpolate(frame, [delay, delay + 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <span
      style={{
        display: "inline-block",
        fontFamily: fontHeavy,
        fontWeight: 800,
        fontSize,
        color,
        backgroundColor: background,
        borderRadius: background ? 10 : 0,
        padding: background ? "2px 14px" : 0,
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      {text}
    </span>
  );
};
