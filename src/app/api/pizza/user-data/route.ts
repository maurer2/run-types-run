import type { NextRequest } from 'next/server';

import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { NextResponse } from 'next/server';

import { pizzaFormValidationSchema } from '../../../../schema/pizza/validation';

export async function POST(request: NextRequest) {
  const data = await request.json();
  const isValid = pizzaFormValidationSchema.safeParse(data).success;

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
