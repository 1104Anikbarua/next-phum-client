import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: () => ({
        url: "/user/get-me",
        method: "GET",
      }),
    }),
    //finish
    addStudent: builder.mutation({
      query: (data) => {
        return {
          url: "/user/create-student",
          method: "POST",
          body: data,
        };
      },
    }),
    //finish
  }),
});

export const { useAddStudentMutation, useGetStudentsQuery } = userManagementApi;
