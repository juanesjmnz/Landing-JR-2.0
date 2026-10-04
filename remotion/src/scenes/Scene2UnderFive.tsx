import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../theme";
import { fontHand } from "../fonts";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { bounceIn, wiggle } from "../utils/anim";

export const Scene2UnderFive: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const barGrow = bounceIn(frame, fps);
  const barWidth = interpolate(barGrow, [0, 1], [0, 300], { extrapolateRight: "clamp" });

  const iconsEntrance = bounceIn(frame, fps, 55);
  const iconsScale = Math.max(0, iconsEntrance);
  const iconsOpacity = interpolate(frame, [52, 68], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const shake = frame >= 55 ? wiggle(frame, 14, 4) : 0;

  const ringPulse = frame >= 55 ? 1 + Math.abs(Math.sin((frame - 55) / 10)) * 0.25 : 1;
  const ringOpacity = frame >= 55 ? interpolate(Math.sin((frame - 55) / 10), [-1, 1], [0.1, 0.4]) : 0;

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start", paddingTop: 300 }}>
      <AnimatedBackground variant="light" accent={colors.green} />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <div style={{ width: 4, height: 120, backgroundColor: "#1A1A1A" }} />
          <div style={{ width: 4, height: 4, borderRadius: 4, backgroundColor: "#1A1A1A", marginLeft: -4, marginBottom: 116 }} />
          <div
            style={{
              width: barWidth,
              height: 60,
              backgroundColor: colors.green,
              boxShadow: "0 8px 22px rgba(30,122,30,0.35)",
              borderRadius: "0 6px 6px 0",
            }}
          />
        </div>
        <div style={{ fontFamily: fontHand, fontSize: 48, color: "#1A1A1A", marginTop: 14 }}>5 a 40</div>

        <div style={{ position: "relative", marginTop: 56, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              position: "absolute",
              width: 120,
              height: 120,
              top: -45,
              borderRadius: "50%",
              border: `3px solid ${colors.red}`,
              opacity: ringOpacity,
              transform: `scale(${ringPulse})`,
            }}
          />
          <div
            style={{
              opacity: iconsOpacity,
              transform: `scale(${iconsScale}) rotate(${shake}deg)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ width: 30, height: 30, backgroundColor: colors.red, borderRadius: 4 }} />
              <div style={{ width: 30, height: 30, backgroundColor: colors.red, borderRadius: 4 }} />
            </div>
            <svg width={150} height={32}>
              <path d="M0,16 Q18,0 37,16 T74,16 T111,16 T150,16" stroke={colors.red} strokeWidth={5} fill="none" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
