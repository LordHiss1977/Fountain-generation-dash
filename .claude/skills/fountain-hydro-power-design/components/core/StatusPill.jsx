import React from "react";

const states = {
  operational: { label: "Operativa", color: "var(--status-success)" },
  planned: { label: "Mantenimiento planificado", color: "var(--status-warning)" },
  info: { label: "Informativo", color: "var(--status-info)" },
  fault: { label: "Fuera de servicio", color: "var(--status-danger)" },
  idle: { label: "Sin datos", color: "var(--color-gray-400)" },
};

export function StatusPill({ status = "operational", label, style, ...rest }) {
  const s = states[status] || states.idle;
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        fontFamily: "var(--font-brand)", fontSize: "var(--text-xs)",
        fontWeight: "var(--weight-semibold)", letterSpacing: "var(--tracking-wide)",
        color: "var(--text-body)", background: "var(--surface-card)",
        border: "1px solid var(--border-default)", borderRadius: "var(--radius-pill)",
        padding: "4px 12px 4px 10px", ...style,
      }}
      {...rest}
    >
      <span style={{ width: 8, height: 8, borderRadius: "var(--radius-circle)", background: s.color, flex: "none" }} />
      {label || s.label}
    </span>
  );
}
