import * as React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "neutral" | "brand" | "success" | "warning" | "info" | "danger";
  /** Filled instead of tinted. */
  solid?: boolean;
}

export declare function Badge(props: BadgeProps): JSX.Element;
