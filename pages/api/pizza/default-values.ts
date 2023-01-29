import type { NextApiRequest, NextApiResponse } from 'next';

import type { FormValues } from '../../pizza/types';

export default function handler(req: NextApiRequest, res: NextApiResponse<FormValues>) {
  const defaultValues: FormValues = {
    id: 'Username',
    priceRangeClass: 'Standard',
    selectedDough: 'American',
    selectedToppings: ['Tomato'],
  };

  res.status(200).json(defaultValues);
}
