import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { login, logout } from "../features/auth/authSlice";
import { toast } from "sonner";
import { IError } from "../../types";
// import { TResponse } from "../../types/global";

// befor refactor stage-1
const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `${token}`);
    }
    return headers;
  },
});

const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // call the base query
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 400 || result.error?.status === 404) {
    const errorResponse = result.error.data as IError;
    toast.error(errorResponse?.data?.message, {
      duration: 2000,
    });
  }
  /**
   * if accesstoken expired send refresh token to the server from cookie so that a new access token is send from server
   *
   * */
  if (result?.error && result?.error?.status === 401) {
    const refreshResult = await fetch(
      "http://localhost:5000/api/v1/auth/refresh-token",
      {
        method: "POST",
        credentials: "include",
      }
    );
    const userResult = await refreshResult.json();

    // if user have new access token then set the user in the local state
    if (userResult?.data?.accessToken) {
      console.log(userResult);
      // we can destructure dispatch and localstate from api
      //api = { signal, dispatch, getState },
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(login({ user, token: userResult?.data?.accessToken }));

      result = await baseQuery(args, api, extraOptions);
    }
    // if the user don't have refresh token then logout the user from app
    else {
      api.dispatch(logout());
    }
  }

  return result;
};
export const baseApi = createApi({
  reducerPath: "baseApi",
  // befor refactor stage-2
  // baseQuery,
  baseQuery: customBaseQuery,
  tagTypes: ["student"],
  endpoints: () => ({}),
});
