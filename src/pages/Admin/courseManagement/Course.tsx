// import React from "react";
import { useState } from "react";
import {
  useAddCourseFacultyMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagementApi";
import {
  Button,
  Col,
  Modal,
  Pagination,
  Row,
  Table,
  TableColumnsType,
} from "antd";
import PhForm from "../../../components/form/PhForm";
import PhSelect from "../../../components/form/PhSelect";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useGetFacultiesQuery } from "../../../redux/features/admin/userManagementApi";
import { toast } from "sonner";
import { IError } from "../../../types";

interface DataType {
  key: React.Key;
  title: string;
  credits: number;
  code: number;
}
//
const Course = () => {
  //states
  const [page, setPages] = useState(1);
  const [limit, setLimits] = useState(10);
  //get all course from db
  const { data: courses, isFetching } = useGetAllCoursesQuery([
    { name: "page", value: page },
    { name: "limit", value: limit },
  ]);
  //

  //   meta for pagination
  const meta = courses?.meta;
  // table data
  const courseData = courses?.response?.map(
    ({ _id, title, credits, code }) => ({
      key: _id,
      title,
      credits,
      code,
    })
  );
  //table title
  const columns: TableColumnsType<DataType> = [
    {
      title: "Code",
      dataIndex: "code",
      align: "center",
    },
    {
      title: "Title",
      dataIndex: "title",
      align: "center",
    },
    {
      title: "Credits",
      dataIndex: "credits",
      align: "center",
    },
    {
      title: "Action",
      align: "center",
      key: "action",
      render: (course) => {
        return <AssignFacultyModal course={course} />;
      },
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={courseData}
        bordered={true}
        pagination={false}
        loading={isFetching}
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

// assign faculty modal
interface IModalProps {
  course: { key: string; title: string; credits: number; code: number };
}
const AssignFacultyModal = ({ course }: IModalProps) => {
  //

  const [isModalOpen, setIsModalOpen] = useState(false);
  //
  //get faculty from db
  const { data: faculty, isFetching } = useGetFacultiesQuery(undefined);
  const facultyOptions = faculty?.response?.map(({ fullName, _id }) => ({
    label: fullName,
    value: _id,
  }));
  //
  const [addFaculty, { isLoading }] = useAddCourseFacultyMutation();
  //open the modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  //modal cross button
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const id = toast.loading(`Faculty assign for ${course.title}`, {
      position: "top-center",
      duration: 2000,
    });
    const facultInfo = {
      courseFaculty: { courseFaculty: data },
      id: course?.key,
    };

    try {
      const res = await addFaculty(facultInfo).unwrap();
      if (res.success) {
        toast.success(res.message, {
          id,
          duration: 2000,
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error((error as IError).data.message, {
        id,
        position: "top-center",
        duration: 2000,
      });
    }
  };
  return (
    <>
      <Button type="default" onClick={showModal}>
        Assign Faculty/Teacher
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        centered
        footer={null}
      >
        <Row justify={"center"}>
          <Col>
            <PhForm onSubmit={onSubmit}>
              <PhSelect
                label="Faculty"
                name="faculties"
                placeholder="Please select faculty name"
                options={facultyOptions}
                mode={"multiple"}
                key={"faculty"}
                disabled={isFetching}
              />
              <Button
                htmlType="submit"
                type="primary"
                block
                disabled={isFetching}
                loading={isLoading}
              >
                Submit
              </Button>
            </PhForm>
          </Col>
        </Row>
      </Modal>
    </>
  );
};

export default Course;
