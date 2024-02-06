import {
  FieldValues,
  FormProvider,
  Resolver,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { ReactNode } from "react";
import { Form } from "antd";
//
type TInputProps = {
  children: ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
  defaultValues?: Record<string, unknown>;
  resolver?: Resolver;
};

const PhForm = ({
  children,
  onSubmit,
  defaultValues,
  resolver,
}: TInputProps) => {
  const formConfig: Partial<TInputProps> = {};

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  if (resolver) {
    formConfig["resolver"] = resolver;
  }
  const methods = useForm(formConfig);
  //

  // way-1
  const onsubmit = (data: FieldValues) => {
    onSubmit(data), methods.reset();
  };
  //
  return (
    <FormProvider {...methods}>
      <Form
        action=""
        // before refactor
        // onSubmit={methods.handleSubmit(onSubmit)}
        // after refactor
        // way-2
        // onFinish={methods.handleSubmit((values) => {
        //   onSubmit(values), methods.reset();
        // })}

        // before refactor
        // onFinish={methods.handleSubmit(onSubmit)}
        layout="vertical"
        // way-3
        onFinish={methods.handleSubmit(onsubmit)}
      >
        <p style={{ color: "blue", textAlign: "center", fontSize: "24px" }}>
          THIS IS PH FORM PAGE
        </p>

        {children}
      </Form>
    </FormProvider>
  );
};

export default PhForm;
