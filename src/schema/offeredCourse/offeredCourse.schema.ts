import { z } from "zod";
import { days } from "../../constant/global";
export const offeredCourseSchema = z.object({
  semesterRegistration: z.string({
    required_error: "Semester registration is required!",
  }),
  academicFaculty: z.string({
    required_error: "Academic faculty is required!",
  }),
  academicDepartment: z.string({
    required_error: "Academic department is required!",
  }),
  maxCapacity: z
    .number({ required_error: "Student capacity is required!" })
    .positive({ message: "Please provide a positive number" }),
  startTime: z.string({ required_error: "Class start time is required!" }),
  endTime: z.string({ required_error: "Class end time is required!" }),
  course: z.string({ required_error: "Course is required!" }),
  faculty: z.string({ required_error: "Faculty is required!" }),
  section: z.string({ required_error: "Section is required!" }),
  days: z.array(z.enum([...days] as [string, ...string[]]), {
    required_error: "Day is required!",
  }),
});
