import * as React from "react";

export interface IconProps extends React.SVGAttributes<SVGElement> {
  /** Lucide icon name, kebab-case or PascalCase (e.g. "activity", "ArrowRight"). */
  name: string;
  /** Pixel box. 16 inline with text, 20 default, 24 in toolbars. */
  size?: number;
  /** Always 1.5 in this system. */
  strokeWidth?: number;
  color?: string;
  /** Accessible name. Omit for decorative icons. */
  label?: string;
}

export declare function Icon(props: IconProps): JSX.Element;
