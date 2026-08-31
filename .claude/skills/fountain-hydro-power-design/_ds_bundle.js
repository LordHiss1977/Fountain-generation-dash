/* @ds-bundle: {"format":4,"namespace":"FountainHydroPowerDesignSystem_39598f","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"KpiStat","sourcePath":"components/core/KpiStat.jsx"},{"name":"Logo","sourcePath":"components/core/Logo.jsx"},{"name":"SectionHeading","sourcePath":"components/core/SectionHeading.jsx"},{"name":"StatusPill","sourcePath":"components/core/StatusPill.jsx"},{"name":"ProgressBar","sourcePath":"components/data/ProgressBar.jsx"},{"name":"Table","sourcePath":"components/data/Table.jsx"},{"name":"Tabs","sourcePath":"components/data/Tabs.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"b310293c649b","components/core/Button.jsx":"e569e4e24602","components/core/Card.jsx":"16fef91b7366","components/core/Icon.jsx":"29f49d1fd13f","components/core/IconButton.jsx":"d3a1aff68731","components/core/KpiStat.jsx":"da3c8172b23b","components/core/Logo.jsx":"e7d1179dbbec","components/core/SectionHeading.jsx":"1908db1fce76","components/core/StatusPill.jsx":"c9b9333c48c9","components/data/ProgressBar.jsx":"a75346f42921","components/data/Table.jsx":"430c71220c52","components/data/Tabs.jsx":"051aa5556d76","components/forms/Checkbox.jsx":"94c14e0cc935","components/forms/Field.jsx":"f4043dab6d29","components/forms/Input.jsx":"6945260f0b73","components/forms/Radio.jsx":"d9ced6c93b98","components/forms/Select.jsx":"bb7ec3ae5bdc","components/forms/Switch.jsx":"981fe8bbcae6","ui_kits/em-dashboard/Orders.jsx":"d4d0d12be485","ui_kits/em-dashboard/Overview.jsx":"67500a23998e","ui_kits/em-dashboard/Shell.jsx":"e9ea86cf1712","ui_kits/em-dashboard/data.js":"2add2f5070e8"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.FountainHydroPowerDesignSystem_39598f = window.FountainHydroPowerDesignSystem_39598f || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const tones = {
  neutral: {
    bg: "var(--surface-sunken)",
    fg: "var(--text-muted)",
    bd: "var(--border-default)"
  },
  brand: {
    bg: "var(--surface-brand-soft)",
    fg: "var(--color-teal-800)",
    bd: "var(--color-teal-200)"
  },
  success: {
    bg: "#eef7e6",
    fg: "#43671f",
    bd: "#c6e3aa"
  },
  warning: {
    bg: "#fdf3e4",
    fg: "#8a5b12",
    bd: "#f2d6a6"
  },
  info: {
    bg: "#e6f4fd",
    fg: "#0f5f8c",
    bd: "#b6e0f8"
  },
  danger: {
    bg: "#fbeae8",
    fg: "#8f2c21",
    bd: "#f0bdb7"
  }
};
function Badge({
  tone = "neutral",
  solid = false,
  children,
  style,
  ...rest
}) {
  const t = tones[tone];
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      fontFamily: "var(--font-brand)",
      fontSize: "var(--text-2xs)",
      fontWeight: "var(--weight-semibold)",
      letterSpacing: "var(--tracking-wide)",
      textTransform: "uppercase",
      padding: "3px 8px",
      borderRadius: "var(--radius-sm)",
      background: solid ? t.fg : t.bg,
      color: solid ? "#fff" : t.fg,
      border: "1px solid " + (solid ? t.fg : t.bd),
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const sizes = {
  sm: {
    fontSize: "var(--text-xs)",
    padding: "6px 12px",
    gap: "6px",
    minHeight: 30
  },
  md: {
    fontSize: "var(--text-sm)",
    padding: "9px 18px",
    gap: "8px",
    minHeight: 38
  },
  lg: {
    fontSize: "var(--text-md)",
    padding: "12px 24px",
    gap: "10px",
    minHeight: 46
  }
};
const variants = {
  primary: {
    background: "var(--accent-primary)",
    color: "var(--text-on-brand)",
    border: "1px solid var(--accent-primary)"
  },
  secondary: {
    background: "transparent",
    color: "var(--accent-primary)",
    border: "1px solid var(--border-brand)"
  },
  ghost: {
    background: "transparent",
    color: "var(--text-body)",
    border: "1px solid transparent"
  },
  inverse: {
    background: "var(--color-white)",
    color: "var(--color-teal-800)",
    border: "1px solid var(--color-white)"
  },
  danger: {
    background: "var(--status-danger)",
    color: "var(--color-white)",
    border: "1px solid var(--status-danger)"
  }
};
const hovers = {
  primary: {
    background: "var(--accent-primary-hover)",
    borderColor: "var(--accent-primary-hover)"
  },
  secondary: {
    background: "var(--surface-brand-soft)"
  },
  ghost: {
    background: "var(--surface-muted)",
    borderColor: "var(--border-subtle)"
  },
  inverse: {
    background: "var(--color-teal-100)"
  },
  danger: {
    background: "#b93d31",
    borderColor: "#b93d31"
  }
};
function Button({
  variant = "primary",
  size = "md",
  disabled,
  fullWidth,
  iconLeft,
  iconRight,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    style: {
      display: fullWidth ? "flex" : "inline-flex",
      width: fullWidth ? "100%" : undefined,
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-brand)",
      fontWeight: "var(--weight-semibold)",
      letterSpacing: "var(--tracking-wide)",
      borderRadius: "var(--radius-md)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.45 : 1,
      transition: "background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard)",
      ...sizes[size],
      ...variants[variant],
      ...(!disabled && hover ? hovers[variant] : null),
      ...(!disabled && active && variant === "primary" ? {
        background: "var(--accent-primary-active)",
        borderColor: "var(--accent-primary-active)"
      } : null),
      ...style
    }
  }, rest), iconLeft, /*#__PURE__*/React.createElement("span", null, children), iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Card({
  title,
  eyebrow,
  action,
  padding = "var(--space-6)",
  tone = "default",
  children,
  style,
  ...rest
}) {
  const tones = {
    default: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)"
    },
    sunken: {
      background: "var(--surface-muted)",
      border: "1px solid var(--border-subtle)"
    },
    brand: {
      background: "var(--surface-brand-soft)",
      border: "1px solid var(--color-teal-200)"
    },
    inverse: {
      background: "var(--surface-inverse)",
      border: "1px solid #3a3a3a",
      color: "var(--color-white)"
    }
  };
  return /*#__PURE__*/React.createElement("section", _extends({
    style: {
      borderRadius: "var(--radius-md)",
      boxShadow: "var(--shadow-sm)",
      ...tones[tone],
      ...style
    }
  }, rest), (title || eyebrow || action) && /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "var(--space-4)",
      padding: padding,
      paddingBottom: 0
    }
  }, /*#__PURE__*/React.createElement("div", null, eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-brand)",
      fontSize: "var(--text-2xs)",
      fontWeight: "var(--weight-semibold)",
      letterSpacing: "var(--tracking-wider)",
      textTransform: "uppercase",
      color: "var(--text-brand)",
      marginBottom: 4
    }
  }, eyebrow), title && /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-lg)",
      fontWeight: "var(--weight-semibold)",
      color: tone === "inverse" ? "var(--color-white)" : "var(--text-body)"
    }
  }, title)), action), /*#__PURE__*/React.createElement("div", {
    style: {
      padding
    }
  }, children));
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Lucide is a FLAGGED SUBSTITUTION — see readme.md §5.
   Load the UMD build once per page:
   <script src="https://unpkg.com/lucide@0.469.0/dist/umd/lucide.js"></script>
   Swap this one file when a real FHPC glyph set exists. */

