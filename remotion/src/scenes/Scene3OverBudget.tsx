import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../theme";
import { fontHeavy } from "../fonts";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { FloatingParticles } from "../components/FloatingParticles";
import { IconChip } from "../components/IconChip";
import { bounceIn, breathe } from "../utils/anim";
import { overBudgetHeadline } from "../script";

const HIDDEN_WINNER_INDEX = 17;
const STAR_TRIGGER_FRAME = 116; // lines up with the voiceover saying "escondido"

const PersonIcon: React.FC<{ delay: number; frame: number; fps: number; hidden: boolean }> = ({
  delay,
  frame,
  fps,
  hidden,
}) => {
  const p = bounceIn(frame, fps, delay);
  const scale = Math.max(0, p);
  const opacity = interpolate(frame, [delay, delay + 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const color = hidden ? colors.gray : colors.blue;

  const starP = hidden ? Math.max(0, Math.min(1.2, bounceIn(frame, fps, STAR_TRIGGER_FRAME))) : 0;
  const starPulse = hidden ? 1 + Math.abs(Math.sin((frame - STAR_TRIGGER_FRAME) / 9)) * 0.18 : 1;

  return (
    <div style={{ position: "relative", width: 22, height: 28 }}>
      <svg width={22} height={28} style={{ opacity, transform: `scale(${scale})` }}>
        <circle cx={11} cy={6} r={6} fill={color} opacity={hidden ? 0.5 : 1} />
        <rect x={3} y={13} width={16} height={14} rx={4} fill={color} opacity={hidden ? 0.5 : 1} />
      </svg>
      {hidden && frame >= STAR_TRIGGER_FRAME && (
        <svg
          width={22}
          height={22}
          style={{
            position: "absolute",
            left: 5,
            top: -16,
            opacity: Math.min(1, starP),
            transform: `scale(${Math.min(1, starP) * starPulse})`,
          }}
        >
          <path
            d="M11 1l2.6 5.6L19 7l-4.4 3.8L16 17l-5-3.3L6 17l1.4-6.2L3 7l5.4-0.4z"
            fill={colors.gold}
            stroke={colors.white}
            strokeWidth={0.8}
          />
        </svg>
      )}
    </div>
  );
};

export const Scene3OverBudget: React.FC = () => {
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
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start", paddingTop: 130 }}>
      <AnimatedBackground variant="light" accent={colors.blue} />
      <FloatingParticles color={colors.blue} count={10} opacity={0.2} />

      <IconChip icon="coin" label="PRESUPUESTO DILUIDO" color={colors.white} background={colors.blue} delay={0} />

      <div
        style={{
          fontFamily: fontHeavy,
          fontWeight: 700,
          fontSize: 27,
          color: "#1A1A1A",
          textAlign: "center",
          maxWidth: 560,
          marginTop: 24,
          marginBottom: 34,
          opacity: Math.min(1, headlineEntrance),
          transform: `translateY(${interpolate(Math.min(1, headlineEntrance), [0, 1], [-14, 0])}px)`,
        }}
      >
        {overBudgetHeadline}
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
          marginTop: 30,
          marginLeft: 100,
        }}
      >
        {Array.from({ length: rows * cols }).map((_, i) => (
          <PersonIcon key={i} delay={iconStart + i * 2} frame={frame} fps={fps} hidden={i === HIDDEN_WINNER_INDEX} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
