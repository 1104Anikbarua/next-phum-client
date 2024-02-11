import { IArgs } from "../../../types";
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
          url: "/offered-course/my-offered-course",
          method: "GET",
          params: params,
        };
      },
    }),
    // finish
  }),
});
export const { useGetMyOfferedCourseQuery } = studentCourseApi;
