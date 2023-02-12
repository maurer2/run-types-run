import React from 'react';
import type { ReactElement } from 'react';
import { useFormContext } from 'react-hook-form';
import { clsx } from 'clsx';

import type { UncontrolledRadioCheckboxProps } from './types';

const UncontrolledRadioCheckbox = <T extends Array<string>>({
  type,
  name,
  values,
}: UncontrolledRadioCheckboxProps<T>): ReactElement => {
  const { register, getFieldState } = useFormContext();

  const fieldState = getFieldState(name);
  const isRadio = type === 'radio';

  return (
    <fieldset aria-describedby={`id-${name}`}>
      <legend id={`id-${name}`} className="mb-4">
        Select {name}
      </legend>
      <ul>
        {values.map((value) => (
          <li key={value} className="form-control">
            <label htmlFor={`${name}-${value}`} className="label-text cursor-pointer mt-2">
              <input
                {...register(name)}
                type={type}
                id={`${name}-${value}`}
                className={clsx('checked:bg-primary-500', {
                  radio: isRadio,
                  // 'radio-primary': isRadio,
                  'radio-sm': isRadio,
                  checkbox: !isRadio,
                  'checkbox-primary': !isRadio,
                  'checkbox-sm': !isRadio,
                })}
                aria-invalid={fieldState.error ? 'true' : 'false'}
                value={value}
                data-testid={`id-${name}`}
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
