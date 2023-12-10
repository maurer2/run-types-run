import type { NextRequest } from 'next/server';

import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { NextResponse } from 'next/server';
import { parse, stringify } from 'qs';

import { pizzaFormValidationSchema } from '../../../../schema/pizza/validation';
import { type FormValuesNullable } from '../../../../types/pizza';

export async function POST(request: NextRequest) {
  // https://stackoverflow.com/a/76332729/1870482
  const data = await request.formData();

  // workaround
  const payload = {
    amount: data.get('amount'),
    id: data.get('id'),
    priceRangeClass: data.get('priceRangeClass'),
    selectedDough: data.get('selectedDough'),
    // needs to be `getAll` to get all values and retain array type in case of a single entry
    selectedToppings: data.getAll('selectedToppings'),
  } as FormValuesNullable;

  const payloadStringified = stringify(payload, {
    arrayFormat: 'repeat',
  });
  const payloadParsed = parse(payloadStringified);

  const isValid = pizzaFormValidationSchema.safeParse(payloadParsed).success;

  if (!isValid) {
    const response: NextResponse<{ message: string }> = new NextResponse(
      JSON.stringify({ message: getReasonPhrase(StatusCodes.BAD_REQUEST) }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
        status: StatusCodes.BAD_REQUEST,
      },
    );
    return response;
  }

  const response: NextResponse<{ message: string }> = new NextResponse(
    JSON.stringify({ message: getReasonPhrase(StatusCodes.OK) }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
      status: StatusCodes.OK,
    },
  );
  return response;
}
