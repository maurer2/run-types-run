// https://github.com/cypress-io/cypress/discussions/22715
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import type { PropsWithChildren } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import Router from 'next/router'
import React from 'react';

import type { Loading, Success } from '../../../hooks/useFetchValue/types';

import { DOUGH, PRICE_RANGE_CLASS, TOPPINGS } from '../../../constants/pizza/pizza';
import { apiRoutes } from '../../../constants/pizza/urls';
import { queryClient } from '../_app';
import Index from './pagepp/pizza/index';

export const loadingState: Loading = {
  status: 'loading',
};

const payloadHappyPath = {
  defaultValues: {
    amount: 1,
    id: 'Username',
    priceRangeClass: 'Standard',
    selectedDough: 'American',
    selectedToppings: ['Tomato'],
  },
  formSettings: {
    amount: 1,
    doughs: DOUGH,
    id: '',
    priceRangeClasses: PRICE_RANGE_CLASS,
    toppings: TOPPINGS,
  },
};

export const successState: Success<unknown> = {
  payload: payloadHappyPath,
  status: 'success',
};

// https://github.com/cypress-io/cypress/discussions/22715
const createRouter = (params: Partial<AppRouterInstance>) => ({
  back: cy.spy().as('back'),
  forward: cy.spy().as('forward'),
  prefetch: cy.stub().as('prefetch').resolves(),
  push: cy.spy().as('push'),
  refresh: cy.spy().as('refresh'),
  replace: cy.spy().as('replace'),
  ...params,
});

export const MockNextRouter = ({
  children,
  ...props
}: Partial<PropsWithChildren<AppRouterInstance>>) => {
  const router = createRouter(props);

  return (
    <QueryClientProvider client={queryClient}>
      <AppRouterContext.Provider value={router}>
        {children}
      </AppRouterContext.Provider>
    </QueryClientProvider>
  )
};

describe('Pizza page', () => {
  let router;

  beforeEach(() => {
    router = {
      back: cy.stub().as('routerBack')
    }
    cy.stub(Router, 'useRouter').returns(router)
  })

  it('renders loading state', () => {
    // https://blog.dai.codes/cypress-loading-state-tests/
    let sendResponse;
    const trigger = new Promise((resolve) => {
      sendResponse = resolve;
    });

    cy.intercept(
      {
        method: 'GET',
        url: apiRoutes.formSettings,
      },
      (request) =>
        trigger.then(() => {
          request.reply();
        }),
    );

    cy.intercept(
      {
        method: 'GET',
        url: apiRoutes.defaultValues,
      },
      (request) =>
        trigger.then(() => {
          request.reply();
        }),
    );

    cy.mount(
      <MockNextRouter>
        <Index />
      </MockNextRouter>,
    );

    cy.findAllByRole('heading', { level: 2 }).should('have.lengthOf', 2);
    cy.findByText('Form settings').should('exist');
    cy.findByText('Default values').should('exist');

    sendResponse();
  });

  it('renders success state', () => {
    cy.intercept(
      {
        method: 'GET',
        url: apiRoutes.defaultValues,
      },
      { body: payloadHappyPath.defaultValues, message: 'OK', statusCode: 200 },
    );

    cy.intercept(
      {
        method: 'GET',
        url: apiRoutes.formSettings,
      },
      { body: payloadHappyPath.formSettings, message: 'OK', statusCode: 200 },
    );

    cy.mount(
      <MockNextRouter>
        <Index />
      </MockNextRouter>,
    );

    cy.findAllByRole('heading', { level: 2 }).should('have.lengthOf', 2);

    cy.findByLabelText('Enter your ID').should('exist');
    cy.findByText('Select priceRangeClass').should('exist');
    cy.findByText('Select selectedToppings').should('exist');
  });
});
