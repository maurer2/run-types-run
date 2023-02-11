import type { TOPPINGSMAP } from './types';

// #region PRICE_RANGE_CLASS
export const PRICE_RANGE_CLASS = ['Budget', 'Standard', 'Deluxe'] as const satisfies readonly string[];
// #endregion

// #region TOPPINGS
export const TOPPINGS = [
  'Tomato',
  'Pineapple',
  'Pepperoni',
  'Mushroom',
  'Ham',
  'Onion',
  'Olive',
  'Jalapeno',
  'Chicken',
  'Ground Beef',
  'Tuna',
] as const satisfies readonly string[];

export const TOPPINGS_MAP: TOPPINGSMAP = Object.fromEntries(
  TOPPINGS.map((topping) => [topping.toLocaleUpperCase, topping]),
) satisfies TOPPINGSMAP;
// #endregion

// #region DOUGH
export const DOUGH = ['Standard', 'American', 'Italian'] as const satisfies readonly string[];
// #endregion
