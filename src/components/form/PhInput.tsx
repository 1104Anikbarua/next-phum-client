import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

interface IInputProps {
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
            <Input {...field} type={type} id={name} placeholder={placeholder} />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PhInput;
