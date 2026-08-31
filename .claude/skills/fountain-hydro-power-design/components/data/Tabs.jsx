import React from "react";

export function Tabs({ tabs = [], value, defaultValue, onChange, style, ...rest }) {
  const [inner, setInner] = React.useState(defaultValue || (tabs[0] && tabs[0].value));
  const active = value !== undefined ? value : inner;
  const pick = (v) => { if (value === undefined) setInner(v); onChange && onChange(v); };
  return (
    <div role="tablist" style={{ display: "flex", gap: "var(--space-6)", borderBottom: "1px solid var(--border-subtle)", ...style }} {...rest}>
      {tabs.map((t) => {
        const on = t.value === active;
        return (
          <button key={t.value} role="tab" aria-selected={on} onClick={() => pick(t.value)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: "0 0 10px", marginBottom: -1,
              borderBottom: "var(--rule-accent) solid " + (on ? "var(--accent-primary)" : "transparent"),
              fontFamily: "var(--font-brand)", fontSize: "var(--text-sm)", fontWeight: "var(--weight-semibold)",
              letterSpacing: "var(--tracking-wide)", textTransform: "uppercase",
              color: on ? "var(--text-brand)" : "var(--text-muted)",
              transition: "color var(--duration-fast) var(--ease-standard)" }}>
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
