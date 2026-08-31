import React from "react";

export function ProgressBar({ value = 0, max = 100, tone = "brand", showValue = true, label, style, ...rest }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const colors = { brand: "var(--accent-primary)", success: "var(--status-success)", warning: "var(--status-warning)", danger: "var(--status-danger)" };
  return (
    <div style={style} {...rest}>
      {(label || showValue) && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 6, fontFamily: "var(--font-brand)", fontSize: "var(--text-xs)", letterSpacing: "var(--tracking-wide)", color: "var(--text-muted)" }}>
          <span style={{ textTransform: "uppercase", fontWeight: "var(--weight-semibold)" }}>{label}</span>
          {showValue && <span style={{ fontVariantNumeric: "tabular-nums", color: "var(--text-body)" }}>{String(value).replace(".", ",")}%</span>}
        </div>
      )}
      <div style={{ height: 6, background: "var(--surface-sunken)", borderRadius: "var(--radius-pill)", overflow: "hidden" }}>
        <div style={{ width: pct + "%", height: "100%", background: colors[tone], borderRadius: "var(--radius-pill)", transition: "width var(--duration-slow) var(--ease-out)" }} />
      </div>
    </div>
  );
}
