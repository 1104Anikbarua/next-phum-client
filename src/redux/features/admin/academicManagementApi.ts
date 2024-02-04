import { IReduxResponse } from "../../../types";
import { IAcademicSemester } from "../../../types/academicSemester.types";

import { baseApi } from "../../api/baseApi";

export const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAcademicSemesters: builder.query({
      query: () => ({
        url: "/academic-semesters",
        method: "GET",
      }),
      transformResponse: (response: IReduxResponse<IAcademicSemester[]>) => {
        return { result: response.data, meta: response.meta };
      },
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
