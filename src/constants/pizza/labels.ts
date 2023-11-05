import type { FormValues } from '../../types/pizza';

export const formLabels: Record<keyof FormValues, string> = {
  amount: 'Amount',
  id: 'ID',
  priceRangeClass: 'Price range',
  selectedDough: 'Type of dough',
  selectedToppings: 'Topping(s)',
};
