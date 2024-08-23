import type { NextRequest } from 'next/server';
import type { FieldError, FieldErrors } from 'react-hook-form';

import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';
import z from 'zod';

import type { FormValues } from '../../../../types/pizza';

import { pizzaFormValidationSchema } from '../../../../schema/pizza/validation';

async function getMaxAvailableAmount(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(5), 1000);
  });
}

// todo: change to GET
export async function POST(request: NextRequest) {
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

  try {
    const payload: FormValues = await request.json();
    const formValueParsingResult = await pizzaFormValidationSchemaAugmented.safeParseAsync(payload);

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

      // one or more fields invalid
      return NextResponse.json(errors, { status: StatusCodes.OK });
    }
  } catch {
    return NextResponse.json(null, { status: StatusCodes.BAD_REQUEST });
  }

  // fields valid
  return NextResponse.json({}, { status: StatusCodes.OK });
}
