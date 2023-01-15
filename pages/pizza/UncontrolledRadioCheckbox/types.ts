import type { FieldError } from 'react-hook-form';

export type UncontrolledRadioCheckboxProps = {
  htmlLabel: string;
  value:  string;
  type: 'radio' | 'checkbox';
  error: FieldError | undefined;
};
