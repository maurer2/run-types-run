import type { FieldError } from 'react-hook-form';

export type UncontrolledInputProps = {
  error?: FieldError;
  htmlLabel: string;
  type?: 'number' | 'text';
};
