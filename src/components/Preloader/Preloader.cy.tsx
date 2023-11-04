import React from 'react';

import type { Fail, Loading } from '../../hooks/useFetchValue/types';

import Preloader from './Preloader';

export const loadingState: Loading = {
  progress: {
    defaultValues: true,
    formSettings: true,
  },
  status: 'loading',
};

export const errorState: Fail = {
  error: {
    defaultValues: new Error('Error defaultValues'),
    formSettings: new Error('Error formSettings'),
  },
  status: 'fail',
};

describe('<Preloader />', () => {
  it('renders', () => {
    cy.mount(<Preloader fetchingState={loadingState} />);

    cy.findAllByRole('heading', { level: 2 }).should('have.lengthOf', 2);
    cy.findByText('Form settings').should('exist');
    cy.findByText('Default values').should('exist');

    cy.findByTestId('progressbar-form-settings').should('exist');
    cy.findByTestId('progressbar-default-values').should('exist');

    cy.findAllByText('is loading').should('have.lengthOf', 2);
  });

  it('Loading state', () => {
    cy.mount(<Preloader fetchingState={loadingState} />);

    cy.findByTestId('progressbar-form-settings').should('exist');
    cy.findByTestId('progressbar-default-values').should('exist');

    cy.findAllByText('is loading').should('have.lengthOf', 2);
  });

  it('Loading state', () => {
    cy.mount(<Preloader fetchingState={errorState} />);

    cy.findByTestId('progressbar-form-settings').should('not.exist');
    cy.findByTestId('progressbar-default-values').should('not.exist');

    cy.findAllByText('has failed loading').should('have.lengthOf', 2);
  });
});
