import React, { useId } from "react";
import type { UseFormRegister, FieldValues } from "react-hook-form";
import type { ReactElement } from "react";

function UncontrolledInput({
  label,
  register,
}: {
  label: string;
  register: UseFormRegister<FieldValues & { id: string } & { name: string }>;
}): ReactElement {
  const htmlId = useId();

  return (
    <>
      <label htmlFor={htmlId}>{label}</label>
      <input
        type="input"
        id={htmlId}
        defaultValue=""
        {...register(label)}
        className="block h-full border select-none cursor-pointer"
      />
    </>
  );
}

export default UncontrolledInput;
