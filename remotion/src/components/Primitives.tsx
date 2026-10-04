import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const INK = "#111111";

export const ACCENTS = ["#F5C242", "#FF4FA3", "#A9E8A0", "#AEE7F4", "#F5A623"];

// Resorte "pop" reutilizable: 0 -> overshoot -> 1 en pocos frames.
export const usePop = (
  localFrame: number,
  config?: { damping?: number; stiffness?: number; mass?: number; delay?: number }
) => {
  const { fps } = useVideoConfig();
  const f = Math.max(0, localFrame - (config?.delay ?? 0));
  return spring({
    frame: f,
    fps,
    config: {
      damping: config?.damping ?? 11,
      stiffness: config?.stiffness ?? 180,
      mass: config?.mass ?? 0.6,
    },
  });
};

// Micro-rebote continuo (efecto "late" / beat) para que nada quede estático.
export const useIdlePulse = (frame: number, amplitude = 0.018, speed = 9) =>
  1 + Math.sin(frame / speed) * amplitude;

export const BackgroundAccents: React.FC<{ seed?: number }> = ({ seed = 0 }) => {
  const frame = useCurrentFrame();
  const shapes = [0, 1, 2, 3, 4, 5].map((i) => {
    const n = i + seed * 7;
    const cx = 10 + ((n * 37) % 90);
    const cy = 8 + ((n * 53) % 88);
    const size = 16 + ((n * 19) % 22);
    const color = ACCENTS[(i + seed) % ACCENTS.length];
    const rot = frame * (1.2 + (i % 3) * 0.6) + n * 40;
    const drift = Math.sin(frame / (28 + i * 6) + n) * 14;
    const shape = i % 3;
    return { cx, cy, size, color, rot, drift, shape, key: i };
  });
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {shapes.map((s) => (
        <div
          key={s.key}
          style={{
            position: "absolute",
            left: `${s.cx}%`,
            top: `${s.cy}%`,
            width: s.size,
            height: s.size,
            opacity: 0.16,
            background: s.shape === 1 ? "transparent" : s.color,
            border: s.shape === 1 ? `4px solid ${s.color}` : undefined,
            borderRadius: s.shape === 0 ? "50%" : s.shape === 1 ? 8 : 6,
            transform: `translateY(${s.drift}px) rotate(${s.rot}deg)`,
          }}
        />
      ))}
    </div>
  );
};

export const FloatingSticker: React.FC<{
  text: string;
  bg: string;
  top: number;
  left: number;
  rotate?: number;
  delay?: number;
}> = ({ text, bg, top, left, rotate = 0, delay = 0 }) => {
  const frame = useCurrentFrame();
  const pop = usePop(frame, { delay });
  const scale = interpolate(pop, [0, 1], [0.3, 1]);
  const float = Math.sin((frame - delay) / 20) * 6;
  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        background: bg,
        border: `2px solid ${INK}`,
        borderRadius: 8,
        padding: "8px 14px",
        fontFamily: "Archivo Black",
        fontSize: 16,
        transform: `translateY(${float}px) rotate(${rotate}deg) scale(${scale})`,
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </div>
  );
};

export const CountUp: React.FC<{
  to: number;
  localFrame: number;
  durationInFrames?: number;
  suffix?: string;
  color?: string;
}> = ({ to, localFrame, durationInFrames = 18, suffix = "", color = INK }) => {
  const { fps } = useVideoConfig();
  const p = spring({
    frame: localFrame,
    fps,
    durationInFrames,
    config: { damping: 200 },
  });
  const n = Math.round(interpolate(p, [0, 1], [0, to]));
  return (
    <span style={{ fontFamily: "Archivo Black", color }}>
      {n}
      {suffix}
    </span>
  );
};

export const Card: React.FC<{
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ style, children }) => (
  <div
    style={{
      background: "#FFFFFF",
      border: `3px solid ${INK}`,
      borderRadius: 18,
      boxShadow: "8px 8px 0px 0px rgba(17,17,17,1)",
      padding: 20,
      boxSizing: "border-box",
      ...style,
    }}
  >
    {children}
  </div>
);

export const Pill: React.FC<{
  bg?: string;
  color?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}> = ({ bg = INK, color = "#fff", style, children }) => (
  <span
    style={{
      display: "inline-block",
      background: bg,
      color,
      fontFamily: "Archivo Black",
      fontSize: 20,
      letterSpacing: 0.5,
      padding: "6px 14px",
      borderRadius: 999,
      border: `2px solid ${INK}`,
      textTransform: "uppercase",
      ...style,
    }}
  >
    {children}
  </span>
);

export const CheckRow: React.FC<{
  label: string;
  checked: boolean;
  bg?: string;
}> = ({ label, checked, bg }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      border: `2px solid ${INK}`,
      borderRadius: 10,
      padding: "12px 16px",
      marginBottom: 10,
      background: bg ?? "#fff",
    }}
  >
    <span style={{ fontFamily: "Inter", fontWeight: 800, fontSize: 24 }}>
      {label}
    </span>
    <span
      style={{
        width: 32,
        height: 32,
        borderRadius: 8,
        border: `2px solid ${INK}`,
        background: checked ? "#F5C242" : "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Archivo Black",
        fontSize: 20,
      }}
    >
      {checked ? "✓" : ""}
    </span>
  </div>
);

export const StatBox: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderBottom: `2px solid ${INK}`,
      padding: "10px 0",
    }}
  >
    <span
      style={{
        fontFamily: "Inter",
        fontWeight: 800,
        fontSize: 22,
        color: "#555",
      }}
    >
      {label}
    </span>
    <span style={{ fontFamily: "Archivo Black", fontSize: 30 }}>{value}</span>
  </div>
);

