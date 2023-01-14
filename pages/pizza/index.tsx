import React from "react";
import type { NextPage } from "next";
import { useForm, Controller } from "react-hook-form";

import UncontrolledInput from "./UncontrolledInput";
import ControlledInput from "./ControlledInput";

type FormValues = {
  // id: Uppercase<string>;
  id: string;
  name: string;
};

const Pizza: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm<FormValues>();
  const onSubmit = handleSubmit((data) => console.log(data));
  const watchFields: FormValues = watch();

  console.log(watchFields);

  return (
    <div>
      <h1>Pizza</h1>
      <form onSubmit={onSubmit}>
        <UncontrolledInput label="id" {...register('id')} />

        <Controller
          control={control}
          name="name"
          defaultValue=""
          render={({ field: { onChange, value } }) => (
            <ControlledInput label="value" onChange={onChange} value={value} />
          )}
        />
      </form>
    </div>
  );
};

export default Pizza;
