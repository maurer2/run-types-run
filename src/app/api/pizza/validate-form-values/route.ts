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
      const response: NextResponse = new NextResponse(JSON.stringify(errors), {
        headers: {
          'Content-Type': 'application/json',
        },
        status: StatusCodes.BAD_REQUEST,
      });

      return response;
    }
  } catch {
    const response: NextResponse = new NextResponse(null, {
      headers: {
        'Content-Type': 'application/json',
      },
      status: StatusCodes.BAD_REQUEST,
    });

    return response;
  }

  const response: NextResponse = new NextResponse(JSON.stringify({}), {
    headers: {
      'Content-Type': 'application/json',
    },
    status: StatusCodes.OK,
  });

  return response;
}
