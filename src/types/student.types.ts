import { IAcademicDepartment } from "./academicDepartment.types";
import { IAcademicFaculty } from "./academicFaculty.types";
import { IAcademicSemester } from "./academicSemester.types";

export type TName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};
//
export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};
//
export type TLocalGuardian = {
  name: string;
  contactNo: string;
  occupation: string;
  address: string;
};
//
export type TBloodGroup =
  | "A+"
  | "A-"
  | "B+"
  | "B-"
  | "AB+"
  | "AB-"
  | "O+"
  | "O-";
//
export type TGender = "Male" | "Female" | "Other";
//
export interface IStudent {
  _id: string;
  customId: string;
  user: string;
  name: TName;
  //   age: number;
  gender: TGender;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  guardian: TGuardian;
  bloodGroup?: TBloodGroup;
  localGuardian: TLocalGuardian;
  presentAddress: string;
  permanentAddress: string;
  profileImage: string;
  isDeleted: boolean;
  admissionSemester: IAcademicSemester;
  academicDepartment: IAcademicDepartment;
  academicFaculty: IAcademicFaculty;
}
