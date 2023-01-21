import type { NextApiRequest, NextApiResponse } from 'next';
import { faker } from '@faker-js/faker';

import type { FormValues as PizzaValidationSchema } from '../pizza/types';

export default function handler(req: NextApiRequest, res: NextApiResponse<PizzaValidationSchema>) {
  const data: PizzaValidationSchema = {
    id: faker.random.alphaNumeric(5),
    priceRangeClass: 'Standard',
    selectedDough: 'American',
    selectedToppings: ['Tomato'],
  };

  res.status(200).json(data);
}
