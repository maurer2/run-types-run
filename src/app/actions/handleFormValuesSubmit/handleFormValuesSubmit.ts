'use server';

import type { FieldError, FieldErrors, FieldValues } from 'react-hook-form';

import { redirect } from 'next/navigation';
import z from 'zod';

import { pizzaFormValidationSchema } from '../../../schema/pizza/validation';

async function getMaxAvailableAmount(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(5), 1000);
  });
}

// returns undefined when redirect happens
export async function handleFormValuesSubmit(formValues: FieldValues): Promise<FieldErrors | undefined> {
  // debug
  // const formValuesTest = structuredClone(formValues);
  // formValuesTest.amount = 'test';

  const pizzaFormValidationSchemaAugmented = pizzaFormValidationSchema.superRefine(
    async ({ amount }, ctx) => {
      const maxAvailableAmount = await getMaxAvailableAmount();

      if (amount > maxAvailableAmount) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_big,
          inclusive: true, // ??
          maximum: maxAvailableAmount,
          message: `Amount of ${amount} exceeds currently available amount of ${maxAvailableAmount}`,
          path: ['amount'],
          type: 'number',
        });
      }

      return true;
    },
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
