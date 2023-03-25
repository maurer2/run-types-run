import { describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';

import { pizzaFormValidationSchema } from './validation';
import { TOPPINGS } from '../../constants/pizza/pizza';
import type { FormValues } from '../../types/pizza';

describe('validation.ts', () => {
  const correctValues: FormValues = {
    id: faker.random.alphaNumeric(5),
    amount: 1,
    priceRangeClass: 'Standard',
    selectedDough: 'Standard',
    selectedToppings: ['Tomato'],
  };

  it('default validation', () => {
    const data = {
      ...correctValues,
    };
    expect(pizzaFormValidationSchema.safeParse(data).success).toBeTruthy();
  });

  it('priceRangeClass validation', () => {
    const data = {
      ...correctValues,
      priceRangeClass: 'Meow',
    };
    expect(pizzaFormValidationSchema.safeParse(data).success).toBeFalsy();
  });

  it('selectedToppings validation - empty', () => {
    const data = {
      ...correctValues,
      selectedToppings: [],
    };
    expect(pizzaFormValidationSchema.safeParse(data).success).toBeFalsy();
  });

  it('selectedToppings validation - full', () => {
    const data = {
      ...correctValues,
      selectedToppings: [...TOPPINGS],
    };
    expect(pizzaFormValidationSchema.safeParse(data).success).toBeTruthy();
  });

  it('selectedToppings validation - full + 1', () => {
    const data = {
      ...correctValues,
      selectedToppings: [...TOPPINGS, 'Cat-Food'],
    };
    expect(pizzaFormValidationSchema.safeParse(data).success).toBeFalsy();
  });

  it('selectedToppings validation - invalid value', () => {
    const data = {
      ...correctValues,
      selectedToppings: ['Cat-Food'],
    };

    expect(pizzaFormValidationSchema.safeParse(data).success).toBeFalsy();
  });

  it('cross field validation - field values', () => {
    let data = {
      ...correctValues,
      priceRangeClass: 'Budget',
      selectedDough: 'American',
    };
    expect(pizzaFormValidationSchema.safeParse(data).success).toBeTruthy();

    data = {
      ...correctValues,
      priceRangeClass: 'Budget',
      selectedDough: 'Italian',
    };
    expect(pizzaFormValidationSchema.safeParse(data).success).toBeFalsy();
    // console.log(pizzaValidationSchema.safeParse(data))
  });

  it('cross field validation - field length', () => {
    let data = {
      ...correctValues,
      priceRangeClass: 'Budget',
      selectedToppings: ['Tomato', 'Pepperoni'],
    };
    expect(pizzaFormValidationSchema.safeParse(data).success).toBeTruthy();

    data = {
      ...correctValues,
      priceRangeClass: 'Budget',
      selectedDough: 'Italian',
      selectedToppings: ['Tomato', 'Pepperoni', 'Jalapeno'],
    };
    expect(pizzaFormValidationSchema.safeParse(data).success).toBeFalsy();
  });
});
