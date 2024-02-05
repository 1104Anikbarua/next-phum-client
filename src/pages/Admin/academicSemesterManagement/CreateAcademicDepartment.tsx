// import React from "react";
import { Button, Col, Row } from "antd";
import PhForm from "../../../components/form/PhForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PhInput from "../../../components/form/PhInput";
import PhSelect from "../../../components/form/PhSelect";
import {
  useAddAcademicDepartmentMutation,
  useGetAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagementApi";
import { toast } from "sonner";

const CreateAcademicDepartment = () => {
  //

  const { data } = useGetAcademicFacultiesQuery(undefined);
  const [addAcademicDepartment, { isLoading }] =
    useAddAcademicDepartmentMutation();
  const facultyOptions = data?.result?.map(({ _id, name }) => ({
    value: _id,
    label: name,
  }));

  //
  const onsubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log(data);
    const id = toast.loading("Academic Department Is Creating", {
      duration: 2000,
    });

    try {
      const res = await addAcademicDepartment(data).unwrap();

      if (res.success) {
        toast.success(res.message, {
          duration: 2000,
          id,
        });
      }
    } catch (error) {
      toast.error("Academic Department creation fail", {
        id,
        duration: 2000,
      });
    }
  };

  const academicDepartmentSchema = z.object({
    name: z.string({ required_error: "Name is required!" }),
    academicFaculty: z.string({
      required_error: "Academic faculty is required!",
    }),
  });
  return (
    <Row justify={"center"} align={"bottom"}>
      <Col span={8}>
        <PhForm
          onSubmit={onsubmit}
          resolver={zodResolver(academicDepartmentSchema)}
        >
          <PhInput
            name="name"
            placeholder="Academic Department Name"
            type="text"
            key={"academic department"}
            label="Academic Department Name"
          />
          <PhSelect
            placeholder="Please select a faculty"
            label="Academic Faculty"
            name="academicFaculty"
            key={"Academic Faculty"}
            options={facultyOptions!}
          />
          <Button htmlType="submit" type="primary" block loading={isLoading}>
            Create Department
          </Button>
        </PhForm>
      </Col>
    </Row>
  );
};

export default CreateAcademicDepartment;
