// import React from 'react';

import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

interface ISelectProps {
  name: string;
  label: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  placeholder: string;
  disabled?: boolean;
}

const PhSelect = ({
  name,
  label,
  options,
  placeholder,
  disabled,
}: ISelectProps) => {
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
            // before refactor
            // this way react-hook-form default value is not going to work
            // onChange={field.onChange}
            // after refactor
            onChange={field.onChange}
            value={field.value}
            options={options}
            disabled={disabled}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default PhSelect;
