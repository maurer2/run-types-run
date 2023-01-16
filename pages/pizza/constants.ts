// eslint-disable-next-line import/no-extraneous-dependencies
import { z } from 'zod';

export const INGREDIENTS = [
  'tomato',
  'pineapple',
  'pepperoni',
] as const satisfies readonly string[];

export const DOUGH = ['standard', 'special', 'super-special'] as const satisfies readonly string[];

export const PIZZA_VALIDATION_SCHEMA = z.object({
  id: z
    .string()
    .min(1, { message: 'id should not be empty' })
    .min(5, { message: 'id should contain at least 5 characters' }),

  selectedDough: z.string(),

  selectedIngredients: z
    .array(z.string())
    .min(1, { message: 'At least 1 ingredient should be selected' }),

});
