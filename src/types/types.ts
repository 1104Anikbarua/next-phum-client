import { ReactNode } from "react";

export type TItems = {
  name?: string; //fix
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
      key: string | undefined; //fix
      label: ReactNode;
      children?: TSidebarRoute[];
    }
  | undefined; //fix

// type for those component that recive only reactnode as children
export interface IChildren {
  children: ReactNode;
  role: string | undefined;
}
