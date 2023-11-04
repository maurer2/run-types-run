import type { NextRouter } from 'next/router';
import type { PropsWithChildren } from 'react';

import { RouterContext } from 'next/dist/shared/lib/router-context';
import React from 'react';

import type { Loading, Success } from '../../hooks/useFetchValue/types';

import { DOUGH, PRICE_RANGE_CLASS, TOPPINGS } from '../../constants/pizza/pizza';
import { apiRoutes } from '../../constants/pizza/urls';
import Index from './index';

export const loadingState: Loading = {
  progress: {
    defaultValues: true,
    formSettings: true,
  },
  status: 'loading',
};

export const successState: Success = {
  payload: {
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
  },
  status: 'success',
};

// https://github.com/cypress-io/cypress/discussions/22715
const createRouter = (params: Partial<NextRouter>) => ({
  ...params,
  asPath: '/',
  back: cy.spy().as('back'),
  basePath: '',
  beforePopState: cy.spy().as('beforePopState'),
  defaultLocale: 'en',
  domainLocales: [],
  events: {
    emit: cy.spy().as('emit'),
    off: cy.spy().as('off'),
    on: cy.spy().as('on'),
  },
  forward: cy.spy().as('forward'),
  isFallback: false,
  isLocaleDomain: false,
  isPreview: false,
  isReady: true,
  pathname: '/',
  prefetch: cy.stub().as('prefetch').resolves(),
  push: cy.spy().as('push'),
  query: {},
  reload: cy.spy().as('reload'),
  replace: cy.spy().as('replace'),
  route: '/',
});

const MockRouter = ({ children, ...props }: PropsWithChildren<Partial<NextRouter>>) => {
  const router = createRouter(props);

  return (
    <RouterContext.Provider value={router}>
      {children}
    </RouterContext.Provider>);
};

describe('<Index />', () => {
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
      <MockRouter>
        <Index />
      </MockRouter>,
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
        url: apiRoutes.formSettings,
      },
      { body: successState.payload.formSettings, message: 'OK', statusCode: 200 },
    );

    cy.intercept(
      {
        method: 'GET',
        url: apiRoutes.defaultValues,
      },
      { body: successState.payload.defaultValues, message: 'OK', statusCode: 200 },
    );

    cy.mount(
      <MockRouter>
        <Index />
      </MockRouter>,
    );

    cy.findByLabelText('Enter your ID').should('exist');
    cy.findByText('Select priceRangeClass').should('exist');
    cy.findByText('Select selectedToppings').should('exist');
  });
});
