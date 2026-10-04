import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../theme";
import { fontHeavy } from "../fonts";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { FloatingParticles } from "../components/FloatingParticles";
import { IconChip } from "../components/IconChip";
import { RollingNumber } from "../components/RollingNumber";
import { bounceIn, punch } from "../utils/anim";
import { SCENE_DURATIONS } from "../script";

const BAR_COLORS = [colors.gold, colors.gray, colors.orange, colors.darkGray, colors.darkGray];
const BAR_MAX_WIDTH = [360, 320, 280, 230, 200];

export const Scene5Countdown: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const total = SCENE_DURATIONS.countdown;

  const rawDays = interpolate(frame, [0, total], [0, 10], { extrapolateRight: "clamp" });
  const daysLeft = Math.max(0, 10 - Math.floor(rawDays));
  const sinceTick = frame - Math.floor(rawDays) * (total / 10);
  const tickPunch = punch(sinceTick, fps);
  const ringScale = 1 + Math.max(0, 1 - Math.min(1, tickPunch)) * 0.18;

  const progress = interpolate(frame, [0, total], [0, 1], { extrapolateRight: "clamp" });
  const circumference = 2 * Math.PI * 48;

  const top3Entrance = Math.max(0, bounceIn(frame, fps, 90));
  const ringEntrance = Math.max(0, Math.min(1, bounceIn(frame, fps)));

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start", paddingTop: 150 }}>
      <AnimatedBackground variant="dark" accent={colors.blue} />
      <FloatingParticles color={colors.gold} count={10} opacity={0.2} />

      <IconChip icon="clock" label="CUENTA REGRESIVA" color={colors.bgDark} background={colors.highlight} delay={0} />

      <div
        style={{
          position: "relative",
          width: 140,
          height: 140,
          marginTop: 36,
          marginBottom: 54,
          transform: `scale(${ringEntrance * ringScale})`,
        }}
      >
        <svg width={140} height={140} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={70} cy={70} r={48} stroke="#2A2E38" strokeWidth={7} fill="none" />
          <circle
            cx={70}
            cy={70}
            r={48}
            stroke={colors.highlight}
            strokeWidth={7}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * progress}
            strokeLinecap="round"
          />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: colors.white,
            fontFamily: fontHeavy,
          }}
        >
          <RollingNumber value={String(daysLeft)} color={colors.white} fontSize={38} changedAtFrame={frame - sinceTick} />
          <div style={{ fontSize: 13, letterSpacing: 1, color: "#9AA0A6" }}>DÍAS</div>
        </div>
      </div>

      <div
        style={{
          position: "relative",
          opacity: Math.min(1, top3Entrance),
          transform: `scale(${0.6 + Math.min(1.1, top3Entrance) * 0.4})`,
          color: colors.gold,
          fontFamily: fontHeavy,
          fontWeight: 800,
          fontSize: 18,
          marginBottom: 10,
          letterSpacing: 1,
        }}
      >
        TOP 3
      </div>

      <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 10 }}>
        {BAR_COLORS.map((color, i) => {
          const growStart = i * 15;
          const growth = Math.max(0, Math.min(1, bounceIn(frame, fps, growStart)));
          const width = growth * BAR_MAX_WIDTH[i];
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 24, color: colors.white, fontFamily: fontHeavy, fontWeight: 800, fontSize: 14 }}>#{i + 1}</div>
              <div
                style={{
                  width,
                  height: 24,
                  backgroundColor: color,
                  borderRadius: 4,
                  boxShadow: i < 3 ? `0 0 14px ${color}99` : "none",
                }}
              />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
