import React from 'react'

import Preloader from './Preloader'
import type { Payload, Loading, Fail } from '../../hooks/useFetchStartValues/types';

export const loadingState: Loading = {
  status: 'loading',
  progress: {
    formSettings: true,
    defaultValues: true,
  }
};



describe('<Preloader />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Preloader fetchingState={loadingState}/>)

    cy.findByTestId('progressbar-form-settings').should('exist');
    cy.findByTestId('progressbar-default-values').should('exist');

    cy.findAllByText('is loading').should('exist');
  })
})
