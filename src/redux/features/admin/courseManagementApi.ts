import { IReduxResponse } from "../../../types";
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
    }),
    //finish
    addRegisterSemester: builder.mutation({
      query: (registerSemesterInfo) => ({
        url: "/semester-registrations/create-semester-registration",
        method: "POST",
        body: registerSemesterInfo,
      }),
    }),
  }),
});

export const { useAddRegisterSemesterMutation, useGetRegisterSemesterQuery } =
  courseManagementApi;
