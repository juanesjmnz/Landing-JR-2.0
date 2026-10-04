import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../theme";
import { fontHand } from "../fonts";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { FloatingParticles } from "../components/FloatingParticles";
import { IconChip } from "../components/IconChip";
import { bounceIn, wiggle } from "../utils/anim";

const ICONS_TRIGGER = 90;
// Lines up with the voiceover reaching "mucha inversión ... y generar sesgo."
const BIAS_TRIGGER = 258;
// One ad hogging the budget: heights are deliberately lopsided.
const BIAS_BAR_HEIGHTS = [14, 20, 78, 16];

export const Scene2UnderFive: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const barGrow = bounceIn(frame, fps);
  const barWidth = interpolate(barGrow, [0, 1], [0, 300], { extrapolateRight: "clamp" });

  const iconsEntrance = bounceIn(frame, fps, ICONS_TRIGGER);
  const iconsScale = Math.max(0, iconsEntrance);
  const iconsOpacity = interpolate(frame, [ICONS_TRIGGER - 3, ICONS_TRIGGER + 13], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const shake = frame >= ICONS_TRIGGER ? wiggle(frame, 14, 4) : 0;

  const ringPulse = frame >= ICONS_TRIGGER ? 1 + Math.abs(Math.sin((frame - ICONS_TRIGGER) / 10)) * 0.25 : 1;
  const ringOpacity =
    frame >= ICONS_TRIGGER ? interpolate(Math.sin((frame - ICONS_TRIGGER) / 10), [-1, 1], [0.1, 0.4]) : 0;

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start", paddingTop: 230 }}>
      <AnimatedBackground variant="light" accent={colors.green} />
      <FloatingParticles color={colors.red} count={10} opacity={0.2} />

      <IconChip icon="clock" label="BAJO EL MÍNIMO" color={colors.white} background={colors.red} delay={0} />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 46 }}>
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
        <div style={{ fontFamily: fontHand, fontSize: 48, color: "#1A1A1A", marginTop: 14 }}>5 a 25</div>

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

        {/* One ad eating the whole budget: reinforces "un solo anuncio puede
            llevar mucha inversión y generar sesgo" right as it's said. */}
        <div style={{ position: "relative", display: "flex", alignItems: "flex-end", gap: 8, height: 90, marginTop: 34 }}>
          {BIAS_BAR_HEIGHTS.map((h, i) => {
            const isHog = i === 2;
            const growth = Math.max(0, Math.min(1, bounceIn(frame, fps, BIAS_TRIGGER + i * 4)));
            return (
              <div
                key={i}
                style={{
                  width: 20,
                  height: h * growth,
                  backgroundColor: isHog ? colors.red : colors.gray,
                  borderRadius: 3,
                  boxShadow: isHog ? `0 0 14px ${colors.red}99` : "none",
                }}
              />
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
