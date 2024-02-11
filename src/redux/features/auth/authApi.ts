import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => {
        return {
          url: "/auth/login",
          method: "POST",
          body: userInfo,
        };
      },
    }),
    //finish
    changePassword: builder.mutation({
      query: (args) => {
        return {
          url: "/auth/change-password",
          method: "POST",
          body: args,
        };
      },
    }),
    //finish
  }),
});

export const { useLoginMutation, useChangePasswordMutation } = authApi;
