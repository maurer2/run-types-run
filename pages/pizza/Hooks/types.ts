import type { FormSettings, FormValues } from '../types';

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
  error: Partial<Payload<Error, Error>>;
};

export type FetchingState = Loading | Success | Fail;
