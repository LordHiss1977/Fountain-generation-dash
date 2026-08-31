import React from "react";

const boxes = { sm: 30, md: 38, lg: 46 };
const glyphs = { sm: 16, md: 18, lg: 20 };

export function IconButton({ icon, label, variant = "ghost", size = "md", disabled, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const solid = variant === "primary";
  return (
    <button
      aria-label={label} title={label} disabled={disabled}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        width: boxes[size], height: boxes[size], display: "inline-flex",
        alignItems: "center", justifyContent: "center",
        borderRadius: "var(--radius-md)",
        background: solid ? (hover && !disabled ? "var(--accent-primary-hover)" : "var(--accent-primary)") : (hover && !disabled ? "var(--surface-muted)" : "transparent"),
        color: solid ? "var(--text-on-brand)" : "var(--text-muted)",
        border: "1px solid " + (solid ? "transparent" : hover && !disabled ? "var(--border-subtle)" : "transparent"),
        cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.45 : 1,
        transition: "background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)",
        fontSize: glyphs[size], ...style,
      }}
      {...rest}
    >
      {icon}
    </button>
  );
}
