import * as React from "react";

export interface TableColumn {
  key: string;
  header: React.ReactNode;
  align?: "left" | "center" | "right";
  width?: string | number;
  render?: (row: any) => React.ReactNode;
}

export interface TableProps extends React.HTMLAttributes<HTMLDivElement> {
  columns: TableColumn[];
  rows: any[];
  dense?: boolean;
  zebra?: boolean;
  /** "ui" = 14px screen scale; "slide" = 28px body / 20px header for a 1920x1080 stage. */
  scale?: "ui" | "slide";
}

export declare function Table(props: TableProps): JSX.Element;
