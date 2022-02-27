import React, { useState } from "react";
import type { NextPage } from "next";
import { useForm, SubmitHandler } from "react-hook-form";

import { Fields } from "./types";

const SFV: NextPage = () => {
  const [results, setResults] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    // watch,
  } = useForm<Fields>({
    defaultValues: {
      firstName: "",
      // hasMiddleName: false,
      // middleName: "",
      lastName: "",
    },
  });

  const onSubmit: SubmitHandler<Fields> = (fieldValues) => {
    setResults(fieldValues);
  };

  // console.log(watch("middleName"));

  return (
    <>
      <h1>Simple form validation</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <label style={{ display: "block" }}>
          First Name
          <input
            type="text"
            {...(register("firstName"), { required: true })}
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby="field-1-errors"
          />
          <span id="field-1-errors">
            {Boolean(errors.firstName) && <span>Field has errors:</span>}
            <pre>{errors.firstName?.message}</pre>
          </span>
        </label>
        <label style={{ display: "block" }}>
          Last Name
          <input
            type="text"
            aria-invalid={Boolean(errors.lastName)}
            aria-describedby="field-2-errors"
            {...register("lastName", { required: true })}
          />
          <span id="field-1-errors">
            {Boolean(errors.lastName) && <span>Field has errors:</span>}
            <pre>{errors.lastName?.message}</pre>
          </span>
        </label>

        <button type="submit">Send</button>

        <code>
          <pre>{JSON.stringify(results)}</pre>
        </code>
      </form>
    </>
  );
};

export default SFV;
