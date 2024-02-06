import { Button, Space, Table, TableColumnsType, TableProps } from "antd";
import React from "react";
import { useGetStudentsQuery } from "../../../redux/features/admin/userManagementApi";

interface DataType {
  key: React.Key;
  customId: string;
  fullName: string;
}
const StudentTable = () => {
  //
  const { data, isFetching } = useGetStudentsQuery(undefined);

  const students = data?.response?.map(({ _id, customId, name }) => ({
    key: _id,
    customId,
    fullName: `${name.firstName} ${name.middleName} ${name.lastName}`,
  }));
  //
  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "fullName",
      align: "center",
      //   filters: [
      //     {
      //       text: "Joe",
      //       value: "Joe",
      //     },
      //     {
      //       text: "Category 1",
      //       value: "Category 1",
      //       children: [
      //         {
      //           text: "Yellow",
      //           value: "Yellow",
      //         },
      //         {
      //           text: "Pink",
      //           value: "Pink",
      //         },
      //       ],
      //     },
      //     {
      //       text: "Category 2",
      //       value: "Category 2",
      //       children: [
      //         {
      //           text: "Green",
      //           value: "Green",
      //         },
      //         {
      //           text: "Black",
      //           value: "Black",
      //         },
      //       ],
      //     },
      //   ],
      //   filterMode: "tree",
      //   filterSearch: true,
      //   onFilter: (value: string, record) => record.name.includes(value),
      //   width: "30%",
    },
    {
      title: "Roll No",
      dataIndex: "customId",
      align: "center",
      //   sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Action",
      dataIndex: "action",
      align: "center",
      render: () => (
        <Space>
          <Button htmlType="button" type="primary">
            Update
          </Button>
          <Button htmlType="button" type="default">
            Block
          </Button>
          <Button htmlType="button" type="primary" danger>
            Delete
          </Button>
        </Space>
      ),
      // filters: [
      //     {
      //       text: "London",
      //       value: "London",
      //     },
      //     {
      //       text: "New York",
      //       value: "New York",
      //     },
      //   ],
      //   onFilter: (value: string, record) => record.address.startsWith(value),
      //   filterSearch: true,
      width: "1%",
    },
  ];

  //   const data: DataType[] = [
  //     {
  //       key: "1",
  //       name: "John Brown",
  //       age: 32,
  //       address: "New York No. 1 Lake Park",
  //     },
  //     {
  //       key: "2",
  //       name: "Jim Green",
  //       age: 42,
  //       address: "London No. 1 Lake Park",
  //     },
  //     {
  //       key: "3",
  //       name: "Joe Black",
  //       age: 32,
  //       address: "Sydney No. 1 Lake Park",
  //     },
  //     {
  //       key: "4",
  //       name: "Jim Red",
  //       age: 32,
  //       address: "London No. 2 Lake Park",
  //     },
  //   ];

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
      bordered={true}
      loading={isFetching}
      columns={columns}
      dataSource={students}
      onChange={onChange}
    />
  );
};

export default StudentTable;
