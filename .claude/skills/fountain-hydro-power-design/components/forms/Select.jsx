import React from "react";

const fieldBase = {
  fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--text-body)",
  background: "var(--surface-card)", border: "1px solid var(--border-default)",
  borderRadius: "var(--radius-sm)", padding: "8px 10px", width: "100%",
  transition: "border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)",
};

export function Select({ options = [], invalid, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <select
        onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
        {...rest}
        style={{
          ...fieldBase, appearance: "none", paddingRight: 32,
          borderColor: invalid ? "var(--status-danger)" : focus ? "var(--border-brand)" : "var(--border-default)",
          boxShadow: focus ? "var(--shadow-focus)" : "none",
          opacity: rest.disabled ? 0.45 : 1, cursor: rest.disabled ? "not-allowed" : "pointer",
          ...style,
        }}
      >
        {options.map((o) => {
          const v = typeof o === "string" ? o : o.value;
          const l = typeof o === "string" ? o : o.label;
          return <option key={v} value={v}>{l}</option>;
        })}
      </select>
      <span style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", width: 8, height: 8, borderRight: "1.5px solid var(--text-faint)", borderBottom: "1.5px solid var(--text-faint)", marginTop: -3, rotate: "45deg" }} />
    </div>
  );
}
