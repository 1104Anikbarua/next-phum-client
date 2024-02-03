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

  return (
    <FormProvider {...methods}>
      <Form
        action=""
        // before refactor
        // onSubmit={methods.handleSubmit(onSubmit)}
        // after refactor
        onFinish={methods.handleSubmit(onSubmit)}
        layout="vertical"
      >
        <p>THIS IS PH FORM PAGE</p>

        {children}
      </Form>
    </FormProvider>
  );
};

export default PhForm;
