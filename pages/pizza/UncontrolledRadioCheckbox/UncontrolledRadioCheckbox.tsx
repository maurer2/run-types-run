import React, { useId, forwardRef } from 'react';
import type { ReactElement, ForwardedRef } from 'react';

import type { UncontrolledRadioCheckboxProps } from './types';

const UncontrolledRadioCheckbox = forwardRef(
  (
    { htmlLabel, type, value, error, ...props }: UncontrolledRadioCheckboxProps,
    ref: ForwardedRef<HTMLInputElement>,
  ): ReactElement => {
    const htmlId = useId();

    return (
      <>
        <input
          {...props}
          ref={ref}
          type={type}
          id={htmlId}
          aria-invalid={error ? 'true' : 'false'}
          className="w-4 h-4 mr-2"
          value={value}
        />
        <label htmlFor={htmlId}>{htmlLabel}</label>
      </>
    );
  },
);

export default UncontrolledRadioCheckbox;
