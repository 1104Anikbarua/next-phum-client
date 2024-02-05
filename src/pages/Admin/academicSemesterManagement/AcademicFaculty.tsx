import { useState } from "react";
import { useGetAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagementApi";
import { Table, TableColumnsType, TableProps } from "antd";
import { IFilter } from "../../../types";

interface DataType {
  key: React.Key;
  name: string;
  createdAt: Date;
}

const AcademicFaculty = () => {
  //
  const [param, setParams] = useState<IFilter[] | undefined>([]);

  const { data: academicFaculty, isFetching } =
    useGetAcademicFacultiesQuery(param);

  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      filters: academicFaculty?.result?.map((element) => ({
        text: element.name,
        value: element.name,
      })),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
    },
  ];

  const data = academicFaculty?.result?.map(({ _id, name, createdAt }) => ({
    _id,
    name,
    createdAt,
  }));
  // const data = [
  //   {
  //     key: "1",
  //     name: "John Brown",
  //     age: 32,
  //     address: "New York No. 1 Lake Park",
  //   },
  //   {
  //     key: "2",
  //     name: "Jim Green",
  //     age: 42,
  //     address: "London No. 1 Lake Park",
  //   },
  //   {
  //     key: "3",
  //     name: "Joe Black",
  //     age: 32,
  //     address: "Sydney No. 1 Lake Park",
  //   },
  //   {
  //     key: "4",
  //     name: "Jim Red",
  //     age: 32,
  //     address: "London No. 2 Lake Park",
  //   },
  // ];

  const onChange: TableProps<DataType>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    console.log(filters, extra);

    const queryParams: IFilter[] = [];
    if (extra.action === "filter") {
      filters?.name?.forEach((item) =>
        queryParams.push({
          name: "name",
          value: item,
        })
      );
    }
    setParams(queryParams);
  };

  return (
    <Table
      bordered={true}
      loading={isFetching}
      columns={columns}
      dataSource={data?.map(({ _id, name, createdAt }) => ({
        key: _id,
        name,
        createdAt,
      }))}
      onChange={onChange}
    />
  );
};

export default AcademicFaculty;
