import React from "react";
import { fontHeavy } from "../fonts";
import { colors } from "../theme";
import { lineLength } from "../utils/anim";

interface IsoCubeProps {
  number: string;
  numberColor?: string;
  overlay?: "x" | "check" | null;
  overlayColor?: string;
  /** 0 → not drawn, 1 → fully drawn. Animates the X / check like it's being sketched on. */
  overlayProgress?: number;
  numberScale?: number;
}

const SIZE = 260;
const DEPTH = 90;

/**
 * Flat isometric wireframe cube with "ADS" skewed onto the top face and a
 * big stat centered on the front face — matches the recurring cube motif
 * from the first act of the source reel.
 */
export const IsoCube: React.FC<IsoCubeProps> = ({
  number,
  numberColor = colors.blue,
  overlay = null,
  overlayColor = colors.pink,
  overlayProgress = 1,
  numberScale = 1,
}) => {
  const xLen1 = lineLength(40, 40, SIZE - 40, SIZE - 40);
  const xLen2 = lineLength(SIZE - 40, 40, 40, SIZE - 40);
  const checkLen =
    lineLength(SIZE * 0.22, SIZE * 0.52, SIZE * 0.42, SIZE * 0.72) +
    lineLength(SIZE * 0.42, SIZE * 0.72, SIZE * 0.8, SIZE * 0.28);

  return (
    <div
      style={{
        position: "relative",
        width: SIZE + DEPTH,
        height: SIZE + DEPTH,
      }}
    >
      {/* Front face */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: DEPTH,
          width: SIZE,
          height: SIZE,
          border: "5px solid #1A1A1A",
          borderRadius: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(255,255,255,0.35)",
        }}
      >
        <span
          style={{
            fontFamily: fontHeavy,
            fontWeight: 800,
            fontSize: 90,
            color: numberColor,
            display: "inline-block",
            transform: `scale(${numberScale})`,
          }}
        >
          {number}
        </span>
        {overlay === "x" && (
          <svg
            width={SIZE}
            height={SIZE}
            style={{ position: "absolute", left: 0, top: 0 }}
          >
            <line
              x1={40}
              y1={40}
              x2={SIZE - 40}
              y2={SIZE - 40}
              stroke={overlayColor}
              strokeWidth={22}
              strokeLinecap="round"
              opacity={0.85}
              strokeDasharray={xLen1}
              strokeDashoffset={xLen1 * (1 - overlayProgress)}
            />
            <line
              x1={SIZE - 40}
              y1={40}
              x2={40}
              y2={SIZE - 40}
              stroke={overlayColor}
              strokeWidth={22}
              strokeLinecap="round"
              opacity={0.85}
              strokeDasharray={xLen2}
              strokeDashoffset={xLen2 * (1 - Math.max(0, overlayProgress * 2 - 1))}
            />
          </svg>
        )}
        {overlay === "check" && (
          <svg
            width={SIZE}
            height={SIZE}
            style={{ position: "absolute", left: 0, top: 0 }}
          >
            <polyline
              points={`${SIZE * 0.22},${SIZE * 0.52} ${SIZE * 0.42},${SIZE * 0.72} ${SIZE * 0.8},${SIZE * 0.28}`}
              fill="none"
              stroke={overlayColor}
              strokeWidth={22}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0.85}
              strokeDasharray={checkLen}
              strokeDashoffset={checkLen * (1 - overlayProgress)}
            />
          </svg>
        )}
      </div>

      {/* Top face (parallelogram) */}
      <svg
        width={SIZE + DEPTH}
        height={DEPTH + 20}
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        <polygon
          points={`${DEPTH},0 ${SIZE + DEPTH},0 ${SIZE},${DEPTH} 0,${DEPTH}`}
          fill="none"
          stroke="#1A1A1A"
          strokeWidth={4}
        />
        <text
          x={(SIZE + DEPTH) / 2}
          y={DEPTH * 0.62}
          textAnchor="middle"
          fontFamily={fontHeavy}
          fontWeight={800}
          fontSize={34}
          fill="#1A1A1A"
          transform={`skewX(-20) translate(${-DEPTH * 0.35}, 0)`}
        >
          ADS
        </text>
      </svg>

      {/* Right face (parallelogram) */}
      <svg
        width={DEPTH + 4}
        height={SIZE + DEPTH}
        style={{ position: "absolute", left: SIZE, top: 0 }}
      >
        <polygon
          points={`0,${DEPTH} ${DEPTH},0 ${DEPTH},${SIZE} 0,${SIZE + DEPTH}`}
          fill="none"
          stroke="#1A1A1A"
          strokeWidth={4}
        />
      </svg>
    </div>
  );
};
