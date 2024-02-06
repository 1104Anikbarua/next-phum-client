export interface IAcademicDepartment {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  academicFaculty: IAcademicDepartment;
  __v?: number;
}
