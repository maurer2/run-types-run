import React from 'react';

import type { Fail, Loading } from '../../hooks/useFetchValue/types';

import Preloader from './Preloader';

export const loadingState: Loading = {
  status: 'loading',
};

export const errorState: Fail = {
  errors: 'Fetching Error',
  status: 'fail',
};

describe('<Preloader />', () => {
  it('Loading state', () => {
    cy.mount(<Preloader fetchingState={loadingState} textLabel='Title'/>);

    cy.findByRole('heading', { level: 2 }).should('have.text', 'Title');
    cy.findByText('is loading').should('exist');

    cy.findByTestId('progressbar-form-data').should('exist');
  });

  it('Fail state', () => {
    cy.mount(<Preloader fetchingState={errorState} textLabel='Title'/>);

    cy.findByTestId('progressbar-form-data').should('not.exist');

    cy.findByText('has failed').should('exist');
    cy.findByText('Fetching Error').should('exist');
  });
});
