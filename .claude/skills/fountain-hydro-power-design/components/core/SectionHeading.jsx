import React from "react";

export function SectionHeading({ eyebrow, children, description, level = 2, align = "left", rule = true, style, ...rest }) {
  const Tag = "h" + level;
  return (
    <div style={{ textAlign: align, ...style }} {...rest}>
      {eyebrow && (
        <div style={{ fontFamily: "var(--font-brand)", fontSize: "var(--text-xs)", fontWeight: "var(--weight-semibold)", letterSpacing: "var(--tracking-wider)", textTransform: "uppercase", color: "var(--text-brand)", marginBottom: "var(--space-2)" }}>{eyebrow}</div>
      )}
      <Tag style={{ margin: 0, fontFamily: "var(--font-body)", fontWeight: "var(--weight-semibold)", fontSize: level <= 2 ? "var(--text-3xl)" : "var(--text-2xl)", lineHeight: "var(--leading-snug)", color: "var(--text-body)" }}>{children}</Tag>
      {rule && <div style={{ width: 56, height: "var(--rule-accent)", background: "var(--accent-primary)", margin: align === "center" ? "var(--space-4) auto 0" : "var(--space-4) 0 0" }} />}
      {description && (
        <p style={{ margin: "var(--space-4) 0 0", maxWidth: "62ch", marginLeft: align === "center" ? "auto" : undefined, marginRight: align === "center" ? "auto" : undefined, fontFamily: "var(--font-body)", fontSize: "var(--text-md)", lineHeight: "var(--leading-relaxed)", color: "var(--text-muted)" }}>{description}</p>
      )}
    </div>
  );
}
