import useSWR from 'swr';
import { fromZodError } from 'zod-validation-error';
import type { z } from 'zod';

import type { Loading, Success, Fail, OptionsFromZodError } from './types';
import { fetcher } from '../../helpers/fetcher';

const zodErrorOptions: OptionsFromZodError = {
  prefix: 'Error',
  unionSeparator: 'or' // disable Oxford comma
};

function useFetchValue<T>(url: string, schema: z.ZodTypeAny) {
  const { data, error, isLoading } = useSWR<T, Error>(url, fetcher<T>, {
    revalidateOnFocus: false,
  });

  if (isLoading) {
    return {
      status: 'loading',
    } as const satisfies Loading;
  }

  // removing undefined data case early to simplify parseResult.success and parseResult.error handling
  if (error instanceof Error || !data) {
    return {
      status: 'fail',
      errors: error?.message || 'Loading error',
    } as const satisfies Fail;
  }

  const parseResult = schema.safeParse(data);
  if (parseResult.success) {
    return {
      status: 'success',
      payload: data,
    } as const satisfies Success<T>;
  }

  return {
    status: 'fail',
    errors: fromZodError(parseResult.error, zodErrorOptions).message,
  } as const satisfies Fail;
}

export default useFetchValue;

// type Debug = ReturnType<typeof useFetchValue>;
