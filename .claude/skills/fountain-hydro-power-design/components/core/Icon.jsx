import React from "react";

/* Lucide is a FLAGGED SUBSTITUTION — see readme.md §5.
   Load the UMD build once per page:
   <script src="https://unpkg.com/lucide@0.469.0/dist/umd/lucide.js"></script>
   Swap this one file when a real FHPC glyph set exists. */

function toPascal(name) {
  return String(name).replace(/(^|[-_])(\w)/g, (_, __, c) => c.toUpperCase());
}

export function Icon({ name, size = 20, strokeWidth = 1.5, color = "currentColor", label, style, ...rest }) {
  const lib = typeof window !== "undefined" && window.lucide && window.lucide.icons;
  const node = lib && (lib[toPascal(name)] || lib[name]);
  const base = {
    width: size, height: size, display: "inline-block", flex: "none",
    verticalAlign: "-0.125em", ...style,
  };
  if (!node) return <span aria-hidden="true" style={base} {...rest} />;
  const children = Array.isArray(node) ? node[2] : node.children || [];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
      role={label ? "img" : undefined} aria-hidden={label ? undefined : "true"}
      aria-label={label} style={base} {...rest}
    >
      {label ? <title>{label}</title> : null}
      {children.map(([tag, attrs], i) => React.createElement(tag, { key: i, ...attrs }))}
    </svg>
  );
}
