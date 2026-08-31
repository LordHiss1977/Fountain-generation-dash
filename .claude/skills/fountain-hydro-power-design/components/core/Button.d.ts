import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "inverse" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  /** Render an <Icon> here, never an emoji. */
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export declare function Button(props: ButtonProps): JSX.Element;
