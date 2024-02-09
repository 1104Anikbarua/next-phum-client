import { IArgs, IReduxResponse } from "../../../types";
import { ICourse } from "../../../types/course.types";
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
    }),
    //finish
  }),
});

export const {
  useAddRegisterSemesterMutation,
  useGetRegisterSemesterQuery,
  useChangeSemesterStatusMutation,
  useGetAllCoursesQuery,
  useAddCourseMutation,
} = courseManagementApi;