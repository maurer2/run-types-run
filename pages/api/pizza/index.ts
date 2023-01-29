import type { NextApiRequest, NextApiResponse } from 'next';

import type { FormSettings } from '../../pizza/types';

import { TOPPINGS, DOUGH, PRICE_RANGE_CLASS } from '../../pizza/constants';

export default function handler(req: NextApiRequest, res: NextApiResponse<FormSettings>) {
  const formSettings: FormSettings = {
    id: '',
    priceRangeClasses: PRICE_RANGE_CLASS,
    doughs: DOUGH,
    toppings: TOPPINGS,
  }

  setTimeout(() => {
    res.status(200).json(formSettings);
  }, 2000)
}
