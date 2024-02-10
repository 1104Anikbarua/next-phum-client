import { IAcademicDepartment } from "./academicDepartment.types";
import { IAcademicFaculty } from "./academicFaculty.types";
import { IAcademicSemester } from "./academicSemester.types";
import { ICourse } from "./course.types";
import { IFaculty } from "./faculty.types";
import { ISemesterRegistration } from "./semesterRegistration.types";

export interface IOfferedCourse {
  _id: string;
  semesterRegistration: ISemesterRegistration;
  academicFaculty: IAcademicFaculty;
  academicDepartment: IAcademicDepartment;
  academicSemester: IAcademicSemester;
  course: ICourse;
  faculty: IFaculty;
  maxCapacity: number;
  section: string;
  days: string[];
  startTime: string;
  endTime: string;
}
