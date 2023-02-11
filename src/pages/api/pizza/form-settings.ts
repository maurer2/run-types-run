import type { NextApiRequest, NextApiResponse } from 'next';

import type { FormSettings } from '../../../types/pizza';
import { TOPPINGS, DOUGH, PRICE_RANGE_CLASS } from '../../../constants/pizza';

export default function handler(req: NextApiRequest, res: NextApiResponse<FormSettings>) {
  return new Promise(resolve => {
    const formSettings: FormSettings = {
      id: '',
      priceRangeClasses: PRICE_RANGE_CLASS,
      doughs: DOUGH,
      toppings: TOPPINGS,
    };

    setTimeout(() => {
      res
        .status(200)
        .json(formSettings);

      resolve(res);
    }, Math.trunc(Math.random() * 5000));
  })
}
