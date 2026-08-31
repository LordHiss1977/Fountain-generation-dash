import * as React from "react";

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  tone?: "brand" | "success" | "warning" | "danger";
  showValue?: boolean;
  label?: React.ReactNode;
}

export declare function ProgressBar(props: ProgressBarProps): JSX.Element;
