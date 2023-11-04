import React from 'react';
import type { NextPage } from 'next';

import PizzaForm from '../../components/PizzaForm';
import Preloader from '../../components/Preloader';
import useFetchValue from '../../hooks/useFetchValue';
import { apiRoutes } from '../../constants/pizza/urls';
import { pizzaSettingsSchema } from '../../schema/pizza/settings';
import { pizzaFormValidationSchema } from '../../schema/pizza/validation';
import type { FormSettings, FormValues } from '../../types/pizza';

const Pizza: NextPage = () => {
  const formSettings = useFetchValue<FormSettings>(
    ['pizza', 'settings'],
    apiRoutes.formSettings,
    pizzaSettingsSchema
  );
  const defaultValues = useFetchValue<FormValues>(
    ['pizza', 'default-values'],
    apiRoutes.defaultValues,
    pizzaFormValidationSchema,
  );

  const showForm = formSettings.status === 'success' && defaultValues.status === 'success';

  return (
    <article className="container max-w-4xl mx-auto px-8 py-8">
      <div className="mockup-window border border-base-300">
        <div className="px-4 py-16 bg-base-200">
          {showForm ? (
            <PizzaForm formSettings={formSettings.payload} defaultValues={defaultValues.payload} />
          ) : (
            <>
              <Preloader textLabel="Form settings" fetchingState={formSettings} />
              <Preloader textLabel="Default values" fetchingState={defaultValues} />
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default Pizza;
