import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { colors } from "../theme";
import { fontHeavy } from "../fonts";
import { TwoToneCaption } from "../components/TwoToneCaption";
import { numberLineLines } from "../script";

const LINE_WIDTH = 620;

export const Scene4NumberLine: React.FC = () => {
  const frame = useCurrentFrame();

  // Marker counts up 5 -> 40 across the whole scene, mirroring the source's
  // ticking counter (11 -> 32 -> 35).
  const markerValue = Math.round(interpolate(frame, [0, 261], [5, 40], { extrapolateRight: "clamp" }));
  const markerX = interpolate(markerValue, [1, 100], [0, LINE_WIDTH]);
  const rangeStart = interpolate(5, [1, 100], [0, LINE_WIDTH]);
  const rangeEnd = interpolate(40, [1, 100], [0, LINE_WIDTH]);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bgLight,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ width: LINE_WIDTH, marginBottom: 70 }}>
        <div style={{ position: "relative", height: 40 }}>
          <div
            style={{
              position: "absolute",
              left: markerX - 8,
              top: 0,
              width: 0,
              height: 0,
              borderLeft: "8px solid transparent",
              borderRight: "8px solid transparent",
              borderTop: "12px solid #1A1A1A",
            }}
          />
          <div style={{ position: "absolute", left: markerX - 14, top: -26, fontFamily: fontHeavy, fontSize: 20 }}>
            {markerValue}
          </div>
        </div>
        <div style={{ position: "relative", height: 14 }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 6, height: 2, backgroundColor: "#1A1A1A" }} />
          <div
            style={{
              position: "absolute",
              left: rangeStart,
              width: rangeEnd - rangeStart,
              top: 0,
              height: 14,
              borderRadius: 8,
              backgroundColor: colors.teal,
              opacity: 0.7,
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, color: colors.gray, fontFamily: fontHeavy, fontSize: 16 }}>
          <span>1</span>
          <span>50</span>
          <span>100+</span>
        </div>
        <div style={{ color: colors.green, fontFamily: fontHeavy, fontWeight: 700, fontSize: 18, marginTop: 4 }}>5 a 40</div>
      </div>

      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <div style={{ fontFamily: fontHeavy, fontWeight: 800, fontSize: 60, color: colors.blue }}>PRESUPUESTO</div>
        <div style={{ fontFamily: fontHeavy, fontWeight: 800, fontSize: 44, color: "#1A1A1A" }}>≠</div>
        <div style={{ fontFamily: fontHeavy, fontWeight: 800, fontSize: 60, color: colors.maroon }}>VELOCIDAD</div>
      </div>

      <div style={{ height: 140, display: "flex", alignItems: "flex-start" }}>
        {numberLineLines.map((line, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              opacity: frame >= line.startFrame && frame < line.startFrame + line.durationInFrames ? 1 : 0,
            }}
          >
            <TwoToneCaption text={line.text} startFrame={line.startFrame} durationInFrames={line.durationInFrames} fontSize={40} />
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
