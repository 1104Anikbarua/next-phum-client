import { IArgs, IReduxResponse } from "../../../types";
import { IFaculty } from "../../../types/faculty.types";
import { IStudent } from "../../../types/student.types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudents: builder.query({
      query: (args) => {
        const param = new URLSearchParams();
        if (args) {
          args.forEach((element: IArgs) =>
            param.append(element.name, element.value)
          );
        }
        // console.log(args);
        return {
          url: "/student/query",
          method: "GET",
          params: param,
        };
      },
      transformResponse: (response: IReduxResponse<IStudent[]>) => {
        // console.log(response);

        return { response: response.data, meta: response.meta };
      },
      providesTags: ["student"],
    }),
    //finish
    getStudent: builder.query({
      query: (query) => {
        return {
          url: `/student/${query}`,
          method: "GET",
        };
      },
      providesTags: ["student"],
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
      // invalidatesTags: ["student"],
    }),
    //finish
    setStudent: builder.mutation({
      query: ({ customId, ...studentUpdatedInfo }) => {
        return {
          url: `/student/${customId}`,
          method: "PATCH",
          body: studentUpdatedInfo,
        };
      },
      invalidatesTags: ["student"],
    }),
    //finish
    setStatus: builder.mutation({
      query: ({ id, status }) => {
        //
        //
        return {
          url: `/user/${id}/change-status`,
          method: "POST",
          body: status,
        };
      },
      invalidatesTags: ["student", "faculty"],
    }),
    //finish
    getFaculties: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((item: IArgs) => params.append(item.name, item.value));
        }
        return {
          url: "/faculties",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: IReduxResponse<IFaculty[]>) => {
        return {
          response: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ["faculty"],
    }),
    //finish
    addFaculty: builder.mutation({
      query: (facultyInfo) => {
        return {
          url: "/user/create-faculties",
          method: "POST",
          body: facultyInfo,
        };
      },
      invalidatesTags: ["faculty"],
    }),
    //finish
    //todo donot use
    setFacultyStatus: builder.mutation({
      query: (args) => {
        return {
          url: `/faculties/${args.id}`,
          method: "PATCH",
          body: args,
        };
      },
    }),
    // finish,
  }),
});

export const {
  useAddStudentMutation,
  useGetStudentsQuery,
  useGetStudentQuery,
  useSetStudentMutation,
  useSetStatusMutation,
  useGetFacultiesQuery,
  useAddFacultyMutation,
  useSetFacultyStatusMutation,
} = userManagementApi;
