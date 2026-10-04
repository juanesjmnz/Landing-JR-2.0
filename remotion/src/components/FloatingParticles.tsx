import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";

interface FloatingParticlesProps {
  color: string;
  count?: number;
  opacity?: number;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  phase: number;
}

// Deterministic pseudo-random so every render (and every Chromium worker) of
// a given frame produces identical particle layout.
const seededRandom = (seed: number) => {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

/** Slow-drifting ambient dots behind scene content — constant subtle motion
 * so flat backgrounds never feel static, even during a held caption. */
export const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  color,
  count = 14,
  opacity = 0.35,
}) => {
  const frame = useCurrentFrame();

  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      x: seededRandom(i * 7.1) * 100,
      y: seededRandom(i * 3.7 + 1) * 100,
      size: 4 + seededRandom(i * 5.3 + 2) * 10,
      speed: 0.15 + seededRandom(i * 2.1 + 3) * 0.25,
      drift: 20 + seededRandom(i * 9.4 + 4) * 40,
      phase: seededRandom(i * 1.3 + 5) * 1000,
    }));
  }, [count]);

  return (
    <AbsoluteFill style={{ zIndex: -1, overflow: "hidden" }}>
      {particles.map((p, i) => {
        const t = frame * p.speed + p.phase;
        const dx = Math.sin(t / 40) * p.drift;
        const dy = -((frame * p.speed * 0.6 + p.phase) % 220);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: color,
              opacity,
              transform: `translate(${dx}px, ${dy}px)`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
