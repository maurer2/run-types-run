import React, { useState } from "react";
import type { NextPage } from "next";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./styles.module.css";

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
    <article className="container grid mx-auto h-screen">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className={`${styles.form} mx-auto my-auto border-solid p-16 border border-slate-600`}
      >
        <legend className={styles.legend}>
          <h1 className={styles.labelText}>Simple form validation</h1>
        </legend>
        <fieldset className={styles.fieldset}>
          <label className={styles.label}>
            <span className="label-text">First Name</span>
            <input
              {...register("firstName", { required: true })}
              type="text"
              aria-invalid={Boolean(errors.firstName)}
              aria-describedby="field-1-errors"
            />
            <span id="field-1-errors" className={styles.errors}>
              {Boolean(errors.firstName) && <span className="decoration-red-100">Field has errors</span>}
              <pre>{errors.firstName?.message}</pre>
            </span>
          </label>
          <label className={styles.label}>
            <span className="label-text">Last Name</span>
            <input
              {...register("lastName", { required: true })}
              type="text"
              aria-invalid={Boolean(errors.lastName)}
              aria-describedby="field-2-errors"
            />
            <span id="field-2-errors" className={styles.errors}>
              {Boolean(errors.lastName) && <span className="decoration-red-100">Field has errors</span>}
              <pre>{errors.lastName?.message}</pre>
            </span>
          </label>
        </fieldset>
        <button
          type="submit"
          className={`${styles.controls} p-2 border-solid border border-slate-600`}
        >
          Send
        </button>
        <code className={`${styles.debug} h-25 bg-slate-100 overflow-y-auto`}>
          {Boolean(Object.keys(results).length) && <pre>{JSON.stringify(results, null, 2)}</pre>}
        </code>
      </form>
    </article>
  );
};

export default SFV;
