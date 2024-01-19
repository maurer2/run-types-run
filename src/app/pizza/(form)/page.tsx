import type { ZodSchema, z } from 'zod';

import React from 'react';

import type { FormSettings, FormValues } from '../../../types/pizza';

import PizzaForm from '../../../components/PizzaForm';
import { apiRoutes } from '../../../constants/pizza/urls';
import { pizzaSettingsSchema } from '../../../schema/pizza/settings';
import { pizzaFormValidationSchema } from '../../../schema/pizza/validation';

const url = process.env.NEXT_PUBLIC_VERCEL_URL;

async function getData<T extends ZodSchema>(pathName: string, schema: T): Promise<z.infer<T>> {
  try {
    const response = await fetch(`${url}${pathName}`);

    if (!response.ok) {
      throw new Error(`${response?.status} ${response?.statusText} ${pathName}` || `Error fetching ${pathName}`); // error triggers closest error.tsx
    }
    const data: unknown = await response.json();

    return schema.parse(data);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message, {
        cause: error,
      });
    }

    throw new Error(`Unknown error when fetching or parsing ${pathName}`);
  }
}

export default async function Pizza() {
  const formSettings = await getData(apiRoutes.formSettings, pizzaSettingsSchema) satisfies Error | FormSettings;
  const defaultValues = await getData(apiRoutes.defaultValues, pizzaFormValidationSchema) satisfies Error | FormValues;

  return (
    <PizzaForm defaultValues={defaultValues} formSettings={formSettings} />
  )
}
