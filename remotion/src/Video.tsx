import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont as loadArchivoBlack } from "@remotion/google-fonts/ArchivoBlack";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { shots } from "./data/script";
import { Avatar, TopLabel } from "./components/Primitives";
import { Captions } from "./components/Captions";
import { ShotMap } from "./components/Shots";

loadArchivoBlack("normal", { weights: ["400"], subsets: ["latin"] });
loadInter("normal", { weights: ["400", "700", "800", "900"], subsets: ["latin"] });

const ShotScene: React.FC<{ shot: (typeof shots)[number] }> = ({ shot }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = (shot.end - shot.start) * fps;
  const progress = Math.min(1, Math.max(0, frame / dur));
  const Visual = ShotMap[shot.visual];

  const t = shot.start + frame / fps;
  const activeLine = shot.lines.find((l) => t >= l.start && t < l.end) ?? shot.lines[0];
  const buyerTalks = activeLine.speaker === "peter"; // Peter = comprador ficticio en el meme
  const founderTalks = activeLine.speaker === "coach";

  return (
    <AbsoluteFill style={{ background: shot.bg }}>
      <TopLabel text={shot.topLabel} />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 160,
        }}
      >
        {Visual ? <Visual progress={progress} /> : null}
      </AbsoluteFill>

      <div style={{ position: "absolute", bottom: 60, left: 30 }}>
        <Avatar kind="buyer" talking={buyerTalks} frame={frame} />
      </div>
      <div style={{ position: "absolute", bottom: 60, right: 30 }}>
        <Avatar kind="founder" talking={founderTalks} frame={frame} />
      </div>

      <Captions lines={shot.lines} shotStart={shot.start} />
    </AbsoluteFill>
  );
};

export const SwarmVideo: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill style={{ fontFamily: "Inter" }}>
      {shots.map((shot) => {
        const from = Math.round(shot.start * fps);
        const durationInFrames = Math.round((shot.end - shot.start) * fps);
        return (
          <Sequence key={shot.id} from={from} durationInFrames={durationInFrames}>
            <ShotScene shot={shot} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
