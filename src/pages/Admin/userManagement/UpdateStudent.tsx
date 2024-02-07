// import React from "react";
import { Button, Col, Divider, Form, Input, Row, Spin } from "antd";
import { useParams } from "react-router-dom";
import PhForm from "../../../components/form/PhForm";
import PhInput from "../../../components/form/PhInput";
import PhInputNumber from "../../../components/form/PhInputNumber";
import PhSelect from "../../../components/form/PhSelect";
import PhDate from "../../../components/form/PhDate";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import {
  useSetStudentMutation,
  useGetStudentQuery,
} from "../../../redux/features/admin/userManagementApi";
import { bloodGroupsOptions, gendersOptions } from "../../../constant/global";
import {
  useGetAcademicDepartmentQuery,
  useGetAcademicSemestersQuery,
} from "../../../redux/features/admin/academicManagementApi";
import { toast } from "sonner";

const UpdateStudent = () => {
  const { studentId } = useParams();

  const { data, isFetching } = useGetStudentQuery(studentId);

  //
  const { data: sData, isLoading: sLoading } =
    useGetAcademicSemestersQuery(undefined);

  const { data: dData, isLoading: dLoading } =
    useGetAcademicDepartmentQuery(undefined);

  const [updateStudent, { isLoading: isUpdateLoading }] =
    useSetStudentMutation();
  const academicSemesterOptions = sData?.result?.map(({ name, _id, year }) => ({
    label: `${name} ${year}`,
    value: _id,
  }));

  const academicDepartmentOptions = dData?.result?.map(({ _id, name }) => ({
    label: `${name}`,
    value: _id,
  }));
  //

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const studentInfo = {
      customId: studentId,
      student: data,
    };

    //
    const id = toast.loading("Updating Student Information", {
      position: "top-center",
    });
    try {
      const res = await updateStudent(studentInfo).unwrap();
      if (res.success) {
        toast.success("Student information updated successfully", {
          id,
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error("Fail to update student information", {
        id,
        position: "top-center",
      });
    }
  };

  return (
    <Row
    // align={"middle"} justify={"center"}
    >
      {isFetching ? (
        <Spin fullscreen />
      ) : (
        <Col span={24}>
          <PhForm onSubmit={onSubmit} defaultValues={data?.data}>
            <Divider>Personal Information</Divider>
            <Row gutter={[20, 20]}>
              {/* First Name */}
              <Col
                span={24}
                sm={{ span: 12 }}
                md={{ span: 12 }}
                lg={{ span: 8 }}
              >
                <PhInput
                  name="name.firstName"
                  placeholder="First Name"
                  type="text"
                  key={"firstname"}
                  label="First Name"
                />
              </Col>
              {/* Middle Name */}
              <Col
                span={24}
                sm={{ span: 12 }}
                md={{ span: 12 }}
                lg={{ span: 8 }}
              >
                <PhInput
                  name="name.middleName"
                  placeholder="Middle Name"
                  type="text"
                  key={"middlename"}
                  label="Middle Name"
                />
              </Col>
              {/* Last Name */}
              <Col
                span={24}
                sm={{ span: 12 }}
                md={{ span: 12 }}
                lg={{ span: 8 }}
              >
                <PhInput
                  name="name.lastName"
                  placeholder="Last Name"
                  type="text"
                  key={"lastname"}
                  label="Last Name"
                />
              </Col>
              {/* Age */}
              <Col
                span={24}
                sm={{ span: 12 }}
                md={{ span: 12 }}
                lg={{ span: 8 }}
              >
                <PhInputNumber
                  name="age"
                  placeholder="Age"
                  type="number"
                  key={"age"}
                  label="Age"
                />
              </Col>
              {/* Gender */}
              <Col
                span={24}
                sm={{ span: 12 }}
                md={{ span: 12 }}
                lg={{ span: 8 }}
              >
                <PhSelect
                  label="Gender"
                  name={"gender"}
                  options={gendersOptions}
                  placeholder={"Gender"}
                  key={"gender"}
                />
              </Col>
              {/* Date of Birth */}
              <Col
                span={24}
                sm={{ span: 12 }}
                md={{ span: 12 }}
                lg={{ span: 8 }}
              >
                {/* <PhInput
              name="dateOfBirth"
              placeholder="Date of Birth"
              type="text"
              key={"dateofbirth"}
              label="Date Of Birth"
            /> */}
                <PhDate
                  key={"dateofbirth"}
                  label="Date Of Birth"
                  name="dateOfBirth"
                  placeholder="Date Of Birth"
                />
              </Col>
              {/* Bloodgroup */}
              <Col
                span={24}
                sm={{ span: 12 }}
                md={{ span: 12 }}
                lg={{ span: 8 }}
              >
                <PhSelect
                  label="Blood Group"
                  placeholder="Blood Group"
                  name={"bloodGroup"}
                  key={"bloodgroup"}
                  options={bloodGroupsOptions}
                />
              </Col>
              <Col
                span={24}
                sm={{ span: 12 }}
                md={{ span: 12 }}
                lg={{ span: 8 }}
              >
                <Controller
                  name="profileImage"
                  render={({ field: { onChange, value, ...field } }) => (
                    <Form.Item label="Profile Image">
                      <Input
                        value={value?.fileName}
                        {...field}
                        onChange={(e) => onChange(e.target?.files?.[0])}
                        placeholder="Image"
                        type="file"
                      />
                    </Form.Item>
                  )}
                />
              </Col>
            </Row>
            <Divider>Contact Information</Divider>
            <Row gutter={[20, 20]}>
              {/* Email  */}
              <Col
                span={24}
                sm={{ span: 12 }}
                md={{ span: 12 }}
                lg={{ span: 8 }}
              >
                <PhInput
                  name="email"
                  placeholder="Email"
                  type="text"
                  key={"email"}
                  label="Email"
                />
              </Col>
              {/* Contact No  */}
              <Col
                span={24}
                sm={{ span: 12 }}
                md={{ span: 12 }}
                lg={{ span: 8 }}
              >
                <PhInput
                  name="contactNo"
                  placeholder="Contact No"
                  type="text"
                  key={"contactNo"}
                  label="Contact No"
                />
              </Col>
              {/* Emergency Contact No  */}
              <Col
                span={24}
                sm={{ span: 12 }}
                md={{ span: 12 }}
                lg={{ span: 8 }}
              >
                <PhInput
                  name="emergencyContactNo"
                  placeholder="Emergency Contact No"
                  type="text"
                  key={"emergencyContactNo"}
                  label="Emergency Contact No"
                />
              </Col>
              {/* Present Address  */}
              <Col
                span={24}
                sm={{ span: 12 }}
                md={{ span: 12 }}
                lg={{ span: 8 }}
              >
                <PhInput
                  name="presentAddress"
                  placeholder="Present Address"
                  type="text"
                  key={"presentAddress"}
                  label="Present Address"
                />
              </Col>
              {/* Permanent Address  */}
              <Col
                span={24}
                sm={{ span: 12 }}
                md={{ span: 12 }}
                lg={{ span: 8 }}
              >
                <PhInput
                  name="permanentAddress"
                  placeholder="Permanent Address"
                  type="text"
                  key={"permanentAddress"}
                  label="Permanent Address"
                />
              </Col>
            </Row>
            <Divider>Guardian Information</Divider>
            <Row gutter={[20, 20]}>
              {/* Father Name  */}
              <Col
                span={24}
                sm={{ span: 12 }}
                md={{ span: 12 }}
                lg={{ span: 8 }}
              >
                <PhInput
                  name="guardian.fatherName"
                  placeholder="Father Name"
                  type="text"
                  key={"fatherName"}
                  label="Father Name"
                />
              </Col>
              {/* Fathe Occupation  */}
              <Col
                span={24}
                sm={{ span: 12 }}
                md={{ span: 12 }}
                lg={{ span: 8 }}
              >
                <PhInput
                  name="guardian.fatherOccupation"
                  placeholder="Father Occupation"
                  type="text"
                  key={"fatherOccupation"}
                  label="Father Occupation"
                />
              </Col>
              {/* Father Contact No  */}
              <Col
                span={24}
                sm={{ span: 12 }}
                md={{ span: 12 }}
                lg={{ span: 8 }}
              >
                <PhInput
                  name="guardian.fatherContactNo"
                  placeholder="Father Contact No"
                  type="text"
                  key={"fatherContactNo"}
                  label="Father Contact No"
                />
              </Col>
              {/* Mother Name  */}
              <Col
                span={24}
                sm={{ span: 12 }}
                md={{ span: 12 }}
                lg={{ span: 8 }}
              >
                <PhInput
                  name="guardian.motherName"
                  placeholder="Mother Name"
                  type="text"
                  key={"motherName"}
                  label="Mother Name"
                />
              </Col>
              {/* Mother Occupation  */}
              <Col
                span={24}
                sm={{ span: 12 }}
                md={{ span: 12 }}
                lg={{ span: 8 }}
              >
                <PhInput
                  name="guardian.motherOccupation"
                  placeholder="Mother Occupation"
                  type="text"
                  key={"motherOccupation"}
                  label="Mother Occupation"
                />
              </Col>
              {/* Mother Contact No  */}
              <Col
                span={24}
                sm={{ span: 12 }}
                md={{ span: 12 }}
                lg={{ span: 8 }}
              >
                <PhInput
                  name="guardian.motherContactNo"
                  placeholder="Mother Contact No"
                  type="text"
                  key={"motherContactNo"}
                  label="Mother Contact No"
                />
              </Col>
              {/* Local Guardian Name  */}
              <Col
                span={24}
                sm={{ span: 12 }}
                md={{ span: 12 }}
                lg={{ span: 8 }}
              >
                <PhInput
                  name="localGuardian.name"
                  placeholder="Local Guardian Name"
                  type="text"
                  key={"localGuardianName"}
                  label="Local Guardian Name"
                />
              </Col>
              {/* Local Guardian Contact No  */}
              <Col
                span={24}
                sm={{ span: 12 }}
                md={{ span: 12 }}
                lg={{ span: 8 }}
              >
                <PhInput
                  name="localGuardian.contactNo"
                  placeholder="Local Contact No"
                  type="text"
                  key={"localContactNo"}
                  label="Local Guardian Contact No"
                />
              </Col>
              {/* Local Guardian Occupation  */}
              <Col
                span={24}
                sm={{ span: 12 }}
                md={{ span: 12 }}
                lg={{ span: 8 }}
              >
                <PhInput
                  name="localGuardian.occupation"
                  placeholder="Local Guardian Occupation"
                  type="text"
                  key={"localGuardianOccupation"}
                  label="Local Guardian Occupation"
                />
              </Col>
              {/* Local Guardian Address  */}
              <Col
                span={24}
                sm={{ span: 12 }}
                md={{ span: 12 }}
                lg={{ span: 8 }}
              >
                <PhInput
                  name="localGuardian.address"
                  placeholder="Local Guardian address"
                  type="text"
                  key={"localGuardianAddress"}
                  label="Local Guardian Address"
                />
              </Col>
            </Row>
            <Divider>Academic Information</Divider>
            {/* Academic Semester  */}
            <Row gutter={[20, 20]}>
              <Col
                span={24}
                sm={{ span: 12 }}
                md={{ span: 12 }}
                lg={{ span: 8 }}
              >
                <PhSelect
                  options={academicSemesterOptions}
                  // options={[]}
                  label="Academic Semester"
                  name="admissionSemester"
                  placeholder="Academic Semester"
                  key={"admissionSemester"}
                  disabled={sLoading}
                />
              </Col>
              {/* Academic Department  */}
              <Col
                span={24}
                sm={{ span: 12 }}
                md={{ span: 12 }}
                lg={{ span: 8 }}
              >
                <PhSelect
                  // options={[]}
                  options={academicDepartmentOptions}
                  label="Academic Department"
                  name="academicDepartment"
                  placeholder="Academic Department"
                  key={"academicDepartment"}
                  disabled={dLoading}
                />
              </Col>
            </Row>
            {/* Submit Button */}
            <Row justify={"end"}>
              <Button
                htmlType="submit"
                type="primary"
                loading={isFetching || isUpdateLoading}

                // block
              >
                Create Student
              </Button>
            </Row>
          </PhForm>
        </Col>
      )}
    </Row>
  );
};

export default UpdateStudent;
