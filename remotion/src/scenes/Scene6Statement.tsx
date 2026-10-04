import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../theme";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { BounceWord } from "../components/BounceWord";
import { bounceIn, breathe } from "../utils/anim";
import { statementLines } from "../script";

const FIRST_WORDS = ["UN", "CONJUNTO", "DE", "ANUNCIOS", "ES", "UNA", "PRUEBA", "CONTROLADA"];
const SECOND_WORDS: Array<{ text: string; color: string }> = [
  { text: "NO", color: colors.maroon },
  { text: "ES", color: "#1A1A1A" },
  { text: "UN", color: "#1A1A1A" },
  { text: "LUGAR", color: "#1A1A1A" },
  { text: "PARA", color: "#1A1A1A" },
  { text: "SOLTAR", color: "#1A1A1A" },
  { text: "5.000", color: colors.green },
  { text: "ANUNCIOS", color: colors.green },
];

export const Scene6Statement: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cut = statementLines.firstDuration;

  const firstExit = interpolate(frame, [cut - 8, cut + 2], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const firstScaleOut = interpolate(frame, [cut - 8, cut + 2], [1, 1.15], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const showSecond = frame >= cut;
  const emphasisPulse = 1 + breathe(frame, 26, 0.04);

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <AnimatedBackground variant="light" accent={colors.maroon} />

      {!showSecond && (
        <div
          style={{
            position: "absolute",
            opacity: firstExit,
            transform: `scale(${firstScaleOut})`,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0 14px",
            maxWidth: 760,
            textAlign: "center",
          }}
        >
          {FIRST_WORDS.map((w, i) => (
            <BounceWord key={w + i} text={w} color="#1A1A1A" delay={i * 3} fontSize={48} />
          ))}
        </div>
      )}

      {showSecond && (
        <div
          style={{
            position: "absolute",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0 14px",
            maxWidth: 760,
            textAlign: "center",
          }}
        >
          {SECOND_WORDS.map((w, i) => {
            const isEmphasis = w.color === colors.green;
            return (
              <span key={w.text + i} style={{ transform: isEmphasis ? `scale(${emphasisPulse})` : undefined, display: "inline-block" }}>
                <BounceWord text={w.text} color={w.color} delay={cut + i * 3} fontSize={48} />
              </span>
            );
          })}
        </div>
      )}
    </AbsoluteFill>
  );
};
