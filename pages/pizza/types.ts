import type { PRICE_RANGE_CLASS, TOPPINGS, DOUGH } from './constants';

type PriceRangeClass = typeof PRICE_RANGE_CLASS[number]
type Toppings = typeof TOPPINGS[keyof typeof TOPPINGS];
type Dough = typeof DOUGH[number];

export type TOPPINGSMAP = {
  readonly [K in typeof TOPPINGS[number] as Uppercase<K>]: K;
};

export type FormValues = {
  id: string;
  priceRangeClass: PriceRangeClass,
  selectedDough: Dough;
  selectedToppings: Toppings[];
};
