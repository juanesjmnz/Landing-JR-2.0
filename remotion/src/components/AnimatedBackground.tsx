import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { breathe } from "../utils/anim";

interface AnimatedBackgroundProps {
  variant?: "light" | "dark";
  accent?: string;
}

/** Soft, slowly-breathing gradient blobs behind scene content — keeps flat
 * backgrounds from feeling static without competing with the foreground. */
export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  variant = "light",
  accent = "#8FD3C4",
}) => {
  const frame = useCurrentFrame();
  const b1 = breathe(frame, 160, 1);
  const b2 = breathe(frame + 40, 190, 1);

  const base = variant === "light" ? "#F5F0F3" : "#0B0E14";
  const blobOpacity = variant === "light" ? 0.28 : 0.35;

  return (
    // zIndex:-1 is load-bearing: AbsoluteFill is `position:absolute`, which
    // paints *after* plain in-flow siblings per CSS stacking rules — without
    // a negative z-index this opaque layer silently covers any sibling that
    // doesn't itself set `position` or `transform` (scene content with no
    // motion applied yet, e.g. before its own entrance spring kicks in).
    <AbsoluteFill style={{ backgroundColor: base, overflow: "hidden", zIndex: -1 }}>
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          left: -250 + b1 * 30,
          top: -300 + b1 * 20,
          background: `radial-gradient(circle, ${accent} 0%, transparent 65%)`,
          opacity: blobOpacity,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          right: -220 + b2 * 25,
          bottom: -260 + b2 * 20,
          background: `radial-gradient(circle, ${accent} 0%, transparent 65%)`,
          opacity: blobOpacity * 0.8,
        }}
      />
    </AbsoluteFill>
  );
};
