import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors } from "../theme";
import { IsoCube } from "../components/IsoCube";
import { TwoToneCaption } from "../components/TwoToneCaption";
import { cubeLines } from "../script";

export const Scene1Cube: React.FC = () => {
  const frame = useCurrentFrame();

  let number = "1";
  let overlay: "x" | "check" | null = null;
  if (frame >= 111) {
    number = "5-40";
    overlay = frame >= 120 ? "check" : null;
  } else if (frame >= 54) {
    number = "100";
    overlay = frame >= 60 ? "x" : null;
  }

  const cubeScale = interpolate(frame, [0, 15], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bgLight,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 60,
      }}
    >
      <div style={{ transform: `scale(${cubeScale})` }}>
        <IsoCube number={number} overlay={overlay} />
      </div>
      <div style={{ height: 140, display: "flex", alignItems: "flex-start" }}>
        {cubeLines.map((line, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              opacity: frame >= line.startFrame && frame < line.startFrame + line.durationInFrames ? 1 : 0,
            }}
          >
            <TwoToneCaption
              text={line.text}
              startFrame={line.startFrame}
              durationInFrames={line.durationInFrames}
              fontSize={46}
            />
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
