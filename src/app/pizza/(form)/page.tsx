import React from 'react';

import type { FormSettings, FormValues } from '../../../types/pizza';

import PizzaForm from '../../../components/PizzaForm';
import { apiRoutes } from '../../../constants/pizza/urls';
import { pizzaSettingsSchema } from '../../../schema/pizza/settings';
import { pizzaFormValidationSchema } from '../../../schema/pizza/validation';

const url = 'http://localhost:3000';

async function getData(pathName: string) {
  const response = await fetch(`${url}${pathName}`);

  if (!response.ok) {
    throw new Error('Error');
  }

  return response.json();
}

export default async function Pizza() {
  const formSettings = await getData(apiRoutes.formSettings);
  const defaultValues = await getData(apiRoutes.defaultValues);

  const isValidFormSettings = pizzaSettingsSchema.safeParse(formSettings).success;
  const isValidDefaultValues = pizzaFormValidationSchema.safeParse(defaultValues).success;

  return (isValidFormSettings && isValidDefaultValues) ? (
    <PizzaForm defaultValues={defaultValues as FormValues} formSettings={formSettings as FormSettings} />
  ) : (
    <div className="alert alert-error shadow-lg mt-8">
      <svg
        className="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
      <span>Error loading data</span>
    </div>
  );
}