function toPascal(name) {
  return String(name).replace(/(^|[-_])(\w)/g, (_, __, c) => c.toUpperCase());
}
function Icon({
  name,
  size = 20,
  strokeWidth = 1.5,
  color = "currentColor",
  label,
  style,
  ...rest
}) {
  const lib = typeof window !== "undefined" && window.lucide && window.lucide.icons;
  const node = lib && (lib[toPascal(name)] || lib[name]);
  const base = {
    width: size,
    height: size,
    display: "inline-block",
    flex: "none",
    verticalAlign: "-0.125em",
    ...style
  };
  if (!node) return /*#__PURE__*/React.createElement("span", _extends({
    "aria-hidden": "true",
    style: base
  }, rest));
  const children = Array.isArray(node) ? node[2] : node.children || [];
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    role: label ? "img" : undefined,
    "aria-hidden": label ? undefined : "true",
    "aria-label": label,
    style: base
  }, rest), label ? /*#__PURE__*/React.createElement("title", null, label) : null, children.map(([tag, attrs], i) => React.createElement(tag, {
    key: i,
    ...attrs
  })));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const boxes = {
  sm: 30,
  md: 38,
  lg: 46
};
const glyphs = {
  sm: 16,
  md: 18,
  lg: 20
};
function IconButton({
  icon,
  label,
  variant = "ghost",
  size = "md",
  disabled,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const solid = variant === "primary";
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": label,
    title: label,
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: boxes[size],
      height: boxes[size],
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "var(--radius-md)",
      background: solid ? hover && !disabled ? "var(--accent-primary-hover)" : "var(--accent-primary)" : hover && !disabled ? "var(--surface-muted)" : "transparent",
      color: solid ? "var(--text-on-brand)" : "var(--text-muted)",
      border: "1px solid " + (solid ? "transparent" : hover && !disabled ? "var(--border-subtle)" : "transparent"),
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.45 : 1,
      transition: "background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)",
      fontSize: glyphs[size],
      ...style
    }
  }, rest), icon);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/KpiStat.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function KpiStat({
  label,
  value,
  unit,
  delta,
  deltaTone = "neutral",
  caption,
  align = "left",
  style,
  ...rest
}) {
  const deltaColor = {
    up: "var(--status-success)",
    down: "var(--status-danger)",
    neutral: "var(--text-muted)"
  }[deltaTone];
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      textAlign: align,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-brand)",
      fontSize: "var(--text-2xs)",
      fontWeight: "var(--weight-semibold)",
      letterSpacing: "var(--tracking-wider)",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      marginBottom: 6
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 6,
      justifyContent: align === "center" ? "center" : "flex-start"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-brand)",
      fontSize: "var(--text-4xl)",
      fontWeight: "var(--weight-semibold)",
      lineHeight: 1,
      color: "var(--text-body)",
      fontVariantNumeric: "tabular-nums"
    }
  }, value), unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-brand)",
      fontSize: "var(--text-lg)",
      color: "var(--text-muted)"
    }
  }, unit)), (delta || caption) && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      display: "flex",
      gap: 8,
      alignItems: "center",
      justifyContent: align === "center" ? "center" : "flex-start",
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-xs)"
    }
  }, delta && /*#__PURE__*/React.createElement("span", {
    style: {
      color: deltaColor,
      fontWeight: "var(--weight-semibold)",
      fontVariantNumeric: "tabular-nums"
    }
  }, delta), caption && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-faint)"
    }
  }, caption)));
}
Object.assign(__ds_scope, { KpiStat });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/KpiStat.jsx", error: String((e && e.message) || e) }); }

