import React from "react";

export function Card({ title, eyebrow, action, padding = "var(--space-6)", tone = "default", children, style, ...rest }) {
  const tones = {
    default: { background: "var(--surface-card)", border: "1px solid var(--border-subtle)" },
    sunken: { background: "var(--surface-muted)", border: "1px solid var(--border-subtle)" },
    brand: { background: "var(--surface-brand-soft)", border: "1px solid var(--color-teal-200)" },
    inverse: { background: "var(--surface-inverse)", border: "1px solid #3a3a3a", color: "var(--color-white)" },
  };
  return (
    <section
      style={{ borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-sm)", ...tones[tone], ...style }}
      {...rest}
    >
      {(title || eyebrow || action) && (
        <header style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "var(--space-4)", padding: padding, paddingBottom: 0 }}>
          <div>
            {eyebrow && (
              <div style={{ fontFamily: "var(--font-brand)", fontSize: "var(--text-2xs)", fontWeight: "var(--weight-semibold)", letterSpacing: "var(--tracking-wider)", textTransform: "uppercase", color: "var(--text-brand)", marginBottom: 4 }}>{eyebrow}</div>
            )}
            {title && (
              <h3 style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: "var(--text-lg)", fontWeight: "var(--weight-semibold)", color: tone === "inverse" ? "var(--color-white)" : "var(--text-body)" }}>{title}</h3>
            )}
          </div>
          {action}
        </header>
      )}
      <div style={{ padding }}>{children}</div>
    </section>
  );
}
