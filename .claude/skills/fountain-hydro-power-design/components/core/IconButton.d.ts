import * as React from "react";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** An <Icon>. */
  icon: React.ReactNode;
  /** Required — becomes aria-label and tooltip. */
  label: string;
  variant?: "ghost" | "primary";
  size?: "sm" | "md" | "lg";
}

export declare function IconButton(props: IconButtonProps): JSX.Element;
