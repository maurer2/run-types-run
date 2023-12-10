import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

import type { FormSettings } from "../../../../types/pizza";

import { DOUGH, PRICE_RANGE_CLASS, TOPPINGS } from '../../../../constants/pizza/pizza';

export async function GET() {
  const formSettings: FormSettings = {
    amount: 1,
    doughs: [...DOUGH],
    id: '',
    priceRangeClasses: [...PRICE_RANGE_CLASS],
    toppings: [...TOPPINGS],
  };

  const response: NextResponse<FormSettings> = new NextResponse(
    JSON.stringify(formSettings),
    {
      headers: {
        'Content-Type': 'application/json',
      },
      status: StatusCodes.OK,
    }
  )

  return response;
}
