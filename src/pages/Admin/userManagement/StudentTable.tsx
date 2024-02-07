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
import { Link, useNavigate } from "react-router-dom";

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

  // console.log(data);

  const students = data?.response?.map(
    ({ _id, customId, name, email, contactNo }) => ({
      key: _id,
      customId,
      fullName: `${name?.firstName} ${name?.middleName} ${name?.lastName}`,
      email,
      contactNo,
    })
  );
  const meta = data?.meta;

  const navigate = useNavigate();
  //
  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "fullName",
      align: "center",
    },
    {
      title: "Roll No",
      dataIndex: "customId",
      align: "center",
      //   sorter: (a, b) => a.age - b.age,
    },
    { title: "Email", dataIndex: "email", align: "center" },
    { title: "Contact No", dataIndex: "contactNo", align: "center" },
    {
      title: "Action",
      dataIndex: "",
      align: "center",
      render: (value) => (
        <Space>
          <Link to={`/admin/student-details/${value.customId}`}>
            <Button htmlType="submit" type="primary">
              Details
            </Button>
          </Link>
          <Button
            htmlType="button"
            type="primary"
            onClick={() => navigate(`/admin/student/${value.customId}`)}
          >
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
