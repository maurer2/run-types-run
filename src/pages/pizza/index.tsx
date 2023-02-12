import React from 'react';
import type { NextPage } from 'next';

import PizzaForm from '../../components/PizzaForm';
import Preloader from '../../components/Preloader';
import useFetchStartValues from '../../hooks/useFetchStartValues';
import { apiRoutes } from '../../constants/pizza/urls';

const Pizza: NextPage = () => {
  const [fetchingState] = useFetchStartValues([apiRoutes.formSettings, apiRoutes.defaultValues]);

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
