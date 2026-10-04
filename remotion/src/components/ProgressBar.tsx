import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../theme";

/** Thin bottom progress bar — standard viral-Reel pacing cue. */
export const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, width } = useVideoConfig();
  const progress = Math.min(1, frame / durationInFrames);

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%",
          height: 8,
          backgroundColor: "rgba(0,0,0,0.12)",
        }}
      >
        <div
          style={{
            width: width * progress,
            height: "100%",
            backgroundColor: colors.highlight,
            boxShadow: "0 0 14px rgba(212,255,63,0.7)",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
