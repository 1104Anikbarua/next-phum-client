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

const year = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4, 5].map((number) => ({
  value: String(year + number),
  label: String(year + number),
}));

const CreateAcademicSemester = () => {
  const onsubmit: SubmitHandler<FieldValues> = (data) => {
    const { value, label } = semesterNameOptions[Number(data.name) - 1];

    const semesterNameCode = {
      name: label,
      semesterCode: value,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };
    console.log(semesterNameCode);
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
            name={"name"}
            label={"Semester Name"}
            options={semesterNameOptions}
          />

          <PhSelect name="year" label="Year" options={yearOptions} />

          <PhSelect
            name="startMonth"
            label="Start Month"
            options={monthsOptions}
          />

          <PhSelect name="endMonth" label="End Month" options={monthsOptions} />
          <Button htmlType="submit" block type="primary">
            Create Semester
          </Button>
        </PhForm>
      </Col>
    </Row>
  );
};

export default CreateAcademicSemester;
