import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

import type { FormValues } from "../../../../types/pizza";

export async function GET() {
  const defaultValues: FormValues = {
    amount: 1,
    id: 'Username',
    priceRangeClass: 'Budget',
    selectedDough: 'American',
    selectedToppings: ['Tomato', 'Pepperoni'],
  };

  const response: NextResponse<FormValues> = new NextResponse(
    JSON.stringify(defaultValues),
    {
      headers: {
        'Content-Type': 'application/json',
      },
      status: StatusCodes.OK,
    }
  )

  return response;
}
