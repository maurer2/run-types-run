import type { ReactElement } from 'react';
import type { FieldValues } from 'react-hook-form';

import { clsx } from 'clsx';
import React, { useId } from 'react';

import type { UncontrolledInputProps } from './types';

const UncontrolledInput = <T extends FieldValues>({
  error,
  label,
  name,
  register,
  type = 'text',
}: UncontrolledInputProps<T>): ReactElement => {
  const htmlId = useId();

  return (
    <fieldset className="form-control w-full max-w-xs">
      <label className="label" htmlFor={htmlId}>
        <span className="label-text">{label}</span>
      </label>
      <input
        aria-invalid={error ? 'true' : 'false'}
        className={clsx('input', 'input-primary', 'input-bordered', 'w-full', 'max-w-xs', {
          'input-error': error,
        })}
        id={htmlId}
        type={type}
        {...register(name)}
      />
      {Boolean(error) && <p className="mt-2 text-red-500">{error?.message?.toString()}</p>}
    </fieldset>
  );
};

export default UncontrolledInput;
