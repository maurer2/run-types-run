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
    selectedToppings: ['Tomato', 'Pepperoni'],
  };

  describe('General', () => {
    it('happy path', () => {
      const data: FormValues = {
        ...correctValues,
      };

      expect(pizzaFormValidationSchema.safeParse(data).success).toBeTruthy();
    });
  })

  describe('priceRangeClass', () => {
    it('unexpected value', () => {
      const data = {
        ...correctValues,
        priceRangeClass: 'Meow',
      };
      expect(pizzaFormValidationSchema.safeParse(data).success).toBeFalsy();
    });
  })

  describe('selectedDough', () => {
    it('unexpected value', () => {
      const data = {
        ...correctValues,
        selectedDough: 'Meow',
      };
      expect(pizzaFormValidationSchema.safeParse(data).success).toBeFalsy();
    });
  })

  describe('toppings', () => {
    it('unexpected value', () => {
      const data = {
        ...correctValues,
        selectedToppings: ['Cat-Food'],
      };

      expect(pizzaFormValidationSchema.safeParse(data).success).toBeFalsy();
    });

    it('empty', () => {
      const data: FormValues = {
        ...correctValues,
        selectedToppings: [],
      };
      expect(pizzaFormValidationSchema.safeParse(data).success).toBeFalsy();
    });

    it('valid toppings in random order', () => {
      const data: FormValues = {
        ...correctValues,
        selectedToppings: [...correctValues.selectedToppings].reverse(),
      };
      expect(pizzaFormValidationSchema.safeParse(data).success).toBeTruthy();
    });

    it('every topping', () => {
      const data: FormValues = {
        ...correctValues,
        selectedToppings: [...TOPPINGS],
      };
      expect(pizzaFormValidationSchema.safeParse(data).success).toBeTruthy();
    });

    it('every topping + 1', () => {
      const data = {
        ...correctValues,
        selectedToppings: [...TOPPINGS, 'Cat-Food'],
      };
      expect(pizzaFormValidationSchema.safeParse(data).success).toBeFalsy();
    });

    it('duplicate valid toppings', () => {
      const data: FormValues = {
        ...correctValues,
        selectedToppings: ['Tomato', 'Tomato'],
      };

      expect(pizzaFormValidationSchema.safeParse(data).success).toBeFalsy();
    });
  })

  describe('cross field validation', () => {
    it('cross field validation - field values', () => {
      let data: FormValues = {
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
    });

    it('cross field validation - field length', () => {
      let data: FormValues = {
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
  })
});
