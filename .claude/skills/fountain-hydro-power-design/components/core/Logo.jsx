import React from "react";

const SRC = {
  "primary-light": "logo-primary-light-bg.png",
  "primary-dark": "logo-primary-dark-bg.png",
  "primary-negative": "logo-primary-negative.png",
  "secondary-light": "logo-secondary-light-bg.png",
  "secondary-dark": "logo-secondary-dark-bg.png",
  "secondary-negative": "logo-secondary-negative.png",
  "mark": "mark-drop.png",
};

const RATIO = { primary: 7.77, secondary: 5.2, mark: 1 };

export function Logo({ variant = "primary", background = "light", width, basePath = "assets/logos", style, ...rest }) {
  const key = variant === "mark" ? "mark" : variant + "-" + background;
  const file = SRC[key] || SRC["primary-light"];
  const w = width || (variant === "mark" ? 48 : variant === "secondary" ? 180 : 300);
  return (
    <img
      src={basePath + "/" + file}
      alt="Fountain Hydro Power Corp."
      style={{ width: w, height: w / (RATIO[variant] || 1), objectFit: "contain", display: "block", ...style }}
      {...rest}
    />
  );
}
