import {
  Button,
  Pagination,
  Row,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import React, { useState } from "react";
import { useGetStudentsQuery } from "../../../redux/features/admin/userManagementApi";
import { IFilter } from "../../../types";

interface DataType {
  key: React.Key;
  customId: string;
  fullName: string;
}
const StudentTable = () => {
  //
  const [param, setParams] = useState<IFilter[]>([]);
  const [page, setPages] = useState(1);
  const [limit, setLimits] = useState(10);

  const { data, isFetching } = useGetStudentsQuery([
    { name: "page", value: page },
    { name: "limit", value: limit },
    { name: "sort", value: "-customId" },
    ...param,
  ]);

  const students = data?.response?.map(({ _id, customId, name }) => ({
    key: _id,
    customId,
    fullName: `${name?.firstName} ${name?.middleName} ${name?.lastName}`,
  }));
  const meta = data?.meta;

  //
  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "fullName",
      align: "center",
      // filters: [{ text: "", value: "" }],
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

  const onChange: TableProps<DataType>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    const queryParams: IFilter[] = [];
    if (extra.action === "filter") {
      filters.fullName?.forEach((element) =>
        queryParams.push({
          name: "name",
          value: element,
        })
      );
    }
    setParams(queryParams);
  };

  return (
    <>
      <Table
        bordered={true}
        loading={isFetching}
        columns={columns}
        dataSource={students}
        onChange={onChange}
        pagination={false}
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

export default StudentTable;
