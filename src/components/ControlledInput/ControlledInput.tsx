import React, { useId } from "react";
import type { ChangeEvent, ReactElement } from "react";

import type { ControlledInputProps } from "./types";

function ControlledInput({
  label,
  value,
  onChange,
  type = 'text'
}: ControlledInputProps): ReactElement {
  const htmlId = useId();

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onChange(event?.target.value);
  };

  return (
    <div className="mt-4">
      <label htmlFor={htmlId}>{label}</label>
      <input
        type={type}
        id={htmlId}
        name={htmlId}
        onChange={handleChange}
        value={value}
        className="block h-full border"
      />
    </div>
  );
}

export default ControlledInput;
