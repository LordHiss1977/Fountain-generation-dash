import React from "react";

const tones = {
  neutral: { bg: "var(--surface-sunken)", fg: "var(--text-muted)", bd: "var(--border-default)" },
  brand: { bg: "var(--surface-brand-soft)", fg: "var(--color-teal-800)", bd: "var(--color-teal-200)" },
  success: { bg: "#eef7e6", fg: "#43671f", bd: "#c6e3aa" },
  warning: { bg: "#fdf3e4", fg: "#8a5b12", bd: "#f2d6a6" },
  info: { bg: "#e6f4fd", fg: "#0f5f8c", bd: "#b6e0f8" },
  danger: { bg: "#fbeae8", fg: "#8f2c21", bd: "#f0bdb7" },
};

export function Badge({ tone = "neutral", solid = false, children, style, ...rest }) {
  const t = tones[tone];
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        fontFamily: "var(--font-brand)", fontSize: "var(--text-2xs)",
        fontWeight: "var(--weight-semibold)", letterSpacing: "var(--tracking-wide)",
        textTransform: "uppercase", padding: "3px 8px", borderRadius: "var(--radius-sm)",
        background: solid ? t.fg : t.bg, color: solid ? "#fff" : t.fg,
        border: "1px solid " + (solid ? t.fg : t.bd), ...style,
      }}
      {...rest}
    >
      {children}
    </span>
  );
}
