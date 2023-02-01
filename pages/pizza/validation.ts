import { z } from 'zod';

import type { FormValues, FormSettings } from './types';
import { PRICE_RANGE_CLASS, DOUGH, TOPPINGS } from './constants';

export const pizzaSettingsSchema = z
  .object({
    // #region id
    id: z
      .string()
    ,
    // #endregion

    // #region priceRangeClasses
    priceRangeClasses: z
      .tuple([
        z.literal(PRICE_RANGE_CLASS[0]),
        z.literal(PRICE_RANGE_CLASS[1]),
        z.literal(PRICE_RANGE_CLASS[2]),
      ])
    ,
    // #endregion

    // #region doughs
    doughs: z
      .tuple([
        z.literal(DOUGH[0]),
        z.literal(DOUGH[1]),
        z.literal(DOUGH[2]),
        // ...DOUGH.slice(2).map((dough, index) => z.literal(dough) as typeof DOUGH.at(index)),
      ])
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
      ])
    ,
    // #endregion
  })
  .strict() satisfies z.ZodType<FormSettings>;

const toppingsValues = [
  pizzaSettingsSchema.shape.toppings.items[0].value,
  ...pizzaSettingsSchema.shape.toppings.items.slice(1).map((topping) => (topping.value))
] as const;

export const pizzaValidationSchema = z
  .object({
    // #region id
    id: pizzaSettingsSchema.shape.id
      .min(1, { message: 'id should not be empty' })
      .min(5, { message: 'id should contain at least 5 characters' })
    ,
    // #endregion

    // #region priceRangeClass
    priceRangeClass: z
      .union(pizzaSettingsSchema.shape.priceRangeClasses.items)
    ,
    // #endregion

    // #region selectedDough
    selectedDough: z
      // https://stackoverflow.com/questions/74921458/does-zod-have-something-equivalent-to-yups-oneof/74921781#74921781
      .union(pizzaSettingsSchema.shape.doughs.items)
    ,
    // #endregion

    // #region selectedToppings
    selectedToppings: z
      .array(z.enum(toppingsValues))
      .min(1, { message: 'At least 1 topping should be selected' })
      .max(toppingsValues.length, { message: 'All toppings have already been selected' })
    ,
    // #endregion
  })
  .strict()
  // #region conditional validation
  // budget option doesn't allow italian dough
  .refine(
    ({ priceRangeClass, selectedDough }) =>
      !(priceRangeClass === 'Budget' && selectedDough === 'Italian'),
    {
      message: `"Italian" dough can't be selected, when "Budget" option is selected`,
      path: ['selectedDough'],
    },
  )
  // budget option doesn't allow more than two toppings
  .refine(
    ({ priceRangeClass, selectedToppings }) =>
      !(priceRangeClass === 'Budget' && selectedToppings.length > 2),
    {
      message: `Only 2 toppings can be selected, when "Budget" class is selected`,
      path: ['selectedToppings'],
    }
  ) satisfies z.ZodType<FormValues>; // https://github.com/colinhacks/zod/issues/1495#issuecomment-1339832685
// #endregion
