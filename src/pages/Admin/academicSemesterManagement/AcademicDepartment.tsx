import { Table, TableColumnsType, TableProps } from "antd";
import React from "react";
import { useGetAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagementApi";
import { IFilter } from "../../../types";

interface DataType {
  key: React.Key;
  name: string;
  createdAt: Date;
}
//
const AcademicDepartment = () => {
  //
  // fetch data
  const { data: academicDepartments } =
    useGetAcademicDepartmentQuery(undefined);
  //

  console.log(academicDepartments);
  const columns: TableColumnsType<DataType> = [
    {
      title: "Academic Department Name",
      dataIndex: "name",
      filters: academicDepartments?.result?.map(({ name }) => ({
        text: name,
        value: name,
      })),
    },
    {
      title: "Academic Faculty Name",
      dataIndex: "academicFacultyName",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    const queryParams: IFilter[] = [];

    if (extra.action === "filter") {
      filters?.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
    }
  };

  return (
    <Table
      columns={columns}
      dataSource={academicDepartments?.result?.map(
        ({
          _id,
          name,
          createdAt,
          academicFaculty: { name: academicFacultyName },
        }) => ({
          key: _id,
          name,
          createdAt,
          academicFacultyName,
        })
      )}
      onChange={onChange}
    />
  );
};

export default AcademicDepartment;
