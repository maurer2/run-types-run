import type { FieldError, FieldPath, FieldValues, UseFormRegister } from 'react-hook-form';

export type UncontrolledInputProps<T extends FieldValues> = {
  error?: FieldError;
  label: string;
  name: FieldPath<T>; // https://github.com/orgs/react-hook-form/discussions/8025
  register: UseFormRegister<T>; // https://github.com/orgs/react-hook-form/discussions/4426#discussioncomment-623148
  type?: 'number' | 'text';
};
