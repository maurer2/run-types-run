import type { NextApiRequest, NextApiResponse } from 'next';

import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { parse } from 'qs';

import { pizzaFormValidationSchema } from '../../../schema/pizza/validation';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const { body, method } = await request;

  if (method !== 'POST') {
    response
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .send({ message: getReasonPhrase(StatusCodes.METHOD_NOT_ALLOWED) });
  }

  const payloadParsed = parse(body);
  const isValid = pizzaFormValidationSchema.safeParse(payloadParsed).success;
  if (!isValid) {
    response
      .status(StatusCodes.BAD_REQUEST)
      .send({ message: getReasonPhrase(StatusCodes.BAD_REQUEST) });
  }

  console.log(payloadParsed);

  return response.status(StatusCodes.OK).send({ message: getReasonPhrase(StatusCodes.OK) });
}
