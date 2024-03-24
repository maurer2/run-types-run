'use server';

import type { FieldError, FieldErrors, FieldValues } from 'react-hook-form';

import { redirect } from 'next/navigation';

import { pizzaFormValidationSchema } from '../../../schema/pizza/validation';

async function getMaxAvailableAmount(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(5), 1000);
  });
}

export async function handleFormValuesSubmit(formValues: FieldValues): Promise<FieldErrors> {
  // debug
  // const formValuesTest = structuredClone(formValues);
  // formValuesTest.amount = 'test';

  const pizzaFormValidationSchemaAugmented = pizzaFormValidationSchema.refine(
    async ({ amount }) => amount <= await getMaxAvailableAmount(),
    ({ amount }) => ({
      message: `Amount of ${amount} exceeds available amount of ???`, // todo
      path: ['amount'],
    })
  );

  const formValueParsingResult = await pizzaFormValidationSchemaAugmented.safeParseAsync(
    formValues,
  );
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
