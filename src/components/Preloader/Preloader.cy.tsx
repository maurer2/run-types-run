import React from 'react';

import Preloader from './Preloader';
import type { Loading, Fail } from '../../hooks/useFetchStartValues/types';

export const loadingState: Loading = {
  status: 'loading',
  progress: {
    formSettings: true,
    defaultValues: true,
  },
};

export const errorState: Fail = {
  status: 'fail',
  error: {
    formSettings: new Error('Error formSettings'),
    defaultValues: new Error('Error defaultValues'),
  },
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
