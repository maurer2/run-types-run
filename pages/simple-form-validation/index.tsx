import React, { useState } from "react";
import type { NextPage } from "next";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

import styles from "./styles.module.css";
import { Fields } from "./types";

const schema = yup.object({
  firstName: yup.string()
    .required()
    .min(2, 'Must contain at least 2 characters')
    .matches(/[a-zA-Z]/, 'Must only contain letters'),
  lastName: yup.string()
    .required()
    .min(2, 'Must contain at least 2 characters')
    .matches(/[a-zA-Z]/, 'Must only contain letters'),
}).required();

const SFV: NextPage = () => {
  const [results, setResults] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<Fields>({
    defaultValues: {
      firstName: "",
      hasMiddleName: false,
      middleName: "",
      lastName: "",
    },
    resolver: yupResolver(schema)
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
            <span className="label-text">First name</span>
            <input
              {...register("firstName", { required: true })}
              type="text"
              aria-invalid={Boolean(errors.firstName)}
              aria-describedby="field-1-errors"
            />
            <span id="field-1-errors" className={styles.errors}>
              {Boolean(errors.firstName) && (
                <span className="text-red-500	">Field has errors</span>
              )}
              <pre>{errors.firstName?.message}</pre>
            </span>
          </label>
          <label className={styles.label}>
            <span className="label-text">Has middle name</span>
            <input
              {...register("hasMiddleName")}
              type="checkbox"
            />
          </label>
          <label className={styles.label}>
            <span className="label-text">Middle name</span>
            <input
              {...register("middleName")}
              type="text"
              aria-invalid={Boolean(errors.lastName)}
              aria-describedby="field-3-errors"
              disabled={!watch("hasMiddleName")}
              className="disabled:opacity-25 disabled:cursor-not-allowed"
            />
            <span id="field-3-errors" className={styles.errors}>
              {Boolean(errors.lastName) && (
                <span className="text-red-500	">Field has errors</span>
              )}
              <pre>{errors.middleName?.message}</pre>
            </span>
          </label>
          <label className={styles.label}>
            <span className="label-text">Last name</span>
            <input
              {...register("lastName", { required: true })}
              type="text"
              aria-invalid={Boolean(errors.lastName)}
              aria-describedby="field-2-errors"
            />
            <span id="field-2-errors" className={styles.errors}>
              {Boolean(errors.lastName) && (
                <span className="text-red-500	">Field has errors</span>
              )}
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
          {Boolean(Object.keys(results).length) && (
            <pre>{JSON.stringify(results, null, 2)}</pre>
          )}
        </code>
      </form>
    </article>
  );
};

export default SFV;
