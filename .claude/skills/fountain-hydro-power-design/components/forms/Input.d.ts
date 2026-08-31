import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
  /** An <Icon>, rendered inside the left edge. */
  iconLeft?: React.ReactNode;
}

export declare function Input(props: InputProps): JSX.Element;
