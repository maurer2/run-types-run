import type { z } from 'zod';

import { useQuery } from '@tanstack/react-query';
import { fromZodError } from 'zod-validation-error';

import type { Fail, Loading, OptionsFromZodError, Success } from './types';

import { fetchValues } from './helpers';

const zodErrorOptions: OptionsFromZodError = {
  prefix: 'Error',
  unionSeparator: 'or' // disable Oxford comma
};

function useFetchValue<T>(key: string[], url: string, schema: z.ZodTypeAny) {
  const {
    data,
    error,
    isError,
    isFetching,
    isLoading
  } = useQuery({
    queryFn: () => <T>fetchValues(url),
    queryKey: key,
  });

  if (isLoading || isFetching) {
    return {
      status: 'loading',
    } as const satisfies Loading;
  }

  // removing undefined data case early to simplify parseResult.success and parseResult.error handling
  if (isError || !data) {
    return {
      errors: error?.message || 'Loading error',
      status: 'fail',
    } as const satisfies Fail;
  }

  const parseResult = schema.safeParse(data);
  if (parseResult.success) {
    return {
      payload: data,
      status: 'success',
    } as const satisfies Success<T>;
  }

  return {
    errors: fromZodError(parseResult.error, zodErrorOptions).message,
    status: 'fail',
  } as const satisfies Fail;
}

export default useFetchValue;
