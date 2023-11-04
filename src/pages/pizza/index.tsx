import type { NextPage } from 'next';

import React from 'react';

import type { FormSettings, FormValues } from '../../types/pizza';

import PizzaForm from '../../components/PizzaForm';
import Preloader from '../../components/Preloader';
import { apiRoutes } from '../../constants/pizza/urls';
import useFetchValue from '../../hooks/useFetchValue';
import { pizzaSettingsSchema } from '../../schema/pizza/settings';
import { pizzaFormValidationSchema } from '../../schema/pizza/validation';

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
            <PizzaForm defaultValues={defaultValues.payload} formSettings={formSettings.payload} />
          ) : (
            <>
              <Preloader fetchingState={formSettings} textLabel="Form settings" />
              <Preloader fetchingState={defaultValues} textLabel="Default values" />
            </>
          )}
        </div>
      </div>
    </article>
  );
};

export default Pizza;
