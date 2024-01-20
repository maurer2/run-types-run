import type { ZodSchema, z } from 'zod';

import React from 'react';

import type { FormSettings, FormValues } from '../../../types/pizza';

import PizzaForm from '../../../components/PizzaForm';
import { pizzaSettingsSchema } from '../../../schema/pizza/settings';
import { pizzaFormValidationSchema } from '../../../schema/pizza/validation';
import { defaults } from '../../config/defaults';
import { settings } from '../../config/settings';

const url = process.env.NEXT_PUBLIC_VERCEL_URL;

async function getData<T1, T2 extends ZodSchema>(config: T1, schema: T2): Promise<z.infer<T2>> {
  try {
    return schema.parse(config);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message, {
        cause: error,
      });
    }

    throw new Error('Unknown error when importing config file');
  }
}

export default async function Pizza() {
  const formSettings = await getData(settings, pizzaSettingsSchema) satisfies Error | FormSettings;
  const defaultValues = await getData(defaults, pizzaFormValidationSchema) satisfies Error | FormValues;

  console.log('NEXT_PUBLIC_VERCEL_URL', url);

  return (
    <PizzaForm
      defaultValues={defaultValues}
      formSettings={formSettings}
    />
  )
}
