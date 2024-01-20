import type { FormSettings } from '../../types/pizza';

import { DOUGH, PRICE_RANGE_CLASS, TOPPINGS } from '../../constants/pizza/pizza';

export const settings: FormSettings = {
  amount: 1,
  doughs: [...DOUGH],
  id: '',
  priceRangeClasses: [...PRICE_RANGE_CLASS],
  toppings: [...TOPPINGS],
};
