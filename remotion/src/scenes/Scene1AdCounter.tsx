import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../theme";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { FloatingParticles } from "../components/FloatingParticles";
import { IconChip } from "../components/IconChip";
import { RollingNumber } from "../components/RollingNumber";
import { bounceIn, breathe, punch } from "../utils/anim";

// Beat frames line up with the voiceover actually saying "50" and "5 a 25".
const BEATS = [
  { at: 0, value: "1", color: colors.blue, cards: "single" as const, stamp: null as "x" | "check" | null },
  { at: 121, value: "50", color: colors.blue, cards: "chaos" as const, stamp: "x" as const },
  { at: 170, value: "5-25", color: colors.green, cards: "row" as const, stamp: "check" as const },
];

const CARD_COUNT = 26;
const ROW_CARDS = 7;

const seeded = (seed: number) => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

const CARD_W = 38;
const CARD_H = 26;
const ROW_SPACING = 54;

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

  // The "1" sits on screen alone for ~4s while the opening question is being
  // asked — give it a continuous idle pulse + waiting ring so it reads as
  // "thinking about the answer" instead of a frozen frame.
  const isWaiting = beat.cards === "single";
  const idlePulse = isWaiting ? 1 + breathe(frame, 36, 0.06) : 1;
  const waitRingScale = isWaiting ? 1 + breathe(frame, 36, 0.1) : 1;
  const waitRingOpacity = isWaiting ? 0.25 + breathe(frame, 36, 0.15) : 0;

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 160,
        transform: `translate(${shakeX}px, ${shakeY}px)`,
      }}
    >
      <AnimatedBackground variant="light" accent={beat.color} />
      <FloatingParticles color={beat.color} count={10} opacity={0.18} />

      <div style={{ opacity: sceneEntrance, transform: `scale(${0.9 + sceneEntrance * 0.2})` }}>
        <IconChip icon="megaphone" label="POR CONJUNTO DE ANUNCIOS" color={colors.white} background="#1A1A1A" delay={0} fontSize={18} />
      </div>

      {/* Ad-card cloud: visually dramatizes "too few" -> "too many" -> "just right" */}
      <div style={{ position: "relative", width: 780, height: 240, marginTop: 36 }}>
        {Array.from({ length: CARD_COUNT }).map((_, i) => {
          const angle = seeded(i * 3.1) * Math.PI * 2;
          const radius = 120 + seeded(i * 7.7) * 250;
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
          const cardScale = beat.cards === "single" && i === 0 ? idlePulse : 1;

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
                borderRadius: 5,
                backgroundColor: colors.white,
                border: `3px solid ${beat.color}`,
                opacity,
                transform: `translate(${x}px, ${y}px) rotate(${rot}deg) scale(${cardScale})`,
              }}
            />
          );
        })}
      </div>

      {/* Big rolling value, stamped with X (too many) or check (just right) */}
      <div style={{ position: "relative", marginTop: 24, transform: `scale(${idlePulse})` }}>
        {isWaiting && (
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: 230,
              height: 230,
              marginLeft: -115,
              marginTop: -115,
              borderRadius: "50%",
              border: `3px solid ${beat.color}`,
              opacity: waitRingOpacity,
              transform: `scale(${waitRingScale})`,
            }}
          />
        )}
        <RollingNumber value={beat.value} color={beat.color} fontSize={150} changedAtFrame={beat.at} />
        {beat.stamp && (
          <svg
            width={260}
            height={190}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              marginLeft: -130,
              marginTop: -95,
              transform: `translate(0,0) rotate(${beat.stamp === "x" ? -10 : -8}deg) scale(${0.6 + stampProgress * 0.4})`,
              opacity: stampProgress,
            }}
          >
            {beat.stamp === "x" ? (
              <>
                <line x1={60} y1={48} x2={200} y2={142} stroke={colors.red} strokeWidth={19} strokeLinecap="round" opacity={0.85} />
                <line x1={200} y1={48} x2={60} y2={142} stroke={colors.red} strokeWidth={19} strokeLinecap="round" opacity={0.85} />
              </>
            ) : (
              <polyline
                points="48,100 106,148 212,42"
                fill="none"
                stroke={colors.green}
                strokeWidth={21}
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
