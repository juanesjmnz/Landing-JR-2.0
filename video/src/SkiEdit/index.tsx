import {
  AbsoluteFill,
  Audio,
  Easing,
  interpolate,
  OffthreadVideo,
  Sequence,
  staticFile,
  useCurrentFrame,
} from "remotion";

type Clip = "a" | "b";

type Cut = {
  clip: Clip;
  srcStartSeconds: number;
  durationSeconds: number;
  playbackRate?: number;
  zoom: "in" | "out";
  punch?: boolean;
};

// Edit list, synced to the beats of ski-track.mp3 (128 BPM).
// A = ski-a.mp4 (7.883s, used in full), B = ski-b.mp4 (15s, used up to ~14.57s).
const CUTS: Cut[] = [
  { clip: "a", srcStartSeconds: 0, durationSeconds: 2.0, zoom: "in" },
  { clip: "a", srcStartSeconds: 2.0, durationSeconds: 1.75, zoom: "out" },
  // riser flash covers 3.75 - 4.0
  { clip: "b", srcStartSeconds: 0, durationSeconds: 0.9, zoom: "in", punch: true },
  { clip: "b", srcStartSeconds: 0.9, durationSeconds: 0.9, zoom: "out", punch: true },
  { clip: "a", srcStartSeconds: 3.75, durationSeconds: 0.9, zoom: "in", punch: true },
  { clip: "b", srcStartSeconds: 1.8, durationSeconds: 0.9, zoom: "out", punch: true },
  { clip: "a", srcStartSeconds: 4.65, durationSeconds: 0.9, zoom: "in", punch: true },
  { clip: "b", srcStartSeconds: 2.7, durationSeconds: 0.9, zoom: "out", punch: true },
  { clip: "a", srcStartSeconds: 5.55, durationSeconds: 0.9, zoom: "in", punch: true },
  { clip: "b", srcStartSeconds: 3.6, durationSeconds: 0.9, zoom: "out", punch: true },
  { clip: "a", srcStartSeconds: 6.45, durationSeconds: 1.435, zoom: "in", punch: true },
  { clip: "b", srcStartSeconds: 4.5, durationSeconds: 0.265, zoom: "out", punch: true },
  // breakdown slow-mo
  {
    clip: "b",
    srcStartSeconds: 4.765,
    durationSeconds: 2.1,
    playbackRate: 0.5,
    zoom: "in",
  },
  { clip: "b", srcStartSeconds: 5.815, durationSeconds: 0.85, zoom: "in", punch: true },
  { clip: "b", srcStartSeconds: 6.665, durationSeconds: 0.85, zoom: "out", punch: true },
  { clip: "b", srcStartSeconds: 7.515, durationSeconds: 0.85, zoom: "in", punch: true },
  { clip: "b", srcStartSeconds: 8.365, durationSeconds: 0.85, zoom: "out", punch: true },
  { clip: "b", srcStartSeconds: 9.215, durationSeconds: 0.85, zoom: "in", punch: true },
  { clip: "b", srcStartSeconds: 10.065, durationSeconds: 0.85, zoom: "out", punch: true },
  { clip: "b", srcStartSeconds: 10.915, durationSeconds: 0.4, zoom: "in", punch: true },
  // final highlight slow-mo
  {
    clip: "b",
    srcStartSeconds: 11.315,
    durationSeconds: 2.5,
    playbackRate: 0.5,
    zoom: "out",
  },
  { clip: "b", srcStartSeconds: 12.565, durationSeconds: 2.0, zoom: "out" },
];

const RISER_START = 3.75;
const RISER_DURATION = 0.25;
const DROP_FLASH_AT = 4.0;
const REDROP_FLASH_AT = 15.0;

const FPS = 30;
const s2f = (s: number) => Math.round(s * FPS);

const CLIP_SRC: Record<Clip, string> = {
  a: staticFile("ski-a.mp4"),
  b: staticFile("ski-b.mp4"),
};

const ClipSegment: React.FC<Cut> = ({
  clip,
  srcStartSeconds,
  durationSeconds,
  playbackRate = 1,
  zoom,
  punch,
}) => {
  const frame = useCurrentFrame();
  const durationInFrames = s2f(durationSeconds);

  const drift = interpolate(frame, [0, durationInFrames], zoom === "in" ? [1, 1.12] : [1.12, 1], {
    easing: Easing.out(Easing.ease),
    extrapolateRight: "clamp",
  });

  const punchScale = punch
    ? interpolate(frame, [0, 4, 14], [1.06, 1.02, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          transform: `scale(${drift * punchScale})`,
          transformOrigin: "center center",
        }}
      >
        <OffthreadVideo
          src={CLIP_SRC[clip]}
          startFrom={s2f(srcStartSeconds)}
          playbackRate={playbackRate}
          muted
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const Flash: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, durationInFrames * 0.35, durationInFrames], [0, 0.85, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return <AbsoluteFill style={{ backgroundColor: "white", opacity }} />;
};

const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 15%, rgba(0,0,0,0) 78%, rgba(0,0,0,0.45) 100%)",
      pointerEvents: "none",
    }}
  />
);

export const SkiEdit: React.FC = () => {
  let cursor = 0;
  const sequences: React.ReactNode[] = [];

  for (let i = 0; i < CUTS.length; i++) {
    const cut = CUTS[i];
    const from = s2f(cursor);
    const durationInFrames = s2f(cut.durationSeconds);
    sequences.push(
      <Sequence key={i} from={from} durationInFrames={durationInFrames}>
        <ClipSegment {...cut} />
      </Sequence>,
    );
    cursor += cut.durationSeconds;

    // Insert riser + drop flash right after the intro cuts (cursor === 3.75s).
    if (Math.abs(cursor - RISER_START) < 0.001) {
      sequences.push(
        <Sequence key="riser" from={s2f(RISER_START)} durationInFrames={s2f(RISER_DURATION)}>
          <Flash durationInFrames={s2f(RISER_DURATION)} />
        </Sequence>,
      );
    }
  }

  return (
    <AbsoluteFill style={{ backgroundColor: "black" }}>
      {sequences}
      <Vignette />
      <Sequence from={s2f(DROP_FLASH_AT) - 2} durationInFrames={8}>
        <Flash durationInFrames={8} />
      </Sequence>
      <Sequence from={s2f(REDROP_FLASH_AT) - 2} durationInFrames={8}>
        <Flash durationInFrames={8} />
      </Sequence>
      <Audio src={staticFile("ski-track.mp3")} />
    </AbsoluteFill>
  );
};

export const SKI_EDIT_DURATION_IN_FRAMES = s2f(25);
export const SKI_EDIT_FPS = FPS;
