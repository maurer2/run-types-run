import type { FieldError, UseFormRegister } from 'react-hook-form';

export type UncontrolledRadioCheckboxProps<T> = {
  values: T;
  name: string;
  type: 'radio' | 'checkbox';
  error: FieldError | undefined;
  // register: UseFormRegister<T>;
  register: any; // todo
};
