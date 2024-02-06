import { Button, Col, Divider, Row } from "antd";
import PhForm from "../../../components/form/PhForm";
import PhInput from "../../../components/form/PhInput";
import { FieldValues } from "react-hook-form";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagementApi";
import PhSelect from "../../../components/form/PhSelect";
import PhDate from "../../../components/form/PhDate";
import {
  useGetAcademicDepartmentQuery,
  useGetAcademicSemestersQuery,
} from "../../../redux/features/admin/academicManagementApi";
import { bloodGroupsOptions, gendersOptions } from "../../../constant/global";
import PhInputNumber from "../../../components/form/PhInputNumber";
//
const CreateStudent = () => {
  //
  // fetch admission semester data
  const { data, isLoading: sLoading } = useGetAcademicSemestersQuery(undefined);

  const { data: sData, isLoading: dLoading } =
    useGetAcademicDepartmentQuery(undefined);

  const academicSemesterOptions = data?.result?.map(({ name, _id, year }) => ({
    label: `${name} ${year}`,
    value: _id,
  }));

  const academicDepartmentOptions = sData?.result?.map(({ _id, name }) => ({
    label: `${name}`,
    value: _id,
  }));
  //
  //
  const [addStudent, { isLoading }] = useAddStudentMutation();
  //

  const onsubmit = (data: FieldValues) => {
    //
    console.log(addStudent);
    console.log(data);
    //
    // const formData = new FormData();
    // formData.append("name", "value");
    // console.log(formData.get("name")); //return value
    // console.log([...formData.values()]); // return ["value"]
    // console.log([...formData.entries()]); //return ["name","value"]
  };
  //
  //
  //should be removed in production
  const studentDefaultValues = {
    name: {
      firstName: "john ",
      middleName: "doe",
      lastName: "white",
    },
    age: 30,
    gender: "Male",
    dateOfBirth: "01.01.2000",
    bloodGroup: "A+",
    profileImage: "",
    //
    // contact info
    email: "teacheronenumber@example.com",
    contactNo: "01800000000",
    emergencyContactNo: "01801010101",
    presentAddress: "a/z plaza,tv tower, flat-12",
    permanentAddress: "xy/z avenue,xv tower, flat-12",
    //
    // Guardian info

    guardian: {
      fatherName: "john doe sky",
      fatherOccupation: "mechanic",
      fatherContactNo: "01818889911",
      motherName: "sarach skin white",
      motherOccupation: "housewife",
      motherContactNo: "01818112233",
    },
    localGuardian: {
      name: "john doe local",
      contactNo: "01800000000",
      occupation: "cleaner",
      address: "cleaner colony",
    },
    //
    // academic info
    admissionSemester: "65ba53406b52a7eb4db0a8a5",
    academicDepartment: "65ba5f20e325552d0c88aad8",
  };
  return (
    <Row
    // align={"middle"} justify={"center"}
    >
      <Col span={24}>
        <PhForm onSubmit={onsubmit} defaultValues={studentDefaultValues}>
          <Divider>Personal Information</Divider>
          <Row gutter={[20, 20]}>
            {/* First Name */}
            <Col span={24} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                name="name.firstName"
                placeholder="First Name"
                type="text"
                key={"firstname"}
                label="First Name"
              />
            </Col>
            {/* Middle Name */}
            <Col span={24} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                name="name.middleName"
                placeholder="Middle Name"
                type="text"
                key={"middlename"}
                label="Middle Name"
              />
            </Col>
            {/* Last Name */}
            <Col span={24} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                name="name.lastName"
                placeholder="Last Name"
                type="text"
                key={"lastname"}
                label="Last Name"
              />
            </Col>
            {/* Age */}
            <Col span={24} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInputNumber
                name="age"
                placeholder="Age"
                type="number"
                key={"age"}
                label="Age"
              />
            </Col>
            {/* Gender */}
            <Col span={24} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhSelect
                label="Gender"
                name={"gender"}
                options={gendersOptions}
                placeholder={"Gender"}
                key={"gender"}
              />
            </Col>
            {/* Date of Birth */}
            <Col span={24} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 8 }}>
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
            <Col span={24} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhSelect
                label="Blood Group"
                placeholder="Blood Group"
                name={"bloodGroup"}
                key={"bloodgroup"}
                options={bloodGroupsOptions}
              />
            </Col>
          </Row>
          <Divider>Contact Information</Divider>
          <Row gutter={[20, 20]}>
            {/* Email  */}
            <Col span={24} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                name="email"
                placeholder="Email"
                type="text"
                key={"email"}
                label="Email"
              />
            </Col>
            {/* Contact No  */}
            <Col span={24} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                name="contactNo"
                placeholder="Contact No"
                type="text"
                key={"contactNo"}
                label="Contact No"
              />
            </Col>
            {/* Emergency Contact No  */}
            <Col span={24} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                name="emergencyContactNo"
                placeholder="Emergency Contact No"
                type="text"
                key={"emergencyContactNo"}
                label="Emergency Contact No"
              />
            </Col>
            {/* Present Address  */}
            <Col span={24} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                name="presentAddress"
                placeholder="Present Address"
                type="text"
                key={"presentAddress"}
                label="Present Address"
              />
            </Col>
            {/* Permanent Address  */}
            <Col span={24} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 8 }}>
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
            <Col span={24} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                name="guardian.fatherName"
                placeholder="Father Name"
                type="text"
                key={"fatherName"}
                label="Father Name"
              />
            </Col>
            {/* Fathe Occupation  */}
            <Col span={24} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                name="guardian.fatherOccupation"
                placeholder="Father Occupation"
                type="text"
                key={"fatherOccupation"}
                label="Father Occupation"
              />
            </Col>
            {/* Father Contact No  */}
            <Col span={24} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                name="guardian.fatherContactNo"
                placeholder="Father Contact No"
                type="text"
                key={"fatherContactNo"}
                label="Father Contact No"
              />
            </Col>
            {/* Mother Name  */}
            <Col span={24} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                name="guardian.motherName"
                placeholder="Mother Name"
                type="text"
                key={"motherName"}
                label="Mother Name"
              />
            </Col>
            {/* Mother Occupation  */}
            <Col span={24} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                name="guardian.motherOccupation"
                placeholder="Mother Occupation"
                type="text"
                key={"motherOccupation"}
                label="Mother Occupation"
              />
            </Col>
            {/* Mother Contact No  */}
            <Col span={24} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                name="guardian.motherContactNo"
                placeholder="Mother Contact No"
                type="text"
                key={"motherContactNo"}
                label="Mother Contact No"
              />
            </Col>
            {/* Local Guardian Name  */}
            <Col span={24} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                name="localGuardian.name"
                placeholder="Local Guardian Name"
                type="text"
                key={"localGuardianName"}
                label="Local Guardian Name"
              />
            </Col>
            {/* Local Guardian Contact No  */}
            <Col span={24} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                name="localGuardian.contactNo"
                placeholder="Local Contact No"
                type="text"
                key={"localContactNo"}
                label="Local Guardian Contact No"
              />
            </Col>
            {/* Local Guardian Occupation  */}
            <Col span={24} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                name="localGuardian.occupation"
                placeholder="Local Guardian Occupation"
                type="text"
                key={"localGuardianOccupation"}
                label="Local Guardian Occupation"
              />
            </Col>
            {/* Local Guardian Address  */}
            <Col span={24} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 8 }}>
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
          <Row gutter={[20, 20]}>
            {/* Academic Semester  */}
            <Col span={24} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhSelect
                options={academicSemesterOptions!}
                label="Academic Semester"
                name="admissionSemester"
                placeholder="Academic Semester"
                key={"admissionSemester"}
                disabled={sLoading}
              />
            </Col>
            {/* Academic Department  */}
            <Col span={24} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhSelect
                options={academicDepartmentOptions!}
                label="Academic Department"
                name="academicDepartment"
                placeholder="Academic Department"
                key={"academicDepartment"}
                disabled={dLoading}
              />
            </Col>
          </Row>

          <Row justify={"end"}>
            <Button
              htmlType="submit"
              type="primary"
              loading={isLoading}

              // block
            >
              Create Student
            </Button>
          </Row>
        </PhForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;
