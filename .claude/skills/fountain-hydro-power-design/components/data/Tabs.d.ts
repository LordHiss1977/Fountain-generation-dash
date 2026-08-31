import * as React from "react";

export interface TabItem { value: string; label: React.ReactNode }

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  tabs: TabItem[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export declare function Tabs(props: TabsProps): JSX.Element;
