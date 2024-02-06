import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

export interface IInputProps {
  type: string;
  name: string;
  label?: string;
  placeholder: string;
}

const PhInput = ({ type, name, label, placeholder }: IInputProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      {/* before refactor  */}
      {/* {label ? label : null} */}

      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          // after refactor
          <Form.Item label={label} required>
            <Input
              {...field}
              id={name}
              placeholder={placeholder}
              // type={type}
              type={type}
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PhInput;