// components/core/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SRC = {
  "primary-light": "logo-primary-light-bg.png",
  "primary-dark": "logo-primary-dark-bg.png",
  "primary-negative": "logo-primary-negative.png",
  "secondary-light": "logo-secondary-light-bg.png",
  "secondary-dark": "logo-secondary-dark-bg.png",
  "secondary-negative": "logo-secondary-negative.png",
  "mark": "mark-drop.png"
};
const RATIO = {
  primary: 7.77,
  secondary: 5.2,
  mark: 1
};
function Logo({
  variant = "primary",
  background = "light",
  width,
  basePath = "assets/logos",
  style,
  ...rest
}) {
  const key = variant === "mark" ? "mark" : variant + "-" + background;
  const file = SRC[key] || SRC["primary-light"];
  const w = width || (variant === "mark" ? 48 : variant === "secondary" ? 180 : 300);
  return /*#__PURE__*/React.createElement("img", _extends({
    src: basePath + "/" + file,
    alt: "Fountain Hydro Power Corp.",
    style: {
      width: w,
      height: w / (RATIO[variant] || 1),
      objectFit: "contain",
      display: "block",
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Logo.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionHeading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SectionHeading({
  eyebrow,
  children,
  description,
  level = 2,
  align = "left",
  rule = true,
  style,
  ...rest
}) {
  const Tag = "h" + level;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      textAlign: align,
      ...style
    }
  }, rest), eyebrow && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-brand)",
      fontSize: "var(--text-xs)",
      fontWeight: "var(--weight-semibold)",
      letterSpacing: "var(--tracking-wider)",
      textTransform: "uppercase",
      color: "var(--text-brand)",
      marginBottom: "var(--space-2)"
    }
  }, eyebrow), /*#__PURE__*/React.createElement(Tag, {
    style: {
      margin: 0,
      fontFamily: "var(--font-body)",
      fontWeight: "var(--weight-semibold)",
      fontSize: level <= 2 ? "var(--text-3xl)" : "var(--text-2xl)",
      lineHeight: "var(--leading-snug)",
      color: "var(--text-body)"
    }
  }, children), rule && /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: "var(--rule-accent)",
      background: "var(--accent-primary)",
      margin: align === "center" ? "var(--space-4) auto 0" : "var(--space-4) 0 0"
    }
  }), description && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "var(--space-4) 0 0",
      maxWidth: "62ch",
      marginLeft: align === "center" ? "auto" : undefined,
      marginRight: align === "center" ? "auto" : undefined,
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-md)",
      lineHeight: "var(--leading-relaxed)",
      color: "var(--text-muted)"
    }
  }, description));
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/core/StatusPill.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const states = {
  operational: {
    label: "Operativa",
    color: "var(--status-success)"
  },
  planned: {
    label: "Mantenimiento planificado",
    color: "var(--status-warning)"
  },
  info: {
    label: "Informativo",
    color: "var(--status-info)"
  },
  fault: {
    label: "Fuera de servicio",
    color: "var(--status-danger)"
  },
  idle: {
    label: "Sin datos",
    color: "var(--color-gray-400)"
  }
};
function StatusPill({
  status = "operational",
  label,
  style,
  ...rest
}) {
  const s = states[status] || states.idle;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      fontFamily: "var(--font-brand)",
      fontSize: "var(--text-xs)",
      fontWeight: "var(--weight-semibold)",
      letterSpacing: "var(--tracking-wide)",
      color: "var(--text-body)",
      background: "var(--surface-card)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-pill)",
      padding: "4px 12px 4px 10px",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "var(--radius-circle)",
      background: s.color,
      flex: "none"
    }
  }), label || s.label);
}
Object.assign(__ds_scope, { StatusPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StatusPill.jsx", error: String((e && e.message) || e) }); }

// components/data/ProgressBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ProgressBar({
  value = 0,
  max = 100,
  tone = "brand",
  showValue = true,
  label,
  style,
  ...rest
}) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  const colors = {
    brand: "var(--accent-primary)",
    success: "var(--status-success)",
    warning: "var(--status-warning)",
    danger: "var(--status-danger)"
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: style
  }, rest), (label || showValue) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: 6,
      fontFamily: "var(--font-brand)",
      fontSize: "var(--text-xs)",
      letterSpacing: "var(--tracking-wide)",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      textTransform: "uppercase",
      fontWeight: "var(--weight-semibold)"
    }
  }, label), showValue && /*#__PURE__*/React.createElement("span", {
    style: {
      fontVariantNumeric: "tabular-nums",
      color: "var(--text-body)"
    }
  }, String(value).replace(".", ","), "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 6,
      background: "var(--surface-sunken)",
      borderRadius: "var(--radius-pill)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: pct + "%",
      height: "100%",
      background: colors[tone],
      borderRadius: "var(--radius-pill)",
      transition: "width var(--duration-slow) var(--ease-out)"
    }
  })));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/data/Table.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SCALES = {
  ui: {
    body: "var(--text-sm)",
    header: "var(--text-2xs)",
    pad: "11px 16px",
    padDense: "7px 12px"
  },
  slide: {
    body: "28px",
    header: "20px",
    pad: "18px 26px",
    padDense: "13px 20px"
  }
};
function Table({
  columns = [],
  rows = [],
  dense = false,
  zebra = true,
  scale = "ui",
  style,
  ...rest
}) {
  const s = SCALES[scale] || SCALES.ui;
  const pad = dense ? s.padDense : s.pad;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-md)",
      overflow: "hidden",
      background: "var(--surface-card)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontFamily: "var(--font-body)",
      fontSize: s.body
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, columns.map(c => /*#__PURE__*/React.createElement("th", {
    key: c.key,
    style: {
      textAlign: c.align || "left",
      padding: pad,
      background: "var(--surface-muted)",
      borderBottom: "1px solid var(--border-default)",
      fontFamily: "var(--font-brand)",
      fontSize: s.header,
      fontWeight: "var(--weight-semibold)",
      letterSpacing: "var(--tracking-wider)",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      whiteSpace: "nowrap",
      width: c.width
    }
  }, c.header)))), /*#__PURE__*/React.createElement("tbody", null, rows.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: r.id || i,
    style: {
      background: zebra && i % 2 ? "var(--surface-muted)" : "transparent"
    }
  }, columns.map(c => /*#__PURE__*/React.createElement("td", {
    key: c.key,
    style: {
      textAlign: c.align || "left",
      padding: pad,
      borderBottom: i === rows.length - 1 ? "none" : "1px solid var(--border-subtle)",
      color: "var(--text-body)",
      fontVariantNumeric: c.align === "right" ? "tabular-nums" : undefined
    }
  }, c.render ? c.render(r) : r[c.key])))))));
}
Object.assign(__ds_scope, { Table });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Table.jsx", error: String((e && e.message) || e) }); }

