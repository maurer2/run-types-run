import useSWR from 'swr';
import type { Key, Fetcher } from 'swr';

import type { FormSettings, FormValues } from '../types';

const fetcher = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error();
    error.message = res.statusText;

    throw error;
  }

  return res.json();
};

export function useFetchStartValues(url: string[]) {
  const {
    data: formSettingsData,
    error: formSettingsLoadingError,
    isLoading: formSettingsIsLoading,
  } = useSWR<FormSettings, Error>(url[0], fetcher, {
    revalidateOnFocus: false,
  });
  const {
    data: defaultValuesData,
    error: defaultValuesLoadingError,
    isLoading: defaultValuesIsLoading,
  } = useSWR<FormValues, Error>(url[1], fetcher, {
    revalidateOnFocus: false,
  });

  console.log(formSettingsLoadingError, defaultValuesLoadingError);

  const isLoading: boolean[] = [formSettingsIsLoading, defaultValuesIsLoading];
  const data = {
    formSettings: undefined,
    defaultValuesData: undefined,
  } as any; // todo
  const errors: Error[] = [];

  let hasFetchedSuccessfully: boolean;

  // has no error
  if (!formSettingsLoadingError && !defaultValuesLoadingError) {
    if (formSettingsData && formSettingsData) {
      data.formSettings = formSettingsData;
      data.defaultValuesData = defaultValuesData;

      hasFetchedSuccessfully = true;
    } else {
      hasFetchedSuccessfully = false;
    }
  } else {
    console.log(formSettingsLoadingError, defaultValuesLoadingError);
    // has errors
    if (formSettingsLoadingError instanceof Error) {
      errors.push(formSettingsLoadingError);
    }
    if (defaultValuesLoadingError instanceof Error) {
      errors.push(defaultValuesLoadingError);
    }

    hasFetchedSuccessfully = false;
  }

  return [hasFetchedSuccessfully, data, errors, isLoading] as const;
}