export const BigNumber: React.FC<{
  value: string | number;
  sub?: string;
  color?: string;
}> = ({ value, sub, color = INK }) => (
  <div
    style={{
      border: `2px solid ${INK}`,
      borderRadius: 12,
      textAlign: "center",
      padding: "18px 10px",
      marginTop: 10,
    }}
  >
    <div style={{ fontFamily: "Archivo Black", fontSize: 72, color }}>
      {value}
    </div>
    {sub ? (
      <div
        style={{
          fontFamily: "Inter",
          fontWeight: 700,
          fontSize: 16,
          color: "#666",
          textTransform: "uppercase",
        }}
      >
        {sub}
      </div>
    ) : null}
  </div>
);

export const TopLabel: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const pop = usePop(frame, { stiffness: 220, damping: 14 });
  const y = interpolate(pop, [0, 1], [-70, 0]);
  const scale = interpolate(pop, [0, 1], [0.6, 1]);
  return (
    <div
      style={{
        position: "absolute",
        top: 64,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        transform: `translateY(${y}px)`,
      }}
    >
      <div
        style={{
          background: "#fff",
          border: `2.5px solid ${INK}`,
          borderRadius: 999,
          padding: "8px 22px",
          fontFamily: "Archivo Black",
          fontSize: 18,
          letterSpacing: 0.5,
          textTransform: "uppercase",
          textAlign: "center",
          maxWidth: 880,
          transform: `scale(${scale})`,
        }}
      >
        {text}
      </div>
    </div>
  );
};

// --- Personajes originales (flat design), NO son personajes con copyright ---
export const Avatar: React.FC<{
  kind: "buyer" | "founder";
  talking: boolean;
  frame: number;
  side: "left" | "right";
}> = ({ kind, talking, frame, side }) => {
  const bounce = talking ? Math.sin(frame / 3.2) * 12 : Math.sin(frame / 16) * 3;
  const squash = talking ? 1 + Math.abs(Math.sin(frame / 3.2)) * 0.05 : 1;
  const tilt = talking ? Math.sin(frame / 6) * 4 : Math.sin(frame / 30) * 1.5;
  const armSwing = talking ? Math.sin(frame / 3.2) * 26 : Math.sin(frame / 20) * 6;
  const dir = side === "left" ? 1 : -1;

  const skin = "#E8B48C";
  const shirt = kind === "buyer" ? "#2E4374" : "#F4F4F4";
  const pants = kind === "buyer" ? "#22314F" : "#4E7A3B";
  const hair = kind === "buyer" ? "#3A2A20" : "#B8862F";

  return (
    <div
      style={{
        width: 136,
        height: 240,
        transform: `translateY(${-Math.abs(bounce)}px) rotate(${tilt}deg) scaleY(${squash})`,
        transformOrigin: "bottom center",
      }}
    >
      <svg viewBox="0 0 170 300" width="136" height="240">
        {/* legs */}
        <rect x="55" y="200" width="26" height="80" rx="10" fill={pants} />
        <rect x="89" y="200" width="26" height="80" rx="10" fill={pants} />
        {/* shoes */}
        <rect x="50" y="272" width="36" height="16" rx="6" fill={INK} />
        <rect x="84" y="272" width="36" height="16" rx="6" fill={INK} />
        {/* torso */}
        <rect
          x="40"
          y="120"
          width="90"
          height="95"
          rx="24"
          fill={shirt}
          stroke={INK}
          strokeWidth="3"
        />
        {/* far arm (gesticulando) */}
        <g transform={`rotate(${dir * armSwing}, 27, 128)`}>
          <rect
            x="14"
            y="128"
            width="26"
            height="78"
            rx="13"
            fill={shirt}
            stroke={INK}
            strokeWidth="3"
          />
        </g>
        <g transform={`rotate(${-dir * armSwing * 0.5}, 143, 128)`}>
          <rect
            x="130"
            y="128"
            width="26"
            height="78"
            rx="13"
            fill={shirt}
            stroke={INK}
            strokeWidth="3"
          />
        </g>
        {/* head */}
        <circle
          cx="85"
          cy="75"
          r="52"
          fill={skin}
          stroke={INK}
          strokeWidth="3"
        />
        {/* hair */}
        <path d={`M33,60 Q85,10 137,60 L137,45 Q85,-5 33,45 Z`} fill={hair} />
        {/* eyes */}
        <circle cx="68" cy="78" r="5" fill={INK} />
        <circle cx="102" cy="78" r="5" fill={INK} />
        {/* mouth: open when talking */}
        {talking ? (
          <ellipse cx="85" cy="100" rx="14" ry={8 + Math.abs(bounce) * 0.6} fill={INK} />
        ) : (
          <rect x="72" y="98" width="26" height="5" rx="2.5" fill={INK} />
        )}
      </svg>
    </div>
  );
};

// `tAbsSeconds` debe ser tiempo ABSOLUTO del video (shot.start + frame/fps),
// no el frame relativo al shot — de lo contrario nunca hace match con
// line.start/end (que están en segundos absolutos).
export const wordProgress = (
  tAbsSeconds: number,
  startSec: number,
  endSec: number,
  wordCount: number
) => {
  const p = interpolate(tAbsSeconds, [startSec, endSec], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return Math.min(wordCount, Math.max(1, Math.ceil(p * wordCount)));
};
