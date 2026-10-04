import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CaptionLine } from "../data/script";
import { ACCENTS, usePop, wordProgress } from "./Primitives";

// Spring puntual para el "pop" de la palabra activa (0 -> overshoot -> 1).
// `spring()` es una función pura de Remotion, no un hook de React, así que
// es seguro llamarla condicionalmente por palabra.
const wordPop = (localFrame: number, fps: number) =>
  spring({
    frame: Math.max(0, localFrame),
    fps,
    config: { damping: 9, stiffness: 300, mass: 0.4 },
  });

export const Captions: React.FC<{
  lines: CaptionLine[];
  shotStart: number;
}> = ({ lines, shotStart }) => {
  const frame = useCurrentFrame(); // relativo al shot
  const { fps } = useVideoConfig();
  const tAbs = shotStart + frame / fps; // segundos absolutos del video completo

  const active =
    [...lines].reverse().find((l) => tAbs >= l.start) ?? lines[0];
  const words = active.text.split(" ");
  const revealed = wordProgress(tAbs, active.start, active.end, words.length);

  // Frames desde que ESTA línea se volvió activa (para el "punch" al cambiar de línea).
  const lineLocalFrame = Math.max(
    0,
    frame - Math.round((active.start - shotStart) * fps)
  );
  const punch = usePop(lineLocalFrame, { stiffness: 260, damping: 13, mass: 0.5 });
  const chipScale = interpolate(punch, [0, 1], [0.82, 1]);
  const shake = Math.sin(lineLocalFrame / 2) * Math.max(0, 4 - lineLocalFrame);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 300,
        left: 90,
        right: 90,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          border: "3px solid #111",
          borderRadius: 16,
          padding: "14px 22px",
          maxWidth: 860,
          textAlign: "center",
          boxShadow: "6px 6px 0px 0px rgba(17,17,17,1)",
          transform: `scale(${chipScale}) translateX(${shake}px)`,
        }}
      >
        <span
          style={{
            fontFamily: "Archivo Black",
            fontSize: 30,
            lineHeight: 1.22,
            color: "#111",
          }}
        >
          {words.map((w, i) => {
            if (i >= revealed) return null;
            const isCurrent = i === revealed - 1;
            // frame local al momento en que ESTA palabra se reveló
            const wordRevealT = interpolate(
              i + 1,
              [0, words.length],
              [active.start, active.end]
            );
            const wordLocalFrame = Math.round(
              (tAbs - wordRevealT) * fps + (fps * 0.001)
            );
            const pop = isCurrent ? wordPop(wordLocalFrame, fps) : 1;
            const scale = interpolate(pop, [0, 1], [1.5, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const rot = isCurrent ? (i % 2 === 0 ? -3 : 3) : 0;
            const color = ACCENTS[i % ACCENTS.length];
            return (
              <span key={i}>
                <span
                  style={{
                    display: "inline-block",
                    background: isCurrent ? color : "transparent",
                    boxDecorationBreak: "clone",
                    WebkitBoxDecorationBreak: "clone",
                    padding: isCurrent ? "2px 6px" : undefined,
                    borderRadius: 4,
                    transform: isCurrent
                      ? `scale(${scale}) rotate(${rot}deg)`
                      : undefined,
                  }}
                >
                  {w}
                </span>{" "}
              </span>
            );
          })}
        </span>
      </div>
    </div>
  );
};
