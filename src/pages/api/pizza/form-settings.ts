import type { NextApiRequest, NextApiResponse } from 'next';

import type { FormSettings } from '../../../types/pizza';

import { DOUGH, PRICE_RANGE_CLASS, TOPPINGS } from '../../../constants/pizza/pizza';

export default function handler(req: NextApiRequest, res: NextApiResponse<FormSettings>) {
  return new Promise(resolve => {
    const formSettings: FormSettings = {
      amount: 1,
      doughs: [...DOUGH],
      id: '',
      priceRangeClasses: [...PRICE_RANGE_CLASS],
      toppings: [...TOPPINGS],
    };

    setTimeout(() => {
      res
        .status(200)
        .json(formSettings);

      resolve(res);
    }, Math.trunc(Math.random() * 5000));
  })
}
