import { useState } from "react";
import { Button, Col, Divider, Row, Spin } from "antd";
import PhForm from "../../../components/form/PhForm";
import PhSelect from "../../../components/form/PhSelect";
import PhInputNumber from "../../../components/form/PhInputNumber";
import PhInput from "../../../components/form/PhInput";
import {
  useAddOfferedCourseMutation,
  useGetAllCoursesQuery,
  useGetFacultiesByCourseIdQuery,
  useGetRegisterSemesterQuery,
} from "../../../redux/features/admin/courseManagementApi";
import {
  useGetAcademicDepartmentQuery,
  useGetAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagementApi";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PhSelectControl from "../../../components/form/PhSelectControl";
import { dayOptions } from "../../../constant/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { offeredCourseSchema } from "../../../schema/offeredCourse/offeredCourse.schema";
import { toast } from "sonner";
import { IError } from "../../../types";

// todo assign all faculty for courses or this component is going to crush either handle this problem in backend or handle it here
// beacuse when you donot assign faculty/teacher for a course /courses faculties property is null and you can not generate faculty options in select from null
// to fix assign faculties for a course in assign course faculties in course page or course table
const CreateOfferedCourse = () => {
  const [id, setIds] = useState("");

  //generate course option in select dropdown
  const { data: courses, isFetching: courseFetching } =
    useGetAllCoursesQuery(undefined);
  const courseOptions = courses?.response?.map(({ _id, title }) => ({
    label: title,
    value: _id,
  }));
  //generate academic faculty option in select dropdown
  const { data: academicFaculties, isFetching: academicFacultyFetching } =
    useGetAcademicFacultiesQuery(undefined);
  const academicFacultyOptions = academicFaculties?.result?.map(
    ({ _id, name }) => ({ label: name, value: _id })
  );
  //
  //generate course option in select dropdown
  const { data: academicDepartments, isFetching: academicDepartmentFetching } =
    useGetAcademicDepartmentQuery(undefined);
  const academicDepartmentOptions = academicDepartments?.result?.map(
    ({ _id, name }) => ({ label: name, value: _id })
  );
  //generate course option in select dropdown
  const {
    data: semesterRegistrations,
    isFetching: semesterRegistrationFetching,
  } = useGetRegisterSemesterQuery(undefined);
  const semesterRegistrationOptions = semesterRegistrations?.response?.map(
    ({ _id, academicSemester }) => ({
      label: `${academicSemester.name} ${academicSemester.year}`,
      value: _id,
    })
  );
  //generate course option in select dropdown
  const { data: faculties, isFetching: facultiesFetching } =
    useGetFacultiesByCourseIdQuery(id, { skip: !id });

  // !!!check line 25 no comment
  const facultyOptions = faculties?.response?.faculties?.map(
    ({ _id, fullName }) => ({
      label: fullName,
      value: _id,
    })
  );

  // faculties?.response?.faculties.map(
  //   ({ faculties }) => ({
  //     label: faculties?.fullName,
  //     value: faculties?._id,
  //   })
  // );

  const [addOfferedCourse, { isLoading }] = useAddOfferedCourseMutation();

  // create offered course handler
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const id = toast.loading("Creating offered course", { duration: 2000 });
    try {
      const res = await addOfferedCourse(data).unwrap();
      if (res.success) {
        toast.success(res.message, { id, duration: 2000 });
      }
    } catch (error) {
      toast.error((error as IError).data.message, { id, duration: 2000 });
    }
  };

  const semesterRegistrationDefault = {
    academicDepartment: "65c376291282ccf03ff26d74",
    academicFaculty: "65c375f71282ccf03ff26d6c",
    course: "65ba62edc5cb29e4863f329d",
    days: ["Sat", "Sun"],
    endTime: "11:30",
    faculty: "65c720a7c907f443ddc97665",
    maxCapacity: 40,
    section: "A",
    semesterRegistration: "65c4f7f12de730ecc54514c4",
    startTime: "09:30",
  };

  return courseFetching ? (
    <Spin fullscreen />
  ) : (
    <Row
    // justify={"center"} align={"middle"}
    >
      <Col span={24}>
        <PhForm
          onSubmit={onSubmit}
          resolver={zodResolver(offeredCourseSchema)}
          defaultValues={semesterRegistrationDefault}
        >
          {/* ** */}
          {/* course  */}
          <Divider>Academic Information</Divider>
          <Row gutter={[16, 16]}>
            <Col span={24} sm={12} md={12} lg={8}>
              <PhSelectControl
                name="course"
                label="Course Name"
                options={courseOptions}
                placeholder="Course Name"
                key={"course"}
                disabled={courseFetching}
                onValueChange={setIds}
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
                disabled={academicFacultyFetching}
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
                disabled={academicDepartmentFetching}
              />
            </Col>
            {/* semester registration  */}
            <Col span={24} sm={12} md={12} lg={8}>
              <PhSelect
                name="semesterRegistration"
                label="Semester Registration"
                options={semesterRegistrationOptions}
                placeholder="Semester Registration"
                disabled={semesterRegistrationFetching}
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
                disabled={!id || facultiesFetching}
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
                options={dayOptions}
                name="days"
                placeholder="Day"
                key={"days"}
                label="Day"
              />
            </Col>
          </Row>
          {/*  */}
          <Row justify={"end"}>
            <Button htmlType="submit" type="primary" loading={isLoading}>
              Create Offered Course
            </Button>
          </Row>
        </PhForm>
      </Col>
    </Row>
  );
};

export default CreateOfferedCourse;
