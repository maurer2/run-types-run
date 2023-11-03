import { fromZodError } from 'zod-validation-error';
import type { z } from 'zod';
import { useQuery } from '@tanstack/react-query';

import type { Loading, Success, Fail, OptionsFromZodError } from './types';
import { fetcher } from '../../helpers/fetcher';

const zodErrorOptions: OptionsFromZodError = {
  prefix: 'Error',
  unionSeparator: 'or' // disable Oxford comma
};

function useFetchValue<T>(key: string[], url: string, schema: z.ZodTypeAny) {
  const {
    data,
    isError,
    isLoading,
    isFetching,
    error
  } = useQuery({
    queryKey: key,
    queryFn: () => <T>fetcher(url),
  });

  if (isLoading || isFetching) {
    return {
      status: 'loading',
    } as const satisfies Loading;
  }

  // removing undefined data case early to simplify parseResult.success and parseResult.error handling
  if (isError || !data) {
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
