import React from "react";

export function Radio({ label, checked, name, value, onChange, disabled, style, ...rest }) {
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: 10, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.45 : 1, fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--text-body)", ...style }}>
      <input type="radio" name={name} value={value} checked={checked} disabled={disabled} onChange={onChange}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }} {...rest} />
      <span style={{ width: 18, height: 18, flex: "none", borderRadius: "var(--radius-circle)", border: "1px solid " + (checked ? "var(--accent-primary)" : "var(--border-strong)"), display: "inline-flex", alignItems: "center", justifyContent: "center", background: "var(--surface-card)" }}>
        {checked && <span style={{ width: 9, height: 9, borderRadius: "var(--radius-circle)", background: "var(--accent-primary)" }} />}
      </span>
      {label}
    </label>
  );
}
