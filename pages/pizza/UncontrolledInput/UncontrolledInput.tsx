import React, { useId, forwardRef } from 'react';
import type { ReactElement, ForwardedRef } from 'react';

import type { UncontrolledInputProps } from './types';

const UncontrolledInput = forwardRef(
  (
    { htmlLabel, error, ...props }: UncontrolledInputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ): ReactElement => {
    const htmlId = useId();

    return (
      <div className="mt-4">
        <label htmlFor={htmlId}>{htmlLabel}</label>
        <input
          {...props}
          ref={ref}
          type="text"
          id={htmlId}
          aria-invalid={error ? 'true' : 'false'}
          className="block h-full border"
        />
        {Boolean(error) && (
          <p className="mt-2 text-red-500">
            {error?.message?.toString()}
          </p>
        )}
      </div>
    );
  },
);

export default UncontrolledInput;
