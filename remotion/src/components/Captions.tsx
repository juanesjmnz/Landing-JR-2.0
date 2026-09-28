import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { CaptionLine } from "../data/script";
import { wordProgress } from "./Primitives";

export const Captions: React.FC<{
  lines: CaptionLine[];
  shotStart: number;
}> = ({ lines }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  const active = lines.find((l) => t >= l.start && t < l.end) ?? lines[lines.length - 1];
  const words = active.text.split(" ");
  const revealed = wordProgress(frame, fps, active.start, active.end, words.length);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 210,
        left: 40,
        right: 40,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          border: "3px solid #111",
          borderRadius: 16,
          padding: "18px 26px",
          maxWidth: 880,
          textAlign: "center",
          boxShadow: "6px 6px 0px 0px rgba(17,17,17,1)",
        }}
      >
        <span
          style={{
            fontFamily: "Archivo Black",
            fontSize: 34,
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
                    background: isCurrent ? "#F5C242" : "transparent",
                    boxDecorationBreak: "clone",
                    WebkitBoxDecorationBreak: "clone",
                    padding: isCurrent ? "2px 4px" : undefined,
                    borderRadius: 4,
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
