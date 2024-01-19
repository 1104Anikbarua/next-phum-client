// import React from 'react';
// import { LockOutlined, UserOutlined } from "@ant-design/icons";
// import { Button, Checkbox, Form, Input } from "antd";
import { Button, Spin } from "antd";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { login } from "../redux/features/auth/authSlice";
import { getDecodedUser } from "../utlis/decodeUser.utlis";
import { useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  // const onFinish = (values) => {
  //   console.log("Received values of form: ", values);
  // };

  const location = useLocation();
  const navigate = useNavigate();

  const from = location?.state?.from?.pathname || "/";

  const [setLogin, { isLoading, error }] = useLoginMutation();
  const dispatch = useAppDispatch();
  console.log({ isLoading, error });
  const { handleSubmit, register } = useForm({
    defaultValues: { customId: "A-0001", password: "12345678" },
  });

  const onSubmit = async (data: { customId: string; password: string }) => {
    const res = await setLogin(data).unwrap();

    const user = getDecodedUser(res.data.accessToken);

    dispatch(login({ user, token: res.data.accessToken }));

    if ((user as { role: string })?.role as string) {
      navigate(from, { replace: true });
    }
  };

  return (
    // <Form
    //   name="normal_login"
    //   className="login-form"
    //   initialValues={{ remember: true }}
    //   onFinish={onFinish}
    // >
    //   <Form.Item
    //     name="username"
    //     rules={[{ required: true, message: "Please input your Username!" }]}
    //   >
    //     <Input
    //       prefix={<UserOutlined className="site-form-item-icon" />}
    //       placeholder="Username"
    //     />
    //   </Form.Item>
    //   <Form.Item
    //     name="password"
    //     rules={[{ required: true, message: "Please input your Password!" }]}
    //   >
    //     <Input
    //       prefix={<LockOutlined className="site-form-item-icon" />}
    //       type="password"
    //       placeholder="Password"
    //     />
    //   </Form.Item>
    //   <Form.Item>
    //     <Form.Item name="remember" valuePropName="checked" noStyle>
    //       <Checkbox>Remember me</Checkbox>
    //     </Form.Item>

    //     <a className="login-form-forgot" href="">
    //       Forgot password
    //     </a>
    //   </Form.Item>

    //   <Form.Item>
    //     <Button type="primary" htmlType="submit" className="login-form-button">
    //       Log in
    //     </Button>
    //     Or <a href="">register now!</a>
    //   </Form.Item>
    // </Form>

    <div>
      <h1 style={{ textAlign: "center" }}>User Login</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
        action=""
      >
        <div>
          <label htmlFor="id">Id</label>
          <input
            type="text"
            // name="customId"
            id="id"
            {...register("customId")}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="text"
            // name="password"
            id="password"
            {...register("password")}
          />
        </div>
        <Button htmlType="submit">{isLoading ? <Spin /> : "Submit"}</Button>
      </form>
    </div>
  );
};

export default Login;
