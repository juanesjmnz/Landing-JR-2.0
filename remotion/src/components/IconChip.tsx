import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { fontHeavy } from "../fonts";
import { bounceIn } from "../utils/anim";

type IconName = "megaphone" | "clock" | "coin" | "spark";

const ICONS: Record<IconName, React.ReactNode> = {
  megaphone: (
    <path
      d="M3 10v4h3l5 4V6L6 10H3z M14 9c1 1 1 5 0 6 M16.5 7c2 2 2 8 0 10"
      stroke="currentColor"
      strokeWidth={1.6}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  clock: (
    <>
      <circle cx={11} cy={11} r={8} stroke="currentColor" strokeWidth={1.6} fill="none" />
      <path d="M11 6v5l4 2" stroke="currentColor" strokeWidth={1.6} fill="none" strokeLinecap="round" />
    </>
  ),
  coin: (
    <>
      <circle cx={11} cy={11} r={8} stroke="currentColor" strokeWidth={1.6} fill="none" />
      <path d="M11 7v8M8.5 9c0-1.2 1.1-2 2.5-2s2.5.7 2.5 1.8-1 1.5-2.5 1.7-2.5.6-2.5 1.8S9.6 15 11 15s2.5-.7 2.5-1.9" stroke="currentColor" strokeWidth={1.4} fill="none" strokeLinecap="round" />
    </>
  ),
  spark: (
    <path
      d="M11 3l1.8 5.6L18 10l-5.2 1.4L11 17l-1.8-5.6L4 10l5.2-1.4L11 3z"
      stroke="currentColor"
      strokeWidth={1.3}
      fill="currentColor"
      strokeLinejoin="round"
    />
  ),
};

interface IconChipProps {
  icon: IconName;
  label: string;
  color: string;
  background: string;
  delay?: number;
  fontSize?: number;
}

/** Small pill badge (icon + short label) used to tag a scene's topic —
 * adds a layer of graphic richness beyond big numbers and bars. */
export const IconChip: React.FC<IconChipProps> = ({ icon, label, color, background, delay = 0, fontSize = 17 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = bounceIn(frame, fps, delay);
  const scale = Math.max(0, Math.min(1.08, p));
  const opacity = interpolate(frame - delay, [0, 6], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const iconSize = fontSize + 3;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 9,
        padding: `${Math.round(fontSize * 0.5)}px ${Math.round(fontSize * 1.05)}px`,
        borderRadius: 999,
        backgroundColor: background,
        color,
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      <svg width={iconSize} height={iconSize} viewBox="0 0 22 22">
        {ICONS[icon]}
      </svg>
      <span style={{ fontFamily: fontHeavy, fontWeight: 700, fontSize, letterSpacing: 0.5 }}>{label}</span>
    </div>
  );
};
