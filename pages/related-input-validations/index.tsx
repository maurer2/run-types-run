import React, { useEffect, useCallback, useMemo } from "react";
import type { NextPage } from "next";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "./styles.module.css";
import { Fields, FieldsStringified } from "./types";

const RIV: NextPage = () => {
  const schema = yup
    .object({
      field1: yup
        .string()
        .required("Field is required"),

      field2: yup
        .string()
        .required("Field is required"),

      field3: yup
        .string(),
    })
    .required();

  const {
    formState: { errors },
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
  } = useForm<FieldsStringified>({
    defaultValues: {
      field1: "",
      field2: "",
      field3: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Fields> = (fieldValues) => {};

  return (
    <>
      <article className="container grid mx-auto h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className={`${styles.form} mx-auto my-auto border-solid p-16 border border-slate-600`}
        >
          <legend className={styles.legend}>
            <h1 className={styles.labelText}>RIV</h1>
          </legend>
          <fieldset className={styles.fieldset}>
            <label className={styles.label}>
              <span className="label-text">Field 1 (Number)</span>
              <input
                {...register("field1", { required: true })}
                type="number"
                aria-invalid={Boolean(errors.field1)}
                aria-describedby="field-1-errors"
                className={`${errors.field1 ? "border-red-500" : ""}`}
              />
              <span id="field-1-errors" className={styles.errors}>
                {Boolean(errors.field1) && (
                  <span className="text-red-500">Field1 has errors</span>
                )}
                <pre>{errors.field1?.message}</pre>
              </span>
            </label>
            <label className={styles.label}>
              <span className="label-text">Field 2 (number)</span>
              <input
                {...register("field2", { required: true })}
                type="number"
                aria-invalid={Boolean(errors.field2)}
                aria-describedby="field-2-errors"
                className={`${errors.field2 ? "border-red-500" : ""}`}
              />
              <span id="field-2-errors" className={styles.errors}>
                {Boolean(errors.field2) && (
                  <span className="text-red-500">Field2 has errors</span>
                )}
                <pre>{errors.field2?.message}</pre>
              </span>
            </label>
            <label className={styles.label}>
              <span className="label-text">Field 3 (number)</span>
              <input
                {...register("field3")}
                type="number"
                aria-invalid={Boolean(errors.field3)}
                aria-describedby="field-3-errors"
                className={`${errors.field3 ? "border-red-500" : ""}`}
              />
              <span id="field-3-errors" className={styles.errors}>
                {Boolean(errors.field3) && (
                  <span className="text-red-500">Field3 has errors</span>
                )}
                <pre>{errors.field3?.message}</pre>
              </span>
            </label>
          </fieldset>
          <button
            type="submit"
            className={`${styles.controls} p-2 border-solid border border-slate-600`}
          >
            Send
          </button>
          <h2>Debug</h2>
          <code className={`${styles.debug} h-25 bg-slate-100 overflow-y-auto`}>
            <pre>{JSON.stringify(watch(), null, 2)}</pre>
          </code>
        </form>
      </article>

      <aside>
        Todo Test related field validation

        Field 1:
          Must be a currency (decimal)
          Required
          Must be larger than x
          Must be smaller than y

        Field 2:
          Must be a currency (decimal)
          Required
          Must not be 0
          Must be smaller than Field 1

        Field 3:
          Must be a currency (decimal)
          Optional

        Field 2 & 3:
          Must be at least x% of Field 1
          Field 2 must be larger than 3
      </aside>
    </>
  )
};

export default RIV;
