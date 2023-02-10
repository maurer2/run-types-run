import type { NextApiRequest, NextApiResponse } from 'next';

import { pizzaValidationSchema } from '../../pizza/validation';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req;

  if (method !== 'POST') {
    res.status(405).send({ message: 'Bad http-method' });
  }

  const isValid = pizzaValidationSchema.safeParse(body).success;

  if (!isValid) {
    res.status(400).send({ message: 'Bad request' });
  }
  return res.status(200).send({ message: 'OK' });
}
