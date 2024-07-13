import type { NextRequest } from 'next/server';
import type { FieldError, FieldErrors } from 'react-hook-form';

import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';

import type { FormValues } from '../../../../types/pizza';

import { pizzaFormValidationSchema } from '../../../../schema/pizza/validation';

export async function POST(request: NextRequest) {
  try {
    const payload: FormValues = await request.json();
    // @ts-expect-error testing
    payload.amount = 'test';
    const formValueParsingResult = await pizzaFormValidationSchema.safeParseAsync(payload);

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

      console.log(errors);
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
