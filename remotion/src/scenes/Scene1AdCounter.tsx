import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../theme";
import { fontHeavy } from "../fonts";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { FloatingParticles } from "../components/FloatingParticles";
import { IconChip } from "../components/IconChip";
import { RollingNumber } from "../components/RollingNumber";
import { BounceWord } from "../components/BounceWord";
import { bounceIn, breathe, punch } from "../utils/anim";

// The opening question ("¿Cuántos anuncios necesitas...?") gets its own
// animated hook title instead of a number — the actual count only appears
// once the voiceover starts answering ("Ni 1, ni 50...").
const HOOK_END = 94;
const HOOK_TITLE = ["¿CUÁNTOS", "ANUNCIOS?"];

// Beat frames line up with the voiceover actually saying "1", "50" and "5 a 25".
const BEATS = [
  { at: 96, value: "1", color: colors.blue, cards: "single" as const, stamp: "x" as const },
  { at: 117, value: "50", color: colors.blue, cards: "chaos" as const, stamp: "x" as const },
  { at: 142, value: "5-25", color: colors.green, cards: "row" as const, stamp: "check" as const },
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

  // Hook title entrance/exit — swaps out for the number sequence right as
  // the voiceover starts answering its own question.
  const hookEntrance = Math.max(0, Math.min(1, bounceIn(frame, fps, 4)));
  const hookQMarkPulse = 1 + breathe(frame, 40, 0.07);
  const hookQMarkWiggle = Math.sin(frame / 14) * 4;
  const hookExit = interpolate(frame, [HOOK_END - 10, HOOK_END], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const hookExitScale = interpolate(frame, [HOOK_END - 10, HOOK_END], [1, 1.12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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

      {/* Opening hook: a pulsing "?" with orbiting ghost ad-cards, standing in
          for the question being asked before any number is revealed. */}
      {frame < HOOK_END && (
        <div
          style={{
            position: "relative",
            width: 500,
            height: 420,
            marginTop: 10,
            opacity: hookExit,
            transform: `scale(${hookExitScale})`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {Array.from({ length: 4 }).map((_, i) => {
            const angle = frame / 55 + (i * Math.PI) / 2;
            const r = 150;
            const ox = Math.cos(angle) * r;
            const oy = Math.sin(angle) * r * 0.55;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "44%",
                  width: CARD_W,
                  height: CARD_H,
                  marginLeft: -CARD_W / 2,
                  marginTop: -CARD_H / 2,
                  borderRadius: 5,
                  border: `3px solid ${colors.blue}`,
                  backgroundColor: "rgba(255,255,255,0.6)",
                  opacity: Math.min(1, hookEntrance) * 0.5,
                  transform: `translate(${ox}px, ${oy}px) rotate(${(angle * 180) / Math.PI}deg)`,
                }}
              />
            );
          })}

          <div
            style={{
              position: "absolute",
              width: 220,
              height: 220,
              borderRadius: "50%",
              border: `4px solid ${colors.blue}`,
              opacity: 0.18 + breathe(frame, 40, 0.12),
              transform: `scale(${hookQMarkPulse})`,
            }}
          />

          <div
            style={{
              position: "relative",
              fontFamily: fontHeavy,
              fontWeight: 800,
              fontSize: 170,
              lineHeight: 1,
              color: colors.blue,
              opacity: Math.min(1, hookEntrance),
              transform: `scale(${Math.max(0, hookEntrance) * hookQMarkPulse}) rotate(${hookQMarkWiggle}deg)`,
            }}
          >
            ?
          </div>

          <div
            style={{
              position: "relative",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "0 14px",
              marginTop: 8,
              textAlign: "center",
            }}
          >
            {HOOK_TITLE.map((w, i) => (
              <BounceWord key={w} text={w} color="#1A1A1A" delay={10 + i * 6} fontSize={46} />
            ))}
          </div>
        </div>
      )}

      {/* Ad-card cloud: visually dramatizes "too few" -> "too many" -> "just right" */}
      {frame >= HOOK_END && (
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
                transform: `translate(${x}px, ${y}px) rotate(${rot}deg)`,
              }}
            />
          );
        })}
      </div>
      )}

      {/* Big rolling value, stamped with X (too many) or check (just right) */}
      {frame >= HOOK_END && (
      <div style={{ position: "relative", marginTop: 24 }}>
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
      )}
    </AbsoluteFill>
  );
};
