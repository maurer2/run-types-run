import React from 'react';
import type { NextPage } from 'next';
import useSWR from 'swr';
import type { Key, Fetcher } from 'swr';

import type { FormSettings } from './types';
import PizzaForm from './PizzaForm';

const fetcher: Fetcher<FormSettings, Key> = (url: string): Promise<FormSettings> => fetch(url).then((res) => res.json()); // todo generic

const Pizza: NextPage = () => {
  const {
    data: formSettings,
    error: formSettingsLoadingError,
    isLoading: isLoadingFormSettings,
  } = useSWR<FormSettings, Error>('/api/pizza', fetcher);
  // const { data, error, isLoading: isLoadingDefaultFormValues } = useSWR('/api/pizza/default-values', fetcher);

  // todo validate FormSettings

  const showForm = !formSettingsLoadingError && !isLoadingFormSettings && !!formSettings;

  return (
    <article className="container max-w-4xl mx-auto px-8 pt-8">
      <div className="mockup-window border border-base-300">
        <div className="px-4 py-16 bg-base-200">
          {!showForm ? (
            <>
              <p>Loading form settings</p>
              <progress className="progress w-56" />

              {/* <p>Loading default values</p>
                <progress className="progress w-56" /> */}
            </>
          ) : (
            <PizzaForm formSettings={formSettings} />
          )}
        </div>
      </div>
    </article>
  );
};

export default Pizza;
