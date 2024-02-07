// import React from 'react';
import {
  DatePicker,
  Form,
  //  DatePickerProps,
} from "antd";
import { Controller } from "react-hook-form";

interface IDateProps {
  name: string;
  placeholder: string;
  label: string;
}

const PhDate = ({ name, placeholder, label }: IDateProps) => {
  //
  //  const dateFormat = "YYYY-MM-DD";

  return (
    <Controller
      name={name}
      render={({ field }) => (
        <Form.Item label={label}>
          <DatePicker
            style={{ width: "100%" }}
            onChange={(_, dateString) => field.onChange(dateString)}
            placeholder={placeholder}
          />
        </Form.Item>
      )}
    />
  );
};

export default PhDate;
