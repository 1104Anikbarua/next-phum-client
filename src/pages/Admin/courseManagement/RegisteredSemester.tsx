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
import {
  useChangeSemesterStatusMutation,
  useGetRegisterSemesterQuery,
} from "../../../redux/features/admin/courseManagementApi";
import { useState } from "react";
import moment from "moment";
import { CaretDownOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import { IError } from "../../../types";
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
  const [id, setIds] = useState("");
  const [page, setPages] = useState(1);
  const [limit, setLimts] = useState(10);
  const { data: registerSemesters, isFetching } = useGetRegisterSemesterQuery([
    { name: "page", value: page },
    { name: "limit", value: limit },
    // { name: "sort", value: "createdAt" },
  ]);
  const [changeSemesterStatus, { isLoading }] =
    useChangeSemesterStatusMutation();

  const semesterData = registerSemesters?.response?.map(
    ({ _id, academicSemester, status, startDate, endDate }) => ({
      key: _id,
      name: `${academicSemester.name} ${academicSemester.year}`,
      status,
      startDate: moment(startDate).format("MMMM"), //return month name
      endDate: moment(new Date(endDate)).format("DD-MM-YYYY"), //return date-month-year
    })
  );
  //   meta data
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
  // {change semester status}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangeStatus = async (data: any) => {
    const toastId = toast.loading("Updating Semester Status", {
      position: "top-center",
      duration: 2000,
    });
    const semesterStatus = {
      status: { status: data.key },
      id,
    };
    try {
      const res = await changeSemesterStatus(semesterStatus).unwrap();

      if (res.success) {
        toast.success(res.message, {
          id: toastId,
          duration: 2000,
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error((error as IError)?.data?.message, {
        id: toastId,
        duration: 2000,
        position: "top-center",
      });
    }
  };
  //
  //pass the event handler and items in dropdown
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
      render: (item) => {
        return (
          <Dropdown menu={menuProps} trigger={["click"]}>
            <Button onClick={() => setIds(item.key)}>
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
        loading={isFetching || isLoading}
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
