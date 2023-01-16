// eslint-disable-next-line import/no-extraneous-dependencies
import { z } from 'zod';
import type { FormValues } from './types';
import { DOUGH, INGREDIENTS } from './constants';

export const pizzaValidationSchema = z.object({
  id: z
    .string()
    .min(1, { message: 'id should not be empty' })
    .min(5, { message: 'id should contain at least 5 characters' }),

  selectedDough: z
    // https://stackoverflow.com/questions/74921458/does-zod-have-something-equivalent-to-yups-oneof/74921781#74921781
    .union([
      z.literal(DOUGH[0]),
      z.literal(DOUGH[1]),
      ...DOUGH.slice(2).map((dough) => z.literal(dough)),
    ]),

  selectedIngredients: z
    .array(
      z.union([
        z.literal(INGREDIENTS[0]),
        z.literal(INGREDIENTS[1]),
        ...INGREDIENTS.slice(2).map((ingredient) => z.literal(ingredient)),
      ]),
    )
    .min(1, { message: 'At least 1 ingredient should be selected' }),
}) satisfies z.ZodType<FormValues>; // https://github.com/colinhacks/zod/issues/1495#issuecomment-1339832685
