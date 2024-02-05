import { Table, TableColumnsType, TableProps } from "antd";
import { useGetAcademicSemestersQuery } from "../../../redux/features/admin/academicManagementApi";
import { IAcademicSemester } from "../../../types/academicSemester.types";
import { useState } from "react";
import { IFilter } from "../../../types";

interface DataType
  extends Pick<
    IAcademicSemester,
    "_id" | "name" | "year" | "startMonth" | "endMonth"
  > {}

const AcademicSemester = () => {
  const [params, setParams] = useState<IFilter[] | undefined>([]);
  const { data: academicSemesters, isLoading } =
    useGetAcademicSemestersQuery(params);

  // console.log(academicSemesters, isLoading);

  const data = academicSemesters?.result?.map(
    ({ _id, name, year, startMonth, endMonth }) => ({
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
      filters: academicSemesters?.result?.map(({ name }) => ({
        text: name,
        value: name,
      })),
      // [
      //   {
      //     text: "Summer",
      //     value: "Summer",
      //   },
      //   {
      //     text: "Autumn",
      //     value: "Autumn",
      //   },
      //   {
      //     text: "Fall",
      //     value: "Fall",
      //   },
      // ],
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

      //TODO:fix key problem
      filters: academicSemesters?.result?.map(({ year }) => ({
        text: year,
        value: year,
      })),
      //[
      //   {
      //     text: "2024",
      //     value: "2024",
      //   },
      //   {
      //     text: "2025",
      //     value: "2025",
      //   },
      //   {
      //     text: "2026",
      //     value: "2026",
      //   },
      // ],
    },
    {
      title: "Start Month",
      dataIndex: "startMonth",
      // filters: [
      //   {
      //     text: "London",
      //     value: "London",
      //   },
      //   {
      //     text: "New York",
      //     value: "New York",
      //   },
      // ],
      // onFilter: (value: string, record) => record.address.indexOf(value) === 0,
    },
    {
      title: "End Month",
      dataIndex: "endMonth",
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
        queryParams.push({
          name: "name",
          value: item,
        })
      );
      filters?.year?.forEach((item) =>
        queryParams.push({
          name: "year",
          value: item,
        })
      );
    }
    setParams(queryParams);
    //
  };

  return (
    <Table
      loading={isLoading}
      bordered={true}
      columns={columns}
      dataSource={data?.map((item) => ({
        key: item?._id,
        ...item,
      }))}
      onChange={onChange}
    />
  );
};

export default AcademicSemester;
