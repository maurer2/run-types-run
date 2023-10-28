/* eslint-disable no-underscore-dangle */
import { z } from 'zod';

import type { FormValues } from '../../types/pizza';
import { pizzaSettingsSchema } from './settings';

export const pizzaFormValidationSchema = z
  .object({
    // #region id
    id: pizzaSettingsSchema.shape.id
      .min(1, { message: 'id should not be empty' })
      .min(5, { message: 'id should contain at least 5 characters' })
    ,
    // #endregion

    // #region amount
    amount: pizzaSettingsSchema.shape.amount
      .int({ message: 'Amount must be an integer' })
      .min(1, { message: 'Amount must be at least 1' })
      .max(10, { message: 'Amount must not be larger than 10' })
    ,
    // #endregion

    // #region priceRangeClass
    priceRangeClass: pizzaSettingsSchema.shape.priceRangeClasses._def.schema.element,
    // #endregion

    // #region selectedDough
    selectedDough: pizzaSettingsSchema.shape.doughs._def.schema.element,
    // #endregion

    // #region selectedToppings
    selectedToppings: z.array(pizzaSettingsSchema.shape.toppings._def.schema.element)
      .min(1, { message: 'At least 1 topping should be selected' })
      // .max([pizzaSettingsSchema.shape.toppings._def.schema.element.Values].length, {
      //   message: 'All toppings have already been selected' })
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
