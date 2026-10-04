import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../theme";
import { fontHeavy } from "../fonts";
import { SCENE_SEGMENTS, getThemeAtFrame } from "../script";

const formatTime = (frames: number, fps: number) => {
  const totalSeconds = Math.max(0, frames / fps);
  const s = Math.floor(totalSeconds);
  const ms = Math.floor((totalSeconds - s) * 10);
  return `0:${s.toString().padStart(2, "0")}.${ms}`;
};

/**
 * IG-Stories-style segmented progress bar (one segment per scene/chapter) at
 * the top of the frame, plus a live "time remaining" readout — gives the
 * viewer a constant, native-feeling sense of pacing through the reel.
 */
export const TimelineBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps, width } = useVideoConfig();

  const gap = 6;
  const sidePad = 16;
  const trackWidth = width - sidePad * 2;
  const segCount = SCENE_SEGMENTS.length;
  const segWidth = (trackWidth - gap * (segCount - 1)) / segCount;

  const remaining = Math.max(0, durationInFrames - frame);
  const theme = getThemeAtFrame(frame);
  const timeColor = theme === "dark" ? "rgba(255,255,255,0.75)" : "rgba(60,60,70,0.85)";

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          top: 28,
          left: sidePad,
          right: sidePad,
          display: "flex",
          gap,
        }}
      >
        {SCENE_SEGMENTS.map(({ start, end }, i) => {
          const segProgress = Math.max(0, Math.min(1, (frame - start) / (end - start)));
          return (
            <div
              key={i}
              style={{
                position: "relative",
                width: segWidth,
                height: 5,
                borderRadius: 3,
                backgroundColor: "rgba(120,120,130,0.35)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: `${segProgress * 100}%`,
                  backgroundColor: colors.highlight,
                  borderRadius: 3,
                  boxShadow: "0 0 8px rgba(212,255,63,0.7)",
                }}
              />
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: "absolute",
          top: 44,
          right: sidePad,
          fontFamily: fontHeavy,
          fontWeight: 700,
          fontSize: 20,
          color: timeColor,
          textShadow: "0 1px 6px rgba(0,0,0,0.25)",
        }}
      >
        -{formatTime(remaining, fps)}
      </div>
    </AbsoluteFill>
  );
};
