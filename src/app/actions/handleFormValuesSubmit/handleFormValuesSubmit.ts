'use server';

import { redirect } from 'next/navigation';
import { type FieldError, type FieldErrors, type FieldValues } from 'react-hook-form';

import { pizzaFormValidationSchema } from '../../../schema/pizza/validation';

export async function handleFormValuesSubmit(formValues: FieldValues) {
  // debug
  const formValuesTest = structuredClone(formValues);
  formValuesTest.amount = 'test';

  const formValueParsingResult = pizzaFormValidationSchema.safeParse(formValuesTest);
  // const formValueParsingResult = pizzaFormValidationSchema.safeParse(formValues);

  if (!formValueParsingResult.success) {
    const errorsList = Object.entries(formValueParsingResult.error.flatten().fieldErrors).map(
      ([name, messages]) => {
        const error: FieldError = {
          message: messages[0],
          type: 'server',
        };
        return [name, error];
      },
    );

    const errors: FieldErrors = Object.fromEntries(errorsList);

    return errors;
  }

  return redirect('/pizza/success');
}
