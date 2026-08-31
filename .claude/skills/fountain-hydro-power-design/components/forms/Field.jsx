import React from "react";

export function Field({ label, hint, error, required, htmlFor, children, style, ...rest }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, ...style }} {...rest}>
      {label && (
        <label htmlFor={htmlFor} style={{ fontFamily: "var(--font-brand)", fontSize: "var(--text-xs)", fontWeight: "var(--weight-semibold)", letterSpacing: "var(--tracking-wide)", textTransform: "uppercase", color: "var(--text-muted)" }}>
          {label}{required && <span style={{ color: "var(--status-danger)", marginLeft: 4 }}>*</span>}
        </label>
      )}
      {children}
      {(hint || error) && (
        <div style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-xs)", color: error ? "var(--status-danger)" : "var(--text-faint)" }}>{error || hint}</div>
      )}
    </div>
  );
}
