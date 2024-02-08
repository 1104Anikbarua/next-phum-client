import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRegisterSemester: builder.query({
      query: () => ({
        url: "/semester-registrations",
        method: "GET",
      }),
      transformResponse: (response) => {
        console.log(response);
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

export const { useAddRegisterSemesterMutation } = courseManagementApi;
