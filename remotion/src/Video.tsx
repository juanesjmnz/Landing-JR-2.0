import React from "react";
import { Series } from "remotion";
import { SCENE_DURATIONS } from "./script";
import { Scene1Cube } from "./scenes/Scene1Cube";
import { Scene2UnderFive } from "./scenes/Scene2UnderFive";
import { Scene3OverForty } from "./scenes/Scene3OverForty";
import { Scene4NumberLine } from "./scenes/Scene4NumberLine";
import { Scene5Countdown } from "./scenes/Scene5Countdown";
import { Scene6Statement } from "./scenes/Scene6Statement";

export const AdSetReel: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={SCENE_DURATIONS.cube}>
        <Scene1Cube />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_DURATIONS.underFive}>
        <Scene2UnderFive />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_DURATIONS.overForty}>
        <Scene3OverForty />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_DURATIONS.numberLine}>
        <Scene4NumberLine />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_DURATIONS.countdown}>
        <Scene5Countdown />
      </Series.Sequence>
      <Series.Sequence durationInFrames={SCENE_DURATIONS.statement}>
        <Scene6Statement />
      </Series.Sequence>
    </Series>
  );
};

export const TOTAL_DURATION_IN_FRAMES = Object.values(SCENE_DURATIONS).reduce((a, b) => a + b, 0);
