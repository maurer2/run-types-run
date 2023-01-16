// eslint-disable-next-line import/no-extraneous-dependencies
import type { z } from 'zod';
import type { INGREDIENTS, DOUGH, PIZZA_VALIDATION_SCHEMA } from './constants';

type Ingredients = typeof INGREDIENTS[number];
type Dough = typeof DOUGH[number];

export type PizzaValidationSchema = z.infer<typeof PIZZA_VALIDATION_SCHEMA>;

export type FormValues = {
  id: string;
  selectedDough: Dough;
  selectedIngredients: Ingredients[],
};
