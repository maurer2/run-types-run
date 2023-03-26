import useSWR from 'swr';
import { fromZodError } from 'zod-validation-error';

import { pizzaFormValidationSchema } from '../../schema/pizza/validation';
import { pizzaSettingsSchema } from '../../schema/pizza/settings';
import type { FormSettings, FormValues } from '../../types/pizza';
import type { FetchingState, Loading, Success, Fail } from './types';

const zodErrorOptions = {
  maxIssuesInMessage: 1,
  prefix: '',
  prefixSeparator: '',
};

const fetcher = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response?.statusText ?? 'Fetch error');
  }

  return response.json();
};

function useFetchStartValues(url: string[]): readonly [FetchingState] {
  const {
    data: formSettingsData,
    error: formSettingsLoadingError,
    isLoading: formSettingsIsLoading,
  } = useSWR<FormSettings, Error>(url[0], fetcher, { revalidateOnFocus: false });
  const {
    data: defaultValuesData,
    error: defaultValuesLoadingError,
    isLoading: defaultValuesIsLoading,
  } = useSWR<FormValues, Error>(url[1], fetcher, { revalidateOnFocus: false });

  // default
  let fetchingState: FetchingState = {
    status: 'loading',
    progress: {
      formSettings: true,
      defaultValues: true,
    },
  } satisfies Loading;

  // loading
  if (formSettingsIsLoading || defaultValuesIsLoading) {
    fetchingState = {
      status: 'loading',
      progress: {
        formSettings: formSettingsIsLoading,
        defaultValues: defaultValuesIsLoading,
      },
    } satisfies Loading;
  }
  // loading done
  if (!formSettingsIsLoading && !defaultValuesIsLoading) {
    const pizzaSettingsSchemaParseResult = pizzaSettingsSchema.safeParse(formSettingsData);
    const pizzaFormValidationParseResult = pizzaFormValidationSchema.safeParse(defaultValuesData);

    if (
      formSettingsData &&
      defaultValuesData &&
      pizzaSettingsSchemaParseResult.success &&
      pizzaFormValidationParseResult.success
    ) {
      fetchingState = {
        status: 'success',
        payload: {
          formSettings: formSettingsData,
          defaultValues: defaultValuesData,
        },
      } satisfies Success;
    } else {
      if (formSettingsLoadingError || defaultValuesLoadingError) {
        fetchingState = {
          status: 'fail',
          error: {
            formSettings: formSettingsLoadingError?.message,
            defaultValues: defaultValuesLoadingError?.message,
          },
        } satisfies Fail;
      }

      if (!pizzaSettingsSchemaParseResult.success || !pizzaFormValidationParseResult.success) {
        fetchingState = {
          status: 'fail',
          error: {
            formSettings: !pizzaSettingsSchemaParseResult.success
              ? fromZodError(pizzaSettingsSchemaParseResult.error, zodErrorOptions).message
              : undefined,
            defaultValues: !pizzaFormValidationParseResult.success
              ? fromZodError(pizzaFormValidationParseResult.error, zodErrorOptions).message
              : undefined,
          },
        } satisfies Fail;
      }
    }
  }

  return [fetchingState] as const;
}

export default useFetchStartValues;
