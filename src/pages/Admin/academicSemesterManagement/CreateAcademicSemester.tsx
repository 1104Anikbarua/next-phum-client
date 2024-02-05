// import React from "react";
// import PhInput from "../../../components/form/PhInput";
import PhForm from "../../../components/form/PhForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Col, Row } from "antd";
import PhSelect from "../../../components/form/PhSelect";
import { monthsOptions } from "../../../constant/global";
import { semesterNameOptions } from "../../../constant/semester";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schema/academidSemester/academicSemester.schema";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagementApi";
import { toast } from "sonner";
import { TError } from "../../../types/global";

const year = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4, 5].map((number) => ({
  value: String(year + number),
  label: String(year + number),
}));

const CreateAcademicSemester = () => {
  const [addAcademicSemester, { isLoading }] = useAddAcademicSemesterMutation();

  //
  const onsubmit: SubmitHandler<FieldValues> = async (data) => {
    const { value, label } = semesterNameOptions[Number(data.name) - 1];

    const semesterInfo = {
      name: label,
      semesterCode: value,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };
    try {
      const res = await addAcademicSemester(semesterInfo).unwrap();
      if (res.success) {
        toast.success(res.message);
      }

      // console.log(res);

      //
    } catch (error) {
      toast.error((error as TError).data.message);
    }
  };

  //
  return (
    <Row align={"middle"} justify={"center"} style={{ height: "100vh" }}>
      <Col span={8}>
        <PhForm
          onSubmit={onsubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          {/* <PhInput name="name" type="text" label="Name"></PhInput> */}
          <PhSelect
            placeholder="Semester Name"
            name={"name"}
            label={"Semester Name"}
            options={semesterNameOptions}
          />

          <PhSelect
            placeholder="Year"
            name="year"
            label="Year"
            options={yearOptions}
          />

          <PhSelect
            placeholder="Start Month"
            name="startMonth"
            label="Start Month"
            options={monthsOptions}
          />

          <PhSelect
            placeholder="End Month"
            name="endMonth"
            label="End Month"
            options={monthsOptions}
          />
          <Button htmlType="submit" block type="primary" loading={isLoading}>
            Create Semester
          </Button>
        </PhForm>
      </Col>
    </Row>
  );
};

export default CreateAcademicSemester;
