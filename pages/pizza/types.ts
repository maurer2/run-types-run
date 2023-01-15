import type { INGREDIENTS, DOUGH } from './constants';

type Ingredients = typeof INGREDIENTS[number];
type Dough = typeof DOUGH[number];

export type FormValues = {
  id: string;
  selectedDough: Dough;
  selectedIngredients: Ingredients[],
};
