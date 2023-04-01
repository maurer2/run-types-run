import type { fromZodError } from 'zod-validation-error';
import type { FormSettings, FormValues } from '../../types/pizza';

export type Payload<T1, T2> = {
  formSettings: T1;
  defaultValues: T2;
};

export type Loading = {
  status: 'loading';
  progress: Payload<boolean, boolean>;
};

export type Success = {
  status: 'success';
  payload: Payload<FormSettings, FormValues>;
};

export type Fail = {
  status: 'fail';
  error: Partial<Payload<string, string>>;
};

export type FetchingState = Loading | Success | Fail;


export type Loading2 = {
  status: 'loading';
  progress: boolean;
};

export type Success2<T> = {
  status: 'success';
  payload: T;
};

export type Fail2 = {
  status: 'fail';
  errors: Error['message'];
};

export type FetchingState2<T> = Loading2 | Success2<T> | Fail;

export type OptionsFromZodError = Parameters<typeof fromZodError>[1];
