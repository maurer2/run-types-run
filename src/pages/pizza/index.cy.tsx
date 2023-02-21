import React from 'react';
import type { PropsWithChildren } from 'react';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import type { NextRouter } from 'next/router';

import Index from './index';
import { apiRoutes } from '../../constants/pizza/urls';
import type { Success, Loading } from '../../hooks/useFetchStartValues/types';
import { TOPPINGS, DOUGH, PRICE_RANGE_CLASS } from '../../constants/pizza/pizza';

export const loadingState: Loading = {
  status: 'loading',
  progress: {
    formSettings: true,
    defaultValues: true,
  },
};

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

// https://github.com/cypress-io/cypress/discussions/22715
const createRouter = (params: Partial<NextRouter>) => ({
  ...params,
  route: '/',
  pathname: '/',
  query: {},
  asPath: '/',
  basePath: '',
  back: cy.spy().as('back'),
  beforePopState: cy.spy().as('beforePopState'),
  forward: cy.spy().as('forward'),
  prefetch: cy.stub().as('prefetch').resolves(),
  push: cy.spy().as('push'),
  reload: cy.spy().as('reload'),
  replace: cy.spy().as('replace'),
  events: {
    emit: cy.spy().as('emit'),
    off: cy.spy().as('off'),
    on: cy.spy().as('on'),
  },
  isFallback: false,
  isLocaleDomain: false,
  isReady: true,
  defaultLocale: 'en',
  domainLocales: [],
  isPreview: false,
});

const MockRouter = ({ children, ...props }: PropsWithChildren) => {
  const router = createRouter(props);

  return <RouterContext.Provider value={router}>{children}</RouterContext.Provider>;
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
      { message: 'OK', statusCode: 200, body: successState.payload.formSettings },
    );

    cy.intercept(
      {
        method: 'GET',
        url: apiRoutes.defaultValues,
      },
      { message: 'OK', statusCode: 200, body: successState.payload.defaultValues },
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
