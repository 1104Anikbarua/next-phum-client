import { baseApi } from "../../api/baseApi";

export const academicSemesterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    academicSemester: builder.query({
      query: () => ({
        url: "/academic-semesters",
        method: "GET",
      }),
    }),
  }),
});

export const { useAcademicSemesterQuery } = academicSemesterApi;
