import { BaseQueryApi } from "@reduxjs/toolkit/query";
export interface IError {
  //   error:
  data: {
    errorIssue: { path: string; message: string }[];
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
}

export interface IMeta {
  count: number;
  limit: number;
  page: number;
  totalPage: number;
}

export interface IResponse<T> {
  data?: T;
  error?: IError;
  meta?: IMeta;
  message: string;
  success: boolean;
}

export interface IFilter {
  name: string;
  value: React.Key | boolean;
}
export interface IArgs {
  name: string;
  value: string;
}

export interface IReduxResponse<T> extends IResponse<T>, BaseQueryApi {}
