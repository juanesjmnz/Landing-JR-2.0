import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../theme";
import { fontHeavy } from "../fonts";
import { ALL_CAPTIONS } from "../script";
import { punch } from "../utils/anim";

/**
 * Global, screen-centered "viral captions" overlay: the full line is always
 * visible, and a colored pill highlight sweeps word-by-word across it in
 * sync with the narration — the CapCut/Reels auto-caption look. Renders on
 * top of every scene so caption position/size never shifts between acts.
 */
export const CaptionLayer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const active = ALL_CAPTIONS.find((c) => frame >= c.start && frame < c.start + c.duration);
  if (!active) return null;

  const rel = frame - active.start;
  const words = active.text.split(" ");
  const activeWordIndex = Math.min(
    words.length - 1,
    Math.floor((rel / Math.max(active.duration, 1)) * words.length)
  );

  const entrance = punch(rel, fps);
  const lineScale = interpolate(entrance, [0, 1], [0.9, 1]);
  const lineOpacity = interpolate(rel, [0, 5], [0, 1], { extrapolateRight: "clamp" });

  const baseColor = active.theme === "dark" ? colors.white : colors.textDark;
  const textShadow =
    active.theme === "dark" ? "0 3px 20px rgba(0,0,0,0.65)" : "0 3px 16px rgba(0,0,0,0.18)";

  return (
    <AbsoluteFill
      style={{
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          transform: `scale(${lineScale})`,
          opacity: lineOpacity,
          maxWidth: 920,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignContent: "center",
          gap: "6px 14px",
          fontFamily: fontHeavy,
          fontWeight: 800,
          fontSize: 58,
          lineHeight: 1.18,
          textAlign: "center",
          textShadow,
        }}
      >
        {words.map((word, i) => {
          const isActive = i === activeWordIndex;
          const wordPunch = isActive ? punch(rel, fps, (i / words.length) * active.duration) : 0;
          const wordScale = isActive ? interpolate(wordPunch, [0, 1], [0.85, 1]) : 1;
          return (
            <span
              key={`${word}-${i}`}
              style={{
                display: "inline-block",
                transform: `scale(${wordScale})`,
                color: isActive ? colors.highlightText : baseColor,
                backgroundColor: isActive ? colors.highlight : "transparent",
                borderRadius: isActive ? 10 : 0,
                padding: isActive ? "2px 12px" : "2px 0",
                boxShadow: isActive ? "0 4px 18px rgba(212,255,63,0.45)" : "none",
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
