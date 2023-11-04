import type { ChangeEvent, ReactElement } from "react";

import React, { useId } from "react";

import type { ControlledInputProps } from "./types";

function ControlledInput({
  label,
  onChange,
  type = 'text',
  value
}: ControlledInputProps): ReactElement {
  const htmlId = useId();

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onChange(event?.target.value);
  };

  return (
    <div className="mt-4">
      <label htmlFor={htmlId}>{label}</label>
      <input
        className="block h-full border"
        id={htmlId}
        name={htmlId}
        onChange={handleChange}
        type={type}
        value={value}
      />
    </div>
  );
}

export default ControlledInput;
