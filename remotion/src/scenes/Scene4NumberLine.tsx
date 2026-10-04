import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../theme";
import { fontHeavy } from "../fonts";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { BounceWord } from "../components/BounceWord";
import { bounceIn, breathe } from "../utils/anim";
import { SCENE_DURATIONS } from "../script";

const LINE_WIDTH = 620;

export const Scene4NumberLine: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const markerValue = Math.round(
    interpolate(frame, [0, SCENE_DURATIONS.numberLine], [5, 40], { extrapolateRight: "clamp" })
  );
  const markerX = interpolate(markerValue, [1, 100], [0, LINE_WIDTH]);
  const rangeStart = interpolate(5, [1, 100], [0, LINE_WIDTH]);
  const rangeEnd = interpolate(40, [1, 100], [0, LINE_WIDTH]);
  const rangeGlow = 0.5 + breathe(frame, 50, 0.25);

  const lineEntrance = Math.max(0, Math.min(1, bounceIn(frame, fps)));

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start", paddingTop: 230 }}>
      <AnimatedBackground variant="light" accent={colors.maroon} />

      <div style={{ width: LINE_WIDTH, marginBottom: 76, opacity: lineEntrance, transform: `translateY(${(1 - lineEntrance) * -16}px)` }}>
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
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.25))",
            }}
          />
          <div style={{ position: "absolute", left: markerX - 16, top: -28, fontFamily: fontHeavy, fontWeight: 800, fontSize: 22 }}>
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
              opacity: rangeGlow,
              boxShadow: `0 0 ${12 + rangeGlow * 10}px ${colors.teal}`,
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

      <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        <BounceWord text="PRESUPUESTO" color={colors.blue} delay={2} fontSize={62} />
        <BounceWord text="≠" color="#1A1A1A" delay={8} fontSize={44} />
        <BounceWord text="VELOCIDAD" color={colors.maroon} delay={14} fontSize={62} />
      </div>
    </AbsoluteFill>
  );
};
