// import { useState } from "react";
import { Button, Col, Row, Spin } from "antd";
import PhInputNumber from "../../../components/form/PhInputNumber";
import PhForm from "../../../components/form/PhForm";
import PhSelect from "../../../components/form/PhSelect";
import PhDate from "../../../components/form/PhDate";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useGetAcademicSemestersQuery } from "../../../redux/features/admin/academicManagementApi";
import { useAddRegisterSemesterMutation } from "../../../redux/features/admin/courseManagementApi";
import { toast } from "sonner";
import { IError } from "../../../types";
//
const SemesterRegistration = () => {
  //
  const { data, isFetching } = useGetAcademicSemestersQuery([
    {
      name: "sort",
      value: "year",
    },
  ]);
  //
  const [addRegisterSemester, { isLoading }] = useAddRegisterSemesterMutation();

  const academicSemesterOptions = data?.result?.map(({ _id, name, year }) => ({
    label: `${name} ${year}`,
    value: _id,
  }));
  const SemesterRegistrationOptions = ["UPCOMING", "ONGOING", "ENDED"].map(
    (status) => ({
      label: status,
      value: status,
    })
  );

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    //

    const id = toast.loading("Creating Semester Registration", {
      position: "top-center",
    });
    try {
      const res = await addRegisterSemester(data).unwrap();
      if (res.success) {
        toast.success(res.message, {
          id,
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error((error as IError).data?.message, {
        id,
        position: "top-center",
      });
    }
  };
  //
  return (
    <Row align={"middle"} justify={"center"}>
      <Col span={8}>
        {isFetching ? (
          <Spin fullscreen />
        ) : (
          <PhForm onSubmit={onSubmit}>
            <PhInputNumber
              label="Min Credit"
              name="minCredit"
              placeholder="Min Credit"
              type="number"
              key={"minCredit"}
            />
            <PhInputNumber
              label="Max Credit"
              name="maxCredit"
              placeholder="Max Credit"
              type="number"
              key={"maxCredit"}
            />
            <PhSelect
              label="Status"
              name="status"
              options={SemesterRegistrationOptions}
              placeholder="Status"
              key={"status"}
            />
            <PhDate
              label="Start Date"
              name="startDate"
              placeholder="Start Date"
              key={"startDate"}
            />
            <PhDate
              label="End Date"
              name="endDate"
              placeholder="End Date"
              key={"endDate"}
            />
            <PhSelect
              label="Academic Semester"
              name="academicSemester"
              options={academicSemesterOptions}
              placeholder="Academic Semester"
              key={"academicSemester"}
            />
            <Button htmlType="submit" type="primary" block loading={isLoading}>
              Create Register Semester
            </Button>
          </PhForm>
        )}
      </Col>
    </Row>
  );
};

export default SemesterRegistration;
