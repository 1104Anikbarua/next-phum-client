import { IFaculty } from "./faculty.types";

export interface IFacultyByCourse {
  _id: string;
  __v: number;
  course: string;
  faculties: IFaculty[];
}
