import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors } from "../theme";
import { fontHeavy } from "../fonts";
import { statementLines } from "../script";

export const Scene6Statement: React.FC = () => {
  const frame = useCurrentFrame();
  const showSecond = frame >= statementLines.firstDuration;

  const opacity = interpolate(
    frame,
    [statementLines.firstDuration - 8, statementLines.firstDuration + 8],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const secondOpacity = interpolate(
    frame,
    [statementLines.firstDuration - 8, statementLines.firstDuration + 8],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bgLight,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          opacity,
          fontFamily: fontHeavy,
          fontWeight: 800,
          fontSize: 46,
          textAlign: "center",
          whiteSpace: "pre-line",
          color: "#1A1A1A",
          maxWidth: 700,
        }}
      >
        {statementLines.first}
      </div>

      {showSecond && (
        <div
          style={{
            position: "absolute",
            opacity: secondOpacity,
            fontFamily: fontHeavy,
            fontWeight: 800,
            fontSize: 46,
            textAlign: "center",
            whiteSpace: "pre-line",
            maxWidth: 700,
          }}
        >
          <span style={{ color: colors.maroon }}>NO</span>
          <span style={{ color: "#1A1A1A" }}> ES UN LUGAR PARA</span>
          <br />
          <span style={{ color: "#1A1A1A" }}>SOLTAR </span>
          <span style={{ color: colors.green }}>5.000 ANUNCIOS</span>
        </div>
      )}
    </AbsoluteFill>
  );
};
