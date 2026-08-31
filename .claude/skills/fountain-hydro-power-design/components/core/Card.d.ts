import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  title?: React.ReactNode;
  /** Small all-caps teal label above the title. */
  eyebrow?: React.ReactNode;
  /** Right-aligned control in the header. */
  action?: React.ReactNode;
  padding?: string;
  tone?: "default" | "sunken" | "brand" | "inverse";
}

export declare function Card(props: CardProps): JSX.Element;
