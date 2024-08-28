import type { FormSettings, FormValues } from '../../types/pizza';

export type PizzaFormProps = {
  defaultValues: FormValues;
  formSettings: FormSettings;
};

export type PizzaFormResolverContext = {
  minAmount: null | number;
};
