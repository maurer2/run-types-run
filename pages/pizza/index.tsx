import React from 'react';
import type { NextPage } from 'next';

import PizzaForm from './PizzaForm';

import { useFetchStartValues } from './Hooks/useFetchStartValues';

const Pizza: NextPage = () => {
  const [fetchingState] = useFetchStartValues([
    '/api/pizza/form-settings',
    '/api/pizza/default-values',
  ]);

  return (
    <article className="container max-w-4xl mx-auto px-8 pt-8">
      <div className="mockup-window border border-base-300">
        <div className="px-4 py-16 bg-base-200">
          {fetchingState.status === 'loading' || fetchingState.status === 'fail' ? (
            <>
              <p>Loading form settings</p>
              {fetchingState.status === 'loading' && fetchingState.progress.formSettings && (
                <progress className="progress w-56 mt-4 mb-4" />
              )}
              {fetchingState.status === 'loading' && !fetchingState.progress.formSettings && (
                <p className="badge badge-success mb-4">has Loaded</p>
              )}
              {fetchingState.status === 'fail' && fetchingState.error.formSettings && (
                <p className="badge badge-error mb-4">has Loaded</p>
              )}

              <p>Loading default values</p>
              {fetchingState.status === 'loading' && fetchingState.progress.defaultValues && (
                <progress className="progress w-56 mt-4 mb-4" />
              )}
              {fetchingState.status === 'loading' && !fetchingState.progress.defaultValues && (
                <p className="badge badge-success mb-4">has Loaded</p>
              )}
              {fetchingState.status === 'fail' && fetchingState.error.defaultValues && (
                <p className="badge badge-error mb-4">has Loaded</p>
              )}
            </>
          ) : (
            <PizzaForm
              formSettings={fetchingState.payload.formSettings}
              defaultValues={fetchingState.payload.defaultValues}
            />
          )}
        </div>
      </div>
    </article>
  );
};

export default Pizza;
