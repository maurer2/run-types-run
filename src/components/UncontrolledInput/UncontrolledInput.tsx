import type { ReactElement } from 'react';
import type { FieldValues } from 'react-hook-form';

import { clsx } from 'clsx';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import type { UncontrolledInputProps } from './types';

const UncontrolledInput = <T extends FieldValues>({
  label,
  name,
  type = 'text',
}: UncontrolledInputProps<T>): ReactElement => {
  const { getFieldState, register } = useFormContext();

  const fieldState = getFieldState(name);
  const hasError = Boolean(fieldState.error?.message?.length);
  const errorId = `${name}-error`;
  const id = `id-${name}`;

  return (
    <fieldset className="form-control w-full max-w-xs">
      <label className="label" htmlFor={id}>
        <span className="label-text">{label}</span>
      </label>
      <input
        {...register(name)}
        aria-describedby={hasError ? errorId : undefined}
        aria-invalid={hasError}
        className={clsx('input', 'input-primary', 'input-bordered', 'w-full', 'max-w-xs', {
          'input-error': hasError,
        })}
        id={id}
        type={type}
      />
      {hasError && (
        <p className="mt-2 text-red-500" id={errorId}>{fieldState.error?.message}</p>
      )}
    </fieldset>
  );
};

export default UncontrolledInput;
