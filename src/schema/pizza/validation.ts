import { z } from 'zod';

import type { FormValues } from '../../types/pizza';
import { pizzaSettingsSchema } from './settings';

const toppingsValues = [
  pizzaSettingsSchema.shape.toppings.items[0].value,
  ...pizzaSettingsSchema.shape.toppings.items.slice(1).map((topping) => (topping.value))
] as const;

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
