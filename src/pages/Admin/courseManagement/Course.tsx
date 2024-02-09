// import React from "react";
import { useState } from "react";
import { useGetAllCoursesQuery } from "../../../redux/features/admin/courseManagementApi";
import { Pagination, Row, Table, TableColumnsType } from "antd";

interface DataType {
  key: React.Key;
  title: string;
  credits: number;
  code: number;
}
//
const Course = () => {
  //states
  const [page, setPages] = useState(1);
  const [limit, setLimits] = useState(10);
  //get all course from db
  const { data: courses, isFetching } = useGetAllCoursesQuery([
    { name: "page", value: page },
    { name: "limit", value: limit },
  ]);

  //   meta for pagination
  const meta = courses?.meta;
  // table data
  const courseData = courses?.response?.map(
    ({ _id, title, credits, code }) => ({
      key: _id,
      title,
      credits,
      code,
    })
  );
  //table title
  const columns: TableColumnsType<DataType> = [
    {
      title: "Code",
      dataIndex: "code",
      align: "center",
    },
    {
      title: "Title",
      dataIndex: "title",
      align: "center",
    },
    {
      title: "Credits",
      dataIndex: "credits",
      align: "center",
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={courseData}
        bordered={true}
        pagination={false}
        loading={isFetching}
      />
      <Row justify={"center"}>
        <Pagination
          total={meta?.count}
          current={page}
          onChange={(value) => setPages(value)}
          showSizeChanger
          onShowSizeChange={(_, newPageSize) => setLimits(newPageSize)}
        />
      </Row>
    </>
  );
};

export default Course;
