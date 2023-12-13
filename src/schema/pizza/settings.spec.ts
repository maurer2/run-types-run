import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';

import type { FormSettings } from '../../types/pizza';

import { DOUGH, PRICE_RANGE_CLASS, TOPPINGS } from '../../constants/pizza/pizza';
import { pizzaSettingsSchema } from './settings';

describe('settings', () => {
  const correctValues: FormSettings = {
    amount: 1,
    doughs: [...DOUGH],
    id: faker.random.alphaNumeric(5),
    priceRangeClasses: [...PRICE_RANGE_CLASS],
    toppings: [...TOPPINGS],
  };

  describe('default', () => {
    it('default values', () => {
      const data: FormSettings = {
        ...correctValues,
      };
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

    it('should validate with amount larger 0', () => {
      const data: FormSettings = {
        ...correctValues,
        amount: 5
      };

      expect(pizzaSettingsSchema.safeParse(data).success).toBeTruthy();
    });

    it('should not validate with amount equal 0', () => {
      const data: FormSettings = {
        ...correctValues,
        amount: 0
      };

      expect(pizzaSettingsSchema.safeParse(data).success).toBeFalsy();
    });

    it('should not validate with amount equal +0', () => {
      const data: FormSettings = {
        ...correctValues,
        amount: 0
      };

      expect(pizzaSettingsSchema.safeParse(data).success).toBeFalsy();
    });

    it('should not validate with amount equal -0', () => {
      const data: FormSettings = {
        ...correctValues,
        amount: 0
      };

      expect(pizzaSettingsSchema.safeParse(data).success).toBeFalsy();
    });

    it('should not validate with amount smaller than 0', () => {
      const data: FormSettings = {
        ...correctValues,
        amount: -5
      };

      expect(pizzaSettingsSchema.safeParse(data).success).toBeFalsy();
    });
  });

  describe('priceRangeClasses field', () => {
    it('should not validate if priceRangeClasses is missing', () => {
      const { priceRangeClasses, ...dataWithoutPriceRangeClasses } = {...correctValues};

      expect(pizzaSettingsSchema.safeParse(dataWithoutPriceRangeClasses).success).toBeFalsy();
    });

    it('should not validate if priceRangeClasses is missing values', () => {
      const data = {
        ...correctValues,
        priceRangeClasses: [PRICE_RANGE_CLASS[0], PRICE_RANGE_CLASS[1]]
      }

      expect(pizzaSettingsSchema.safeParse(data).success).toBeFalsy();
    });

    it('should not validate if priceRangeClasses has additional values', () => {
      const data = {
        ...correctValues,
        priceRangeClasses: [PRICE_RANGE_CLASS[0], PRICE_RANGE_CLASS[1], PRICE_RANGE_CLASS[2], 'extra']
      }

      expect(pizzaSettingsSchema.safeParse(data).success).toBeFalsy();
    });

    it('should not validate if priceRangeClasses contains duplicate values', () => {
      const data = {
        ...correctValues,
        priceRangeClasses: [PRICE_RANGE_CLASS[0], PRICE_RANGE_CLASS[0], PRICE_RANGE_CLASS[1]]
      }

      expect(pizzaSettingsSchema.safeParse(data).success).toBeFalsy();
    });

    it('should not allow other values than predefined values', () => {
      const data = {
        ...correctValues,
        priceRangeClasses: [PRICE_RANGE_CLASS[0].toUpperCase(), PRICE_RANGE_CLASS[1], PRICE_RANGE_CLASS[2]]
      }

      expect(pizzaSettingsSchema.safeParse(data).success).toBeFalsy();
    });

    it('should allow different order within priceRangeClasses array', () => {
      const priceRangeClassesReversed = [...PRICE_RANGE_CLASS].reverse();

      const data = {
        ...correctValues,
        priceRangeClasses: priceRangeClassesReversed
      }

      expect(pizzaSettingsSchema.safeParse(data).success).toBeTruthy();
    });
  });

  describe('doughs field', () => {
    it('should not validate if doughs is missing', () => {
      const { doughs, ...dataWithoutDoughs } = {...correctValues};

      expect(pizzaSettingsSchema.safeParse(dataWithoutDoughs).success).toBeFalsy();
    });

    it('should not validate if doughs is missing values', () => {
      const data = {
        ...correctValues,
        doughs: [DOUGH[0], DOUGH[1]]
      }

      expect(pizzaSettingsSchema.safeParse(data).success).toBeFalsy();
    });

    it('should not validate if dough has additional values', () => {
      const data = {
        ...correctValues,
        doughs: [DOUGH[0], DOUGH[1], DOUGH[2], 'extra']
      }

      expect(pizzaSettingsSchema.safeParse(data).success).toBeFalsy();
    });

    it('should not validate if dough contains duplicate values', () => {
      const data = {
        ...correctValues,
        doughs: [DOUGH[0], DOUGH[1], DOUGH[1],]
      }

      expect(pizzaSettingsSchema.safeParse(data).success).toBeFalsy();
    });

    it('should not allow other values than predefined values', () => {
      const data = {
        ...correctValues,
        doughs: [DOUGH[0].toUpperCase(), DOUGH[1], DOUGH[2]]
      }

      expect(pizzaSettingsSchema.safeParse(data).success).toBeFalsy();
    });

    it('should allow different order within dough array', () => {
      const doughsReversed = [...DOUGH].reverse();

      const data = {
        ...correctValues,
        doughs: doughsReversed,
      }

      expect(pizzaSettingsSchema.safeParse(data).success).toBeTruthy();
    });
  });

  describe('toppings field', () => {
    it('should not validate if toppings is missing', () => {
      const { toppings, ...dataWithoutToppings } = {...correctValues};

      expect(pizzaSettingsSchema.safeParse(dataWithoutToppings).success).toBeFalsy();
    });

    it('should not validate if toppings is missing values', () => {
      const toppingsIncomplete = TOPPINGS.slice(-1);
      const data = {
        ...correctValues,
        toppings: [...toppingsIncomplete]
      }

      expect(pizzaSettingsSchema.safeParse(data).success).toBeFalsy();
    });

    it('should not validate if toppings has additional values', () => {
      const data = {
        ...correctValues,
        doughs: [...TOPPINGS, 'extra']
      }

      expect(pizzaSettingsSchema.safeParse(data).success).toBeFalsy();
    });

    it('should not validate if toppings contains duplicate values', () => {
      const toppingsIncomplete = TOPPINGS.slice(-1);
      const data = {
        ...correctValues,
        toppings: [...toppingsIncomplete, TOPPINGS.at(-1)]
      }

      expect(pizzaSettingsSchema.safeParse(data).success).toBeFalsy();
    });

    it('should not allow other values than predefined values', () => {
      const toppingsIncomplete = TOPPINGS.slice(-1);

      const data = {
        ...correctValues,
        toppings: [...toppingsIncomplete, TOPPINGS.at(-1)?.toUpperCase()]
      }

      expect(pizzaSettingsSchema.safeParse(data).success).toBeFalsy();
    });

    it('should allow different order within toppings array', () => {
      const toppingsReversed = [...TOPPINGS].reverse();

      const data = {
        ...correctValues,
        toppings: toppingsReversed
      }

      expect(pizzaSettingsSchema.safeParse(data).success).toBeTruthy();
    });
  });
});
