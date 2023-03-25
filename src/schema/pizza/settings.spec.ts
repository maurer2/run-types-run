import { describe, expect, it } from 'vitest';
import { faker } from '@faker-js/faker';

import { pizzaSettingsSchema } from './settings';
import { PRICE_RANGE_CLASS, DOUGH, TOPPINGS } from '../../constants/pizza/pizza';
import type { FormSettings } from '../../types/pizza';

describe('settings', () => {
  const correctValues: FormSettings = {
    id: faker.random.alphaNumeric(5),
    amount: 1,
    priceRangeClasses: PRICE_RANGE_CLASS,
    doughs: DOUGH,
    toppings: TOPPINGS,
  };

  describe('default', () => {
    it('default values', () => {
      const data: FormSettings = {
        ...correctValues,
      };
      // console.log(pizzaSettingsSchema.safeParse(data))
      expect(pizzaSettingsSchema.safeParse(data).success).toBeTruthy();
    });
  });

  describe('id field', () => {
    it('should not validate if id is missing', () => {
      const { id, ...dataWithoutId } = {...correctValues};

      expect(pizzaSettingsSchema.safeParse(dataWithoutId).success).toBeFalsy();
    });

    it('should validate with correct id', () => {
      const data: FormSettings = {
        ...correctValues,
        id: 'mau'
      };

      expect(pizzaSettingsSchema.safeParse(data).success).toBeTruthy();
    });
  });

  describe('amount field', () => {
    it('should not validate if amount is missing', () => {
      const { amount, ...dataWithoutAmount } = {...correctValues};

      expect(pizzaSettingsSchema.safeParse(dataWithoutAmount).success).toBeFalsy();
    });

    it('should validate with correct amount', () => {
      const data: FormSettings = {
        ...correctValues,
        amount: 5
      };

      expect(pizzaSettingsSchema.safeParse(data).success).toBeTruthy();
    });
  });

  describe('priceRangeClasses field', () => {
    it('should not validate if priceRangeClasses is missing', () => {
      const { priceRangeClasses, ...dataWithoutPriceRangeClasses } = {...correctValues};

      expect(pizzaSettingsSchema.safeParse(dataWithoutPriceRangeClasses).success).toBeFalsy();
    });
  });

  describe('doughs field', () => {
    it('should not validate if doughs is missing', () => {
      const { doughs, ...dataWithoutDoughs } = {...correctValues};

      expect(pizzaSettingsSchema.safeParse(dataWithoutDoughs).success).toBeFalsy();
    });
  });

  describe('toppings field', () => {
    it('should not validate if toppings is missing', () => {
      const { toppings, ...dataWithoutToppings } = {...correctValues};

      expect(pizzaSettingsSchema.safeParse(dataWithoutToppings).success).toBeFalsy();
    });
  });
});
