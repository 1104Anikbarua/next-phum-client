import { IArgs, IReduxResponse } from "../../../types";
import { ICourse } from "../../../types/course.types";
import { IFacultyByCourse } from "../../../types/facultyByCourse.types";
import { IOfferedCourse } from "../../../types/offeredCourse.types";
import { ISemesterRegistration } from "../../../types/semesterRegistration.types";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRegisterSemester: builder.query({
      query: () => ({
        url: "/semester-registrations",
        method: "GET",
      }),
      transformResponse: (
        response: IReduxResponse<ISemesterRegistration[]>
      ) => {
        return {
          response: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ["registerSemester"],
    }),
    //finish
    addRegisterSemester: builder.mutation({
      query: (registerSemesterInfo) => ({
        url: "/semester-registrations/create-semester-registration",
        method: "POST",
        body: registerSemesterInfo,
      }),
      invalidatesTags: ["registerSemester"],
    }),
    //finish
    changeSemesterStatus: builder.mutation({
      query: (args) => {
        //
        return {
          url: `/semester-registrations/${args.id}`,
          method: "PATCH",
          body: args.status,
        };
      },
      invalidatesTags: ["registerSemester"],
    }),
    //finish
    getAllCourses: builder.query({
      query: (args) => {
        //
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: IArgs) => params.append(item.name, item.value));
        }
        return {
          url: "/courses",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: IReduxResponse<ICourse[]>) => {
        return {
          response: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["course"],
    }),
    // finish
    addCourse: builder.mutation({
      query: (courseInfo) => {
        return {
          url: "/courses/create-course",
          method: "POST",
          body: courseInfo,
        };
      },
      invalidatesTags: ["course"],
    }),
    //finish
    addCourseFaculty: builder.mutation({
      query: (args) => {
        return {
          url: `/courses/${args.id}/assign-faculties`,
          method: "PUT",
          body: args.courseFaculty,
        };
      },
      invalidatesTags: ["faculty"],
    }),
    //finish
    getOfferedCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: IArgs) => params.append(item.name, item.value));
        }
        return {
          url: "/offered-courses",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (response: IReduxResponse<IOfferedCourse[]>) => {
        return { response: response.data, meta: response.meta };
      },
    }),
    //finish
    addOfferedCourse: builder.mutation({
      query: (courseInfo) => {
        return {
          url: "/offered-courses/create-offered-course",
          method: "POST",
          body: courseInfo,
        };
      },
    }),
    //finish
    getFacultiesByCourseId: builder.query({
      query: (args) => {
        return {
          url: `/courses/${args}/faculties`,
          method: "GET",
          // params: args,
        };
      },
      transformResponse: (response: IReduxResponse<IFacultyByCourse>) => {
        return { response: response.data };
      },
    }),
    // finish
  }),
});

export const {
  useAddRegisterSemesterMutation,
  useGetRegisterSemesterQuery,
  useChangeSemesterStatusMutation,
  useGetAllCoursesQuery,
  useAddCourseMutation,
  useAddCourseFacultyMutation,
  useAddOfferedCourseMutation,
  useGetOfferedCoursesQuery,
  useGetFacultiesByCourseIdQuery,
} = courseManagementApi;
