import React from 'react';
import type { NextPage } from 'next';

import type { FormSettings, FormValues } from './types';
import PizzaForm from './PizzaForm';

import { useFetchStartValues } from './Hooks/useFetchStartValues';

const Pizza: NextPage = () => {
  const [hasFetchedSuccessfully, data, errors, isLoading] = useFetchStartValues([
    '/api/pizza/form-settings',
    '/api/pizza/default-values',
  ]);

  const showForm = hasFetchedSuccessfully && isLoading.every((loadingState) => !loadingState);

  console.log(hasFetchedSuccessfully)

  return (
    <article className="container max-w-4xl mx-auto px-8 pt-8">
      <div className="mockup-window border border-base-300">
        <div className="px-4 py-16 bg-base-200">
          {!showForm ? (
            <>
              <p>Loading form settings</p>
              {isLoading[0] ? (
                <progress className="progress w-56 mt-4 mb-4" />
              ) : (
                <p className="badge badge-success mb-4">has Loaded</p>
              )}

              <p>Loading default values</p>
              {isLoading[1] ? (
                <progress className="progress w-56 mt-4 mb-4" />
              ) : (
                <p className="badge badge-success mb-4">has Loaded</p>
              )}
            </>
          ) : (
            <PizzaForm formSettings={data.formSettings} defaultValues={data.defaultValuesData} />
          )}
        </div>
      </div>
    </article>
  );
};

export default Pizza;
