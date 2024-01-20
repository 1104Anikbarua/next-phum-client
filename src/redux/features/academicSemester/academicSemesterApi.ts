import { baseApi } from "../../api/baseApi";

export const academicSemesterApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    academicSemester: builder.query({
      query: () => ({
        url: "/academic-semesters",
        method: "GET",
        // headers,
      }),
    }),
  }),
});

export const { useAcademicSemesterQuery } = academicSemesterApi;