// components/data/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tabs({
  tabs = [],
  value,
  defaultValue,
  onChange,
  style,
  ...rest
}) {
  const [inner, setInner] = React.useState(defaultValue || tabs[0] && tabs[0].value);
  const active = value !== undefined ? value : inner;
  const pick = v => {
    if (value === undefined) setInner(v);
    onChange && onChange(v);
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist",
    style: {
      display: "flex",
      gap: "var(--space-6)",
      borderBottom: "1px solid var(--border-subtle)",
      ...style
    }
  }, rest), tabs.map(t => {
    const on = t.value === active;
    return /*#__PURE__*/React.createElement("button", {
      key: t.value,
      role: "tab",
      "aria-selected": on,
      onClick: () => pick(t.value),
      style: {
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "0 0 10px",
        marginBottom: -1,
        borderBottom: "var(--rule-accent) solid " + (on ? "var(--accent-primary)" : "transparent"),
        fontFamily: "var(--font-brand)",
        fontSize: "var(--text-sm)",
        fontWeight: "var(--weight-semibold)",
        letterSpacing: "var(--tracking-wide)",
        textTransform: "uppercase",
        color: on ? "var(--text-brand)" : "var(--text-muted)",
        transition: "color var(--duration-fast) var(--ease-standard)"
      }
    }, t.label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Checkbox({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled,
  style,
  ...rest
}) {
  const [inner, setInner] = React.useState(!!defaultChecked);
  const on = checked !== undefined ? checked : inner;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.45 : 1,
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-sm)",
      color: "var(--text-body)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    checked: on,
    disabled: disabled,
    onChange: e => {
      if (checked === undefined) setInner(e.target.checked);
      onChange && onChange(e);
    },
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      flex: "none",
      borderRadius: "var(--radius-sm)",
      border: "1px solid " + (on ? "var(--accent-primary)" : "var(--border-strong)"),
      background: on ? "var(--accent-primary)" : "var(--surface-card)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background var(--duration-fast) var(--ease-standard), border-color var(--duration-fast) var(--ease-standard)"
    }
  }, on && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 5,
      height: 9,
      borderRight: "2px solid #fff",
      borderBottom: "2px solid #fff",
      rotate: "45deg",
      marginTop: -2
    }
  })), label);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Field({
  label,
  hint,
  error,
  required,
  htmlFor,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      ...style
    }
  }, rest), label && /*#__PURE__*/React.createElement("label", {
    htmlFor: htmlFor,
    style: {
      fontFamily: "var(--font-brand)",
      fontSize: "var(--text-xs)",
      fontWeight: "var(--weight-semibold)",
      letterSpacing: "var(--tracking-wide)",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--status-danger)",
      marginLeft: 4
    }
  }, "*")), children, (hint || error) && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-xs)",
      color: error ? "var(--status-danger)" : "var(--text-faint)"
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const fieldBase = {
  fontFamily: "var(--font-body)",
  fontSize: "var(--text-sm)",
  color: "var(--text-body)",
  background: "var(--surface-card)",
  border: "1px solid var(--border-default)",
  borderRadius: "var(--radius-sm)",
  padding: "8px 10px",
  width: "100%",
  transition: "border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)"
};
function Input({
  invalid,
  iconLeft,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      width: "100%"
    }
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 10,
      display: "flex",
      color: "var(--text-faint)",
      pointerEvents: "none"
    }
  }, iconLeft), /*#__PURE__*/React.createElement("input", _extends({
    onFocus: e => {
      setFocus(true);
      rest.onFocus && rest.onFocus(e);
    },
    onBlur: e => {
      setFocus(false);
      rest.onBlur && rest.onBlur(e);
    }
  }, rest, {
    style: {
      ...fieldBase,
      paddingLeft: iconLeft ? 34 : fieldBase.padding.split(" ")[1],
      borderColor: invalid ? "var(--status-danger)" : focus ? "var(--border-brand)" : "var(--border-default)",
      boxShadow: focus ? "var(--shadow-focus)" : "none",
      opacity: rest.disabled ? 0.45 : 1,
      cursor: rest.disabled ? "not-allowed" : "text",
      ...style
    }
  })));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Radio({
  label,
  checked,
  name,
  value,
  onChange,
  disabled,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.45 : 1,
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-sm)",
      color: "var(--text-body)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "radio",
    name: name,
    value: value,
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 18,
      height: 18,
      flex: "none",
      borderRadius: "var(--radius-circle)",
      border: "1px solid " + (checked ? "var(--accent-primary)" : "var(--border-strong)"),
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--surface-card)"
    }
  }, checked && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 9,
      height: 9,
      borderRadius: "var(--radius-circle)",
      background: "var(--accent-primary)"
    }
  })), label);
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const fieldBase = {
  fontFamily: "var(--font-body)",
  fontSize: "var(--text-sm)",
  color: "var(--text-body)",
  background: "var(--surface-card)",
  border: "1px solid var(--border-default)",
  borderRadius: "var(--radius-sm)",
  padding: "8px 10px",
  width: "100%",
  transition: "border-color var(--duration-fast) var(--ease-standard), box-shadow var(--duration-fast) var(--ease-standard)"
};
function Select({
  options = [],
  invalid,
  style,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false)
  }, rest, {
    style: {
      ...fieldBase,
      appearance: "none",
      paddingRight: 32,
      borderColor: invalid ? "var(--status-danger)" : focus ? "var(--border-brand)" : "var(--border-default)",
      boxShadow: focus ? "var(--shadow-focus)" : "none",
      opacity: rest.disabled ? 0.45 : 1,
      cursor: rest.disabled ? "not-allowed" : "pointer",
      ...style
    }
  }), options.map(o => {
    const v = typeof o === "string" ? o : o.value;
    const l = typeof o === "string" ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: 10,
      top: "50%",
      transform: "translateY(-50%)",
      pointerEvents: "none",
      width: 8,
      height: 8,
      borderRight: "1.5px solid var(--text-faint)",
      borderBottom: "1.5px solid var(--text-faint)",
      marginTop: -3,
      rotate: "45deg"
    }
  }));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Switch({
  label,
  checked,
  defaultChecked,
  onChange,
  disabled,
  style,
  ...rest
}) {
  const [inner, setInner] = React.useState(!!defaultChecked);
  const on = checked !== undefined ? checked : inner;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.45 : 1,
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-sm)",
      color: "var(--text-body)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    role: "switch",
    checked: on,
    disabled: disabled,
    onChange: e => {
      if (checked === undefined) setInner(e.target.checked);
      onChange && onChange(e);
    },
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }, rest)), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 38,
      height: 22,
      flex: "none",
      borderRadius: "var(--radius-pill)",
      background: on ? "var(--accent-primary)" : "var(--color-gray-200)",
      position: "relative",
      transition: "background var(--duration-base) var(--ease-standard)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 3,
      left: on ? 19 : 3,
      width: 16,
      height: 16,
      borderRadius: "var(--radius-circle)",
      background: "#fff",
      boxShadow: "var(--shadow-xs)",
      transition: "left var(--duration-base) var(--ease-standard)"
    }
  })), label);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// ui_kits/em-dashboard/Orders.jsx
