import React from "react";

export function KpiStat({ label, value, unit, delta, deltaTone = "neutral", caption, align = "left", style, ...rest }) {
  const deltaColor = { up: "var(--status-success)", down: "var(--status-danger)", neutral: "var(--text-muted)" }[deltaTone];
  return (
    <div style={{ textAlign: align, ...style }} {...rest}>
      <div style={{ fontFamily: "var(--font-brand)", fontSize: "var(--text-2xs)", fontWeight: "var(--weight-semibold)", letterSpacing: "var(--tracking-wider)", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 6 }}>{label}</div>
      <div style={{ display: "flex", alignItems: "baseline", gap: 6, justifyContent: align === "center" ? "center" : "flex-start" }}>
        <span style={{ fontFamily: "var(--font-brand)", fontSize: "var(--text-4xl)", fontWeight: "var(--weight-semibold)", lineHeight: 1, color: "var(--text-body)", fontVariantNumeric: "tabular-nums" }}>{value}</span>
        {unit && <span style={{ fontFamily: "var(--font-brand)", fontSize: "var(--text-lg)", color: "var(--text-muted)" }}>{unit}</span>}
      </div>
      {(delta || caption) && (
        <div style={{ marginTop: 8, display: "flex", gap: 8, alignItems: "center", justifyContent: align === "center" ? "center" : "flex-start", fontFamily: "var(--font-body)", fontSize: "var(--text-xs)" }}>
          {delta && <span style={{ color: deltaColor, fontWeight: "var(--weight-semibold)", fontVariantNumeric: "tabular-nums" }}>{delta}</span>}
          {caption && <span style={{ color: "var(--text-faint)" }}>{caption}</span>}
        </div>
      )}
    </div>
  );
}
