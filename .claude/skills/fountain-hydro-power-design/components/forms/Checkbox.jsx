import React from "react";

export function Checkbox({ label, checked, defaultChecked, onChange, disabled, style, ...rest }) {
  const [inner, setInner] = React.useState(!!defaultChecked);
  const on = checked !== undefined ? checked : inner;
  return (
    <label style={{ display: "inline-flex", alignItems: "center", gap: 10, cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.45 : 1, fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--text-body)", ...style }}>
      <input type="checkbox" checked={on} disabled={disabled}
        onChange={(e) => { if (checked === undefined) setInner(e.target.checked); onChange && onChange(e); }}
        style={{ position: "absolute", opacity: 0, width: 0, height: 0 }} {...rest} />
      <span style={{ width: 18, height: 18, flex: "none", borderRadius: "var(--radius-sm)", border: "1px solid " + (on ? "var(--accent-primary)" : "var(--border-strong)"), background: on ? "var(--accent-primary)" : "var(--surface-card)", display: "inline-flex", alignItems: "center", justifyContent: "center", transition: "background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)" }}>
        {on && <span style={{ width: 5, height: 9, borderRight: "2px solid #fff", borderBottom: "2px solid #fff", rotate: "45deg", marginTop: -2 }} />}
      </span>
      {label}
    </label>
  );
}
