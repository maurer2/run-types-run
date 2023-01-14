import React, { useId } from "react";
import type { ChangeEvent, ReactElement } from "react";

function ControlledInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}): ReactElement {
  const htmlId = useId();

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    onChange(event?.target.value);
  };

  return (
    <>
      <label htmlFor={htmlId}>{label}</label>
      <input
        type="text"
        id={htmlId}
        name={htmlId}
        onChange={handleChange}
        value={value}
        className="block h-full border select-none"
      />
    </>
  );
}

export default ControlledInput;
