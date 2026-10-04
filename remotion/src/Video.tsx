import React from "react";
import {
  AbsoluteFill,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont as loadArchivoBlack } from "@remotion/google-fonts/ArchivoBlack";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { shots } from "./data/script";
import {
  Avatar,
  BackgroundAccents,
  INK,
  TopLabel,
  useIdlePulse,
  usePop,
} from "./components/Primitives";
import { Captions } from "./components/Captions";
import { ShotMap } from "./components/Shots";

loadArchivoBlack("normal", { weights: ["400"], subsets: ["latin"] });
loadInter("normal", { weights: ["400", "700", "800", "900"], subsets: ["latin"] });

const ShotScene: React.FC<{ shot: (typeof shots)[number]; index: number }> = ({
  shot,
  index,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = (shot.end - shot.start) * fps;
  const progress = Math.min(1, Math.max(0, frame / dur));
  const Visual = ShotMap[shot.visual];

  const t = shot.start + frame / fps;
  const activeLine =
    [...shot.lines].reverse().find((l) => t >= l.start) ?? shot.lines[0];
  const buyerTalks = activeLine.speaker === "peter";
  const founderTalks = activeLine.speaker === "coach";

  // --- "Camera punch": snap-zoom de entrada en cada corte, como un edit viral ---
  const cutPunch = usePop(frame, { stiffness: 230, damping: 16, mass: 0.6 });
  const cutScale = interpolate(cutPunch, [0, 1], [1.1, 1]);
  const flash = interpolate(frame, [0, 1, 7], [0.5, 0.22, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // --- Pulso "late" continuo + rebote extra cada vez que cambia la línea activa ---
  const idle = useIdlePulse(frame);
  const lineLocalFrame = Math.max(
    0,
    frame - Math.round((activeLine.start - shot.start) * fps)
  );
  const linePunch = usePop(lineLocalFrame, {
    stiffness: 280,
    damping: 14,
    mass: 0.4,
  });
  const cardBump = interpolate(linePunch, [0, 1], [1.06, 1]);
  const cardScale = idle * cardBump;
  const cardRotate = Math.sin(frame / 50 + index) * 1.4;

  // leve avance de "cámara" muy lento durante todo el shot (ken-burns)
  const kenBurns = interpolate(progress, [0, 1], [1, 1.035]);

  return (
    <AbsoluteFill style={{ background: shot.bg, overflow: "hidden" }}>
      <AbsoluteFill style={{ transform: `scale(${cutScale * kenBurns})` }}>
        <BackgroundAccents seed={shot.id} />
        <TopLabel text={shot.topLabel} />

        <AbsoluteFill
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 160,
          }}
        >
          <div
            style={{
              transform: `scale(${cardScale}) rotate(${cardRotate}deg)`,
            }}
          >
            {Visual ? <Visual progress={progress} /> : null}
          </div>
        </AbsoluteFill>

        <div style={{ position: "absolute", bottom: 16, left: 20 }}>
          <Avatar kind="buyer" talking={buyerTalks} frame={frame} side="left" />
        </div>
        <div style={{ position: "absolute", bottom: 16, right: 20 }}>
          <Avatar kind="founder" talking={founderTalks} frame={frame} side="right" />
        </div>

        <Captions lines={shot.lines} shotStart={shot.start} />
      </AbsoluteFill>

      {/* flash blanco al cortar, estilo edit de redes */}
      <AbsoluteFill style={{ background: "#fff", opacity: flash, pointerEvents: "none" }} />
    </AbsoluteFill>
  );
};

const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const pct = interpolate(frame, [0, durationInFrames], [0, 100], {
    extrapolateRight: "clamp",
  });
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 8,
        background: "rgba(17,17,17,0.12)",
        zIndex: 50,
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${pct}%`,
          background: INK,
        }}
      />
    </div>
  );
};

export const SwarmVideo: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ fontFamily: "Inter" }}>
      {shots.map((shot, index) => {
        const from = Math.round(shot.start * fps);
        const durationInFrames = Math.round((shot.end - shot.start) * fps);
        return (
          <Sequence key={shot.id} from={from} durationInFrames={durationInFrames}>
            <ShotScene shot={shot} index={index} />
          </Sequence>
        );
      })}
      <ProgressBar />
    </AbsoluteFill>
  );
};
