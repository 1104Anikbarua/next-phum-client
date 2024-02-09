// import React from 'react';
import {
  Button,
  Dropdown,
  Pagination,
  Row,
  Table,
  TableColumnsType,
  Tag,
} from "antd";
import { useGetRegisterSemesterQuery } from "../../../redux/features/admin/courseManagementApi";
import { useState } from "react";
import moment from "moment";
import { CaretDownOutlined } from "@ant-design/icons";
//
interface DataType {
  key: React.Key;
  name: string;
  status: string;
  startDate: string;
  endDate: string;
}

const RegisteredSemester = () => {
  //
  const [page, setPages] = useState(1);
  const [limit, setLimts] = useState(10);
  const { data: registerSemesters, isFetching } = useGetRegisterSemesterQuery([
    { name: "page", value: page },
    { name: "limit", value: limit },
    // { name: "sort", value: "createdAt" },
  ]);

  const semesterData = registerSemesters?.response?.map(
    ({ _id, academicSemester, status, startDate, endDate }) => ({
      key: _id,
      name: `${academicSemester.name} ${academicSemester.year}`,
      status,
      startDate: moment(startDate).format("MMMM"), //return month name
      endDate: moment(new Date(endDate)).format("DD-MM-YYYY"), //return date-month-year
    })
  );
  //   meta
  const meta = registerSemesters?.meta;
  //   console.log(registerSemesters);
  //

  const items = [
    {
      label: (
        <Tag bordered={false} color="blue">
          UPCOMING
        </Tag>
      ),
      key: "UPCOMING",
    },
    {
      label: (
        <Tag bordered={false} color="green">
          ONGOING
        </Tag>
      ),

      key: "ONGOING",
    },
    {
      label: (
        <Tag bordered={false} color="red">
          ENDED
        </Tag>
      ),

      key: "ENDED",
    },
  ];
  //
  const handleChangeStatus = (data: unknown) => {
    console.log(data);
  };
  //
  //
  const menuProps = {
    items,
    onClick: handleChangeStatus,
  };
  //
  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      render: (status) => {
        let color;
        if (status === "UPCOMING") {
          color = "processing";
        } else if (status === "ONGOING") {
          color = "success";
        } else {
          color = "red";
        }
        return (
          <Tag color={color} bordered={false}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      align: "center",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      align: "center",
    },
    {
      title: "Action",
      align: "center",
      key: "x",
      render: () => {
        return (
          <Dropdown menu={menuProps}>
            <Button>
              Change Status
              <CaretDownOutlined style={{ fontSize: "12px" }} />
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <>
      <Table
        loading={isFetching}
        bordered={true}
        columns={columns}
        dataSource={semesterData}
        pagination={false}
      />
      <Row justify={"center"}>
        <Pagination
          showSizeChanger
          onShowSizeChange={(_, pageSize) => setLimts(pageSize)}
          current={page}
          onChange={(value) => setPages(value)}
          //
          total={meta?.totalPage}
        />
      </Row>
    </>
  );
};

export default RegisteredSemester;
