'use client';

import React from 'react';

import type { FormSettings, FormValues } from '../../../types/pizza';

import PizzaForm from '../../../components/PizzaForm';
import Preloader from '../../../components/Preloader';
import { apiRoutes } from '../../../constants/pizza/urls';
import useFetchValue from '../../../hooks/useFetchValue';
import { pizzaSettingsSchema } from '../../../schema/pizza/settings';
import { pizzaFormValidationSchema } from '../../../schema/pizza/validation';

export default function Pizza() {
  const formSettings = useFetchValue<FormSettings>(
    ['pizza', 'form-settings'],
    apiRoutes.formSettings,
    pizzaSettingsSchema,
  );
  const defaultValues = useFetchValue<FormValues>(
    ['pizza', 'default-values'],
    apiRoutes.defaultValues,
    pizzaFormValidationSchema,
  );

  const showForm = formSettings.status === 'success' && defaultValues.status === 'success';

  return showForm ? (
    <PizzaForm defaultValues={defaultValues.payload} formSettings={formSettings.payload} />
  ) : (
    <>
      <Preloader fetchingState={formSettings} textLabel="Form settings" />
      <Preloader fetchingState={defaultValues} textLabel="Default values" />
    </>
  );
}
