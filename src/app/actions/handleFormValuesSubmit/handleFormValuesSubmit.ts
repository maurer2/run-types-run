'use server';

import { redirect } from 'next/navigation';
import { type FieldError, type FieldErrors } from 'react-hook-form';

import type { FormValues } from '../../../types/pizza';

import { pizzaFormValidationSchema } from '../../../schema/pizza/validation';

export async function handleFormValuesSubmit(formValues: FormValues) {
  const formValueParsingResult = pizzaFormValidationSchema.safeParse({});
  // const formValueParsingResult = pizzaFormValidationSchema.safeParse(formValues);

  console.log(`Form values received: ${JSON.stringify(formValues, null, 4)}`);

  if (!formValueParsingResult.success) {
    const errorList = Object.entries(formValueParsingResult.error.flatten().fieldErrors).map(([fieldName, errorMessages]) => {

      const error: FieldError = {
        message: errorMessages[0],
        type: 'value',
      }
      return [fieldName, error];
    })

    const errors: FieldErrors = Object.fromEntries(errorList);

    return {
      errors,
    }
  }

  return redirect('/pizza/success');
}
