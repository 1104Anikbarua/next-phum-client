/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IStudentOfferedCourse {
  academicDepartment: string;
  academicFaculty: string;
  academicSemester: string;
  completedCourses: any[];
  course: {
    _id: string;
    title: string;
    prefix: string;
    code: number;
    credits: number;
    isDeleted: boolean;
    preRequisiteCourse: any[];
    __v: number;
  };
  courseIds: string[];
  days: string[];
  endTime: string;
  enrollCourses: string[];
  faculty: string;
  isCourseAlreadyEnrolled: boolean;
  isPrerequisiteFulfilled: boolean;
  maxCapacity: number;
  section: string;
  semesterRegistration: string;
  startTime: string;
  __v: number;
  _id: string;
}
