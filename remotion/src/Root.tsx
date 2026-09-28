import React from "react";
import { Composition } from "remotion";
import { SwarmVideo } from "./Video";
import { TOTAL_SECONDS } from "./data/script";

const FPS = 30;

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="Video"
      component={SwarmVideo}
      durationInFrames={Math.round(TOTAL_SECONDS * FPS)}
      fps={FPS}
      width={1080}
      height={1920}
    />
  );
};
