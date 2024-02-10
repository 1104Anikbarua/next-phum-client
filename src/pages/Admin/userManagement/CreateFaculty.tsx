import { Button, Col, Divider, Form, Input, Row } from "antd";
import PhForm from "../../../components/form/PhForm";
import PhInput from "../../../components/form/PhInput";
import { Controller, FieldValues } from "react-hook-form";
import { useAddFacultyMutation } from "../../../redux/features/admin/userManagementApi";
import PhSelect from "../../../components/form/PhSelect";
import PhDate from "../../../components/form/PhDate";
import { useGetAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagementApi";
import { bloodGroupsOptions, gendersOptions } from "../../../constant/global";
import PhInputNumber from "../../../components/form/PhInputNumber";
import { toast } from "sonner";
import { IError } from "../../../types";
//
const CreateFaculty = () => {
  //
  const { data: sData, isLoading: dLoading } =
    useGetAcademicDepartmentQuery(undefined);

  const academicDepartmentOptions = sData?.result?.map(({ _id, name }) => ({
    label: `${name}`,
    value: _id,
  }));
  //
  //
  const [addFaculty, { isLoading }] = useAddFacultyMutation();
  //

  const onsubmit = async (data: FieldValues) => {
    //
    const id = toast.loading("Register Facuty", {
      position: "top-center",
      duration: 2000,
    });
    //
    const studentInfo = {
      faculty: data,
    };
    //

    const formData = new FormData();

    formData.append("data", JSON.stringify(studentInfo));
    formData.append("file", data.profileImage);
    //

    try {
      const res = await addFaculty(formData).unwrap();
      if (res.success) {
        toast.success(res.message, {
          id,
          position: "top-center",
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error((error as IError).data.message, {
        id,
        position: "top-center",
        duration: 2000,
      });
    }

    //
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
    dateOfBirth: "07-02-2022",
    bloodGroup: "A+",
    profileImage: "",
    designation: "Lecturer",
    //
    // contact info
    email: "teacher1@example.com",
    contactNo: "01811000001",
    emergencyContactNo: "01821000001",
    presentAddress: "a/z plaza,tv tower, flat-12",
    permanentAddress: "xy/z avenue,xv tower, flat-12",

    // academic info
    academicDepartment: "65c376581282ccf03ff26d77",
  };
  return (
    <Row>
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
            <Col span={24} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 8 }}>
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
            <Col span={24} sm={{ span: 12 }} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                name="designation"
                placeholder="Designation"
                type="text"
                key={"designation"}
                label="Designation"
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

          <Divider>Academic Information</Divider>
          <Row gutter={[20, 20]}>
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
          {/* Submit Button */}
          <Row justify={"end"}>
            <Button htmlType="submit" type="primary" loading={isLoading}>
              Create Faculty
            </Button>
          </Row>
        </PhForm>
      </Col>
    </Row>
  );
};

export default CreateFaculty;
