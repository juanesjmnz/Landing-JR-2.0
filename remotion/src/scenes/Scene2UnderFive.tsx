import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors } from "../theme";
import { fontHand } from "../fonts";
import { TwoToneCaption } from "../components/TwoToneCaption";
import { underFiveLines } from "../script";

export const Scene2UnderFive: React.FC = () => {
  const frame = useCurrentFrame();
  const barWidth = interpolate(frame, [0, 20], [0, 300], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const iconsOpacity = interpolate(frame, [55, 75], [0, 1], {
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
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 90 }}>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <div style={{ width: 4, height: 120, backgroundColor: "#1A1A1A" }} />
          <div style={{ width: 4, height: 4, borderRadius: 4, backgroundColor: "#1A1A1A", marginLeft: -4, marginBottom: 116 }} />
          <div style={{ width: barWidth, height: 60, backgroundColor: colors.green }} />
        </div>
        <div style={{ fontFamily: fontHand, fontSize: 44, color: "#1A1A1A", marginTop: 14 }}>5 a 40</div>

        <div style={{ opacity: iconsOpacity, marginTop: 50, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ width: 26, height: 26, backgroundColor: "#D98A8A" }} />
            <div style={{ width: 26, height: 26, backgroundColor: "#D98A8A" }} />
          </div>
          <svg width={140} height={30}>
            <path
              d="M0,15 Q17,0 35,15 T70,15 T105,15 T140,15"
              stroke="#C97A7A"
              strokeWidth={4}
              fill="none"
            />
          </svg>
        </div>
      </div>

      <div style={{ height: 140, display: "flex", alignItems: "flex-start" }}>
        {underFiveLines.map((line, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              opacity: frame >= line.startFrame && frame < line.startFrame + line.durationInFrames ? 1 : 0,
            }}
          >
            <TwoToneCaption text={line.text} startFrame={line.startFrame} durationInFrames={line.durationInFrames} fontSize={42} />
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
