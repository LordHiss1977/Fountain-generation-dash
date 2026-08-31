import * as React from "react";

export interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** primary = drop + full name + tagline; secondary = drop + FOUNTAIN; mark = drop only. */
  variant?: "primary" | "secondary" | "mark";
  /** Which artwork to use. "negative" is all-white, for photography and teal fills. */
  background?: "light" | "dark" | "negative";
  /** Rendered width in px. Minimums: primary 240, secondary 140, mark 24. */
  width?: number;
  /** Path to assets/logos relative to the page. */
  basePath?: string;
}

export declare function Logo(props: LogoProps): JSX.Element;
