import { IArgs, IReduxResponse } from "../../../types";
import { academicDepartment } from "../../../types/academicDepartment.types";
import { IAcademicFaculty } from "../../../types/academicFaculty.types";
import { IAcademicSemester } from "../../../types/academicSemester.types";

import { baseApi } from "../../api/baseApi";

export const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAcademicSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        // params.append(args[0]?.value, args[0]?.name);

        if (args) {
          args?.forEach((item: IArgs) => {
            params.append(item?.name, item?.value);
          });
        }

        console.log(args);
        return {
          url: "/academic-semesters",
          method: "GET",
          params: params,
        };
      },
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

    getAcademicFaculties: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: IArgs) => {
            params.append(item.name, item.value);
          });
        }

        return {
          url: "/academic-faculties/faculties",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: IReduxResponse<IAcademicFaculty[]>) => {
        return { result: response.data, meta: response.meta };
      },
    }),
    //finish

    addAcademicFaculty: builder.mutation({
      query: (facultyInfo) => {
        return {
          url: "/academic-faculties/faculties",
          method: "POST",
          body: facultyInfo,
        };
      },
    }),
    //finish

    getAcademicDepartment: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: IArgs) => params.append(item.name, item.value));
        }
        return {
          url: "/academic-departments/departments",
          method: "GET",
        };
      },
      transformResponse: (response: IReduxResponse<academicDepartment[]>) => {
        return { result: response.data, meta: response.meta };
      },
    }),
    //finish
    addAcademicDepartment: builder.mutation({
      query: (departmentInfo) => {
        return {
          url: "/academic-departments/department",
          method: "POST",
          body: departmentInfo,
        };
      },
    }),
    //finish
  }),
});

export const {
  useGetAcademicSemestersQuery,
  useAddAcademicSemesterMutation,
  useGetAcademicFacultiesQuery,
  useAddAcademicFacultyMutation,
  useGetAcademicDepartmentQuery,
  useAddAcademicDepartmentMutation,
} = academicManagementApi;
