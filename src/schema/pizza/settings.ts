import { z  } from 'zod';

import type { FormSettings } from '../../types/pizza';

import { DOUGH, PRICE_RANGE_CLASS, TOPPINGS } from '../../constants/pizza/pizza';
import { listFormatterAnd } from '../../helpers/listformatter/listformatter';

export const pizzaSettingsSchema = z
  .object({
    // #region amount
    amount: z.coerce.number({
      invalid_type_error: 'Amount must be a number',
      required_error: 'Amount is required',
    }),
    // #endregion

    // #region doughs
    doughs: z.array(
      z.enum([...DOUGH], {
        invalid_type_error: `Dough must contain  ${listFormatterAnd([...DOUGH])}}`,
        required_error: 'Dough is required',
      }))
      .length(DOUGH.length, `Dough must have exactly ${DOUGH.length} entries`)
      .refine(items => new Set(items).size === items.length, {
        message: 'Dough must not contain duplicate entries',
      }),
    // #endregion

    // #region id
    id: z.string({
      invalid_type_error: 'Id must be a number',
      required_error: 'Id is required',
    }),
    // #endregion

    // #region priceRangeClasses
    priceRangeClasses: z.array(
      z.enum([...PRICE_RANGE_CLASS], {
        invalid_type_error: `Price range class must contain ${listFormatterAnd([...PRICE_RANGE_CLASS])}}`,
        required_error: 'Price range class is required',
      }))
      .length(PRICE_RANGE_CLASS.length, `Price range class must have exactly ${PRICE_RANGE_CLASS.length} entries`)
      // https://github.com/colinhacks/zod/discussions/2316
      .refine(items => new Set(items).size === items.length, {
        message: 'Price range classes must not contain duplicate entries',
      }),
    // #endregion

    // #region toppings
    toppings: z.array(
      z.enum([...TOPPINGS], {
        invalid_type_error: `Toppings must contain ${listFormatterAnd([...TOPPINGS])}}`,
        required_error: 'Toppings are required',
      }))
      .length(TOPPINGS.length, `Toppings must have exactly ${TOPPINGS.length} entries`)
      .refine(items => new Set(items).size === items.length, {
        message: 'Toppings must not contain each topping more than once',
      }),
    // #endregion
  })
  .strict() satisfies z.ZodType<FormSettings>;
