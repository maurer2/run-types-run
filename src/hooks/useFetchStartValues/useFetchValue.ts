import useSWR from 'swr';
import { fromZodError } from 'zod-validation-error';

import { pizzaFormValidationSchema } from '../../schema/pizza/validation';
import type { pizzaSettingsSchema } from '../../schema/pizza/settings';
import type { FormSettings, FormValues } from '../../types/pizza';
import type { FetchingState2, Loading2, Success2, Fail2, OptionsFromZodError } from './types';

const zodErrorOptions: OptionsFromZodError = {
  // maxIssuesInMessage: 1,
  prefix: '',
  prefixSeparator: '|',
};

const fetcher = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response?.statusText || `Error fetching ${url}}`);
  }

  return response.json();
};

type Schema = typeof pizzaSettingsSchema; // todo make generic

function useFetchValue(url: string, schema: Schema) {
  const {
    data,
    error,
    isLoading,
  } = useSWR<FormSettings, Error>(url[0], fetcher, { revalidateOnFocus: false });

  if (isLoading) {
    return {
      status: 'loading',
      progress: true,
    } as const satisfies Loading2;
  }

  if (error instanceof Error || !data) {
    return {
      status: 'fail',
      errors: error?.message || 'Loading error',
    } as const satisfies Fail2;
  }

  const parseResult = schema.safeParse(data);
  if (parseResult.success) {
    return {
      status: 'success',
      payload: data,
    } as const satisfies Success2<FormSettings>;
  }

  return {
    status: 'fail',
    errors: fromZodError(parseResult.error, zodErrorOptions).message,
  } as const satisfies Fail2;
}

export default useFetchValue;


type Debug = ReturnType<typeof useFetchValue>;
