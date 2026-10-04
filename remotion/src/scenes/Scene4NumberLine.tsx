import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../theme";
import { fontHeavy } from "../fonts";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { FloatingParticles } from "../components/FloatingParticles";
import { IconChip } from "../components/IconChip";
import { BounceWord } from "../components/BounceWord";
import { bounceIn, breathe, punch } from "../utils/anim";
import { SCENE_DURATIONS } from "../script";

const LINE_WIDTH = 720;
const MARKER_MIN = 5;
const MARKER_MAX = 25;
const AXIS_MAX = 30; // scale upper bound — keeps the 5-25 range visually spread out

export const Scene4NumberLine: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const markerValue = Math.round(
    interpolate(frame, [0, SCENE_DURATIONS.numberLine], [MARKER_MIN, MARKER_MAX], { extrapolateRight: "clamp" })
  );
  // Frame at which the ticking counter last stepped to this integer — drives
  // a little "tick" punch on the number each time it increments.
  const valueChangeFrame = ((markerValue - MARKER_MIN) / (MARKER_MAX - MARKER_MIN)) * SCENE_DURATIONS.numberLine;
  const tickScale = 1 + Math.max(0, 1 - Math.min(1, punch(frame - valueChangeFrame, fps))) * 0.35;

  const markerX = interpolate(markerValue, [1, AXIS_MAX], [0, LINE_WIDTH]);
  const rangeStart = interpolate(MARKER_MIN, [1, AXIS_MAX], [0, LINE_WIDTH]);
  const rangeEnd = interpolate(MARKER_MAX, [1, AXIS_MAX], [0, LINE_WIDTH]);
  const rangeGlow = 0.5 + breathe(frame, 50, 0.25);

  const lineEntrance = Math.max(0, Math.min(1, bounceIn(frame, fps)));

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start", paddingTop: 170 }}>
      <AnimatedBackground variant="light" accent={colors.maroon} />
      <FloatingParticles color={colors.maroon} count={10} opacity={0.18} />

      <IconChip icon="spark" label="DOS FACTORES CLAVE" color={colors.white} background={colors.maroon} delay={0} />

      <div style={{ width: LINE_WIDTH, marginTop: 50, marginBottom: 86, opacity: lineEntrance, transform: `translateY(${(1 - lineEntrance) * -16}px)` }}>
        <div style={{ position: "relative", height: 46 }}>
          <div
            style={{
              position: "absolute",
              left: markerX - 9,
              top: 0,
              width: 0,
              height: 0,
              borderLeft: "9px solid transparent",
              borderRight: "9px solid transparent",
              borderTop: "14px solid #1A1A1A",
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.25))",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: markerX - 19,
              top: -32,
              fontFamily: fontHeavy,
              fontWeight: 800,
              fontSize: 26,
              transform: `scale(${tickScale})`,
              transformOrigin: "left bottom",
            }}
          >
            {markerValue}
          </div>
        </div>
        <div style={{ position: "relative", height: 17 }}>
          <div style={{ position: "absolute", left: 0, right: 0, top: 7, height: 3, backgroundColor: "#1A1A1A" }} />
          <div
            style={{
              position: "absolute",
              left: rangeStart,
              width: rangeEnd - rangeStart,
              top: 0,
              height: 17,
              borderRadius: 9,
              backgroundColor: colors.teal,
              opacity: rangeGlow,
              boxShadow: `0 0 ${12 + rangeGlow * 10}px ${colors.teal}`,
            }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, color: colors.gray, fontFamily: fontHeavy, fontSize: 19 }}>
          <span>1</span>
          <span>15</span>
          <span>30+</span>
        </div>
        <div style={{ color: colors.green, fontFamily: fontHeavy, fontWeight: 700, fontSize: 21, marginTop: 5 }}>5 a 25</div>
      </div>

      <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
        <BounceWord text="PRESUPUESTO" color={colors.blue} delay={2} fontSize={72} />
        <BounceWord text="≠" color="#1A1A1A" delay={8} fontSize={50} />
        <BounceWord text="VELOCIDAD" color={colors.maroon} delay={14} fontSize={72} />
      </div>
    </AbsoluteFill>
  );
};
