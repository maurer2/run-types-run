import type { fromZodError } from 'zod-validation-error';

export type Loading = {
  status: 'loading';
};

export type Success<T> = {
  status: 'success';
  payload: T;
};

export type Fail = {
  status: 'fail';
  errors: Error['message'];
};

export type FetchingState2<T> = Loading | Success<T> | Fail;

export type OptionsFromZodError = Parameters<typeof fromZodError>[1];
