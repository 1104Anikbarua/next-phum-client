// import React from 'react';

import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

interface ISelectProps {
  name: string;
  label: string;
  options: { value: string; label: string; disabled?: boolean }[];
  placeholder: string;
}

const PhSelect = ({ name, label, options, placeholder }: ISelectProps) => {
  //
  //   const handleChange = (value: string) => {
  //     console.log(`selected ${value}`);
  //   };

  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label} required={true}>
          <Select
            placeholder={placeholder}
            style={{ width: "100%" }}
            onChange={field.onChange}
            options={options}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default PhSelect;
