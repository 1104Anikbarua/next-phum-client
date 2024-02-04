import { BaseQueryApi } from "@reduxjs/toolkit/query";
export type TError = {
  //   error:
  data: {
    errorIssue: { path: string; message: string }[];
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export interface IMeta {
  count: number;
  limit: number;
  page: number;
  totalPage: number;
}

export type TResponse<T> = {
  data?: T;
  error?: TError;
  meta?: IMeta;
  message: string;
  success: boolean;
};

export interface IReduxResponse<T> extends TResponse<T>, BaseQueryApi {}
