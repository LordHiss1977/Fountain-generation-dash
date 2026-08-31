import * as React from "react";

/** Intentional addition — see readme.md "Intentional additions". */
export interface KpiStatProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  value: React.ReactNode;
  unit?: React.ReactNode;
  /** e.g. "+1,2 pp". Use the Spanish decimal comma. */
  delta?: React.ReactNode;
  deltaTone?: "up" | "down" | "neutral";
  caption?: React.ReactNode;
  align?: "left" | "center";
}

export declare function KpiStat(props: KpiStatProps): JSX.Element;
