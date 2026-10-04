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
const BIAS_TRIGGER = 266;
// One ad hogging the budget: heights are deliberately lopsided.
const BIAS_BAR_HEIGHTS = [18, 26, 98, 20];

export const Scene2UnderFive: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const barGrow = bounceIn(frame, fps);
  const barWidth = interpolate(barGrow, [0, 1], [0, 360], { extrapolateRight: "clamp" });

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
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start", paddingTop: 170 }}>
      <AnimatedBackground variant="light" accent={colors.green} />
      <FloatingParticles color={colors.red} count={10} opacity={0.2} />

      <IconChip icon="clock" label="BAJO EL MÍNIMO" color={colors.white} background={colors.red} delay={0} />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 50 }}>
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <div style={{ width: 5, height: 144, backgroundColor: "#1A1A1A" }} />
          <div style={{ width: 5, height: 5, borderRadius: 5, backgroundColor: "#1A1A1A", marginLeft: -5, marginBottom: 139 }} />
          <div
            style={{
              width: barWidth,
              height: 74,
              backgroundColor: colors.green,
              boxShadow: "0 8px 22px rgba(30,122,30,0.35)",
              borderRadius: "0 7px 7px 0",
            }}
          />
        </div>
        <div style={{ fontFamily: fontHand, fontSize: 58, color: "#1A1A1A", marginTop: 16 }}>5 a 25</div>

        <div style={{ position: "relative", marginTop: 64, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{
              position: "absolute",
              width: 144,
              height: 144,
              top: -54,
              borderRadius: "50%",
              border: `4px solid ${colors.red}`,
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
              gap: 12,
            }}
          >
            <div style={{ display: "flex", gap: 14 }}>
              <div style={{ width: 36, height: 36, backgroundColor: colors.red, borderRadius: 5 }} />
              <div style={{ width: 36, height: 36, backgroundColor: colors.red, borderRadius: 5 }} />
            </div>
            <svg width={180} height={38}>
              <path d="M0,19 Q22,0 44,19 T88,19 T132,19 T180,19" stroke={colors.red} strokeWidth={6} fill="none" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* One ad eating the whole budget: reinforces "un solo anuncio puede
            llevar mucha inversión y generar sesgo" right as it's said. */}
        <div style={{ position: "relative", display: "flex", alignItems: "flex-end", gap: 10, height: 110, marginTop: 38 }}>
          {BIAS_BAR_HEIGHTS.map((h, i) => {
            const isHog = i === 2;
            const growth = Math.max(0, Math.min(1, bounceIn(frame, fps, BIAS_TRIGGER + i * 4)));
            return (
              <div
                key={i}
                style={{
                  width: 25,
                  height: h * growth,
                  backgroundColor: isHog ? colors.red : colors.gray,
                  borderRadius: 4,
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
