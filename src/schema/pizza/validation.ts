/* eslint-disable no-underscore-dangle */
import { z } from 'zod';

import type { FormValues } from '../../types/pizza';
import { pizzaSettingsSchema } from './settings';

export const pizzaFormValidationSchema = z
  .object({
    // #region id
    id: z.string(pizzaSettingsSchema.shape.id)
      .min(1, { message: 'id should not be empty' })
      .min(5, { message: 'id should contain at least 5 characters' })
    ,
    // #endregion

    // #region amount
    amount: z.number(pizzaSettingsSchema.shape.amount)
      .int({ message: 'Amount must be an integer' })
      .min(1, { message: 'Amount must be at least 1' })
      .max(10, { message: 'Amount must not be larger than 10' })
    ,
    // #endregion

    // #region priceRangeClass
    priceRangeClass: z.enum(pizzaSettingsSchema.shape.priceRangeClasses._def.schema.element.options),
    // #endregion

    // #region selectedDough
    selectedDough: z.enum(pizzaSettingsSchema.shape.doughs._def.schema.element.options),
    // #endregion

    // #region selectedToppings
    selectedToppings: z.array(z.enum(pizzaSettingsSchema.shape.toppings._def.schema.element.options))
      .min(1, { message: 'At least 1 topping should be selected' })
      .max(pizzaSettingsSchema.shape.toppings._def.schema.element.options.length, {
        message: 'All toppings have already been selected' })
      .refine(items => new Set(items).size === items.length, {
          message: 'Toppings must not contain duplicate toppings',
      }),
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
