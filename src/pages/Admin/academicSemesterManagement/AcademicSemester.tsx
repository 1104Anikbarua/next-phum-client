// import React from 'react';

import { Table, TableColumnsType, TableProps } from "antd";
import { useGetAcademicSemestersQuery } from "../../../redux/features/admin/academicManagementApi";

interface DataType {
  key: React.Key;
  name: string;
  year: number;
  startMonth: string;
  endMonth: string;
}

interface IDataSource {
  _id: string;
  name: string;
  year: string;
  startMonth: string;
  endMonth: string;
}

const AcademicSemester = () => {
  const { data: academicSemesterData, isLoading } =
    useGetAcademicSemestersQuery(undefined);

  console.log(academicSemesterData, isLoading);

  const data = academicSemesterData?.result.map(
    ({ _id, name, year, startMonth, endMonth }: IDataSource) => ({
      _id,
      name,
      year,
      startMonth,
      endMonth,
    })
  );

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "Jim",
          value: "Jim",
        },
        {
          text: "Submenu",
          value: "Submenu",
          children: [
            {
              text: "Green",
              value: "Green",
            },
            {
              text: "Black",
              value: "Black",
            },
          ],
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      // onFilter: (value: string, record) => record.name.indexOf(value) === 0,
      // sorter: (a, b) => a.name.length - b.name.length,
      // sortDirections: ["descend"],
    },
    {
      title: "Year",
      dataIndex: "year",
      // defaultSortOrder: "descend",
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Start Month",
      dataIndex: "startMonth",
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      // onFilter: (value: string, record) => record.address.indexOf(value) === 0,
    },
    {
      title: "End Month",
      dataIndex: "endMonth",
    },
  ];

  const onChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <Table
      loading={isLoading}
      bordered={true}
      columns={columns}
      dataSource={data?.map((item: IDataSource) => ({
        key: item._id,
        ...item,
      }))}
      onChange={onChange}
    />
  );
};

export default AcademicSemester;
