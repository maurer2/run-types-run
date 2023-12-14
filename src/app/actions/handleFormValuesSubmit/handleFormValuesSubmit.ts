'use server';

import { redirect } from 'next/navigation';

import type { FormValues } from '../../../types/pizza';
import { pizzaFormValidationSchema } from '../../../schema/pizza/validation';

export async function handleFormValuesSubmit(formValues: FormValues) {
  const formValueParsingResult = pizzaFormValidationSchema.safeParse(formValues);

  console.log(`Form values received: ${JSON.stringify(formValues, null, 4)}`);

  if (!formValueParsingResult.success) {
    return {
      errors: formValueParsingResult.error.flatten().fieldErrors,
    }
  }

  redirect('/pizza/success');
}
