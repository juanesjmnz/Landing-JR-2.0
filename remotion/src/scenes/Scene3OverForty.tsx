import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors } from "../theme";
import { fontHeavy } from "../fonts";
import { TwoToneCaption } from "../components/TwoToneCaption";
import { overFortyHeadline, overFortyLines } from "../script";

const PersonIcon: React.FC<{ delay: number; frame: number }> = ({ delay, frame }) => {
  const opacity = interpolate(frame, [delay, delay + 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <svg width={20} height={26} style={{ opacity }}>
      <circle cx={10} cy={6} r={6} fill={colors.blue} />
      <rect x={2} y={13} width={16} height={13} rx={4} fill={colors.blue} />
    </svg>
  );
};

export const Scene3OverForty: React.FC = () => {
  const frame = useCurrentFrame();

  const rows = 4;
  const cols = 7;
  const iconStart = 72; // begins as line 7 starts

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bgLight,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          fontFamily: fontHeavy,
          fontWeight: 700,
          fontSize: 26,
          color: "#1A1A1A",
          textAlign: "center",
          maxWidth: 560,
          marginBottom: 30,
        }}
      >
        {overFortyHeadline}
      </div>

      <div style={{ display: "flex", width: 440, height: 70 }}>
        <div style={{ width: "50%", backgroundColor: colors.green }} />
        <div style={{ width: 4, backgroundColor: "#1A1A1A" }} />
        <div style={{ width: "50%", backgroundColor: colors.blue }} />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 22px)`,
          gap: 6,
          marginTop: 18,
          marginLeft: 100,
        }}
      >
        {Array.from({ length: rows * cols }).map((_, i) => (
          <PersonIcon key={i} delay={iconStart + i * 2} frame={frame} />
        ))}
      </div>

      <div style={{ height: 140, marginTop: 40, display: "flex", alignItems: "flex-start" }}>
        {overFortyLines.map((line, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              opacity: frame >= line.startFrame && frame < line.startFrame + line.durationInFrames ? 1 : 0,
            }}
          >
            <TwoToneCaption text={line.text} startFrame={line.startFrame} durationInFrames={line.durationInFrames} fontSize={40} />
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
