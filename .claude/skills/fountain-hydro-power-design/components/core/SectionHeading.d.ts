import * as React from "react";

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  /** All-caps tracked teal label above the heading. */
  eyebrow?: React.ReactNode;
  description?: React.ReactNode;
  level?: 1 | 2 | 3 | 4;
  align?: "left" | "center";
  /** The 3px teal rule — the system's signature separator. */
  rule?: boolean;
}

export declare function SectionHeading(props: SectionHeadingProps): JSX.Element;
