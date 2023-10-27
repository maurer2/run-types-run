import { z  } from 'zod';

import type { FormSettings } from '../../types/pizza';
import { PRICE_RANGE_CLASS, DOUGH, TOPPINGS } from '../../constants/pizza/pizza';
import { listFormatterAnd, listFormatterOr } from '../../helpers/listformatter/listformatter';

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
      z.enum([
        PRICE_RANGE_CLASS[0],
        PRICE_RANGE_CLASS[1],
        PRICE_RANGE_CLASS[2],
        ], {
          required_error: 'Price range class is required',
          invalid_type_error: `Price range class must contain ${listFormatterAnd([...PRICE_RANGE_CLASS])}}`,
        }
      ))
      .min(PRICE_RANGE_CLASS.length, `Price range classes must not contain fewer than ${PRICE_RANGE_CLASS.length} entries`)
      .max(PRICE_RANGE_CLASS.length, `Price range classes must not contain more than ${PRICE_RANGE_CLASS.length} entries`)
      // https://github.com/colinhacks/zod/discussions/2316
      .refine(items => new Set(items).size === items.length, {
        message: 'Price range classes must not contain duplicate entries',
      }),
    // #endregion

    // #region doughs
    doughs: z
      .tuple([
        z.literal(DOUGH[0]),
        z.literal(DOUGH[1]),
        z.literal(DOUGH[2]),
        // ...DOUGH.slice(2).map((dough, index) => z.literal(dough) as typeof DOUGH.at(index)),
      ], {
        required_error: 'Dough is required',
        invalid_type_error: `Dough must be either ${listFormatterOr([...DOUGH])}}`,
      })
    ,
    // #endregion

    // #region toppings
    toppings: z
      .tuple([
        z.literal(TOPPINGS[0]),
        z.literal(TOPPINGS[1]),
        z.literal(TOPPINGS[2]),
        z.literal(TOPPINGS[3]),
        z.literal(TOPPINGS[4]),
        z.literal(TOPPINGS[5]),
        z.literal(TOPPINGS[6]),
        z.literal(TOPPINGS[7]),
        z.literal(TOPPINGS[8]),
        z.literal(TOPPINGS[9]),
        z.literal(TOPPINGS[10]),
      ], {
        required_error: 'Toppings are required',
        invalid_type_error: `Toppings must be one or more of ${listFormatterAnd([...TOPPINGS])}}`,
      })
    ,
    // #endregion
  })
  .strict() satisfies z.ZodType<FormSettings>;

// type PizzaSettingsSchema = z.infer<typeof pizzaSettingsSchema>;
