import type { ReactElement } from 'react';

import { clsx } from 'clsx';
import React from 'react';
import { useFormContext } from 'react-hook-form';

import type { UncontrolledRadioCheckboxProps } from './types';

const UncontrolledRadioCheckbox = <T extends Array<string>>({
  label,
  name,
  type,
  values,
}: UncontrolledRadioCheckboxProps<T>): ReactElement => {
  const { getFieldState, register } = useFormContext();

  const fieldState = getFieldState(name);
  const isRadio = type === 'radio';

  return (
    <fieldset aria-describedby={`id-${name}`}>
      <legend className="mb-4" id={`id-${name}`}>
        {label ?? name}
      </legend>
      <ul>
        {values.map((value) => (
          <li className="form-control" key={value}>
            <label className="label-text cursor-pointer mt-2" htmlFor={`${name}-${value}`}>
              <input
                {...register(name)}
                aria-invalid={fieldState.error ? 'true' : 'false'}
                className={clsx('checked:bg-primary-500', {
                  checkbox: !isRadio,
                  'checkbox-primary': !isRadio,
                  'checkbox-sm': !isRadio,
                  radio: isRadio,
                  'radio-sm': isRadio,
                })}
                data-testid={`id-${name}`}
                id={`${name}-${value}`}
                type={type}
                value={value}
              />
              <span className="label-text ml-4">{value}</span>
            </label>
          </li>
        ))}
      </ul>
      {Boolean(fieldState.error) && (
        <p className="mt-2 text-red-500">{fieldState.error?.message?.toString()}</p>
      )}
    </fieldset>
  );
};

export default UncontrolledRadioCheckbox;
