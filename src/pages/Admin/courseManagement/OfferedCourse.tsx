// import React from 'react';
import { Table, TableColumnsType } from "antd";
import { useGetOfferedCoursesQuery } from "../../../redux/features/admin/courseManagementApi";
import { useState } from "react";

interface DataType {
  key: React.Key;
}
const OfferedCourse = () => {
  //states
  const [page, setPages] = useState(1);
  const [limit, setLimits] = useState(10);
  //get data from server/db
  const { data: offeredCourses } = useGetOfferedCoursesQuery([
    { name: "page", value: page },
    { name: "limit", value: limit },
  ]);

  const offeredCourse = offeredCourses?.response?.map(
    ({ _id, course, faculty, academicSemester }) => ({
      key: _id,
      courseName: course.title,
      facultyName: faculty.fullName,
      academicSemester: `${academicSemester.name} ${academicSemester.year}`,
    })
  );
  const columns: TableColumnsType<DataType> = [
    {
      title: "Course Name",
      dataIndex: "courseName",
      align: "center",
    },
    {
      title: "Teacher Name",
      dataIndex: "facultyName",
      align: "center",
    },
    {
      title: "Academic Semester",
      dataIndex: "academicSemester",
      align: "center",
    },
  ];

  console.log(offeredCourse);
  return (
    <>
      <Table
        bordered={true}
        columns={columns}
        dataSource={offeredCourse}
        pagination={false}
      />
    </>
  );
};

export default OfferedCourse;
