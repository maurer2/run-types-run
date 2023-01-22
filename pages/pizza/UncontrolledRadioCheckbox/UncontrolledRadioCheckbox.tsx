/* eslint-disable arrow-body-style */
import React from 'react';
import type { ReactElement } from 'react';

import type { UncontrolledRadioCheckboxProps } from './types';

const UncontrolledRadioCheckbox = <T extends Array<string>>({
  type, name, values, register, ...props
}: UncontrolledRadioCheckboxProps<T>): ReactElement => {
  // console.log(register);

  return (
    <div>
      {values.map((value) => (
        <div key={value}>
          <input
            {...props}
            {...register(name)}
            type={type}
            id={value}
            className="w-4 h-4 mr-2"
            value={value}
          />
          <label htmlFor={value}>{value}</label>
        </div>
      ))}
      <p className="mt-2 text-red-500">
        Error
      </p>
    </div>
  )
}

export default UncontrolledRadioCheckbox;
