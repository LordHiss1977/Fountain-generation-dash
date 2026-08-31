import React from "react";

const SCALES = {
  ui: { body: "var(--text-sm)", header: "var(--text-2xs)", pad: "11px 16px", padDense: "7px 12px" },
  slide: { body: "28px", header: "20px", pad: "18px 26px", padDense: "13px 20px" },
};

export function Table({ columns = [], rows = [], dense = false, zebra = true, scale = "ui", style, ...rest }) {
  const s = SCALES[scale] || SCALES.ui;
  const pad = dense ? s.padDense : s.pad;
  return (
    <div style={{ border: "1px solid var(--border-subtle)", borderRadius: "var(--radius-md)", overflow: "hidden", background: "var(--surface-card)", ...style }} {...rest}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-body)", fontSize: s.body }}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} style={{ textAlign: c.align || "left", padding: pad, background: "var(--surface-muted)", borderBottom: "1px solid var(--border-default)", fontFamily: "var(--font-brand)", fontSize: s.header, fontWeight: "var(--weight-semibold)", letterSpacing: "var(--tracking-wider)", textTransform: "uppercase", color: "var(--text-muted)", whiteSpace: "nowrap", width: c.width }}>{c.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.id || i} style={{ background: zebra && i % 2 ? "var(--surface-muted)" : "transparent" }}>
              {columns.map((c) => (
                <td key={c.key} style={{ textAlign: c.align || "left", padding: pad, borderBottom: i === rows.length - 1 ? "none" : "1px solid var(--border-subtle)", color: "var(--text-body)", fontVariantNumeric: c.align === "right" ? "tabular-nums" : undefined }}>
                  {c.render ? c.render(r) : r[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
