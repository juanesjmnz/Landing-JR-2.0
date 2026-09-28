import React from "react";
import { interpolate } from "remotion";

export const INK = "#111111";

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

export const TopLabel: React.FC<{ text: string }> = ({ text }) => (
  <div
    style={{
      position: "absolute",
      top: 64,
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "center",
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
      }}
    >
      {text}
    </div>
  </div>
);

// --- Personajes originales (flat design), NO son personajes con copyright ---
export const Avatar: React.FC<{
  kind: "buyer" | "founder";
  talking: boolean;
  frame: number;
}> = ({ kind, talking, frame }) => {
  const bounce = talking
    ? Math.sin(frame / 4) * 6
    : Math.sin(frame / 14) * 2;
  const skin = "#E8B48C";
  const shirt = kind === "buyer" ? "#2E4374" : "#F4F4F4";
  const pants = kind === "buyer" ? "#22314F" : "#4E7A3B";
  const hair = kind === "buyer" ? "#3A2A20" : "#B8862F";

  return (
    <div
      style={{
        width: 170,
        height: 300,
        transform: `translateY(${bounce}px)`,
      }}
    >
      <svg viewBox="0 0 170 300" width="170" height="300">
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
        {/* arms */}
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
          <ellipse cx="85" cy="100" rx="14" ry={8 + Math.abs(bounce)} fill={INK} />
        ) : (
          <rect x="72" y="98" width="26" height="5" rx="2.5" fill={INK} />
        )}
      </svg>
    </div>
  );
};

export const wordProgress = (
  frame: number,
  fps: number,
  startSec: number,
  endSec: number,
  wordCount: number
) => {
  const t = frame / fps;
  const p = interpolate(t, [startSec, endSec], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return Math.min(wordCount, Math.max(1, Math.ceil(p * wordCount)));
};
