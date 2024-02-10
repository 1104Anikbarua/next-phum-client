// import React from 'react';

import { Form, Select } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

interface ISelectProps {
  name: string;
  label: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  placeholder: string;
  disabled?: boolean;
  mode?: "multiple" | "tags" | undefined;
  onValueChange: React.Dispatch<React.SetStateAction<string>>;
}

const PhSelectControl = ({
  name,
  label,
  options,
  placeholder,
  disabled,
  mode,
  onValueChange,
}: ISelectProps) => {
  // use useFormContext because we use form provider
  const { control } = useFormContext();

  // use watch is watching if anything written or selected to provided field
  const selectValue = useWatch({
    control,
    name, //only watch what field name inside name
  });

  useEffect(() => {
    onValueChange(selectValue); //onValueChange===setIds and set the value in state
  }, [onValueChange, selectValue]);

  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        // console.log(field),
        <Form.Item label={label} required={true}>
          <Select
            placeholder={placeholder}
            style={{ width: "100%" }}
            // before refactor
            // this way react-hook-form default value is not going to work
            // onChange={field.onChange}
            // after refactor
            onChange={field.onChange}
            value={field?.value}
            options={options}
            defaultValue={
              // not work if select change
              // eslint-disable-next-line no-constant-condition
              (field?.name === "admissionSemester" &&
                `${field?.value?.name} ${field?.value?.year}`) ||
              (field?.name === "academicDepartment"
                ? field?.value?.name
                : field?.value)
            }
            disabled={disabled}
            mode={mode}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default PhSelectControl;
