import { IArgs, IReduxResponse } from "../../../types";
import { IStudentOfferedCourse } from "../../../types/studentOfferedCourse.types";
import { baseApi } from "../../api/baseApi";

const studentCourseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyOfferedCourse: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: IArgs) => params.append(item.name, item.value));
        }
        return {
          url: "/offered-courses/my-offered-course",
          method: "GET",
          //   params: params,
        };
      },
      transformResponse: (
        response: IReduxResponse<IStudentOfferedCourse[]>
      ) => {
        return {
          resposne: response.data,
          meta: response.meta,
        };
      },
      providesTags: ["offeredCourse"],
    }),
    // finish

    addEnrollCourse: builder.mutation({
      query: (args) => {
        return {
          url: "/enrolled-courses/register-enrolled-course",
          method: "POST",
          body: args,
        };
      },
      invalidatesTags: ["offeredCourse"],
    }),
    //finish
  }),
});
export const { useGetMyOfferedCourseQuery, useAddEnrollCourseMutation } =
  studentCourseApi;
