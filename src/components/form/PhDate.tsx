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
  //   const onChange: DatePickerProps["onChange"] = (date, dateString) => {
  //     console.log(date, dateString);
  //   };

  return (
    <Controller
      name={name}
      render={({ field }) => (
        <Form.Item label={label}>
          <DatePicker
            style={{ width: "100%" }}
            format={"DD/MM/YYYY"}
            onChange={field.onChange}
            placeholder={placeholder}
          />
        </Form.Item>
      )}
    />
  );
};

export default PhDate;
