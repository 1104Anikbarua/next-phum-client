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
      query: (studentInfo) => ({
        url: "/user/create-student",
        method: "POST",
        body: studentInfo,
      }),
    }),
    //finish
  }),
});

export const { useAddStudentMutation, useGetStudentsQuery } = userManagementApi;
