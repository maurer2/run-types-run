import type { NextApiRequest, NextApiResponse } from 'next';

import type { FormValues } from '../../../types/pizza';

export default function handler(req: NextApiRequest, res: NextApiResponse<FormValues>) {
  return new Promise(resolve => {
    const defaultValues: FormValues = {
      amount: 1,
      id: 'Username',
      priceRangeClass: 'Budget',
      selectedDough: 'American',
      selectedToppings: ['Tomato', 'Pepperoni'],
    };

    setTimeout(() => {
      res
        .status(200)
        .json(defaultValues);

      resolve(res);
    }, Math.trunc(Math.random() * 5000));
  })
}
