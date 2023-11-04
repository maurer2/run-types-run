import type { ForwardedRef, ReactElement } from 'react';

import { clsx } from 'clsx';
import React, { forwardRef, useId } from 'react';

import type { UncontrolledInputProps } from './types';

const UncontrolledInput = forwardRef(
  (
    { error, htmlLabel, type = 'text', ...props }: UncontrolledInputProps,
    ref: ForwardedRef<HTMLInputElement>,
  ): ReactElement => {
    const htmlId = useId();

    return (
      <fieldset className="form-control w-full max-w-xs">
        <label className="label" htmlFor={htmlId}>
          <span className="label-text">{htmlLabel}</span>
        </label>
        <input
          {...props}
          aria-invalid={error ? 'true' : 'false'}
          className={clsx('input', 'input-primary', 'input-bordered', 'w-full', 'max-w-xs', {
            'input-error': error,
          })}
          id={htmlId}
          ref={ref}
          type={type}
        />
        {Boolean(error) && <p className="mt-2 text-red-500">{error?.message?.toString()}</p>}
      </fieldset>
    );
  },
);

export default UncontrolledInput;
