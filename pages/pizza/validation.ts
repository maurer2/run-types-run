import { z } from 'zod';

import type { FormValues } from './types';
import { PRICE_RANGE_CLASS, DOUGH, TOPPINGS } from './constants';

export const pizzaValidationSchema = z.object({
  // #region id
  id: z
    .string()
    .min(1, { message: 'id should not be empty' })
    .min(5, { message: 'id should contain at least 5 characters' }),
  // #endregion

  // #region priceRangeClass
  priceRangeClass: z.union([
    z.literal(PRICE_RANGE_CLASS[0]),
    z.literal(PRICE_RANGE_CLASS[1]),
    ...PRICE_RANGE_CLASS.slice(2).map((priceRangeClass) => z.literal(priceRangeClass)),
  ]),
  // #endregion

  // #region selectedDough
  selectedDough: z
    // https://stackoverflow.com/questions/74921458/does-zod-have-something-equivalent-to-yups-oneof/74921781#74921781
    .union([
      z.literal(DOUGH[0]),
      z.literal(DOUGH[1]),
      ...DOUGH.slice(2).map((dough) => z.literal(dough)),
    ]),
  // #endregion

  // #region selectedToppings
  selectedToppings: z
    .array(z.enum(TOPPINGS))
    .min(1, { message: 'At least 1 topping should be selected' })
    .max(TOPPINGS.length, { message: 'All toppings have been selected already' }),
  // #endregion
}) satisfies z.ZodType<FormValues>; // https://github.com/colinhacks/zod/issues/1495#issuecomment-1339832685
