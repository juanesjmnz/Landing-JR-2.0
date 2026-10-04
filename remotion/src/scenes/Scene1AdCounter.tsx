import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../theme";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { FloatingParticles } from "../components/FloatingParticles";
import { IconChip } from "../components/IconChip";
import { RollingNumber } from "../components/RollingNumber";
import { bounceIn, punch } from "../utils/anim";

const BEATS = [
  { at: 0, value: "1", color: colors.blue, cards: "single" as const, stamp: null as "x" | "check" | null },
  { at: 54, value: "100", color: colors.blue, cards: "chaos" as const, stamp: "x" as const },
  { at: 111, value: "5-40", color: colors.green, cards: "row" as const, stamp: "check" as const },
];

const CARD_COUNT = 26;
const ROW_CARDS = 7;

const seeded = (seed: number) => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

const CARD_W = 30;
const CARD_H = 20;
const ROW_SPACING = 44;

export const Scene1AdCounter: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const beat = [...BEATS].reverse().find((b) => frame >= b.at) ?? BEATS[0];
  const sinceBeat = frame - beat.at;
  const settleProgress = Math.max(0, Math.min(1, punch(sinceBeat, fps, 2)));

  const sceneEntrance = Math.max(0, Math.min(1, bounceIn(frame, fps)));

  // Brief camera-shake jolt right as a new stamp lands.
  const shakeWindow = 10;
  const shakeT = sinceBeat >= 0 && sinceBeat < shakeWindow ? sinceBeat : -1;
  const shakeX = shakeT >= 0 ? Math.sin(shakeT * 3) * (1 - shakeT / shakeWindow) * 6 : 0;
  const shakeY = shakeT >= 0 ? Math.cos(shakeT * 4) * (1 - shakeT / shakeWindow) * 4 : 0;

  const stampProgress = Math.max(0, Math.min(1, punch(sinceBeat, fps, 5)));

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 230,
        transform: `translate(${shakeX}px, ${shakeY}px)`,
      }}
    >
      <AnimatedBackground variant="light" accent={beat.color} />
      <FloatingParticles color={beat.color} count={10} opacity={0.18} />

      <div style={{ opacity: sceneEntrance, transform: `scale(${0.85 + sceneEntrance * 0.15})` }}>
        <IconChip icon="megaphone" label="POR CONJUNTO DE ANUNCIOS" color={colors.white} background="#1A1A1A" delay={0} />
      </div>

      {/* Ad-card cloud: visually dramatizes "too few" -> "too many" -> "just right" */}
      <div style={{ position: "relative", width: 700, height: 200, marginTop: 30 }}>
        {Array.from({ length: CARD_COUNT }).map((_, i) => {
          const angle = seeded(i * 3.1) * Math.PI * 2;
          const radius = 110 + seeded(i * 7.7) * 220;
          const chaosX = Math.cos(angle) * radius;
          const chaosY = Math.sin(angle) * radius * 0.55;
          const chaosRot = (seeded(i * 11.3) - 0.5) * 70;

          const rowX = (i - (ROW_CARDS - 1) / 2) * ROW_SPACING;
          const rowVisible = i < ROW_CARDS;

          let targetX = 0;
          let targetY = 0;
          let targetRot = 0;
          let targetOpacity = 0;

          if (beat.cards === "single") {
            targetOpacity = i === 0 ? 1 : 0;
          } else if (beat.cards === "chaos") {
            targetX = chaosX;
            targetY = chaosY;
            targetRot = chaosRot;
            targetOpacity = 0.9;
          } else {
            targetX = rowVisible ? rowX : chaosX * 1.4;
            targetY = rowVisible ? 0 : chaosY * 1.4;
            targetRot = rowVisible ? 0 : chaosRot;
            targetOpacity = rowVisible ? 1 : 0;
          }

          const stagger = Math.min(1, settleProgress + i * 0.01);
          const x = interpolate(stagger, [0, 1], [0, 1]) * targetX;
          const y = targetY * stagger;
          const rot = targetRot * stagger;
          const opacity = targetOpacity * (beat.cards === "single" && i === 0 ? 1 : stagger);

          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: CARD_W,
                height: CARD_H,
                marginLeft: -CARD_W / 2,
                marginTop: -CARD_H / 2,
                borderRadius: 4,
                backgroundColor: colors.white,
                border: `2px solid ${beat.color}`,
                opacity,
                transform: `translate(${x}px, ${y}px) rotate(${rot}deg)`,
              }}
            />
          );
        })}
      </div>

      {/* Big rolling value, stamped with X (too many) or check (just right) */}
      <div style={{ position: "relative", marginTop: 20 }}>
        <RollingNumber value={beat.value} color={beat.color} fontSize={110} changedAtFrame={beat.at} />
        {beat.stamp && (
          <svg
            width={220}
            height={160}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              marginLeft: -110,
              marginTop: -80,
              transform: `translate(0,0) rotate(${beat.stamp === "x" ? -10 : -8}deg) scale(${0.6 + stampProgress * 0.4})`,
              opacity: stampProgress,
            }}
          >
            {beat.stamp === "x" ? (
              <>
                <line x1={50} y1={40} x2={170} y2={120} stroke={colors.red} strokeWidth={16} strokeLinecap="round" opacity={0.85} />
                <line x1={170} y1={40} x2={50} y2={120} stroke={colors.red} strokeWidth={16} strokeLinecap="round" opacity={0.85} />
              </>
            ) : (
              <polyline
                points="40,85 90,125 180,35"
                fill="none"
                stroke={colors.green}
                strokeWidth={18}
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity={0.85}
              />
            )}
          </svg>
        )}
      </div>
    </AbsoluteFill>
  );
};
