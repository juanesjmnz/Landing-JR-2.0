import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, springTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { SCENE_DURATIONS, TRANSITION_FRAMES } from "./script";
import { Scene1AdCounter } from "./scenes/Scene1AdCounter";
import { Scene2UnderFive } from "./scenes/Scene2UnderFive";
import { Scene3OverForty } from "./scenes/Scene3OverForty";
import { Scene4NumberLine } from "./scenes/Scene4NumberLine";
import { Scene5Countdown } from "./scenes/Scene5Countdown";
import { Scene6Statement } from "./scenes/Scene6Statement";
import { CaptionLayer } from "./components/CaptionLayer";
import { TimelineBar } from "./components/TimelineBar";

const timing = () => springTiming({ config: { damping: 200 }, durationInFrames: TRANSITION_FRAMES });

export const AdSetReel: React.FC = () => {
  return (
    <AbsoluteFill>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.counter}>
          <Scene1AdCounter />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={timing()} />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.underFive}>
          <Scene2UnderFive />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={slide({ direction: "from-left" })} timing={timing()} />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.overForty}>
          <Scene3OverForty />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={slide({ direction: "from-bottom" })} timing={timing()} />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.numberLine}>
          <Scene4NumberLine />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={slide({ direction: "from-right" })} timing={timing()} />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.countdown}>
          <Scene5Countdown />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition presentation={slide({ direction: "from-top" })} timing={timing()} />

        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.statement}>
          <Scene6Statement />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* Global overlays — consistent across every scene cut */}
      <CaptionLayer />
      <TimelineBar />
    </AbsoluteFill>
  );
};
