// import React from "react";
import PhForm from "../../../components/form/PhForm";
import { Button, Col, Row } from "antd";
import PhInput from "../../../components/form/PhInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagementApi";
import { toast } from "sonner";
import { StarOutlined } from "@ant-design/icons";

const CreateAcademicFaculty = () => {
  //
  const [addAcademicFaculty, { isLoading }] = useAddAcademicFacultyMutation();
  //
  //
  const onsubmit: SubmitHandler<FieldValues> = async (data) => {
    const id = toast.loading("Academic Faculty Creating", {
      duration: 2000,
      position: "top-center",
      icon: <StarOutlined spin style={{ color: "blue" }} />,
    });
    try {
      //
      const res = await addAcademicFaculty(data).unwrap();

      if (res?.success) {
        toast.success(res?.message, {
          position: "top-center",
          duration: 2000,
          id,
        });
      }
      //
    } catch (error) {
      //
      console.log(error);
      //
      toast.error("Academic Faculty Creation Fail", {
        position: "top-center",
        duration: 2000,
        id,
      });
    }
  };
  //
  //
  const academicFacultySchema = z.object({
    name: z.string({ required_error: "Faculty Name is required" }),
  });
  //
  return (
    <Row justify={"center"} align={"middle"}>
      <Col span={6}>
        <PhForm
          onSubmit={onsubmit}
          resolver={zodResolver(academicFacultySchema)}
        >
          <PhInput
            name="name"
            type="text"
            key="academic-faculty"
            label="Academic Faculty"
            placeholder="Academic Faculty Name"
          />
          <Button htmlType="submit" type="primary" block loading={isLoading}>
            Create Faculty
          </Button>
        </PhForm>
      </Col>
    </Row>
  );
};

export default CreateAcademicFaculty;
