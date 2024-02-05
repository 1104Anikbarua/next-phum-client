export interface academicDepartment {
  _id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  academicFaculty: academicDepartment;
}
