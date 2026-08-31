import React from "react";

const fieldBase = {
  fontFamily: "var(--font-body)", fontSize: "var(--text-sm)", color: "var(--text-body)",
  background: "var(--surface-card)", border: "1px solid var(--border-default)",
  borderRadius: "var(--radius-sm)", padding: "8px 10px", width: "100%",
  transition: "border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)",
};

export function Input({ invalid, iconLeft, style, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <div style={{ position: "relative", display: "flex", alignItems: "center", width: "100%" }}>
      {iconLeft && <span style={{ position: "absolute", left: 10, display: "flex", color: "var(--text-faint)", pointerEvents: "none" }}>{iconLeft}</span>}
      <input
        onFocus={(e) => { setFocus(true); rest.onFocus && rest.onFocus(e); }}
        onBlur={(e) => { setFocus(false); rest.onBlur && rest.onBlur(e); }}
        {...rest}
        style={{
          ...fieldBase,
          paddingLeft: iconLeft ? 34 : fieldBase.padding.split(" ")[1],
          borderColor: invalid ? "var(--status-danger)" : focus ? "var(--border-brand)" : "var(--border-default)",
          boxShadow: focus ? "var(--shadow-focus)" : "none",
          opacity: rest.disabled ? 0.45 : 1,
          cursor: rest.disabled ? "not-allowed" : "text",
          ...style,
        }}
      />
    </div>
  );
}
