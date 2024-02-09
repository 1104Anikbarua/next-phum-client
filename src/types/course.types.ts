interface IPreRequisiteCourse {
  _id: string;
  isDeleted: boolean;
}
export interface ICourse {
  _id: string;
  title: string;
  prefix: string;
  code: number;
  credits: number;
  preRequisiteCourses: IPreRequisiteCourse[];
  isDeleted: false;
  __v: number;
}
