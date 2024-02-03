import { baseApi } from "../../api/baseApi";

export const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAcademicSemesters: builder.query({
      query: () => ({
        url: "/academic-semesters",
        method: "GET",
      }),
    }),
    //finish
    addAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        body: data,
      }),
    }),
    //finish
  }),
});

export const { useGetAcademicSemestersQuery, useAddAcademicSemesterMutation } =
  academicManagementApi;
