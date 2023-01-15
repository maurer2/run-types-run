import type { FieldError } from 'react-hook-form';

export type UncontrolledInputProps = {
  htmlLabel: string;
  error: FieldError | undefined;
};
