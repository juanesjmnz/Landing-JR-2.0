import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors } from "../theme";
import { fontHeavy } from "../fonts";
import { TwoToneCaption } from "../components/TwoToneCaption";
import { countdownLines, SCENE_DURATIONS } from "../script";

const BAR_COLORS = [colors.gold, colors.gray, colors.orange, colors.darkGray, colors.darkGray];
const BAR_MAX_WIDTH = [340, 300, 260, 220, 190];

export const Scene5Countdown: React.FC = () => {
  const frame = useCurrentFrame();
  const total = SCENE_DURATIONS.countdown;

  const daysLeft = Math.max(0, 10 - Math.floor(interpolate(frame, [0, total], [0, 10], { extrapolateRight: "clamp" })));
  const progress = interpolate(frame, [0, total], [0, 1], { extrapolateRight: "clamp" });
  const circumference = 2 * Math.PI * 46;

  const top3Opacity = interpolate(frame, [90, 105], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bgDark,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ position: "relative", width: 130, height: 130, marginBottom: 50 }}>
        <svg width={130} height={130} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={65} cy={65} r={46} stroke="#2A2E38" strokeWidth={6} fill="none" />
          <circle
            cx={65}
            cy={65}
            r={46}
            stroke={colors.blue}
            strokeWidth={6}
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
          <div style={{ fontSize: 34, fontWeight: 800 }}>{daysLeft}</div>
          <div style={{ fontSize: 12, letterSpacing: 1, color: "#9AA0A6" }}>DÍAS</div>
        </div>
      </div>

      <div style={{ opacity: top3Opacity, color: colors.gold, fontFamily: fontHeavy, fontWeight: 700, fontSize: 16, marginBottom: 8 }}>
        TOP 3
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {BAR_COLORS.map((color, i) => {
          const growStart = i * 15;
          const width = interpolate(frame, [growStart, growStart + 40], [0, BAR_MAX_WIDTH[i]], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 22, color: colors.white, fontFamily: fontHeavy, fontSize: 13 }}>#{i + 1}</div>
              <div style={{ width: width, height: 22, backgroundColor: color, borderRadius: 3 }} />
            </div>
          );
        })}
      </div>

      <div style={{ height: 140, marginTop: 60, display: "flex", alignItems: "flex-start" }}>
        {countdownLines.map((line, i) => (
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
              fontSize={40}
              darkColor={colors.white}
              lightColor="#5A6270"
            />
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