try { (() => {
const {
  Card,
  Table,
  StatusPill,
  Badge,
  Button,
  Input,
  Select,
  Field,
  Checkbox,
  Icon,
  Tabs,
  KpiStat
} = window.FountainHydroPowerDesignSystem_39598f;
function OrdersView({
  data,
  onSelect,
  selected
}) {
  const [q, setQ] = React.useState("");
  const [type, setType] = React.useState("todas");
  const [onlyOpen, setOnlyOpen] = React.useState(false);
  const rows = data.orders.filter(o => (type === "todas" || o.type === type) && (!onlyOpen || o.status !== "operational") && (o.desc.toLowerCase().includes(q.toLowerCase()) || o.id.toLowerCase().includes(q.toLowerCase())));
  const cols = [{
    key: "id",
    header: "OT",
    width: 92
  }, {
    key: "desc",
    header: "Descripción"
  }, {
    key: "loc",
    header: "Ubicación",
    width: 160
  }, {
    key: "type",
    header: "Tipo",
    width: 110
  }, {
    key: "owner",
    header: "Responsable",
    width: 130
  }, {
    key: "hours",
    header: "Horas",
    align: "right",
    width: 72
  }, {
    key: "statusLabel",
    header: "Estado",
    width: 180,
    render: r => /*#__PURE__*/React.createElement(StatusPill, {
      status: r.status,
      label: r.statusLabel
    })
  }, {
    key: "go",
    header: "",
    width: 44,
    align: "right",
    render: r => /*#__PURE__*/React.createElement("button", {
      onClick: () => onSelect(r),
      "aria-label": "Abrir " + r.id,
      style: {
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "var(--text-faint)",
        padding: 0
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-right",
      size: 18
    }))
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.6fr 1fr auto auto",
      gap: "var(--space-4)",
      alignItems: "end"
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Buscar",
    htmlFor: "q"
  }, /*#__PURE__*/React.createElement(Input, {
    id: "q",
    value: q,
    onChange: e => setQ(e.target.value),
    placeholder: "OT o descripci\xF3n",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 16
    })
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Tipo",
    htmlFor: "t"
  }, /*#__PURE__*/React.createElement(Select, {
    id: "t",
    value: type,
    onChange: e => setType(e.target.value),
    options: [{
      value: "todas",
      label: "Todas"
    }, {
      value: "Preventiva",
      label: "Preventiva"
    }, {
      value: "Correctiva",
      label: "Correctiva"
    }, {
      value: "Predictiva",
      label: "Predictiva"
    }]
  })), /*#__PURE__*/React.createElement(Checkbox, {
    label: "Solo abiertas",
    checked: onlyOpen,
    onChange: e => setOnlyOpen(e.target.checked),
    style: {
      paddingBottom: 9
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "plus",
      size: 16
    })
  }, "Nueva orden")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-4)",
      alignItems: "stretch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Table, {
    columns: cols,
    rows: rows,
    dense: true
  })), selected && /*#__PURE__*/React.createElement(Card, {
    style: {
      width: 316,
      flex: "none"
    },
    eyebrow: selected.type,
    title: selected.id,
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      onClick: () => onSelect(null)
    }, "Cerrar")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-md)",
      lineHeight: "var(--leading-snug)",
      marginBottom: "var(--space-4)"
    }
  }, selected.desc), /*#__PURE__*/React.createElement(StatusPill, {
    status: selected.status,
    label: selected.statusLabel
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "var(--space-5)",
      marginTop: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement(KpiStat, {
    label: "Horas",
    value: selected.hours,
    unit: "h"
  }), /*#__PURE__*/React.createElement(KpiStat, {
    label: "Ubicaci\xF3n",
    value: /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "var(--text-lg)"
      }
    }, selected.loc)
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--border-subtle)",
      marginTop: "var(--space-6)",
      paddingTop: "var(--space-4)",
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-sm)",
      color: "var(--text-muted)"
    }
  }, "Responsable: ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--text-body)"
    }
  }, selected.owner)))), rows.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-12)",
      textAlign: "center",
      color: "var(--text-faint)",
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-sm)",
      border: "1px dashed var(--border-default)",
      borderRadius: "var(--radius-md)"
    }
  }, "Sin \xF3rdenes que coincidan con el filtro."));
}
function Placeholder({
  label
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-16)",
      textAlign: "center",
      border: "1px dashed var(--border-default)",
      borderRadius: "var(--radius-md)",
      background: "var(--surface-card)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-brand)",
      fontSize: "var(--text-xs)",
      letterSpacing: "var(--tracking-wider)",
      textTransform: "uppercase",
      color: "var(--text-brand)"
    }
  }, label), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "10px auto 0",
      maxWidth: "46ch",
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-sm)",
      lineHeight: "var(--leading-relaxed)",
      color: "var(--text-muted)"
    }
  }, "No se proporcion\xF3 una fuente de dise\xF1o para esta vista. Se deja intencionalmente en blanco en lugar de inventar una pantalla."));
}
Object.assign(window, {
  OrdersView,
  Placeholder
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/em-dashboard/Orders.jsx", error: String((e && e.message) || e) }); }

// ui_kits/em-dashboard/Overview.jsx
try { (() => {
const {
  Card,
  KpiStat,
  Table,
  StatusPill,
  ProgressBar,
  SectionHeading,
  Badge,
  Button,
  Icon
} = window.FountainHydroPowerDesignSystem_39598f;
function AvailabilityChart({
  daily
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 14,
      height: 168,
      paddingTop: 8
    }
  }, daily.map(d => {
    const h = (d.availability - 88) / 12 * 100;
    const low = d.availability < 98;
    return /*#__PURE__*/React.createElement("div", {
      key: d.d,
      style: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-brand)",
        fontSize: "var(--text-2xs)",
        color: "var(--text-muted)",
        fontVariantNumeric: "tabular-nums"
      }
    }, d.availability, "%"), /*#__PURE__*/React.createElement("div", {
      style: {
        width: "100%",
        height: 112,
        background: "var(--surface-sunken)",
        display: "flex",
        alignItems: "flex-end"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: "100%",
        height: h + "%",
        background: low ? "var(--status-warning)" : "var(--accent-primary)",
        transition: "height var(--duration-slow) var(--ease-out)"
      }
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-brand)",
        fontSize: "var(--text-2xs)",
        letterSpacing: "var(--tracking-wide)",
        textTransform: "uppercase",
        color: "var(--text-faint)"
      }
    }, d.d));
  }));
}
function NoteList({
  notes
}) {
  const colors = {
    danger: "var(--status-danger)",
    warning: "var(--status-warning)",
    success: "var(--status-success)"
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, notes.map((n, i) => /*#__PURE__*/React.createElement("div", {
    key: n.title,
    style: {
      display: "flex",
      gap: 12,
      padding: "14px 0",
      borderTop: i ? "1px solid var(--border-subtle)" : "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "var(--radius-circle)",
      background: colors[n.tone],
      flex: "none",
      marginTop: 6
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-sm)",
      fontWeight: "var(--weight-semibold)"
    }
  }, n.title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "4px 0 0",
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-sm)",
      lineHeight: "var(--leading-relaxed)",
      color: "var(--text-muted)"
    }
  }, n.body)))));
}
function Overview({
  data,
  onOpenOrder
}) {
  const unitCols = [{
    key: "name",
    header: "Activo"
  }, {
    key: "status",
    header: "Estado",
    width: 210,
    render: r => /*#__PURE__*/React.createElement(StatusPill, {
      status: r.status
    })
  }, {
    key: "mw",
    header: "MW",
    align: "right",
    width: 70
  }, {
    key: "availability",
    header: "Disponibilidad",
    width: 170,
    render: r => /*#__PURE__*/React.createElement(ProgressBar, {
      value: r.availability,
      tone: r.availability > 97 ? "brand" : "warning",
      label: ""
    })
  }, {
    key: "hours",
    header: "Horas",
    align: "right",
    width: 80
  }];
  const orderCols = [{
    key: "id",
    header: "OT",
    width: 92
  }, {
    key: "desc",
    header: "Descripción"
  }, {
    key: "type",
    header: "Tipo",
    width: 110
  }, {
    key: "hours",
    header: "Horas",
    align: "right",
    width: 72
  }, {
    key: "statusLabel",
    header: "Estado",
    width: 180,
    render: r => /*#__PURE__*/React.createElement(StatusPill, {
      status: r.status,
      label: r.statusLabel
    })
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: "var(--space-4)"
    }
  }, data.kpis.map(k => /*#__PURE__*/React.createElement("div", {
    key: k.label,
    style: {
      background: "var(--surface-card)",
      border: "1px solid var(--border-subtle)",
      borderTop: "3px solid var(--accent-primary)",
      borderRadius: "var(--radius-md)",
      boxShadow: "var(--shadow-sm)",
      padding: "var(--space-5)"
    }
  }, /*#__PURE__*/React.createElement(KpiStat, k)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.55fr 1fr",
      gap: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Operaci\xF3n",
    title: "Disponibilidad diaria",
    action: /*#__PURE__*/React.createElement(Badge, {
      tone: "neutral"
    }, "Semana ", data.week)
  }, /*#__PURE__*/React.createElement(AvailabilityChart, {
    daily: data.daily
  })), /*#__PURE__*/React.createElement(Card, {
    eyebrow: "Novedades",
    title: "Notas del per\xEDodo"
  }, /*#__PURE__*/React.createElement(NoteList, {
    notes: data.notes
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeading, {
    level: 3,
    eyebrow: "Activos",
    rule: false
  }, "Estado de unidades"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(Table, {
    columns: unitCols,
    rows: data.units
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    level: 3,
    eyebrow: "Mantenimiento",
    rule: false
  }, "\xD3rdenes de trabajo"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 16
    }),
    onClick: onOpenOrder
  }, "Ver todas")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "var(--space-4)"
    }
  }, /*#__PURE__*/React.createElement(Table, {
    columns: orderCols,
    rows: data.orders,
    dense: true
  }))));
}
Object.assign(window, {
  Overview,
  AvailabilityChart,
  NoteList
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/em-dashboard/Overview.jsx", error: String((e && e.message) || e) }); }

// ui_kits/em-dashboard/Shell.jsx
try { (() => {
const {
  Logo,
  Icon,
  IconButton,
  Badge,
  Button
} = window.FountainHydroPowerDesignSystem_39598f;
const NAV = [{
  id: "resumen",
  label: "Resumen",
  icon: "layout-dashboard"
}, {
  id: "ordenes",
  label: "Órdenes de trabajo",
  icon: "clipboard-list"
}, {
  id: "activos",
  label: "Activos",
  icon: "cog"
}, {
  id: "indicadores",
  label: "Indicadores",
  icon: "trending-up"
}, {
  id: "informes",
  label: "Informes",
  icon: "file-text"
}];
function Sidebar({
  view,
  onNav
}) {
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      width: 244,
      flex: "none",
      background: "var(--color-teal-900)",
      display: "flex",
      flexDirection: "column",
      padding: "22px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 20px 24px"
    }
  }, /*#__PURE__*/React.createElement(Logo, {
    variant: "secondary",
    background: "negative",
    width: 150,
    basePath: "../../assets/logos"
  })), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2,
      padding: "0 10px"
    }
  }, NAV.map(n => {
    const on = n.id === view;
    return /*#__PURE__*/React.createElement("button", {
      key: n.id,
      onClick: () => onNav(n.id),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 11,
        padding: "10px 12px",
        border: "none",
        borderLeft: "3px solid " + (on ? "var(--color-teal-300)" : "transparent"),
        background: on ? "rgba(255,255,255,.10)" : "transparent",
        cursor: "pointer",
        textAlign: "left",
        color: on ? "#fff" : "rgba(255,255,255,.66)",
        borderRadius: "0 var(--radius-sm) var(--radius-sm) 0",
        fontFamily: "var(--font-brand)",
        fontSize: "var(--text-sm)",
        fontWeight: "var(--weight-semibold)",
        letterSpacing: "var(--tracking-wide)",
        transition: "background var(--duration-fast) var(--ease-standard), color var(--duration-fast) var(--ease-standard)"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: n.icon,
      size: 18
    }), n.label);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      padding: "0 20px",
      borderTop: "1px solid rgba(255,255,255,.12)",
      paddingTop: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-brand)",
      fontSize: "var(--text-2xs)",
      letterSpacing: "var(--tracking-wider)",
      textTransform: "uppercase",
      color: "rgba(255,255,255,.45)"
    }
  }, "Central"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-brand)",
      fontSize: "var(--text-md)",
      fontWeight: "var(--weight-semibold)",
      color: "#fff",
      marginTop: 4
    }
  }, "Bajo Fr\xEDo"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-xs)",
      color: "rgba(255,255,255,.5)",
      marginTop: 2
    }
  }, "Chiriqu\xED, Panam\xE1")));
}
function Topbar({
  title,
  week,
  period,
  onExport
}) {
  return /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-6)",
      padding: "16px var(--space-8)",
      background: "var(--surface-card)",
      borderBottom: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-xl)",
      fontWeight: "var(--weight-semibold)"
    }
  }, title), /*#__PURE__*/React.createElement(Badge, {
    tone: "brand"
  }, "Semana ", week)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: "var(--text-xs)",
      color: "var(--text-faint)",
      marginTop: 3
    }
  }, period)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "search",
      size: 18
    }),
    label: "Buscar"
  }), /*#__PURE__*/React.createElement(IconButton, {
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "bell",
      size: 18
    }),
    label: "Alertas"
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "download",
      size: 16
    }),
    onClick: onExport
  }, "Exportar informe"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 34,
      height: 34,
      borderRadius: "var(--radius-circle)",
      background: "var(--surface-brand-soft)",
      color: "var(--color-teal-800)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-brand)",
      fontSize: "var(--text-xs)",
      fontWeight: "var(--weight-semibold)"
    }
  }, "MG")));
}
Object.assign(window, {
  Sidebar,
  Topbar,
  NAV
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/em-dashboard/Shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/em-dashboard/data.js
try { (() => {
window.EMData = {
  week: 24,
  period: "13 – 19 de junio de 2022",
  kpis: [{
    label: "Disponibilidad",
    value: "98,4",
    unit: "%",
    delta: "+1,2 pp",
    deltaTone: "up",
    caption: "vs. semana 23"
  }, {
    label: "Generación",
    value: "3,42",
    unit: "GWh",
    delta: "−3,1 %",
    deltaTone: "down",
    caption: "semana"
  }, {
    label: "Órdenes cerradas",
    value: "7",
    unit: "",
    delta: "de 8",
    deltaTone: "neutral",
    caption: "plan semanal"
  }, {
    label: "Horas-hombre",
    value: "512",
    unit: "h",
    delta: "+46 h",
    deltaTone: "neutral",
    caption: "acumulado"
  }],
  units: [{
    id: "u1",
    name: "Unidad 1",
    status: "operational",
    mw: "28,4",
    availability: 99.8,
    hours: "168,0"
  }, {
    id: "u2",
    name: "Unidad 2",
    status: "planned",
    mw: "22,1",
    availability: 94.6,
    hours: "159,0"
  }, {
    id: "capt",
    name: "Captación",
    status: "fault",
    mw: "—",
    availability: 100,
    hours: "168,0"
  }, {
    id: "subest",
    name: "Subestación",
    status: "operational",
    mw: "—",
    availability: 100,
    hours: "168,0"
  }],
  orders: [{
    id: "OT-1042",
    desc: "Inspección de rodete",
    loc: "Unidad 1",
    type: "Preventiva",
    hours: "12,5",
    status: "operational",
    statusLabel: "Cerrada",
    owner: "J. Ríos"
  }, {
    id: "OT-1043",
    desc: "Cambio de aceite del regulador",
    loc: "Unidad 2",
    type: "Preventiva",
    hours: "8,0",
    status: "operational",
    statusLabel: "Cerrada",
    owner: "M. Guerra"
  }, {
    id: "OT-1044",
    desc: "Prueba de protecciones diferenciales",
    loc: "Subestación",
    type: "Preventiva",
    hours: "6,0",
    status: "operational",
    statusLabel: "Cerrada",
    owner: "A. Pineda"
  }, {
    id: "OT-1048",
    desc: "Termografía de tableros de control",
    loc: "Casa de máquinas",
    type: "Predictiva",
    hours: "4,0",
    status: "planned",
    statusLabel: "En ejecución",
    owner: "J. Ríos"
  }, {
    id: "OT-1049",
    desc: "Limpieza de rejilla de toma",
    loc: "Captación",
    type: "Preventiva",
    hours: "9,5",
    status: "operational",
    statusLabel: "Cerrada",
    owner: "L. Batista"
  }, {
    id: "OT-1051",
    desc: "Falla de sensor de nivel",
    loc: "Captación",
    type: "Correctiva",
    hours: "3,25",
    status: "fault",
    statusLabel: "Abierta",
    owner: "M. Guerra"
  }, {
    id: "OT-1052",
    desc: "Ajuste de acoplamiento de bomba",
    loc: "Unidad 2",
    type: "Correctiva",
    hours: "5,0",
    status: "operational",
    statusLabel: "Cerrada",
    owner: "A. Pineda"
  }],
  daily: [{
    d: "Lun",
    availability: 100,
    gen: 0.52
  }, {
    d: "Mar",
    availability: 100,
    gen: 0.55
  }, {
    d: "Mié",
    availability: 94,
    gen: 0.44
  }, {
    d: "Jue",
    availability: 92,
    gen: 0.41
  }, {
    d: "Vie",
    availability: 100,
    gen: 0.53
  }, {
    d: "Sáb",
    availability: 100,
    gen: 0.51
  }, {
    d: "Dom",
    availability: 100,
    gen: 0.46
  }],
  notes: [{
    title: "Sensor de nivel en captación",
    body: "El transmisor de nivel presentó lecturas erráticas el jueves. Se instaló un equipo de respaldo; la sustitución definitiva queda programada para la semana 25.",
    tone: "danger"
  }, {
    title: "Parada programada Unidad 2",
    body: "Cambio de aceite del regulador ejecutado el miércoles y jueves, dentro de la ventana prevista de 9 horas.",
    tone: "warning"
  }, {
    title: "Sin hallazgos de seguridad",
    body: "No se reportaron incidentes ni condiciones inseguras durante el período.",
    tone: "success"
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/em-dashboard/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.KpiStat = __ds_scope.KpiStat;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.StatusPill = __ds_scope.StatusPill;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.Table = __ds_scope.Table;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

})();
