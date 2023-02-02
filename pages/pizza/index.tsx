import React from 'react';
import type { NextPage } from 'next';
import useSWR from 'swr';
import type { Key, Fetcher } from 'swr';

import type { FormSettings, FormValues } from './types';
import PizzaForm from './PizzaForm';

const fetcher: Fetcher<any, Key> = (url: string): Promise<any> =>
  fetch(url).then((res) => res.json());

const Pizza: NextPage = () => {
  const {
    data: formSettingsData,
    error: formSettingsLoadingError,
    isLoading: formSettingsIsLoading,
  } = useSWR<FormSettings, Error>('/api/pizza/form-settings', fetcher, {
    revalidateOnFocus: false,
  });
  const {
    data: defaultValuesData,
    error: defaultValuesLoadingError,
    isLoading: defaultValuesIsLoading,
  } = useSWR<FormValues, Error>('/api/pizza/default-values', fetcher, {
    revalidateOnFocus: false,
  });

  const hasError = !!formSettingsLoadingError || !!defaultValuesLoadingError;
  const isLoading = !!formSettingsIsLoading || !!defaultValuesIsLoading;
  const hasData = !!formSettingsData && !!defaultValuesData;
  // todo validate FormSettings

  const showForm = !hasError && !isLoading && hasData;

  return (
    <article className="container max-w-4xl mx-auto px-8 pt-8">
      <div className="mockup-window border border-base-300">
        <div className="px-4 py-16 bg-base-200">
          {!showForm ? (
            <>
              <p>Loading form settings</p>
              {formSettingsIsLoading ? (
                <progress className="progress w-56 mt-4 mb-4" />
              ) : (
                <p className="badge badge-success mb-4">has Loaded</p>
              )}

              <p>Loading default values</p>
              {defaultValuesIsLoading ? (
                <progress className="progress w-56 mt-4 mb-4" />
              ) : (
                <p className="badge badge-success mb-4">has Loaded</p>
              )}
            </>
          ) : (
            <PizzaForm formSettings={formSettingsData} defaultValues={defaultValuesData} />
          )}
        </div>
      </div>
    </article>
  );
};

export default Pizza;
