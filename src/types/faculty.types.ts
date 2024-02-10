export interface IFaculty {
  _id: string;
  customId: string;
  user: string;
  name: {
    firstName: string;
    middleName: string;
    lastName: string;
  };
  age: number;
  gender: string;
  bloodGroup: string;
  dateOfBirth: string;
  email: string;
  contactNo: number;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  profileImage: string;
  isDeleted: boolean;
  academicDepartment: string;
  academicFaculty: string;
  designation: string;
  createdAt: string;
  updatedAt: string;
  fullName: string;
  id: string;
}
