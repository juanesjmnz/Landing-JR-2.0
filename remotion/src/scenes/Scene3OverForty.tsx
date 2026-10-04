import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../theme";
import { fontHeavy } from "../fonts";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { bounceIn, breathe } from "../utils/anim";
import { overFortyHeadline } from "../script";

const PersonIcon: React.FC<{ delay: number; frame: number; fps: number }> = ({ delay, frame, fps }) => {
  const p = bounceIn(frame, fps, delay);
  const scale = Math.max(0, p);
  const opacity = interpolate(frame, [delay, delay + 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <svg width={22} height={28} style={{ opacity, transform: `scale(${scale})` }}>
      <circle cx={11} cy={6} r={6} fill={colors.blue} />
      <rect x={3} y={13} width={16} height={14} rx={4} fill={colors.blue} />
    </svg>
  );
};

export const Scene3OverForty: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rows = 4;
  const cols = 7;
  const iconStart = 72;

  const barEntrance = bounceIn(frame, fps);
  const barScaleX = Math.max(0, Math.min(1, barEntrance));

  const headlineEntrance = bounceIn(frame, fps, 4);
  const dividerPulse = 1 + breathe(frame, 60, 0.08);

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start", paddingTop: 170 }}>
      <AnimatedBackground variant="light" accent={colors.blue} />

      <div
        style={{
          fontFamily: fontHeavy,
          fontWeight: 700,
          fontSize: 27,
          color: "#1A1A1A",
          textAlign: "center",
          maxWidth: 560,
          marginBottom: 34,
          opacity: Math.min(1, headlineEntrance),
          transform: `translateY(${interpolate(Math.min(1, headlineEntrance), [0, 1], [-14, 0])}px)`,
        }}
      >
        {overFortyHeadline}
      </div>

      <div style={{ display: "flex", width: 440, height: 74, transform: `scaleX(${barScaleX})`, transformOrigin: "center", boxShadow: "0 10px 26px rgba(21,101,192,0.22)" }}>
        <div style={{ width: "50%", backgroundColor: colors.green, borderRadius: "6px 0 0 6px" }} />
        <div style={{ width: 5, backgroundColor: "#1A1A1A", transform: `scaleY(${dividerPulse})` }} />
        <div style={{ width: "50%", backgroundColor: colors.blue, borderRadius: "0 6px 6px 0" }} />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 24px)`,
          gap: 7,
          marginTop: 22,
          marginLeft: 100,
        }}
      >
        {Array.from({ length: rows * cols }).map((_, i) => (
          <PersonIcon key={i} delay={iconStart + i * 2} frame={frame} fps={fps} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
