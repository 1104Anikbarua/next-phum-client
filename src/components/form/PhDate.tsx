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
        <Form.Item label={label} required>
          <DatePicker
            style={{ width: "100%" }}
            // onChange={(_, dateString) => field.onChange(dateString)}//date you get->2022-02-02
            onChange={field.onChange} //this way you get date->2004-02-16T15:34:54.740Z
            placeholder={placeholder}
          />
        </Form.Item>
      )}
    />
  );
};

export default PhDate;
