import React, { useId, forwardRef } from "react";
import type { ReactElement, ForwardedRef } from "react";

const UncontrolledInput = forwardRef(
  (
    { label, ...props }: { label: string },
    ref: ForwardedRef<HTMLInputElement>
  ): ReactElement => {
    const htmlId = useId();

    return (
      <>
        <label htmlFor={htmlId}>{label}</label>
        <input
          {...props}
          type="text"
          id={htmlId}
          defaultValue=""
          ref={ref}
          className="block h-full border select-none cursor-pointer"
        />
      </>
    );
  }
);

export default UncontrolledInput;
