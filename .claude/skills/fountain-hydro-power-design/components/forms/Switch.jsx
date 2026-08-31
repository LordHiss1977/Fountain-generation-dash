import React from "react";

export function Switch({ label, checked, defaultChecked, onChange, disabled, style, ...rest }) {
  const [inner, setInner] = React.useState(!!defaultChecked);
  const on = checked !== undefined ? checked : inner;
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: 10, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.45 : 1, fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--text-body)", ...style }}>
      <input type="checkbox" role="switch" checked={on} disabled={disabled}
        onChange={(e) => { if (checked === undefined) setInner(e.target.checked); onChange && onChange(e); }}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }} {...rest} />
      <span style={{ width: 38, height: 22, flex: "none", borderRadius: "var(--radius-pill)", background: on ? "var(--accent-primary)" : "var(--color-gray-200)", position: "relative", transition: "background var(--duration-base) var(--ease-standard)" }}>
        <span style={{ position: "absolute", top: 3, left: on ? 19 : 3, width: 16, height: 16, borderRadius: "var(--radius-circle)", background: "#fff", boxShadow: "var(--shadow-xs)", transition: "left var(--duration-base) var(--ease-standard)" }} />
      </span>
      {label}
    </label>
  );
}
