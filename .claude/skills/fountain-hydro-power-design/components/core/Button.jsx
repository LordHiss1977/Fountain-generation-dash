import React from "react";

const sizes = {
  sm: { fontSize: "var(--text-xs)", padding: "6px 12px", gap: "6px", minHeight: 30 },
  md: { fontSize: "var(--text-sm)", padding: "9px 18px", gap: "8px", minHeight: 38 },
  lg: { fontSize: "var(--text-md)", padding: "12px 24px", gap: "10px", minHeight: 46 },
};

const variants = {
  primary: { background: "var(--accent-primary)", color: "var(--text-on-brand)", border: "1px solid var(--accent-primary)" },
  secondary: { background: "transparent", color: "var(--accent-primary)", border: "1px solid var(--border-brand)" },
  ghost: { background: "transparent", color: "var(--text-body)", border: "1px solid transparent" },
  inverse: { background: "var(--color-white)", color: "var(--color-teal-800)", border: "1px solid var(--color-white)" },
  danger: { background: "var(--status-danger)", color: "var(--color-white)", border: "1px solid var(--status-danger)" },
};

const hovers = {
  primary: { background: "var(--accent-primary-hover)", borderColor: "var(--accent-primary-hover)" },
  secondary: { background: "var(--surface-brand-soft)" },
  ghost: { background: "var(--surface-muted)", borderColor: "var(--border-subtle)" },
  inverse: { background: "var(--color-teal-100)" },
  danger: { background: "#b93d31", borderColor: "#b93d31" },
};

export function Button({ variant = "primary", size = "md", disabled, fullWidth, iconLeft, iconRight, children, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  return (
    <button
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{
        display: fullWidth ? "flex" : "inline-flex", width: fullWidth ? "100%" : undefined,
        alignItems: "center", justifyContent: "center",
        fontFamily: "var(--font-brand)", fontWeight: "var(--weight-semibold)",
        letterSpacing: "var(--tracking-wide)",
        borderRadius: "var(--radius-md)", cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        transition: "background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard)",
        ...sizes[size], ...variants[variant],
        ...(!disabled && hover ? hovers[variant] : null),
        ...(!disabled && active && variant === "primary" ? { background: "var(--accent-primary-active)", borderColor: "var(--accent-primary-active)" } : null),
        ...style,
      }}
      {...rest}
    >
      {iconLeft}
      <span>{children}</span>
      {iconRight}
    </button>
  );
}
