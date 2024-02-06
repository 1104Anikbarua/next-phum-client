// import React from "react";
import { Form, InputNumber } from "antd";
import { Controller } from "react-hook-form";

interface IInputNumberProps {
  type: string;
  name: string;
  label: string;
  placeholder: string;
}
const PhInputNumber = ({
  type,
  name,
  label,
  placeholder,
}: IInputNumberProps) => {
  return (
    <div>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <InputNumber
              style={{ width: "100%" }}
              onChange={field.onChange}
              value={field.value}
              placeholder={placeholder}
              id={name}
              type={type}
              wheel={false}
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PhInputNumber;
