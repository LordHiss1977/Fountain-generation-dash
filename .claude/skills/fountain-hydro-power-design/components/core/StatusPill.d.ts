import * as React from "react";

/** Intentional addition — see readme.md "Intentional additions". */
export interface StatusPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: "operational" | "planned" | "info" | "fault" | "idle";
  /** Overrides the default Spanish label. */
  label?: string;
}

export declare function StatusPill(props: StatusPillProps): JSX.Element;
