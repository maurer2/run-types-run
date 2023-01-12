import React from "react";
import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import UncontrolledInput from "./UncontrolledInput";

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
        <UncontrolledInput label="id" register={register} />
      </form>
    </div>
  );
};

export default Pizza;
