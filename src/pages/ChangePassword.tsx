// import React from "react";
import { Button, Col, Row } from "antd";
import PhForm from "../components/form/PhForm";
import PhInput from "../components/form/PhInput";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useChangePasswordMutation } from "../redux/features/auth/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { IError } from "../types";

const ChangePassword = () => {
  //
  const navigate = useNavigate();
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  //
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log(data);
    const id = toast.loading("Changing password", {
      duration: 2000,
      position: "top-center",
    });

    try {
      const res = await changePassword(data).unwrap();

      if (res.success) {
        toast.success(res.message, {
          id,
          position: "top-center",
          duration: 2000,
        });
        navigate("/login");
      }
    } catch (error) {
      toast.error((error as IError)?.data?.message, {
        id,
        duration: 2000,
        position: "top-center",
      });
    }
  };
  //
  const changePasswordSchema = z.object({
    password: z.string({ required_error: "Old Password is required!" }),
    newPassword: z.string({ required_error: "New Password is required!" }),
  });
  //
  return (
    <Row align={"middle"} justify={"center"} style={{ height: "100vh" }}>
      <Col span={6}>
        <PhForm
          onSubmit={onSubmit}
          resolver={zodResolver(changePasswordSchema)}
        >
          <PhInput
            name="password"
            placeholder="Old Password"
            type="text"
            key={"password"}
            label="Old Password"
          />
          <PhInput
            name="newPassword"
            placeholder="New Password"
            type="text"
            key={"oldPassword"}
            label="New Password"
          />
          <Button htmlType="submit" type="primary" block loading={isLoading}>
            Change Password
          </Button>
        </PhForm>
      </Col>
    </Row>
  );
};

export default ChangePassword;
