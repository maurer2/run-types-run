import React from 'react';
import type { NextPage } from 'next';

import PizzaForm from './PizzaForm';
import Preloader from './Preloader';

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
            <Preloader fetchingState={fetchingState} />
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
