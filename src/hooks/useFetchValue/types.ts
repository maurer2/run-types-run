import type { fromZodError } from 'zod-validation-error';

export type Loading = {
  status: 'loading';
};

export type Success<T> = {
  payload: T;
  status: 'success';
};

export type Fail = {
  errors: string;
  status: 'fail';
};

export type FetchingState<T> = Fail | Loading | Success<T>;

export type OptionsFromZodError = Parameters<typeof fromZodError>[1];
