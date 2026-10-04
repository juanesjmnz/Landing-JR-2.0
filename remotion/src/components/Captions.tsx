import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { CaptionLine } from "../data/script";
import { SPEAKER_STYLE, usePop, wordProgress } from "./Primitives";

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
  const style = SPEAKER_STYLE[active.speaker];

  // Frames desde que ESTA línea se volvió activa: una entrada simple y
  // breve (sin rotación ni rebote exagerado) para que se note el cambio
  // de línea sin distraer de la lectura.
  const lineLocalFrame = Math.max(
    0,
    frame - Math.round((active.start - shotStart) * fps)
  );
  const pop = usePop(lineLocalFrame, { stiffness: 240, damping: 20, mass: 0.6 });
  const chipScale = interpolate(pop, [0, 1], [0.96, 1]);
  const chipOpacity = interpolate(pop, [0, 1], [0, 1]);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 290,
        left: 90,
        right: 90,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: style.accent,
          color: "#fff",
          fontFamily: "Archivo Black",
          fontSize: 15,
          letterSpacing: 1,
          padding: "5px 16px",
          borderRadius: 999,
          marginBottom: 8,
          transform: `scale(${chipScale})`,
          opacity: chipOpacity,
        }}
      >
        {style.label}
      </div>
      <div
        style={{
          background: "#fff",
          border: `3px solid ${style.accent}`,
          borderRadius: 16,
          padding: "14px 24px",
          maxWidth: 860,
          textAlign: "center",
          boxShadow: `5px 5px 0px 0px ${style.accent}`,
          transform: `scale(${chipScale})`,
        }}
      >
        <span
          style={{
            fontFamily: "Archivo Black",
            fontSize: 30,
            lineHeight: 1.25,
            color: "#111",
          }}
        >
          {words.map((w, i) => {
            if (i >= revealed) return null;
            const isCurrent = i === revealed - 1;
            return (
              <span key={i}>
                <span
                  style={{
                    background: isCurrent ? style.tint : "transparent",
                    borderBottom: isCurrent
                      ? `4px solid ${style.accent}`
                      : "4px solid transparent",
                    boxDecorationBreak: "clone",
                    WebkitBoxDecorationBreak: "clone",
                    padding: "1px 3px",
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
