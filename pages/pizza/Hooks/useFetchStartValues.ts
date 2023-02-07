import useSWR from 'swr';

import type { FormSettings, FormValues } from '../types';
import type { FetchingState, Loading, Success, Fail } from './types';

const fetcher = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(response?.statusText ?? 'Fetch error');
  }

  return response.json();
};

export function useFetchStartValues(url: string[]) {
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
    // has no error
    if (!formSettingsLoadingError && !defaultValuesLoadingError) {
      // todo validation

      // has data and is validated
      if (!!formSettingsData && !!defaultValuesData) {
        fetchingState = {
          status: 'success',
          payload: {
            formSettings: formSettingsData,
            defaultValues: defaultValuesData,
          },
        } satisfies Success;
      }
    } else {
      fetchingState = {
        status: 'fail',
        error: {
          formSettings: formSettingsLoadingError,
          defaultValues: defaultValuesLoadingError,
        },
      } satisfies Fail;
    }
  }

  return [fetchingState] as const;
}
