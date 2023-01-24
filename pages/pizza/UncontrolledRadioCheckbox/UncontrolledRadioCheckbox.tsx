import React from 'react';
import type { ReactElement } from 'react';
import { useFormContext } from 'react-hook-form';

import type { UncontrolledRadioCheckboxProps } from './types';

const UncontrolledRadioCheckbox = <T extends Array<string>>({
  type,
  name,
  values,
}: UncontrolledRadioCheckboxProps<T>): ReactElement => {
  const {
    register,
    getFieldState,
  } = useFormContext();

  const fieldState = getFieldState(name);
  console.log(fieldState)

  return (
    <fieldset aria-describedby="foo">
      <legend>Select {name}</legend>
      <ul>
        {values.map((value) => (
          <li key={value}>
            <input
              {...register(name)}
              type={type}
              id={value}
              className="w-4 h-4 mr-2"
              // aria-invalid={error ? 'true' : 'false'}
              value={value}
            />
            <label htmlFor={value}>{value}</label>
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
