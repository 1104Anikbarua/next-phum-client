import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

interface IInputProps {
  type: string;
  name: string;
  label?: string;
}

const PhInput = ({ type, name, label }: IInputProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      {/* before refactor  */}
      {/* {label ? label : null} */}

      <Controller
        name={name}
        render={({ field }) => (
          // after refactor
          <Form.Item label={label}>
            <Input {...field} type={type} id={name} />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PhInput;
