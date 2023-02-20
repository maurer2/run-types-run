import React from 'react';

import Index from './index';
import { apiRoutes } from '../../constants/pizza/urls';
import type { Success, Loading, Fail } from '../../hooks/useFetchStartValues/types';
import { TOPPINGS, DOUGH, PRICE_RANGE_CLASS } from '../../constants/pizza/pizza';
import PizzaForm from '../../components/PizzaForm';

export const successState: Success = {
  status: 'success',
  payload: {
    formSettings: {
      id: '',
      priceRangeClasses: PRICE_RANGE_CLASS,
      doughs: DOUGH,
      toppings: TOPPINGS,
    },
    defaultValues: {
      id: 'Username',
      priceRangeClass: 'Standard',
      selectedDough: 'American',
      selectedToppings: ['Tomato'],
    },
  },
};

describe('<Index />', () => {
  it.skip('renders', () => {
    cy.intercept(
      {
        method: 'GET',
        url: apiRoutes.formSettings,
      },
      { message: 'OK', statusCode: 200, body: successState.payload.formSettings },
    );

    cy.intercept(
      {
        method: 'GET',
        url: apiRoutes.defaultValues,
      },
      { message: 'OK', statusCode: 200, body: successState.payload.defaultValues },
    );

    cy.mount(<Index />);

    // todo fix next router and provider issue
  });
});
