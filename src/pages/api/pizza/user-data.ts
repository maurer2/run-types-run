import type { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'qs';

import { pizzaFormValidationSchema } from '../../../schema/pizza/validation';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const { body, method } = await request;

  const payloadParsed = parse(body);

  if (method !== 'POST') {
    response.status(405).send({ message: 'Bad http-method' });
  }

  const isValid = pizzaFormValidationSchema.safeParse(payloadParsed).success;
  if (!isValid) {
    response.status(400).send({ message: 'Bad request' });
  }

  return response.status(200).send({ message: 'OK' });
}

