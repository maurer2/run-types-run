import React, { useState } from "react";
import type { NextPage } from "next";
import { useForm } from "react-hook-form";

const SFV: NextPage = () => {
  const [results, setResults] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    setResults(data);
  };

  return (
    <>
      <h1>Simple form validation</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label style={{ display: "block" }}>
          Field 1
          <input type="text" defaultValue="test" {...register("example")} />
        </label>

        <label style={{ display: "block" }}>
          Test 2
          <input
            type="text"
            {...register("exampleRequired", { required: true })}
          />
          {errors.exampleRequired && <span>This field is required</span>}
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
