import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { NextResponse } from 'next/server';

export async function POST() {
  const response: NextResponse<{ message: string }> = new NextResponse(
    JSON.stringify({ message: getReasonPhrase(StatusCodes.NOT_FOUND) }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
      status: StatusCodes.NOT_FOUND,
    },
  );
  return response;
}
