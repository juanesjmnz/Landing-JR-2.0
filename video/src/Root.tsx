import "./index.css";
import { Composition, staticFile } from "remotion";
import {
  CaptionedVideo,
  calculateCaptionedVideoMetadata,
  captionedVideoSchema,
} from "./CaptionedVideo";
import { SKI_EDIT_DURATION_IN_FRAMES, SKI_EDIT_FPS, SkiEdit } from "./SkiEdit";

// Each <Composition> is an entry in the sidebar!

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SkiEdit"
        component={SkiEdit}
        width={1080}
        height={1920}
        fps={SKI_EDIT_FPS}
        durationInFrames={SKI_EDIT_DURATION_IN_FRAMES}
      />
      <Composition
        id="CaptionedVideo"
        component={CaptionedVideo}
        calculateMetadata={calculateCaptionedVideoMetadata}
        schema={captionedVideoSchema}
        width={1080}
        height={1920}
        defaultProps={{
          src: staticFile("sample-video.mp4"),
        }}
      />
    </>
  );
};
