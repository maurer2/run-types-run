import type { DOUGH, PRICE_RANGE_CLASS, TOPPINGS } from '../constants/pizza/pizza';

type PriceRangeClass = typeof PRICE_RANGE_CLASS[number]
type Toppings = typeof TOPPINGS[number];
type Dough = typeof DOUGH[number];

export type TOPPINGSMAP = {
  readonly [K in typeof TOPPINGS[number] as Uppercase<K>]: K;
};

export type FormValues = {
  amount: number;
  id: string;
  priceRangeClass: PriceRangeClass,
  selectedDough: Dough;
  selectedToppings: Toppings[];
};

export type FormSettings = {
  amount: number;
  doughs: Dough[];
  id: string;
  priceRangeClasses: PriceRangeClass[],
  toppings: Toppings[];
}
