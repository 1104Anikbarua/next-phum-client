// import React from 'react';
import { Col, Divider, Row } from "antd";
import PhForm from "../../../components/form/PhForm";
import PhSelect from "../../../components/form/PhSelect";
import PhInputNumber from "../../../components/form/PhInputNumber";
import PhInput from "../../../components/form/PhInput";
import {
  useGetAllCoursesQuery,
  useGetRegisterSemesterQuery,
} from "../../../redux/features/admin/courseManagementApi";
import {
  useGetAcademicDepartmentQuery,
  useGetAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagementApi";
import { useGetFacultiesQuery } from "../../../redux/features/admin/userManagementApi";

const CreateOfferedCourse = () => {
  //generate days option in select dropdown
  const days = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"].map((day) => ({
    label: day,
    value: day,
  }));
  //
  //generate course option in select dropdown
  const { data: courses } = useGetAllCoursesQuery(undefined);
  const courseOptions = courses?.response?.map(({ _id, title }) => ({
    label: title,
    value: _id,
  }));
  //generate academic faculty option in select dropdown
  const { data: academicFaculties } = useGetAcademicFacultiesQuery(undefined);
  const academicFacultyOptions = academicFaculties?.result?.map(
    ({ _id, name }) => ({ label: name, value: _id })
  );
  //
  //generate course option in select dropdown
  const { data: academicDepartments } =
    useGetAcademicDepartmentQuery(undefined);
  const academicDepartmentOptions = academicDepartments?.result?.map(
    ({ _id, name }) => ({ label: name, value: _id })
  );
  //generate course option in select dropdown
  const { data: semesterRegistrations } =
    useGetRegisterSemesterQuery(undefined);
  const semesterRegistrationOptions = semesterRegistrations?.response?.map(
    ({ _id, academicSemester }) => ({
      label: `${academicSemester.name} ${academicSemester.year}`,
      value: _id,
    })
  );
  //generate course option in select dropdown
  const { data: faculties } = useGetFacultiesQuery(undefined);
  const facultyOptions = faculties?.response?.map(({ _id, fullName }) => ({
    label: fullName,
    value: _id,
  }));
  // create offered course handler
  const onSubmit = () => {};

  return (
    <Row
    // justify={"center"} align={"middle"}
    >
      <Col span={24}>
        <PhForm onSubmit={onSubmit}>
          {/* ** */}
          {/* course  */}
          <Divider>Academic Information</Divider>
          <Row gutter={[16, 16]}>
            <Col span={24} sm={12} md={12} lg={8}>
              <PhSelect
                name="course"
                label="Course Name"
                options={courseOptions}
                placeholder="Course Name"
                key={"course"}
              />
            </Col>
            {/* academic faculty  */}
            <Col span={24} sm={12} md={12} lg={8}>
              <PhSelect
                name="academicFaculty"
                label="Academic Faculty"
                options={academicFacultyOptions}
                placeholder="Academic Faculty"
                key={"academicFaculty"}
              />
            </Col>
            {/* academic department  */}
            <Col span={24} sm={12} md={12} lg={8}>
              <PhSelect
                name="academicDepartment"
                label="Academic Department"
                options={academicDepartmentOptions}
                placeholder="Academic Department"
                key={"academicDepartment"}
              />
            </Col>
            {/* semester registration  */}
            <Col span={24} sm={12} md={12} lg={8}>
              <PhSelect
                name="semesterRegistration"
                label="Semester Registration"
                options={semesterRegistrationOptions}
                placeholder="Semester Registration"
              />
            </Col>
            {/* faculty  */}
            <Col span={24} sm={12} md={12} lg={8}>
              <PhSelect
                label="Faculty Name"
                name="faculty"
                options={facultyOptions}
                placeholder="Faculty Name"
                key={"faculty"}
              />
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            {/* max capacity  */}
            <Col span={24} sm={12} md={12} lg={8}>
              <PhInputNumber
                label="Capacity"
                name="maxCapacity"
                placeholder="Capacity"
                type="number"
                key={"capacity"}
              />
            </Col>
            {/* Section  */}
            <Col span={24} sm={12} md={12} lg={8}>
              <PhInput
                name="section"
                placeholder="Section"
                type="text"
                key={"section"}
                label="Section"
              />
            </Col>
            {/* Start Time  */}
            <Col span={24} sm={12} md={12} lg={8}>
              <PhInput
                name="startTime"
                placeholder="Start Time"
                type="text"
                key={"startTime"}
                label="Start Time"
              />
            </Col>
            {/* End Time  */}
            <Col span={24} sm={12} md={12} lg={8}>
              <PhInput
                name="endTime"
                placeholder="End Time"
                type="text"
                key={"endTime"}
                label="End Time"
              />
            </Col>
            {/* Days  */}
            <Col span={24} sm={12} md={12} lg={8}>
              <PhSelect
                mode={"multiple"}
                options={days}
                name="days"
                placeholder="Day"
                key={"days"}
                label="Day"
              />
            </Col>
          </Row>
          {/*  */}
        </PhForm>
      </Col>
    </Row>
  );
};

export default CreateOfferedCourse;
