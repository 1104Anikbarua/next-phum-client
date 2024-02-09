// import React from 'react';
import { Button, Col, Row, Spin } from "antd";
import PhForm from "../../../components/form/PhForm";
import PhInput from "../../../components/form/PhInput";
import PhInputNumber from "../../../components/form/PhInputNumber";
import PhSelect from "../../../components/form/PhSelect";
import { FieldValues, SubmitHandler } from "react-hook-form";
import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseManagementApi";
import { toast } from "sonner";
import { IError } from "../../../types";

const CreateCourse = () => {
  // load all the course from db
  const { data, isFetching } = useGetAllCoursesQuery(undefined);
  const [addCourse, { isLoading }] = useAddCourseMutation();
  const courseOptions = data?.response?.map((course) => ({
    label: course?.title,
    value: course?._id,
  }));
  //
  //Take form values
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const id = toast.loading("Creating Course", {
      position: "top-center",
    });
    const courseInfo = {
      course: {
        ...data,
        preRequisiteCourses:
          data?.preRequisiteCourses?.map((course: string) => ({
            course: course,
            isDeleted: false,
          })) || [],
      },
    };
    try {
      const res = await addCourse(courseInfo).unwrap();
      if (res.success) {
        toast.success(res.message, {
          id,
          position: "top-center",
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error((error as IError).data?.message, {
        id,
        position: "top-center",
        duration: 2000,
      });
    }
    //
  };
  //
  //create new course
  const course = {
    title: "Bootstrap",
    prefix: "CSS",
    code: 103,
    credits: 3,
    // preRequisiteCourses: [
    //   {
    //     course: "65ba64c9c5cb29e4863f32a2",
    //     isDeleted: false,
    //   },
    //   {
    //     course: "65ba65dbc5cb29e4863f32a7",
    //     isDeleted: false,
    //   },
    // ],
  };
  //
  return isFetching ? (
    <Spin fullscreen />
  ) : (
    <Row align={"middle"} justify={"center"}>
      <Col span={8}>
        <PhForm onSubmit={onSubmit} defaultValues={course}>
          <PhInput
            name="title"
            placeholder="Title"
            type="text"
            key={"title"}
            label="Title"
          />
          <PhInput
            name="prefix"
            placeholder="Prefix"
            type="text"
            key={"prefix"}
            label="Prefix"
          />
          <PhInputNumber
            name="code"
            placeholder="Code"
            type="number"
            key={"code"}
            label="Code"
          />
          <PhInputNumber
            name="credits"
            placeholder="Credits"
            type="number"
            key={"credits"}
            label="Credits"
          />
          <PhSelect
            label="PreRequisite Courses"
            name="preRequisiteCourses"
            options={courseOptions}
            placeholder="PreRequisite Courses"
            disabled={false}
            key={"preRequisiteCourses"}
            mode={"multiple"}
          />
          <Button htmlType="submit" type="primary" block loading={isLoading}>
            Create Course
          </Button>
        </PhForm>
      </Col>
    </Row>
  );
};

export default CreateCourse;
