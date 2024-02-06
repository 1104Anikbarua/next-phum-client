import { z } from "zod";
//
export const academicDepartmentSchema = z.object({
  name: z.string({ required_error: "Name is required!" }),
  academicFaculty: z.string({
    required_error: "Academic faculty is required!",
  }),
});
