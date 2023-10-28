import { z  } from 'zod';

import type { FormSettings } from '../../types/pizza';
import { PRICE_RANGE_CLASS, DOUGH, TOPPINGS } from '../../constants/pizza/pizza';
import { listFormatterAnd } from '../../helpers/listformatter/listformatter';

export const pizzaSettingsSchema = z
  .object({
    // #region id
    id: z.string({
      required_error: 'Id is required',
      invalid_type_error: 'Id must be a number',
    })
    ,
    // #endregion

    // #region amount
    amount: z.coerce.number({
      required_error: 'Amount is required',
      invalid_type_error: 'Amount must be a number',
    }),
    // #endregion

    // #region priceRangeClasses
    priceRangeClasses: z.array(
      z.enum([...PRICE_RANGE_CLASS], {
        required_error: 'Price range class is required',
        invalid_type_error: `Price range class must contain ${listFormatterAnd([...PRICE_RANGE_CLASS])}}`,
      }))
      .length(PRICE_RANGE_CLASS.length, `Price range class must have exactly ${PRICE_RANGE_CLASS.length} entries`)
      // https://github.com/colinhacks/zod/discussions/2316
      .refine(items => new Set(items).size === items.length, {
        message: 'Price range classes must not contain duplicate entries',
      }),
    // #endregion

    // #region doughs
    doughs: z.array(
      z.enum([...DOUGH], {
        required_error: 'Dough is required',
        invalid_type_error: `Dough must be either ${listFormatterAnd([...DOUGH])}}`,
      }))
      .length(DOUGH.length, `Dough must have exactly ${DOUGH.length} entries`)
      .refine(items => new Set(items).size === items.length, {
        message: 'Dough must not contain duplicate entries',
      }),
    // #endregion

    // #region toppings
    toppings: z.array(
      z.enum([...TOPPINGS], {
        required_error: 'Toppings are required',
        invalid_type_error: `Toppings must be one or more of ${listFormatterAnd([...TOPPINGS])}}`,
      }))
      .length(TOPPINGS.length, `Toppings must have exactly ${TOPPINGS.length} entries`)
      .refine(items => new Set(items).size === items.length, {
        message: 'Toppings must not contain duplicate entries',
      }),
    // #endregion
  })
  .strict() satisfies z.ZodType<FormSettings>;
