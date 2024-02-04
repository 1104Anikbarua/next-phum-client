// import React from 'react';
// import { LockOutlined, UserOutlined } from "@ant-design/icons";
// import { Button, Checkbox, Form, Input } from "antd";
import { Button, Row, Spin } from "antd";
import { FieldValues } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { IUser, login } from "../redux/features/auth/authSlice";
import { getDecodedUser } from "../utlis/decodeUser.utlis";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CheckCircleOutlined, WarningOutlined } from "@ant-design/icons";
import PhForm from "../components/form/PhForm";
import PhInput from "../components/form/PhInput";
const Login = () => {
  // const onFinish = (values) => {
  //   console.log("Received values of form: ", values);
  // };

  const location = useLocation();
  const navigate = useNavigate();

  const [setLogin, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();

  // const { handleSubmit, register } = useForm({
  //   defaultValues: { customId: "A-0001", password: "12345678" },
  // });

  const defaultValues = { customId: "A-0001", password: "12345678" };

  const onSubmit = async (data: FieldValues) => {
    // toast id can be use to close this toast if other toast is on the chain
    const toastId = toast.loading("Loading Data", {
      duration: 2000,
      icon: <Spin />,
      position: "top-center",
    });
    try {
      const res = await setLogin(data).unwrap();
      const user = getDecodedUser(res.data.accessToken) as IUser;
      dispatch(login({ user, token: res.data.accessToken }));
      //one solution if role is not exists in user object.
      // if ((user as { role: string })?.role as string) {
      //   navigate(from, { replace: true });
      // }
      toast.success("Logged in successful", {
        duration: 2000,
        icon: <CheckCircleOutlined />,
        position: "top-center",
        id: toastId,
      });
      const from = location?.state?.from?.pathname || `/${user?.role}`;
      navigate(from, { replace: true });
    } catch (error) {
      toast.error("Login failed", {
        duration: 2000,
        icon: <WarningOutlined />,
        position: "bottom-right",
        id: toastId,
      });
    }
  };

  return (
    <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
      <PhForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <PhInput name={"customId"} type={"text"} label={"Id"} />
        <PhInput name={"password"} type={"text"} label={"Password"} />
        <Button htmlType="submit" type="primary" block>
          {isLoading ? <Spin /> : "Submit"}
        </Button>
      </PhForm>
    </Row>
  );
};

export default Login;
