import { IArgs, IReduxResponse } from "../../../types";
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
        console.log(args);
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
    }),
    //finish
  }),
});

export const { useAddStudentMutation, useGetStudentsQuery } = userManagementApi;
