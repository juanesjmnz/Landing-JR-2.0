import React from "react";
import { Composition } from "remotion";
import { AdSetReel, TOTAL_DURATION_IN_FRAMES } from "./Video";
import { FPS, VIDEO_HEIGHT, VIDEO_WIDTH } from "./theme";
import { fontFaceCss } from "./fonts";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: fontFaceCss }} />
      <Composition
        id="AdSetReel"
        component={AdSetReel}
        durationInFrames={TOTAL_DURATION_IN_FRAMES}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
    </>
  );
};
