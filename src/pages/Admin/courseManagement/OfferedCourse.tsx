// import React from 'react';
import { Pagination, Row, Table, TableColumnsType } from "antd";
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

  // console.log(offeredCourses);
  const offeredCourse = offeredCourses?.response?.map(
    ({ _id, course, faculty, academicSemester, semesterRegistration }) => ({
      key: _id,
      courseName: course.title,
      facultyName: faculty.fullName,
      academicSemester: `${academicSemester.name} ${academicSemester.year}`,
      status: semesterRegistration.status,
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
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
    },
  ];

  const meta = offeredCourses?.meta;

  return (
    <>
      <Table
        bordered={true}
        columns={columns}
        dataSource={offeredCourse}
        pagination={false}
      />
      <Row justify={"center"}>
        <Pagination
          current={page}
          onChange={(value) => setPages(value)}
          showSizeChanger
          onShowSizeChange={(_, newPageSize) => setLimits(newPageSize)}
          total={meta?.count}
        />
      </Row>
    </>
  );
};

export default OfferedCourse;
