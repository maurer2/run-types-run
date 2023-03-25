import useSWR from 'swr';

import { pizzaFormValidationSchema } from '../../schema/pizza/validation';
import { pizzaSettingsSchema } from '../../schema/pizza/settings';
import type { FormSettings, FormValues } from '../../types/pizza';
import type { FetchingState, Loading, Success, Fail } from './types';

const fetcher = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response?.statusText ?? 'Fetch error');
  }

  return response.json();
};

function useFetchStartValues(url: string[]) {
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
    const isValidFormSettingsData = pizzaSettingsSchema.safeParse(formSettingsData).success;
    const isValidDefaultValuesData = pizzaFormValidationSchema.safeParse(defaultValuesData).success;

    // formSettingsData && defaultValuesData only necessary for TS strict mode
    if (
      formSettingsData &&
      defaultValuesData &&
      isValidFormSettingsData &&
      isValidDefaultValuesData
    ) {
      fetchingState = {
        status: 'success',
        payload: {
          formSettings: formSettingsData,
          defaultValues: defaultValuesData,
        },
      } satisfies Success;
    } else {
      fetchingState = {
        status: 'fail',
        error: {
          formSettings: formSettingsLoadingError ?? new Error('Error'),
          defaultValues: defaultValuesLoadingError ?? new Error('Error'),
        },
      } satisfies Fail;
    }
  }

  return [fetchingState] as const;
}

export default useFetchStartValues;
