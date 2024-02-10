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
import { useGetFacultiesQuery } from "../../../redux/features/admin/userManagementApi";
import { IFilter } from "../../../types";
import { Link, useNavigate } from "react-router-dom";
import UserModal from "../../../components/modal/Modal";

interface DataType {
  key: React.Key;
  customId: string;
  fullName: string;
}
const FacultyTable = () => {
  //
  const [param, setParams] = useState<IFilter[]>([]);
  const [page, setPages] = useState(1);
  const [limit, setLimits] = useState(10);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [status, setStatus] = useState({
    status: "",
  });

  const { data, isFetching } = useGetFacultiesQuery([
    { name: "page", value: page },
    { name: "limit", value: limit },
    { name: "sort", value: "-customId" },
    ...param,
  ]);

  // console.log({ data });
  //

  const handleChangeStatus = async (_id: string, status: string) => {
    // const userIdStatus = { _id, status: { status } };
    setStudentId(_id);
    setStatus({ status });
    setisModalOpen(true);
  };

  const faculties = data?.response?.map(
    ({ _id, customId, fullName, email, contactNo, user }) => ({
      key: _id,
      customId,
      fullName: fullName,
      email,
      contactNo,
      user,
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
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "center",
    },
    {
      title: "Contact No",
      dataIndex: "contactNo",
      align: "center",
    },

    {
      title: "Action",
      // dataIndex: "",
      align: "center",
      render: (value) => (
        // console.log(value),
        <Space>
          <Link to={`/admin/student-details/${value.customId}`}>
            <Button htmlType="submit" type="primary">
              Details
            </Button>
          </Link>
          <Button
            htmlType="button"
            type="primary"
            onClick={() => navigate(`/admin/student/${value?.customId}`)}
          >
            Update
          </Button>
          <Button
            htmlType="button"
            type="default"
            onClick={() =>
              handleChangeStatus(
                value?.user?._id,
                value?.user?.status === "in-progress"
                  ? "blocked"
                  : "in-progress"
              )
            }
            // loading={isLoading}
          >
            {value?.user?.status === "in-progress" ? "Block" : "UnBlock"}
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
        dataSource={faculties}
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
      <UserModal
        isModalOpen={isModalOpen}
        setisModalOpen={setisModalOpen}
        id={studentId}
        status={status}
      />
    </>
  );
};

export default FacultyTable;
