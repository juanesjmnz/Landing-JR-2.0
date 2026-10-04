import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { colors } from "../theme";
import { IsoCube } from "../components/IsoCube";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { bounceIn, punch } from "../utils/anim";

const BEATS = [
  { at: 0, number: "1", overlay: null as "x" | "check" | null, color: colors.blue },
  { at: 54, number: "100", overlay: "x" as const, color: colors.blue },
  { at: 111, number: "5-40", overlay: "check" as const, color: colors.green },
];

export const Scene1Cube: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const beat = [...BEATS].reverse().find((b) => frame >= b.at) ?? BEATS[0];
  const sinceBeat = frame - beat.at;

  const cubeEntrance = bounceIn(frame, fps);
  const cubeScale = 0.6 + cubeEntrance * 0.4;
  const cubeRotate = (1 - Math.min(1, cubeEntrance)) * -8;

  const numberPunch = punch(sinceBeat, fps);
  const numberScale = 0.7 + Math.min(1, numberPunch) * 0.3;
  const overlayProgress = Math.min(1, punch(sinceBeat, fps, 4));

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start", paddingTop: 300 }}>
      <AnimatedBackground variant="light" accent={colors.blue} />

      <div
        style={{
          transform: `scale(${cubeScale}) rotate(${cubeRotate}deg)`,
        }}
      >
        <IsoCube
          number={beat.number}
          numberColor={beat.color}
          overlay={beat.overlay}
          overlayProgress={beat.overlay ? overlayProgress : 0}
          numberScale={numberScale}
        />
      </div>
    </AbsoluteFill>
  );
};
