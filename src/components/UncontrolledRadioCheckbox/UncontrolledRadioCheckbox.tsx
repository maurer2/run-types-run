import type { ReactElement } from 'react';

import { clsx } from 'clsx';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import type { UncontrolledRadioCheckboxProps } from './types';

const UncontrolledRadioCheckbox = <T extends string[]>({
  label,
  name,
  options,
  type,
}: UncontrolledRadioCheckboxProps<T>): ReactElement => {
  const { getFieldState, register } = useFormContext();

  const fieldState = getFieldState(name);
  const isRadio = type === 'radio';
  const hasError = Boolean(fieldState.error?.message?.length);
  const errorId = `${name}-error`;

  return (
    <fieldset aria-describedby={`id-${name}`}>
      <legend className="mb-4" id={`id-${name}`}>
        {label}
      </legend>
      <ul>
        {options.map((option) => (
          <li className="form-control" key={option}>
            <label className="label-text cursor-pointer mt-2" htmlFor={`${name}-${option}`}>
              <input
                {...register(name)}
                aria-describedby={hasError ? errorId : undefined}
                aria-invalid={hasError}
                className={clsx('checked:bg-primary-500', {
                  checkbox: !isRadio,
                  'checkbox-primary': !isRadio,
                  'checkbox-sm': !isRadio,
                  radio: isRadio,
                  'radio-sm': isRadio,
                })}
                data-testid={`id-${name}`}
                id={`${name}-${option}`}
                type={type}
                value={option}
              />
              <span className="label-text ml-4">{option}</span>
            </label>
          </li>
        ))}
      </ul>
      {hasError && (
        <p className="mt-2 text-red-500" id={errorId}>{fieldState.error?.message}</p>
      )}
    </fieldset>
  );
};

export default UncontrolledRadioCheckbox;
