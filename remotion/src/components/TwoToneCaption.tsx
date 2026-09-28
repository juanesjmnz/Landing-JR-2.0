import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../theme";
import { fontHeavy } from "../fonts";

interface TwoToneCaptionProps {
  text: string;
  startFrame: number;
  durationInFrames: number;
  fontSize?: number;
  darkColor?: string;
  lightColor?: string;
  align?: "center" | "left";
  maxWidth?: number;
}

/**
 * Word-by-word "karaoke" caption: words already spoken render bold/dark,
 * the rest render light gray until their turn comes. Mirrors the reveal
 * style used for every subtitle line in the source reel.
 */
export const TwoToneCaption: React.FC<TwoToneCaptionProps> = ({
  text,
  startFrame,
  durationInFrames,
  fontSize = 48,
  darkColor = colors.textDark,
  lightColor = colors.textMuted,
  align = "center",
  maxWidth = 640,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");
  const relativeFrame = frame - startFrame;

  if (relativeFrame < 0) return null;

  const revealWindow = Math.max(durationInFrames * 0.85, 1);

  return (
    <div
      style={{
        maxWidth,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: align === "center" ? "center" : "flex-start",
        gap: "0 0.4em",
        fontFamily: fontHeavy,
        fontWeight: 800,
        fontSize,
        lineHeight: 1.15,
        textAlign: align,
      }}
    >
      {words.map((word, i) => {
        const wordStart = (i / words.length) * revealWindow;
        const wordPop = interpolate(
          relativeFrame,
          [wordStart, wordStart + fps * 0.15],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
        );
        const isRevealed = relativeFrame >= wordStart;
        return (
          <span
            key={`${word}-${i}`}
            style={{
              color: isRevealed ? darkColor : lightColor,
              opacity: interpolate(wordPop, [0, 1], [0.4, 1]),
              transform: `translateY(${interpolate(wordPop, [0, 1], [8, 0])}px)`,
              display: "inline-block",
              transition: "color 0.1s linear",
            }}
          >
            {word}
          </span>
        );
      })}
    </div>
  );
};
