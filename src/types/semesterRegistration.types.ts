import { IAcademicSemester } from "./academicSemester.types";

export interface ISemesterRegistration {
  _id: string;
  academicSemester: IAcademicSemester;
  status: string;
  startDate: string;
  endDate: string;
  minCredit: number;
  maxCredit: number;
  createdAt: string;
  updatedAt: string;
}
