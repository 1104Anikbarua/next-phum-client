import { ReactNode } from "react";

export type TItems = {
  name: string;
  path?: string;
  element?: ReactNode;
  children?: TItems[];
};

export type TRoute = {
  path: string;
  element: ReactNode;
};

export type TSidebarRoute =
  | {
      key: string;
      label: ReactNode;
      children?: TSidebarRoute[];
    }
  | undefined;

// type for those component that recive only reactnode as children
export interface IChildren {
  children: ReactNode;
}
